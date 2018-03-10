console.log("hello there")


$.getJSON("data/airport.json",function(data){

	window.airport = data

});

$.getJSON("data/navaid.json",function(data){

	window.navaid = data

});

var depart_geojson = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [
                [0, 0]
            ]
        }
    }]
};

var arrivee_geojson = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [
                [0, 0]
            ]
        }
    }]
};

var ligne_geojson = {
    "type": "FeatureCollection",
    "features": [{
        "type": "Feature",
        "geometry": {
            "type": "LineString",
            "coordinates": [
                [0, 0],[1,1]
            ]
        }
    }]
};


console.log("general kenobi")

$("#id").change(function()
{
	var val = $("#id").val();
	val = val.toUpperCase();
	$("#id").val(val);
	if(val.length==4)
	{
		if(window.airport[val])	
		{
			$("#id_info").html(window.airport[val].name)
			window.lat = window.airport[val].lat
			window.lon = window.airport[val].lon

			map.flyTo({
				center : [window.lon,window.lat],
				zoom : 10,
			});

			depart_geojson.features[0].geometry.coordinates = [window.lon,window.lat];

			map.getSource('depart').setData(depart_geojson);

			$("#distance").val("");
			$("#qdr").val("");

			 
		}
	}
	else if(val.length < 4 && val.length > 1)
	{
		if(window.navaid[val])	
		{
			$("#id_info").html(window.navaid[val].name)
			window.lat = window.navaid[val].lat
			window.lon = window.navaid[val].lon


			map.flyTo({
				center : [window.lon,window.lat],
				zoom : 10,
			});

			depart_geojson.features[0].geometry.coordinates = [window.lon,window.lat];

			map.getSource('depart').setData(depart_geojson);
	
			$("#distance").val("");
			$("#qdr").val("");
			
		}
	}

});


mapboxgl.accessToken = 'pk.eyJ1IjoibW9ucXVhcnRpZXIiLCJhIjoieS0wMHVTbyJ9.8Ws7HNZHIiqwSCE327j9Bg';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
    center: [ 2.8,46.5], // starting position [lng, lat]
    zoom: 5 // starting zoom
});


map.addControl(new mapboxgl.FullscreenControl());
map.addControl(new mapboxgl.NavigationControl());


map.on('load', function() {

    map.addLayer({
        'id': 'dfci',
        'type': 'raster',
        'source': {
            'type': 'raster',
            'tiles': [
                'https://wxs.ign.fr/beta/geoportail/wmts?layer=GEOGRAPHICALGRIDSYSTEM.DFCI&style=normal&tilematrixset=PM&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image/png&TileMatrix={z}&TileCol={x}&TileRow={y}'
            ],
	    'tileSize': 256
        }
    });



	
	map.addLayer({
        "id": "ligne",
	"type": "line",
        "source": {
            "type": "geojson",
            "data": ligne_geojson,
        },
	"dashArray": '10,20',
        "layout": {
            "line-join": "round",
            "line-cap": "round"
        },
        "paint": {
            "line-color": "#5b6982",
            "line-width": 3,
        }
    });

	map.addLayer({
        "id": "depart",
        "source": {
            "type": "geojson",
            "data": depart_geojson,
        },
        "type": "circle",
        "paint": {
            "circle-radius": 5,
            "circle-color": "#007cbf"
        }
    });

	map.addLayer({
        "id": "arrivee",
        "source": {
            "type": "geojson",
            "data": arrivee_geojson,
        },
        "type": "circle",
        "paint": {
            "circle-radius": 7,
            "circle-color": "#f4424e"
        }
    });

//forcer le reset des champs
$("#id").val("");
$("#distance").val("");
$("#qdr").val("");


});

//faire le calcul quand la distance est changée en temps réel
$("#distance").change(function()
{


	if( $("#distance").val().length > 0 && $("#qdr").val().length > 0)
	{
		compute();
	}

	//on remplace l'éventuelle virgule par un point
	$("#distance").val($("#distance").val().replace(",","."))

});

//faire le calcul quand le qdr est changé en temps réel
$("#qdr").change(function()
{
	if( $("#distance").val().length > 0 && $("#qdr").val().length > 0)
	{
		compute();
	}
});

function compute()
{	
	var val = $("#id").val();
	val.toUpperCase();
	if(val.length==4)
	{
		if(window.airport[val])	
		{
			$("#id_info").html(window.airport[val].name)
			window.lat = window.airport[val].lat
			window.lon = window.airport[val].lon
			
		}
	}
	else if(val.length < 4 && val.length > 1)
	{
		if(window.navaid[val])	
		{
			$("#id_info").html(window.navaid[val].name)
			window.lat = window.navaid[val].lat
			window.lon = window.navaid[val].lon
		}
	}

	map.flyTo({
				center : [window.lon,window.lat],
				zoom : 10,
			});

			depart_geojson.features[0].geometry.coordinates = [window.lon,window.lat];

			map.getSource('depart').setData(depart_geojson);

	var depart = new LatLon(window.lat,window.lon)
	var cap = $("#qdr").val()
	var distance = parseFloat($("#distance").val());
	distance = distance * 1852 //distance vers mètres
	var arrivee = depart.destinationPoint(distance,cap)
	console.log(arrivee)

	arrivee_geojson.features[0].geometry.coordinates = [arrivee.lon,arrivee.lat];
	map.getSource('arrivee').setData(arrivee_geojson);

	ligne_geojson.features[0].geometry.coordinates = [[arrivee.lon,arrivee.lat],[window.lon,window.lat]];
	map.getSource('ligne').setData(ligne_geojson);

	map.flyTo({
				center : [arrivee.lon,arrivee.lat],
				zoom : 12,
			});
	
	$("#result").html("<h1>"+ Dms.toLat(arrivee.lat)+ " " + Dms.toLon(arrivee.lon)+"</h1>")


}


