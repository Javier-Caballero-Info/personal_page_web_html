window.jQuery = window.$;

(function ($) {
    $.each(['show', 'hide'], function (i, ev) {
        var el = $.fn[ev];
        $.fn[ev] = function () {
            this.trigger(ev);
            return el.apply(this, arguments);
        };
    });
})(jQuery);

const util = {

    hideArticleLoading: function (article) {
        $(article).find('.loader').hide();
        $(article).find('ul').css('opacity', '1');
    },

    uniqueArray: function (a) {
        return a.sort().filter(function (item, pos, ary) {
            return !pos || item != ary[pos - 1];
        })
    }

};

window.module = window.module || {};

module.exports = {util};
