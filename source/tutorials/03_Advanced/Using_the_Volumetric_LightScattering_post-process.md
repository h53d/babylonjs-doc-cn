---
ID_PAGE: 24840
PG_TITLE: Using the Volumetric LightScattering post-process
---
BABYLON.VolumetricLightScatteringPostProcess is a post-process that will compute the light scattering according to a light source mesh.
Don't hesitate to perform your tests using the playground [here](http://www.babylonjs-playground.com/?25)

## How to use it ? Easily ##

```
var vls = new BABYLON.VolumetricLightScatteringPostProcess('vls', 1.0, camera, lightSourceMesh, samplesNum, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);
```

*** Parameters ***

- name - The post-process name {string}
- ratio - The size of the post-process and/or internal pass (0.5 means that your postprocess will have a width = canvas.width 0.5 and a height = canvas.height 0.5) {any}
- camera - The camera that the post-process will be attached to {BABYLON.Camera}

- lightSourceMesh - The mesh used as light source to create the light scattering effect (for example, a billboard with its texture simulating the sun) {BABYLON.Mesh}

- samplesNum - The post-process quality, default 100 {number}
- samplingMode - The post-process filtering mode {number}
- engine - The Babylon engine {BABYLON.Engine}
- reusable - If the post-process is reusable {boolean}
- scene - If "camera" parameter is null (adding the post-process in a rendering pipeline), scene is needed to configure the internal pass {BABYLON.Scene}

The lightSourceMesh is a mesh that will contain the light colour, typically a billboard with a diffuse texture.  If your light source is coming from the floor, you can use the floor/ground mesh to compute the light scattering effect.

**Note: The light source mesh can be null. This causes a default lightSourceMesh to be created for you as a billboard **

To create the default mesh before the post-process, there is a static method that returns a billboard as default:

```
var defaultMesh = BABYLON.VolumetricLightScatteringPostProcess.CreateDefaultMesh("meshName", scene);
```

You can access and modify the mesh using:

```
var mesh = vls.mesh;
```

By default, the post-process is computing the light scattering using the internal mesh position.  You can modify and set a custom position using (typically for the floor as the internal mesh):

```
vls.useCustomLightPosition = true;
vls.setLightPosition(new BABYLON.Vector3(5.0, 0.0, 5.0));
```

**Warning: If the custom light position is too far from the light source, the result will be distorted **

You can access the custom position using:

```
var position = vls.getLightPosition();
```

To customize the light scattering, you can modify the vertical direction of the light rays. If _invert_ is set true, the rays will go downward. Upward, if invert is set false.

```
vls.invert = true;
```

To optimize performance, you can customize the rendering quality. In fact, this post-process uses an internal pass (render target texture) that will help the post-process to compute the light scattering effect. Of course, you can compute the pass in a lower ratio like:

```
var vls = new BABYLON.VolumetricLightScatteringPostProcess('vls', { postProcessRatio: 1.0, passRatio: 0.5 }, camera, lightSourceMesh, 75, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, false);
```

vls.useDiffuseColor is used to force rendering the diffuse color of the light source mesh instead of its diffuse texture.

- If useDiffuseColor is true or material.diffuseTexture is undefined, use the diffuse color

- If useDiffuseColor is false and material.diffuseTexture is not undefined, use diffuse texture

- If useDiffuseColor is false and material.diffuseTexture is undefined, use diffuse color

Using the material.diffuseColor instead of material.diffuseTexture (as default) for the light's color:

```
vls.useDiffuseColor = true; // False as default
vls.mesh.material.diffuseColor = new BABYLON.Color3(0.0, 1.0, 0.0);
```

Using the material.diffuseTexture for the light's color:

```
vls.useDiffuseColor = false; // False as default
vls.mesh.material.diffuseTexture= new BABYLON.Texture(...);
```

## And now, it's time to play ! ##

Feel free to tour some examples of Volumetric LightScattering in the playground :

- [Base demo](http://www.babylonjs-playground.com/?25)
- [Colorful experiment](http://babylonjs-playground.azurewebsites.net/#1XOMH0)
- [Video texture as source](http://babylonjs-playground.azurewebsites.net/#1ELQC1)
- [Spherical Harmonics as source](http://babylonjs-playground.azurewebsites.net/#HYFQJ) (hit RUN again and again for this one)
- [Particles as source #1](http://babylonjs-playground.azurewebsites.net/#2L5DBX)
- [Particles as source #2](http://babylonjs-playground.azurewebsites.net/#MYY6S#3)
- [VLS through CSG-created slots](http://babylonjs-playground.azurewebsites.net/#UUXLX#5)

Have fun !
