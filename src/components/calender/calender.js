import './calender.css';
import {c} from '../../common/comJs.js';

function Calender() {
};

Calender.prototype = {
  constructor: Calender,
  setDom: function () {
    let that = this;
    let node = c('div');
    console.log('关于thsi', that.addWeek());
    node.className = 'calender';
    let clInput = c('input');
    clInput.className = 'calenderInput';
    clInput.setAttribute('type', 'text');
    clInput.setAttribute('readonly', 'readonly');
    let clCon = c('div');
    let calenderWeek = that.addWeek();
    clCon.className = 'calenderCon';
    clCon.innerHTML = '<div class="calenderTitle"><div class="calenderAct"><div class="backDate">back</div><div class="showDate"></div><div class="nextDate">next</div>' +
    '</div><div class="calenderWeek">' + calenderWeek.innerHTML + '</div></div><div class="calenderBody"></div>';
    node.appendChild(clInput);
    node.appendChild(clCon);
    return node;
  },
  addWeek: function () {
    let that = this;
    console.log('tha', that);
    let weeks = ['Mon', 'Tue', 'Wed', 'Thu', 'Fir', 'Sat', 'Sun'];
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
  }
};
let calender = new Calender();
let setDom = calender.setDom();
export {setDom};
