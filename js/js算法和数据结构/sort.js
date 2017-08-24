var array = []
for (var i = 0; i < 20; i++) {
  array[i] = Math.floor(Math.random() * 1000)
}

// 1. 冒泡排序,升序
function bubbingSort(arr) {
  var len = arr.length
  arr.count = 0
  for (var i = 0; i < len; i++) { // 第i次
    for (var j = 1; j < len - i; j++ ) {
      arr.count++
      if (arr[j - 1] > arr[j] ) {
        var t = arr[j - 1]
        arr[j - 1] = arr[j]
        arr[j] = t
      }
    }
  }
  return arr
}

console.log(bubbingSort(array))