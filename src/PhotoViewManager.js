// @flow
import { dom, log } from 'utils';

export default class PhotoViewManager {
  constructor(props) {
    this.api = props.api;
    this.container = props.container;
    this.lightbox = props.lightbox;
    this.lightboxImage = props.lightbox.querySelector('img');
    this.lightboxShadow = props.lightbox.querySelector('#lightbox-shadow');

    // state
    this.state = {
      selected: null,
      isLightbox: false,
    };

    this.api.onLoad((photos, search) => {
      // Clear existing images
      this.container.innerHTML = null;

      log.info(search, photos);

      photos.forEach(photo => {
        const img = dom.img(photo.sources.small, photo.title);
        this.container.appendChild(img);

        // Select first image by default
        if (!this.state.selected) this.state.selected = img;
      });
    });

    document.body.addEventListener('click', (event) => {
      const { isLightbox } = this.state;

      if (event.target.nodeName === 'IMG' && !isLightbox) {
        this.showLightbox(event.target);
      }

      // Clicked lightbox shadow, hide lightbox
      if (isLightbox && event.target === this.lightboxShadow) {
        this.hideLightbox();
      }
    });

    window.addEventListener('keyup', (event) => {
      // console.debug('keyup', event.key);
      if (event.key === 'ArrowRight') {
        this.next();
      } else if (event.key === 'ArrowLeft') {
        this.prev();
      }
    });

    dom.swipe(document.body, (swipeDir) => {
      console.debug('swipeDir', swipeDir);

      if (swipeDir === 'left') {
        this.next();
      } else if (swipeDir === 'right') {
        this.prev();
      }
    });
  }

  search(search) {
    this.api.search(search);
  }

  showLightbox(img) {
    if (!img) return console.error('invalid img');

    console.debug('show lightbox');
    this.state.isLightbox = true;
    this.state.selected = img;

    this.lightbox.classList.add('lightbox--show');
    this.lightboxImage.src = img.src;
  }

  hideLightbox() {
    console.debug('hide lightbox');
    this.state.isLightbox = false;
    this.lightbox.classList.remove('lightbox--show');
  }

  next() {
    console.debug('next');
    if (!this.state.selected) return;

    this.showLightbox(this.state.selected.nextSibling);
  }

  prev() {
    console.debug('prev');
    if (!this.state.selected) return;

    this.showLightbox(this.state.selected.previousSibling);
  }
}
