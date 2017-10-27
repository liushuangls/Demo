// 获取DOM
function $(select) {
  if (select) {
    try {
      return node = document.querySelectorAll(select)
    } catch (error) {
      return null
    }
  } else {
    return null
  }
}

//获取元素的纵坐标（相对于窗口）
function getTop(e){
  var offset=e.offsetTop;
  if(e.offsetParent!=null) offset+=getTop(e.offsetParent);
  return offset;
}

//获取元素的横坐标（相对于窗口）
function getLeft(e){
  var offset=e.offsetLeft;
  if(e.offsetParent!=null) offset+=getLeft(e.offsetParent);
  return offset;
}

// 获取css样式
getStyle (elem, attr) {
  return window.getComputedStyle(elem,null).getPropertyValue(attr)
}