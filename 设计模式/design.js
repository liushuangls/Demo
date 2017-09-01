// 1. 构造函数模式
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.sayName = function() {
  console.log(this.name);
}
var student = new Person('liushuang', 20)

// 2. 工厂模式
function createPerson(name, age) {
  var obj = {
    name: name,
    age: age,
    sayName: function() {
      console.log(this.name)
    }
  }
  return obj
} 
var student2 = createPerson('liushuang', 20)

// 3. 单例模式,仅初始化一次,节约内存
var Person = (function() {
  var instance
  function init(name) {
    return {
      name: name
    }
  }
  return {
    createPeople: function(name) {
      if (!instance) {
        instance = init(name)
      }
      return instance
    }
  }
}())

Person.createPeople('liushuang') // {name: 'liushuang'}
Person.createPeople('bill') // {name: 'liushuang'}

// 4.混合模式
function Person(name, age) {
  this.name = name
  this.age = age
}
Person.prototype.sayName = function() {
  console.log(this.name);
}

function Student(name, age, score) {
  Person.call(this, name, age)
  this.score = score
}
// Student.prototype = Object.create(Person.prototype)
Student.prototype = create(Person.prototype)
function create(obj) {
  function F(){}
  F.prototype = obj
  return new F()
}
Student.prototype.sayScore = function() {
  console.log(this.score);
}
Student.prototype.constructor = Student

var student = new Student('liu', 20, 100)

// 5. 模块模式
var Person = (function() {
  var name = '刘爽'
  function sayName() {
    console.log(name)
  }
  return {
    name: name,
    sayName: sayName
  }
}())

// 6. 订阅发布模式
var EventCenter = (function() {
  var events = {}
  function on(event, handler) {
    events[event] = events[event] || []
    events[event].push(handler)
  }
  function fire(event, args) {
    if (!events[event]) {
      return
    }
    for (var i = 0;i < events[event].length; i++) {
      events[event][i].handler(args)
    } 
  }
  function off(event) {
    delete events[event]
  }
  return {
    on: on,
    fire: fire,
    off: off
  }
}())
