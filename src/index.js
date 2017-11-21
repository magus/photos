import Flickr from 'Flickr';
import utils from 'utils';


const CONTAINER = document.getElementById('container');

function img(src) {
  const element = document.createElement('img');
  element.src = src;
  return element;
}

function addImage(img) {
  CONTAINER.appendChild(img);
}

Flickr.onLoad(photos => {
  utils.info('photos', photos);

  photos.forEach(photo => {
    addImage(img(photo.media.m));
  });
});
