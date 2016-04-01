---
ID_PAGE: 25094
PG_TITLE: 17. Using decals
---
Starting with Babylon.js v2.1, we introduced decals.

Usually used to add details on meshes (bullets hole, local details, etc...), a decal is a mesh produced from a subset of a previous one with a small offset in order to appear on top of it.

![Decal](http://www.babylonjs.com/screenshots/decals.jpg)

To create a decal, you can call this code:
```javascript
var newDecal = BABYLON.Mesh.CreateDecal("decal", mesh, decalPosition, normal, decalSize, angle);
```

This function takes the following parameters:

* name of the new mesh (string)
* source mesh (Mesh)
* position on source mesh where to generate the decal (Vector3 expressed in world coordinates)
* normal of the source mesh where the decal will generated (Vector3 expressed in world coordinates)
* Size of the decal (Vector3)
* rotation angle (0 by default)


You can play with a sample here (Try to click on the cat):
http://www.babylonjs-playground.com/#1BAPRM

