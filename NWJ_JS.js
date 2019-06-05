////////////////////////////////
//      GLOBAL VARIABLES      //
////////////////////////////////

var ugb2018;
var king2017, pierce2017, spokane2017, benton2017, franklin2017, wallawalla2017;
var king1990, pierce1990, spokane1990, benton1990, franklin1990, wallawalla1990;

var king2017max, pierce2017max, spokane2017max, benton2017max, franklin2017max, wallawalla2017max;
var king1990max, pierce1990max, spokane1990max, benton1990max, franklin1990max, wallawalla1990max;

var king2017arr, pierce2017arr, spokane2017arr, benton2017arr, franklin2017arr, wallawalla2017arr;
var king1990arr, pierce1990arr, spokane1990arr, benton1990arr, franklin1990arr, wallawalla1990arr;

var king2017acc, pierce2017acc, spokane2017acc, benton2017acc, franklin2017acc, wallawalla2017acc;
var king1990acc, pierce1990acc, spokane1990acc, benton1990acc, franklin1990acc, wallawalla1990acc;

var styleSubject2017 = 'TRACT2017_TotalPop17';
var styleSubject1990 = 'TotalPop90';

var currentSubject2017 = 'Total Population';
document.getElementById("currentSelect2017").innerHTML = "SELECTED: " + currentSubject2017;

var currentSubject1990 = 'Total Population';
document.getElementById("currentSelect1990").innerHTML = "SELECTED: " + currentSubject1990;

// #D3BCC0 #F2D7EE #A5668B #69306D #0E103D [Purple Color Scheme]
choro5Color = ['#D3BCC0', '#F2D7EE', '#A5668B', '#69306D', '#0E103D'];

////////////////////////////////
//      INITIALIZING MAP      //
////////////////////////////////

// SEATTLE/KING COUNTY VIEW: (47.604673, -122.330884), 10 <- Zoom Level
// CENTER OF WASHINGTON VIEW: (47.4235, -120.3103), 8
// CENTER OF COUNTIES VIEW: (46.789512, -119.969831), 8

// Initializes and modifies map.
var mymap = L.map('mapid').setView([46.789512, -119.969831], 8);

// OpenStreetMap.Mapnik
/**L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);**/

// CartoDB.Positron Basemap
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 18
}).addTo(mymap);

// Default Basemap
/**L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
		'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
		'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	id: 'mapbox.streets'
}).addTo(mymap);**/

/////////////////////////////////
//      IMPORTING GEOJSON      //
/////////////////////////////////

function setUGB2018() {
	ugb2018 = L.geoJSON(ugb2018json, {
		style: {fillColor: 'red', color: 'red', weight: 0.6, opacity: 1, fillOpacity: 1}
	});
};

function add(arr) {
	var sum = 0;
	for(var i = 0; i < arr.length; i++) {
		if(arr[i]) {
			sum = sum + parseInt(arr[i]);
		}
	}
	return sum;
}

// FUNCTION: onEachFeature2017
// Enables popups when clicking on a shape in the map for 2017 layers.
function onEachFeature2017(feature, layer) {
	var popupContent = "";
	var line = 'feature.properties.' + styleSubject2017;
	if (feature.properties && feature.properties.NAMELSAD) {
		popupContent += "2017, Name: " + feature.properties.NAMELSAD + ", ";
	}

	if (feature.properties && eval(line)) {
		popupContent += currentSubject2017 + ": " + eval(line) + ", ";
	}
	
	if(feature.properties && feature.properties.COUNTYFP && eval(line)) {
		if(feature.properties.COUNTYFP == "033") {
			popupContent += "Total in County: " + king2017acc + ", Percentage of County: " + Math.round(100*(eval(line))/king2017acc*100)/100 + "%";
		}
		else if(feature.properties.COUNTYFP == "053") {
			popupContent += "Total in County: " + pierce2017acc + ", Percentage of County: " + Math.round(100*(eval(line))/pierce2017acc*100)/100 + "%";
		}
		else if(feature.properties.COUNTYFP == "063") {
			popupContent += "Total in County: " + spokane2017acc + ", Percentage of County: " + Math.round(100*(eval(line))/spokane2017acc*100)/100 + "%";
		}
		else if(feature.properties.COUNTYFP == "005") {
			popupContent += "Total in County: " + benton2017acc + ", Percentage of County: " + Math.round(100*(eval(line))/benton2017acc*100)/100 + "%";
		}
		else if(feature.properties.COUNTYFP == "021") {
			popupContent += "Total in County: " + franklin2017acc + ", Percentage of County: " + Math.round(100*(eval(line))/franklin2017acc*100)/100 + "%";
		}
		else if(feature.properties.COUNTYFP == "071") {
			popupContent += "Total in County: " + wallawalla2017acc + ", Percentage of County: " + Math.round(100*(eval(line))/wallawalla2017acc*100)/100 + "%";
		}
	}
	layer.bindPopup(popupContent);
};

// FUNCTION: onEachFeature1990
// Enables popups when clicking on a shape in the map for 1990 layers.
function onEachFeature1990(feature, layer) {
	var popupContent = "";
	var line = 'feature.properties.' + styleSubject1990;
	if (feature.properties && feature.properties.NAMELSAD10) {
		popupContent += "1990, Name: " + feature.properties.NAMELSAD10 + ", ";
	}

	if (feature.properties && eval(line)) {
		popupContent += currentSubject1990 + ": " + eval(line) + ", ";
	}
	
	if(feature.properties && feature.properties.COUNTYFP10 && eval(line)) {
		if(feature.properties.COUNTYFP10 == "033") {
			popupContent += "Total in County: " + king1990acc + ", Percentage of County: " + Math.round(100*(eval(line))/king1990acc*100)/100 + "%";
		}
		else if(feature.properties.COUNTYFP10 == "053") {
			popupContent += "Total in County: " + pierce1990acc + ", Percentage of County: " + Math.round(100*(eval(line))/pierce1990acc*100)/100 + "%";
		}
		else if(feature.properties.COUNTYFP10 == "063") {
			popupContent += "Total in County: " + spokane1990acc + ", Percentage of County: " + Math.round(100*(eval(line))/spokane1990acc*100)/100 + "%";
		}
		else if(feature.properties.COUNTYFP10 == "005") {
			popupContent += "Total in County: " + benton1990acc + ", Percentage of County: " + Math.round(100*(eval(line))/benton1990acc*100)/100 + "%";
		}
		else if(feature.properties.COUNTYFP10 == "021") {
			popupContent += "Total in County: " + franklin1990acc + ", Percentage of County: " + Math.round(100*(eval(line))/franklin1990acc*100)/100 + "%";
		}
		else if(feature.properties.COUNTYFP10 == "071") {
			popupContent += "Total in County: " + wallawalla1990acc + ", Percentage of County: " + Math.round(100*(eval(line))/wallawalla1990acc*100)/100 + "%";
		}
	}
	layer.bindPopup(popupContent);
};

// 2017 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Adds 2017 King county census tract polygon.
function setKing2017() {
	king2017 = L.geoJSON(king2017json, {
		style: layerKing2017Style,
		onEachFeature: onEachFeature2017
	});
};

// Adds 2017 Pierce county census tract polygon.
function setPierce2017() {
	pierce2017 = L.geoJSON(pierce2017json, {
		style: layerPierce2017Style,
		onEachFeature: onEachFeature2017
	});
};

// Adds 2017 Spokane county census tract polygon.
function setSpokane2017() {
	spokane2017 = L.geoJSON(spokane2017json, {
		style: layerSpokane2017Style,
		onEachFeature: onEachFeature2017
	});
};

// Adds 2017 Benton county census tract polygons.
function setBenton2017() {
	benton2017 = L.geoJSON(benton2017json, {
		style: layerBenton2017Style,
		onEachFeature: onEachFeature2017
	});
};

// Adds 2017 Franklin county census tract polygons.
function setFranklin2017() {
	franklin2017 = L.geoJSON(franklin2017json, {
		style: layerFranklin2017Style,
		onEachFeature: onEachFeature2017
	});
};

// Adds 2017 Walla Walla county census tract polygons.
function setWallaWalla2017() {
	wallawalla2017 = L.geoJSON(wallawalla2017json, {
		style: layerWallaWalla2017Style,
		onEachFeature: onEachFeature2017
	});
};

// 1990 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Adds 1990 King county census tract polygon.
function setKing1990() {
	king1990 = L.geoJSON(king1990json, {
		style: layerKing1990Style,
		onEachFeature: onEachFeature1990
	});
};

// Adds 1990 Pierce county census tract polygon.
function setPierce1990() {
	pierce1990 = L.geoJSON(pierce1990json, {
		style: layerPierce1990Style,
		onEachFeature: onEachFeature1990
	});
};

// Adds 1990 Spokane county census tract polygon.
function setSpokane1990() {
	spokane1990 = L.geoJSON(spokane1990json, {
		style: layerSpokane1990Style,
		onEachFeature: onEachFeature1990
	});
};

// Adds 1990 Benton county census tract polygons.
function setBenton1990() {
	benton1990 = L.geoJSON(benton1990json, {
		style: layerBenton1990Style,
		onEachFeature: onEachFeature1990
	});
};

// Adds 1990 Franklin county census tract polygons.
function setFranklin1990() {
	franklin1990 = L.geoJSON(franklin1990json, {
		style: layerFranklin1990Style,
		onEachFeature: onEachFeature1990
	});
};

// Adds 1990 Walla Walla county census tract polygons.
function setWallaWalla1990() {
	wallawalla1990 = L.geoJSON(wallawalla1990json, {
		style: layerWallaWalla1990Style,
		onEachFeature: onEachFeature1990
	});
};

//////////////////////
//      TOGGLES     //
//////////////////////

function changeValue2017() {
	var e = document.getElementById("selectSubject2017");
	styleSubject2017 = e.options[e.selectedIndex].id;
	currentSubject2017 = e.options[e.selectedIndex].value;
	document.getElementById("currentSelect2017").innerHTML = "SELECTED: " + currentSubject2017;
	king2017.remove(mymap);pierce2017.remove(mymap);spokane2017.remove(mymap);benton2017.remove(mymap);franklin2017.remove(mymap);wallawalla2017.remove(mymap);

	king2017arr = getSubjectArray('king2017json', styleSubject2017);
	pierce2017arr = getSubjectArray('pierce2017json', styleSubject2017);
	spokane2017arr = getSubjectArray('spokane2017json', styleSubject2017); 
	benton2017arr = getSubjectArray('benton2017json', styleSubject2017);
	franklin2017arr = getSubjectArray('franklin2017json', styleSubject2017);
	wallawalla2017arr = getSubjectArray('wallawalla2017json', styleSubject2017);

	king2017acc = add(king2017arr);
	pierce2017acc = add(pierce2017arr);
	spokane2017acc = add(spokane2017arr);
	benton2017acc = add(benton2017arr);
	franklin2017acc = add(franklin2017arr);
	wallawalla2017acc = add(wallawalla2017arr);

	king2017max = getMax(king2017arr);
	pierce2017max = getMax(pierce2017arr);
	spokane2017max = getMax(spokane2017arr);
	benton2017max = getMax(benton2017arr);
	franklin2017max = getMax(franklin2017arr);
	wallawalla2017max = getMax(wallawalla2017arr);

	setKing2017();setPierce2017();setSpokane2017();setBenton2017();setFranklin2017();setWallaWalla2017();
	var checkboxes = document.getElementsByTagName('input');
	for(var i=0; i<checkboxes.length; i++){
		if(checkboxes[i].getAttribute('type')=='checkbox'){
			if(checkboxes[i].checked){
				eval(checkboxes[i].id).addTo(mymap);
			};
		}
	};
	ugb2018.bringToBack();
};

function changeValue1990() {
	var e = document.getElementById("selectSubject1990");
	styleSubject1990 = e.options[e.selectedIndex].id;
	currentSubject1990 = e.options[e.selectedIndex].value;
	document.getElementById("currentSelect1990").innerHTML = "SELECTED: " + currentSubject1990;
	king1990.remove(mymap);pierce1990.remove(mymap);spokane1990.remove(mymap);benton1990.remove(mymap);franklin1990.remove(mymap);wallawalla1990.remove(mymap);

	king1990arr = getSubjectArray('king1990json', styleSubject1990);
	pierce1990arr = getSubjectArray('pierce1990json', styleSubject1990);
	spokane1990arr = getSubjectArray('spokane1990json', styleSubject1990); 
	benton1990arr = getSubjectArray('benton1990json', styleSubject1990);
	franklin1990arr = getSubjectArray('franklin1990json', styleSubject1990);
	wallawalla1990arr = getSubjectArray('wallawalla1990json', styleSubject1990);

	king1990acc = add(king1990arr);
	pierce1990acc = add(pierce1990arr);
	spokane1990acc = add(spokane1990arr);
	benton1990acc = add(benton1990arr);
	franklin1990acc = add(franklin1990arr);
	wallawalla1990acc = add(wallawalla1990arr);

	king1990max = getMax(king1990arr);
	pierce1990max = getMax(pierce1990arr);
	spokane1990max = getMax(spokane1990arr);
	benton1990max = getMax(benton1990arr);
	franklin1990max = getMax(franklin1990arr);
	wallawalla1990max = getMax(wallawalla1990arr);

	setKing1990();setPierce1990();setSpokane1990();setBenton1990();setFranklin1990();setWallaWalla1990();
	var checkboxes = document.getElementsByTagName('input');
	for(var i=0; i<checkboxes.length; i++){
		if(checkboxes[i].getAttribute('type')=='checkbox'){
			if(checkboxes[i].checked){
				eval(checkboxes[i].id).addTo(mymap);
			};
		}
	};
	ugb2018.bringToBack();
};

// FUNCTION: toggleLayer
// Enables the county layer to show up on the map.
// Used in the HTML file.
// getElement: Checkbox ID (ex. toggleLayerKing2017, toggleLayerPierce2017, etc.).
// countyLayer: County polygon variable name (ex. king2017, pierce2017, etc.).
function toggleLayer(getLayer) {
	var checkBox = document.getElementById(getLayer);
	if(checkBox.checked) {
		eval(getLayer).addTo(mymap);
	} else {
		eval(getLayer).remove(mymap);
	}
	ugb2018.bringToBack();
};

//////////////////////
//    CHOROPLETH    //
//////////////////////

// FUNCTION: getSubjectArray
// Returns an array of a given county json file and its subject.
// county: Variable name of the county json file (ex. seattle2017json, pierce2017json, etc.).
// subject: Subject name from the county json file (ex. GEOID, TRACT2017_TotalPop17, etc.)
function getSubjectArray (county, subject) {
	var rows = [];
	var i, count = 0;
	for (i in eval(county)[0].features) {
		if(eval(county)[0].features.hasOwnProperty(i)) {
			rows.push(eval(county)[0]['features'][count]['properties'][subject])
			count += 1;
		};
	};
	return rows;
};

// FUNCTION: getMax
// Returns the max value in an array (numbers only).
// arr: Array.
function getMax(arr) {
	return Math.max.apply(Math, arr);
}

king2017arr = getSubjectArray('king2017json', styleSubject2017);
pierce2017arr = getSubjectArray('pierce2017json', styleSubject2017);
spokane2017arr = getSubjectArray('spokane2017json', styleSubject2017); 
benton2017arr = getSubjectArray('benton2017json', styleSubject2017);
franklin2017arr = getSubjectArray('franklin2017json', styleSubject2017);
wallawalla2017arr = getSubjectArray('wallawalla2017json', styleSubject2017);

king2017acc = add(king2017arr);
pierce2017acc = add(pierce2017arr);
spokane2017acc = add(spokane2017arr);
benton2017acc = add(benton2017arr);
franklin2017acc = add(franklin2017arr);
wallawalla2017acc = add(wallawalla2017arr);

king2017max = getMax(king2017arr);
pierce2017max = getMax(pierce2017arr);
spokane2017max = getMax(spokane2017arr);
benton2017max = getMax(benton2017arr);
franklin2017max = getMax(franklin2017arr);
wallawalla2017max = getMax(wallawalla2017arr);

king1990arr = getSubjectArray('king1990json', styleSubject1990);
pierce1990arr = getSubjectArray('pierce1990json', styleSubject1990);
spokane1990arr = getSubjectArray('spokane1990json', styleSubject1990); 
benton1990arr = getSubjectArray('benton1990json', styleSubject1990);
franklin1990arr = getSubjectArray('franklin1990json', styleSubject1990);
wallawalla1990arr = getSubjectArray('wallawalla1990json', styleSubject1990);

king1990acc = add(king1990arr);
pierce1990acc = add(pierce1990arr);
spokane1990acc = add(spokane1990arr);
benton1990acc = add(benton1990arr);
franklin1990acc = add(franklin1990arr);
wallawalla1990acc = add(wallawalla1990arr);

king1990max = getMax(king1990arr);
pierce1990max = getMax(pierce1990arr);
spokane1990max = getMax(spokane1990arr);
benton1990max = getMax(benton1990arr);
franklin1990max = getMax(franklin1990arr);
wallawalla1990max = getMax(wallawalla1990arr);

// FUNCTION: choropleth5
// Returns a choropleth color scheme in a break of 5.
// Takes in the max value of a given subject, and divides it evenly.
function choropleth5(feature, max) {
	if(!feature) {
		return 'white';
	}
	return feature > max / 5 * 4 ? choro5Color[4]:
		   feature > max / 5 * 3 ? choro5Color[3]:
		   feature > max / 5 * 2 ? choro5Color[2]:
		   feature > max / 5 ? choro5Color[1]:
		   feature == 0 ? 'white': choro5Color[0];
}

// 2017 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function layerKing2017Style(feature) {
	var line = 'feature.properties.' + styleSubject2017;
	return {
			fillColor: choropleth5(eval(line), king2017max),
			fillOpacity: 0.75,
			color: 'black',
			weight: 0.6,
			opacity: 0.75
	};
};

function layerPierce2017Style(feature) {
	var line = 'feature.properties.' + styleSubject2017;
	return {
			fillColor: choropleth5(eval(line), pierce2017max),
			fillOpacity: 0.75,
			color: 'black',
			weight: 0.6,
			opacity: 0.75
	};
};

function layerSpokane2017Style(feature) {
	var line = 'feature.properties.' + styleSubject2017;
	return {
			fillColor: choropleth5(eval(line), spokane2017max),
			fillOpacity: 0.75,
			color: 'black',
			weight: 0.6,
			opacity: 0.75
	};
};

function layerBenton2017Style(feature) {
	var line = 'feature.properties.' + styleSubject2017;
	return {
			fillColor: choropleth5(eval(line), benton2017max),
			fillOpacity: 0.75,
			color: 'black',
			weight: 0.6,
			opacity: 0.75
	};
};

function layerFranklin2017Style(feature) {
	var line = 'feature.properties.' + styleSubject2017;
	return {
			fillColor: choropleth5(eval(line), franklin2017max),
			fillOpacity: 0.75,
			color: 'black',
			weight: 0.6,
			opacity: 0.75
	};
};

function layerWallaWalla2017Style(feature) {
	var line = 'feature.properties.' + styleSubject2017;
	return {
			fillColor: choropleth5(eval(line), wallawalla2017max),
			fillOpacity: 0.75,
			color: 'black',
			weight: 0.6,
			opacity: 0.75
	};
};

// 1990 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function layerKing1990Style(feature) {
	var line = 'feature.properties.' + styleSubject1990;
	return {
			fillColor: choropleth5(eval(line), king1990max),
			fillOpacity: 0.75,
			color: 'black',
			weight: 0.6,
			opacity: 0.75
	};
};

function layerPierce1990Style(feature) {
	var line = 'feature.properties.' + styleSubject1990;
	return {
			fillColor: choropleth5(eval(line), pierce1990max),
			fillOpacity: 0.75,
			color: 'black',
			weight: 0.6,
			opacity: 0.75
	};
};

function layerSpokane1990Style(feature) {
	var line = 'feature.properties.' + styleSubject1990;
	return {
			fillColor: choropleth5(eval(line), spokane1990max),
			fillOpacity: 0.75,
			color: 'black',
			weight: 0.6,
			opacity: 0.75
	};
};

function layerBenton1990Style(feature) {
	var line = 'feature.properties.' + styleSubject1990;
	return {
			fillColor: choropleth5(eval(line), benton1990max),
			fillOpacity: 0.75,
			color: 'black',
			weight: 0.6,
			opacity: 0.75
	};
};

function layerFranklin1990Style(feature) {
	var line = 'feature.properties.' + styleSubject1990;
	return {
			fillColor: choropleth5(eval(line), franklin1990max),
			fillOpacity: 0.75,
			color: 'black',
			weight: 0.6,
			opacity: 0.75
	};
};

function layerWallaWalla1990Style(feature) {
	var line = 'feature.properties.' + styleSubject1990;
	return {
			fillColor: choropleth5(eval(line), wallawalla1990max),
			fillOpacity: 0.75,
			color: 'black',
			weight: 0.6,
			opacity: 0.75
	};
};

///////////////////////////////
//    INITIALIZING LAYERS    //
///////////////////////////////

setKing2017();
king2017.addTo(mymap);

setPierce2017();
pierce2017.addTo(mymap);

setSpokane2017();
spokane2017.addTo(mymap);

setBenton2017();
benton2017.addTo(mymap);

setFranklin2017();
franklin2017.addTo(mymap);

setWallaWalla2017();
wallawalla2017.addTo(mymap);

setKing1990();
setPierce1990();
setSpokane1990();
setBenton1990();
setFranklin1990();
setWallaWalla1990();

setUGB2018();

/////////////////////////
//    WEBPAGE / CSS    //
/////////////////////////

var status = 0;
var status2 = 0;

document.getElementById('button').addEventListener('click', sidebarResize);
document.getElementById('ABOUT').addEventListener('click', aboutResize);

function sidebarResize() {
	if (status == 0) {
		document.getElementById('SIDEBAR').className = 'grow';
		status = 1;
	} else {
		document.getElementById('SIDEBAR').className = 'normal';
		status = 0;
	}
}

function aboutResize() {
	if (status2 == 0) {
		document.getElementById('ABOUT2').className = 'grow2';
		document.getElementById('ABOUT').style.color = 'grey';
		status2 = 1;
	} else {
		document.getElementById('ABOUT2').className = 'normal2';
		document.getElementById('ABOUT').style.color = 'black';
		status2 = 0;
	}
}

!function(r,n){"function"==typeof define&&define.amd?define(n):"object"==typeof exports?module.exports=n():r.transformicons=n()}(this||window,function(){"use strict";var r={},n={transform:["click"],revert:["click"]},t=function(r){return"string"==typeof r?Array.prototype.slice.call(document.querySelectorAll(r)):void 0===r||r instanceof Array?r:[r]},o=function(r){return"string"==typeof r?r.toLowerCase().split(" "):r},e=function(r,e,f){var i=(f?"remove":"add")+"EventListener",s=t(r),a=s.length,u={};for(var l in n)u[l]=e&&e[l]?o(e[l]):n[l];for(;a--;)for(var d in u)for(var m=u[d].length;m--;)s[a][i](u[d][m],c)},c=function(n){r.toggle(n.currentTarget)};return r.add=function(n,t){return e(n,t),r},r.remove=function(n,t){return e(n,t,!0),r},r.transform=function(n){return t(n).forEach(function(r){r.classList.add("tcon-transform")}),r},r.revert=function(n){return t(n).forEach(function(r){r.classList.remove("tcon-transform")}),r},r.toggle=function(n){return t(n).forEach(function(n){r[n.classList.contains("tcon-transform")?"revert":"transform"](n)}),r},r});

transformicons.add('.tcon') // add default behavior for all elements with the class .tcon
.remove('.tcon-menu--xbutterfly') // remove default behavior for the first icon
.add('.tcon-menu--xbutterfly', {
	transform: "mouseclick"
});









































