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

  //menu scroll
  $('.header-menu a, .sidenav a').click(function (e) {
    var target = $(this).attr('href'),
      has = target.charAt(0);

    if (has === '#' && $(target).length) {
      e.preventDefault();
      $('html, body').animate({scrollTop: $(target).offset().top - 25}, 1000);
    }
  });
  //end menu scroll

  //tabs
  if ($('.tabs').length) {
    $('.tabs').tabs();
  }
  //end tabs

  //check small and large header
  function sizeHeader() {
    var sticky = $('.page-header'),
      scroll = $(window).scrollTop();
    if (scroll >= 100) sticky.addClass('small-header');
    else sticky.removeClass('small-header');
  }

  sizeHeader();
  //end check small and large header


  $(window).scroll(function () {
    sizeHeader();
    //effect paralax
    if ($('.slider').length && $(window).height() > scroll) {
      $('.slider img').css({
        '--y': (scroll + scroll / 15) + 'px'
      })
    }
    //end effect paralax
  })
  ;
});