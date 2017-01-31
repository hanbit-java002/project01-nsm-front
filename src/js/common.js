define([
	"bootstrap",
], function() {
	$(".search_area").on("click", function(event) {
		event.stopPropagation();

		if($(this).hasClass("search_area")) {
			$(".nav_box").toggle();
			return;
		}

		$(".nav_box").hide();

		$(".search_area").removeClass("active");
		$(this).addClass("active");
	});
});
