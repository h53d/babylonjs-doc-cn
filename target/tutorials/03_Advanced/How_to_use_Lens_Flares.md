---
ID_PAGE: 22471
PG_TITLE: How to use Lens Flares
---
Babylon.js allows you to simply create lens flares effect:

![Lens flares](http://www.babylonjs.com/Screenshots/lens.jpg)

To do so, you have to first create a LensFlareSystem:

```javascript
var lensFlareSystem = new BABYLON.LensFlareSystem("lensFlareSystem", light0, scene);
```

The second parameter defines the source (the emitter) of the lens flares (it can be a camera, a light or a mesh).

Then, you can add flares to your system with the following code:
```javascript
var flare00 = new BABYLON.LensFlare(0.2, 0, new BABYLON.Color3(1, 1, 1), "Assets/lens5.png", lensFlareSystem);
var flare01 = new BABYLON.LensFlare(0.5, 0.2, new BABYLON.Color3(0.5, 0.5, 1), "Assets/lens4.png", lensFlareSystem);
var flare02 = new BABYLON.LensFlare(0.2, 1.0, new BABYLON.Color3(1, 1, 1), "Assets/lens4.png", lensFlareSystem);
var flare03 = new BABYLON.LensFlare(0.4, 0.4, new BABYLON.Color3(1, 0.5, 1), "Assets/Flare.png", lensFlareSystem);
var flare04 = new BABYLON.LensFlare(0.1, 0.6, new BABYLON.Color3(1, 1, 1), "Assets/lens5.png", lensFlareSystem);
var flare05 = new BABYLON.LensFlare(0.3, 0.8, new BABYLON.Color3(1, 1, 1), "Assets/lens4.png", lensFlareSystem);
```

To create a flare, you must specify the following parameters:

- Size (a floating value between 0 and 1) 
- Position (a floating value between -1 and 1). A value of 0 is located on the emitter. A value greater than 0 is beyond the emitter and a value lesser than 0 is behind the emitter 
- Color 
- Texture 

Babylon.js can also detect occlusions for you. A mesh can occlude the lens flares if the following conditions are met:

- has a material
- isVisible === true
- isEnabled() === true
- isBlocker === true
