/* 
html:
  <div class="tab-ct">
    <div class="layout">
      <ul class="tab clearfix">
        <li class="active">tab1</li>
        <li>tab2</li>
        <li>tab3</li>
      </ul>
      <ul class="panel">
        <li class="active">ct1</li>
        <li>ct2</li>
        <li>ct3</li>
      </ul>
    </div>
  </div>
*/

function Tab(tabNode) {
  this.init(tabNode)
  this.bindDefault()
}
Tab.prototype.bindDefault = function () {
  var self = this
  this.tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      self.tabs.forEach(function (t) {
        t.classList.remove('active')
      })
      this.classList.add('active')
      var index = [].indexOf.call(self.tabs, this)
      self.panels.forEach(function (ct) {
        ct.classList.remove('active')
      })
      self.panels[index].classList.add('active')
    })
  })
}
Tab.prototype.init = function(tabNode) {
  this.panels = tabNode.querySelectorAll('.panel>li')
  this.tabs = tabNode.querySelectorAll('.tab>li')
}

new Tab(document.querySelector('.tab-ct'))
new Tab(document.querySelector('.tab-ct2'))
new Tab(document.querySelector('.tab-ct3'))