/* 
html:
  <input type="text" class="ipt1" placeholder="click me">
  <input type="text" class="ipt2" placeholder="click me">
  <ul class="calendar1 calendar">
    <li class="head">
     <span class="pre"></span>
     <span class="month"></span>
     <span class="next"></span>
   </li>
    <li class="week">
     <span>日</span>
     <span>一</span>
     <span>二</span>
     <span>三</span>
     <span>四</span>
     <span>五</span>
     <span>六</span>
   </li>
    <li class="days">
     <span></span>
     <span></span>
     <span></span>
     <span></span>
     <span></span>
     <span></span>
     <span></span>
   </li>
    <li class="days">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
   </li>
    <li  class="days">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
   </li>
    <li class="days">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
   </li>
    <li class="days">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
   </li>
    <li class="days">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
   </li>
  </ul>
*/


function calendar(node, startTime) {
  this.node = node
  this.startTime = startTime
  this.init()
  this.render()
}
calendar.prototype.init = function() {
  this.timeArr = this.startTime.split('-')
  this.timeArr[0] = parseInt(this.timeArr[0])
  this.timeArr[1] = parseInt(this.timeArr[1])

  this.head = this.node.find('.head .month')
  console.log(this.head);
  this.pre = this.node.find('.head .pre')
  this.next = this.node.find('.head .next')
  this.body = this.node.find('.days span')
  this.bind()
}
calendar.prototype.render = function() {
  var timeObj = this.getTime()
  var Days = 1
  var preDays = timeObj.preLastDay - timeObj.firstDay + 1
  var nextDays = 1
  this.head.text(timeObj.year+'年'+timeObj.month+'月')
  this.body.each(function (i, x) {
    x = $(this)
    if (i < timeObj.firstDay) {
      x.css({color: '#ccc'})
      x.text(preDays++)
    } else if (i >= timeObj.firstDay && Days <= timeObj.lastDay) {
      if (Days < 10) x.text('0' + Days++)
      else x.text(Days++)
      // 在第一个月css渲染后如果后面不改变，那么css样式就会不对
      x.css({color: '#000'})
    } else {
      x.css({color: '#ccc'})
      if (nextDays < 10) x.text('0' + nextDays++)
      else x.text(nextDays++)
    }
  })
}
calendar.prototype.getTime = function() {
  var timeObj = {}
  var preYear = this.timeArr[0]
  var preMonth = this.timeArr[1] - 1
  if (preMonth === 0) {
    preMonth = 12
    preYear--
  }

  timeObj.year = this.timeArr[0]
  timeObj.month = this.timeArr[1]
  timeObj.firstDay = new Date(this.timeArr[0], this.timeArr[1] - 1, 01).getDay()
  // 下个月的第0天就是这个月最后一天
  timeObj.lastDay = new Date(this.timeArr[0], this.timeArr[1], 0).getDate()
  timeObj.preLastDay = new Date(preYear, preMonth, 0).getDate()
  return timeObj
}
calendar.prototype.bind = function() {
  var _this = this
  this.pre.on('click', function() {
    _this.timeArr[1]--
    if (_this.timeArr[1] === 0) {
      _this.timeArr[1] = 12
      _this.timeArr[0]--
    }
    _this.render()
  })
  this.next.on('click', function() {
    _this.timeArr[1]++
    if (_this.timeArr[1] === 13) {
      _this.timeArr[1] = 1
      _this.timeArr[0]++
    }
    _this.render()
  })
  this.body.on('click', function() {
    var index = _this.node.index() - 2
    // 自闭和标签值为value
    $('body>input').eq(index).val(_this.timeArr[0]+'/'+_this.timeArr[1]+'/'+$(this).text())
    _this.node.hide()
  })
}

new calendar($('.calendar1'), '2000-01')
new calendar($('.calendar2'), '2017-08')

$('.ipt1').on('click', function() {
  $('.calendar1').show()
})

$('.ipt2').on('click', function() {
  $('.calendar2').show()
})
