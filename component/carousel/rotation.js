/* 
  html:
  <section class="roast1">
    <ul class="imgList">
      <li><img src="http://cdn.jirengu.com/book.jirengu.com/img/26.jpg"></li>
      <li><img src="http://cdn.jirengu.com/book.jirengu.com/img/25.jpg"></li>
      <li><img src="http://cdn.jirengu.com/book.jirengu.com/img/24.jpg"></li>
      <li><img src="http://cdn.jirengu.com/book.jirengu.com/img/23.jpg"></li>
    </ul>
    <span class="pre"><</span><span class="next">></span>
    <ul class="bullets">
      <li class="active"></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </section>
*/

/* var Roast = (function() {
  function Roasting(ct) {
    this.ct = ct
    this.init()
    this.bindClick()
  }

  Roasting.prototype.init = function() {
    this.imgList = this.$('.imgList')
    this.bullets = this.$('.bullets li')
    this.imgCount = this.imgList.children.length
    this.imgWidth = parseInt(window.getComputedStyle(this.imgList.children[0]).getPropertyValue('width'))
    this.AnimateTimmer
    this.autoTimmer
    this.pageIndex = 0
    this.isAnimate = false

    this.addImg(this.imgList)
    this.autoPlay()
  }

  Roasting.prototype.addImg = function(node) {
    var firstImg = node.children[0]
    var lastImg = node.children[node.children.length - 1]
    node.appendChild(firstImg.cloneNode(true))
    node.insertBefore(lastImg.cloneNode(true), firstImg)
    node.style.width = this.imgWidth * (this.imgCount + 2) + 'px'
  }

  Roasting.prototype.bindClick = function() {
    var _this = this
    this.$('.next').addEventListener('click', function() {
      _this.playNext(1)
      clearInterval(_this.autoTimmer)
      _this.autoPlay()
    })
    this.$('.pre').addEventListener('click', function() {
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

  Roasting.prototype.$ = function(selector) {
    var node = this.ct.querySelectorAll(selector)
    if (node.length === 1) {
      return node[0]
    }
    return node
  }

  Roasting.prototype.animate = function(node, curValue, endValue, callback) {
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

  Roasting.prototype.setBullet = function() {
    for (var i = 0; i < this.bullets.length; i++) {
      this.bullets[i].classList.remove('active')  
    }
    this.bullets[this.pageIndex].classList.add('active')
  }

  Roasting.prototype.autoPlay = function() {
    var _this = this
    this.autoTimmer = setInterval(function() {
      _this.playNext(1)
    }, 3000)
  }

  Roasting.prototype.playNext = function(len) {
    var _this = this
    if (this.isAnimate) return
    this.isAnimate = true
    var speed = (this.imgWidth * len) / 10
    var ListLeft = parseInt(window.getComputedStyle(this.imgList).getPropertyValue('left'))
    this.animate(this.imgList, ListLeft ,ListLeft - (this.imgWidth * len), function() {
      _this.isAnimate = false
      _this.pageIndex += len
      if (_this.pageIndex === _this.imgCount) {
        _this.imgList.style.left = -_this.imgWidth + 'px'
        _this.pageIndex = 0
      }
      _this.setBullet()
    })
  }

  Roasting.prototype.playPre = function(len) {
    var _this = this
    if (this.isAnimate) return
    this.isAnimate = true
    var speed = (this.imgWidth * len) / 10
    var ListLeft = parseInt(window.getComputedStyle(this.imgList).getPropertyValue('left'))
    this.animate(this.imgList, ListLeft ,ListLeft + this.imgWidth * len, function() {
      _this.isAnimate = false
      _this.pageIndex -= len
      if (_this.pageIndex === -1) {
        _this.imgList.style.left = -_this.imgWidth * _this.imgCount + 'px'
        _this.pageIndex = 3
      }
      _this.setBullet()
    })
  }

  return {
    init: function(node) {
      node.forEach(function (item) {
        new Roasting(item)
      })
    }
  }
})()

Roast.init(document.querySelectorAll('.roast1')) */

