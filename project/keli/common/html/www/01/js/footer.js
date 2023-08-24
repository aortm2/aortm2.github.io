

// footer html

document.write("<footer>");

document.write("<div id='lms-area'>");
document.write("<div class='icon-box'>")
document.write("<a href='#!' title='검색'  tabindex='6' class='support-1'>러닝맵</a>");
document.write("<a href='#!' title='검색'  tabindex='6' class='support-2'>과정안내</a>");
document.write("<a href='#!' title='검색'  tabindex='6' class='support-3'>강의교안</a>");
document.write("</div>")
document.write("</div>");




document.write("<div id='paging'>");
document.write("<div id='prev'><a href='#!' title='이전 페이지' onClick='goPrevPage()' id='lmsGoPrevPage' tabindex='7'>이전 페이지</a></div>");
document.write("<div id='page_num'><span id='current_page'></span>/<span id='total_page'></span></div>");
document.write("<div id='next'><a href='#!' title='다음 페이지' onClick='goNextPage()' id='lmsGoNextPage' tabindex='8'>다음 페이지</a></div>");
document.write("</div>");



// document.write("<audio id='next-audio'>");
// document.write("<source src='../audio/next.mp3' type='audio/mpeg' />");
// document.write("</audio>");

document.write("</footer>");








var currentPageContent = $("#current_page");// 현재페이지 변수값

//현재페이지가 한자리 일 경우 앞에 0을 붙여주고 아닌 경우 그대로 사용
//currentPage는 차시별 HTML 스크립트의 현재 페이지 값
if(currentPageContent){
	currentPageContent.empty();
	if(currentPage > 9)
		currentPageContent.append(currentPage);
	else
		currentPageContent.append("0"+currentPage);
}



var totalPageContent = $("#total_page");//전체 페이지 변수값

//전체페이지 수가 한자리일 경우 앞에 0을 붙여주고 아닌 경우 그대로 사용
//totalPage는 차시별 HTML 스크립트의 전체 페이지 값
if(totalPageContent){
	totalPageContent.empty();
	if(totalPage > 9)
		totalPageContent.append(totalPage);
	else
		totalPageContent.append("0"+totalPage);
}


//이전 페이지로 이동하는 함수
//currentPage는 차시별 HTML 스크립트의 현재 페이지 값
function goPrevPage() { // 로컬용에서 이전 화면으로 이동 설정 정의 함수
	if(currentPage == 1)
		alert('첫 페이지 입니다.');

	presentPageIndex = currentPage - 1;
	document.location = pages[presentPageIndex - 1].url;
}


//다음 페이지로 이동하는 함수
//currentPage는 차시별 HTML 스크립트의 현재 페이지 값
//totalPage는 차시별 HTML 스크립트의 전체 페이지 값
function goNextPage() { // 로컬용에서 다음 화면으로 이동 설정 정의 함수
	if(currentPage == totalPage)
		alert('마지막 페이지 입니다.');

	presentPageIndex = currentPage - 1;
	parent.document.location = pages[presentPageIndex + 1].url;
}



function runLearingMap() {
	if($("#map").css("display") == "none")
		$("#map").show();
	else
		$("#map").hide();
}

function closeLearningMap() {
	$("#map").hide();
}


//학습자료를 다운로드 함수
function runDownload() { // 학습 자료 정의 함수
	//alert('프로토에서는 지원하지 않습니다.');
	window.open("down/01.zip");
}


//검색기능 함수
function SearchSubmit() {
	console.log("onSubmitSearch");
	var text = $("#search-text").val();
	if(text == ''){
		alert('검색어를 입력하세요!');
		return false;
	}
	console.log(text);
	window.open("https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=" + text , "네이버 검색", "");
}

//검색버튼 클릭 시 검색창이 보여지는 보이는 이벤트 함수
$("#lmsSearch").click(function () {
	if($("#search-area").hasClass("current")){
		$("#search-area").removeClass("current");
	} else {
		$("#search-area").addClass("current");
	}
});

//검색창을 닫는 이벤트 함수
$("#search-close").click(function () {
	$("#search-area").removeClass("current");
});


// 팝업창 호출 함수
function showPopupChapter() {
	if (currentPage == totalPage) {
		// playAudio('nextaudio');
		$('#next_btn_end').show();
		$("#next_btn_end").click(function() {
			$(this).hide();
		});
	} else {
		// playAudio('nextaudio');
		$('#next_btn_start').show();
		$("#next_btn_start").click(function() {
			$(this).hide();
		});
	}
}

var videoPlayer = videojs("videoPlayer")

// videoPlayer.ready(function(){
// 	// 자막
// 	var subtitle = "<div class='btn-subtitle fa fa-bars' onclick='subTit()'></div>"
// 	$(".vjs-spacer").append(subtitle)
//
// 	// 자막 닫기
// 	var subclose = "<div class='btn-close fa fa-times-circle' onclick='subClose()'></div>"
// 	$(".subtitle").append(subclose)
// })
//
// function subTit(){
// 	$(".subtitle").toggleClass("subtitle-on")
// }
//
// function subClose(){
// 	$(".subtitle").removeClass("subtitle-on")
// }
