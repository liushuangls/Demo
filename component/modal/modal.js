/* 
html:
  <button class="m1">modal1</button>
  
  <div class="cover hide"></div>
  <div class="Modal hide">
    <div class="header"><span class="close">X</span></div>
    <div class="body"></div>
    <div class="footer"></div>
  </div>
*/

function Modal(btn, callback) {
  this.btn = btn
  this.callback = callback
  this.modal = document.querySelector('.Modal')
  this.cover = document.querySelector('.cover')
  
  this.bind()
}
Modal.prototype.bind = function() {
  var _this = this
  this.btn.onclick = function() {
    _this.cover.classList.remove('hide')
    _this.modal.classList.remove('hide')
    _this.callback(_this.modal)
  }
  document.querySelector('.close').onclick = function() {
    _this.cover.classList.add('hide')
    _this.modal.classList.add('hide')
  }
}

new Modal(document.querySelector('.m1'), function(modal) {
  modal.querySelector('.body').textContent = 'hello world!'
})
new Modal(document.querySelector('.m2'), function(modal) {
  modal.querySelector('.body').textContent = '你好！'
})
new Modal(document.querySelector('.m3'), function(modal) {
  var btn = '<button class="c">关闭</button>'
  modal.querySelector('.body').innerHTML = btn
  document.querySelector('.c').onclick = function() {
    alert('close')
    document.querySelector('.close').click()
  }
})
new Modal(document.querySelector('.m4'), function(modal) {
  var btn = '<button class="y">确定</button>'
  modal.querySelector('.body').innerHTML = btn
  document.querySelector('.y').onclick = function() {
    document.querySelector('.close').click()
  }
})