$(document).ready(function () {
  //activate mobile menu
  if ($('.sidenav').length) {
    $('.sidenav').sidenav();
  }
  //end activate mobile menu

  //slider
  if ($('.slider').length) {
    $('.slider').slider({
      fullWidth: true,
      indicators: false
    });
    $('.next-button').click(function () {
      $('.slider').slider('next');
    });
    $('.prev-button').click(function () {
      $('.slider').slider('prev');
    });
  }
  //end slider

  //tabs
  if ($('.tabs').length) {
    $('.tabs').tabs();
  }
  //end tabs

  $(window).scroll(function () {
    //check small and large header
    var sticky = $('.page-header'),
      scroll = $(window).scrollTop();
    if (scroll >= 100) sticky.addClass('small-header');
    else sticky.removeClass('small-header');
    //end check small and large header

    //effect paralax
    if ($('.slider').length ) {
      $('.slider img').css({
        '--y': (scroll + scroll/10) + 'px'
      })
    }
    //end effect paralax

  })
  ;
});