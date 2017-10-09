import './data.html';
import './data.css';
import '../../common/comCss.css';
import {header} from '../../components/header/header.js';
import {$, c} from '../../common/comJs.js';
$('.nairecontent')[0].insertBefore(header(), $('.nairecontent')[0].childNodes[0]);

let NaireData = function () {
};
NaireData.prototype = {
  constructor: NaireData,
  init: function () {
    let that = this;
    $('.dataContent')[0].appendChild(that.setDom());
  },
  setDom: function () {
    // let that = this;
    let option = c('div');
    option.className = 'option';
    let optItem = c('div');
    optItem.className = 'optItem';
    let optHead = c('p');
    let optOrder = c('span');
    optOrder.className = 'optOrder';
    optOrder.innerText = 'Q1';
    let optTitle = c('span');
    optTitle.className = 'optTitle';
    optTitle.innerText = '我是选项标题';
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
    option.appendChild(optItem);
    option.appendChild(optData);
    return option;
  },
  echarts: function () {
  }
};

let naireData = new NaireData();
naireData.init();
