require.config({
  baseURL: '../js',
  paths: {
    'jquery': 'jquery-3.2.1.min'
  }
})

require(['jquery', 'rotation', 'waterfalls'], 
function($, Rotation, waterfall) {
  new Rotation(document.querySelector('.g-header'))
  waterfall.getData()
  waterfall.bind()
})