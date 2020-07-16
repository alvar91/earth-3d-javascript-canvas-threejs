window.onload = function() {
    Player.init();
}

Player = {
    init: function() {
        let container = document.getElementsByClassName("webgl")[0];
        this.scene = new THREE.Scene();
        window.scene = this.scene;

        // let axisHelper = new THREE.AxisHelper(500);
        // this.scene.add(axisHelper);

        let aspect = container.offsetWidth / container.offsetHeight;
        this.camera = new THREE.PerspectiveCamera(30.0, aspect, 1, 1000);
        this.camera.position.z = 50;
        this.scene.add(this.camera);

        let light = new THREE.AmbientLight();
        this.scene.add(light);

        let pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(10, 10, 10);
        this.scene.add(pointLight);

        //let pointLightHelper = new THREE.PointLightHelper(pointLight, 2);
        //this.scene.add(pointLightHelper);

        this.renderer = new THREE.WebGLRenderer();
        container.appendChild(this.renderer.domElement);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(container.offsetWidth, container.offsetHeight);

        let texttureLoader = new THREE.TextureLoader();
        texttureLoader.load('earth.jpg', function(texture) {
            let geometry = new THREE.SphereGeometry(5, 30, 30);
            let material = new THREE.MeshPhongMaterial({map: texture});
            Player.mesh = new THREE.Mesh(geometry, material);
            Player.scene.add(Player.mesh);
            Player.animate();
        })

        this.controls = new THREE.TrackballControls(this.camera, container);
        this.controls.zoomSpeed = 0.1;

        this.renderer.render(this.scene, this.camera);
    },

    animate: function() {
        requestAnimationFrame(this.animate.bind(this));
        this.controls.update();
        this.mesh.rotation.y += 0.05;
        //this.mesh.position.x += 0.01;
        this.renderer.render(this.scene, this.camera);
    }
}