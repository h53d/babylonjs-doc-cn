---
ID_PAGE: 22461
PG_TITLE: How to use Multi-Views
---
Babylon.js is able to render multi views of the same scene.

## Active cameras
Basically, a scene has a ```scene.activeCamera``` property to define the point of view. But you can also define many active cameras with the following code:

```javascript
scene.activeCameras.push(camera);
scene.activeCameras.push(camera2);
```

## Viewports
If you want to use many cameras, you will need to specify a viewport for each camera:

```javascript
camera.viewport = new BABYLON.Viewport(0.5, 0, 0.5, 1.0);
camera2.viewport = new BABYLON.Viewport(0, 0, 0.5, 1.0);
```

A viewport is defined by the following constructor:

```javascript
BABYLON.Viewport = function (x, y, width, height);
```

x, y, width, height are all absolute values (between 0 and 1)

Keep in mind that the canvas is similar to a texture.  Its x/y of 0, 0... is in the lower left corner.
