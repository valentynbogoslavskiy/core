$(document).ready(function () {
  var scroll = $(window).scrollTop();
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

  //accordion
  if ($('.collapsible').length) {
    $('.collapsible').collapsible();
  }
  //end accordion

  //parallax
  if ($('.parallax').length) {
    $('.parallax').parallax();
  }
  //end parallax


  //check small and large header
  function sizeHeader() {
    var sticky = $('.page-header');
    if (scroll >= 100) sticky.addClass('small-header');
    else sticky.removeClass('small-header');
  }

  sizeHeader();
  //end check small and large header
  $(window).scroll(function () {
    sizeHeader();
    scroll = $(window).scrollTop();
    //effect paralax
    if ($('.slider').length && $(window).height() > scroll) {
      $('.slider img').css({
        '--y': (scroll + scroll / 15) + 'px'
      })
    }
    //end effect paralax
  });

  //start blog item
  if ($('.blog-layout').length) {
    var blogUrl = 'http://staging.proboknow.com/blog/',
      imgUrl = 'https://s3-us-west-1.amazonaws.com/proboknow-lowboknow-storage/blog-stories-images/';

    $.ajax({
      url: 'http://mozok-api-load-balancer-343673538.us-west-2.elb.amazonaws.com/api/blog-stories/loadRandomBlogStories',
      dataType: 'json',
      contentType: 'application/json',
      type: 'post',
      data:
        JSON.stringify({
          "quantity": 3,
          "platform": "proboknow"
        }),

      cache: false,
      success: function (data) {
        var landscape = 0,
          portrait = 0,
          blogData = data.blogStories,
          layoutBlog = $('.blog-layout');
        $('.read-blog').attr('href', blogUrl);
        $(blogData).each(function (i, v) {
          if (v.imageOrientation === 'landscape') {
            landscape += 1;
          }
          if (v.imageOrientation === 'portrait') {
            portrait += 1;
          }
        });
        if (landscape == 1 && portrait == 2) {
          layoutBlog.addClass('layout1');
          $(blogData).each(function (i, v) {
            layoutBlog.find('.box' + (i+1) + ' .box').css({
              'background-image': 'url("'+ imgUrl + blogData[i].image + '")'
            });
            layoutBlog.find('.box' + (i+1) + ' .box h3').append(blogData[i].title);
            layoutBlog.find('.box'  + (i+1) + ' .box a').attr('href', blogUrl + blogData[i].id);
          });
        }
        if (landscape == 2 && portrait == 1) {
          layoutBlog.addClass('layout2');
          layoutBlog.html("<div class='row row--blog-stories'>" +
            "<div class='col l5 m6 s12'>" +
            "<div class='box' style='background-image: url("+imgUrl + blogData[0].image+");'>" +
            "<div class='title center-align'>" +
            "<h3>"+blogData[0].title+"</h3>" +
            "</div>" +
            "<a href='" + blogUrl + blogData[0].id+"'></a>"+
            "</div>" +
            "</div>" +
            "<div class='col l7 m6 box2 s12'>" +
            "<div class='box' style='background-image: url("+imgUrl + blogData[1].image+");'>" +
            "<div class='title center-align'>" +
            "<h3>"+blogData[1].title+"</h3>"+
            "</div>"+
            "<a href='" + blogUrl + blogData[1].id+"'></a>"+
            "</div>"+
            "<div class='box' style='background-image: url("+imgUrl + blogData[2].image+");'>" +
            "<div class='title center-align'>" +
            "<h3>"+blogData[2].title+"</h3>"+
            "</div>"+
            "<a href='" + blogUrl + blogData[2].id+"'></a>"+
            "</div>"+
            "</div>" +
            "</div>");
        }

        if (landscape == 3 || portrait == 3) {
          layoutBlog.addClass('layout3');
          layoutBlog.find('.col').removeClass('l3 l6 m12').addClass('l4 m6');
          $(blogData).each(function (i, v) {
            layoutBlog.find('.box' + (i+1) + ' .box').css({
              'background-image': 'url("'+ imgUrl + blogData[i].image + '")'
            });
            layoutBlog.find('.box' + (i+1) + ' .box h3').append(blogData[i].title);
            layoutBlog.find('.box'  + (i+1) + ' .box a').attr('href', blogUrl + blogData[i].id);
          });
        }
      },
      error: function (data) {
        console.log('errr',data);
      }
    });
  }
  //end blog item

  //testimonial
  if ($('.row--testimonials').length) {
    $.ajax({
      url: 'http://mozok-api-load-balancer-343673538.us-west-2.elb.amazonaws.com/api/testimonials/loadRandomTestimonials',
      dataType: 'json',
      contentType: 'application/json',
      type: 'post',
      data:
        JSON.stringify({
          "quantity": 3,
          "platform": "proboknow"
        }),
      cache: false,
      success: function (data) {
        var dataTestimonials = data.testimonials;
        $(dataTestimonials).each(function (i, v) {
          $('.row--testimonials').prepend("<div class='testimonial'>" +
            "<div class='top-part'>" +
            "<div class='quote-text'>" +
              "<i class='material-icons quote-top large'>format_quote</i>"+
              dataTestimonials[i].value +
              "<i class='material-icons quote-bottom large'>format_quote</i>"+
            "</div>"+
            "</div>"+
              "<div class='bottom-part'>" +
              "<span>"+dataTestimonials[i].author+"<br>"+dataTestimonials[i].location+"</span>"+
              "</div>" +
            "</div>");
        });

      },
      error: function (data) {
        console.log('errr',data);
      }
    });

  }
  //end testimonial

  //curent year footer
  if($('.curren-year').length) {
    var d = new Date();
    var n = d.getFullYear();
    $('.curren-year').prepend(n);
  }
  // end current year footer

  // $(window).on("load", function (e) {
  //   $('.overlay, .preloader-layer').remove();
  // });
  // $('body').on("load", function() {
  //   console.log('sdf');
  // });


});

