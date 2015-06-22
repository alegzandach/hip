'use strict';

var viewerDirectives = angular.module('viewerDirectives', []);

viewerDirectives.directive('stlViewer', function() {
  return {
    restrict: "E",
    scope: false,
    link: function(scope, elem, attr) {
      var camera;
      var scene;
      var renderer;
      var modelUrl;

      init();
      attr.$observe('modelUrl', function(value) {
        loadModel(value);
      });
      animate();

      function init() {
        camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 2000);
        camera.position.set(2, 4, 5);
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.035);

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
      }

      function onWindowResize(event) {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }

      function loadModel(url) {
        var loader = new THREE.STLLoader();
        loader.load(url, function(geometry) {
          var material = new THREE.MeshPhongMaterial({color: 0xAAAAAA, specular: 0x111111, shininess: 200});
          var mesh = new THREE.Mesh(geometry, material);

          mesh.position.set(0, -0.37, -0.6);
          mesh.rotation.set(-Math.PI / 2, 0, 0);
          mesh.scale.set(0.05, 0.05, 0.05);

          mesh.castShadow = true;
          mesh.receiveShadow = true;

          scene.add(mesh);
        });
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
  };
});
