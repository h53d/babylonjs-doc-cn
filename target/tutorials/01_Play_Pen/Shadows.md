---
ID_PAGE: 22151
PG_TITLE: 15. Shadows
---
## Introduction

In this tutorial, we are going to learn how to create shadows in Babylon JS. Shadows are now becoming dynamic, and they are now dynamically generated depending upon a light.

![Shadows](http://www.babylonjs.com/tutorials/15%20-%20Shadows/15.png)

_最终结果_ 
## How can I do this ?

Shadows are easy to generate using the babylon.js “ShadowGenerator”. This function uses a shadow map: a map of your scene generated from the light’s point of view, as you can see here:

![Shadows2](http://www.babylonjs.com/tutorials/15%20-%20Shadows/15-1.png)

The two parameters used by the shadow generator are: the size of the shadow map, and which light is used for the shadow map's computation.
```javascript
var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
```

Next, you have to define which shadows will be rendered. Here we want the shadow of our torus, but you can “push” any meshes you want:
```javascript 
shadowGenerator.getShadowMap().renderList.push(torus);
```

And finally, you will have to define where the shadows will be displayed... by setting a mesh parameter to true:
```javascript
ground.receiveShadows = true;
```

You may want to reduce shadow acne resulting from not precise enough shadow map. To do so, you can define the bias (which is 0.00005 by default).:
```javascript
shadowGenerator.bias = 0.01;
```

## Filters

If you want to go further, you can activate shadows filtering.

There are three filters available:

### Variance shadow map 
```javascript
shadowGenerator.useVarianceShadowMap = true;
```
It is _true_ by default, because it is useful to decrease the aliasing of the shadow.  But if you want to reduce computation time, feel free to change it.

### Poisson sampling
```javascript
shadowGenerator.usePoissonSampling = true;
```
If you set this one to _true_, Variance shadow maps will be disabled. This filter uses Poisson sampling to soften shadows. The result is better, but slower.

### Blur variance shadow map 
```javascript
shadowGenerator.useBlurVarianceShadowMap = true;
```
This is the better soften shadow filter but the slower as well. It uses blurred variance shadow map.

The quality of the blur is defined by two properties:

* shadowGenerator.blurScale: Define the scale used to downscale the shadow map before applying the blur postprocess. By default, the value is 2
* shadowGenerator.blurBoxOffset: Define the offset of the box's edge used to apply the blur. By default, the value is 1 (Meaning the box will go from -1 to 1 in bot direction resulting in 9 values read by the blur postprocess).

### Examples

Please find here pictures of various filters used with a spot light:

![Hard shadows](http://www.babylonjs.com/forumpics/hard.jpg)

*No filter*

![Poisson](http://www.babylonjs.com/forumpics/poisson.jpg)


*Poisson sampling*

![VSM](http://www.babylonjs.com/forumpics/vsm.jpg)


*Variance Shadow Map*

![BlurVSM](http://www.babylonjs.com/forumpics/blurVSM.jpg)


*Blur Variance Shadow Map*

## About the light
Keep in mind that this shadow generator can only be used with one light.  If you want to generate shadows from another light, then you will need to create another shadow generator.

Only point, directional and spot lights can cast shadows:

```
var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
```
Point lights use cubemaps rendering so please be cautious when enabling them as this could lead to some performance issues.

Spot lights use perspective projection and directional lights use orthogonal projection. Both projections are evaluated automatically for you to get the best shadow map possible.

For directional light, you can control the size of the projection window by modifying ```light.shadowOrthoScale``` (0.1 by default which means that the projection window is increase by 10% from the optimal size).

The light's position, as well as the positions of the mesh that you have pushed into the renderlist, determine where the shadows will appear.

Now you might want to visit [**the playground scene**](http://babylonjs-playground.azurewebsites.net/?15) for this tutorial.

You can also visit the [point light shadow map playground scene](http://www.babylonjs-playground.com/#LYCSQ#12)

## Next step
Now that you are becoming a real professional about Babylon.js, maybe it’s time to go deeper into the code to manipulate complex shaders, mesh, or textures. Our [home menu for our wiki](http://doc.babylonjs.com/) is your portal to many advanced topics. You can also participate in this project by going to our Github page: [https://github.com/BabylonJS/Babylon.js](https://github.com/BabylonJS/Babylon.js) and also by participating in our very active forum: [http://www.html5gamedevs.com/forum/16-babylonjs](http://www.html5gamedevs.com/forum/16-babylonjs). See you there.
