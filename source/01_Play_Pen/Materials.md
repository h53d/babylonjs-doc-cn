---
ID_PAGE: 22051
PG_TITLE: 04. Materials
---
## Introduction

Now that you can create different basic mesh elements anywhere in the scene, we are going to give those meshes some materials, to define how those mesh look.

![Elements](http://www.babylonjs.com/tutorials/04%20-%20Materials/04.png)

[**Playground Demo Scene 4 - Materials**](http://www.babylonjs.com/playground/?4)

## How can I do this ?
We are so adept at making createScene functions that we can do it in our sleep, right? So let's get rolling with an omni-directional PointLight and an orbiting ArcRotateCamera.  After that, we'll start making some basic mesh elements to test our materials upon.

```javascript
function createScene() {
    var scene = new BABYLON.Scene(engine);
    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 100, 100), scene);
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 100, new BABYLON.Vector3.Zero(), scene);

    //Creation of spheres
    var sphere1 = BABYLON.Mesh.CreateSphere("Sphere1", 10.0, 6.0, scene);
    var sphere2 = BABYLON.Mesh.CreateSphere("Sphere2", 2.0, 7.0, scene);
    var sphere3 = BABYLON.Mesh.CreateSphere("Sphere3", 10.0, 8.0, scene);
[…]
    //Positioning the meshes
    sphere1.position.x = -40;
    sphere2.position.x = -30;
```

So far, you only have some grey-colored meshes. How drab! To apply a material to them, you will need to create a new material object like this:
```javascript
var materialSphere1 = new BABYLON.StandardMaterial("texture1", scene);
```

And apply this material to the object of your choice, e.g.:
```javascript
sphere1.material = materialSphere1;
```
Or, create and apply all in one step:
```javascript
sphere1.material = new BABYLON.StandardMaterial("texture1", scene);
```

“I tested my scene, and …nothing changed…”

Exactly, because this material is the default one. You have to customize it as you like. You won’t change the mesh itself, but just the material.

“So how can I adjust my material to give the perfect look to my object?”

That is done by setting the properties on the material.  Let's see what they are:

* **Transparency** (alpha channel)

Alpha compositing and transparency in general can be a bit complex. A specific article about that can be found [here](page.php?p=25100). You might also want to read [the wikipedia page about it](http://en.wikipedia.org/wiki/Alpha_compositing).  You will encounter even more uses for it when you enjoy the BabylonJS particle system, and BabylonJS sprites system. 

 Alpha transparency, written in percent (%), can be applied to a material in this way:
```javascript
materialSphere1.alpha = 0.5;
```

* **Diffuse**

The diffuse is the native color of the object material once it is lit with a light. You can specify a solid color with the ```diffuseColor``` property:
```javascript
materialSphere1.diffuseColor = new BABYLON.Color3(1.0, 0.2, 0.7);
```

Or, you can use a texture:
```javascript
materialSphere1.diffuseTexture = new BABYLON.Texture("grass.png", scene);
```

![tof](http://www.babylonjs.com/tutorials/04%20-%20Materials/04-1.png)

**More About Textures:** Be sure to use the correct path to your image (relative or absolute path). Supported image formats include JPG, PNG, JPEG, BMP, GIF… (every image format supported by your browser).

If you want to translate (offset) your texture on your mesh, you can use the “uOffset” and “vOffset” properties:
```javascript
materialSphere1.diffuseTexture.uOffset = 1.5;
materialSphere1.diffuseTexture.vOffset = 0.5;
```
And if you want to repeat/tile an image pattern (e.g. grass texture), you can use the “uScale” and “vScale” properties:
```javascript
materialSphere1.diffuseTexture.uScale = 5.0;
materialSphere1.diffuseTexture.vScale = 5.0;
```

Remember that (u, v) coordinates refer to the following axis:

![tof](/img/tutorials/crate.jpg)

And if your texture has some alpha, you will need to specify it:
```javascript
materialSphere1.diffuseTexture.hasAlpha = true;
```

In this case, alpha is used for alpha testing. But you may want to use it for alpha blending. To do so, just set ```materialSphere1.useAlphaFromDiffuseTexture```

All of these texture settings apply to the other StandardMaterial properties as well. (.emissiveTexture, .ambientTexture, .specularTexture)  I will remind you.  Now let's continue talking about the other StandardMaterial properties.


* **Emissive**

The emissive is the color produced by the object itself. You can specify a solid color with the ```emissiveColor``` property:
```javascript
materialSphere1.emissiveColor = new BABYLON.Color3(1, .2, .7);
```

Or, you can use a texture:
```javascript
materialSphere1.emissiveTexture = new BABYLON.Texture("grass.png", scene);
```
See the **More About Textures** section above.  Change occurrences of 'diffuse' to 'emissive', of course.

* **Ambient**

The ambient can be seen as a second level of diffuse. The produced color is multiplied to the diffuse color. This is especially useful if you want to use light maps baked into textures. You can specify a solid color with the ```ambientColor``` property:
```javascript
materialSphere1.ambientColor = new BABYLON.Color3(1, 0.2, 0.7);
```
Or, you can use a texture:
```javascript
materialSphere1.ambientTexture = new BABYLON.Texture("grass.png", scene);
```
See the **More About Textures** section above.  Change occurrences of 'diffuse' to 'ambient', of course.

* **Specular**

The specular is the color produced by a light reflecting from a surface. You can specify a solid color with the ```specularColor``` property:
```javascript
materialSphere1.specularColor = new BABYLON.Color3(1.0, 0.2, 0.7);
```
Or, you can use a texture:
```javascript
materialSphere1.specularTexture = new BABYLON.Texture("grass.png", scene);
```
When using a texture you can set ```materialSphere1.useGlossinessFromSpecularMapAlpha``` to true to use specular map alpha as glossiness level.

You can also control how specular behaves with alpha. By default, specular does not interact with alpha, but you can set ```materialSphere1.useSpecularOverAlpha``` to true to have alpha inversely proportional to specular value.

Again, see the **More About Textures** section far above.  Change occurrences of 'diffuse' to 'specular', of course.

The specular property has one more setting.  The size/intensity of the specular reflection can be set using the ```specularPower``` property:
```javascript
materialSphere1.specularPower = 32;
```


*** Section on OpacityTexture needed here, coming soon. ***


There, we have visited the primary color and texture properties of StandardMaterial.  But we are not done yet.  Here are a few more handy properties.

* **Back-Face Culling**

Simply put, “back-face culling” determines whether or not a StandardMaterial is visible from its back side (from behind).  TRUE = NOT visible.  More precisely, this rendering-speed-optimization technique determines if a polygon of a graphical object is visible or not. If set to TRUE or boolean 1, the  Babylon engine won’t render hidden face(s) of the meshes that use this material. It is set TRUE by default, but can be changed to false as wanted. You may want to read more about back-face culling at [the wikipedia page about it](http://en.wikipedia.org/wiki/Back_face_culling).  

In this example, the texture has some alpha, and back-face culling is set to false for the front sphere... in order to see its black inside face:

![tof](http://www.babylonjs.com/tutorials/04%20-%20Materials/04-2.png)

```javascript
materialSphere1.backFaceCulling = false;
```

* **WireFrame**

You can see your object in wireframe mode... by using:
```javascript
materialSphere1.wireframe = true;
 ```

![tof](http://www.babylonjs.com/tutorials/04%20-%20Materials/04-3.png)

Again, you can see things from this tutorial... come to life... by browsing to [the Babylon.js Playground scene 4](http://www.babylonjs.com/playground/?4).

More information about materials can be found by reading [**Unleash the StandardMaterial**](http://blogs.msdn.com/b/eternalcoding/archive/2013/07/01/babylon-js-unleash-the-standardmaterial-for-your-babylon-js-game.aspx) and also [**Advanced Texturing**](http://doc.babylonjs.com/tutorials/Advanced_Texturing).

##Next step##
----
Great, your scene is looking better than ever with those materials! Later we will see how to use advanced techniques with materials. But for now, we have to learn [**how to use cameras**](http://doc.babylonjs.com/tutorials/Cameras).
