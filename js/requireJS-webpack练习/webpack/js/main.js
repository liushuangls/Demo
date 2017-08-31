var rotation = require('./rotation')
var waterfall = require('./waterfalls')

new rotation(document.querySelector('.g-header'))
waterfall.getData()
waterfall.bind()