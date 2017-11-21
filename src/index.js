import Flickr from 'Flickr';
import utils from 'utils';

Flickr.onLoad(photos => {
  utils.info('photos', photos);
});
