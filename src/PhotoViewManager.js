// @flow
import { dom, log } from 'utils';

export default class PhotoViewManager {
  constructor(props) {
    this.api = props.api;
    this.container = props.container;

    // Create lightbox
    this.lightbox = dom.create('div');
    this.lightbox.id = 'lightbox';
    document.body.appendChild(this.lightbox);

    // state
    this.state = {
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
      }

      // Clicked outside lightbox, hide lightbox
      if (isLightbox && !this.lightbox.contains(event.target)) {
        this.hideLightbox();
      }
    });

    window.addEventListener('keyup', (event) => {
      // console.debug('keyup', event.key);
      if (event.key === 'ArrowRight') {
        console.debug('next');
      } else if (event.key === 'ArrowLeft') {
        console.debug('prev');
      }
    });
  }

  search(search) {
    this.api.search(search);
  }

  showLightbox() {
    console.debug('show lightbox');
    this.state.isLightbox = true;
    this.lightbox.classList.add('lightbox--show');
  }

  hideLightbox() {
    console.debug('hide lightbox');
    this.state.isLightbox = false;
    this.lightbox.classList.remove('lightbox--show');
  }
}
