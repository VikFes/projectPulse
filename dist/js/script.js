$(document).ready(function(){
  
  //Carousel
  
  $('.carousel__iner').slick({
        adaptiveHeight: true,
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrowleft.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrowright.png"></button>',
        responsive: [
            {
              breakpoint: 992,
              settings: {
                dots: true,
                arrows: false
              }
            }
        ]
    });

    //Tabs

    $('ul.catalog__tabs').on('click', 'li:not(catalog__tab_active)', function() {
      $(this)
        .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
        .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item){
      $(item).each(function(i){
        $(this).on('click', function(e){
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        });
      });
    } 

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');

    //Modal

    $('[data-modal=consultation]').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function(){
      $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function(i){
      $(this).on('click', function(){
        $('#order .modal__desc').text($('.catalog-item__subtitle').eq(i).text());
        $('.overlay, #order').fadeIn('slow');
      });
    });

    //Validate

    function validateForms(form){
      $(form).validate({
        rules:{
          name:'required',
          phone:'required',
          email: {
            required:true,
            email: true
          }
        },
        messages: {
          name: "Введите Ваше имя",
          phone: "Введите Ваш телефон",
          email: {
            required: "Введите, чтобы мы могли с Вами связаться",
            email: "Введите ваш email в формате 'name@domain.com'"
          }
        }
      });
    }

    validateForms('#order form');
    validateForms('#consultation form');
    validateForms('#consultation-form');

    //Submit

    $('form').submit(function(e){
      e.preventDefault();
      $.ajax({
        type: "POST",
        url: "mailer/smart.php",
        data: $(this).serialize()
      }).done(function(){
        $(this).find("input").val('');
        $('#consultation, #order').fadeOut();
        $('.overlay, #thanks').fadeIn('slow');
        $('form').trigger('reset');
      });
      return false;
    });

    //Scroll

    $(window).scroll(function(){
      if ($(this).scrollTop()>1600) {
        $('.pageup').fadeIn();
      }else{
        $('.pageup').fadeOut();
      }
    });

    $("a[href^='#']").click(function(){
      const _href = $(this).attr("href");
      $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
      return false;
});
  });