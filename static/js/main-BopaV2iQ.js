import{c as s,a as t,b as a,w as i,F as l,r as c,d as o,e as n,o as r,t as e}from"./index-BbVurrEP.js";const p=o('<section id="section_01" class="top"><article><div class="top-text"><h2 class="sliding-text">PORTFOLIO</h2><span class="name">문정현</span></div><p class="greeting">이 홈페이지는 vue3로 제작 되었습니다.</p></article></section><section id="section_02" class="about"><article><h2 class="section-title">ABOUT ME</h2><div class="about-wrap"><p class="about-txt">UI/UX에 관심이 많으며, 늘 새로운 영역을 탐구하는 것을 좋아합니다.</p><p class="about-txt">웹 표준과 웹 접근성을 고려한 마크업을 중시하며, <br>웹 접근성 인증마크 획득을 한 프로젝트 경험도 다수 있습니다.<br>늘 사용자들이 사용하기 쉬운 UX/UI를 만들기 위해 항상 고민합니다.</p><p class="about-txt">항상 겸손한 마음을 가지며, 배움에는 끝이 없다고 생각합니다.<br>빠르게 변화하는 트렌드에 맞춰 항상 노력하겠습니다.</p><p class="about-txt">감사합니다.</p></div></article></section>',2),g={id:"section_03",class:"project"},m={class:"project-list"},u={class:"list"},d=t("span",{class:"number"},"01",-1),b=t("span",{class:"title"},"Weather",-1),h={class:"list"},k=t("span",{class:"number"},"02",-1),w=t("span",{class:"title"},"Drawing",-1),v={class:"list"},y=t("span",{class:"number"},"03",-1),_=t("span",{class:"title"},"Drag & Drop",-1),f={class:"list"},x=t("span",{class:"number"},"04",-1),C=t("span",{class:"title"},"amChart",-1),j={id:"section_04",class:"history"},D=t("h2",{class:"section-title"},"HISTORY",-1),O={class:"history-article"},S=["href"],T={class:"history-img"},J=["src"],Q={class:"history-info"},U={class:"history-title"},I={class:"history-company"},A={class:"history-tags"},E=o('<section id="section_05" class="contact"><article><h2 class="section-title">CONTACT</h2><div class="contact-wrap"><div><strong class="contact-label">address</strong><p class="contact">서울시 영등포구 신길동</p></div><div><strong class="contact-label">E-mail</strong><p class="contact">aortm2@gmail.com</p></div><div><strong class="contact-label">web</strong><p class="contact">https://aortm2.github.io/</p></div></div><a href="mailto:aortm2@gmail.com" class="btn-primary">메일 보내기</a></article></section>',1),F={__name:"main",setup(o){const F=[{title:"The Hagwon",company:"hagwon",tags:"Cross-browsing / jQuery / Javascript",imgSrc:"hagwon",link:"https://www.thehagwon.com/common/greeting.do"},{title:"KODA교육협력센터",company:"한국부동산개발협회",tags:"Cross-browsing / jQuery / Javascript",imgSrc:"koda",link:"https://www.koda.or.kr/cmmn/index.do"},{title:"한국고용노동교육원",company:"한국고용노동교육원",tags:"Cross-browsing / jQuery / Javascript",imgSrc:"keli",link:"https://www.keli.kr/"},{title:"국립국어원 점자정보누리집",company:"국립국어원",tags:"Cross-browsing / jQuery / Javascript",imgSrc:"korea",link:"https://korean.go.kr/braille/common/greeting.do"},{title:"문화예술 내일",company:"한국문화예술위원회",tags:"Cross-browsing / jQuery / Javascript",imgSrc:"arko",link:"https://hrd.arko.or.kr/common/greeting.do"}];return(o,H)=>{const R=n("router-link");return r(),s(l,null,[p,t("section",g,[t("article",null,[t("ul",m,[t("li",null,[t("button",u,[a(R,{to:"/weather",target:"_blank"},{default:i((()=>[d,b])),_:1})])]),t("li",null,[t("button",h,[a(R,{to:"/Drawing",target:"_blank"},{default:i((()=>[k,w])),_:1})])]),t("li",null,[t("button",v,[a(R,{to:"/DragDrop",target:"_blank"},{default:i((()=>[y,_])),_:1})])]),t("li",null,[t("button",f,[a(R,{to:"/amChart",target:"_blank"},{default:i((()=>[x,C])),_:1})])])])])]),t("section",j,[t("article",null,[D,t("div",O,[(r(),s(l,null,c(F,((s,a)=>t("div",{key:a},[t("a",{href:s.link,target:"_blank"},[t("div",T,[t("img",{src:"/src/static/img/main/"+s.imgSrc+".png"},null,8,J)]),t("div",Q,[t("h4",U,e(s.title),1),t("span",I,e(s.company),1),t("p",A,e(s.tags),1)])],8,S)]))),64))])])]),E],64)}}};export{F as default};
