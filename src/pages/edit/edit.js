import './edit.html';
import './edit.css';
import '../../common/comCss.css';
import {header} from '../../components/header/header.js';
import {setDom, date} from '../../components/calender/calender.js';
import {$, c, Storage} from '../../common/comJs.js';

$('.date')[0].appendChild(setDom);
let Edit = function (choiceTit = '', choiceType = '', choiceCon = '') {
  this.choiceTit = choiceTit;
  this.choiceType = choiceType;
  this.choiceCon = choiceCon;
  this.labels = {
    'radio': '单选',
    'checkbox': '多选',
    'text': '文本框'
  };
};
Edit.prototype = {
  init: function () {
    let that = this;
    console.log('ds', that);
    that.showTypes();
    that.addTypes();
    $('.nairecontent')[0].insertBefore(header(), $('.nairecontent')[0].childNodes[0]);
  },
  /**
   * [showTypes 显示选择项]
   * @return {[type]} [description]
   */
  showTypes: function () {
    let that = this;
    $('.add')[0].onclick = () => {
      that.showChoice = !that.showChoice;
      $('.types')[0].style.display = (that.showChoice ? 'block' : 'none');
    };
  },
  /**
   * [addTypes 选择添加的类型]
   */
  addTypes: function () {
    let that = this;
    let types = ['radio', 'checkbox', 'text'];
    types.map((item, index) => {
      $('.' + item)[0].onclick = function () {
        $('.edit')[0].appendChild(that.addOption(item));
      }
    });
  },
  /**
   * [addOption 添加选项]
   * @param {[String]} type [选项类型]
   * @return {[Object]} choiceItem [节点对象]
   */
  addOption: function (type) {
    let that = this;
    let choiceItem = c('div');
    choiceItem.className = 'option';
    let context = c('div');
    context.className = 'optMain';
    let optAct = c('div');
    optAct.className = 'optAct';
    let qsOrder = c('span');
    qsOrder.className = 'optOrder';
    qsOrder.innerText = `Q${$('.edit')[0].childNodes.length + 1}`;
    let qsCon = c('div');
    qsCon.className = 'optContent';
    let title = c('span');
    title.className = 'optTitle';
    title.innerHTML += '<input type="text" placeholder=' + that.labels[type] + '标题' + ' class="choiceTit">';
    qsCon.appendChild(title);
    $('.choiceTit').value = (that.choiceTit ? that.choiceTit : that.labels[type])
    qsCon.appendChild(that.addOptItem(type));
    for (let con of that.choiceCon) {
      let opt = c('span');
      opt.innerHTML += '<input type="radio">';
      opt.innerHTML += '<input type="text" class="optVal">';
      $('.optVal')[0].value = con.value;
      qsCon.appendChild(opt);
    };
    let acts = {
      'up': '上移',
      'down': '下移',
      'repeat': '复用',
      'delete': '删除'
    };
    for (let key in acts) {
      let act = c('span');
      act.className = key;
      act.innerText = acts[key];
      act.onclick = function () {
        that.optAction(key, choiceItem);
      };
      optAct.appendChild(act);
    };
    context.appendChild(qsOrder);
    context.appendChild(qsCon);
    choiceItem.appendChild(context);
    choiceItem.appendChild(optAct);
    return choiceItem;
  },
  toOrder: function () {
    let optArr = [].slice.call($('.option'));
    optArr.map((item, index) => {
      item.getElementsByClassName('optOrder')[0].innerText = 'Q' + (Number(index) + 1);
    });
  },
  /**
   * [addOptItem 用于添加选项]
   * @param {[type]} type [添加的类型， 单选， 多选， 文本框]
   * @param {[type]} val  [选项呢的值]
   */
  addOptItem: function (type, val, title) {
    let that = this;
    let opt = c('p');
    opt.className = 'theOpt';
    let input = c('input');
    input.setAttribute('placeholder', that.labels[type] + '选项');
    input.setAttribute('type', 'text');
    if (type !== 'text') {
      opt.innerHTML += '<input  class="typeLabel" ' + 'name=' + title + ' type=' + type + '>';
      input.className = 'optVal';
    } else {
      input = c('textarea');
      input.className = 'textInput optVal';
    };
    opt.appendChild(input);
    let optAdd = c('span');
    optAdd.className = 'optAdd';
    optAdd.innerText = '选项加';
    let optDel = c('span');
    optDel.className = 'optDel';
    optDel.innerText = '选项减';
    optAdd.onclick = function () {
      opt.parentNode.appendChild(that.addOptItem(type));
    };
    optDel.onclick = function () {
      opt.parentNode.removeChild(opt);
    };
    if (type !== 'text') {
      opt.appendChild(optAdd);
      opt.appendChild(optDel);
    };
    return opt;
  },
  optAction: function (actType, node) {
    let that = this;
    switch (actType) {
      case 'up':
        if (node.previousSibling) {
          $('.edit')[0].insertBefore(node, node.previousSibling);
        };
        break;
      case 'down':
        if (node.nextSibling.nextSibling && node.nextSibling) {
          $('.edit')[0].insertBefore(node, node.nextSibling.nextSibling);
        } else {
          $('.edit')[0].appendChild(node);
        }
        break;
      case 'repeat':
        let clone = node.cloneNode(true);
        that.cloneAction(clone);
        if (node.nextSibling) {
          $('.edit')[0].insertBefore(clone, node.nextSibling);
        } else {
          $('.edit')[0].appendChild(clone);
        };
        break;
      case 'delete':
        $('.edit')[0].removeChild(node);
        break;
    };
    that.toOrder();
  },
  /**{titie, date, status, }
   * [saveNaire 保存问卷的一切内容]
   * @return {[type]} [description]
   */
  saveNaire: function (statu) {
    console.log('选择的日期', date);
    let naireTitle = $('.title-input')[0].value;
    // if (!naireTitle) {
    //   alert('请输入问卷标题');
    //   return;
    // }
    console.log('这是容器', $('.option'));
    let naire = {
      title: naireTitle,
      statu: statu,
      date: '',
      content: []
    };
    let options = $('.option');
    let optArr = [].slice.call(options);
    optArr.map((item) => {
      let optionTitle = item.getElementsByClassName('optTitle')[0].getElementsByTagName('input')[0].value;
      let optionType = '';
      let typeLabel = item.getElementsByClassName('typeLabel')[0];
      if (typeLabel) {
        optionType = typeLabel.getAttribute('type');
      } else {
        optionType = 'textarea';
      }
      let optionObj = {
        optionTitle: optionTitle,
        optionType: optionType,
        optionContent: []
      };
      let optVals = item.getElementsByClassName('optVal');
      optVals = [].slice.call(optVals);
      optVals.map((opt) => {
        let obj = {};
        obj.content = opt.value;
        obj.choiceData = 0;
        optionObj.optionContent.push(obj);
      });
      naire.content.push(optionObj);
    });
    return naire;
  },
  /**
   * [cloneAction 对于节点动作的复制，谈不上，只是重写了一遍]
   * @param  {[type]} cloneNode [要进行复制的节点]
   * @return {[type]}           [description]
   */
  cloneAction: function (cloneNode) {
    let that = this;
    let optAdd = cloneNode.getElementsByClassName('optAdd');
    let optDel = cloneNode.getElementsByClassName('optDel');
    let theOpt = cloneNode.getElementsByClassName('theOpt');
    let typeLabel = cloneNode.getElementsByClassName('typeLabel');
    for (let i = 0; i < theOpt.length; i++) {
      optAdd[i].onclick = function () {
        theOpt[i].parentNode.appendChild(that.addOptItem(typeLabel[i].getAttribute('type')));
      };
      optDel[i].onclick = function () {
        theOpt[i].parentNode.removeChild(theOpt[i]);
      };
    };
    let acts = ['up', 'down', 'repeat', 'delete'];
    acts.map((item) => {
      cloneNode.getElementsByClassName(item)[0].onclick = function () {
        that.optAction(item, cloneNode);
      }
    });
  }
};

let edit = new Edit();
edit.init();
// 使用对象的形式进行存储数据-
$('.save')[0].onclick = function () {
  let storage = new Storage('naire', edit.saveNaire('未发布'));
  storage.set();
  window.location.href = 'list.html';
};
console.log(setDom());
