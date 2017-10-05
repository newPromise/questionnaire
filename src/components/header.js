import {c} from '../common/comJs.js';

let header = function () {
  let node = c('div');
  let tit = c('span');
  tit.innerText = '问卷管理';
  let mynaire = c('span');
  mynaire.innerText = '我的问卷';
  node.className = 'header';
  node.appendChild(tit);
  node.appendChild(mynaire);
  return node;
};
export {header};
