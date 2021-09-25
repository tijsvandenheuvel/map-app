function setupMap() {
	var map_123 = L.map("map_123", {
		center: [51.11, 4.46],
		crs: L.CRS.EPSG3857,
		zoom: 11,
		zoomControl: true,
		preferCanvas: false,
	});

	var osm_layer = L.tileLayer(
		"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
		{
			attribution:
				'Data by \u0026copy; \u003ca href="http://openstreetmap.org"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca href="http://www.openstreetmap.org/copyright"\u003eODbL\u003c/a\u003e.',
			detectRetina: false,
			maxNativeZoom: 18,
			maxZoom: 18,
			minZoom: 0,
			noWrap: false,
			opacity: 1,
			subdomains: "abc",
			tms: false,
		}
	);

	// ZOOM
	L.control.scale().addTo(map_123);

	// DRAW
	drawnItems = L.featureGroup().addTo(map_123);

	layercontrol = L.control
		.layers({ osm: osm_layer.addTo(map_123) }, { drawing: drawnItems })
		.addTo(map_123);

	map_123.addControl(
		new L.Control.Draw({
			edit: {
				featureGroup: drawnItems,
				poly: {
					allowIntersection: false,
				},
			},
			draw: {
				polygon: false, // {allowIntersection: false,showArea: true,},
				polyline: false,
				rectangle: false,
				circlemarker: false,
				circle: false,
				marker: true,
			},
		})
	);

	map_123.on(L.Draw.Event.CREATED, function (event) {
		var layer = event.layer;

		//if(event.layerType=="marker"){}

		layer.properties = {};
		var feature = (layer.feature = layer.feature || {});
		feature.type = "Feature";
		feature.properties = feature.properties || {};

		marker_name = doPrompt("enter location name");

		if (marker_name != null && marker_name != " ") {
			feature.properties["name"] = marker_name;

			layer.bindPopup(feature.properties["name"]);

			drawnItems.addLayer(layer);
		}
	});

	return map_123;
}

function saveDrawMarkers() {
	var json_feature_collection = drawnItems.toGeoJSON();

	if (json_feature_collection.features.length != 0) {
		file_name = doPrompt("enter file name");
        
		if (file_name != null && file_name != " ") {
			postFileToMongo(file_name, json_feature_collection);
		}
	}
}

var polygonMarkerOptions = {
	radius: 2,
	fillColor: "green",
	color: "green",
	weight: 2,
	opacity: 0.5,
	fillOpacity: 0.2,
};

var pointMarkerOptions = {
	radius: 3,
	fillColor: "red",
	color: "red",
	weight: 3,
	opacity: 1,
	fillOpacity: 0.2,
};

var dorpMarkerOptions = {
	radius: 5,
	fillColor: "lightgray",
	color: "gray",
	weight: 3,
	opacity: 1,
	fillOpacity: 0.2,
};

function addPopUp(feature, layer) {
	if (feature.properties && feature.properties.name) {
		layer.bindPopup(feature.properties.name);
	}
}

function addToolTip(feature, layer) {
	//console.log(feature.properties.NAME)
	if (feature.properties && feature.properties.NAME) {
		layer.bindTooltip(feature.properties.NAME);
	}
}

function displayFeatureList(featurelist, file_name) {
	// new featuregroup layer
	geojson_features = L.featureGroup().addTo(map_123);

	type = featurelist.features[0].geometry.type;

	if (type == "MultiPolygon" || type == "Polygon") {
		var areas = new L.GeoJSON(featurelist, {
			style: polygonMarkerOptions,
			onEachFeature: addPopUp,
		}).addTo(geojson_features);
	} else if (type == "Point") {
		for (let i = 0; i < featurelist.features.length; i++) {
			L.geoJSON(featurelist.features[i], {
				pointToLayer: function (feature, latlng) {
					return L.circleMarker(latlng, pointMarkerOptions);
				},
				onEachFeature: addPopUp,
			}).addTo(geojson_features);
		}
	} else if (type == "LineString" || type == "MultiLineString") {
		for (let i = 0; i < featurelist.features.length; i++) {
			L.geoJSON(featurelist.features[i], {
				onEachFeature: addToolTip,
			}).addTo(geojson_features);
		}
	}

	// add to control
	layercontrol.addOverlay(geojson_features, file_name);
}

function resetMap() {
	map_123.off();
	map_123.remove();

	map_123 = setupMap();
}
