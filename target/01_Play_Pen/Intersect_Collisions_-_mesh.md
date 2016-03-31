---
ID_PAGE: 22101
PG_TITLE: 10. Intersect Collisions - mesh
---
## Introduction

In dynamic scenes, objects are moving and interacting with each other. To get the best rendering, you will want to know when your meshes are in contact with each other. In this tutorial, we are going to discover how the collision system works.

![Collisions](http://www.babylonjs.com/tutorials/10%20-%20Collisions%20Intersect/10.png)

_最终结果_ 
## How can I do this ?

This tutorial is going to show you two ways of collision detection: the first one is to raise a collision event when two meshes are in contact, the other one is detecting contact between a mesh and a single point.

We are going to talk about the scene above. The first and second sphere (balloon) will collide on the rotated ground, the last one will be in collision only on a single point. Once you have created this basic scene, continue reading to learn how to check collisions.

* **Intersect mesh**

The point here is to check contact between our balloons and the ground. We will use the “intersectsMesh()” function, with two parameters: the mesh to be checked, and the precision of the intersection (boolean).

```javascript
if (balloon1.intersectsMesh(plan1, false)) {
  balloon1.material.emissiveColor = new BABYLON.Color4(1, 0, 0, 1);
} else {
  balloon1.material.emissiveColor = new BABYLON.Color4(1, 1, 1, 1);
}
```

To avoid costly calculation by checking many details on a mesh, Babylon engine creates a bounding box around the object, and tests for intersection between this box, and the colliding mesh. Here is an example of a bounding box:

![Collisions](http://www.babylonjs.com/tutorials/10%20-%20Collisions%20Intersect/10-1.png)

But this bounding box can be more or less precise, and that’s why we have our second parameter. In short, if this parameter is set to true (false by default), then the bounding box is closer to the mesh (OBB bounding type), but it’s a more costly calculation. Be aware that this type of bounding box is especially useful when your mesh is rotated to an angle.

![Collisions](http://www.babylonjs.com/tutorials/10%20-%20Collisions%20Intersect/10-2.png)

So think about the collisions details you need before to choose.

If you want more information about this second parameter, you can have a look at this Wikipedia page, especially about AABB and OBB mode: [http://en.wikipedia.org/wiki/Bounding_volume](http://en.wikipedia.org/wiki/Bounding_volume)

* **Intersect point**

The other function you can use is “intersectsPoint()” with a specific point, like this:

```javascript
var pointToIntersect = new BABYLON.Vector3(10, -5, 0);
if (balloon3.intersectsPoint(pointToIntersect)){
  balloon3.material.emissiveColor = new BABYLON.Color4(1, 0, 0, 1);
}
```

We defined a precise point in our scene, and if our balloon intersects this point, wherever on the balloon, then the event is raised and we change the color of the balloon.

You can play with the code used in this tutorial... by visiting [**a demo at our playground**](http://babylonjs-playground.azurewebsites.net/?10).

## Next step
With those two functions, your scenes are becoming a lot more dynamic: you can define a specific reaction to object intersecting and colliding, and begin to introduce physics notions into your scene.

In our next tutorial, you will discover how to [check collisions between your scene and the mouse](http://doc.babylonjs.com/tutorials/Picking_Collisions).
