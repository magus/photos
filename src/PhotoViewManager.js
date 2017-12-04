// @flow
import { dom, log } from 'utils';

export default class PhotoViewManager {
  constructor(props) {
    this.api = props.api;
    this.container = props.container;

    // state
    this.state = {
      selected: 0,
      isLightbox: false,
    };

    this.api.onLoad((photos, search) => {
      // Clear existing images
      this.container.innerHTML = null;

      log.info(search, photos);

      photos.forEach(photo => {
        const img = dom.img(photo.sources.small, photo.title);
        this.container.appendChild(img);
      });
    });

    document.body.addEventListener('click', (event) => {
      const { isLightbox } = this.state;
      if (event.target.nodeName === 'IMG' && !isLightbox) {
        this.showLightbox();
      } else if (isLightbox) {
        this.hideLightbox();
      }
    });
  }

  search(search) {
    this.api.search(search);
  }

  showLightbox() {
    console.debug('show lightbox');
    this.state.isLightbox = true;
  }

  hideLightbox() {
    console.debug('hide lightbox');
    this.state.isLightbox = false;
  }
}
