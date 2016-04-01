---
ID_PAGE: 25090
PG_TITLE: How to use Path3D
---
**Path3D** is a math object.  
Given an array of successive _Vector3_, it allows you to construct a path in space by computing on each point a triplet of vectors, the tangent, the normal and the binormal to keep direction and consistency (reduction of rotations).  
Here is the model inspired from  : http://www.cs.cmu.edu/afs/andrew/scs/cs/15-462/web/old/asst2camera.html  

Each triplet can then be used as a local system coordinate. You could set for example a camera on each normal sliding along a curve.

Here is a simple example of the visualisation of the triplets on a sinus curve : http://www.babylonjs-playground.com/#2DLXYB  
Please zoom in and rotate : tangents in red, normals in blue, binormal in green.  

Another example to show how the triplets slightly rotate when the curve goes more into depth  : http://www.babylonjs-playground.com/#2DLXYB#1  

Path3D creation :
```javascript
var points = [v1, v2, ..., vn];          // array of Vector3
var path3d = new BABYLON.Path3D(points);
```

You can then get the triplets. Each following methods return an array of _Vector3_ which are respectively on each curve point the tangent, normal and binormal vectors :
```javascript
var tangents = path3D.getTangents();
var normals = path3D.getNormals();
var binormals = path3D.getBinormals();
```

There are also two other methods : one returning the _curve_ which is actually a copy of the initial _Vector3_ array given to create the path3D object and the other one returning the distance of each points from the first curve point (distance = zero) as a simple array of numeric values (the distances).
```javascript
var curve = path3d.getCurve();
var distances = path3d.getDistances();
```

In order to avoid memory re-allocation (in the render loop for instance) since the given _points_ array is internally copied, you can update an existing _Path3D_ object with its _update()_ method :
```javascript
var points1 = [v1, v2, ..., vn];          // array of Vector3
var path3d = new BABYLON.Path3D(points1);
var points2 = [u1, u2, ..., un];          // another array of Vector3
path3D.update(points2);
```
Tangents, normals and bi-normals are thus recomputed for this new path.


If you need to give a fixed orientation to the normal on the first path point, you can pass an extra Vector3 as parameter on creation or update :
```javascript
var initialVector = new BABYLON.Vector3(0, 1, 0);
var otherVector = new BABYLON.Vector3(0, 0, 1);
var points = [v1, v2, ..., vn];          // array of Vector3
var path3d = new BABYLON.Path3D(points, initialVector);
// do stuff ...
path3d.update(points, otherVector);
```

The first normal will then be the projection of your parameter vector onto the plane orthogonal to the first tangent at the first point position. 
In a simplest way, this is a mean to have a "vertical" (or quite vertical, depending on the path) first normal for instance.

