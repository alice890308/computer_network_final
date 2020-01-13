<template>
	<div>
    <h1>Example</h1>
    <button id="test_button" @click="callApi">Call API</button>
    <div>
      <h2> Barometer value: </h2>
      <p id="barometer">First Barometer value</p>
    </div>
    <div>
      <h2> Humudity value: </h2>
      <p id="humidity">First Humudity value</p>
    </div>
    <div>
      <h2> Temperature value: </h2>
      <p id="temperature">First Temperature value</p>
    </div>
      <BarChart :dataset="dataa" :chartoptions="chartoptions"/>
  </div>
</template>

<style lang="scss" scoped>
  p {
    color:aquamarine;
  }
  #barometer {
    color:bisque;
  }
</style>

<script>
import BarChart from "../components/BarChart.vue";
import axios from 'axios'

export default {
  name: 'home',
  data() {
    return {
      week_data: {},
      all_data: {},
      dataa: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#fed39f",
            borderWidth: 4,
            borderSkipped: false,
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          }
        ]
      },
      chartoptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  components: {
    BarChart
  },
  methods: {
    callApi: function () {
      var macaddr = "?macaddr=" + "aa15ec12";
      var date_filter = "&date_filter=" + "2019-12-8 00:00:00+-+2020-1-13 15:54:00";
      axios.post("https://campus.kits.tw/ICN_API" + macaddr + date_filter, 
                  null,
                  { headers: {'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImMzMDU5NTFjZGJmNGQ4MDM4M2IxOTA5MDhlNzBlOGZmMzA2Y2RkNjhhOWZhNTY1MWFlZTA0NzNkMTEwYTgwN2Y2MTgwMGZiMGI3NDhhZjdmIn0.eyJhdWQiOiIyIiwianRpIjoiYzMwNTk1MWNkYmY0ZDgwMzgzYjE5MDkwOGU3MGU4ZmYzMDZjZGQ2OGE5ZmE1NjUxYWVlMDQ3M2QxMTBhODA3ZjYxODAwZmIwYjc0OGFmN2YiLCJpYXQiOjE1NzYxNTkxMzEsIm5iZiI6MTU3NjE1OTEzMSwiZXhwIjoxNjA3NzgxNTMxLCJzdWIiOiIyNTIiLCJzY29wZXMiOltdfQ.hDDzk7StTJ0czRT8vHPJoQYxhTpbrr2auYdXyewXFW6yYtBdZFpRshsrRfLbX4pNXhQq_Q1orEe7gO0w_3HukCwWvXf0ajNL-Zvmuay5wcbiIYTaL_-w7nWtTshUVnOw2lX6DKHdxY1Q17nJvK0o39leChMAeIc88Oabx3gCprny983kA4LDwyPd3S5_Eu8J7i5giuR_ul3PF37W5Z2ymNRR3RBZaJkV2IEQAsHhiMmuNpjcKZXvU3zegS6Q-2dviNQsKWYnrSN8rMeq5xljDaOzCR-ueWDuDgmpYOo_nGqQusRJbLGdPy9BGs0_pWgb-yD2e4Fu34fBzg_CLaffSFaKxFEoz12GHwGfczu2NeVH69jp8vvuAzRBfo1Gm8PboBhm07MX3jlXhTM-P6IX4GxjfDcZFFVO7gygOJ6GRRM_1WtvB9XmEu2mA-AJ_BC08GU0JKx_qLo3N17WwnxPoaqNrqJ-v8RwBRBAfyVmUqh7nbJTLw4SnUYkoyjV6KX_RGIcT8Ovr4upyoDmYgnKwxy1Tsh3yMVgg7jGTMw_3IxgOdxcIn2H6pWQCYUqhp8NJuzvhDAz7XdwbAeJuYr6LwX-3Ei1KWHD04kzI8GZmfwmvPMxQGgLEkMVc028YM2cFPYtuGBRFxcxw3vmTB1dR7kAQ1W4u_ksfk415Ri6NQ4', 
                                                      'Accept': 'application/json'}
      })
      .then((response) => {
          console.log(response);
          /* 會用到的變數 */
          var count = 0;
          var data_num = response["data"]["length"]
          console.log(response["data"][0]["created_at"].substr(5, 6) + ", lenth = " + response["data"][0]["created_at"].substr(5, 6).length)
          var cur_date = response["data"][0]["created_at"].substr(5, 6)
          var all_shaking_count = {}

          for(var i  = 0; i < data_num; i++) {
            var acc_x = response["data"][i]["acc_x"]
            var acc_y = response["data"][i]["acc_y"]
            var acc_z = response["data"][i]["acc_z"]

            /* 若是當前進來的資料時間與前一個不同，表示已經是下一天了 */
            if (response["data"][i]["created_at"].substr(5, 6) != cur_date) {
              all_shaking_count[cur_date] = count
              count = 0
              cur_date = response["data"][i]["created_at"].substr(5, 6)
            }

            /* 如果有震動，count++ */
            if (acc_x != null || acc_y != null || acc_z != null){
              count++;
            }
          }
          console.log(all_shaking_count)
      })
      .catch((err) => {
        if (err.status === '200') {
          alert('API calling error: macaddr or url format error!')
        } else {
          alert(err)
        }
      })
    }
  }
}
</script>
