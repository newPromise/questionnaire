import './list.html';
import '../../common/comCss.css';
import './list.css';
import {header} from '../../components/header/header.js';
import {$, c} from '../../common/comJs.js';

let List = function () {
};

List.prototype = {
  constructor: List,
  init: function () {
    let that = this;
    that.addList();
    $('.nairecontent')[0].insertBefore(header(), $('.nairecontent')[0].childNodes[0]);
  },
  addList: function () {
    let that = this;
    let labels = c('div');
    labels.className = 'list label';
    let lbs = ['标题', '时间', '状态', '操作'];
    lbs.map((item) => {
      let lb = c('span');
      lb.className = 'lb';
      lb.innerText = item;
      labels.appendChild(lb);
    });
    $('.main')[0].appendChild(labels);
    $('.main')[0].appendChild(that.getList());
  },
  getAllList: function () {
    let lists = c('div');
    lists.className = 'lists';
    let list = c('div');
    list.className = 'list';
    let title = c('span');
    title.className = 'title';
    title.innerText = '这是标题';
    let time = c('span');
    time.className = 'time';
    list.appendChild(title);
    list.appendChild(time);
    lists.appendChild(list);
    return lists;
  },
  getList: function (title, time, status) {
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
    for (let key in acts) {
      let act = c('span');
      act.className = 'key';
      act.innerText = acts[key];
      actions.appendChild(act);
      act.onclick = function () {
        switch (key) {
          case 'edit':
            window.location.href = 'edit.html';
            console.log('edit');
            break;
          case 'view':
            console.log('view');
            break;
          case 'delete':
            console.log('delete');
            break;
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
