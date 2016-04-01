---
ID_PAGE: 22411
PG_TITLE: How Rotations and Translations Work
---
Babylon.js provides many ways to locate and rotate your meshes.

The basic way to define the position of a mesh is the following:
```javascript
mesh.position = new BABYLON.Vector3(x, y, z);
```

The translation is applied **AFTER** the rotation which can be set with euler angles or quaternions:
```javascript
mesh.rotation = new BABYLON.Vector3(x, y, z); // Euler
mesh.rotationQuaternion = new BABYLON.Quaternion(x, y, z, w); // Quaternion
```

The rotation is computed in the object local space. ```rotation``` will be used if ```rotationQuaternion``` property is null (This is the default behavior). ```rotationQuaternion``` is used if both are set.

**You MUST use rotationQuaternion when creating physics objects.**

If you want to apply a translation of the local space you have to use the following code:
```javascript
mesh.setPositionWithLocalVector(new BABYLON.Vector3(x, y, z));
```

You can also get the current position of the object but in local space and not in parent space with the following code:
```javascript
var localPosition = mesh.getPositionExpressedInLocalSpace();
```

If you want to add an extra translation expressed in local space you have to use the following code:
```javascript
mesh.locallyTranslate(new BABYLON.Vector3(x, y, z));
```
Each time you call it with the same vector, it will move your mesh whereas ```setPositionWithLocalVector``` will move it only the first time. http://jsfiddle.net/gwenaelhagenmuller/35uFf/12/

For your convenience, we also added ```mesh.rotate``` and ```mesh.translate``` to add a rotation or a translation to a mesh (both in local and world space):
```javascript
mesh.rotate(BABYLON.Axis.X, 1.0, BABYLON.Space.LOCAL);
mesh.translate(BABYLON.Axis.X, 1.0, BABYLON.Space.WORLD);
```

Please note that ```mesh.rotate``` generates a quaternion and then uses ```mesh.rotationQuaternion```.

#Generating a rotation from a target system#
Sometimes you may know the final orientation you want to give to a mesh in terms of alignment with distant axis, but you don't know what rotation to apply to it to achieve this wanted orientation.  
There is a way to compute an Euler rotation from a set of axis : 
```javascript
var rot = BABYLON.Vector.RotationFromAxis(axis1, axis2, axis3);
mesh.rotation = rot;
```
where _axis1_, _axis2_ and _axis3_ are three left-handed oriented orthogonal vectors.   
With this code, the mesh will be aligned thus :   

* _axis1_ will become x axis in its local system
* _axis2_ will become y axis in its local system
* _axis3_ will become z axis in its local system

example : http://www.babylonjs-playground.com/#VYM1E#5   
The textured plane mesh is currently aligned with the axis between spheres (axis1) and "faces" the camera : axis2 = camera.position 

#Baking Transform#

In certain situations you might be interested in applying a transform (position, rotation, scale) directly to the mesh vertices, instead of saving it as a property of the mesh. This is called baking, and can be useful in the following situations:

- building a set of static geometry
- randomizing a series of mesh copies
- mirroring a mesh along an axis
- etc.

Two methods can be used for this process:

`bakeTransformIntoVertices(transform: Matrix)`: this will bake the provided matrix directly into the mesh vertices. For example:

```
// this will permanently mirror the mesh along the Y axis, while leaving the transform properties untouched
var matrix = BABYLON.Matrix.Scaling(1, -1, 1);
mesh.bakeTransformIntoVertices(matrix);
```

`bakeCurrentTransformIntoVertices()`: this will bake the current transform properties of the mesh into the vertices, and clear those properties. This includes _rotation_, _translation_ and _scaling_.

Note: scaling a mesh will often give unrealistic results for lighting, since the normals will simply be scaled along and not properly recomputed. This is illustrated in the following picture: 

![Normals illustration](http://i.imgur.com/18wDAH7.png) 

_In the above picture, you can see an untransformed mesh on the left, the same mesh scaled along the X axis in the middle and on the right, the mesh with its normals correctly recomputed._


You can do a recomputation of your normals like so:

```
var indices = mesh.getIndices();
var normals = mesh.getVerticesData(VertexBuffer.NormalKind);
BABYLON.VertexData.ComputeNormals(positions, indices, normals);
mesh.updateVerticesData(VertexBuffer.NormalKind, normals, false, false);
```

Please note that recomputing the normals of your mesh may not be an ideal solution, as the results may be wrong in some parts of the mesh (e.g. seams on a sphere).

#Changing the Frame of Reference#

Every mathematical vector and transformation is expressed in a certain _frame of reference_. This is for example handled by the `BABYLON.Space.LOCAL` and `BABYLON.Space.WORLD` constants used in the `rotate()` and `translate()` functions cited above, or `locallyTranslate()` and other similar functions.

A _frame of reference_ is in fact a regular transformation matrix, i.e. an association of rotation, translation and scaling operations.

You may need to express a certain vector in a precise frame of reference, be it the one of a mesh or an arbitrary one. In this case, the function `BABYLON.Vector3.TransformCoordinates()` will come in handy. 

Here is how you would compute the _up_ vector (Y+) inside the frame of reference of a mesh:
```
mesh.computeWorldMatrix();
var matrix = mesh.getWorldMatrix();
var up_local = new BABYLON.Vector3(0,1,0);
var up_global = BABYLON.Vector3.TransformCoordinates(up_local, matrix);
```

Potential uses of `BABYLON.Vector3.TransformCoordinates()` may be:

- computing direction and axis vectors for `applyImpulse()` and other physics-related functions
- setting the position and speed of a mesh relative to another, without the use of parenting
 (e.g. a spaceship shooting missiles)
- applying a projection matrix to a world position vector to end up with a screen-space position vector
