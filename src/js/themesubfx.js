require([
	"common",
], function() {
	$(".pension_sub>ul>li").mouseover(function() {
		$(this).children(".box_hover").css("display", "flex");
	});
	$(".pension_sub>ul>li").mouseout(function() {
		$(this).children(".box_hover").css("display", "none");
	});
});
