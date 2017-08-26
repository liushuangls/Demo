var array = []
for (var i = 0; i < 20; i++) {
  array[i] = Math.floor(Math.random() * 1000)
}
array.count = 0

// 1. 冒泡排序,升序
function bubbingSort(arr) {
  var len = arr.length
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

// 2. 选择排序，升序
function selectSort(arr) {
  var min
  var len = arr.length
  for (var i = 0; i < len; i++) { // 第i个位置
    min = i
    for (var j = i + 1; j < len; j++) {
      arr.count++
      if (arr[j] < arr[min]) {
        min = j
      }
    }
    if (min !== i) {
      var t = arr[i]
      arr[i] = arr[min]
      arr[min] = t
    }
  }
  return arr
}

// 3. 插入排序,从无序区的第一个元素开始和它前面有序区的元素进行比较，如果比前面的元素小，那么前面的元素向后移动，否则就将此元素插入到相应的位置。
function insertSort(arr) {
  var len = arr.length
  for (var i = 1; i < len; i++) {
    var t = arr[i]
    j = i - 1
    while (j >= 0 && t < arr[j]) {
      arr.count++
      arr[j + 1] = arr[j]
      j--;
    }
    arr[j + 1] = t
  }
  return arr
}

// 4. 快速排序
// （1）在数据集之中，选择一个元素作为"基准"（pivot）。
// （2）所有小于"基准"的元素，都移到"基准"的左边；所有大于"基准"的元素，都移到"基准"的右边。
// （3）对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。

function quickSort(arr) {
  if (arr.length <= 1) return arr
  var pivotIndex = Math.floor(arr.length / 2)
  var pivot = arr.splice(pivotIndex, 1)[0]
  var left = []
  var right = []
  
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      arr.count++
      left.push(arr[i])
    } else {
      arr.count++
      right.push(arr[i])
    }
  }

  return quickSort(left).concat([pivot], quickSort(right))
}

// 5.计数排序
// 计数排序（Counting sort）是一种稳定的线性时间排序算法。计数排序使用一个额外的数组C，其中第i个元素是待排序数组A中值等于i的元素的个数。然后根据数组C来将A中的元素排到正确的位置。
function countingSort(arr) {
  var counting = []
  for (var i = 0, len = arr.length; i < len; i++) {
    if (counting[arr[i]]) {
      counting[arr[i]++]
    } else {
      counting[arr[i]] = 1
    }
  }
  arr = []
  for (var x in counting) {
    for (var j = 0, len2 = counting[x]; j < len2; j++) {
      arr.push(x)
    }
  }
  return arr
}

// 6.基数排序
// 基数排序（英语：Radix sort）是一种非比较型整数排序算法，其原理是将整数按位数切割成不同的数字，然后按每个位数分别比较。
