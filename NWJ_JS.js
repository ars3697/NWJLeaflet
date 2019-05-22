////////////////////////////////
//      INITIALIZING MAP      //  		
////////////////////////////////

// SEATTLE/KING COUNTY VIEW: (47.604673, -122.330884), 10 <- Zoom Level			

// Initializes and modifies map.
var mymap = L.map('mapid').setView([47.604673, -122.330884], 10);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox.streets'
}).addTo(mymap);

/////////////////////////////////
//      IMPORTING GEOJSON      //  		
/////////////////////////////////

// 2017 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// KING2017
// CENSUS TRACT, 2017, KING COUNTY

// FUNCTION: onEachFeature_king2017
// Enables popups when clicking on a shape in the map.
// Settings for king2017.
function onEachFeature_king2017(feature, layer) {
	var popupContent = "";
	if (feature.properties && feature.properties.GEOID) {
		popupContent += "GEOID: " + feature.properties.GEOID + " ";
	}
	
	if (feature.properties && feature.properties.TRACT2017_TotalPop17) {
		popupContent += "TotalPop17: " + feature.properties.TRACT2017_TotalPop17 + " ";
	}
	layer.bindPopup(popupContent);
}

// Adds 2017 King county census tract polygons.
var king2017 = L.geoJSON(king2017json, {
	style: totalPop17Style,
	onEachFeature: onEachFeature_king2017
});
king2017.addTo(mymap);

// PIERCE2017
// CENSUS TRACT, 2017, PIERCE COUNTY

// FUNCTION: onEachFeature_pierce2017
// Enables popups when clicking on a shape in the map.
// Settings for pierce2017.
function onEachFeature_pierce2017(feature, layer) {
	var popupContent = "GEOID: ";
	if (feature.properties && feature.properties.GEOID) {
		popupContent += feature.properties.GEOID;
	}
	layer.bindPopup(popupContent);
}

// Adds 2017 Pierce county census tract polygon.
var pierce2017 = L.geoJSON(pierce2017json, {
	style: {"weight": 1, "opacity": 0.75},
	onEachFeature: onEachFeature_pierce2017
});

// SPOKANE2017
// CENSUS TRACT, 2017, SPOKANE COUNTY

// FUNCTION: onEachFeature_spokane2017
// Enables popups when clicking on a shape in the map.
// Settings for spokane2017.
function onEachFeature_spokane2017(feature, layer) {
	var popupContent = "GEOID: ";
	if (feature.properties && feature.properties.GEOID) {
		popupContent += feature.properties.GEOID;
	}
	layer.bindPopup(popupContent);
}

// Adds 2017 Spokane county census tract polygon.
var spokane2017 = L.geoJSON(spokane2017json, {
	style: {"weight": 1, "opacity": 0.75},
	onEachFeature: onEachFeature_spokane2017
});

// BENTON2017
// CENSUS TRACT, 2017, BENTON COUNTY

// FUNCTION: onEachFeature_benton2017
// Enables popups when clicking on a shape in the map.
// Settings for benton2017.
function onEachFeature_benton2017(feature, layer) {
	var popupContent = "GEOID: ";
	if (feature.properties && feature.properties.GEOID) {
		popupContent += feature.properties.GEOID;
	}
	layer.bindPopup(popupContent);
}

// Adds 2017 Benton county census tract polygons.
var benton2017 = L.geoJSON(benton2017json, {
	style: {"weight": 1, "opacity": 0.75},
	onEachFeature: onEachFeature_benton2017
});

// FRANKLIN2017
// CENSUS TRACT, 2017, FRANKLIN COUNTY

// FUNCTION: onEachFeature_franklin2017
// Enables popups when clicking on a shape in the map.
// Settings for franklin2017.
function onEachFeature_franklin2017(feature, layer) {
	var popupContent = "GEOID: ";
	if (feature.properties && feature.properties.GEOID) {
		popupContent += feature.properties.GEOID;
	}
	layer.bindPopup(popupContent);
}

// Adds 2017 Franklin county census tract polygons.
var franklin2017 = L.geoJSON(franklin2017json, {
	style: {"weight": 1, "opacity": 0.75},
	onEachFeature: onEachFeature_franklin2017
});

// WALLAWALLA2017
// CENSUS TRACT, 2017, WALLA WALLA COUNTY

// FUNCTION: onEachFeature_wallawalla2017
// Enables popups when clicking on a shape in the map.
// Settings for wallawalla2017.
function onEachFeature_wallawalla2017(feature, layer) {
	var popupContent = "GEOID: ";
	if (feature.properties && feature.properties.GEOID) {
		popupContent += feature.properties.GEOID;
	}
	layer.bindPopup(popupContent);
}

// Adds 2017 Walla Walla county census tract polygons.
var wallawalla2017 = L.geoJSON(wallawalla2017json, {
	style: {"weight": 1, "opacity": 0.75},
	onEachFeature: onEachFeature_wallawalla2017
});

//////////////////////
//      TOGGLES     //  		
//////////////////////

// 2017 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// FUNCTION: toggleLayerSeattle2017
// Toggles the 2017 Seattle layer using a checkbox.
function toggleLayerSeattle2017() {
	var checkBox = document.getElementById("toggleLayerSeattle2017");
	if(checkBox.checked == true) {
		seattle2017.addTo(mymap);
	} else {
		seattle2017.remove(mymap);
	}
};

// FUNCTION: toggleLayerKing2017
// Toggles the 2017 King layer using a checkbox.
function toggleLayerKing2017() {
	var checkBox = document.getElementById("toggleLayerKing2017");
	if(checkBox.checked == true) {
		king2017.addTo(mymap);
	} else {
		king2017.remove(mymap);
	}
};

// FUNCTION: toggleLayerPierce2017
// Toggles the 2017 Pierce layer using a checkbox.
function toggleLayerPierce2017() {
	var checkBox = document.getElementById("toggleLayerPierce2017");
	if(checkBox.checked == true) {
		pierce2017.addTo(mymap);
	} else {
		pierce2017.remove(mymap);
	}
};

// FUNCTION: toggleLayerSpokane2017
// Toggles the 2017 Spokane layer using a checkbox.
function toggleLayerSpokane2017() {
	var checkBox = document.getElementById("toggleLayerSpokane2017");
	if(checkBox.checked == true) {
		spokane2017.addTo(mymap);
	} else {
		spokane2017.remove(mymap);
	}
};

// FUNCTION: toggleLayerBenton2017
// Toggles the 2017 Benton layer using a checkbox.
function toggleLayerBenton2017() {
	var checkBox = document.getElementById("toggleLayerBenton2017");
	if(checkBox.checked == true) {
		benton2017.addTo(mymap);
	} else {
		benton2017.remove(mymap);
	}
};

// FUNCTION: toggleLayerFranklin2017
// Toggles the 2017 Franklin layer using a checkbox.
function toggleLayerFranklin2017() {
	var checkBox = document.getElementById("toggleLayerFranklin2017");
	if(checkBox.checked == true) {
		franklin2017.addTo(mymap);
	} else {
		franklin2017.remove(mymap);
	}
};

// FUNCTION: toggleLayerWallaWalla2017
// Toggles the 2017 Walla Walla layer using a checkbox.
function toggleLayerWallaWalla2017() {
	var checkBox = document.getElementById("toggleLayerWallaWalla2017");
	if(checkBox.checked == true) {
		wallawalla2017.addTo(mymap);
	} else {
		wallawalla2017.remove(mymap);
	}
};

/** EVERYTHING UNDER HERE IS UNDER CONSTRUCTION. This is just trying to figure out how to make breaks for a choropleth map.
But right now, I'm looking into finding a plugin somewhere on the internet.

ALSO: This is how you access individual values for the layers.
wallawalla2017json[0]['features'][x]['properties'][y]

Pull up the WALLAWALLA2017.js file in the data/2017 folder

wallawalla2017json[0]['features'][1]['properties']['TRACTCE']
will give you 920500

wallawalla2017json[0]['features'][2]['properties']['TRACTCE']
will give you 920000

wallawalla2017json[0]['features'][3]['properties']['GEOID']
will give you 53071920600

That [0] in front of wallawalla2017json is very important, don't leave it or change it.
And you can also do the same for king2017json, spokane2017json, etc.

//////////////////////
//    CHOROPLETH    //  		
//////////////////////

function getMaxx(arr, prop) {
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
};

function getMax(arr, prop) {
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
};

var x = wallawalla2017json;
console.log(wallawalla2017json[0]['features'][0]['properties']['GEOID']);
console.log(wallawalla2017json[0].features[0].properties.TRACT2017_TotalPop17);

var y = getMax(wallawalla2017json[0].features, properties);
console.log(y);




**/

// These are just test functions that produces a simple choropleth map.
// Only applies to King county's population data for now, but I'm trying to automate it so that any 
// variable can be inputted, and it'll divide up automatically.
function totalPop17Color(x) {
	return x > 5000 ? 'green':
		   x > 2500 ? 'yellow':
					  'red';
};		

// 2017 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function totalPop17Style(feature) {
	return {
			fillColor: totalPop17Color(feature.properties.TRACT2017_TotalPop17),
			fillOpacity: 0.50,
			color: 'black',
			weight: 0.6, 
			opacity: 0.75
	};
};
















