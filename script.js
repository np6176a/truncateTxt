var container = $('.box-content');
var containerHeight = 200;

// creating attribute to store original text
function oriAttr(p, data) {
  $(p).attr("original", data[0].innerText);
}

function txtEdit(wrapHeight, p) {
  var paraLineHeight = parseInt($(p).css('line-height')) || 20;

  if (wrapHeight >= paraLineHeight) {
    $(p).text($(p).attr('original'));
    while (p.outerHeight() > wrapHeight) {
      if (!$(p).text().match(/\W*\s(\S)*$/)) {
        break
      }
      else {
        $(p).text(function (index, text) {
          return text.replace(/\W*\s(\S)*$/, '[...]');
        })
      };
    }
  }
  else {
    $(wrap).hide();
  }
}

function calcHeight(t, w, p) {
  var heightDifference = $(t).outerHeight() - containerHeight;
  var wrapHeight = w.height() - heightDifference;
  $(w).css('height', wrapHeight);
  txtEdit(wrapHeight, p);
}

// the ellipses
function ellipsesInit() {
  $(container).each(function () {
    var wrap = $(this).find('.content');
    var para = $(this).find('p');
    var text = $(para).text();
    var data = $(para).data("content", text);

    oriAttr(para, data);

    calcHeight(this, wrap, para);

  });
}

// the bit to make resize happen slowly
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

var ellipses = debounce(function () {

  $(container).each(function () {
    var wrap = $(this).find('.content');
    var para = $(this).find('p');

    calcHeight(this, wrap, para);

  });

}, 150);


// onload
$(window).on('load', ellipsesInit());

// onresize
$(window).on('resize', ellipses);
