/* eslint-disable */
/**
 * Created by Staneyffer on 18-7-25.
 */

function loadScript(src, callback) {
  if (!(typeof callback === 'function')) {
    callback = function() {};
  }
  var check = document.querySelectorAll("script[src='" + src + "']");
  if (check.length > 0) {
    check[0].addEventListener('load', function() {
      callback();
    });
    callback();
    return;
  }
  var script = document.createElement('script');
  var head = document.getElementsByTagName('head')[0];
  script.type = 'text/javascript';
  script.charset = 'UTF-8';
  script.src = src;
  if (script.addEventListener) {
    script.addEventListener('load', function () {
      callback();
    }, false);
  } else if (script.attachEvent) {
    script.attachEvent('onreadystatechange', function () {
      var target = window.event.srcElement;
      if (target.readyState === 'loaded') {
        callback();
      }
    });
  }
  head.appendChild(script);
}

function loadLink(src, callback) {
  if (!(typeof callback === 'function')) {
    callback = function() {};
  }
  var check = document.querySelectorAll("link[href='" + src + "']");
  if (check.length > 0) {
    callback();
    return;
  }
  var link = document.createElement('link');
  var head = document.getElementsByTagName('head')[0];
  link.rel = 'stylesheet';
  link.href = src;
  if (link.addEventListener) {
    link.addEventListener('load', function () {
      callback();
    }, false);
  } else if (link.attachEvent) {
    link.attachEvent('onreadystatechange', function () {
      var target = window.event.srcElement;
      if (target.readyState === 'loaded') {
        callback();
      }
    });
  }
  head.appendChild(link);
}

export default {
  loadLink,
  loadScript
}