
window.addEventListener('load', function() {
  //system
  //popup
  $('.c_dialog .p_close').on('click', function(e){
    e.preventDefault();
    var popup = $(this).parents('.c_dialog');
    //console.log(popup)
    if(popup.length > 0){
      popup.fadeOut();
    }
  });
  //center popup
  $('.ct_dialog .p_close').on('click', function(e){
    e.preventDefault();
    var popup = $(this).parents('.ct_dialog');
    //console.log(popup)
    if(popup.length > 0){
      popup.fadeOut();
    }
    $("a[data-focus~=on]").focus();
    $("a[data-focus~=on]").removeAttr("data-focus");
  });
  //center popup
  $('.ct_dialog2 .p_close').on('click', function(e){
    e.preventDefault();
    var popup = $(this).parents('.ct_dialog2');
    //console.log(popup)
    if(popup.length > 0){
      popup.fadeOut();
    }
    $("a[data-focus~=on]").focus();
    $("a[data-focus~=on]").removeAttr("data-focus");
  });

  //button.fold
  $("button.fold").click(function(e){
    e.preventDefault();
    $(this).toggleClass('on');
  });

  //fx_box
  $('.fx_box').each(function(){
    $(this).append($('<span/>', {
      class: 'arrow'
    }));
    $(this).scroll(function(){
      $(this).find('.arrow').remove();
    });
  });
  //i_box
  $('.i_box .fold').click(function(e){
    var Layer = $(this).parents('.i_box').find('.fold_con');
    if($(Layer).is(':hidden')){
      $(Layer).slideDown();
    } else {
      $(Layer).slideUp();
    }
  });

  //공통 html 불러오기
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

    // 애니메이션 라이브러리
    AOS.init();
});

//모바일 메뉴
$(function(){
  $(document).on('click','#mobile a.sub', function(){
    event.preventDefault()
    $("#mobile .nav li").removeClass("sub_on")
    $(this).parent().addClass("sub_on")
  });

  $(document).on('click','.hamburger', function(){
    $("#mobile").addClass("on")
  });

  $(document).on('click','.bg_menu', function(){
    $("#mobile").removeClass("on")
  });
});
//로그인 탭
$(function(){
  $(".cr_tab li").click(function(){
    var idx = $(this).index();
    $(".cr_tab li").removeClass("on")
    $(this).addClass("on")
  
    $(".cr_con").hide();
    $(".cr_con").eq(idx).show();
   });
});

// 메인 탭 pop_tab
$(function(){
  $(".winter_tab li").click(function(){
    var idx = $(this).index()
    $(".winter_tab li").removeClass("on")
    $(this).addClass("on");

    $(".t_con").hide();
    $(".t_con").eq(idx).show();
  });

  $(".pop_area .b_close").click(function(){
    $(".pop_tab").fadeOut();
  });

  $(".b_view").click(function(){
    $(".pop_tab").fadeIn();
  });
});

$(function(){
  //tab
	$.fn.tabContainer1 = function(){
		return this.each(function(){
			if ($(this).hasClass('nojs')){
				return false;
			}
			var tabAnchor = $(this).find('> li');
			tabAnchor.each(function(){
				var menu = $(this);
				var target = $('#' + menu.find('>a').attr('href').split('#')[1]);
				var link = menu.find('>a');
				target.css('display', 'none');
				if (menu.hasClass('on')) {
					target.css('display', 'block');
				};

				link.click(function(){
					if (!$(this).parents('li').hasClass('on')) {
						tabAnchor.removeClass('on');
						tabAnchor.each(function(){
							$('#' + $(this).find('>a').attr('href').split('#')[1]).css('display', 'none');
						});
					menu.addClass('on');
					target.css('display', 'block');
					};
					return false;
				});
			});
			//tabAnchor.eq(0).trigger('click');
		});
	};
	$('.align_li, .align_li2_1, .align_li2, .align_li3, .align_li4, .align_li5, .nav_tabs, .nav_tabs1, .ct_tab, .nav_tabs2, .nav_tabs3, .nav_tabs4, .side .board .tab').tabContainer1();

  // omr position
	if ($('.quiz_frame.omr').length > 0){
		omrPo();
		$(window).resize(function(){
			omrPo();
		});
	};
	
	function omrPo(){
		var omr = $(".quiz_frame").css("margin-right")
		$(".quiz_frame.omr .side").css("margin-right",omr)
		//console.log(omr)
	}
})

