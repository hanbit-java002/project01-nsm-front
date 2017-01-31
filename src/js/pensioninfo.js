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

		for (var i=0; i<list.stores.length; i++) {
			var store = list.stores[i];

			// Create a marker and set its position.
			var marker = new google.maps.Marker({
				map: mapInfo.map,
				position: store.latLng,
				title: store.name,
			});

			minLat = Math.min(minLat, store.latLng.lat);
			maxLat = Math.max(maxLat, store.latLng.lat);
			minLng = Math.min(minLng, store.latLng.lng);
			maxLng = Math.max(maxLng, store.latLng.lng);

			console.log(marker);
		}

		mapInfo.center = {
			lat: (maxLat + minLat) / 2,
			lng: (maxLng + minLng) / 2,
		};

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
		"stores": [{
			"name": "모아이펜션",
			"latLng": {
				"lat": 37.761375,
				"lng": 127.3615924,
			},
		}],
	};

	initMap(tempList);
});
