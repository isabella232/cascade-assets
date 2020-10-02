import uninav from './uninav';
import offCanvasNav from './offcanvas-nav';

const navigation = {
  initialize() {
    uninav();
    offCanvasNav();
  }
}

export default navigation;