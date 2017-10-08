import './indicator.css';
import {$, c, Client} from '../../common/comJs.js';
class Indicator {
  constructor (dom) {
    this.dom = dom;
    this.ensure = false;
  }
  init () {
    console.log('body', document.documentElement.clientWidth);
    $('body')[0].appendChild(this.setDom());
  }
  setDom () {
    let shade = c('div');
    shade.className = 'shade';
    let alertBox = c('div');
    alertBox.className = 'alertBox';
    let alertHead = c('div')
    alertHead.className = 'alertHead';
    alertHead.innerHTML = '<span>提示</span>';
    let close = c('span');
    close.className = 'close';
    close.innerText = '关闭';
    close.onclick = () => {
      this.close();
    };
    alertHead.appendChild(close);
    let alertBody = c('div');
    alertBody.className = 'alertBody';
    alertBody.innerHTML = this.dom;
    let alertFooter = c('div');
    alertFooter.className = 'alertFooter';
    let ensure = c('span');
    let cancel = c('span');
    ensure.innerText = '确定';
    ensure.onclick = () => {
      this.ensure = true;
      this.close();
    };
    cancel.innerText = '取消';
    cancel.onclick = () => {
      console.log('this', this);
      this.close();
    };
    ensure.className = 'ensure';
    cancel.className = 'cancel';
    alertFooter.appendChild(ensure);
    alertFooter.appendChild(cancel);
    alertBox.appendChild(alertHead);
    alertBox.appendChild(alertBody);
    alertBox.appendChild(alertFooter);
    shade.appendChild(alertBox);
    let client = new Client();
    shade.style.width = client.clientWidth();
    shade.style.height = client.clientHeight();
    return shade;
  }
  open () {
    if (typeof $('.shade')[0] !== 'object') {
      this.init();
    } else {
      $('.shade')[0].style.display = '';
    };
    this.ensure = false;
  }
  close () {
    $('.shade')[0].style.display = 'none';
    return false;
  }
};
export {Indicator};
