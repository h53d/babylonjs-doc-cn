---
ID_PAGE: 25364
PG_TITLE: How to use Blend Modes
---
# Introduction to Blend Modes ##

A *blend mode* determines how, when rendering a mesh, new on-screen pixels will be mixed with existing pixels.

This may sound trivial as most of the time new pixels simply replace existing ones, which is not really what we may call _blending_ at all. However, in the case of alpha-blended meshes, new pixels do not simply overwrite existing ones: they are _combined_ according to how transparent the mesh is. This is an example of the most simple blending operation available (and also the default one): `BABYLON.Engine.ALPHA_COMBINE`.

Other blend modes exist, and allow you to achieve advanced visual effects.


# Available Blend Modes #

All the available blend modes are listed below:

| Blend Mode | Effect | Additional Info |
|-------------------------------- |---------------- | -------------------- |
| `BABYLON.Engine.ALPHA_COMBINE` | This is the default blend mode for alpha-blended meshes. Blending is modulated by the alpha value of the pixel being drawn. | This is the default blend mode. |
| `BABYLON.Engine.ALPHA_ADD` | This blend mode will effectively _add_ the new pixel and existing pixel values, giving off a ghost-like effect and brightening what's behind the mesh. | |
| `BABYLON.Engine.ALPHA_SUBTRACT` | The new pixel value is subtracted from the existing one, giving off an "inverted color" effect. | Blending is **not** modulated by alpha value. |
| `BABYLON.Engine.ALPHA_MULTIPLY` | The new and existing pixel values are multiplied, thus what's behind the rendered mesh is darkened. This is more or less the opposite of the ALPHA_ADD effect. | Blending is **not** modulated by alpha value. |
| `BABYLON.Engine.ALPHA_MAXIMIZED` | This blend mode is similar to ALPHA_ADD, but gives off a less vibrant and saturated effect. | |
| `BABYLON.Engine.ALPHA_ONEONE` | This blend mode is very similar to ALPHA_ADD, except that it is not modulated by alpha value. Used internally for various visual effects. | Blending is **not** modulated by alpha value. |

Please note that the blending operations are in fact simple mathematical operations done seperately on R, G and B components of the pixel values, each one comprised between 0 and 1. As such, having a green mesh (R=0, G=1, B=0) set with ALPHA_SUBTRACT drawn over a yellow one (R=1, G=1, B=0) will give off a red value (R=1, G=0, B=0).


# How to Use Blend Modes #

Using blend modes is done by manipulating the `alphaMode` property of materials, setting it to one of the constants listed above.

**This property will only be used when the rendered mesh is alpha-blended.** This is very important, because since the `alphaMode` property will have absolutely no effect on an opaque mesh, you will need to make sure your mesh is *alpha-blended* to use it.

You can force an opaque mesh to be alpha-blended by making it very slightly transparent, like so:
```
mesh.visibility = 0.9999;
```

Or you can assign an opacity texture to its material (even if the opacity texture have no alpha channel):
```
 material_base.opacityTexture = material_base.diffuseTexture;
```

To know more about alpha-blending and how alpha-blended meshes are handled, please refer to this article: http://doc.babylonjs.com/page.php?p=25100


# Examples #

Here is a screenshot showing the previously mentioned blend modes:

![Available Blend Modes](http://i.imgur.com/2KTXUjT.png)

This playground scene showcases the available blend modes in action: [http://www.babylonjs-playground.com/#1MSIXB#4](http://www.babylonjs-playground.com/#1MSIXB#4)