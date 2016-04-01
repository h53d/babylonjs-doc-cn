---
ID_PAGE: 22591
PG_TITLE: How to use LOD
---
Babylon.js comes with an integrated support for level of detail.

This feature allows you to specify different meshes based on distance to viewer.
For instance, here is how to define 4 levels of details for a given mesh:

```javascript
var knot00 = BABYLON.Mesh.CreateTorusKnot("knot0", 0.5, 0.2, 128, 64, 2, 3, scene);
var knot01 = BABYLON.Mesh.CreateTorusKnot("knot1", 0.5, 0.2, 32, 16, 2, 3, scene);
var knot02 = BABYLON.Mesh.CreateTorusKnot("knot2", 0.5, 0.2, 24, 12, 2, 3, scene);
var knot03 = BABYLON.Mesh.CreateTorusKnot("knot3", 0.5, 0.2, 16, 8, 2, 3, scene);

knot00.addLODLevel(15, knot01);
knot00.addLODLevel(30, knot02);
knot00.addLODLevel(45, knot03);
knot00.addLODLevel(55, null);
```

The first parameter used with ```addLODLevel``` defines the distance to the camera. Beyond this distance, the specified level is used.

Each level is independent and can have its own material.
By defining a level of detail to null, you disable rendering of the current mesh, when it is viewed beyond the indicated distance to camera.

When a mesh is used as a level of detail for another mesh, it is linked to it and cannot be rendered directly.

You can remove a LOD level by using ```removeLODLevel```:

```javascript
knot00.removeLODLevel(knot02);
knot00.removeLODLevel(null);
```

Try: [LOD playground](http://www.babylonjs-playground.com/#QE7KM)

## Using LOD and instances
By default, instances will use LOD defined on root mesh. You do not have to specify anything on instances:

```javascript
var count = 3;
var scale = 4;

var knot00 = BABYLON.Mesh.CreateTorusKnot("knot0", 0.5, 0.2, 128, 64, 2, 3, scene);
var knot01 = BABYLON.Mesh.CreateTorusKnot("knot1", 0.5, 0.2, 32, 16, 2, 3, scene);
var knot02 = BABYLON.Mesh.CreateTorusKnot("knot2", 0.5, 0.2, 24, 12, 2, 3, scene);
var knot03 = BABYLON.Mesh.CreateTorusKnot("knot3", 0.5, 0.2, 16, 8, 2, 3, scene);

knot00.setEnabled(false);

knot00.addLODLevel(15, knot01);
knot00.addLODLevel(30, knot02);
knot00.addLODLevel(45, knot03);
knot00.addLODLevel(55, null);

for (var x = -count; x <= count; x++) {
    for (var y = -count; y <= count; y++) {
        for (var z = 5; z < 10; z++) {
            var knot = knot00.createInstance("knotI"),
            knot.position = new BABYLON.Vector3(x * scale, y * scale, z * scale);
        }
    }
}
```

Try: [LOD and instances playground](http://www.babylonjs-playground.com/#14ESWC)
