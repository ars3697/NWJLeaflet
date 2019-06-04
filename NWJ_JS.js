////////////////////////////////
//      GLOBAL VARIABLES      //  		
////////////////////////////////

var ugb2018, king2017, pierce2017, spokane2017, benton2017, franklin2017, wallawalla2017;
var king2017max, pierce2017max, spokane2017max, benton2017max, franklin2017max, wallawalla2017max;
var styleSubject = 'TRACT2017_TotalPop17';
var currentSubject = 'Total Population';
document.getElementById("currentSelect").innerHTML = "SELECTED: " + currentSubject;

////////////////////////////////
//      INITIALIZING MAP      //  		
////////////////////////////////

// SEATTLE/KING COUNTY VIEW: (47.604673, -122.330884), 10 <- Zoom Level
// CENTER OF WASHINGTON VIEW: (47.4235, -120.3103), 8 	
// CENTER OF COUNTIES VIEW: (46.789512, -119.969831), 8		

// Initializes and modifies map.
var mymap = L.map('mapid').setView([46.789512, -119.969831], 8);

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
}

// FUNCTION: onEachFeature
// Enables popups when clicking on a shape in the map.
function onEachFeature(feature, layer) {
	var popupContent = "";
	var line = 'feature.properties.' + styleSubject;
	if (feature.properties && feature.properties.NAMELSAD) {
		popupContent += "Name: " + feature.properties.NAMELSAD + ", ";
	}
	
	if (feature.properties && eval(line)) {
		popupContent += currentSubject + ": " + eval(line) + " ";
	}
	layer.bindPopup(popupContent);
}

// 2017 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Adds 2017 King county census tract polygon.
function setKing2017() {
	king2017 = L.geoJSON(king2017json, {
		style: layerKingStyle,
		onEachFeature: onEachFeature
	});	
}

// Adds 2017 Pierce county census tract polygon.
function setPierce2017() {
	pierce2017 = L.geoJSON(pierce2017json, {
		style: layerPierceStyle,
		onEachFeature: onEachFeature
	});
}

// Adds 2017 Spokane county census tract polygon.
function setSpokane2017() {
	spokane2017 = L.geoJSON(spokane2017json, {
		style: layerSpokaneStyle,
		onEachFeature: onEachFeature
	});
}

// Adds 2017 Benton county census tract polygons.
function setBenton2017() {
	benton2017 = L.geoJSON(benton2017json, {
		style: layerBentonStyle,
		onEachFeature: onEachFeature
	});
}

// Adds 2017 Franklin county census tract polygons.
function setFranklin2017() {
	franklin2017 = L.geoJSON(franklin2017json, {
		style: layerFranklinStyle,
		onEachFeature: onEachFeature
	});
}

// Adds 2017 Walla Walla county census tract polygons.
function setWallaWalla2017() {
	wallawalla2017 = L.geoJSON(wallawalla2017json, {
		style: layerWallaWallaStyle,
		onEachFeature: onEachFeature
	});
}

//////////////////////
//      TOGGLES     //  		
//////////////////////

function changeValue() {
	var e = document.getElementById("selectSubject");
	styleSubject = e.options[e.selectedIndex].id;
	currentSubject = e.options[e.selectedIndex].value;
	document.getElementById("currentSelect").innerHTML = "SELECTED: " + currentSubject;
	king2017.remove(mymap);pierce2017.remove(mymap);spokane2017.remove(mymap);benton2017.remove(mymap);franklin2017.remove(mymap);wallawalla2017.remove(mymap);
	
	king2017max = getMax(getSubjectArray('king2017json', styleSubject));
	pierce2017max = getMax(getSubjectArray('pierce2017json', styleSubject));
	spokane2017max = getMax(getSubjectArray('spokane2017json', styleSubject));
	benton2017max = getMax(getSubjectArray('benton2017json', styleSubject));
	franklin2017max = getMax(getSubjectArray('franklin2017json', styleSubject));
	wallawalla2017max = getMax(getSubjectArray('wallawalla2017json', styleSubject));
	
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
}

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
king2017max = getMax(getSubjectArray('king2017json', styleSubject));
pierce2017max = getMax(getSubjectArray('pierce2017json', styleSubject));
spokane2017max = getMax(getSubjectArray('spokane2017json', styleSubject));
benton2017max = getMax(getSubjectArray('benton2017json', styleSubject));
franklin2017max = getMax(getSubjectArray('franklin2017json', styleSubject));
wallawalla2017max = getMax(getSubjectArray('wallawalla2017json', styleSubject));

// FUNCTION: choropleth5
// Returns a choropleth color scheme in a break of 5.
// Takes in the max value of a given subject, and divides it evenly.
function choropleth5(feature, max) {
	return feature > max / 5 * 4 ? '#0E103D':
		   feature > max / 5 * 3 ? '#69306D':
		   feature > max / 5 * 2 ? '#A5668B':
		   feature > max / 5 ? '#F2D7EE':'#D3BCC0';
}

function layerKingStyle(feature) {
	var line = 'feature.properties.' + styleSubject;
	return {
			fillColor: choropleth5(eval(line), king2017max),
			fillOpacity: 0.75,
			color: 'black',
			weight: 0.6, 
			opacity: 0.75
	};
};

function layerPierceStyle(feature) {
	var line = 'feature.properties.' + styleSubject;
	return {
			fillColor: choropleth5(eval(line), pierce2017max),
			fillOpacity: 0.75,
			color: 'black',
			weight: 0.6, 
			opacity: 0.75
	};
};

function layerSpokaneStyle(feature) {
	var line = 'feature.properties.' + styleSubject;
	return {
			fillColor: choropleth5(eval(line), spokane2017max),
			fillOpacity: 0.75,
			color: 'black',
			weight: 0.6, 
			opacity: 0.75
	};
};

function layerBentonStyle(feature) {
	var line = 'feature.properties.' + styleSubject;
	return {
			fillColor: choropleth5(eval(line), benton2017max),
			fillOpacity: 0.75,
			color: 'black',
			weight: 0.6, 
			opacity: 0.75
	};
};

function layerFranklinStyle(feature) {
	var line = 'feature.properties.' + styleSubject;
	return {
			fillColor: choropleth5(eval(line), franklin2017max),
			fillOpacity: 0.75,
			color: 'black',
			weight: 0.6, 
			opacity: 0.75
	};
};

function layerWallaWallaStyle(feature) {
	var line = 'feature.properties.' + styleSubject;
	return {
			fillColor: choropleth5(eval(line), wallawalla2017max),
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

var king1990;

function setKing1990() {
	king1990 = L.geoJSON(king1990json, {
		style: {fillColor: 'red', color: 'red', weight: 0.6, opacity: 1, fillOpacity: 1}
	});	
}

setKing1990();
king1990.addTo(mymap);





