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

function openPopup() {
	$(".c_dialog.course").fadeIn();
}

function timePop(){
	$("#cs_import").fadeIn();
}

function openExcel(){
	$(".ex_up").fadeIn();
}

function closeExcel(){
	$(".ex_up").fadeOut();
}

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