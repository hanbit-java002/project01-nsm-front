require([
	"common",
], function() {
	var mapInfo = {
		map: null,
		center: {
			lat: 0,
			lng: 0,
		},
		isBig: false,
		SMALL_LIST_WIDTH: "40%",
		SMALL_INFO_WIDTH: "400px",
	};

	function getBestZoom(minLat, maxLat, minLng,
		maxLng, mapWidth, mapHeight, maxZoom) {
		var radius = 6371; // radius of the earth in km
		var oneRadian = 57.2958; // one radian
		var interval = 0;

		if ((maxLat - minLat) > (maxLng - minLng)) {
			interval = (maxLat - minLat) / 2;
		}
		else {
			interval = (maxLng - minLng) / 2;
		}

		minLat -= interval;
		maxLat += interval;
		minLng -= interval;
		maxLng += interval;

		var dist = (radius * Math.acos(Math.sin(minLat / oneRadian) *
			Math.sin(maxLat / oneRadian) + (Math.cos(minLat / oneRadian) *
			Math.cos(maxLat / oneRadian) *
			Math.cos((maxLng / oneRadian) - (minLng / oneRadian)))));

		var zoom = Math.floor(8 -
			Math.log(1.6446 * dist / Math.sqrt(2 * (mapWidth * mapHeight))) /
			Math.log(2));

		if (!maxZoom) {
			maxZoom = 21;
		}

		return Math.min(zoom, maxZoom);
	}

	function configureMap(list) {
		mapInfo.center = {
			lat: 0,
			lng: 0,
		};

		var minLat = 5000;
		var maxLat = -5000;
		var minLng = 5000;
		var maxLng = -5000;

		// Create a map object and specify the DOM element for display.
		mapInfo.map = new google.maps.Map(document.getElementById("map"), {
			center: mapInfo.center,
			scrollwheel: false,
			mapTypeControl: false,
			zoom: 10,
		});

		var contentString = "<div class=\"map_popup\" data-name=\"가평아이리스\">" +
			"<p class=\"close\">창닫기</p>" +
			"<img src=\"/img/189499_m.jpg\" align=\"center\">" +
			"<div class=\"popup_info\">" +
			"<p class=\"popup_title\">가평아이리스</p>" +
			"<p>연락처:010-9617-0107, 031-581-0108</p>" +
			"<p>객실시설:테라스바베큐,스파&월풀,풀빌라,</p>" +
			"<p>편의시설:와이파이,수영장</p>" +
			"<p>테마:</p>" +
			"</div>" +
			"<div class=\"popup_btn\">" +
			"<a href=\"/\" target=\"_blank\">홈페이지</a>" +
			"</div>" +
			"</div>";

		var infowindow = new google.maps.InfoWindow({
			content: contentString,
		});

		for (var i=0; i<list.pensions.length; i++) {
			var pension = list.pensions[i];

			// Create a marker and set its position.
			var marker = new google.maps.Marker({
				map: mapInfo.map,
				position: pension.latLng,
				title: pension.name,
				icon: pension.image,
			});

			minLat = Math.min(minLat, pension.latLng.lat);
			maxLat = Math.max(maxLat, pension.latLng.lat);
			minLng = Math.min(minLng, pension.latLng.lng);
			maxLng = Math.max(maxLng, pension.latLng.lng);

			console.log(marker);
		}

		marker.addListener("click", function() {
			infowindow.open(mapInfo.map, marker);
		});

		mapInfo.center = {
			lat: (maxLat + minLat) / 2,
			lng: (maxLng + minLng) / 2,
		};

		// google.maps.event.addListener(marker, "click", function() {
		// 	infowindow.open(map, marker);
		// });

		var zoom = getBestZoom(minLat, maxLat, minLng, maxLng,
			$("#map").width(), $("#map").height(), 15);

		mapInfo.map.panTo(mapInfo.center);
		mapInfo.map.setZoom(zoom);
	}

	function initMap(list) {
		require(["async!https://maps.googleapis.com/maps/api/js?key=" +
		"AIzaSyAHX_Y_cP2i1v9lchEPJ4yROwzh9nK6of0"], function() {
			configureMap(list);
		});
	}

	var tempList = {
		"pensions": [{
			"name": "가평아이리스",
			"latLng": {
				"lat": 37.735845,
				"lng": 127.471712,
			},
			"image": "/img/map_iconP.png",
			}, {
			"name": "까사베르디",
			"latLng": {
				"lat": 37.919112,
				"lng": 127.582516,
			},
			"image": "/img/map_iconP.png",
			}, {
				"name": "꽃무지풀무지",
				"latLng": {
					"lat": 37.802339,
					"lng": 127.383081,
				},
			"image": "/img/map_iconB.png",
		}],
	};

	initMap(tempList);

	$(".list>p").mouseover(function() {
		var pensionName;

		pensionName=$(this).closest("div").data("name");

		if(($(this).closest("div").data("name"))) {
			$(".map_popup[data-name=" + pensionName + "]").css("display", "block");
		}

		console.log(pensionName);
	});

	$(".list>p").mouseout(function() {
		$(".map_popup").css("display", "none");
	});
});
