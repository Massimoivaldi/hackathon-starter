$(document).ready(function() {


/*
var myLatlng = new google.maps.LatLng(41.38,2.18);
var myOptions = { zoom: 13, center: myLatlng}
var map = new google.maps.Map(document.getElementById("map-canvas"), {myOptions});

google.maps.event.addListener(map, 'click', function(event) {
	$('#myModal').modal("show");
	alert(event.latLng);
});
*/

});

function initMap() {
    var myLatLng = {lat: 41.38, lng: 2.18};

    var map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 15,
      center: myLatLng
    });

    var marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
    });

    map.addListener('click', function(e) {
        $('#myModal').modal("show");
		alert(e.latLng);
    });

  }

  function catePush(poppo){
    //alert($cookies.get("XSRF-TOKEN"));
    
    var data = {};
    data.id = poppo[0];
    data.corsoId = poppo[1];
    
    $.ajax('/admin/ajax/add_categoria', {
    type: 'POST',
    headers: {'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')},
    data: JSON.stringify(data),
    contentType: 'application/json',
    success: function(data) { 
      console.log(data);
      if(data!="no"){
      $( "#organizzazioni" ).append( '<div class="row" style="padding-bottom:5px;"><div class="col-md-8">'+data.nome+'<div></div></div><div class="col-md-4"><button class="btn btn-default" type="button">Elimina</button></div></div>');
      }
    },
    error  : function() { console.log('error');}
    });
  }

