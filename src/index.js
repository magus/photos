//@flow
import Flickr from 'Flickr';
import { dom, log } from 'utils';

const CONTAINER = document.getElementById('photos');

function addImage(img) {
  CONTAINER.appendChild(img);
}

Flickr.onLoad(photos => {
  log.info('photos', photos);

  photos.forEach(photo => {
    addImage(dom.img(photo.sources.small, photo.title));
  });
});

Flickr.search('cats');
