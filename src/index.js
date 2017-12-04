//@flow
import Flickr from 'Flickr';
import PhotoViewManager from 'PhotoViewManager';
import { dom, log } from 'utils';

const photos = new PhotoViewManager({
  api: Flickr,
  container: document.getElementById('photos'),
  lightbox: document.getElementById('lightbox'),
});

photos.search('cats');
