var thisMain = this;
var indexOpenBtn;
var indexCloseBtn;
var indexTarget;
var indexStatus="close";
var currentSco1;
currentSco1 = pages[currentPage-1].text;
currentSco1 = currentSco1.replace(/<[a-z|/]+[^<>]*>/gi, '');

var MenuController = function() {
  var menuContent = $(".list");
  if (menuContent) {
    //menuContent.empty();

    //메뉴구성
    var menuString = "";
    var currentCategory = "";
    var currentText = "";


    for (var i = 0; i < pages.length; i++) {
      if (typeof(pages[i].category) == 'undefined' || pages[i].category == '' || pages[i].category == 'null')
        continue;

      // 페이지 설정
      if (currentText != pages[i].text) {
        currentText = pages[i].text;
        if (isCurrentText(i, currentPage) == true) {
          menuString += "<a class='current' tabindex='3'";
        } else {
          menuString += "<a tabindex='3'";
        }
        menuString += " href='" + pages[i].url + "'>" + pages[i].text + "</a>";
      }
    }
    //		menuString += "</dl>";

    menuContent.append(menuString);
  }
};



function isCurrentCategory(index, currentPage) { //로컬용에서 카테고리 설정 정의 함수
	var currentCategory = "";
	for(var i = currentPage - 1; i > -1; i--) {
		if(typeof(pages[i].category) == 'undefined' || pages[i].category == '' || pages[i].category == 'null')
			continue;
		else {
			currentCategory = pages[i].category;
			break;
		}
	}

	for(var j = index; j > -1; j--) {
		if(typeof(pages[i].category) == 'undefined' || pages[i].category == '' || pages[i].category == 'null')
			continue;
		else {
			if(pages[j].category == currentCategory)
				return true;
			else
				return false;
		}
	}
	return false;
}



function isCurrentText(index, currentPage) { //로컬용에서 페이지 설정 정의 함수
	var currentText = "";
	for(var i = currentPage - 1; i > -1; i--) {
		if(typeof(pages[i].text) == 'undefined' || pages[i].text == '' || pages[i].text == 'null')
			continue;
		else {
			currentText = pages[i].text;
			break;
		}
	}

	for(var j = index; j > -1; j--) {
		if(typeof(pages[i].text) == 'undefined' || pages[i].text == '' || pages[i].text == 'null')
			continue;
		else {
			if(pages[j].text == currentText)
				return true;
			else
				return false;
		}
	}
	return false;
}



function isCurrentPage(index, currentPage) { // 로컬용에서 페이지 이동 정의 함수
	var maxPage = currentPage - 1;

	if(index == maxPage) {
		return true;
	}
	else if (maxPage < index)
		return false;
	else { // if (index < currentPage)
		var countFarFromCurrentPage = 0;
		for(var i = index; i < currentPage; i++) {
			if(typeof(pages[i].text) == 'undefined' || pages[i].text == '' || pages[i].text == 'null')
				continue;
			else
				countFarFromCurrentPage++;
		}
	}
	if(countFarFromCurrentPage > 1)
		return false;
	return true;
}




function menuInit(){ // 로컬용에서 노출되는 Index 메뉴 버튼 정의 함수
	var menuController = new MenuController();

//	$(".hamburger").click(function () {
//		if($(".hamburger, .side-nav").hasClass("active")){
//			$(".hamburger, .side-nav").removeClass("active");
//		} else {
//			$(".hamburger, .side-nav").addClass("active");
//		}
//	});
}


 

$(document).ready(function(){
  
  menuInit() // 목차

});  
