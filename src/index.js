import './style.css';
import './scss/styles.scss';
import * as bootstrap from 'bootstrap';
import { renderWelcomeModal } from './modules/domChanges';

window.bootstrap = bootstrap;

renderWelcomeModal();
