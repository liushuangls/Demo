$('.tabs li').on('click', function() {
  var index = $(this).index()
  $(this).addClass('active').siblings().removeClass('active')
  $('.panel ul').eq(index).show().siblings().hide()
})

function updateDate(weather) {
  console.log(weather)
  var future = weather.future
  $('#city').text(weather.city)
  $('#now').text(weather.now.time)
  $('#now-tem').text(weather.now.temperature + '°C')
  $('#now-humidity').text(weather.now.humidity)
  $('#now-wind').text(weather.now.wind)
  $('#now-quality').text(weather.now.quality)

  $('#tem-day').text(weather.today.day)
  changeImg($('.tem-during'), future[0].code)
  $('.tem .rain').text(future[0].text)
  $('.tem .high').text(future[0].high)
  $('.tem .low').text(future[0].low)
  $('.tem .wind').text(future[0].wind)
  $('#sunrise').text(weather.today.sunrise)
  $('#sunrise').text(weather.today.sunset)

  setFuture($('#one'),future, 0)
  setFuture($('#two'),future, 1)
  setFuture($('#three'),future, 2)
  setFuture($('#four'),future, 3)
  setFuture($('#five'),future, 4)
  setFuture($('#six'),future, 5)
  setFuture($('#seven'),future, 6)
}

function changeImg(node, code) {
  var str = '0 0'
  code = (+code)
  if (code === 0 || code === 1 || code === 2 || code === 3 || code === 38) {
    str = '0 0'
  }else if(code === 4 || code === 9) {
    str = '-160px 0'
  }else if(code === 5 || code === 6 || code === 7 || code === 8) {
    str = '-80px 0'
  }else if(code === 11 || code === 12) {
    str = '-320px 0'
  }else if(code === 13) {
    str = '-560px 0'
  }else if(code === 14) {
    str = '0 -80px'
  }else if(code >= 10 && code <= 18) {
    str = '-160px -80px'
  }else if(code === 19 || code === 20) {
    str = '-480px 0'
  }else if(code >= 21 && code <= 25) {
    str = '-640px -80px'
  }else if(code >= 26 && code <= 29) {
    str = '-720px 0'
  }else {
    str = '-80px -160px'
  }

  // jQeury的css()方法尽然不能设置background-position!
  node.each(function() {
    this.style.backgroundPosition = str
  })
}

function setFuture(node,future, i) {
  node.find('.f-day').text(future[i].day)
  changeImg(node.find('.f-img'), future[i].code)
  node.find('.f-r').text(future[i].text)
  node.find('.f-tem').text(future[i].low + '~' + future[i].high)
  node.find('.f-wind').text(future[i].wind)
}
