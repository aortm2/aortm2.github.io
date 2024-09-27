document.title = "소리알기"; // 제목

$(function () {
  // bgm
  var bgm = $(".bgm")[0];
  var bgm2 = $(".bgm2")[0];
  if (bgm) {
    bgm.play();
  }
  
  if (bgm2) {
    bgm2.play();
  }
  // 처음 진입 나레이션
  var intro = $(".intro")[0];
  if (intro) {
    intro.play();
    $(".container").addClass("pointer-none")
    intro.addEventListener('ended', function() {
    $(".container").removeClass("pointer-none")
    });
  }

  var activeBgm = $("#active")[0];
  if (activeBgm) {
    var file = activeBgm.src;
    
    activeBgm.onended = function() {
      $(".slider-wrap").addClass("active")
    };
    
    // BGM 재생 시작
    activeBgm.play();
  }

  var effect = $("#effect")[0];
  if (effect) {
    effect.play();
  }

  document.querySelectorAll("img").forEach(function (img) {
    img.setAttribute("aria-hidden", "true");
    img.setAttribute("alt", "");
  });

  // 버튼
  var btnEffect = new Audio("./sound/effect/button.mp3");
  $(".btn-effect").on("mouseover", function () {
    btnEffect.play();
  });

  $(".btn-effect").on("click", function () {
    btnEffect.play();
  });

  //  셀렉트
  $(".btn-select").on("mouseover", function () {
    var btnIdx = $(".btn-select").index(this);

    $(".audio_wrap audio").each(function () {
      this.pause();
      this.currentTime = 0;
    });

    $(".audio_wrap audio").eq(btnIdx)[0].play();
  });

  $(".btn-select").on("mouseout", function () {
    $(".audio_wrap audio").currentTime = 0;
  });

  // 스타트 버튼
  $(".btn-start").on("mouseover", function () {
    // const btnstart = new Audio("./sound/narration/yu2_na_1.mp3");
    // btnstart.play();
  });

  // 오디오
  var successEffect = new Audio('./sound/effect/success_effect.mp3'); //정답 효과음
  var faliEffect = new Audio('./sound/effect/fali_effect.mp3'); //오답 효과음
  var congratsAudio = new Audio("./sound/effect/congrats.mp3"); // 축하 효과음
  var infoEffectAudio = new Audio("./sound/effect/info.mp3"); //더알아보기 효과음

  // contents01
  if($("#canvas").length > 0){
    const canvas = new fabric.Canvas('canvas', {
      isDrawingMode: false,
      backgroundColor: 'rgba(255,255,255)'
    });
  
    let currentColor = ''; // 기본 색상
    let currentOpacity = 1;    // 기본 투명도
    let previousOpacity = 1;   // 이전 투명도 (형광펜 선택 전 상태)
    let currentTool = '';        // 현재 선택된 도구
  
    function resizeCanvas() {
      const boardWrap = $('.board-wrap');
      const width = boardWrap.width();
      const height = boardWrap.height();
      $('#canvas').attr({ width: width, height: height });
      canvas.setWidth(width);
      canvas.setHeight(height);
    }
  
    resizeCanvas();
  
    $(window).on('resize', function() {
      resizeCanvas();
    });
    
  
    // 도구 버튼 클릭 이벤트
    $('.tool button').on('click', function() {
      const toolClass = $(this).attr('data-name');
      if (toolClass !== 'color') {
        $('.tool button').removeClass('active');
        $(this).addClass('active');
        currentTool = toolClass; // 현재 선택된 도구 저장
      } else {
        $(this).addClass('active');
      }

      function palette (){
        if ($(".palette").css("display") === "flex") {
          $(".palette").css("display", "none");
        } else {
          $(".palette").css("display", "flex");
        }
      }
      
      // 화면크기에 따른 브러쉬 설정
      function getBrushSize(baseSize) {
        const screenWidth = window.innerWidth;   // 화면의 너비
        const referenceWidth = 1920;             // 기준이 되는 화면 너비
      
        return (screenWidth / referenceWidth) * baseSize;
      }
      
      
      // 도구 기능 설정
      switch (toolClass) {
        case 'brush':
          canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
          currentColor=''
          canvas.freeDrawingBrush.width = getBrushSize(10);
          currentOpacity = previousOpacity; // 이전 투명도로 복원
          canvas.freeDrawingBrush.color = `rgba(${hexToRgb(currentColor)}, ${currentOpacity})`;
          canvas.isDrawingMode = true;
          stampMode = false;
          palette();
          break;
        case 'colored-pencil':
          canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
          canvas.freeDrawingBrush.width = getBrushSize(4);
          currentColor=''
          currentOpacity = previousOpacity; // 이전 투명도로 복원
          canvas.freeDrawingBrush.color = `rgba(${hexToRgb(currentColor)}, ${currentOpacity})`;
          canvas.isDrawingMode = true;
          stampMode = false;
          palette();
          break;
        case 'highlighter':
          canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
          previousOpacity = currentOpacity; // 현재 투명도를 저장
          currentColor=''
          currentOpacity = 0.5;
          canvas.freeDrawingBrush.color = `rgba(${hexToRgb(currentColor)}, ${currentOpacity})`;
          canvas.freeDrawingBrush.width = getBrushSize(20);
          canvas.isDrawingMode = true;
          stampMode = false;
          palette();
          break;
        case 'stamp':
          if ($(".stamp-tool").css("display") === "flex") {
            $(".stamp-tool").css("display", "none");
          } else {
            $(".stamp-tool").css("display", "flex");
          }
          break;
        case 'eraser':
          canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
          canvas.freeDrawingBrush.width = getBrushSize(30);
          currentColor = 'rgba(255,255,255)';
          currentOpacity = previousOpacity; // 이전 투명도로 복원
          canvas.freeDrawingBrush.color = `rgba(${hexToRgb(currentColor)}, ${currentOpacity})`;
          canvas.isDrawingMode = true;
          var audioEffect = new Audio('./sound/contents_01/tool_eraser.mp3');
          audioEffect.play();
          stampMode = false;
          break;
        case 'color':
          // 색상 팔레트 토글
          // if ($(".palette").css("display") === "flex") {
          //   $(".palette").css("display", "none");
          // } else {
          //   $(".palette").css("display", "flex");
          // }
          palette();
          stampMode = false;
          break;
       default:
          canvas.isDrawingMode = false;
      }
      updateBrush();
      
    });
  
    // 색상 팔레트 버튼 클릭 이벤트
    $('.palette button').on('click', function() {
      const color = $(this).css('background-color');
      currentColor = color; // 선택된 색상을 currentColor에 저장
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = `rgba(${hexToRgb(currentColor)}, ${currentOpacity})`;
      }
      // 색상 팔레트 닫기
      $(".palette").css("display", "none");
      $('.color').removeClass('active');
    });
  
    // 삭제 버튼 클릭 이벤트
    $('.btn-del').on('click', function() {
      canvas.clear();
    });

    // 삭제 버튼 클릭 이벤트
    $('.btn-del').on('mouseover', function() {
      var audio = new Audio('./sound/narration/yu2_Na_5c.mp3');
      audio.play();
    });
  
    // 브러시 색상 및 투명도 업데이트
    function updateBrush() {
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.color = `rgba(${hexToRgb(currentColor)}, ${currentOpacity})`;
      }
    }
  
    // HEX 색상을 RGB로 변환하는 함수
    function hexToRgb(hex) {
      const match = /^rgba?\((\d+),\s*(\d+),\s*(\d+)\)$/i.exec(hex);
      if (match) {
        return `${match[1]}, ${match[2]}, ${match[3]}`;
      }
      // HEX 색상 처리
      hex = hex.replace(/^#/, '');
      if (hex.length === 3) {
        hex = hex.split('').map(h => h + h).join('');
      }
      const rgb = parseInt(hex, 16);
      return `${(rgb >> 16) & 0xFF}, ${(rgb >> 8) & 0xFF}, ${rgb & 0xFF}`;
    }

     // 스탬프 모드
    let stampMode = false;
    let currentStampURL = '';

    // 스탬프 버튼 클릭 이벤트
    $('.stamp-tool > button').on('click', function() {
        stampMode = true; // 스탬프 모드 활성화
        if ($(".stamp-tool").css("display") === "flex") {
          $(".stamp-tool").css("display", "none");
        } else {
          $(".stamp-tool").css("display", "flex");
        }
        currentStampURL = $(this).attr('data-url');
        canvas.isDrawingMode = false;
    });

    canvas.on('mouse:down', function(event) {
      $(".stamp").removeClass("active")
      if (stampMode && currentStampURL) {
          // 클릭한 위치 좌표 얻기
          const pointer = canvas.getPointer(event.e);
          const x = pointer.x;
          const y = pointer.y;
  
        // 스탬프 이미지 URL 설정
        const stampURL = `./img/content_01/${currentStampURL}.png`;
  
          // 이미지 로드 후 클릭한 위치에 추가
          fabric.Image.fromURL(stampURL, function(img) {
              img.set({
                  left: x, // 클릭한 X 좌표
                  top: y,  // 클릭한 Y 좌표
                  originX: 'center',
                  originY: 'center',
                  selectable: true // 이미지 이동 및 크기 조정 가능
              });
  
              // 이미지 크기 조정 (필요에 따라 조정)
              // img.scale(0.5);
              // img.set({ width: 500, height: 500 })
  
              // 캔버스에 이미지 추가
              canvas.add(img);
              canvas.renderAll();
          });
  
          // stampMode = false; // 스탬프 모드 비활성화
      }
    });

    // 미션
    // 재생 중인 오디오 객체를 저장할 변수
    let currentMissionAudio = null;
    let nextAudio = null;
    let secondAudio = new Audio('./sound/narration/yu2_na_6.mp3');
    const names = ['daegeum', 'piri', 'sogeum', 'saenghwang'];
    let currentIndex = 1;

    // 첫 번째 오디오 종료 후 3초 후에 다른 오디오 재생
    $(".start2").on('ended', function () {
        setTimeout(function () {
            if (nextAudio) {
                nextAudio.pause();
                nextAudio.currentTime = 0;
            }
            nextAudio = new Audio('sound/contents_01/musical_daegeum1.mp3');
            nextAudio.play();
        }, 3000); // 3초 지연
    });

    // "확인" 버튼 클릭 시 이벤트
    $(".btn-ok").click(function () {
        $(".save-popup").css("display", "none");

        // 이전 미션 오디오 중지
        if (currentMissionAudio) {
            currentMissionAudio.pause();
            currentMissionAudio.currentTime = 0;
            console.log("중지됨?")
        }

        if (currentIndex < names.length) {
            $('.mission-wrap').each(function (index) {
                if (index < names.length) {
                    $(this).attr('data-name', names[(index + currentIndex) % names.length]);
                }
            });

            setTimeout(function () {
                // 현재 미션에 해당하는 오디오 재생
                var currentMissionName = names[currentIndex - 1];
                console.log(currentMissionName);
                var audioSrc = './sound/contents_01/musical_' + currentMissionName + '1.mp3';

                // 새로운 오디오 객체 생성 및 재생
                currentMissionAudio = new Audio(audioSrc);
                currentMissionAudio.play();

                // 현재 미션 오디오 종료 후 두 번째 오디오 재생
                currentMissionAudio.onended = function () {
                    secondAudio.play();
                };
            }, 2000);

            currentIndex++;
        } else {
            finish();
        }

        saveCanvasToFinishBox();
        canvas.clear();
    });

    $(".btn-ok").on("mouseover", function () {
      var audio = new Audio('./sound/narration/yu2_na_10.mp3');
      audio.play();
    });

    function finish() {
      $(".select-01").fadeOut();
      $(".finish").fadeIn();
      var audio = new Audio('./sound/narration/yu2_na_11.mp3');
      audio.play();
    }


    // 툴 사운드
    var nowTool = null; // 현재 선택된 도구 저장
    var startTime = null; // 드래그 시작 시간 저장
    var isDragging = false; // 드래그 상태 추적
    var longSoundInterval = null; // 긴 소리 무한 반복 재생을 위한 변수
    var shortSoundPlayed = false; // 짧은 소리 재생 여부 추적
    var longSoundAudio = null; // 무한 루프 소리 객체

    // 도구 선택 시 이벤트 핸들러
    $('.tool > button').on('click', function() {
        nowTool = $(this).data('name');
        console.log('Tool selected:', nowTool);
    });

    // 브러시, 색연필, 형광펜의 마우스 다운 이벤트 처리
    canvas.on('mouse:down', function(event) {
        if (nowTool === 'brush' || nowTool === 'colored-pencil' || nowTool === 'highlighter') {
            isDragging = true; // 드래그 상태 활성화
            startTime = new Date(); // 드래그 시작 시간 기록
            shortSoundPlayed = false; // 짧은 소리 재생 여부 초기화

            // 드래그 시작 시 짧은 소리 재생
            playSound('tool_pen_short.ver.mp3');
            shortSoundPlayed = true; // 짧은 소리 재생됨 표시

            // 1초 후에 긴 소리 재생 시작 (무한 반복)
            setTimeout(function() {
                if (isDragging) { // 여전히 드래그 중일 경우에만
                    playLongSoundLoop(); // 긴 소리 무한 반복 재생
                    console.log("긴소리")
                }
            }, 1000); // 1초 지연
        }
    });

    // 마우스 업 이벤트 처리
    canvas.on('mouse:up', function(event) {
        if (isDragging) {
            isDragging = false; // 드래그 상태 비활성화
            stopLongSoundLoop(); // 긴 소리 재생 중지
        }
    });

    // 긴 소리 무한 반복 재생 함수
    function playLongSoundLoop() {
        if (!longSoundAudio) {
            longSoundAudio = new Audio('./sound/contents_01/tool_pen_long.ver.mp3');
            longSoundAudio.loop = true; // 무한 반복 설정
            longSoundAudio.play(); // 소리 재생 시작
        }
    }

    // 긴 소리 재생 중지 함수
    function stopLongSoundLoop() {
        if (longSoundAudio) {
            longSoundAudio.pause(); // 소리 재생 중지
            longSoundAudio.currentTime = 0; // 재생 위치 초기화
            longSoundAudio = null; // 객체 초기화
        }
    }

    // 소리 재생 함수
    function playSound(filename) {
        var audio = new Audio('./sound/contents_01/' + filename);
        audio.play();
    }
  }
  
  // save-pop
  $(".board-tool .btn > .btn-save").click(function(){
    $(".save-popup").css("display","flex")
    var audio = new Audio('./sound/narration/yu2_na_8.mp3');
    audio.play();
  });

   // 삭제 마우스오버 클릭 이벤트
   $(".board-tool .btn > .btn-save").on('mouseover', function() {
    var audio = new Audio('./sound/narration/yu2_Na_5b.mp3');
    audio.play();
  });

  $(".btn-no, .close").click(function(){
    $(".save-popup").css("display","none")
  });

  $(".btn-no").on("mouseover", function () {
    var audio = new Audio('./sound/narration/yu2_na_9.mp3');
    audio.play();
  });
  
  let saveCount = 0;
  function saveCanvasToFinishBox() {
    // 캔버스 데이터를 URL로 추출
    var imgDataURL = canvas.toDataURL();

    // finish-box 내의 div 요소들 선택
    var finishDivs = $('.finish-box div');
    
    // 저장할 div 선택
    var targetDiv = finishDivs.eq(saveCount);

    // 새로운 이미지 요소 생성
    var img = $('<img>').attr('src', imgDataURL).attr('alt', 'Canvas Image');
    targetDiv.append(img);

    saveCount++;
  }
  
  // btn-sound 오버 시 버튼 오디오
  $('.btn-sound').on('mouseover', function() {
    var audio = new Audio('./sound/narration/yu2_Na_5a.mp3');
    audio.play();
  });

  // btn-sound 클릭 시 해당 미션의 오디오 재생
   $('.btn-sound').on('click', function() {
    // 클릭한 버튼이 속한 mission-wrap의 data-name 속성 가져오기
    var missionName = $(this).closest('.mission-wrap').attr('data-name');
    
    var audioSrc = './sound/contents_01/musical_' + missionName + '1.mp3';
    var audio = new Audio(audioSrc);
    
    // 오디오 재생
    audio.play();
    audio.onended = function() {
      secondAudio.play();
    };
  });

  // contents02
  // 힌트
  // $(".hint button").on("click", function() {
  //   var name = $(this).data("name");
  //   $(this).attr("disabled" , true)
  //   $(".plate > div[data-name='" + name + "']").addClass("active");

  //    var audioSrc = "./sound/contents_02/musical_" + name + "2.mp3";
  //    var audio = new Audio(audioSrc);
  //    audio.play();
  //    setTimeout(function() {
  //     $(".plate > div[data-name='" + name + "']").removeClass("active");
  //   }, 2000);
  // });
  
  $(".btn-hint").on("click", function() {
      $(this).addClass("active")
      $(".plate > div").addClass("active");
       setTimeout(function() {
        $(".plate > div").removeClass("active");
        $(".btn-hint").removeClass("active")
      }, 2000);
    });

  // 정답
  $(".plate > div").on("click", function () {
    // 클릭한 div의 data-name 속성 값 가져오기
    var name = $(this).data("name");

    // 클릭한 div에 correct 클래스 추가
    $(this).addClass("active correct");
    $(this).attr("disabled" , true)

    // 동일한 data-name을 가진 hint 버튼에도 correct 클래스 추가
    $(".hint button[data-name='" + name + "']").addClass("correct");
    var correct = new Audio("./sound/contents_02/" + name + ".mp3");
    // 오디오 플레이
    successEffect.play();
    correct.play();

    // .pop-wrap 생성 및 스타일 설정
    var popWrap = $('<div class="pop-wrap"></div>');
    var img = $('<img>', {
        src: './img/content_02/pop_' + name + '.png',
        alt: 'pop image'
    });

    // .pop-wrap에 이미지 추가
    popWrap.append(img);

    // .plate에 .pop-wrap 추가
    $('.plate').append(popWrap);
    $('.hidden-plate').addClass("pointer-none")

    // .pop-wrap 제거
    // setTimeout(function() {
    //     popWrap.remove();
    // }, 2000);

    // correct 클래스가 추가된 div의 갯수 체크
    var correctCount = $(".plate > div.correct").length;
    if (correctCount === 4) {
      setTimeout(function () {
        finish2(); // 4개일 때 finish 함수 호출
      }, 7000);
    }
    // 악기소리 추가
     var name = $(this).data("name");
     var audio = new Audio("./sound/contents_02/musical_" + name + "2.mp3");
     audio.play();

    audio.addEventListener('ended', function() {
      popWrap.remove();
      $('.hidden-plate').removeClass("pointer-none")
    });
  });;

  const finish2 = () => {
    $(".select-02").fadeOut();
    $(".finish").fadeIn();
    congratsAudio.play();
  
    var finishNarration = new Audio("./sound/narration/yu2_na_22.mp3"); // 나레이션
    finishNarration.play();
  };

  // 오답
  $(".plate").on("click", function (event) {
    var clickedDiv = $(event.target);
    if (!clickedDiv.is(".daegeum, .piri, .sogeum, .saenghwang")) {
      // 오답 div
      var wrongDiv = $('<div class="wrong"></div>');
      var plateOffset = $(this).offset();
      // 메시지를 클릭한 위치에 표시
      wrongDiv.css({
        top: event.pageY - plateOffset.top + 'px',  
        left: event.pageX - plateOffset.left + 'px',
      });

      // body에 메시지 추가
      $(".plate").append(wrongDiv);

      // var faliNarration = new Audio('./sound/narration/yu2_na_21.mp3'); // fali 나레이션
       // fali 오디오 재생
      //  faliNarration.play();
       faliEffect.play();


      // 1초 후 메시지 삭제
      setTimeout(function () {
        wrongDiv.remove();
      }, 1000);
    }
  });
  
  
  // 팝업 닫기
  $(".dialog-close").click(function () {
    $(".dialog").fadeOut();
  });

  // 팝업 슬라이드
  let currentImg = 0;
  const images = $(".dialog .sd > div");
  const totalImages = images.length;

  
  // 현재 재생 중인 오디오를 추적하는 변수
  
  let currentMoreAudio = null; // 전역 변수로 이동하여 모든 함수에서 접근 가능

  function showImage(index, playAudio = true) {
    const url = $(".dialog").data("url");
    const audioFiles = [
      `./sound/${url}/more_01.mp3`, 
      `./sound/${url}/more_02.mp3`, 
      `./sound/${url}/more_03.mp3`, 
      `./sound/${url}/more_04.mp3`
    ];
  
    // 이미지 활성화 업데이트
    images.removeClass("active").eq(index).addClass("active");
    currentImg = index;
    console.log(index)
  
    // 기존 오디오 중지
    if (currentMoreAudio) {
      currentMoreAudio.pause();
      currentMoreAudio.currentTime = 0;
      currentMoreAudio = null; // 이전 오디오 객체 초기화
    }
  
    // 새로운 오디오 재생
    if (audioFiles[index]) {
      currentMoreAudio = new Audio(audioFiles[index]);
      if (playAudio) currentMoreAudio.play();
    }
  
    // 첫 번째 페이지에서 prev 버튼 숨기기
    if (index === 0) {
      $(".dialog .prev").hide();
    } else {
      $(".dialog .prev").show();
    }
  
    // 마지막 페이지에서 next 버튼 숨기기
    if (index === totalImages - 1) {
      $(".dialog .next").hide();
    } else {
      $(".dialog .next").show();
    }
  }
  
  // next 버튼 클릭 시 이벤트 처리
  $(".dialog .next").on('click', function() {
    if (currentImg < totalImages - 1) {
      showImage(currentImg + 1); // 다음 이미지 보여주기
    }
  });
  
  // prev 버튼 클릭 시 이벤트 처리
  $(".dialog .prev").on('click', function() {
    if (currentImg > 0) {
      showImage(currentImg - 1); // 이전 이미지 보여주기
    }
  });

// '더 알아보기' 버튼 클릭 시 첫 번째 이미지와 1번 오디오 재생
$(".btn-more").click(function () {
  $(".dialog").show(); // 다이얼로그를 표시
  
  infoEffectAudio.play();
  showImage(0, true); // 첫 번째 이미지 표시 및 오디오 재생
});

// 더알아보기 버튼
$(".btn-more, .btn-more2").on("mouseover",function () {
  const audio = new Audio("./sound/narration/yu2_Na_12a.mp3"); // 1번 오디오
  audio.play()
});


// 나가기 버튼
$(".btn-out").on("mouseover",function () {
  const audio = new Audio("./sound/narration/yu2_Na_12.mp3"); // 1번 오디오
  audio.play()
});


$(".btn-muisc").click(function(){
    var name = $(this).data("name");
    var muisc = new Audio("./sound/contents_02/musical_" + name + "2.mp3");
    muisc.play();
});


// 초기 상태에서 첫 번째 이미지를 표시하지만 오디오 재생하지 않음
showImage(currentImg, false);

// 다이얼로그 초기 숨김 처리
$(".dialog").hide();

});
