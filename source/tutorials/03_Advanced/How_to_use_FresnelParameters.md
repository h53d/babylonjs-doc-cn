---
ID_PAGE: 22481
PG_TITLE: How to use FresnelParameters
---
Babylon.js 1.14 introduced new parameters for the StandardMaterial: _FresnelParameters_.

![](http://www.babylonjs.com/Screenshots/fresnel.jpg)

There are 5 of them:

* ```StandardMaterial.diffuseFresnelParameters```
* ```StandardMaterial.opacityFresnelParameters```
* ```StandardMaterial.reflectionFresnelParameters```
* ```StandardMaterial.emissiveFresnelParameters```
* ```StandardMaterial.refractionFresnelParameters```

## How fresnel is working

A fresnel term is computed by the StandardMaterial in order to change the way a color is applied by using viewing angle.

For instance, you can simulate great glass or reflection effects by just using a simple fresnel. The fresnel will let you have more reflection on edges and not all on the center.

To do so, just use this code:

```javascript
material.reflectionFresnelParameters = new BABYLON.FresnelParameters();
```

You can then control if the reflection is applied on the edges or on the center. For instance, if you want the reflection on the edges (by default), you can control it using the color properties:

```javascript
material.reflectionFresnelParameters.leftColor = BABYLON.Color3.White();
material.reflectionFresnelParameters.rightColor = BABYLON.Color3.Black();
```

![](http://www.babylonjs.com/forumpics/fresnel01.jpg)

Conversely, if you only want reflection in the center:

```javascript
material.reflectionFresnelParameters.leftColor = BABYLON.Color3.Black();
material.reflectionFresnelParameters.rightColor = BABYLON.Color3.White();
```

![](http://www.babylonjs.com/forumpics/fresnel02.jpg)

By using ```bias``` and ```power``` properties, you can control how the fresnel is computed along the surface of the object according to this formula:

_finalFresnelTerm = pow(**bias** + fresnelTerm, **power**)_

By default, bias == 0 and power == 1

For instance, the following code:

```javascript
material.reflectionFresnelParameters = new BABYLON.FresnelParameters();
material.reflectionFresnelParameters.leftColor = BABYLON.Color3.Black();
material.reflectionFresnelParameters.rightColor = BABYLON.Color3.White();
material.reflectionFresnelParameters.power = 4;
```

...generates the following rendering:

![](http://www.babylonjs.com/forumpics/fresnel03.jpg)

## How to use it

A _FresnelParameter_ is defined by the following properties:
* ```isEnabled``` to activate or deactivate fresnel effect
* leftColor to define color used on edges
* rightColor to define color used on center
* bias to define bias applied to computed fresnel term
* power to compute exponent applied to fresnel term

Here is a simple example:

```javascript
material.reflectionTexture = new BABYLON.CubeTexture("Scenes/Customs/skybox/TropicalSunnyDay", scene);
material.diffuseColor = new BABYLON.Color3(0, 0, 0);
material.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
material.alpha = 0.2;
material.specularPower = 16;

// Fresnel
material.reflectionFresnelParameters = new BABYLON.FresnelParameters();
material.reflectionFresnelParameters.bias = 0.1;

material.emissiveFresnelParameters = new BABYLON.FresnelParameters();
material.emissiveFresnelParameters.bias = 0.6;
material.emissiveFresnelParameters.power = 4;
material.emissiveFresnelParameters.leftColor = BABYLON.Color3.White();
material.emissiveFresnelParameters.rightColor = BABYLON.Color3.Black();

material.opacityFresnelParameters = new BABYLON.FresnelParameters();
material.opacityFresnelParameters.leftColor = BABYLON.Color3.White();
material.opacityFresnelParameters.rightColor = BABYLON.Color3.Black();
```

A complete demo can be found here: http://www.babylonjs.com/?FRESNEL
You can also see a demo of refraction fresnel here: http://www.babylonjs-playground.com/#22KZUW#6

If you want to experiment FresnelParameters, just go here: http://www.babylonjs.com/playground/?19
