function Rotation(ct) {
  this.ct = ct
  this.init()
  this.bindClick()
}

Rotation.prototype.init = function() {
  this.imgList = this.$('.g-header-rotation')
  this.bullets = this.$('.g-header-bullets li')
  this.imgCount = this.imgList.children.length
  this.imgWidth = parseInt(window.getComputedStyle(this.imgList.children[0]).getPropertyValue('width'))
  this.winWidth = parseInt(window.innerWidth)
  this.AnimateTimmer
  this.autoTimmer
  this.pageIndex = 0
  this.isAnimate = false
  this.addImg(this.imgList)
  this.autoPlay()
}

Rotation.prototype.addImg = function(node) {
  var _this = this
  var firstImg = node.children[0]
  var lastImg = node.children[node.children.length - 1]
  node.appendChild(firstImg.cloneNode(true))
  node.insertBefore(lastImg.cloneNode(true), firstImg)
  node.style.width = this.winWidth * 6 + 'px'
  node.style.left = -this.winWidth + 'px'
  this.$('.g-header-rotation li').forEach(function(x) {
    x.style.width = _this.winWidth + 'px'
  })
}

Rotation.prototype.bindClick = function() {
  var _this = this
  this.$('.g-header-next').addEventListener('click', function() {
    _this.playNext(1)
    clearInterval(_this.autoTimmer)
    _this.autoPlay()
  })
  this.$('.g-header-pre').addEventListener('click', function() {
    _this.playPre(1)
    clearInterval(_this.autoTimmer)
    _this.autoPlay()
  })
  this.bullets.forEach(function(bullet) {
    bullet.addEventListener('click', function() {
      var index = [].indexOf.call(_this.bullets, this)
      clearInterval(_this.autoTimmer)
      _this.autoPlay()
      if (index > _this.pageIndex) {
        _this.playNext(index - _this.pageIndex)
      } else if (index < _this.pageIndex) {
        _this.playPre(_this.pageIndex - index)
      }
    })
  })
}

Rotation.prototype.$ = function(selector) {
  var node = this.ct.querySelectorAll(selector)
  if (node.length === 1) {
    return node[0]
  }
  return node
}

Rotation.prototype.animate = function(node, curValue, endValue, callback) {
  var _this = this
  this.AnimateTimmer = setInterval(function() {
    speed = Math.abs(Math.ceil((endValue - curValue) / 10))
    if (speed <= 5) {
      speed = 5
    }
    if (curValue > endValue) {
      curValue -= speed
      node.style.left = curValue + 'px'
    } else if(curValue < endValue) { 
      curValue += speed
      node.style.left = curValue + 'px'
    }

    if (Math.abs(curValue-endValue) < 5) {
      node.style.left = endValue + 'px'
      clearInterval(_this.AnimateTimmer)
      callback()
    }
  }, 30)
}

Rotation.prototype.setBullet = function() {
  for (var i = 0; i < this.bullets.length; i++) {
    this.bullets[i].classList.remove('active')  
  }
  this.bullets[this.pageIndex].classList.add('active')
}

Rotation.prototype.autoPlay = function() {
  var _this = this
  this.autoTimmer = setInterval(function() {
    _this.playNext(1)
  }, 3000)
}

Rotation.prototype.playNext = function(len) {
  var _this = this
  if (this.isAnimate) return
  this.isAnimate = true
  var speed = (this.winWidth * len) / 10
  var ListLeft = parseInt(window.getComputedStyle(this.imgList).getPropertyValue('left'))
  this.animate(this.imgList, ListLeft ,ListLeft - (this.winWidth * len), function() {
    _this.isAnimate = false
    _this.pageIndex += len
    if (_this.pageIndex === _this.imgCount) {
      _this.imgList.style.left = -_this.winWidth + 'px'
      _this.pageIndex = 0
    }
    _this.setBullet()
  })
}

Rotation.prototype.playPre = function(len) {
  var _this = this
  if (this.isAnimate) return
  this.isAnimate = true
  var speed = (this.imgWidth * len) / 10
  var ListLeft = parseInt(window.getComputedStyle(this.imgList).getPropertyValue('left'))
  this.animate(this.imgList, ListLeft ,ListLeft + this.winWidth * len, function() {
    _this.isAnimate = false
    _this.pageIndex -= len
    if (_this.pageIndex === -1) {
      _this.imgList.style.left = -_this.winWidth * _this.imgCount + 'px'
      _this.pageIndex = 3
    }
    _this.setBullet()
  })
}

module.exports = Rotation