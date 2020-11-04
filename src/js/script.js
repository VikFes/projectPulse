$(document).ready(function(){
    $('.carousel__iner').slick({
        adaptiveHeight: true,
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/arrowleft.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/arrowright.png"></button>',
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
  });