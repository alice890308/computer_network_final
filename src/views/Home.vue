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
    </div>
       <h2> Daily Result: </h2>
    <div>
      <el-dropdown @command="handleCommandY">
        <span class="el-dropdown-link">
          year<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item disabled>2018</el-dropdown-item>
          <el-dropdown-item command="2019">2019</el-dropdown-item>
          <el-dropdown-item command="2020">2020</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown @command="handleCommandM">
        <span class="el-dropdown-link">
          month<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="Jan.">1</el-dropdown-item>
          <el-dropdown-item command="Feb.">2</el-dropdown-item>
          <el-dropdown-item command="Mar.">3</el-dropdown-item>
          <el-dropdown-item command="Apr.">4</el-dropdown-item>
          <el-dropdown-item command="May.">5</el-dropdown-item>
          <el-dropdown-item command="Jun.">6</el-dropdown-item>
          <el-dropdown-item command="Jul.">7</el-dropdown-item>
          <el-dropdown-item command="Agu.">8</el-dropdown-item>
          <el-dropdown-item command="Sep.">9</el-dropdown-item>
          <el-dropdown-item command="Oct.">10</el-dropdown-item>
          <el-dropdown-item command="Nov.">11</el-dropdown-item>
          <el-dropdown-item command="Dec.">12</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown @command="handleCommandD">
        <span class="el-dropdown-link">
          day<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">1</el-dropdown-item>
          <el-dropdown-item command="2">2</el-dropdown-item>
          <el-dropdown-item command="3">3</el-dropdown-item>
          <el-dropdown-item command="4">4</el-dropdown-item>
          <el-dropdown-item command="5">5</el-dropdown-item>
          <el-dropdown-item command="6">6</el-dropdown-item>
          <el-dropdown-item command="7">7</el-dropdown-item>
          <el-dropdown-item command="8">8</el-dropdown-item>
          <el-dropdown-item command="9">9</el-dropdown-item>
          <el-dropdown-item command="10">10</el-dropdown-item>
          <el-dropdown-item command="11">11</el-dropdown-item>
          <el-dropdown-item command="12">12</el-dropdown-item>
          <el-dropdown-item command="13">13</el-dropdown-item>
          <el-dropdown-item command="14">14</el-dropdown-item>
          <el-dropdown-item command="15">15</el-dropdown-item>
          <el-dropdown-item command="16">16</el-dropdown-item>
          <el-dropdown-item command="17">17</el-dropdown-item>
          <el-dropdown-item command="18">18</el-dropdown-item>
          <el-dropdown-item command="19">19</el-dropdown-item>
          <el-dropdown-item command="20">20</el-dropdown-item>
          <el-dropdown-item command="21">21</el-dropdown-item>
          <el-dropdown-item command="22">22</el-dropdown-item>
          <el-dropdown-item command="23">23</el-dropdown-item>
          <el-dropdown-item command="24">24</el-dropdown-item>
          <el-dropdown-item command="25">25</el-dropdown-item>
          <el-dropdown-item command="26">26</el-dropdown-item>
          <el-dropdown-item command="27">27</el-dropdown-item>
          <el-dropdown-item command="28">28</el-dropdown-item>
          <el-dropdown-item command="29">29</el-dropdown-item>
          <el-dropdown-item command="30">30</el-dropdown-item>
          <el-dropdown-item command="31">31</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div>
      <el-select v-model="valuey" clearable placeholder="year">
        <el-option
          v-for="item in optiony"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="valuem" style="margin-left: 20px;" clearable placeholder="month">
        <el-option
          v-for="item in optionm"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="valued" style="margin-left: 20px;" clearable placeholder="day">
        <el-option
          v-for="item in optiond"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="block">
      <span class="demonstration">SeeYourResult</span>
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
  .el-dropdown {
    vertical-align: top;
  }
  .el-dropdown + .el-dropdown {
    margin-left: 15px;
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
      optiony: [{
        value: 'year1',
        label: '2019'
       }, {
        value: 'year2',
        label: '2020'
      }],
      valuey: [],
      optionm: [{
        value: 'month1',
        label: '1'
       }, {
        value: 'month2',
        label: '2'
       }, {
        value: 'month3',
        label: '3'
       }, {
        value: 'month4',
        label: '4'
       },{
        value: 'month5',
        label: '5'
       },{
        value: 'month6',
        label: '6'
       },{
        value: 'month7',
        label: '7'
       },{
        value: 'month8',
        label: '8'
       },{
        value: 'month9',
        label: '9'
       },{
        value: 'month10',
        label: '10'
       },{
        value: 'month11',
        label: '11'
       },{
        value: 'month12',
        label: '12'
       }],
      valuem: [],
      optiond: [{
        value: 'day1',
        label: '1'
       }, {
        value: 'day2',
        label: '2'
       }, {
        value: 'day3',
        label: '3'
       }, {
        value: 'day4',
        label: '4'
       },{
        value: 'day5',
        label: '5'
       },{
        value: 'day6',
        label: '6'
       },{
        value: 'day7',
        label: '7'
       },{
        value: 'day8',
        label: '8'
       },{
        value: 'day9',
        label: '9'
       },{
        value: 'day10',
        label: '10'
       },{
        value: 'day11',
        label: '11'
       },{
        value: 'day12',
        label: '12'
       },{
        value: 'day13',
        label: '13'
       }, {
        value: 'day14',
        label: '14'
       }, {
        value: 'day15',
        label: '15'
       }, {
        value: 'day16',
        label: '16'
       },{
        value: 'day17',
        label: '17'
       },{
        value: 'day18',
        label: '18'
       },{
        value: 'day19',
        label: '19'
       },{
        value: 'day20',
        label: '20'
       },{
        value: 'day21',
        label: '21'
       },{
        value: 'day22',
        label: '22'
       },{
        value: 'day23',
        label: '23'
       },{
        value: 'day24',
        label: '24'
       },{
        value: 'day25',
        label: '25'
       }, {
        value: 'day26',
        label: '26'
       }, {
        value: 'day27',
        label: '27'
       }, {
        value: 'day28',
        label: '28'
       },{
        value: 'day29',
        label: '29'
       },{
        value: 'day30',
        label: '30'
       },{
        value: 'day31',
        label: '31'
       }],
      valued: [],
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

