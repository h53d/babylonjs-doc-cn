---
ID_PAGE: 22611
PG_TITLE: Using the Debug Layer
---
The main goal of the debug layer is to provide a fully functional UI to help you debug a scene and find potential culprits.

## Using the UI
You can display the debug layer by calling:

```javascript
scene.debugLayer.show();
```
You can also display the debug layer by choosing a camera if you use multiple cameras:

```javascript
scene.debugLayer.show(true, camera);
```

![Debug layer](http://www.babylonjs.com/forumpics/debuglayer.jpg)

### Options
This panel is designed to control display of all options.

* Statistics, Logs, Meshes tree check-boxes allow you to enable/disable others panels
* Bounding boxes check-box can be used to force the display of all bounding boxes
* Clickable labels check-box can display a label for every node (Meshes, cameras and lights). These labels can be clicked to:
 * Display an overlay on meshes
 * Enable/disable lights
 * Switch to camera
* Generate user marks (F12) check-box can be used with F12 tools to emit performance counters to UI Responsiveness profiler
* Rendering mode can be used to switch between solid/wireframe/point modes
* Texture channels can be used to turn specific textures off
* Options can be used to turn specific engine options off

### Meshes tree
The meshes tree allows you to enable/disable meshes by name and could be used to determine how many vertices are contained in a specific mesh.

### Statistics
The statistics panel gives you a global view of how specific engine parts are performing alongside WebGL info and capabilities.

**Note about active vertices**: Active vertices are the number of vertices processed by the GPU. For instance if you have a quad with 4 vertices and 2 faces, the total vertices will be 6 because 2 faces of 3 vertices each are sent to the GPU even if two vertices are shared.

### Logs
You can use the Logs panel to get log/warn/error message from the engine.

## Controlling the debug layer by code 
The debug layer can be used without the UI as well. To do so, you just have to call it like this:

```javascript
scene.debugLayer.show(false);
```
And for multiple cameras:

```javascript
scene.debugLayer.show(false, camera);
```

You can hide the interface with:

```javascript
scene.debugLayer.hide();
```
You can then control when labels and axis should be displayed with the following code:

```javascript
scene.debugLayer.shouldDisplayLabel = function (node) {
    return false;
}

scene.debugLayer.shouldDisplayAxis = function (mesh) {
    return mesh.name === "sphere1";
}
```

You can even control the ratio used to determine axis size:

```javascript
scene.debugLayer.axisRatio = 0.04; // 4% of canvas width
```

You can also control the UI by using CSS and target following IDs:

* DebugLayerStats
* DebugLayerTree
* DebugLayerLogs
* DebugLayerOptions

For instance:

```javascript
document.getElementById("DebugLayerStats").style.background = "#484848";
document.getElementById("DebugLayerStats").style.zindex = "999999";
```

Feel free to test it on the [playground](http://www.babylonjs-playground.com/#1IG874)