# photos
- (dev) `yarn start`
- (prod) `yarn build`, commit and push

# Features
- Click photo to view in lightbox
- Mobile swipe left and right
- Desktop left and right arrow keys

# Tasks
- API to promise all when all images are (loaded or timeout) (promise race)
- Photos overaly fade out when images loaded
- PhotoViewManager
    - Lightbox (shows currently selected image)
    - Left Right click handlers along entire vertical side of lightbox


# In an ideal world...
...with more time, a more complex app, etc.
- Super simple loading all styles inline, in complex app ideally load styles related to what we need to display only


# Instructions
- Photo API
  - Flickr: https://www.flickr.com/services/api/flickr.photosets.getPhotos.html
  - Google Image Search: https://developers.google.com/custom-search/json-api/v1/overview
- Grid of thumbnails
- Click -> Lightbox with photo title
- Next/Previous movement between photos
- Polished user experience
- Native javascript only
- Run without errors in Chrome, Safari, Firefox, and Edge


