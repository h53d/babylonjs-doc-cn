---
ID_PAGE: 24825
PG_TITLE: How to use DepthRenderer to get depth values
---
BABYLON.DepthRenderer is a tool used to generate depth texture (a texture that contains depth buffer and which can be used to read scene depth values).

Using it is pretty straightforward:

```
var renderer = scene.enableDepthRenderer();
```

Starting from there, the scene will fill for you the renderer with depth values. All active meshes (Meshes which are visible from the current camera point of view) are drawn by the DepthRenderer. 

**Warning: Transparent meshes are not drawn because they are not written to the depth buffer**

You can then use the texture associated with the renderer like any other textures by using ```getDepthMap()``` function:

```
var mat = new BABYLON.StandardMaterial("mat01", scene);
mat.emissiveTexture = renderer.getDepthMap(); 

```

If you want to disable the renderer, just call the following code:
```
scene.disableDepthRender();
```

As you can see, you can use the depth map associated with the DepthRenderer with any materials or post-processes.

**Note: By default, generated texture uses float components thanks to *WebGL OES_texture_float extension*. If this extension is not supported, Babylon.js reverts back to byte component which means less precision for depth values.**