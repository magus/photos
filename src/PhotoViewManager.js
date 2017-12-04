// @flow
import { dom, log } from 'utils';


function onImageLoad(src, onLoad) {
  const img = new Image();
  img.onload = () => onLoad(src);
  img.src = src;
}

export default class PhotoViewManager {
  constructor(props) {
    this.api = props.api;
    this.container = props.container;
    this.lightbox = props.lightbox;
    this.lightboxImage = props.lightbox.querySelector('img');
    this.lightboxShadow = props.lightbox.querySelector('#lightbox-shadow');
    this.lightboxTitle = props.lightbox.querySelector('#lightbox-title');
    this.lightboxNext = props.lightbox.querySelector('#lightbox-next');
    this.lightboxPrev = props.lightbox.querySelector('#lightbox-prev');

    // state
    this.state = {
      photos: [],
      selected: 0,
      isLightbox: false,
    };

    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);

    this.api.onLoad((photos, search) => {
      // Clear existing images
      this.container.innerHTML = null;

      log.info(search, photos);

      this.state.photos = [];
      photos.forEach(photo => {
        const img = dom.img(photo.sources.small, photo.title);

        // Add image to container
        this.container.appendChild(img);

        // Store node ref with photo
        this.state.photos.push(Object.assign({}, photo, { node: img }));
      });

      // Attach click handlers after placing in dom
      this.state.photos.forEach((photo, i) => {
        photo.node.addEventListener('click', (event) => {
          this.showLightbox(i);
        });
      });
    });

    this.lightboxShadow.addEventListener('click', (event) => {
      // Clicked lightbox shadow, hide lightbox
      this.hideLightbox();
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

    this.lightboxNext.addEventListener('click', this.next);
    this.lightboxPrev.addEventListener('click', this.prev);
  }

  isValidIndex(index) {
    if (typeof index !== 'number') return false;
    if (index < 0 || index >= this.state.photos.length) return false;

    return true;
  }

  search(search) {
    this.api.search(search);
  }

  showLightbox(index) {
    if (!this.isValidIndex(index)) return console.error('invalid index');

    console.debug('show lightbox');
    this.state.isLightbox = true;
    this.state.selected = index;

    this.lightbox.classList.add('lightbox--show');

    const photo = this.state.photos[index];
    if (!photo) return console.error('invalid photo');

    this.lightboxTitle.innerHTML = photo.title || '(untitled)';

    // Get large image for lightbox
    onImageLoad(photo.sources.large, (src) => {
      this.lightboxImage.src = src;
    });
  }

  hideLightbox() {
    console.debug('hide lightbox');
    this.state.isLightbox = false;
    this.lightbox.classList.remove('lightbox--show');
    this.lightboxImage.removeAttribute('src');
  }

  next() {
    console.debug('next');
    const { selected } = this.state;
    if (!this.isValidIndex(selected)) return console.error('invalid index');

    this.showLightbox(selected + 1);
  }

  prev() {
    console.debug('prev');
    const { selected } = this.state;
    if (!this.isValidIndex(selected)) return console.error('invalid index');

    this.showLightbox(selected - 1);
  }
}
