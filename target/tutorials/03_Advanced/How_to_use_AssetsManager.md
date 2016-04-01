---
ID_PAGE: 22551
PG_TITLE: How to use AssetsManager
---
In order to help developers load multiple assets, Babylon.js (starting with version 1.14) introduced the AssetsManager class.

This class can be used to import meshes into a scene or load text and binary files.

## Using AssetsManager

To use it, you just have to instantiate it with a current scene:

```javascript
var assetsManager = new BABYLON.AssetsManager(scene);
```

Then you can add tasks to the manager:

```javascript
var meshTask = assetsManager.addMeshTask("skull task", "", "./", "skull.babylon");
```

Each task provides an ```onSuccess``` and an ```onError``` callback:

```javascript
meshTask.onSuccess = function (task) {
    task.loadedMeshes[0].position = new BABYLON.Vector3(0, 0, 0);
}
```

You can do the same thing but with text and binary files:

```javascript
var textTask = assetsManager.addTextFileTask("text task", "msg.txt");
textTask.onSuccess = function(task) {
    console.log(task.text);
}

var binaryTask = assetsManager.addBinaryFileTask("binary task", "grass.jpg");
binaryTask.onSuccess = function (task) {
    // Do something with task.data
}
```

Images are also supported through imageTask:

```javascript
var imageTask = assetsManager.addImageTask("image task", "img.jpg");
imageTask.onSuccess = function(task) {
    console.log(task.image.width);
}
```

Textures can also be loaded, through textureTask:

```javascript
var textureTask = assetsManager.addTextureTask("image task", "img.jpg");
textureTask.onSuccess = function(task) {
    material.diffuseTexture = task.texture;
}
```

The manager itself provides three callbacks:
* onFinish
* onTaskSuccess
* onTaskError

```javascript
assetsManager.onFinish = function (tasks) {
    engine.runRenderLoop(function () {
        scene.render();
    }),
};
```

Finally, to launch all the tasks, you have to call ```assetsManager.load();```

You can see a live demo [here](http://www.babylonjs.com/scenes/assets)

## Using loading screen

By default, the AssetsManager will display a loading screen while loading assets:

![](http://www.babylonjs.com/Screenshots/assets.jpg)

If you want to disable the loading screen, you have to set ```assetsManager.useDefaultLoadingScreen``` to false.

The loading screen will also be displayed while loading a scene using SceneLoader if ```BABYLON.SceneLoader.ShowLoadingScreen``` is set to true (by default).

In the same way, you can also display or hide the loading screen manually using these functions:

* ```engine.displayLoadingUI()```
* ```engine.hideLoadingUI()```

Loading text is controlled using ```engine.loadingUIText = "text"```

Background color is controlled using ```engine.loadingUIBackgroundColor = "red"``` for instance.
