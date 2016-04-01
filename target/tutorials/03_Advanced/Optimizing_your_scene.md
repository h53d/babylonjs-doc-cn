This tutorial will help you find some links and info on how you can improve your scene regarding rendering performance.

# Reducing shaders overhead
Babylon.js uses an advanced and automatic shaders engine. This system will keep shaders up to date regarding material options. If you are using a static material (ie. an immutable material) then you can let it know to Babylon.js by using the following code:

```
material.freeze();
``` 

Once frozen, the shader will remain unchanged even if you change material's properties. You will have to unfreeze it to update the inner shader:

```
material.unfreeze();
```

# Using unindexed meshes
By default Babylon.js uses indexed meshes where vertices can be reuse by faces. When vertex reuse is low and when vertex structure is fairly simple (like just a position and a normal) then you may want to unfold your vertices and stop using indices:

```
mesh.convertToUnIndexedMesh();
```
For example this works very well for a cube where it is more efficient to send 32 positions instead of 24 positions and 32 indices.

# Turning AdaptToDeviceRatio off
By default, Babylon.js will adapt to device ratio in order to produce the best possible quality even on high-DPI devices.

The drawback is that this could cost a lot on low-end devices. You can turn it off with the fourth parameter of the Engine constructor:

```
var engine = new BABYLON.Engine(canvas, antialiasing, null, false);
```

In the same constructor, you may also want to turn off antialiasing support with the second parameter.

# Other useful tutorials
* [Optimizing meshes selection for rendering](http://doc.babylonjs.com/tutorials/Optimizing_Your_Scene_with_Octrees)
* [How to use scene optimizer](http://doc.babylonjs.com/tutorials/How_to_use_SceneOptimizer)
