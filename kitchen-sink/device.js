/**
 * this device detect is from Framework7 v1.6.5 as well as all the components
 */

var device = {}
var ua = navigator.userAgent

var windows = ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/)
var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/)
var ipad = ua.match(/(iPad).*OS\s([\d_]+)/)
var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/)
var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/)

device.ios = device.android = device.windows = device.iphone = device.ipod = device.ipad = device.androidChrome = false

// Windows
if (windows) {
  device.os = 'windows'
  device.osVersion = windows[2]
  device.windows = true
}
// Android
if (android && !windows) {
  device.os = 'android'
  device.osVersion = android[2]
  device.android = true
  device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0
}
if (ipad || iphone || ipod) {
  device.os = 'ios'
  device.ios = true
}
// iOS
if (iphone && !ipod) {
  device.osVersion = iphone[2].replace(/_/g, '.')
  device.iphone = true
}
if (ipad) {
  device.osVersion = ipad[2].replace(/_/g, '.')
  device.ipad = true
}
if (ipod) {
  device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null
  device.iphone = true
}
// iOS 8+ changed UA
if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
  if (device.osVersion.split('.')[0] === '10') {
    device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0]
  }
}

// Webview
device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i)

// Minimal UI
if (device.os && device.os === 'ios') {
  var osVersionArr = device.osVersion.split('.')
  device.minimalUi = !device.webView &&
    (ipod || iphone) &&
    (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) &&
    document.head.querySelectorAll('meta[name="viewport"]').length > 0 && 
    document.head.querySelector('meta[name="viewport"]').content.indexOf('minimal-ui') >= 0
}

// Check for status bar and fullscreen app mode
var windowWidth = window.innerWidth
var windowHeight = window.innerHeight

device.needsStatusBar = function () {
  if (device.webView && (windowWidth * windowHeight === screen.width * screen.height)) {
    return true
  }
  return false
}
device.statusBar = device.needsStatusBar()

// Classes
var classNames = []

// Pixel Ratio
device.pixelRatio = window.devicePixelRatio || 1
classNames.push('pixel-ratio-' + Math.floor(device.pixelRatio))
if (device.pixelRatio >= 2) {
  classNames.push('retina')
}

// OS classes
if (device.os) {
  classNames.push(device.os, device.os + '-' + device.osVersion.split('.')[0], device.os + '-' + device.osVersion.replace(/\./g, '-'))
  if (device.os === 'ios') {
    var major = parseInt(device.osVersion.split('.')[0], 10)
    for (var i = major - 1; i >= 6; i--) {
      classNames.push('ios-gt-' + i)
    }
  }

}
// Status bar classes
if (device.statusBar) {
  classNames.push('with-statusbar-overlay')
}
else {
  document.documentElement.classList.remove('with-statusbar-overlay')
}

// Add html classes
if (classNames.length > 0) {
  classNames.forEach(cls => document.documentElement.classList.add(cls))
}

export default device
