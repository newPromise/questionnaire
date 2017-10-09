import './data.html';
import '../../common/comCss.css';
import './data.css';
import {header} from '../../components/header/header.js';
import {$, c, Storage} from '../../common/comJs.js';
$('.nairecontent')[0].insertBefore(header(), $('.nairecontent')[0].childNodes[0]);
var echarts = require('echarts');
// 引入柱状图
// 引入提示框和标题组件
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
let store = new Storage('naire');
let dataNaire = store.getActItem('isData');

let NaireData = function (naire) {
  this.naire = naire;
};
NaireData.prototype = {
  constructor: NaireData,
  init: function () {
    let that = this;
    console.log('你正在看的naire', that.naire);
    for (let dt of that.naire.content) {
      console.log('dt', dt);
      let qsOrder = `Q${$('.dataContent')[0].childNodes.length + 1}`;
      $('.dataContent')[0].appendChild(that.setDom(dt.optionTitle, dt.optionContent, qsOrder));
    }
    // that.toEcharts('Q1');
  },
  setDom: function (title, content, chartsId) {
    // let that = this;
    let option = c('div');
    option.className = 'option';
    let optItem = c('div');
    optItem.className = 'optItem';
    let optHead = c('p');
    let optOrder = c('span');
    optOrder.className = 'optOrder';
    optOrder.innerText = chartsId;
    let optTitle = c('span');
    optTitle.className = 'optTitle';
    optTitle.innerText = title;
    optHead.appendChild(optOrder);
    optHead.appendChild(optTitle);
    // 需要循环 optBody
    let optBody = c('p');
    let item = c('span');
    item.className = 'item';
    item.innerText = '我是选项一';
    optBody.appendChild(item);
    optItem.appendChild(optHead);
    optItem.appendChild(optBody);
    let optData = c('div');
    optData.className = 'optData';
    optData.setAttribute('id', chartsId);
    option.appendChild(optItem);
    option.appendChild(optData);
    return option;
  },
  another: function (echartDom) {
    console.log('chartsId', echartDom);
    let datas = document.getElementById(echartDom);
    let charts = echarts.init(datas);
    charts.setOption({
      title: {},
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    });
    console.log('charts', charts);
    return charts;
  },
  toEcharts: function (echartDom, echartType) {
    let datas = document.getElementById(echartDom);
    let charts = echarts.init(datas);
    console.log('myCharts', charts);
    charts.setOption({
      title: {
        text: ''
      },
      legend: {
        data: [],
        borderColor: ['#EE7419']
      },
      xAxis: {
        data: [],
        type: 'value',
        show: false,
        axisTick: {
          show: false
        }
      },
      yAxis: {
        type: 'category',
        show: false,
        axisTick: {
          show: false
        }
      },
      series: [{
        type: 'bar',
        name: '人工',
        data: [{
          value: 10,
          color: 'blue',
          borderColor: 'red'
        }],
        stack: 'income',
        barWidth: 30,
        borderColor: ['red'],
        color: ['blue'],
        label: {
          normal: {
            show: true,
            position: 'inside',
            formatter: function(obj) {
              return obj.value + '%';
            }
          }
        }
      }, {
        type: 'bar',
        name: '自动',
        data: [90],
        stack: 'income',
        barWidth: 30,
        color: ['#EE7419'],
        borderColor: ['#272822'],
        label: {
          normal: {
            show: true,
            position: 'inside',
            formatter: function(obj) {
              return obj.value + '%';
            }
          }
        }
      }]
    })
  }
};

let naireData = new NaireData(dataNaire);
naireData.init();
