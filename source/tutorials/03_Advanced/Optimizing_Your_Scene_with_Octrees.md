---
ID_PAGE: 22561
PG_TITLE: Optimizing Your Scene with Octrees
---
Octrees are a really powerful data structure that can quickly select entities based on space coordinates.
More on wikipedia: http://en.wikipedia.org/wiki/Octree

Babylon.js supports octrees through a class named ```BABYLON.Octree```. Dedicated functions are available to help you create these octrees when required:

# Optimizing meshes selection for rendering
If your scene has a lot of meshes, it can be useful to create an octree to speed visible meshes selection (e.g. finding meshes the camera can see). To do so, just call this function:

```javascript
var octree = scene.createOrUpdateSelectionOctree(capacity, maxDepth)
```

You can call the function each time you want to update your octree. This function accepts two parameters:

* capacity: defines the maximum number of meshes you want on your octree's leaves. The default value is 64.
* maxDepth: defines the maximum depth (sub-levels) for your octree. Default value is 2, which means 8 * 8 * 8 = 512 blocks :) (This parameter takes precedence over capacity.)

**Warning: Octrees can be counterproductive if there are not enough meshes in your scene**

# Managing dynamic meshes
The main problem with octrees is that your meshes must be static. Indeed, an octree is not dynamic which means that it cannot take into account a mesh's movement.
If you want to have dynamic meshes while keeping your octree, you can just register a mesh as dynamic like this:

```javascript
octree.dynamicContent.push(mesh)
```

In this case, the octree will always select the dynamic mesh.

# Optimizing collisions and picking
Computing collisions or clicking-on complex meshes (more than 10k vertices for instance) can be really slow. You can speed things up by subdividing your mesh into submeshes using ```mesh.subdivide(x)``` where x is the number of submeshes you want.

Then you can optimize the selection of submeshes for collisions or picking by creating an octree on the mesh for its submeshes:

```javascript
mesh.createOrUpdateSubmeshesOctree(capacity, maxDepth)
```

You can even specify the usage of your octree independently:

* ```mesh.useOctreeForCollisions```
* ```mesh.useOctreeForPicking```
* ```mesh.useOctreeForRenderingSelection``` : Octree for submeshes can even be used during mesh selection based on camera field of view. Once a mesh is selected by the camera, if the mesh has submeshes, the camera has to select which one is visible. In this case, having an octree can be really helpful.

# GroundMesh
For the specific case of ground meshes, Babylon.js provides a class called ```BABYLON.GroundMesh``` that you can create using ```BABYLON.Mesh.CreateGround``` and ```BABYLON.Mesh.CreateGroundFromHeightMap```.

By calling ```groundMesh.optimize(chunkSize)``` where chunkSize defines the number of submeshes you want, the mesh will be optimized for rendering, picking and collisions by creating an internal octree (Be sure to select a correct chunkSize).

# Using octrees manually
You can also use octrees from your code to get a list of meshes or submeshes.

Here are the helpful functions you can find on an octree:

* ```select(frustumPlanes: Plane[], allowDuplicate: boolean)```
* ```intersects(sphereCenter: Vector3, sphereRadius: number, allowDuplicate: boolean)```
* ```intersectsRay(ray: Ray)```

These functions return a [SmartArray](https://github.com/BabylonJS/Babylon.js/blob/master/Babylon/Tools/babylon.smartArray.ts) where duplicates are present or not according to ```allowDuplicate``` parameter/

# Demos
* http://www.babylonjs.com/?OCTREE
* http://www.babylonjs.com/?INSTANCES
