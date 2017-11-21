// @flow
import { dom, log } from 'utils';

const API_ENDPOINT = 'https://api.flickr.com/services/feeds/photos_public.gne?format=json';
class Flickr {
  constructor() {
    this.listeners = [];

    // State
    this.state = {
      search: null,
      isLoaded: false,
      photos: [],
    };

    // https://api.flickr.com/services/feeds/photos_public.gne?format=json
    // Handle jsonp callback from this.fetch
    window.jsonFlickrFeed = data => {
      log.info('handleFlickrJSON', data);

      // Convert api data to model
      this.state.photos = data.items.map(this.photo);
      this.state.isLoaded = true;

      this.listeners.forEach(listener => listener(this.state.photos));
    };
  }

  photo(photo) {
    const small = photo.media.m
    const large = small.replace(/_m\.jpg/, '_b.jpg');
    const title = photo.title;

    return { sources: { small, large }, title };
  }

  search(search) {
    this.state.search = search;
    this.state.photos = [];
    this.state.isLoaded = false;

    this.fetch();
  }

  fetch() {
    const endpoint = `${API_ENDPOINT}&tags=${this.state.search}`;
    document.head.appendChild(dom.script(endpoint));
  }

  // Register listener to handle loaded photos
  onLoad(listener) {
    if (this.state.isLoaded) listener(this.state.photos);

    this.listeners.push(listener);
  }
}

export default new Flickr();
