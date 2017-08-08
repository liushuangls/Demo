// DOM2级addEventListener兼容
function addEvent(node, type, handler) {
  if (!node) return false
  if (node.addEventListener) {
    node.addEventListener(type, handler)
    return true
  }
  if (node.attachEvent) {
    node[e] = handler
    node[handler] = function () {
      // 将event对象作为第一个参数传入处理函数，将this指向node
      node[e](window.event)
    }
    node.attachEvent('om' + type, node[handler])
    return true
  }
  return false
}