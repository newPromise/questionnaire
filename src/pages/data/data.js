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
    $('.naireTitle')[0].innerText = that.naire.title;
    [].slice.call($('.back')).map((e) => {
      e.onclick = function () {
        window.location.href = 'list.html';
      }
    });
    for (let dt of that.naire.content) {
      let qsOrder = `Q${$('.dataContent')[0].childNodes.length + 1}`;
      $('.dataContent')[0].appendChild(that.setDom(dt.optionTitle, dt.optionContent, qsOrder, dt.optionType));
      if (dt.optionType !== 'textarea') {
        that.echartPie(qsOrder, dt.optionContent);
        // document.getElementById(qsOrder).getElement
      } else {
        let chartArea = document.getElementById(qsOrder);
        chartArea.parentNode.removeChild(chartArea);
      }
    }
    // that.toEcharts('Q1');
  },
  setDom: function (title, content, chartsId, optionType) {
    let that = this;
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
    optItem.appendChild(optHead);
    content.map((item, index) => {
      if (optionType === 'textarea') {
        item.content.map((item, index) => {
          let t = c('p');
          t.className = 'showText';
          t.appendChild(that.optItems(item));
          optItem.appendChild(t);
        });
      } else {
        optItem.appendChild(that.optItems(item.content));
      }
    });
    // optItem.appendChild(optBody);
    let optData = c('div');
    optData.className = 'optData';
    optData.setAttribute('id', chartsId);
    option.appendChild(optItem);
    option.appendChild(optData);
    return option;
  },
  optItems: function (optItem) {
    let optBody = c('p');
    let item = c('span');
    item.className = 'item';
    item.innerText = optItem;
    optBody.appendChild(item);
    return optBody;
  },
  echartPie: function (echartDom, optionContent) {
    let datas = document.getElementById(echartDom);
    let charts = echarts.init(datas);
    let option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [
        {
          name: '统计选择次数',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    option.series[0].data = [];
    optionContent.map((optItem, index) => {
      let dataObj = {};
      dataObj.value = optItem.choiceData;
      dataObj.name = optItem.content;
      option.series[0].data.push(dataObj);
    })
    charts.setOption(option);
  }
};

let naireData = new NaireData(dataNaire);
naireData.init();
