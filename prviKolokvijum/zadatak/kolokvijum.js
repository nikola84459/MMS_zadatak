function init() {
	var stats = initStats();

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	var renderer = new THREE.WebGLRenderer();

	renderer.setClearColor(new THREE.Color(0x000000));
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;

	document.getElementById("webgl-output").appendChild(renderer.domElement);

	var ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
	scene.add(ambientLight);

	var planeGeometry = new THREE.PlaneGeometry(60, 60, 1, 1);
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.receiveShadow = true;

	plane.rotation.x = -0.5 * Math.PI;
	plane.position.x = 15;
	plane.position.y = 0;
	plane.position.z = 0;

	scene.add(plane);

	camera.position.x = -30;
	camera.position.y = 40;
	camera.position.z = 30;
	camera.lookAt(scene.position);

	var cubeGeometry1 = new THREE.CubeGeometry(4, 4, 4);
	var cubeMaterial1 = new THREE.MeshLambertMaterial({color: 0x2dd1fa});
	var cube1 = new THREE.Mesh(cubeGeometry1, cubeMaterial1);
	cube1.castShadow = true;

	cube1.position.x = -4;
	cube1.position.y = 3;
	cube1.position.z = 0;

	scene.add(cube1)

	var cubeGeometry2 = new THREE.CubeGeometry(4, 4, 4);
	var cubeMaterial2 = new THREE.MeshLambertMaterial({color: 0xf5e325});
	var cube2 = new THREE.Mesh(cubeGeometry2, cubeMaterial2);
	cube2.castShadow = true;

	cube2.position.x = -4;
	cube2.position.y = 3;
	cube2.position.z = 20;

	scene.add(cube2)

	var cubeGeometry3 = new THREE.CubeGeometry(4, 4, 4);
	var cubeMaterial3 = new THREE.MeshLambertMaterial({color: 0xf5e325});
	var cube3 = new THREE.Mesh(cubeGeometry3, cubeMaterial3);
	cube3.castShadow = true;

	cube3.position.x = -4;
	cube3.position.y = 3;
	cube3.position.z = -20;

	scene.add(cube3);

	var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
	var sphereMaterial = new THREE.MeshLambertMaterial({color: 0x3bdb66});
	var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
	sphere.castShadow = true;

	sphere.position.x = 20;
	sphere.position.y = 0;
	sphere.position.z = 0;

	scene.add(sphere);

	var spotLight = new THREE.SpotLight(0x34ebcc);
	spotLight.position.set(-30, 20, -5);
	spotLight.castShadow = true;
	scene.add(spotLight);

	var step = 0;

	var controls = new function() {
		this.rotacija = 0.02;
		this.skok = 0.03;
		
	}

	var gui = new dat.GUI();
	gui.add(controls, "rotacija", 0, 0.5);
	gui.add(controls, "skok", 0, 0.5)
	var trackballControls = initTrackballControls(camera, renderer);
    var clock = new THREE.Clock() 


	render();

	function render() {
		trackballControls.update(clock.getDelta()); 
		stats.update();
		requestAnimationFrame(render);

		step += controls.skok;

		sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

		cube1.position.y = 2 + (10 * Math.abs(Math.sin(step)));

		cube2.position.y =  1 + (30 * Math.abs(Math.sin(step)));

		cube3.position.y = 1 + (30 * Math.abs(Math.sin(step)));

		cube2.rotation.x += controls.rotacija;
		cube2.rotation.y += controls.rotacija;

		renderer.render(scene, camera);
	}
}