/* Add your custom JavaScript code */
//Mobile
var mobiles = new Array
(
    "midp", "j2me", "avant", "docomo", "novarra", "palmos", "palmsource",
    "240x320", "opwv", "chtml", "pda", "windows ce", "mmp/",
    "blackberry", "mib/", "symbian", "wireless", "nokia", "hand", "mobi",
    "phone", "cdm", "up.b", "audio", "sie-", "sec-", "samsung", "htc",
    "mot-", "mitsu", "sagem", "sony", "alcatel", "lg", "eric", "vx",
    "NEC", "philips", "mmm", "xx", "panasonic", "sharp", "wap", "sch",
    "rover", "pocket", "benq", "java", "pt", "pg", "vox", "amoi",
    "bird", "compal", "kg", "voda", "sany", "kdd", "dbt", "sendo",
    "sgh", "gradi", "jb", "dddi", "moto", "iphone", "android",
    "iPod", "incognito", "webmate", "dream", "cupcake", "webos",
    "s8000", "bada", "googlebot-mobile"
)
var ua = navigator.userAgent.toLowerCase();

var isMobile = false;

for (var i = 0; i < mobiles.length; i++) {
	if (ua.indexOf(mobiles[i]) > 0) {
	    isMobile = true;
	    break;
	}
}

//Mobile NAV
var MobileMenuVisible = 0; 
var mMenu = document.getElementById("mobileMenu");
//var mDiv = document.getElementById("maskDiv");
if (mMenu) {
  mMenu.style.height = screen.height-50+'px';
}

var ofweidht = screen.width;
if(ofweidht < 991){
  if (document.getElementById("topbar")) {
    document.getElementById("topbar").className = "bgimg2 topbar_m";
  }
}else{
  if (document.getElementById("topbar")) {
    document.getElementById("topbar").className = "bgimg2 topbar_pc";
  }
    
}

$(".m_nav-to").on("click", function () {
        mobileMenuMove();
        $('.lines-button').toggleClass("tcon-transform");
});
function MyblockUI_click() {
    if(MobileMenuVisible == 1){
        mobileMenuMove();
        $('.lines-button').toggleClass("tcon-transform");
    }
}

function mobileMenuMove() {
    if(MobileMenuVisible == 0){
        clearInterval(id);
        MobileMenuVisible = 1;
        //mDiv.style.display = "block";
        var pos = mMenu.style.right;
        pos = parseInt(pos.replace("px", ""));
        var id = setInterval(frame, 1);
        function frame() {
            if (pos >= 0) {
              clearInterval(id);
            } else {
              pos = pos+4; 
              mMenu.style.right = pos + 'px'; 
            }
        }
        //$("body").bind("touchmove",function(event){event.preventDefault()});
        $('#MyblockUI').block({ message: null });
    }else{
        clearInterval(id);
        MobileMenuVisible = 0;
        //mDiv.style.display = "none";
        var pos = mMenu.style.right;
        pos = parseInt(pos.replace("px", ""));
        var id = setInterval(frame, 1);
        function frame() {
            if (pos <= -250) {
              clearInterval(id);
            } else {
              pos = pos-4; 
              mMenu.style.right = pos + 'px'; 
            }
        }
        //$("body").unbind("touchmove");
        $('#MyblockUI').unblock();
    }
}

//testimonials js
jQuery(document).ready(function($) {
    $("#testimonials2").owlCarousel({
        margin: 60,
        nav: false,
        navText: ['<i class="fa fa-arrow-left icon-white"></i>', '<i class="fa fa-arrow-right icon-white"></i>'],
        autoplay: true,
        loop:true,
        autoplayHoverPause: true,
        dots: true,
        singleItem: true,
        items: 1,
    });
});
jQuery(document).ready(function($) {
    $("#testimonials5").owlCarousel({
        margin: 60,
        nav: false,
        navText: ['<i class="fa fa-arrow-left icon-white"></i>', '<i class="fa fa-arrow-right icon-white"></i>'],
        autoplay: true,
        loop:true,
        autoplayHoverPause: true,
        dots: true,
        singleItem: true,
        items: 1,
    });
    var owl5 = $('#testimonials5');
    owl5.owlCarousel();
    // Go to the next item
    $('#TcustomNextBtn').click(function() {
        owl5.trigger('next.owl.carousel');
    })
    // Go to the previous item
    $('#TcustomPrevBtn').click(function() {
        // With optional speed parameter
        // Parameters has to be in square bracket '[]'
        owl5.trigger('prev.owl.carousel', [300]);
    })
});
jQuery(document).ready(function($) {
    $("#testimonials").owlCarousel({
        margin: 60,
        nav: false,
        navText: ['<i class="fa fa-arrow-left icon-white"></i>', '<i class="fa fa-arrow-right icon-white"></i>'],
        autoplay: true,
        loop:true,
        autoplayHoverPause: true,
        dots: true,
        singleItem: true,
        items: 1,
    });
    var owl = $('#testimonials');
    owl.owlCarousel();
    // Go to the next item
    $('#EcustomNextBtn').click(function() {
        owl.trigger('next.owl.carousel');
    })
    // Go to the previous item
    $('#EcustomPrevBtn').click(function() {
        // With optional speed parameter
        // Parameters has to be in square bracket '[]'
        owl.trigger('prev.owl.carousel', [300]);
    })
});

//左圖右文
jQuery(document).ready(function($) {
    $(".post-mini-slider").owlCarousel({
    margin: 0,
    nav: true,
    navText: ['<img src="img/prev.png">','<img src="img/next.png">'],
    autoplay: true,
    loop:true,
    autoplayHoverPause: true,
    dots: false,
    singleItem: true,
    items: 1
    });
});

//格局規劃
document.getElementById('vhouse2').style.display = 'block';
document.getElementById('vhouse3').style.display = 'none';
document.getElementById('vhouse4').style.display = 'none';
document.getElementById('vhouse2_btn').onclick=function(){vhouse2_btnFun();}
document.getElementById('vhouse3_btn').onclick=function(){vhouse3_btnFun();}
document.getElementById('vhouse4_btn').onclick=function(){vhouse4_btnFun();}
$( "#select_btn" ).change(function() {
    if(this.value==2){
        vhouse2_btnFun();
    };
    if(this.value==3){
        vhouse3_btnFun();
    };
    if(this.value==4){
        vhouse4_btnFun();
    };
});
function vhouse2_btnFun(){
    document.getElementById('vhouse2').style.display = 'block';
    document.getElementById('vhouse3').style.display = 'none';
    document.getElementById('vhouse4').style.display = 'none';
};
function vhouse3_btnFun(){
    document.getElementById('vhouse2').style.display = 'none';
    document.getElementById('vhouse3').style.display = 'block';
    document.getElementById('vhouse4').style.display = 'none';
};
function vhouse4_btnFun(){
    document.getElementById('vhouse2').style.display = 'none';
    document.getElementById('vhouse3').style.display = 'none';
    document.getElementById('vhouse4').style.display = 'block';
};

//歷年建案
jQuery(document).ready(function($) {  
    $("#yearworks").owlCarousel({
        margin: 20,
        nav: false,
        navText: ['<i class="fa fa-arrow-left icon-white"></i>', '<i class="fa fa-arrow-right icon-white"></i>'],
        autoplay: true,
        loop:true,
        autoplayHoverPause: true,
        dots: true,
        singleItem: true,
        items: 3,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 3
            },
            1200: {
                items: 3
            }
        }
    });
    var owl6 = $('#yearworks');
    owl6.owlCarousel();
    // Go to the next item
    $('#workscustomNextBtn').click(function() {
        owl6.trigger('next.owl.carousel');
    })
    // Go to the previous item
    $('#workscustomPrevBtn').click(function() {
        // With optional speed parameter
        // Parameters has to be in square bracket '[]'
        owl6.trigger('prev.owl.carousel', [300]);
    })
});

//媒體報導
jQuery(document).ready(function($) {  
    $("#MediaNews").owlCarousel({
        margin: 40,
        nav: false,
        navText: ['<i class="fa fa-arrow-left icon-white"></i>', '<i class="fa fa-arrow-right icon-white"></i>'],
        autoplay: true,
        loop:true,
        autoplayHoverPause: true,
        dots: true,
        singleItem: true,
        items: 2,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 2
            },
            1200: {
                items: 2
            }
        }
    });
    var owl3 = $('#MediaNews');
    owl3.owlCarousel();
    // Go to the next item
    $('#NewscustomNextBtn').click(function() {
        owl3.trigger('next.owl.carousel');
    })
    // Go to the previous item
    $('#NewscustomPrevBtn').click(function() {
        // With optional speed parameter
        // Parameters has to be in square bracket '[]'
        owl3.trigger('prev.owl.carousel', [300]);
    })
});

//廣告特惠戶
jQuery(document).ready(function($) {  
    $("#SaleHouse").owlCarousel({
        margin: 40,
        nav: false,
        navText: ['<i class="fa fa-arrow-left icon-white"></i>', '<i class="fa fa-arrow-right icon-white"></i>'],
        autoplay: true,
        loop:true,
        autoplayHoverPause: true,
        dots: true,
        singleItem: true,
        items: 2,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 2
            },
            1200: {
                items: 2
            }
        }
    });
    var owl4 = $('#SaleHouse');
    owl4.owlCarousel();
    // Go to the next item
    $('#HousecustomNextBtn').click(function() {
        owl4.trigger('next.owl.carousel');
    })
    // Go to the previous item
    $('#HousecustomPrevBtn').click(function() {
        // With optional speed parameter
        // Parameters has to be in square bracket '[]'
        owl4.trigger('prev.owl.carousel', [300]);
    })
});

//影片背景
$(document).ready(function () {

    $(".player").mb_YTPlayer();

});

$('.scroll-hint-container').on('scroll tap swipe', function() {
  var lastScrollLeft = 0 
  var documentScrollLeft = $('.scroll-hint-container').scrollLeft();
    if (lastScrollLeft != documentScrollLeft) {
        lastScrollLeft = documentScrollLeft;
        $('.scroll-hint-mask').fadeOut()
    }
})

$('.privacy-checkbox').click(function() {
  $('.formSendBtn').toggle()
})


var $root = $('html, body');

// $('a[href^="#"]').click(function() {
//     var href = $.attr(this, 'href');

//     $root.animate({
//         scrollTop: $(href).offset().top
//     }, 500, function () {
//         window.location.hash = href;
//     });

//     return false;
// });

$.fn.inView = function(){
    if(!this.length) return false;
    var rect = this.get(0).getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );

};

//additional examples for other use cases
//true false whether an array of elements are all in view