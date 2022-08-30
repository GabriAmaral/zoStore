$(window).scroll(function() {    
    var scroll = $(window).scrollTop();

    if (scroll < 350) {
        $(".page-header").removeClass("scroll-page-header");
    } else {
        $(".page-header").addClass("scroll-page-header");
    }
        
});