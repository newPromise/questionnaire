import './calender.css';
import {c} from '../../common/comJs.js';

function Calender() {
  this.date = new Date();
  this.year = this.date.getFullYear();
  this.month = this.date.getMonth();
  this.day = '';
  this.time = '';
};

Calender.prototype = {
  constructor: Calender,
  setDom: function () {
    let that = this;
    let node = c('div');
    node.className = 'calender';
    let clInput = c('input');
    clInput.className = 'calenderInput';
    clInput.setAttribute('type', 'text');
    clInput.setAttribute('readonly', 'readonly');
    Object.defineProperty(this, 'day', {
      set(newVal) {
        clInput.value = that.year + '-' + Number(that.month + 1) + '-' + newVal;
        this.time = clInput.value;
      },
      get () {
      }
    });
    let clCon = c('div');
    clCon.className = 'calenderCon';
    let calenderTitle = c('div');
    calenderTitle.className = 'calenderTitle';
    let calenderAct = c('div');
    calenderAct.className = 'calenderAct';
    let backDate = c('div');
    backDate.className = 'backDate';
    backDate.innerText = 'back';
    let showDate = c('div');
    let showMon = c('span');
    let showYear = c('span');
    showMon.innerText = that.month + 1;
    showMon.className = 'showMon';
    showYear.innerText = that.year;
    showYear.className = 'showYear';
    showDate.appendChild(showMon);
    showDate.appendChild(showYear);
    showDate.className = 'showDate';
    let nextDate = c('div');
    nextDate.className = 'nextDate';
    nextDate.innerText = 'next';
    calenderAct.appendChild(backDate);
    calenderAct.appendChild(showDate);
    calenderAct.appendChild(nextDate);
    calenderTitle.appendChild(calenderAct);
    let calenderWeek = that.addWeek();
    calenderTitle.appendChild(calenderWeek);
    let calenderBody = c('div');
    calenderBody.className = 'calenderBody';
    calenderBody.appendChild(that.getDays());
    nextDate.onclick = function () {
      calenderBody.innerHTML = '';
      calenderBody.appendChild(that.toNext(true));
      showMon.innerText = that.month + 1;
      showYear.innerText = that.year;
    };
    backDate.onclick = function () {
      calenderBody.innerHTML = '';
      calenderBody.appendChild(that.toNext(false));
      showMon.innerText = that.month + 1;
      showYear.innerText = that.year;
    };
    clCon.appendChild(calenderTitle);
    clCon.appendChild(calenderBody);
    node.appendChild(clInput);
    node.appendChild(clCon);
    return node;
  },
  jugeMon: function (month, year) {
    let that = this;
    if (month > 11) {
      that.year ++;
      that.month = 0;
    };
    if (month < 1) {
      that.month = 11;
      that.year --;
    };
  },
  addWeek: function () {
    // let that = this;
    let weeks = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fir', 'Sat'];
    let calenderWeek = c('div');
    calenderWeek.className = 'calenderWeek';
    let week = '';
    weeks.map((item) => {
      console.log('yes');
      week = c('span');
      week.innerText = item;
      calenderWeek.appendChild(week);
    });
    return calenderWeek;
  },
  toNext: function (next) {
    let that = this;
    if (next) {
      that.month ++;
    } else {
      that.month --;
    };
    that.jugeMon(that.month);
    let firstDay = new Date(that.year, that.month, 1).getDay();
    let days = new Date(that.year, that.month + 1, 0).getDate();
    console.log('that.month', that.month);
    return that.addDays(firstDay, days);
  },
  getDays: function () {
    let that = this;
    let date = new Date();
    let year = date.getFullYear();
    // let month = date.getMonth();
    let firstDay = new Date(year, 4, 1).getDay();
    let days = new Date(year, 4 + 1, 0).getDate();
    return that.addDays(firstDay, days);
  },
  addDays: function (firstDay, allDays) {
    let that = this;
    let row = 6;
    let col = 7;
    let calBody = c('div');
    let cells = calBody.getElementsByTagName('span');
    for (let i = 0; i < row; i++) {
      let rows = c('p');
      rows.className = 'row';
      for (let i = 0; i < col; i++) {
        let rCell = c('span');
        rows.appendChild(rCell);
        rCell.className = 'cell';
      };
      calBody.appendChild(rows);
    };
    let cellArr = [].slice.call(cells);
    // let cellLen = cellArr.length;
    let fDay = 1;
    let startDay = firstDay || 7;
    for (let i = startDay; i < 42; i++) {
      if (fDay <= allDays) {
        cellArr[i].innerText = fDay;
        if (that.month > new Date().getMonth());
        cellArr[i].className = 'cell date';
        cellArr[i].onclick = function () {
          that.day = i;
        };
      } else {
        cellArr[i].innerText = fDay - allDays;
      };
      if (fDay <= startDay) {
        cellArr[fDay - 1].innerText = allDays - startDay + fDay;
      };
      fDay++;
    };
    return calBody;
  }
};
let calender = new Calender();
let setDom = calender.setDom();
let date = calender.time;
calender.getDays();
console.log('日历中的时间', date);
export {setDom, date};
