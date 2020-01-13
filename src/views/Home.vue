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
    <div>
      <el-dropdown>
        <span class="el-dropdown-link">
          year<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item disabled>2018</el-dropdown-item>
          <el-dropdown-item>2019</el-dropdown-item>
          <el-dropdown-item>2020</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="block">
      <span class="demonstration">GetWhatYouWant</span>
      <el-date-picker
        v-model="value1"
        type="date"
        :picker-options="pickerOptions"
        value-format="timestamp"
        placeholder="Choose the date">
      </el-date-picker>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  p {
    color:aquamarine;
  }
  #barometer {
    color:bisque;
  }
  .el-dropdown-link {
    cursor: pointer;
    color:#0f4c75;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

</style>

<script>
import BarChart from "../components/BarChart.vue";
import axios from 'axios'

export default {
  name: 'home',
  data() {
    return {
      pickerOptions: {
         disabledDate: (time) => {
          return this.dealDisabledDate(time)
        }
      },
      value1: '',
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
    dealDisabledDate (time) {
      let day = 60 * 24 * 3600 * 1000
      return time.getTime() > Date.now() || time.getTime() + day < Date.now()
    },
    callApi: function () {
      var macaddr = "?macaddr=" + "aa15ec12";
      //var date_filter = "&date_filter=" + "2020-1-12 21:00:00+-+2020-1-10 18:00:00";
      axios.post("https://campus.kits.tw/ICN_API" + macaddr/* + date_filter*/, 
                  null,
                  { headers: {'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImMzMDU5NTFjZGJmNGQ4MDM4M2IxOTA5MDhlNzBlOGZmMzA2Y2RkNjhhOWZhNTY1MWFlZTA0NzNkMTEwYTgwN2Y2MTgwMGZiMGI3NDhhZjdmIn0.eyJhdWQiOiIyIiwianRpIjoiYzMwNTk1MWNkYmY0ZDgwMzgzYjE5MDkwOGU3MGU4ZmYzMDZjZGQ2OGE5ZmE1NjUxYWVlMDQ3M2QxMTBhODA3ZjYxODAwZmIwYjc0OGFmN2YiLCJpYXQiOjE1NzYxNTkxMzEsIm5iZiI6MTU3NjE1OTEzMSwiZXhwIjoxNjA3NzgxNTMxLCJzdWIiOiIyNTIiLCJzY29wZXMiOltdfQ.hDDzk7StTJ0czRT8vHPJoQYxhTpbrr2auYdXyewXFW6yYtBdZFpRshsrRfLbX4pNXhQq_Q1orEe7gO0w_3HukCwWvXf0ajNL-Zvmuay5wcbiIYTaL_-w7nWtTshUVnOw2lX6DKHdxY1Q17nJvK0o39leChMAeIc88Oabx3gCprny983kA4LDwyPd3S5_Eu8J7i5giuR_ul3PF37W5Z2ymNRR3RBZaJkV2IEQAsHhiMmuNpjcKZXvU3zegS6Q-2dviNQsKWYnrSN8rMeq5xljDaOzCR-ueWDuDgmpYOo_nGqQusRJbLGdPy9BGs0_pWgb-yD2e4Fu34fBzg_CLaffSFaKxFEoz12GHwGfczu2NeVH69jp8vvuAzRBfo1Gm8PboBhm07MX3jlXhTM-P6IX4GxjfDcZFFVO7gygOJ6GRRM_1WtvB9XmEu2mA-AJ_BC08GU0JKx_qLo3N17WwnxPoaqNrqJ-v8RwBRBAfyVmUqh7nbJTLw4SnUYkoyjV6KX_RGIcT8Ovr4upyoDmYgnKwxy1Tsh3yMVgg7jGTMw_3IxgOdxcIn2H6pWQCYUqhp8NJuzvhDAz7XdwbAeJuYr6LwX-3Ei1KWHD04kzI8GZmfwmvPMxQGgLEkMVc028YM2cFPYtuGBRFxcxw3vmTB1dR7kAQ1W4u_ksfk415Ri6NQ4', 
                                                      'Accept': 'application/json'}
      })
        .then((data) => {
           console.log(data);
        })
        .catch((err) => {
          if (err.status === '200') {
            alert('API calling error: macaddr or url format error!')
          } else {
            alert('API is sleeping !')
          }
        })
      }
  }
}

</script>

