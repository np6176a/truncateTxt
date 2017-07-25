window.ellipses = function (container, containerHeight) {
    $(container).each(function () {
        if ($(this).height() > containerHeight) {
            var wrap = $(this).find('.parawrap');
            var para = $(this).find('.para');
            var heightDifference = $(this).height() - containerHeight;
            var wrapHeight = wrap.height() - heightDifference;
            var paraLineHeight = parseInt($(this).find('.para').css('line-height')) || 18;

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

        }
    });
}
