//@flow
import Flickr from 'Flickr';
import utils from 'utils';

const CONTAINER = document.getElementById('photos');

function img(photo) {
  const element = document.createElement('img');
  element.src = photo.media.m;
  element.title = photo.title;
  return element;
}

function addImage(img) {
  CONTAINER.appendChild(img);
}

Flickr.onLoad(photos => {
  utils.info('photos', photos);

  photos.forEach(photo => {
    addImage(img(photo));
  });
});
