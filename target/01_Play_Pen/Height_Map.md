---
ID_PAGE: 22141
PG_TITLE: 14. Height Map
---
## Introduction

In this tutorial, our goal is to understand height maps, and to learn how to generate realistic grounds.

![HeightMap](http://www.babylonjs.com/tutorials/14%20-%20Height%20map/14.png)

_最终结果_
## How can I do this ?

* **Introduction**

Those mountains are very easy to generate with Babylon.js, and with only a single function. But before we do that, we have to create a new material, like we have done many times before:

```javascript
var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
groundMaterial.diffuseTexture = new BABYLON.Texture("Earth__land.jpg", scene);

var groundPlane = BABYLON.Mesh.CreatePlane("groundPlane", 200.0, scene);
groundPlane.material = groundMaterial;
```

![HeightMap2](http://www.babylonjs.com/tutorials/14%20-%20Height%20map/14-1.png)

_Our material, a texture, applied to the plane_

* **Explanations of a height map**

Understanding height maps is the main objective of this tutorial. A height map is simply a greyscale image like the one we are going to use:

![HeightMap3](http://www.babylonjs.com/tutorials/14%20-%20Height%20map/worldHeightMap.jpg)

This image will now be used to generate our ground, using the different variants of gray of our picture. This image is the elevation data for your ground. Each pixel’s color is interpreted as a distance of displacement or “height” from the “floor” of your mesh. So, the whiter the pixel is, the taller your mountain will be.

To help you generate those gray-scale height maps, you can use software such as “Terragen”, or ”Picogen”. 

* **Javascript code**

Now let’s see this powerful function named “CreateGroundFromHeightMap”:
```javascript
var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "worldHeightMap.jpg", 200, 200, 250, 0, 10, scene, false, successCallback);
```

Many parameters here:
* _Name_
* _Height map picture url_
* Size of this mesh: 
* > _Width_
* > _Height_
* _Number of subdivisions_: increase the complexity of this mesh in order to improve the visual quality of it:

![HeightMap4](http://www.babylonjs.com/tutorials/14%20-%20Height%20map/14-2.png)

* _Minimum height_ : The lowest level of the mesh
* _Maximum height_ : the highest level of the mesh
* _Scene_: the actual scene
* _Updatable_: indicates if this mesh can be updated dynamically in the future (Boolean)
* successCallback : will be called after the height map was created and the vertex data is created. It is a function with the mesh as its first variable.

Finally, when our new mesh is ready, we simply apply our material:
```javascript
ground.material = groundMaterial;
```

And now we have a beautiful 3D view of the earth!

![HeightMap4](http://www.babylonjs.com/tutorials/14%20-%20Height%20map/14-3.png)

In my example, I have added a skybox (like we have learned before [here](http://doc.babylonjs.com/tutorials/Environment)), and a spotlight to simulate sun activity.

Here is another example showing what you can achieve with BabylonJS height maps:

![HeightMap5](http://www.babylonjs.com/tutorials/14%20-%20Height%20map/14-4.png)

* **Tips**

When the user is manipulating the camera, it can be awkward if he can see under the ground, or if he zooms-out outside the skybox. So, to avoid that kind of situation, we can constrain the camera movement:

```javascript
var camerasBorderFunction = function () {
        //Angle
        if (camera.beta < 0.1)
            camera.beta = 0.1;
        else if (camera.beta > (Math.PI / 2) * 0.9)
            camera.beta = (Math.PI / 2) * 0.9;

  //Zoom
        if (camera.radius > 150)
            camera.radius = 150;

        if (camera.radius < 30)
            camera.radius = 30;
    };

    scene.registerBeforeRender(camerasBorderFunction);
```

You may be interested in visiting [**the playground demo**](http://babylonjs-playground.azurewebsites.net/?14) that goes with this tutorial.

## Next step
Well done! Your scene looks good now, and you can imagine a lot of new landscapes! One more important thing you need to know is [how to create shadows](http://doc.babylonjs.com/tutorials/Shadows). Shadows will give your scene a beautiful rendering effect, so don't forget about them!
