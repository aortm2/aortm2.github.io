
//햄버거 버튼
document.write("<div class='hamburger' tabindex='3'>");
document.write("<a class='hamburger__icon'>");
document.write("<span class='hamburger__line hamburger__line--1'></span>");
document.write("<span class='hamburger__line hamburger__line--2'></span>");
document.write("<span class='hamburger__line hamburger__line--3'></span>");
document.write("</a>");
document.write("<span class='menu-text'>목<br/>차</span>");
document.write("</div>");


//왼쪽 메뉴
document.write("<div id='left-menu'>");
document.write("<div class='subject-title'>")
document.write("<div class='title-box'>")
document.write("<h3>목차</h3>")
document.write("<div class='btn-close'></div>")
document.write("<div class='list'>")
document.write("</div>")
document.write("</div>")
document.write("</div>")
document.write("</div>");

//메뉴배경
document.write("<div class='menu-bg'></div>")


$(".hamburger").click(function(e){
  e.preventDefault();
  $("#left-menu").css("right","0px");
  $(".menu-bg").fadeIn();
});

$(".btn-close").click(function(){
  $("#left-menu").css("right","-300px");
  $(".menu-bg").fadeOut();
  
});

$(".menu-bg").click(function(){
  $("#left-menu").css("right","-300px");
  $(".menu-bg").fadeOut();
  
});

