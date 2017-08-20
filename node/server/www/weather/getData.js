var weather = {}
var ip, city, cityid

function query(city) {
  if(city) {
    getCityId(city, getWeather)
    setTimeout(function() {
      if (weather.status === 'OK') {
        updateDate(weather)
      } else {
        alert('查询错误！')
      }
    }, 800);
  }else {
    $.ajax({
      type: 'get',
      url: 'https://weixin.jirengu.com/weather/ip',
      success: function(data) {
        ip = data.data
        getCityId(ip, getWeather)
        getCity()
      },
      complete: function() {
        setTimeout(function() {
          updateDate(weather)
        }, 500)
      }
    })
  }
}
query()

function getCityId(ip, callback) {
  $.get('https://weixin.jirengu.com/weather/cityid?location=' + ip, function(data) {
    cityid = data.results[0].id
    callback(cityid)
  })
}

function getWeather(cityid) {
  $.get('https://weixin.jirengu.com/weather/now?cityid=' + cityid, function(data) {
    var today = data.weather[0].today
    var now = data.weather[0].now
    var future = data.weather[0].future
    weather.now = {}
    weather.today = {}
    weather.future = {}
    weather.status = data.status
    getNow(now)
    getToday(today)
    getFuture(future, 0)
    getFuture(future, 1)
    getFuture(future, 2)
    getFuture(future, 3)
    getFuture(future, 4)
    getFuture(future, 5)
    getFuture(future, 6)

  })
}

function getFuture(future,i) {
  weather.future[i] = {day: future[i].date.slice(5, 10), code: future[i].code1, text: future[i].text, wind: future[i].wind, high: future[i].high + '°C', low: future[i].low + '°C'}
}

function getNow(now) {
  weather.now.temperature = now.temperature
  weather.now.humidity = now.humidity + '%'
  weather.now.wind = now.wind_direction + '风' + ' ' +now.wind_scale + '级'
  weather.now.quality = now.air_quality.city.quality
  weather.now.time = getTime()
}

function getToday(today) {
  weather.today.sunrise = today.sunrise.slice(0,5)
  weather.today.sunset = today.sunset.slice(0,5)
  weather.today.day = new Date().getDate()
  weather.today.code = now.code
  weather.today.text = now.text
}

function getCity() {
  $.get('https://jirenguapi.applinzi.com/city.php', function(getCity) {
    weather.city = getCity
  })
}

function getTime() {
  var date = new Date()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hours = date.getHours()
  var minutes = date.getMinutes()

  return month+'月'+day+' '+hours+':'+minutes
}

$('#query-btn').on('click', function() {
  var city = $('#query-city').val()
  if (!/^[a-z]{1,}$/.test(city)) {
    alert('仅支持拼音查询！')
    return
  }

  weather.city = city
  query(city)
})