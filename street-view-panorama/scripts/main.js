const position = {
  lat: 40.732896,
  lng: -74.000064
};

// 設置中心點
const center = new google.maps.LatLng(position.lat, position.lng);

const controlDiv = document.getElementById('widget-minimap');

// 街景路線
const streetViewLayer = new google.maps.StreetViewCoverageLayer();

// 鷹眼圖
const mapControl = new google.maps.Map(controlDiv, {
  zoom: 15,
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  draggable: true,
  zoomControl: true,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: true,
  fullscreenControl: false
});

// 街景 options
const panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), {
  pov: {
    heading: 30,
    pitch: 0
  },
  motionTracking: false,
  motionTrackingControl: false,
  panControl: false,
  enableCloseButton: false,
  addressControl: false,
  fullscreenControl: false,
  zoomControl: false
});

panorama.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(controlDiv);

const sv = new google.maps.StreetViewService();
sv.getPanorama({
  location: center,
  radius: 80,
  preference: google.maps.StreetViewPreference.NEAREST,
  source: google.maps.StreetViewSource.OUTDOOR
}, function (result, status) {

  if (status === google.maps.StreetViewStatus.OK) {
    // panorama.setPosition(center);
    panorama.setPano(result.location.pano);
    panorama.setVisible(true);
  }
});

const pegman = new RichMarker({
  map: mapControl,
  draggable: true,
  flat: true,
  anchor: RichMarkerPosition.MIDDLE,
  animation: google.maps.Animation.DROP,
  content: '<div id="pegman"><img src="data:image/png;base64,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"></div>'
});


// 監聽事件

google.maps.event.addListener(pegman, 'dragend', function () {
  console.log('dragend')
  panorama.setPosition(pegman.getPosition());
  streetViewLayer.setMap(null);
});

google.maps.event.addListener(pegman, 'dragstart', function () {
  console.log('dragstart')
  streetViewLayer.setMap(mapControl);
});

google.maps.event.addListener(panorama, 'visible_changed', function () {
  google.maps.event.trigger(mapControl, 'resize');
  pegman.setPosition(panorama.getPosition());
});

google.maps.event.addListener(panorama, 'position_changed', function () {
  mapControl.setCenter(panorama.getPosition());
  pegman.setPosition(panorama.getPosition());
});

google.maps.event.addListener(panorama, 'pov_changed', function () {
  document.getElementById('pegman').style.transform = `rotate(${panorama.getPov().heading}deg)`
});
