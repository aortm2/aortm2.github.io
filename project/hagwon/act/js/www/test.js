var qt,
    inapp,
    onChrome,
    onFirefox,
    mappeddrive,
    qtAC,
    qadialog,
    pageCSS,
    bodyCSS,
    suspend = !1,
    end = !1,
    countdown = -1,
    leaving = !1,
    terminated = !1,
    modals = [],
    audioblob = [],
    STATE_UNANSWERED = "0",
    STATE_INCOMPLETE = "1",
    STATE_COMPLETE = "2",
    STATE_ANSWERED = "3",
    STATE_INAPP = "4",
    lastansweredShown = !1,
    lastAudio = null,
    audioCtx = null,
    audioEncoderWorker = null,
    reloadCount = -1,
    this_itemevent = null;
function log(e) {
    "undefined" != typeof console && console.log(e);
}
function is_visible(e) {
    return $(e + ":visible").length > 0;
}
function lang(e, a, t, n) {
    return null == e ? "(null)" : (null != a && (e = e.replace(/@0/g, a)), null != t && (e = e.replace(/@1/g, t)), null != n && (e = e.replace(/@2/g, n)), e);
}
function isImageOk(e) {
    if (0 == e.length) return !0;
    for (var a = 0; a < e.length; a++) {
        if (!e[a].complete) return !1;
        if ((null != e[a].naturalWidth && 0 == e[a].naturalWidth) || ("Explorer" === BrowserDetect.browser && e[a].width != e[a].naturalWidth) || ("Firefox" === BrowserDetect.browser && e[a].width != $(e[a]).width())) {
            var t = document.createElement("div");
            return (t.id = "domrefresh"), $("#questionframe").append(t), $("#domrefresh").remove(), !1;
        }
    }
    return !0;
}
$.ajaxSetup({ cache: !0 });
var hlDelay,
    mediaObjects = [];
function preloadObjects() {
    if (void 0 !== URL.createObjectURL) {
        $.each(mediaObjects, function (e, a) {
            URL.revokeObjectURL(a);
        }),
            (mediaObjects = []);
        var e = 0,
            a = [];
        $("#preload > span").each(function () {
            a.push($(this).text());
        });
        var t = a.length,
            n = $("#message_download .bar");
        n.attr("aria-valuemax", 1), n.attr("data-transitiongoal", 0).progressbar(), n.attr("data-start", clock.now());
        var o = 0,
            i = null,
            r = -1,
            s = -1,
            d = setInterval(function () {
                (n.attr("data-transitiongoal", o).progressbar(), null != i) && (o != r ? ((r = o), (s = clock.now())) : clock.now() - s > 3e4 && (log("Stalled for more than 30 seconds, aborting"), i.abort()));
            }, 1e3);
        t > 0 && !$("#qtparams").data("end") ? c() : (enterQuestion(), clearInterval(d));
    } else enterQuestion();
    function l() {
        $("#download_retry").show(),
            $("#btn_download_retry").off("click"),
            $("#btn_download_retry").click(function () {
                $("#download_retry").hide(), setTimeout(c, 0);
            });
    }
    function c() {
        var r = setTimeout(function () {
                $("#message_download").show();
            }, 1e3),
            s = lang(GUI_DOWNLOAD_TEXT, e + 1, t);
        n.data("message", s),
            n.data("start", clock.now()),
            (o = 0),
            n.attr("aria-valuemax", 1),
            n.attr("data-transitiongoal", 0).progressbar(),
            (i = new XMLHttpRequest()).open("GET", a[e], !0),
            (i.responseType = "blob"),
            (i.onload = function (s) {
                (i = null), clearTimeout(r);
                var u = (this.status >= 200 && this.status < 300) || 304 === this.status;
                4 == this.readyState && u
                    ? ((mediaObjects[a[e]] = URL.createObjectURL(this.response)),
                      ++e >= t ? (clearInterval(d), $("#message_download").hide(), enterQuestion()) : ((o = 0), n.attr("aria-valuemax", 1), n.attr("data-transitiongoal", 0).progressbar(), setTimeout(c, 0)))
                    : l();
            }),
            (i.onprogress = function (e) {
                (o = e.loaded), n.attr("aria-valuemax", e.total);
            }),
            (i.onerror = function () {
                (i = null), l();
            }),
            (i.onabort = function () {
                (i = null), l();
            }),
            i.send();
    }
}
var overlayCounter,
    imageAttempts = 0;
function enterQuestion() {
    if (!handlePause()) {
        (modals = []),
            (leaving = !1),
            (hlDelay = new Delay("et2:highlighter:init").require("et2:highlighter:ready")),
            $("#qtparams").data("timestopped") || hlDelay.require("et2:clock:tick"),
            !isAnswered() && $("#qtparams").data("countdown") > 0 && ((countdown = $("#qtparams").data("countdown")), countdownUpdater()),
            "none" == $("#pagination-tooltip").css("display") && $(".navitem").removeAttr("title"),
            $("#mainvideo").on("ended", function () {
                $("#mainvideo").load(), $(".video-ui").removeClass("active");
            }),
            $(".ev_video").click(function () {
                $("#mainvideo").get(0).paused ? $("#mainvideo").get(0).play() : $("#mainvideo").get(0).pause();
                var e = $(this).hasClass("active");
                $(".video-ui").removeClass("active"), $("#mainvideo").get(0).pause(), e || ($(this).addClass("active"), $("#mainvideo").get(0).play());
            });
        var e = $("#qtparams").data("testpdftextid");
        if (e > 0) {
            var a = $("#qtparams").data("testpdfname");
            pdf.load(e, a);
        }
        if (($("#showfeedback") && !$("#params").data("showfeedback") && $("#showfeedback").removeClass("active"), $("math").length > 0))
            if (((document.cookie = "mjx.menu=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"), "undefined" == typeof MathJax)) {
                var t = document.createElement("script");
                (t.src = $("#params").data("mathjax")),
                    (t.async = !1),
                    (t.defer = !1),
                    document.head.appendChild(t),
                    t.addEventListener("load", function () {
                        MathJax.Hub.Config({
                            showMathMenu: !1,
                            showMathMenuMSIE: !1,
                            messageStyle: "none",
                            MMLorHTML: { prefer: "HTML", scale: 100, linebreaks: { automatic: !0 } },
                            "HTML-CSS": { scale: 100, linebreaks: { automatic: !0 } },
                            CommonHTML: { scale: 100, linebreaks: { automatic: !0 } },
                        });
                    });
            } else MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        $("#params").data("forcetabindex") && forceTabindex(), (imageAttempts = 0), internalEnterQuestion();
    }
}
function handlePause() {
    if (!$("#qtparams").data("qpause")) return updateQpauseButton(), !1;
    sessionStorage.removeItem(getQpauseKey()), updateQpauseButton(), $("#qpause-message").text(GUI_LOADING_QPAUSED);
    var e = $("#qtparams").data("qpauseremaining");
    if (e > 0) {
        var a = lang(GUI_LOADING_QPAUSED_REMAINING, e);
        $("#qpause-remaining").text(a), $("#qpause-remaining").show();
    } else $("#qpause-remaining").hide();
    return (
        $("#pause").addClass("qpause"),
        $("#pause").show(),
        $("#pause .cover").fadeIn(600),
        $("#qpause-resume").off(),
        $("#qpause-resume").click(function () {
            setButtonState("#qpause-resume", !1);
            var e = $("#qtparams").data("qnumber");
            $.post("qpause.do", { qnumber: e }, function (e) {
                $("#qtparams").data("qpause", !1), $("#pause").removeClass("qpause"), enterQuestion();
            }).fail(function () {
                setButtonState("#qpause-resume", !0);
            });
        }),
        setButtonState("#qpause-resume", !0),
        !0
    );
}
function internalEnterQuestion() {
    qtAC = null;
    var e = $("#qtparams").data("type");
    switch (e) {
        case 1:
        case 12:
        case 13:
            qt = new qtMC();
            break;
        case 2:
            qt = new qtHS();
            break;
        case 3:
        case 14:
            qt = new qtFIB();
            break;
        case 4:
            qt = new qtMatch();
            break;
        case 10:
            qt = new qtDnD();
            break;
        case 11:
            qt = new qtOrder();
            break;
        case 18:
            qt = new qtEssay();
            break;
        case 16:
            qt = inapp;
            break;
        case 19:
        case 20:
        case 21:
        case 22:
            qt = new qtTutor();
            break;
        case 23:
            qt = new qtReaction();
            break;
        case 24:
        case 26:
            qt = new qtContainer();
            break;
        case 25:
            (qt = new qtAudioCapture()), (qtAC = qt);
            break;
        case 27:
            qt = new qtBranch();
            break;
        case 28:
            qt = new qtDnDText();
            break;
        case 29:
            qt = new qtAdvancedHS();
            break;
        case 30:
            qt = new qtInfo();
            break;
        case 31:
            qt = new qtPunct();
            break;
        case 32:
            qt = inapp;
            break;
        default:
            return alert("Unknown question type: " + e), void doSuspendTest();
    }
    $("html").focus(), kbd.init(e), "function" == typeof setupExtraStyles && setupExtraStyles();
    var a = parseInt($("#qtparams").data("autoanswer")),
        t = $("#clock").data("start");
    (t /= 1e3), !isAnswered() && a > 0 && t >= a && $("#qtparams").data("answer", "dummy");
    var n = $("#qtparams").data("isviewanswer");
    isAnswered() && !n && setAnswered();
    try {
        var o = $("#qtparams").data("hideitemid");
        window.location.hash = o ? $("#qtparams").data("qnumber") : $("#qtparams").data("tsqnumber");
    } catch (e) {}
    if (
        ($(".btn").on("dragstart", function (e) {
            e.preventDefault();
        }),
        $("input").on("drop", function (e) {
            e.preventDefault();
        }),
        !isImageOk($("#mainimg,.drop-image-actual")) || !pdf.isLoaded())
    ) {
        if (++imageAttempts < 100) return void setTimeout("internalEnterQuestion()", 200);
        alert("Timeout waiting for images to load - question may not display properly");
    }
    audiop.init();
    var i = $("#qtparams").data("timestopped");
    clock.setStopped(i);
    var r = !1;
    if (("undefined" != typeof et2websocket && et2websocket.isPaused() ? (r = !0) : $("#pause").hide(), clock.setDisplayed(r), countdown > -1)) setTimeout("internalEnterQuestion()", 200);
    else {
        clock.clearStored(), $("#qapanel-wrapper") && makeQAPanel(), (this_itemevent = itemevent.start("item"));
        var s = "" + $("#qtparams").data("answer"),
            d = $("#qtparams").data("restore");
        qt.video(), qt.prepare(s, d), qt.enter(s, d), setState();
        $("#controls").data("navanswer");
        var l = $("#qtparams").data("end");
        l && $("#qtparams").data("autoend") && canEnd()
            ? doEndTest()
            : (l && !lastansweredShown && canEnd() && ((lastansweredShown = !0), endTest()),
              $(".ev_comment").off("click"),
              $(".ev_comment").click(function () {
                  $.post("comment.do", { ts_qid: $("#qtparams").data("qid"), comment: $("#comment").val(), anonymous: $("#anonymous").prop("checked") }), $("#commentModal").modal("hide");
              }),
              tools.init(),
              $("#qtparams").data("paused") && et2websocket.doPause(),
              loading(null),
              inactivity.init());
    }
}
function leaveQuestion(e) {
    leaving ||
        ((leaving = !0),
        clock.setLeave(),
        null != $("#calculator").dialog("instance") && $("#calculator").dialog("destroy"),
        $("#calc_container").append("<div id='calculator'></div>"),
        null != $("#zoompopup").dialog("instance") && $("#zoompopup").dialog("destroy"),
        audiop.pause($("#mainaudio, .qtxtaudio, .audio-player")),
        audiop.leave(),
        loading(1, function () {
            $("*").off(), e && e();
        }));
}
function undoLeaveQuestion() {
    (leaving = !1), loading(null), clock.resume();
}
function updateQuestionArea(e, a) {
    leaveQuestion(function () {
        null != this_itemevent && (this_itemevent = itemevent.end(this_itemevent)), a || (a = {}), qt.exit(), qt.leave(e, a);
    });
}
function next(e, a) {
    if (canNext())
        return 18 == $("#qtparams").data("type") && $("#qtparams").data("warnleave") && !a
            ? ($("#essayWarnModal").modal("show"),
              $(".ev_essaywarn_confirm").off("click"),
              void $(".ev_essaywarn_confirm").click(function () {
                  $("#essayWarnModal").modal("hide"), next(e, !0);
              }))
            : void ((1 == e && navAnswer($("#controls").data("lastunanswered") ? "" : "next")) || navAnswer(lastansweredShown ? "next2" : "") || ($(".modal-backdrop").remove(), updateQuestionArea("next.do")));
}
function prev(e, a) {
    if (canPrev())
        return 18 == $("#qtparams").data("type") && $("#qtparams").data("warnleave") && !a
            ? ($("#essayWarnModal").modal("show"),
              $(".ev_essaywarn_confirm").off("click"),
              void $(".ev_essaywarn_confirm").click(function () {
                  $("#essayWarnModal").modal("hide"), prev(e, !0);
              }))
            : void ((1 == e && navAnswer($("#controls").data("lastunanswered") ? "" : "prev")) || navAnswer(lastansweredShown ? "prev2" : "") || updateQuestionArea("prev.do", { mode: 1 == e ? "order" : "unanswered" }));
}
function navcat(e) {
    canNav() && updateQuestionArea("navcat.do", { cat: e });
}
function navAnswer(e) {
    var a = !1;
    if (!$("#controls").data("navanswer") && "end" === e) {
        var t = $("#qtparams").data("type");
        clock.getTimeLeft() < 0 && 18 == t && (a = !0);
    }
    if (!$("#controls").data("navanswer") && !a) return !1;
    var n = $("#qtparams").data("autoanswer");
    "end" != e && (n = 0);
    var o = $("#controls").data("answeroverwrite");
    return !((isAnswered() && !o) || (n < 1 && !canAnswer())) && (e && e.length > 0 ? doAnswer({ nav: e }) : doAnswer(null), !0);
}
function jump(e, a) {
    if (!navAnswer("" + e) && canNav()) {
        if (18 == $("#qtparams").data("type") && $("#qtparams").data("warnleave") && !a)
            return (
                $("#essayWarnModal").modal("show"),
                $(".ev_essaywarn_confirm").off("click"),
                void $(".ev_essaywarn_confirm").click(function () {
                    $("#essayWarnModal").modal("hide"), jump(e, !0);
                })
            );
        updateQuestionArea("jump.do", { qnumber: e }), clock.clearStored();
    }
}
function nojump(e) {
    $(".navitem.active > a").focus();
}
function et2clear() {
    canClear() &&
        ($("#controls").data("confirmclear")
            ? isAnswered() && qt.clearDoesEdit()
                ? ($("#editModal").modal("show"), $("#editModal").off("hidden"), $("#editModal").on("hidden", tools.magnifier.refresh), setTimeout(tools.magnifier.refresh, 200))
                : ($("#clearModal").modal("show"), $("#clearModal").off("hidden"), $("#clearModal").on("hidden", tools.magnifier.refresh), setTimeout(tools.magnifier.refresh, 200))
            : confirmClear());
}
function confirmClear() {
    isAnswered() && qt.clearDoesEdit() ? ((qt.edited = !0), $("li.navitem.active a").off("focusout"), setUnanswered(), $("#qtparams").data("audioplaymode") > 0 && audiop.init()) : justclear();
}
function justclear() {
    $(".modal-backdrop").remove(), (qt.edited = !1), updateQuestionArea("clear.do"), clock.clearStored();
}
function setUnanswered() {
    $("#qtparams").data("answer", null),
        $("#overlay").hide(),
        $(".button-clear:visible").tooltip("destroy"),
        $(".button-clear:visible").data("title", GUI_CLEARABLE_MSG),
        $(".clear_edit").hide(),
        $(".clear_clear").show(),
        $(".button-clear:visible").tooltip("show"),
        setState();
}
function resizeOverlay() {
    var e = $("#questionscroll").width();
    e != $("#overlay").width() && $("#overlay").css({ width: e }), overlayCounter++ < 50 && setTimeout("resizeOverlay()", 100);
}
function setAnswered() {
    if (!$("#controls").data("answeroverwrite")) {
        $(window).resize(function () {
            var e = $("#questionscroll").width();
            $("#overlay").css({ width: e });
        }),
            (overlayCounter = 0),
            setTimeout("resizeOverlay()", 100);
        var e = $("#questionscroll").width();
        $("#overlay").css({ width: e }),
            $("#overlay").show(),
            $("#overlay").mousewheel(function (e) {
                var a = e.deltaY * e.deltaFactor,
                    t = $("#questionframe").scrollTop();
                $("#questionframe").scrollTop(t - a);
            }),
            canClear() &&
                (qt.clearDoesEdit() ? ($(".clear_edit").show(), $(".clear_clear").hide(), $(".button-clear:visible").data("title", GUI_ANSWERED_MSG)) : $(".button-clear:visible").data("title", GUI_CLEARABLE_MSG),
                $(".button-clear:visible").data("trigger", "manual hover"),
                $("#topbar .button-clear:visible").data("placement", "bottom"),
                $("#bottombar .button-clear:visible").data("placement", "top"),
                $(".button-clear:visible").tooltip("show"));
    }
}
function doAnswer(e, a) {
    leaveQuestion(function () {
        null == e && (e = {}),
            qt.edited && qt.getState() == STATE_UNANSWERED && (e.clear = "1"),
            showFeedback() ? (e.feedback = "1") : delete e.feedback,
            qt.calcAnswer(function (t, n) {
                if (null != inapp) {
                    if ("ERROR" == t) return undoLeaveQuestion(), void reportError();
                    if (null == n) return undoLeaveQuestion(), void reportError();
                    if (-1 == n) return undoLeaveQuestion(), void reportWarnDialog();
                    if (-2 == n) return undoLeaveQuestion(), void (canNav() ? reportClosedApp() : justclear());
                    if (-3 == n) return undoLeaveQuestion(), void reportError();
                }
                qt.exit(), (e.cb_completion = a), qt.answer(n, e);
            });
    }),
        clock.clearStored();
}
function answer(e) {
    if (!$(".button-answer").hasClass("dimmed")) {
        if (18 == $("#qtparams").data("type") && $("#qtparams").data("warnleave") && !e)
            return (
                $("#essayWarnModal").modal("show"),
                $(".ev_essaywarn_confirm").off("click"),
                void $(".ev_essaywarn_confirm").click(function () {
                    $("#essayWarnModal").modal("hide"), answer(!0);
                })
            );
        var a = $("#controls").data("answeroverwrite");
        ((!isAnswered() && canAnswer()) || (a && qt.getState() == STATE_ANSWERED)) && doAnswer(null);
    }
}
function autoanswerTimeout() {
    qt.getState();
    isAnswered() || doAnswer(null);
}
function comment() {
    $("#commentModal").modal("show"), $("#commentModal").off("hidden"), $("#commentModal").on("hidden", tools.magnifier.refresh), setTimeout(tools.magnifier.refresh, 200);
}
function qpause() {
    var e = getQpauseKey();
    sessionStorage.getItem(e) ? sessionStorage.removeItem(e) : sessionStorage.setItem(e, $("#qtparams").data("qnumber")), updateQpauseButton();
}
function getQpause() {
    return "undefined" == typeof Storage || null == sessionStorage ? null : sessionStorage.getItem(getQpauseKey());
}
function getQpauseKey() {
    return "qpause-" + $("#params").data("resultid");
}
function updateQpauseButton() {
    getQpause() ? $(".button-qpause").addClass("active") : $(".button-qpause").removeClass("active");
}
function info() {
    var e = $(window).height();
    (e -= 150) < 150 && (e = 150),
        (e -= 150),
        $("#infoModal-contents").html("<iframe id='infoModal-iframe' name='infoiframe'></iframe>"),
        $("#infoModal-iframe").attr("src", "info.html"),
        $("#infoModal-contents iframe").css("height", e + "px"),
        $("#infoModal").modal("show"),
        $("#infoModal").off("hidden"),
        $("#infoModal").on("hidden", tools.magnifier.refresh),
        setTimeout(tools.magnifier.refresh, 200);
}
function scenario() {
    bsModalShowSized("#scenarioModal"), $("#scenarioModal").off("hidden"), $("#scenarioModal").on("hidden", tools.magnifier.refresh), setTimeout(tools.magnifier.refresh, 200);
}
function setMarkedText() {
    var e = parseInt($("#qtparams").data("nummarked"));
    if (e > 0) {
        var a = GUI_NUM_MARKED.replace(/@0/, e);
        $("#numMarked").text(a);
    } else $("#numMarked").text("");
}
function populateItemlist() {
    $("#itemNavItemList tbody").empty(),
        $.get("navigation.do", function (e, a, t) {
            $("#itemNavItemList tbody").append(e),
                $(".ev_navrow").off("click"),
                $(".ev_navrow").click(function () {
                    $("#itemNavModal").modal("hide"), $(".modal-backdrop").remove(), jump($(this).data("number"));
                }),
                $(".ev_navrow input:checkbox").off("click"),
                $(".ev_navrow input:checkbox").click(function (e) {
                    e.stopPropagation();
                    var a = $(this).closest("tr").data("number");
                    $("#navitem-" + a).toggleClass("item-marked"),
                        $("#fnavitem-" + a).toggleClass("item-marked"),
                        $.post("mark.do", { number: a }, function (e) {
                            $("#qtparams").data("nummarked", e.markedCount);
                        });
                }),
                navfilterRestoreState();
        }),
        $(".ev_navfilter").off("click"),
        $(".ev_navfilter").click(function () {
            togglePopover();
        });
}
function itemnav() {
    populateItemlist(),
        setMarkedText(),
        $("#itemNavModalLabelEnd").hide(),
        $("#itemNavModalLabelSuspend").hide(),
        $("#itemNavModalMsgEnd").hide(),
        $("#itemNavModalMsgSuspend").hide(),
        $("#itemNavModalBtnEnd").hide(),
        $("#itemNavModalBtnSuspend").hide(),
        $("#itemNavModalLabelNav").show(),
        $("#itemNavItemList").show(),
        $("#itemNavModalMsgCount").hide(),
        $("#itemNavModal").attr("aria-labelledby", "itemNavModalLabelNav"),
        $("#itemNavModal").attr("aria-describedby", "itemNavModalDescNav"),
        $("#itemNavModal").addClass("fullscreen"),
        $("#itemNavModal").removeClass("normal"),
        $("#itemNavModal").modal("show"),
        $("#itemNavModal").off("hidden", tools.magnifier.refresh),
        $("#itemNavModal").on("hidden", tools.magnifier.refresh),
        setTimeout(tools.magnifier.refresh, 200);
}
function markitem() {
    var e = $(".navitem.active").data("number");
    $("#navitem-" + e).toggleClass("item-marked"), $("#fnavitem-" + e).toggleClass("item-marked");
    var a = $("#navrow-" + e + " input:checkbox");
    a.prop("checked", !a.prop("checked")),
        $.post("mark.do", function (e) {
            $("#qtparams").data("nummarked", e.markedCount);
        });
}
function setTaskBar(e) {
    var a = $("#qtparams").data("taskpos");
    a = parseInt(a);
    for (var t = $(".taskbar li").toArray(), n = 0; n <= e; n++) {
        var o = a + n;
        o >= t.length || ((t[o].className = ""), n == e ? $(t[o]).addClass("active") : $(t[o]).addClass("complete"));
    }
}
function calculator() {
    var e = { my: "right top", at: "right top", of: "#questionframe" };
    $("#calculator").dialog({ draggable: !0, dialogClass: "calcwrapper", closeOnEscape: !1, position: e, resizable: !1, width: "auto" }),
        $(".ui-dialog-titlebar-close").addClass("icon-remove"),
        $("div.calcwrapper > div").css("padding", 0),
        $("#calculator").dialog("option", "position", e);
}
function showStyle() {
    canStyle() && ((iev = itemevent.start("style")), (document.location.href = "style.html"));
}
function toggleFeedback() {
    $("#showfeedback").toggleClass("active"), $("#params").data("showfeedback", !$("#params").data("showfeedback"));
}
function showFeedback() {
    return $("#showfeedback") && $("#showfeedback").hasClass("active");
}
function parseUrl(e, a, t, n, o, i, r) {
    var s = e.substring(a, e.length);
    return (s = (s = (s = (s = (s = s.replace("@resultid@", t)).replace("@guid@", encodeURIComponent(n))).replace("@score@", o)).replace("@status@", encodeURIComponent(i))).replace("@categories@", encodeURIComponent(r)));
}
function closeaction(e, a, t) {
    var n = t.action,
        o = t.resultid;
    $("#loading").html(""), "close" == n ? e.top.close() : "blank" == n ? (a.location.href = "about:blank") : "none" == n || (a.location.href = "result" == n ? "../user/viewResult.do?endOfTest=1&resultid=" + o : n);
}
function resultaction(e, a, t) {
    var n = t.action,
        o = t.resultid,
        i = t.guid,
        r = t.score,
        s = t.status,
        d = t.typeid,
        l = t.categories;
    if (($("#loading").html(""), "lmsiframe" == t.saml2mode)) {
        var c = JSON.stringify({ action: "end", resultid: o, guid: i, score: r, status: s, attempts: t.attempts, limit: t.limit, categories: l });
        window.parent.postMessage(c, "*");
    }
    var u = !0;
    if ("close" == n) e.top.close();
    else if ("blank" == n);
    else if ("chain" == n) (document.location.href = "../../ls/user/user?op=jsonlaunch&ui=1&rid=" + t.chainid + "&typeid=" + d + "&lw=1&chain=1"), (u = !1);
    else if ("chain-oed" == n) document.location.href = "test.html";
    else if ("result:" == n) window.open("../user/viewResult.do?endOfTest=1&resultid=" + o);
    else if (null != n && 0 === n.lastIndexOf("url:", 0)) {
        var m = parseUrl(n, 4, o, i, r, s, l);
        a.location.href = m;
    } else if (null != n && 0 === n.lastIndexOf("opener:", 0)) {
        m = parseUrl(n, 7, o, i, r, s, l);
        null == e.top.opener || e.top.opener.closed || (e.top.opener.document.location.href = m), e.top.close();
    } else "blankresult" == n ? window.open("../user/viewResult.do?endOfTest=1&resultid=" + o, t.target) : (a.location.href = "../user/viewResult.do?endOfTest=1&resultid=" + o);
    return u;
}
function suspendTest() {
    setMarkedText(),
        $("#itemNavModalLabelNav").hide(),
        $("#itemNavModalLabelEnd").hide(),
        $("#itemNavModalMsgEnd").hide(),
        $("#itemNavModalBtnEnd").hide(),
        $("#itemNavModalLabelSuspend").show(),
        $("#itemNavModalMsgSuspend").show(),
        $("#itemNavModalBtnSuspend").show(),
        $("#itemNavItemList").hide(),
        $("#itemNavModalMsgCount .alert").removeClass("alert-error"),
        $("#itemNavModalMsgCount .alert").addClass("alert-info"),
        $("#itemNavModalMsgCount").show(),
        $("#itemNavModal").attr("aria-labelledby", "itemNavModalLabelSuspend"),
        $("#itemNavModal").attr("aria-describedby", "itemNavModalDescSuspend"),
        $("#itemNavModal").removeClass("fullscreen"),
        $("#itemNavModal").addClass("normal"),
        bsModalShowSized("#itemNavModal", !1, !0),
        $("#itemNavModal").off("hidden", tools.magnifier.refresh),
        $("#itemNavModal").on("hidden", tools.magnifier.refresh),
        setTimeout(tools.magnifier.refresh, 200);
}
function doSuspendTest() {
    $("#itemNavModal").modal("hide"), "undefined" != typeof et2websocket && et2websocket.disconnect(), null != inapp && null != inapp.shutdown ? ((suspend = !0), inapp.shutdown()) : internalDoSuspend();
}
function internalDoSuspend() {
    leaveQuestion(function () {
        null != this_itemevent && (this_itemevent = itemevent.end(this_itemevent)), qt.cleanup();
        var e = $("#params").data("window"),
            a = { suspend: "1", resourceid: $("#params").data("resourceid") },
            t = null;
        (t = e
            ? function (e, a, t) {
                  var n = window.opener;
                  null == n || null == n ? (window.resizeTo(self.screen.availWidth, self.screen.availHeight), closeaction(window, document, e)) : (closeaction(n, n.document, e), window.close());
              }
            : function (e, a, t) {
                  closeaction(window, document, e);
              }),
            net.post("endTest.do", a, t);
    }),
        clock.clearStored();
}
function endTest() {
    setMarkedText(),
        $("#itemNavModalLabelNav").hide(),
        $("#itemNavModalLabelSuspend").hide(),
        $("#itemNavModalMsgSuspend").hide(),
        $("#itemNavModalBtnSuspend").hide(),
        $("#itemNavModalLabelEnd").show(),
        $("#itemNavModalMsgEnd").show(),
        $("#itemNavModalBtnEnd").show(),
        $("#qtparams").data("sectionreview") ? (populateItemlist(), $("#itemNavItemList").show()) : $("#itemNavItemList").hide(),
        $("#itemNavModalMsgCount .alert").removeClass("alert-info"),
        $("#itemNavModalMsgCount .alert").addClass("alert-error"),
        $("#itemNavModalMsgCount").show(),
        $("#itemNavModal").attr("aria-labelledby", "itemNavModalLabelEnd"),
        $("#itemNavModal").attr("aria-describedby", "itemNavModalDescEnd"),
        $("#itemNavModal").removeClass("fullscreen"),
        $("#itemNavModal").addClass("normal"),
        bsModalShowSized("#itemNavModal", !1, !0),
        $("#itemNavModal").off("hidden", tools.magnifier.refresh),
        $("#itemNavModal").on("hidden", tools.magnifier.refresh),
        setTimeout(tools.magnifier.refresh, 200);
}
function showConfirmEndTest() {
    $(".ev_confirm_endtest_ok").off("click"),
        $(".ev_confirm_endtest_ok").click(function () {
            $("#confirmEndTestModal").modal("hide"), navAnswer("end") || doEndTest();
        }),
        $(".ev_confirm_endtest_cancel").off("click"),
        $(".ev_confirm_endtest_cancel").click(function () {
            $("#confirmEndTestModal").modal("hide"), setTimeout(tools.magnifier.refresh, 200);
        }),
        $("#itemNavModal").on("hidden", function () {
            $("#confirmEndTestModal").modal("show"), setTimeout(tools.magnifier.refresh, 200), $("#itemNavModal").off("hidden");
        }),
        $("#itemNavModal").modal("hide");
}
function noConfirmEndTest() {
    $("#itemNavModal").modal("hide"), navAnswer("end") || doEndTest();
}
function doEndTest() {
    $("#itemNavModal").modal("hide"),
        $("#confirmEndTestModal").hide(),
        $(".modal-backdrop").remove(),
        "undefined" != typeof et2websocket && et2websocket.disconnect(),
        null != inapp && null != inapp.shutdown ? ((end = !0), inapp.shutdown()) : internalDoEnd();
}
function internalDoEnd() {
    leaveQuestion(function () {
        null != this_itemevent && (this_itemevent = itemevent.end(this_itemevent)), internalEndTest();
    });
}
function internalEndTest() {
    var e = $("#qtparams").data("endsection");
    if (parseInt($("#qtparams").data("autoanswer")) <= 0) {
        var a = clock.getTimeLeft();
        a && a <= 0 && (e = !1);
    }
    e ? ((lastansweredShown = !1), $("#itemNavModal").modal("hide"), net.load("#question", "endSection.do", { ct: clock.now() })) : internalEndTest2("endTest.do", null);
}
function internalEndTest2(e, a, t, n, o, i) {
    qt.cleanup();
    var r = $("#params").data("window"),
        s = $("#params").data("resourceid"),
        d = null;
    ((a = a || {}).ev_client = clock.now()),
        (a.ev_timezone = -new Date().getTimezoneOffset()),
        (a.resourceid = s),
        (d = r
            ? function (e, a, t) {
                  var n = window.opener;
                  null == n || null == n ? (window.resizeTo(self.screen.availWidth, self.screen.availHeight), resultaction(window, document, e)) : resultaction(n, n.document, e) && window.close();
              }
            : function (e, a, t) {
                  r || null == inapp || window.resizeTo(self.screen.availWidth, self.screen.availHeight), resultaction(window, document, e);
              }),
        25 == $("#qtparams").data("type")
            ? net.postblobSafe(t, n, o, i, function () {
                  net.post(e, a, d);
              })
            : net.post(e, a, d);
}
function selectTagGroup(e) {
    updateQuestionArea("tags.do", { groupid: e.value }), clock.clearStored();
}
function setState() {
    var e = qt.getState();
    if (
        (setButtonState(".button-answer", canAnswer(e)),
        setButtonState(".button-clear", canClear(e)),
        setButtonState(".button-next", canNext(e)),
        setButtonState(".button-prev", canPrev(e)),
        setButtonState(".button-style", canStyle(e)),
        $("#controls").data("navanswer") && $("#controls").data("lastunanswered") && !$("#controls").data("next") && canEnd())
    ) {
        var a = null;
        (a = canAnswer(e) ? $("#qtparams").data("lastunansweredtext") : $("#qtparams").data("nexttext")), $(".button-next").text(a);
    }
}
function canNext(e) {
    void 0 === e && (e = qt.getState());
    var a = $("#qtparams").data("automanualanswer"),
        t = $("#qtparams").data("autoanswer");
    2 == a && (t = null);
    var n = (e == STATE_COMPLETE || e == STATE_INAPP) && !isAnswered() && t < 1;
    return 1 == a && (n = !0), (e != STATE_INCOMPLETE && e != STATE_COMPLETE && t < 1 && $("#controls").data("next")) || (n && $("#controls").data("navanswer"));
}
function canPrev(e) {
    void 0 === e && (e = qt.getState());
    var a = $("#qtparams").data("automanualanswer"),
        t = $("#qtparams").data("autoanswer");
    2 == a && (t = null);
    var n = (e == STATE_COMPLETE || e == STATE_INAPP) && !isAnswered() && t < 1;
    return 1 == a && (n = !0), (e != STATE_INCOMPLETE && e != STATE_COMPLETE && t < 1 && $("#controls").data("prev")) || (n && $("#controls").data("navanswer") && $("#controls").data("prev"));
}
function canAnswer(e) {
    void 0 === e && (e = qt.getState());
    var a = $("#qtparams").data("automanualanswer"),
        t = $("#qtparams").data("autoanswer");
    2 == a && (t = null);
    var n = $("#controls").data("answeroverwrite"),
        o = ((e == STATE_COMPLETE || e == STATE_INAPP || (qt.edited && e == STATE_UNANSWERED)) && !isAnswered() && t < 1) || (e == STATE_ANSWERED && n);
    return t > 0 && 1 == a && (o = !0), o;
}
function canClear(e) {
    var a = !1;
    return $("#qtparams").data("autoanswer") < 1 && (void 0 === e && (e = qt.getState()), (a = $("#controls").data("change") ? e != STATE_UNANSWERED : e != STATE_UNANSWERED && e != STATE_ANSWERED)), a;
}
function canNav(e) {
    void 0 === e && (e = qt.getState());
    var a = $("#qtparams").data("autoanswer");
    return e != STATE_INCOMPLETE && e != STATE_COMPLETE && a < 1 && $("#controls").data("nav");
}
function canStyle(e) {
    return !($("#qtparams").data("autoanswer") > 0) && (void 0 === e && (e = qt.getState()), e == STATE_UNANSWERED || e == STATE_ANSWERED || e == STATE_INAPP);
}
function canEnd() {
    var e = $("#params").data("timelimits");
    return !(e && (e.length > 0 || e > 0) && $("#params").data("mandatorytime")) || clock.getTimeLeft() <= 0;
}
function setButtonState(e, a) {
    a ? enableButton(e) : disableButton(e);
}
function enableButton(e) {
    $(e).each(function () {
        $(this).removeClass("disabled"), $(this).removeAttr("aria-disabled");
    });
}
function disableButton(e) {
    $(e).each(function () {
        $(this).addClass("disabled"), $(this).attr("aria-disabled", "true");
    });
}
function isAnswered() {
    var e = $("#qtparams").data("answer");
    return null !== e && "" !== e && -1 !== e;
}
function isVisited() {
    return $("#qtparams").data("visited");
}
function countdownUpdater() {
    1 == $("#qtparams").data("reactstart")
        ? ($(".countdown-overlay").show(),
          $("#countdown-overlay-vcenter").html(lang(GUI_CLICKTOSTART_MSG)),
          $(".countdown-overlay").mousedown(function () {
              $(".countdown-overlay").hide(), (countdown = -1);
          }),
          (countdown = 1))
        : countdown > 0
        ? ($(".countdown-overlay").show(), $("#countdown-overlay-vcenter").html(lang(GUI_COUNTDOWN_MSG, countdown)), setTimeout(countdownUpdater, 1e3))
        : $(".countdown-overlay").hide(),
        countdown--;
}
var urlmap = [];
function lookup_reset() {
    urlmap = [];
}
function lookup_add(e, a) {
    urlmap[e] = a;
}
function lookup_url(e) {
    var a = urlmap[e];
    return (
        null == a &&
            ($(".tutor_urlmapping span").each(function () {
                lookup_add($(this).data("key"), $(this).data("value"));
            }),
            (a = urlmap[e])),
        a
    );
}
function getlog() {
    null != inapp && null != inapp && inapp.getLog();
}
function launchApp(e) {
    null != inapp && null != inapp && inapp.launchApp(e);
}
function reportError() {
    $("#errorModal").modal("show"), $("#errorModal").off("hidden"), $("#errorModal").on("hidden", tools.magnifier.refresh), setTimeout(tools.magnifier.refresh, 200);
}
function reportCOMError() {
    $("#comModal").modal("show"), $("#comModal").off("hidden"), $("#comModal").on("hidden", tools.magnifier.refresh), setTimeout(tools.magnifier.refresh, 200);
}
function reportLocked() {
    $("#lockedModal").modal("show"), $("#lockedModal").off("hidden"), $("#lockedModal").on("hidden", tools.magnifier.refresh), setTimeout(tools.magnifier.refresh, 200);
}
function reportIncompatible() {
    $("#incompatibleModal").modal("show"), $("#incompatibleModal").off("hidden"), $("#incompatibleModal").on("hidden", tools.magnifier.refresh), setTimeout(tools.magnifier.refresh, 200);
}
function reportWarnDialog() {
    $("#warnModal").modal("show"), $("#warnModal").off("hidden"), $("#warnModal").on("hidden", tools.magnifier.refresh), setTimeout(tools.magnifier.refresh, 200);
}
function reportClosedApp() {
    $("#closedModal").modal("show"), $("#closedModal").off("hidden"), $("#closedModal").on("hidden", tools.magnifier.refresh), setTimeout(tools.magnifier.refresh, 200);
}
function reportMissing(e) {
    var a = "";
    if (e && e.length > 0) {
        var t = e.split(";"),
            n = 0;
        for (n = 0; n < t.length; ++n) a += "<span>" + t[n] + "</span><br/>";
    }
    $("#missingModalfiles").html(a), $("#missingModal").modal("show"), $("#missingModal").off("hidden"), $("#missingModal").on("hidden", tools.magnifier.refresh), setTimeout(tools.magnifier.refresh, 200);
}
function oldIEdisableSelect() {
    return !$("body").hasClass("highlight");
}
function oldIEdisableDrag(e) {
    if ($("#magnifier:visible").length > 0) return !0;
    if ($("#linereader_bottom:visible").length > 0) return !0;
    var a = e.target.className;
    return a && -1 != a.indexOf("drop-image");
}
function loading(e, a) {
    $("#message_wait").hide(),
        null != e
            ? 2 != e
                ? 3 != e
                    ? ($("#loading .animation").hide(),
                      $("#clock").css("visibility", "hidden"),
                      $("#timer").css("visibility", "hidden"),
                      setTimeout(function () {
                          var e = $("#loading").data("url");
                          $("#loading .animation img").attr("src", e), $("#loading .animation").show();
                      }, 600),
                      $("#message").text(GUI_LOADING_1),
                      $("#loading").show(),
                      $("#loading .cover").fadeIn(600, a))
                    : $("#message").text(GUI_LOADING_3)
                : $("#message").text(GUI_LOADING_2)
            : $("#loading .cover").fadeOut(300, function () {
                  $("#loading").hide(), scrollText();
              });
}
function scrollText() {
    if (0 != $(".et2-scrollIntoView").length && 0 != $(".et2-scrollIntoViewContainer").length) {
        var e = $($(".et2-scrollIntoView")[0]),
            a = $($(".et2-scrollIntoViewContainer")[0]),
            t = (a.scrollTop(), e.offset().top),
            n = (e.offset().top, e.height(), a.offset().top),
            o = a.offset().top + a.height();
        if (!(t - 50 >= n && t + 50 <= o)) {
            var i = t - n - 50,
                r = a[0].scrollTop + i;
            r < 0 && (r = 0), (a[0].scrollTop = r);
        }
    }
}
function cb_postblob(e) {
    e.action ? inapp.cleanup(window, document, e) : ((-1 != e.indexOf("@@NO_SESSION@@") || -1 != e.indexOf("@@KICKED@@") || -1 != e.indexOf("@@TEST_ERROR@@")) && loading(null), $("#question").html(e));
}
function makeQAPanel() {
    qadialog && qadialog.dialog("destroy");
    var e = { my: "left bottom", at: "left bottom", of: "#questionframe" };
    (qadialog = $("#qapanel-wrapper").dialog({ draggable: !0, dialogClass: "no-close qapanel", closeOnEscape: !1, position: e, autoResize: !0, resizable: !1, width: "auto", maxHeight: 400 })),
        $(".ui-dialog-titlebar-close").hide(),
        $("div.qapanelwrapper > div").css("padding", 0),
        $("#qapanel-wrapper").dialog("option", "position", e);
}
function tab_GUID() {
    function e() {
        return Math.floor(65536 * (1 + Math.random()))
            .toString(16)
            .substring(1);
    }
    return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e();
}
function registerTabGUID() {
    if ("undefined" != typeof Storage && null != sessionStorage && null != localStorage) {
        null == sessionStorage.tabGUID && (sessionStorage.tabGUID = tab_GUID());
        var e = sessionStorage.tabGUID;
        window.addEventListener("storage", storage_Handler, !1), (localStorage.tabGUID = e);
    }
}
function storage_Handler(e) {
    "tabGUID" == e.key && e.oldValue != e.newValue && ($("#pmessage").text("You have opened the test in a new tab."), $("#pause").show());
}
function forceTabindex() {
    $('[tabindex]:not([tabindex="0"]):not([tabindex^="-"])').each(function () {
        $(this).attr("tabindex") < 1e3 && $(this).attr("tabindex", 0);
    });
}
$(function () {
    if (
        (registerTabGUID(),
        clock.init(),
        resultStorage.load(),
        $("#params").data("disabledrag") && $("head").append("<style type='text/css'>a, img { -webkit-user-drag: none; }</style>"),
        (reloadCount = parseInt($("#params").data("reloadcount"))) < 1 && (reloadCount = NaN),
        $("#params").data("isinapp"))
    ) {
        reloadCount = NaN;
        var e = window.chrome,
            a = window.navigator.vendor;
        if (null != e && "Google Inc." === a) (onChrome = !0), (onFirefox = !1), (inapp = new qtInappChrome());
        else if ("Firefox" === BrowserDetect.browser && BrowserDetect.version >= 50) (onChrome = !1), (onFirefox = !0), (inapp = new qtInappFirefox());
        else {
            if (((onChrome = !1), (onFirefox = !1), null == document.getElementById("plugin").version)) return alert("No In-Application plugin found"), void internalDoSuspend();
            inapp = new qtInapp();
        }
        inapp.init();
    } else net.load("#question", "question.html", { ct: clock.now() });
    var t = $("#params").data("isaudiocapture"),
        n = !$("#params").data("nowebworkeraudio");
    if ((t && n && window.AudioContext && ((audioCtx = new AudioContext()), (audioEncoderWorker = new Worker(webWorkerAudioURL)).postMessage(["init", audioCtx.sampleRate])), "lmsiframe" == $("#params").data("saml2mode"))) {
        var o = JSON.stringify({ action: "start" });
        window.parent.postMessage(o, "*");
    }
});
