// the ellipses
$(window).on('load resize', function ellipses () {
  var container = $('.box-content');
  var containerHeight = 200;
  $(container).each(function () {
    var wrap = $(this).find('.content');
    var para = $(this).find('p');
    var heightDifference = $(this).outerHeight() - containerHeight;
    var wrapHeight = wrap.height() - heightDifference;
    var paraLineHeight = parseInt($(this).find('h4').css('line-height')) || 20;

    $(wrap).css('height', wrapHeight);
    if (wrapHeight >= paraLineHeight) {
      while (para.outerHeight() > wrap.height()) {
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
});