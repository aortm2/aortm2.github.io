

var totalPage = 15; // 차시 페이지 수 정보를 담고 있는 변수
var subject = "정중동의 멋과 흥, 살풀이춤"; // 과정명 정보를 담고 있는 변수
var subtitle = "01.살풀이춤의 이해와 보법"; //차시명 정보를 담고 있는 변수

document.title = subject // 과정명

var pages = [ // 파일명, 카테고리명, 페이지명의 정보를 담고 있는 변수 배열
	{pg:1, url:"01_01.html", category:"준비하기", text:"인트로"},
	{pg:2, url:"01_02.html", category:"준비하기", text:"핵심용어"},
	{pg:3, url:"01_03.html", category:"학습하기", text:"1. 살풀이춤의 이해 "},
	{pg:4, url:"01_04.html", category:"학습하기", text:"1. 살풀이춤의 이해 "},
	{pg:5, url:"01_05.html", category:"학습하기", text:"1. 살풀이춤의 이해 "},
	{pg:6, url:"01_06.html", category:"학습하기", text:"1. 살풀이춤의 이해 "},
	{pg:7, url:"01_07.html", category:"학습하기", text:"1. 살풀이춤의 이해 "},
	{pg:8, url:"01_08.html", category:"학습하기", text:"2. 살풀이춤의 보법 "},
	{pg:9, url:"01_09.html", category:"학습하기", text:"2. 살풀이춤의 보법 "},
	{pg:10, url:"01_10.html", category:"학습하기", text:"2. 살풀이춤의 보법 "},
	{pg:11, url:"01_11.html", category:"학습하기", text:"2. 살풀이춤의 보법 "},
	{pg:12, url:"01_12.html", category:"학습하기", text:"2. 살풀이춤의 보법 "},
	{pg:13, url:"01_13.html", category:"학습맺음", text:"쉬어가기"},
	{pg:14, url:"01_14.html", category:"학습맺음", text:"평가하기"},
	{pg:15, url:"01_15.html", category:"학습맺음", text:"정리하기"},
	{pg:16, url:"01_16.html", category:"학습맺음", text:"차시예고"},
];


function setMoveFile(){
    var val = location.href.split("/");
    var curPage = val[val.length - 1].substr(0, 5);
    document.write("<source src='movie/"+curPage+".mp4' type='video/mp4' />");
}
