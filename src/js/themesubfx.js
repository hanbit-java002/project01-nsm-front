require([
	"common",
], function() {
	var themesubfx = {items: []};

	function addPensionList(items) {
		if (items) {
			themesubfx.items = items;
		}
		items = themesubfx.items;

		var i;
		var item;
		var pensionHTML;

		for (i=0; i<items.length; i++) {
			item = items[i];

			pensionHTML = "<li>";
			pensionHTML += "<a href=" + item.info + ">";
			pensionHTML += "<img class=\"pension_img\" src=" + item.img + ">";
			pensionHTML += "<img class=\"box_cover\" src=\"/img/box_cover.png\">";
			pensionHTML += "</a>";
			pensionHTML += "<div class=\"txt_box\">";
			pensionHTML += "<p>" + item.title1 + "</p>";
			pensionHTML += "<p>" + item.region + "</p>";
			pensionHTML += "</div>";
			pensionHTML += "<div class=\"box_hover\">";
			pensionHTML += "<div class=\"hover_txt\">";
			pensionHTML += "<p>" + item.title2 + "</p>";
			pensionHTML += "<p>" + item.addr + "</p>";
			pensionHTML += "</div>";
			pensionHTML += "</div>";
			pensionHTML += "</li>";

			$(".pension_sub>ul").append(pensionHTML);
		}
	}

	function initTheme() {
		$.ajax({
			url: "/api/themesubfx/items",
			success: function(items) {
				addPensionList(items);
			},
		});
	}

	initTheme();

	$(".pension_sub>ul>li").mouseover(function() {
		$(this).children(".box_hover").css("display", "flex");
	});
	$(".pension_sub>ul>li").mouseout(function() {
		$(this).children(".box_hover").css("display", "none");
	});
});
