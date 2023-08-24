$(function(){
	//모바일 메뉴
	$(".m_menu").click(function(){
		if($(this).hasClass("app_x") == true){
			$(".nav_bg").removeClass("on")
			$(this).removeClass("app_x")
			$(".course_nav").removeClass("on")
		}else{
			$(".nav_bg").addClass("on")
			$(this).addClass("app_x")
			$(".course_nav").addClass("on")
		}
	});

	$(document).on('click','.nav_header ul li',function(){
		var idx = $(this).index();
		console.log(idx)
		$(".nav_header li").removeClass("on");
		$(this).addClass("on");
		$(".nav_con").hide();
		$(".nav_con").eq(idx).show();
	})
});


// 과정 접기
$(function () {
	$(document).on('click','.course_nav .fold',function () {
		$(this).parent().parent().parent().find(".con").slideToggle();
		$(this).toggleClass("on")
	});
});

window.addEventListener('load', function() {
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

  });

  // 콘텐츠 유형 선택 확인
	function typeConfirm(){
		var typeLocation = $(".type_con .on").index()
		if($(".type_con li.on").length == 0){
				alert("콘텐츠 유형을 선택하세요");
		}else if(typeLocation == 0){
			location.href='12_05_course_wizard_01_creat_subject_edit_set.html'
		}else if(typeLocation == 1){
			location.href='12_05_course_wizard_01_creat_subject_edit.html'
		}else if(typeLocation == 2){
			location.href='12_05_course_wizard_01_creat_subject_edit_video.html'
		}else if(typeLocation == 3){
			location.href='12_05_course_wizard_01_creat_subject_04_exam.html'
		}else if(typeLocation == 4){
			location.href='12_05_course_wizard_01_creat_subject_04_assignment.html'
		}else if(typeLocation == 5){
			location.href='12_05_course_wizard_01_creat_subject_04_survey.html'
		}else{
			$(".type_sel").fadeOut();
		}
	}
	// 유형 추가
	$(function(){
		$(".type_con li").click(function(){
			var idx = $(this).index();
			console.log(idx)
			$(".con_guide li").hide();
			$(".con_guide li").eq(idx + 1).show();
		});
	});

	 //검색창
	$(function(){
		$(".btn_search").click(function(){
			if(!$(this).hasClass("on")){
				$(this).addClass("on");
				$(".seach_idx").addClass("on");
			} else{
				$(this).removeClass("on");
				$(".seach_idx").removeClass("on");
				textReset();
			}
		});
		$("html").click(function(e){
			if($(e.target).parents(".search_box").length < 1){
			  $(".seach_idx, .btn_search").removeClass("on");
				textReset();
			}
		});

		// 시연용 검색
		$(".searchText").on("change keyup paste",function(){
			var searchText = $(this).val();
			if(searchText == ''){
				$(".seach_li, .seach_idx h5").show();
				$(".none").hide();
			}else{
				$(".seach_li, .seach_idx h5").hide();
				var temp = $(".seach_li:contains('"+ searchText +"')");
				$(temp).siblings("h5").show();
				$(temp).show();
				if(temp.length < 1 ){
					$(".none").show();
				}else{
					$(".none").hide();
				}
			}
		});

		// 검색 초기화
		function textReset(){
			$(".seach_li, .seach_idx h5").show();
			$(".searchText").val('')
			$(".none").hide();
		}
	});

	 //목차 슬라이드
	$(function(){
		$(document).on('click',".index .title",function(){
			$(this).next().slideToggle()
			if($(this).hasClass("on") == true){
				$(this).removeClass("on")
			}else{
				$(this).addClass("on")
			}
			
		});

		$(".btn_detail").click(function(){
			if($(this).parent().parent().next().css("display") == "none"){
				$(this).removeClass("gray")
				$(this).addClass("on")
				$(this).html("간략히");
			}else{
				$(this).removeClass("bk")
				$(this).removeClass("on")
				$(this).html("자세히");
			}
			$(this).parent().parent().next().slideToggle();
		});
	});

	//모바일 메뉴
	$(function(){
		$(".m_menu").click(function(){
			if($(this).hasClass("app_x") == true){
				$(".nav_bg").removeClass("on")
				$(this).removeClass("app_x")
				$(".course_nav").removeClass("on")
			}else{
				$(".nav_bg").addClass("on")
				$(this).addClass("app_x")
				$(".course_nav").addClass("on")
			}
		});
	});
	//전체화면
	$(function(){
		$(".fullscreen").click(function(){
			if(!$(".course_ar").hasClass("full")){
				$(".course_ar, .vid_box").addClass("full")
				$(this).addClass("on")
			}else{
				$(".course_ar, .vid_box").removeClass("full")
				$(this).removeClass("on")
			}
		});
		$(window).resize(function(){
			if($(window).width() <= 1000){
				$(".course_ar, .vid_box").removeClass("full")
				$(".m_menu").removeClass("app_x")
				$(".fullscreen, .course_nav, .nav_bg").removeClass("on")
			}
		})
	});