var viewerDirectives = angular.module('viewerDirectives', []);

viewerDirectives.directive('stlViewer', function() {
  return {
    restrict: "E",
    scope: {
      modelUrl: "=modelURL"
    },
    link: function(scope, elem, attr) {
      var camera;
      var scene;
      var renderer;
      var previous;

      init();

      function init() {
        camera = new THREE.PerspectiveCamera( 35, window.innerWidth / winder.innerHeight, 1, 15);
        camera.position.set( 3, 0.15, 3 );

        cameraTarget = new THREE.Vector3( 0, -0.25, 0 );

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog( 0x72645b, 2, 15 );

        var plane = new THREE.Mesh(
          new THREE.PlaneBufferGeometry( 40, 40 ),
          new THREE.MeshPhongMaterial( { color: 0x999999, specular: 0x101010 } )
        );
        plane.rotation.x = -Math.PI/2;
        plane.position.y = -0.5;
        scene.add( plane );

        plane.receiveShadow = true;

        var loader = new THREE.STLLoader();
      }
    }
  }
});
