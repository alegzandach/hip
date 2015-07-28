'use strict';

var viewerDirectives = angular.module('viewerDirectives', []);

viewerDirectives.directive('stlViewer', function() {
  return {
    restrict: "E",
    scope: {
      control: "="
    },
    link: function(scope, elem, attr) {
      var camera;
      var cameraInitPosition;
      var cameraInitRotation;
      var scene;
      var renderer;
      var modelUrl;
      var controls;
      var slices = 40;
      var canvasWidth = 800;
      var canvasHeight = 600;
      var line;
      var raycaster = new THREE.Raycaster();
      var mouse = new THREE.Vector2();
      var selected;
      var objects = [];
      var topOffset;
      var leftOffset;
      var plane;
      
      init();
      attr.$observe('modelUrl', function(value) {
        loadModel(value);
      });
      animate();

      scope.controls = scope.control || {};

      scope.controls.resetCamera = function() {
        controls.reset();
      }

      scope.controls.toggleCenterline = function() {
        line.visible = !line.visible;
      }

      scope.controls.addSphere = function() {
        objects.push(buildSphere());
      }

      function onDocumentMouseMove(event) {
        event.preventDefault();

        topOffset = elem[0].getBoundingClientRect().top;
        leftOffset = elem[0].getBoundingClientRect().left;

        mouse.set( ((event.clientX - leftOffset) / canvasWidth)*2-1, -((event.clientY - topOffset) / canvasHeight)*2+1);
        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(objects, true);
        if (intersects.length > 0) {
            if (!selected) {
              var intersected = intersects[0];
              var intersects = raycaster.intersectObject(plane);
              plane.lookAt(camera.position);
            }
          elem[0].style.cursor = 'move';
        } else {
          elem[0].style.cursor = 'auto';
        }

        if (selected) {
          var intersects = raycaster.intersectObject(plane);
          selected.object.position.copy(intersects[0].point);
        }
      }

      function onDocumentMouseDown(event) {
        event.preventDefault();

        topOffset = elem[0].getBoundingClientRect().top;
        leftOffset = elem[0].getBoundingClientRect().left;

        mouse.set( ((event.clientX - leftOffset) / canvasWidth)*2-1, -((event.clientY - topOffset) / canvasHeight)*2+1);
        raycaster.setFromCamera(mouse, camera);

        var intersects = raycaster.intersectObjects(objects, true);
        if (intersects.length > 0) {
          controls.enabled = false;
          selected = intersects[0];

          var intersects = raycaster.intersectObject(plane);
          elem[0].style.cursor = 'move';
        }
      }

      function onDocumentMouseUp(event) {
        event.preventDefault();

        if (selected) {
          selected = null;
        }

        controls.enabled = true;
        elem[0].style.cursor = 'auto';
      }


      function onDocumentMouseScroll(event) {
        console.log(event)
      }

      function buildSphere() {
        var sphereGeo = new THREE.SphereGeometry(.75,32,32);
        var sphereMat = new THREE.MeshBasicMaterial({color:0xffff00, wireframe: true});
        var sphere = new THREE.Mesh(sphereGeo, sphereMat);
        scene.add(sphere);
        console.log(sphere);
        console.log(camera);
        return sphere;
      }

      function init() {
        camera = new THREE.PerspectiveCamera(50, canvasWidth / canvasHeight, 1, 2000);
        camera.position.x = 5;
        camera.position.y = 5;
        camera.position.z = 5;

        cameraInitPosition = camera.position;
        cameraInitRotation = camera.rotation;
        console.log(camera);
        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.035);

        // Renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(canvasWidth, canvasHeight);
        elem[0].appendChild(renderer.domElement);

        // Controls
        controls = new THREE.TrackballControls(camera, renderer.domElement);

        controls.rotateSpeed = 2.0;
        controls.zoomSpeed = 2.0;
        controls.panSpeed = 0.8;

        controls.noZoom = false;
        controls.noPan = true;

        controls.staticMoving = true;
        controls.dynamicDampingFactor = 0.3;

        controls.keys = [65,83,68];

        controls.addEventListener('change', render);

        // Intersect Plane
        plane = new THREE.Mesh(
                new THREE.PlaneBufferGeometry(2000,2000, 8, 8),
                new THREE.MeshBasicMaterial({color: 0xffffff, opacity: .25, transparent: true})
        );
        plane.visible = true;
        plane.position.copy(new THREE.Vector3(0,0,0));
        scene.add(plane);

        // Events
        renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
        renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
        renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
        renderer.domElement.addEventListener('scroll', onDocumentMouseScroll, false);

        // Lights
        scene.add(new THREE.AmbientLight(0xcccccc));

        var directionalLight = new THREE.DirectionalLight(0xeeeeee);
        directionalLight.position.x = 0.5;
        directionalLight.position.y = 0.5;
        directionalLight.position.z = 0.5;
        directionalLight.position.normalize();
        scene.add(directionalLight);

        // Sphere
        var sphereGeometry = new THREE.SphereGeometry(.70);
        var sphereMaterial = new THREE.MeshPhongMaterial( {color: 0xffff00} ); 
        var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        // scene.add(sphere);

        // Add axes
        // var axes = buildAxes(1000);
        // scene.add(axes);

        // window.addEventListener('resize', onWindowResize, false);
      }

      function onWindowResize(event) {
        renderer.setSize(canvasWidth, canvasHeight);
        camera.aspect = canvasWidth / canvasHeight;
        camera.updateProjectionMatrix();
        controls.handleResize();
      }

      function buildAxes(length) {
        var axes = new THREE.Object3D();

        axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(length, 0, 0), 0xFF0000, false));
        axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(-length, 0, 0), 0xFF0000, true));
        axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, length, 0), 0x00FF00, false));
        axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, -length, 0), 0x00FF00, true));
        axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, length), 0x0000FF, false));
        axes.add(buildAxis(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, -length), 0x0000FF, true));

        return axes;
      }

      function buildAxis(src, dst, colorHex, dashed) {
        var geom = new THREE.Geometry(), mat;

        if (dashed) {
          mat = new THREE.LineDashedMaterial({linewidth: 3, color: colorHex, dashSize: 1, gapSize: 1});
        } else {
          mat = new THREE.LineBasicMaterial({linewidth: 3, color: colorHex});
        }

        geom.vertices.push(src.clone());
        geom.vertices.push(dst.clone());
        geom.computeLineDistances();

        var axis = new THREE.Line(geom, mat, THREE.LinePieces);

        return axis;
      }

      function loadModel(url) {
        var loader = new THREE.STLLoader();
        loader.load(url, function(geometry) {
          var material = new THREE.MeshPhongMaterial({color: 0xAAAAAA, specular: 0x111111, shininess: 200, wireframe: false});
          material.opacity = 0.2;
          material.transparent = true;
          var mesh = new THREE.Mesh(geometry, material);

          // mesh.position.set(0, -0.37, -0.6);

          mesh.castShadow = true;
          mesh.receiveShadow = true;

          scene.add(mesh);

          var bbox = new THREE.BoundingBoxHelper(mesh, 0xFFFF00);
          bbox.update();
          mesh.add(bbox);
          bbox.visible = false;
          
          line = centerline(geometry, bbox);
          mesh.add(line);
          mesh.rotation.set(-Math.PI / 2, 0, 0);
          mesh.scale.set(0.05, 0.05, 0.05);
        });
      }

      function centerline(geometry, bbox) {
        var max = bbox.box.max;
        var min = bbox.box.min;
        var longest;
        var axislength = [3];

        for (var i=0; i<3; i++) {
          axislength[i] = Math.abs(max.getComponent(i) - min.getComponent(i));
        }
        longest = Math.max.apply(null, axislength);
        var longAxis = axislength.indexOf(longest);

        var material = new THREE.LineBasicMaterial({color: 0x00FFFF});
        var newGeo = reconstruct(geometry);

        var lineGeo = new THREE.Geometry();
        var sum = new THREE.Vector3();

        for (var i = min.getComponent(longAxis); i < max.getComponent(longAxis); i += longest/slices) {
          var pointCount = 0;
          sum.set(0, 0, 0);
          for (var j = 0; j < newGeo.vertices.length; j++) {
            if ((newGeo.vertices[j].getComponent(longAxis) >= i) && (newGeo.vertices[j].getComponent(longAxis) < i + longest/slices)) {
              pointCount++;
              sum.add(newGeo.vertices[j]);
            }
          }
          sum.divideScalar(pointCount);
          var newVector = new THREE.Vector3();
          newVector.copy(sum);
          lineGeo.vertices.push(newVector);
        }
        var line = new THREE.Line(lineGeo, material);
        // line.rotation.set(-math.pi / 2, 0, 0);
        // line.scale.set(0.05, 0.05, 0.05);
        return line;
      }

      function reconstruct(geometry) {
        var points = geometry.getAttribute('position').array;
        var newGeo = new THREE.Geometry();
        for (var i=0;i<points.length; i+=3) {
          newGeo.vertices.push(new THREE.Vector3(points[i], points[i+1], points[i+2]));
        }
        return newGeo;
      }

      function animate() {
        requestAnimationFrame(animate);
        controls.update();
        render();
      }

      function render() {
        var timer = Date.now() * 0.0005;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
      }
    }
  };
});
