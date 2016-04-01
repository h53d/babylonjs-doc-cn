---
ID_PAGE: 22502
PG_TITLE: How to use VirtualJoysticksCamera
---
The VirtualJoysticksCamera will create a Babylon.js camera that can move within your games, thanks to 2 touch-enabled joysticks drawn on the left &amp; right sides of the screen. It’s designed to be controlled via your 2 thumbs.

It derives from the [FreeCamera](https://github.com/BabylonJS/Babylon.js/blob/master/Babylon/Cameras/babylon.freeCamera.js) to provide a FPS-like experience and instantiates 2 [VirtualJoystick](http://doc.babylonjs.com/page.php?p=25064) for you, automatically.

**Note:** We’re using the [W3C Pointer Events](http://www.w3.org/TR/pointerevents/) model. To enable touch on all devices &amp; platforms, we’re using our [Hand.js polyfill](http://handjs.codeplex.com/) library. Don’t forget to include it in your project, otherwise the virtual joysticks will only work in IE.

### Using the BABYLON.VirtualJoysticksCamera camera

It’s the same concept as all our cameras, 1 line of code to activate all the magic. For instance, here is how to create a virtual joysticks camera at the center of the world:

```javascript
var VJC = new BABYLON.VirtualJoysticksCamera("VJC", BABYLON.Vector3.Zero(), scene);
```

The camera constructor takes the following parameters:

- Name
- Position
- Scene

### Video

Here is a 1 minute video demonstrating how it works:

[Virtual Joysticks Camera demo in video](https://www.youtube.com/watch?v=53Piiy71lB0)

![Screenshot of the Virtual Joysticks Camera in action on Espilit](http://david.blob.core.windows.net/babylonjs/VJCBabylon.jpg)

### Complete sample

Here is a complete sample that loads the Espilit demo and switches the default camera to a virtual joysticks camera:

```javascript
document.addEventListener("DOMContentLoaded", startGame, false);
function startGame() {
  if (BABYLON.Engine.isSupported()) {
    var canvas = document.getElementById("renderCanvas");
    var engine = new BABYLON.Engine(canvas, true);

    BABYLON.SceneLoader.Load("Espilit/", "Espilit.babylon", engine, function (newScene) {

      var VJC = new BABYLON.VirtualJoysticksCamera("VJC", newScene.activeCamera.position, newScene);
      VJC.rotation = newScene.activeCamera.rotation;
      VJC.checkCollisions = newScene.activeCamera.checkCollisions;
      VJC.applyGravity = newScene.activeCamera.applyGravity;

      // Wait for textures and shaders to be ready
      newScene.executeWhenReady(function () {
        newScene.activeCamera = VJC;
        // Attach camera to canvas inputs
        newScene.activeCamera.attachControl(canvas);
        // Once the scene is loaded, just register a render loop to render it
        engine.runRenderLoop(function () {
          newScene.render();
        }),
      }),
    }, function (progress) {
    // To do: give progress feedback to user
    }),
  }
}
```

### If you’re switching back, don’t forget to dispose!

If you switch back to another camera, don’t forget to call the dispose() function first. Indeed, the VirtualJoysticks are creating a 2D canvas on top of the 3D WebGL canvas to draw the joysticks with cyan and yellow circles. If you forget to call the dispose() function, the 2D canvas will remain, and will continue to use touch events input.
