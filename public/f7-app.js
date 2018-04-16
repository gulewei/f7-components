require('@f7')

// 避免多次创建f7对象，造成内存泄漏
module.exports = new window.Framework7()
