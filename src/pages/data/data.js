import './data.html';
import './data.css';
import '../../common/comCss.css';
import {header} from '../../components/header/header.js';
import {$} from '../../common/comJs.js';
$('.nairecontent')[0].insertBefore(header(), $('.nairecontent')[0].childNodes[0]);
