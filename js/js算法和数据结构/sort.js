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
  if (arr.length <= 1) { return arr; }
  var pivotIndex = Math.floor(arr.length / 2);
  var pivot = arr.splice(pivotIndex, 1)[0];
  var left = [];
  var right = [];
  for (var i = 0; i < arr.length; i++){
      if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([pivot], quickSort(right));
}
