<template>
	<div>

    <img src="https://scontent-hkg3-1.xx.fbcdn.net/v/t1.0-9/82143154_2435649739891114_7942322333434249216_o.jpg?_nc_cat=101&_nc_ohc=zcujXxe4XHkAX8zD02i&_nc_ht=scontent-hkg3-1.xx&oh=beb7eeb940b382ad2bed13fe004c1717&oe=5E8EFAD2" width="1550" height="800">
    <h1>ICN Final Project API Example</h1>
    <button id="test_button" @click="callApi">Call API</button>

    <!-- <h1>Example</h1>
    <button id="test_button" @click="callApi">Call API</button> -->
    

    <div>
      <el-tabs :tab-position="tabPosition" style="height: 1200px;">
        <el-tab-pane label="Welcome">
          <h1>Welcome</h1>
        </el-tab-pane>
        <el-tab-pane label="Daily Report">
          <h1>Daily Report</h1>
          <h2> Daily Result: </h2>
          <div class="block">
            <span class="demonstration">SeeYourDailyResult</span>
            <el-date-picker
              v-model="dayselect"
              type="date"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd"
              placeholder="Choose the date">
            </el-date-picker>
          </div>
          <div>
            <h2> Barometer value: </h2>
            <p id="barometer">First Barometer value</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="Weekly Report">
          <h1>Weekly Report</h1>
          <div>
            <h2> Humudity value: </h2>
            <p id="humidity">First Humudity value</p>
          </div>
          <div>
            <h2> Temperature value: </h2>
            <p id="temperature">First Temperature value</p>
          </div>
        </el-tab-pane>
        <BarChart :dataset="dataa" :chartoptions="chartoptions"/>
      </el-tabs>
    </div>
      
    <div>
    </div>
       
    <hr>
    
    <div class="bottom">
      <p id="social_media">get in touch</p>
      <a href="https://www.facebook.com/" target="_blank">
      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEVCZ7L///+5w95GarM2YK80Xq+pttc+ZbFfe7s6YrCHmsmZqdA8Y7Ds8PdSdLlffr3V3OyQpNFrh8Lg5vIvW633+fyCmsxKb7fG0eier9WtutnAy+Ta4e91jsR8k8eMn8zP1ulvh8Dx9PkmVqvo7ff2SOu1AAAEYklEQVR4nO3da3uqOBSG4YDBmDYkHEStp1qn//83jqfuvWemoxGarBWu9/myP9XNfS0sIJGK7FpZ1Y0VY8k2dVXeZOL6T+6kNtTb9YMZLV3+h7B1cky8a0a69ktYWU29OUHStroKWzu+AV4ztr0I3TgneE67szCX1NsRMJlnonRj3UfPGVeKaswjPA2xEvV434XndC2aMe+kp920EeM5Vfu+sfsQQgghhBBCCCGEEPJJKWOM1lpKfc5cUkoo6g37mbQshG12+8XLe/1+6mWx3+8+GjezSyXnRXESq1SpyuhiPlmsq21bHrvudrc667ruWJafn227rQ6b9euisUWStySUFM3r6pfrfq/pEc18Oa2OfryzMLW7Lnry4Tu9JGeoin31DC+1GSrjDk/NL7UZmsn0aV9SM5R2+7wvoRmq4q3HABMSnoC9fMnspWqy6glMZIbKbPoCU5lhf2AaMyym/YFJzFDXA4ApzNA0/qfZSc5QyWfPRFOboR7yJkxBaNygfTSBvXTe+1CfyAyNGwjkPkOlhv2a4T9Ds+t3QZHODE0+FMh8hmo5eITMZygHna+lMEPZ63OLhITGlY8FD4Wc91LZ95OLfwgZz1ANufD9LWQ8Q2U/f0LIeIZm9gSk267y9Xo9/XfrD8bfFtELX95xs58tJ0rLb2IMFIXnCU05nRQmyRvbc7+jYTXTCeIuSa9r343ivB/eb+kjLJfpAk3jc9q9Y3wweJTZewhXyS4nEZ4XFu8Jj1Do18fA0iY8Qq/z7kNBvZVD8rkfM01aKNceb0PGFw6P8zlpS/tL2D7C2eiFSf8q9RIuqTdyUD7CCfVGDgpCCPkHIYT8gxBC/kEIIf8ghJB/EELIv1EI1Xc33r/6y0NoinuvcIr4E2Pl/rt24o88bnLf+/FLb7RE/fLYMLDP+diFK9pbNxGEa9o7qBGExKvaIghfxi7sdrQ3p8ILqR9FHl7YEt9+Cy+sJmMXHoiX24QX5sRrNcIL30Y/wz3xSobwQuq/WxFeSOuLIOxor50iCNvRCzfUC/uCC8mXLgYX1tQriIMLqQ+HwYUd+eLM0MLSUS9dDC3cki/ODC08EF8dhhduqN+GwYXEH5ZGENJ/BTiwsCM/HAYXkh8OQwuP9OvcQwupz7uDC7fUV4cn4XtQIfG9w3Nq6Wb/n/V4ZsS9n59x+LuG6l5zj5UKwtx5AWrdw0ax2uRuEELIPwgh5B+EEPIPQgj5ByGE/IMQQv5BCCH/IISQfxBCyD8IIeQfhBDyD0II+QchhPyDEEL+QQgh/yCEkH8QQsg/CCHkH4QQ8g9CCPkHIYT8gxBC/kEIIf8g/EEh0bMJogmtIHrMSyyhaURN8zCiWEJdi4rmgVKxhLISRA82jyQ0rhRZTjLESEKZZyLrHMU7MY5Qu+wkzFpLsJ9GERrbXoRZZeNPMYZQ2yq7CrPWydhjDC800rXZlzDrcid1VGRgodHS3f4HcXu1sqqbmCdwYYW2qavy9ip/A3YKUMidEST2AAAAAElFTkSuQmCC" 
            style="width:40px; height:40px; position:relative; top:55px; left:-390px; opacity:0.85">
      </a>
      <a href="https://www.instagram.com/hakka.baobao/?hl=zh-tw" target="_blank">
      <img src="data:image/jpeg;base64,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" 
                style="width:40px; height:45px; position:relative; top:58px; left:-210px; opacity:0.85">
      </a>
      <a href="mailto:naomic224c224@gmail.com" target="_blank">
      <img src="data:image/png;base64,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" 
                style="width:65px; height:65px; position:relative; top:68px; left:-40px; opacity:0.9">
      </a>
      <a href="https://twitter.com/AmyHuan83264579" target="_blank">
      <img src="https://scontent-hkg3-2.xx.fbcdn.net/v/t1.0-9/82462718_2435324336590321_1128723538602098688_n.jpg?_nc_cat=110&_nc_ohc=sAIY3T1-1ugAX_-j-E4&_nc_ht=scontent-hkg3-2.xx&oh=f2bf54eacd272fd13c83b95a8f1ff343&oe=5E914500" 
                style="width:45px; height:45px; position:relative; top:60px; left:135px; opacity:0.85">
      </a>
      <a href="https://line.me/ti/p/HaSxFBGIDj" target="_blank">
      <img src="data:image/png;base64,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" 
                style="width:43px; height:43px; position:relative; top:60px; left:330px; opacity:0.85">
      </a>
      <p id="basic_information">TEAM 6  Introduction to Computer Networks Final Project</p>
      <i class="el-icon-user"></i>
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
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .bottom{
    margin-top:10px; 
    background-color:#f3f3f3;
    position:relative;
    width: 1550px;
    height: 220px;
    #social_media{
      color : #be8abf;
      font-size : 20px;
      font-family : Microsoft JhengHei;
      font-weight : bold;
      letter-spacing:8px;
      word-spacing:5px;

      position:relative;
      top:0px;
      left:-35px;
    }
    #basic_information{
      color : #004445;
      font-size : 10px;
      font-family : Microsoft JhengHei;
      font-weight : bold;
      letter-spacing:20px;
      word-spacing:5px;

      position:relative;
      top:80px;
      left:0px;
    }
    .el-icon-user{
      font-size:25px;
      opacity:0.8;
      position:relative;
      top:48px;
      left:-740px;
    }
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
      dayselect: '',
      tabPosition: 'right',
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
    handleCommandY(command) {
      this.$message('Choose the year ' + command);
    },
    handleCommandM(command) {
      this.$message('Choose the month ' + command);
    },
    handleCommandD(command) {
      this.$message('Choose the day ' + command);
    },
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

