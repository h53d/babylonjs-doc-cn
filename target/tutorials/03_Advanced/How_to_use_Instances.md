---
ID_PAGE: 22571
PG_TITLE: How to use Instances
---
Instances are an excellent way to use hardware accelerated rendering to draw a huge number of identical meshes (let's imagine a forest or an army).

Instances are built from a mesh with the following code:

```javascript
var mesh = newMeshes[0];
for (var index = 0; index < 100; index++) {
    var newInstance = mesh.createInstance("i" + index);
}
```
A mesh can have as many instances as you want.

Each instance has the same material as the root mesh. They can only vary on the following properties:
* ```position```
* ```rotation```
* ```rotationQuaternion```
* ```setPivotMatrix```
* ```scaling```

# Support
Instances are supported for collisions, picking, rendering and shadows. Even if the current hardware does not support hardware accelerated instances, babylon.js will be able to optimize rendering to take instances into account.

# Using Blender to create instances
Using Blender, you can create instances of a mesh by just creating a linked object:

![](http://www.html5gamedevs.com/uploads/monthly_05_2014/post-7026-0-82151000-1401073383.jpg)

# Using 3DS Max to create instances
Using 3DS Max, you can create instances of a mesh by just creating a clone instance object with clic right on the object:

![](http://www.html5gamedevs.com/uploads/monthly_11_2014/post-5292-0-54659600-1415793353.jpg)

## Demo
http://www.babylonjs.com/?INSTANCES
