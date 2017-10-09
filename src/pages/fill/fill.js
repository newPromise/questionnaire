import './fill.html';
import '../../common/comCss.css';
import './fill.css';
import {$, c, Storage} from '../../common/comJs.js';
import {header} from '../../components/header/header.js';
$('.nairecontent')[0].insertBefore(header(), $('.nairecontent')[0].childNodes[0]);

let FillNaire = function (naire) {
  this.naire = naire;
};

FillNaire.prototype = {
  constructor: FillNaire,
  init: function () {
    let that = this;
    console.log('得到的naire', that.naire);
    $('.tipMsg')[0].innerText = (that.naire.statu === '已发布' ? '问卷已发布' : '问卷尚未发布，填写数据无效');
    $('.title-input')[0].value = that.naire.title || '';
    that.naire.content.map((item, index) => {
      $('.fillContent')[0].appendChild(that.addOpts(item));
    });
    for (let i = 0; i < $('input').length; i++) {
      $('input')[i].setAttribute('readonly', 'readonly');
    };
  },
  addOpts: function (item) {
    let that = this;
    let choiceItem = c('div');
    choiceItem.className = 'option';
    let context = c('div');
    context.className = 'optMain';
    let qsOrder = c('span');
    qsOrder.className = 'optOrder';
    qsOrder.innerText = `Q${$('.fillContent')[0].childNodes.length + 1}`;
    let qsCon = c('div');
    qsCon.className = 'optContent';
    let title = c('span');
    title.className = 'optTitle';
    title.innerHTML += '<input type="text" value = ' + item.optionTitle + '  class="choiceTit">';
    qsCon.appendChild(title);
    item.optionContent.map((opts, index) => {
      console.log('opts', opts);
      qsCon.appendChild(that.addOptItem(item.optionTitle, item.optionType, opts.content, index, opts.choiceData));
    });
    // sd
    context.appendChild(qsOrder);
    context.appendChild(qsCon);
    choiceItem.appendChild(context);
    return choiceItem;
  },
  addOptItem: function (title, type, val, index, choiceData) {
    // let that = this;
    let opt = c('p');
    let optSpan = c('span');
    opt.className = 'theOpt';
    let label = c('label');
    label.innerText = val;
    let typeLabel = c('input');
    if (type !== 'text') {
      typeLabel.className = 'typeLabel';
      typeLabel.setAttribute('name', $('.fillContent')[0].childNodes.length);
      typeLabel.setAttribute('type', type);
      typeLabel.setAttribute('value', val);
      typeLabel.setAttribute('id', $('.fillContent')[0].childNodes.length + `${index}`);
      optSpan.appendChild(typeLabel);
      typeLabel.className = 'optVal';
    } else {
      let input = c('textarea');
      input.className = 'textInput optVal';
    };
    label.setAttribute('for', $('.fillContent')[0].childNodes.length + `${index}`);
    optSpan.appendChild(label);
    opt.appendChild(optSpan);
    return opt;
  },
  /**
   * [dataDeal 遍历文档, 获取选择到的节点索引]
   * @return {[Object]} [代表被选中的节点位置数据结构]
   */
  dataDeal: function () {
    let allOpts = $('.optContent');
    let allIndex = {};
    // let choiceIndexs = [];
    // let isFillAll = false;
    let optItemIndex = [];
    [...allOpts].map((option, index) => {
      let optItems = option.getElementsByClassName('optVal');
      [...optItems].map((item, itemIndex) => {
        if (item.checked) {
          optItemIndex.push(itemIndex);
          // isFillAll = true;
        } else {
        }
      });
      allIndex[index] = optItemIndex;
      optItemIndex = [];
    });
    return allIndex;
  },
  setChoiceData: function () {
    let that = this;
    console.log(that.naire);
    let sels = that.dataDeal();
    for (let opt in sels) {
      sels[opt].map((item, index) => {
        that.naire.content[opt].optionContent[item].choiceData ++;
      });
    };
    let storeData = store.get();
    storeData.splice(viewIndex, 1, that.naire);
    sessionStorage.setItem('naire', JSON.stringify(storeData));
  },
  /**
   * [fillOver 点击确定按钮进行逻辑判断]
   * @return {[type]} [description]
   */
  fillOver: function () {
    let that = this;
    let flag = true;
    let allSels = that.dataDeal();
    for (let key in allSels) {
      if (allSels[key].length === 0) {
        flag = false;
      }
    };
    if (!flag) {
      alert('存在未选中的选项');
      return;
    };
    window.location.href = 'list.html';
    that.setChoiceData();
  }
};
let store = new Storage('naire');
let fillNaire = new FillNaire(store.getActItem('isView'));
let viewIndex = store.get().findIndex(function (val, index, arr) {
  console.log('val', val);
  return val.isView === true;
});

fillNaire.init();
$('.return')[0].onclick = function () {
  window.location.href = 'list.html';
};

$('.submit')[0].onclick = function () {
  fillNaire.fillOver();
};
