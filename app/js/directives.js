var viewerDirectives = angular.module('viewerDirectives', []);

viewerDirectives.directive('stlViewer', [function() {
  return {
    restrict: "E",
    scope: {
      modelUrl: "=modelUrl"
    },
    link: function(scope, elem, attr) {
      var camera;
      var scene;
      var renderer;
      var previous;

      init();
      animate();

      function init() {
        camera = new THREE.PerspectiveCamera( 50, window.innerWidth / winder.innerHeight, 1, 15);
        camera.position.set( 2, 4, 5 );

        scene = new THREE.Scene();
        scene.fog = new THREE.Fog( 0x72645b, 2, 15 );

        // Lights
        scene.add(new THREE.AmbientLight(0xcccccc));
        var directionalLight = new THREE.DirectionalLight(0xeeeeee);
        directionalLight.position.x = Math.random() - 0.5;
        directionalLight.position.y = Math.random() - 0.5;
        directionalLight.position.z = Math.random() - 0.5;
        directionalLight.position.normalize();
        scene.add(directionalLight);

        // Renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        elem[0].appendChild(renderer.domElement);

        // Events
        window.addEventListener('resize', onWindowResize, false);

        var loader = new THREE.STLLoader();
        var material = new THREE.MeshPhongMaterial( { color: 0xAAAAAA, specullar: 0x111111, shininess: 200 } );

        loader.load(scope.modelUrl, function( geometry ) {

          var meshMaterial = material;

          if (geometry.hasColors) {
            meshMaterial = new THREE.MeshPhongMaterial({ opacity: geometry.alpha, vertexColors: THREE.VertexColors });
          }

          var mesh = new THREE.Mesh( geometry, meshMaterial );

          mesh.position.set( 0, -0.37, -0.6 );
          mesh.rotation.set( -Math.PI / 2, 0, 0 );
          mesh.scale.set( 2, 2, 2 );

          mesh.castShadow = true;
          mesh.receiveShadow = true;

          scene.add( mesh );
        });
      }

      function onWindowResize(event) {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectMatrix();
      }

      function animate() {
        requestAnimationFrame(animate);
        render();
      }

      function render() {
        var timer = Date.now() * 0.0005;
        camera.position.x = Math.cos(timer) * 10;
        camera.position.y = 4;
        camera.position.z = Math.sin(timer) * 10;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
      }
    }
  }
}]);
