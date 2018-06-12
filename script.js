// the ellipses
function ellipsesInit() {
  var container = $('.box-content');
  var containerHeight = 200;
  $(container).each(function () {
    var wrap = $(this).find('.content');
    var para = $(this).find('p');
    var text = $(para).text();
    var data = $(para).data("content", text);

    $(para).attr("original", data[0].innerText);

    var heightDifference = $(this).outerHeight() - containerHeight;
    var wrapHeight = wrap.height() - heightDifference;
    var paraLineHeight = parseInt($(this).find('p').css('line-height')) || 20;
    $(wrap).css('height', wrapHeight);

    if (wrapHeight >= paraLineHeight) {
      while (para.outerHeight() > wrapHeight) {
        if (!$(para).text().match(/\W*\s(\S)*$/)) {
          break
        }
        else {
          $(para).text(function (index, text) {
            return text.replace(/\W*\s(\S)*$/, '[...]');
          })
        }
        ;
      }
    }
    else {
      $(wrap).hide();
    }
  });
}


// onload
$(window).on('load', ellipsesInit());


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
  var container = $('.box-content');
  var containerHeight = 200;
  $(container).each(function () {
    var wrap = $(this).find('.content');
    var para = $(this).find('p');
    var heightDifference = $(this).outerHeight() - containerHeight;
    var wrapHeight = wrap.height() - heightDifference;
    var paraLineHeight = parseInt($(this).find('p').css('line-height')) || 20;
    $(wrap).css('height', wrapHeight);
    if (wrapHeight >= paraLineHeight) {
      $(para).text($(para).attr('original'));
      while (para.outerHeight() > wrapHeight) {
        if (!$(para).text().match(/\W*\s(\S)*$/)) {
          break
        }
        else {
          $(para).text(function (index, text) {
            return text.replace(/\W*\s(\S)*$/, '[...]');
          })
        }
        ;
      }
    }
    else {
      $(wrap).hide();
    }
  });
}, 150);

// onresize
$(window).on('resize', ellipses);
