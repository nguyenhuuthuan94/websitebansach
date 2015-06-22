(function($) {
    "use strict";
    $(document).ready(function() {

    $("#submit").click(function() {
        $(".error").hide();
        var hasError = false;
        var passwordVal = $("#password").val();
        var checkVal = $("#password-check").val();
        if (passwordVal == '') {
            $("#password").after('<span class="error">Please enter a password.</span>');
            hasError = true;
        } else if (checkVal == '') {
            $("#password-check").after('<span class="error">Please re-enter your password.</span>');
            hasError = true;
        } else if (passwordVal != checkVal) {
            $("#password-check").after('<span class="error">Passwords do not match.</span>');
            hasError = true;
        }
        if (hasError == true) { return false; }
    });
        /*===================================================================================*/
        /*  LAZY LOAD IMAGES USING ECHO
        /*===================================================================================*/

        echo.init({
            offset: 100,
            throttle: 250,
            unload: false
        });


        /*===================================================================================*/
        /*  OWL CAROUSEL
        /*===================================================================================*/
        var owl = $("#owl-demo");
        owl.owlCarousel({
 
              navigationText :false,
              slideSpeed : 300,
              paginationSpeed : 400,
              singleItem:true,
              autoPlay:3000,
              stopOnHover:true
         });

        $(".btnnext").click(function(){
            owl.trigger('owl.next');
        })

        $(".btnprev").click(function(){
            owl.trigger('owl.prev');
        })
 
         /*===================================================================================*/
        /*menu toggle
        /*===================================================================================*/

        //Check to see if the window is top if not then display button
         $(window).scroll(function(){
         if ($(this).scrollTop() > 100) {
         $('.scrollToTop').fadeIn();
         } else {
         $('.scrollToTop').fadeOut();
         }
         });
          
         //Click event to scroll to top
         $('.scrollToTop').click(function(){
         $('html, body').animate({scrollTop : 0},800);
         return false;
         });
         
        /*===================================================================================*/
        /*menu toggle
        /*===================================================================================*/

        $(".menu-toggle-right").click(function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled right");
            $("body").toggleClass("open-sidebar");
        });

        $(".menu-toggle-left").click(function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled left");
            $("body").toggleClass("open-sidebar");
        });

        $(".st-pusher-after,.remove-icon").click(function(e) {
            $("#wrapper").removeClass("toggled");
            $("#wrapper").removeClass("right");
            $("#wrapper").removeClass("left");
            $("body").toggleClass("open-sidebar");
        });


        /*===================================================================================*/
        /* perfect scroll bar
        /*===================================================================================*/
        $('.scrollbar').perfectScrollbar();

        /*===================================================================================*/
        /* PRICE SLIDER
        /*===================================================================================*/

        $( "#slider-range" ).slider({
            range: true,
            min: 0,
            max: 500,
            values: [ 1, 450 ],
            slide: function( event, ui ) {
                $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
            }
        });
        $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
            " - $" + $( "#slider-range" ).slider( "values", 1 ) );
        
        /*===================================================================================*/
        /*  WOW 
        /*===================================================================================*/

        new WOW().init();

        /*===================================================================================*/
        /*  CUSTOM SELECT
        /*===================================================================================*/

        if( $('.le-select').length > 0){
            $('.le-select select').customSelect({customClass:'le-select-in'});
        }
    }); 
})(jQuery);
