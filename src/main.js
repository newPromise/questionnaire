import './index.html';
import '../src/common/comCss.css';
import './index.css';
import {header} from '../src/components/header/header.js';
import {$} from '../src/common/comJs.js';
$('.nairecontent')[0].insertBefore(header(), $('.nairecontent')[0].childNodes[0]);
