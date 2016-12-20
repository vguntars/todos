(function($) {
    $.fn.pUpDown = function(upFromTop = '10px', downFromBottom = '10px', pUpDownSize = '30px', pUpDownColor = 'rgb(255, 0, 0)', pUpDownOpacity = .5) {
        //
        $('body').append($('<span class="page-scroll-box page-scroll-box-up">')
            .css({
                'top': upFromTop,
                'height': pUpDownSize,
                'width': pUpDownSize,
                'background-color': pUpDownColor,
                'opacity': pUpDownOpacity
            })
            .on('click', function(e) {
                $('html, body').animate({
                    scrollTop: '-=' + (document.documentElement.clientHeight || document.body.clientHeight)
                }, 200);
            }));
        //
        $('body').append($('<span class="page-scroll-box page-scroll-box-down">')
            .css({
                'bottom': downFromBottom,
                'height': pUpDownSize,
                'width': pUpDownSize,
                'background-color': pUpDownColor,
                'opacity': pUpDownOpacity
            })
            .on('click', function(e) {
                $('html, body').animate({
                    scrollTop: '+=' + (document.documentElement.clientHeight || document.body.clientHeight)
                }, 200);
            }));
        //
        (function UpDownBoxesOnOff() {
            var documentHeight = document.documentElement.offsetHeight || document.body.offsetHeight;
            var demoHeight = document.documentElement.clientHeight || document.body.clientHeight;
            var scrollDistanceFromTop = document.documentElement.scrollTop || document.body.scrollTop;
            $('span.page-scroll-box-up').toggleClass('page-scroll-box-hide', !scrollDistanceFromTop);
            $('span.page-scroll-box-down').toggleClass('page-scroll-box-hide', demoHeight >= documentHeight - scrollDistanceFromTop);
            setTimeout(UpDownBoxesOnOff, 150);
        })();
        //
    };
}(jQuery));
