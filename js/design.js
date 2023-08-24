$(function(){
     //html 불러오기
     var allElements = document.getElementsByTagName('*');
     Array.prototype.forEach.call(allElements, function(el) {
         var includePath = el.dataset.includePath;
         if (includePath) {
             var xhttp = new XMLHttpRequest();
             xhttp.onreadystatechange = function () {
                 if (this.readyState == 4 && this.status == 200) {
                     el.outerHTML = this.responseText;
                 }
             };
             xhttp.open('GET', includePath, true);
             xhttp.send();
         }
     }); 

    //dialog-close
    $(".dialog-close").click(function(){
        $(".dialog").fadeOut();
    });
	

    //tab
	$(document).on('click','.nav_tabs a', function(){
        e.preventDefault();
        var idx = $(this).parent("li").index()
        var target = $(this).attr('href');
        $(this).parent().parent().find("li").removeClass("on");
        $(this).parent("li").addClass("on")
        $(this).parents().children(".index").find(".tabcon").hide();
        $(target).css('display', 'block');
        console.log($(this).parent().parent().find(".nav_tabs li"))
    });

    function Page__init() {
        Page_updateOffsetTop();
    }
    
    // 초기화
    Page__init();
    $("body").resize(Page_updateOffsetTop);
    $("body").scroll(Page_updateIndicatorActive);
    
   
});

function Page_updateIndicatorActive() {
    $($('section').get().reverse()).each(function(index, node) {
        var scrollTop = $("body").scrollTop();
        var $node = $(this);
        var offsetTop = parseInt($node.attr('data-offset-top'));
        if ( scrollTop >= offsetTop - 130) {
            $('nav .nav-link.active').removeClass('active');
            var currentPageIndex = $node.index();
            $('nav .nav-link').eq(currentPageIndex).addClass('active');  
            $('html').attr('data-current-page-index', currentPageIndex);
            return false;
        }
    });
}

function Page_updateOffsetTop() {
    $('section').each(function(index, node) {
        var $page = $(node);
        var offsetTop = $page.offset().top;
        
        $page.attr('data-offset-top', offsetTop);
    });
    
    Page_updateIndicatorActive();
}



function onInfoView(idNum){
    $("#" + idNum).fadeIn()
}