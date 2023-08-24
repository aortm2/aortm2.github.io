$(document).ready(function(){
	checkO = "<span class='answer-img right'></span>"
	checkX = "<span class='answer-img wrong'></span>"

	$('.last-quiz .btn-next').hide();
	var correct = $('#correct');
	var wrong = $('#wrong');

	var idx = 0;
	$(".btn-next").click(function() {
		$(".bind").remove()
		$(".pop-quiz").hide();
		idx++;
		$(".quiz").each(function(index, item) {
			console.log("idx: " + idx);
			$('.quiz').hide();
			$(".quiz-result").hide();
			$(".commentary").hide();
			$('.last-quiz .btn-next').hide();
			$(".answer-img").remove()
			correct.trigger('pause');
			correct.prop('currentTime', 0);
			wrong.trigger('pause');
			wrong.prop('currentTime', 0);

			if (index == idx) {
				$('.quiz').eq(index).fadeIn();
				quiz_cnt = 0;
				quiz_num++;
				quiz_div = '#quiz' + (idx + 1);
				return false;
			}
			if (idx == $('.quiz').length) {
				quiz_cnt = 0;
				var answer_cnt = 0;
				var answer_no = 0;
				var answer_nm = "isAnswer";

				$(".result-box li div").each(function(index, item) {
					var answer_ls = answer_nm + (index + 1);

					if (localStorage.getItem(answer_ls) == 1) {
						$(this).addClass('right');
						answer_cnt++;
					} else {
						$(this).addClass('wrong');
					}
				});

				$(".con-box .quiz:last").show();
				$("#quiz-result").show();
        var quest_num = $('.quiz').length;
				$('#quest_num').html(quest_num +"문항");
				$('#answer_cnt').html(answer_cnt +"문항");
				return false;
			}
		});
	});

	$('.btn-replay').click(function() {
		quiz_div = '#quiz1';
		$(".quiz-result").hide();
		$(".commentary").hide();
		quiz_cnt = 0;
		quiz_num = 1;
		idx = 0;
		$('#quiz1').show();
		$('.example li').removeClass('right');
		$('.example li').removeClass('wrong');
		$('.example li').removeAttr("after")
		$('div.circle').remove();
		$(".example li").on("click");
		$(".text-input").val("");
		$(".result-box li div").removeClass("right");
		$(".result-box li div").removeClass("wrong");
		//$(".con-box .quiz:last").hide();
		localStorage.clear();
	});

	var quiz_cnt = 0;
	var quiz_num = 1;
	var quiz_div = '#quiz1';

	localStorage.setItem("isAnswer1", 0);
	localStorage.setItem("isAnswer2", 0);
	localStorage.setItem("isAnswer3", 0);
	$(".example li").click(function() {
		var answer = $(this).parent().parent().parent().find(".answer-num span").html();
		var select = $(this).index();
		var selAnswer = select + 1; //선택한 답
		quiz_cnt++;

		var rightAudio = new Audio('audio/right.mp3');
		var wrongAudio = new Audio('audio/wrong.mp3');
		$(".example li").removeClass("check")
		$(this).addClass("check")

		if (answer != selAnswer && quiz_cnt == 1) {
			$(this).addClass("wrong"); //오답일때
			wrongAudio.play();
			$('.pop-again').fadeIn();
			setTimeout(function() {
				$('.pop-again').fadeOut();
			}, 1200);

		} else if (answer == selAnswer || quiz_cnt == 2) {


			var bind = '<div class="bind"></div>'

			//두번 틀렸을때
			if (answer != selAnswer && quiz_cnt == 2) {
				$(this).addClass("wrong");
				wrongAudio.play();
				$(".quiz-title strong").append(checkX)
				$(".example").append(bind)

				$('.pop-wrong').fadeIn(300);
				setTimeout(function() {
					$('.pop-wrong').fadeOut();
				}, 1200);
			}
			//정답
			if (answer == selAnswer && quiz_num == 1) {
				localStorage.setItem("isAnswer1", 1);
				rightAudio.play();
				$(".quiz-title strong").append(checkO)
				$(".example").append(bind)

				$('.pop-right').fadeIn(300);
				setTimeout(function() {
					$('.pop-right').fadeOut();
				}, 1200);

			} else if (answer == selAnswer && quiz_num == 2) {
				localStorage.setItem("isAnswer2", 1);
				rightAudio.play();
				$(".quiz-title strong").append(checkO)
				$(".example").append(bind)

				$('.pop-right').fadeIn(300);
				setTimeout(function() {
					$('.pop-right').fadeOut();
				}, 1200);

			} else if (answer == selAnswer && quiz_num == 3) {
				localStorage.setItem("isAnswer3", 1);
				rightAudio.play();
				$(".quiz-title strong").append(checkO)
				$(".example").append(bind)

				$('.pop-right').fadeIn(300);
				setTimeout(function() {
					$('.pop-right').fadeOut();
				}, 1200);

			}

			$('.pop-again').css("display", "none");
			var rigAn = answer - 1 //정답 실제 index

			$(quiz_div + " .example li:eq(" + rigAn + ")").addClass("right"); // 정답체크
			$(quiz_div + " .example li:eq(" + rigAn + ")").append("<div class='circle'>정답</div>"); //정답번호 동그라미 추가
			$(".commentary").fadeIn(); // 해설보이기
			$('.last-quiz .btn-next').show();
		  $(".quiz:last .btn-next span").text("결과 보기"); // 마지막 문제에는 "결과보기" 넣기
		}
	});


});
