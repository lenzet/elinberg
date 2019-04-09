$(function() {

  $(window).scroll(function(){
    $('.select').removeClass('clicked');
    if ($(this).scrollTop() > $(this).height()) {
      $('.top').addClass('active');
    } else {
      $('.top').removeClass('active');
    }
    scrollAnimate('.s-about .about-text', 'slideInRight');
    scrollAnimate('.s-form form', 'slideInUp');
    scrollAnimate('.s-reviews .reviews', 'slideInUp');
    scrollAnimate('.s-service .services', 'slideInUp');
    scrollAnimate('.contacts-text', 'slideInRight');
    scrollAnimate('.h2:not(.s-contacts .h2), .s-form .connect', 'fadeInUp');
  });

  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      $('.select').removeClass('clicked');
    }
  });

  $('a[href^="#"]').mPageScroll2id({
    scrollEasing: 'swing'
  });

  $('.top').click(function(){
    $('html, body').stop().animate({scrollTop: 0}, 'slow', 'swing');
  });

  $('.owl-carousel.services').owlCarousel({
    items: 1,
    loop: true,
    smartSpeed: 700,
    dots: true,
    nav: false,
    autoHeight: true,
    // autoplay: true,
    // autoplayTimeout: 5000,
    // autoplayHoverPause: true
  });

  $('.owl-carousel.reviews').owlCarousel({
    items: 1,
    loop: true,
    smartSpeed: 1000,
    dots: true,
    nav: false,
    autoHeight: true,
    // autoplay: true,
    // autoplayTimeout: 5000,
    // autoplayHoverPause: true
  });

  $('.select').append('<div class="arrow"><i class="fa fa-angle-down"></i></div>');

  $('select').click(function(){
    $('.select').not($(this).parent()).removeClass('clicked');
    if (!$(this).parent().hasClass('clicked')) {
      $(this).parent().addClass('clicked');
    } else {
      $(this).parent().removeClass('clicked');
    }
    $('body').click(function(){
      $('.select').removeClass('clicked');
    });
    $(this).parent().click(function(e){
      e.stopPropagation();
    });
  });

  $('.service .button').click(function(){
    $('option[value="' + $(this).attr('data') + '"]').attr('selected', '1');
  });

  $('form.mail').submit(function() { 
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "mail.php", 
      data: th.serialize()
    }).done(function() {
      th.trigger("reset");
      $('.thanks-wrapper').fadeIn();
      setTimeout(function(){
        $('.thanks-wrapper').fadeOut();
      }, 3000);
    });
    return false;
  });

  $('.thanks-wrapper .close').click(function(e){
    e.preventDefault();
    $('.thanks-wrapper').fadeOut();
  });

  function scrollAnimate(selector, animation, px) {
    var px = px || 50;
    if (document.documentElement.clientWidth >= 768) {
      $(selector).each(function(){
        if (!$(this).hasClass('animateStop')) {
          var pos = $(this).offset().top;
          var topScroll = $(window).scrollTop();
          var height = document.documentElement.clientHeight;
          $(this).css('opacity','0');
          if (pos < topScroll + height - px) {
            $(this).css('opacity', '1');
            $(this).addClass('animated').addClass(animation).addClass('animateStop');
          }
        }
      });
    } else {
      $(selector).css('opacity','1');
    }
  }
});

$(window).on('load', function() {
  $('.preloader').fadeOut();
  $('.h1, .header-center p').addClass('animated').addClass('fadeInDown');
  $('.header-center .button').addClass('animated').addClass('fadeInLeft');
});