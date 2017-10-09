import './list.html';
import '../../common/comCss.css';
import './list.css';
import {header} from '../../components/header/header.js';
import {$, c, Storage} from '../../common/comJs.js';
import {Indicator} from '../../components/indicator/indicator.js';
let storeNaire = new Storage('naire');
let List = function () {
  this.delIndex = '';
};
storeNaire.get().map((item, index) => {
  storeNaire.setAct(index);
});
List.prototype = {
  constructor: List,
  init: function () {
    let that = this;
    $('.main')[0].innerHTML = '';
    that.addList();
    that.getStorage();
    $('.main')[0].appendChild(that.addNew());
    if (!$('.header')[0]) {
      $('.nairecontent')[0].insertBefore(header(), $('.nairecontent')[0].childNodes[0]);
    }
  },
  addNew: function () {
    let addNew = c('div');
    addNew.className = 'addNewWrap';
    let addNewBtn = c('span');
    addNewBtn.innerText = '新建问卷';
    addNewBtn.onclick = function () {
      window.location.href = 'edit.html';
    };
    addNewBtn.className = 'addNew';
    addNew.appendChild(addNewBtn);
    return addNew;
  },
  addList: function () {
    // let that = this;
    let labels = c('div');
    labels.className = 'list label';
    let lbs = ['标题', '截止时间', '状态', '操作'];
    lbs.map((item) => {
      let lb = c('span');
      lb.className = 'lb';
      lb.innerText = item;
      labels.appendChild(lb);
    });
    $('.main')[0].appendChild(labels);
    // $('.main')[0].appendChild(that.getList());
  },
  getStorage: function () {
    let that = this;
    let store = storeNaire.get();
    if (store.length === 0) {
      window.location.href = 'index.html';
    };
    store.map((item, index) => {
      if (item) {
        $('.main')[0].appendChild(that.getList(item.title, item.date, item.statu, index));
      }
    })
  },
  getList: function (title, time, status, index) {
    let that = this;
    let naireItem = c('div');
    naireItem.className = 'naireItem';
    let checkLabel = c('input');
    checkLabel.setAttribute('type', 'checkbox');
    checkLabel.className = 'checkLabel';
    let list = c('div');
    list.className = 'list';
    let listTitle = c('span');
    listTitle.className = 'title';
    listTitle.innerText = title;
    let listTime = c('span');
    listTime.className = 'time';
    listTime.innerText = time;
    let listStatus = c('span');
    listStatus.innerText = status;
    listStatus.className = 'status';
    let actions = c('div');
    actions.className = 'actions';
    let acts = {
      'view': '查看',
      'edit': '编辑',
      'delete': '删除'
    };
    if (status === '已发布') {
      acts.data = '数据';
      acts.view = '填写';
    };
    for (let key in acts) {
      let act = c('span');
      act.className = 'key';
      act.innerText = acts[key];
      actions.appendChild(act);
      act.onclick = function () {
        switch (key) {
          case 'edit':
            storeNaire.setAct(index, 'isEdit');
            window.location.href = 'edit.html';
            console.log('edit');
            break;
          case 'view':
            if (status === '已发布') {
              storeNaire.setAct(index, 'isView');
              window.location.href = 'fill.html';
            } else if (status === '未发布') {
              storeNaire.setAct(index, 'isView');
              window.location.href = 'fill.html';
            };
            break;
          case 'delete':
            indicator.open();
            that.delIndex = index;
            break;
          case 'data':
            storeNaire.setAct(index, 'isData');
            window.location.href = 'data.html';
        }
      };
    };
    list.appendChild(listTitle);
    list.appendChild(listTime);
    list.appendChild(listStatus);
    list.appendChild(actions);
    naireItem.appendChild(checkLabel);
    naireItem.appendChild(list);
    return naireItem;
  }
};

let list = new List();
list.init();
let indicator = new Indicator('确认要删除该问卷');
Object.defineProperty(indicator, 'ensure', {
  get () {
  },
  set (newVal) {
    if (newVal) {
      storeNaire.del(list.delIndex);
      list.init();
    }
  }
});

let toDel = new Promise(function (resolve, reject) {
  if (indicator.ensure) {
    console.log('mtydfsa');
    resolve();
  } else {
    reject();
  }
});
toDel.then(function (value) {
  console.log('异步函数被原型');
}, function () {
});
