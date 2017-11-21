// @flow
import utils from 'utils';
import { list } from '../../../Library/Caches/typescript/2.6/node_modules/postcss';

class Flickr {
  constructor() {
    this.isLoaded = false;
    this.photos = [];
    this.listeners = [];

    // https://api.flickr.com/services/feeds/photos_public.gne?format=json
    // Handle jsonp callback from index.html script tag
    window.jsonFlickrFeed = data => {
      utils.info('handleFlickrJSON', data);
      this.photos.push(...data.items);
      this.isLoaded = true;

      this.listeners.forEach(listener => listener(this.photos));
    };
  }

  // Register listener to handle loaded photos
  onLoad(listener) {
    if (this.isLoaded) listener(this.photos);

    this.listeners.push(listener);
  }
}

export default new Flickr();
