module Sandbox {
    export class MainClass {
        engine: BABYLON.Engine;
        scene: BABYLON.Scene;
        camera: BABYLON.TargetCamera;

        start() {
            BABYLON.Engine.CodeRepository = "/src/";
            BABYLON.Engine.ShadersRepository = "/src/Shaders/";

            // Get the canvas element from our HTML below
            var canvas = <HTMLCanvasElement>document.querySelector("#renderCanvas");

            // Load the BABYLON 3D engine
            this.engine = new BABYLON.Engine(canvas, true);
            
            // Now create a basic Babylon Scene object
            this.scene = new BABYLON.Scene(this.engine);
            
            // Change the scene background color to green.
            this.scene.clearColor = new BABYLON.Color3(56 / 256, 87 / 256, 145 / 256);

            // This creates and positions a free camera
            this.camera = new BABYLON.ArcRotateCamera("camera1", 0, 0.8, 100, BABYLON.Vector3.Zero(), this.scene);
            this.camera.attachControl(canvas);

            var mesh = BABYLON.Mesh.CreateBox("box01", 50, this.scene);

            // This creates a light, aiming 0,1,0 - to the sky.
            var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);

            var self = this;

            // Register a render loop to repeatedly render the scene
            this.engine.runRenderLoop(function () {
                self.scene.render();
            });
            
            // Watch for browser/canvas resize events
            window.addEventListener("resize", function () {
                self.engine.resize();
            });
        }
    }
}

var sandbox = new Sandbox.MainClass();
sandbox.start();