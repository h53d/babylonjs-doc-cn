---
ID_PAGE: 22011
PG_TITLE: 02. Discover Basic Elements
---
## Introduction

In this tutorial, we are going to learn how to create basic elements using Babylon.js, such as boxes, spheres, and planes.

![Elements](http://urbanproductions.com/wingy/babylon/misc/tut02pic.jpg)

[**Playground Demo Scene 2 - Seven basic shapes/mesh**](http://babylonjs-playground.azurewebsites.net/?2)

## How can I do this ?
An easy way to get started using basic elements... is by visiting [**Playground Demo Scene 02**](http://babylonjs-playground.azurewebsites.net/?2).  You might wish to use the 'Get .zip' choice on its top menu.  The index.html that you will receive in that zip... contains everything you will need to start making basic elements.  Remember that link, as we will talk more about it.

I'm sure you have already read the  [**Babylon.js Primer**](http://doc.babylonjs.com/generals/A_Babylon.js_Primer) and the  [**previous tutorial**](http://doc.babylonjs.com/tutorials/Creating_a_Basic_Scene), and thus you know how to format scene files.  So, we won't talk about that, here.  We are going to go step by step through [**Playground Demo Scene 02**](http://babylonjs-playground.azurewebsites.net/?2).  Open that link in a new tab or window, and then come back here, and we'll get started.

Starting with the box, we create various basic elements, and then position them at the end of the function (to keep them from being atop one another).  Let's talk about each of the basic shapes/meshes.  

* **Creation of a Box**
```javascript
var box = BABYLON.Mesh.CreateBox("box", 6.0, scene, false, BABYLON.Mesh.DEFAULTSIDE);
```
Parameters are: name, size of the box, the scene to attach the mesh, updatable? (if the mesh must be modified later) and the optional side orientation (see below). The last two parameters can be omitted if you just need the default behavior :
```javascript
var box = BABYLON.Mesh.CreateBox("box", 6.0, scene);
```

* **Creation of a Sphere**
```javascript
var sphere = BABYLON.Mesh.CreateSphere("sphere", 10.0, 10.0, scene, false,  BABYLON.Mesh.DEFAULTSIDE);
```
Parameters are: name, number of segments (highly detailed or not), size, scene to attach the mesh, updatable? (if the mesh must be modified later) and the optional side orientation (see below). The last two parameters can be omitted if you just need the default behavior :
```javascript
var sphere = BABYLON.Mesh.CreateSphere("sphere", 10.0, 10.0, scene);
```
Beware to adapt the number of segments to the size of your mesh ;)

* **Creation of a Plane**

```javascript
var plane = BABYLON.Mesh.CreatePlane("plane", 10.0, scene, false, BABYLON.Mesh.DEFAULTSIDE);
```

Parameters are: name, size, and scene to attach the mesh, updatable? (if the mesh must be modified later) and the optional side orientation (see below). The last two parameters can be omitted if you just need the default behavior :
```javascript
var plane = BABYLON.Mesh.CreatePlane("plane", 10.0, scene);
```
* **Creation of a Disc (or a regular polygon)**
```javascript
var disc = BABYLON.Mesh.CreateDisc("disc", 5, 30, scene, false, BABYLON.Mesh.DEFAULTSIDE);
```
Parameters are: name, radius, tessellation, scene, updatable and the optional side orientation (see below). The last two parameters can be omitted if you just need the default behavior :
```javascript
var disc = BABYLON.Mesh.CreateDisc("disc", 5, 30, scene);
```
With the  _tessellation_ value, you can get a regular polygon :  
3 gives a triangle,  
4 a square,  
5 a pentagon,  
6 a hexagon, 7 a heptagon, 8 an octogon, and so on.

* **Creation of a Cylinder**

```javascript
var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 3, 6, 1, scene, false, BABYLON.Mesh.DEFAULTSIDE);
```

Parameters are: name, height, diamTop, diamBottom, tessellation, heightSubdivs, scene, updatable and the optional side orientation (see below). The last two parameters can be omitted if you just need the default behavior :
```javascript
var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 3, 6, 1, scene);
```

* **Creation of a Torus**

```javascript
var torus = BABYLON.Mesh.CreateTorus("torus", 5, 1, 10, scene, false, BABYLON.Mesh.DEFAULTSIDE);
```
Parameters are: name, diameter, thickness, tessellation (highly detailed or not), scene, updatable and the optional side orientation (see below). The last two parameters can be omitted if you just need the default behavior :
```javascript
var torus = BABYLON.Mesh.CreateTorus("torus", 5, 1, 10, scene);
```

* **Creation of a Knot**

```javascript
var knot = BABYLON.Mesh.CreateTorusKnot("knot", 2, 0.5, 128, 64, 2, 3, scene, false, BABYLON.Mesh.DEFAULTSIDE);
```
Parameters are: name, radius, tube, radialSegments, tubularSegments, p, q, scene, updatable and the optional side orientation (see below). The last two parameters can be omitted if you just need the default behavior :
```javascript
var knot = BABYLON.Mesh.CreateTorusKnot("knot", 2, 0.5, 128, 64, 2, 3, scene);
```
You can learn more about torus knots... [**RIGHT HERE**](http://en.wikipedia.org/wiki/Torus_knot).

* **Creation of a Lines Mesh**

```javascript
var lines = BABYLON.Mesh.CreateLines("lines", [
    new BABYLON.Vector3(-10, 0, 0),
    new BABYLON.Vector3(10, 0, 0),
    new BABYLON.Vector3(0, 0, -10),
    new BABYLON.Vector3(0, 0, 10)
], scene);
```
Parameters are: name, [array of comma-separated vectors], scene. 

I could explain how the Lines Mesh constructor works, but I think you can see how it works just by looking at the demo code above.  Notice the [ and ].  Those are the enclosing tokens for an array, yet another kind of Javascript value.  The first vector3 of the array is the starting location for drawing lines.  After that, a comma, and then the next vector3 location... indicating where the line is drawing-to next.  Then, another comma, and another vector3 to a new location.  You can add as many vectors as you wish, but notice that the LAST vector3 does not have a comma following it.  Please make your array of vectors be formatted similarly.    

* **Creation of DashedLines Mesh**

```javascript
var dashedlines = BABYLON.Mesh.CreateDashedLines("dashedLines", [v1, v2, ... vn], dashSize, gapSize, dashNb, scene);
```
Parameters are : name, [array of Vectors3], dashSize, gapSize, dashNumber, scene.    
As for Lines, a line along the vectors3 will be displayed in space. It will try to set _dashNumber_ strokes on this line depending on the length of each segment between two successive vectors3.    
_dashSize_ and _gapSize_ are relative to each other dash and gap sizes within these strokes.   

You might also be interested in our new [LinesSystem](http://doc.babylonjs.com/tutorials/Mesh_CreateXXX_Methods_With_Options_Parameter#linesystem).


* **Creation of a Ribbon**

What is a ribbon ?  

First, imagine a series of successive points defining a path.  
Next, imagine another series of successive points, so another path.  
Now, if you construct triangular faces by joining alternate points of the first and the second path, like when you lace shoes, you get a ribbon.  

Your paths don't need to be parallel. They don't even need to be straight lines or in the same plane.  
They are, well, whatever you want. The ribbon will just follow your paths.  

Now, imagine, instead of having only two paths, you've got many successive different paths.  
The full ribbon will then be the continuous surface joining all these inbetween pair of paths surface.

```javascript
var ribbon = BABYLON.Mesh.CreateRibbon("ribbon", [path1, path2, ..., pathn], false, false, 0, scene, false, BABYLON.Mesh.DEFAULTSIDE);
```

Parameters are: name, pathArray, closeArray, closePath, offset, scene, updatable? (if the mesh must be modified later)  and the optional side orientation (see below).


  * name : a string, the name you want to give to your shape,
  * pathArray : an array populated with paths. Paths are also arrays, populated with series of successive _Vector3_. You need at least one path to construct a ribbon and each path must contain at least four _Vector3_,
  * closeArray : boolean, if true an extra set of triangles is constructed between the last path and the first path of _pathArray_,
  * closePath : boolean, if true the last point of each path of _pathArray_ is joined to the first point of this path,
  * offset : integer (default half the _path_ size) mandatory only if the _pathArray_ contents only one path. The ribbon will be constructed joining each i-th point of the single path to the i+offset-th point. It is ignored if _pathArray_ has more than one path,
  * scene : the current scene object,
  * updatable : boolean, if the ribbon should allow updating later,
  * sideOrientation : the wanted side-orientation (BABYLON.Mesh.FRONTSIDE / BACKSIDE / DOUBLESIDE / DEFAULT).

The last two parameters can be omitted if you just need the default behavior :
```javascript
var ribbon = BABYLON.Mesh.CreateRibbon("ribbon", [path1, path2, ..., pathn], false, false, 0, scene);
```

I you need more details about how to deal with this method, you would probably read the [**Parametric Shapes**](http://doc.babylonjs.com/tutorials/Parametric_Shapes) part.

* ** Creation of a Tube**

```javascript
var tube = BABYLON.Mesh.CreateTube("tube", [V1, V2, ..., Vn], radius, tesselation, radiusFunction, cap, scene, false, BABYLON.Mesh.DEFAULTSIDE);

```
Parameters are : name, path, radius, tesselation, optional radiusFunction, cap, scene, updatable, sideOrientation.

  * name : string, the name of the tube mesh,
  * path : an array of successive Vector3, at least two Vector3,
  * radius : nuumber, the tube radius, used when _radiusFunction_ parameter set to _null_,
  * tesselation : the number of radial segments,
  * radiusFunction : _optional_, a javascript function returns a radius value. This can be set to _null_,
  * cap : BABYLON.Mesh.NO_CAP, BABYLON.Mesh.CAP_START, BABYLON.Mesh.CAP_END, BABYLON.Mesh.CAP_ALL,  
  * updatable : boolean, if the tube should allow updating later,
  * sideOrientation : the wanted side orientation (front, back or double side).

The last two parameters can be omitted if you just need the default behavior :
```javascript
var tube = BABYLON.Mesh.CreateTube("tube", [V1, V2, ..., Vn], radius, tesselation, radiusFunction, cap, scene);
```
The tube can also be used as a [**Parametric Shapes**](http://doc.babylonjs.com/tutorials/Parametric_Shapes) by setting a radius function.



#### Updatable
This parameter, present in each mesh creation method... tells if the mesh can be updated after it is created.  
If false (default value), the mesh data are passed only once to the GPU.  
If true, the mesh data may be recomputed and passed to the GPU at each frame refresh.  

#### Side Orientation
When a mesh is created, an optional side orientation is given to it.  
The side orientation is used to give visibility and/or light reflection to each side of the mesh.  
There are four possible values for this parameter :  

  * BABYLON.Mesh.FRONTSIDE,
  * BABYLON.Mesh.BACKSIDE,
  * BABYLON.Mesh.DOUBLESIDE,
  * BABYLON.Mesh.DEFAULT which is the default value and equals FRONTSIDE currently.

This parameter is optional. If not given, the DEFAULT value is set.

*(We assume the backFaceCulling is enabled by default)*  

For instance, imagine you create a basic shape like a box, a sphere or a plane, and you don't give it a material.   
If you go behind the plane or inside the box or the sphere, you will notice that the faces aren't visible any longer : Babylon.js mesh are often constructed with the default side orientation _FRONTSIDE_. This means that each side only has a front view.  
Test it : http://www.babylonjs-playground.com/#14RNAU#4  

If you apply a test material to your mesh, set _material.backFaceCulling = false;_, and light it up, you will notice that the back (or internal) face... is now visible, but it doesn't reflect the light.  Same reason : the default side orientation is still _FRONTSIDE_.  
*(You can disable _backFaceCulling_ with this _sideOrientation_ value)*

Now, just change the _sideOrientation_ parameter in your mesh constructor... to _BABYLON.Mesh.BACKSIDE_.  (Remove your test material, too.)  You can only see the backs of planes, or only see the insides (internal faces) of the box and sphere.  
Test it : http://www.babylonjs-playground.com/#14RNAU#5

If you give your mesh some material, you can see that the light now only reflects on the back face (plane) or only inside (box, sphere, etc).  
*(you can disable _backFaceCulling_ with this _sideOrientation_ value)*


At last, change the _sideOrientation_ parameter to _BABYLON.Mesh.DOUBLESIDE_.  
As you guessed, the mesh faces are now visible on both sides. And if you give it a material, the light then reflects from both sides, too.  
Test it : http://www.babylonjs-playground.com/#14RNAU#6   

So why not always use _BABYLON.Mesh.DOUBLESIDE_ by default ?  

Because this value creates twice the vertices of a frontside mesh. In other terms, your mesh will be twice heavier.  
*(you shouldn't disable _backFaceCulling_ with _BABYLON.Mesh.DOUBLESIDE_ value)*



### More Basic Elements - Grounds
Up to this point, we have been talking about basic elements from our [**Playground Demo Scene 02**](http://babylonjs-playground.azurewebsites.net/?2), but a few important mesh shapes (basic elements) are not included in that demo scene.  They are each ways of making 'ground' in Babylon.js.  Let's take a look: 

* **Creation of a Ground**

```javascript
var ground = BABYLON.Mesh.CreateGround("ground", 6, 6, 2, scene);
```

Parameters are: name, width, depth, subdivs, scene

Our [**Playground Demo Scene 01**](http://www.babylonjs-playground.com/?1) uses a CreateGround constructor... so you can see one in action by using the above link.

* **Creation of a Ground From HeightMap**

```javascript
var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "heightmap.jpg", 200, 200, 250, 0, 10, scene, false, successCallback);
```
Parameters are: name, heightmapPath, width, depth, subdivs, minheight, maxheight, scene, updatable, successCallback

HeightMap grounds are easy, but we decided to create a separate tutorial so we could say more about this important Babylon.js feature. Please see our [**HeightMap Tutorial**](http://doc.babylonjs.com/tutorials/Height_Map) to learn all about heightMap grounds.

* **Create of a Tiled Ground**

Thanks to forum user Kostar111 for this handy Tiled Ground constructor. Here is the basic code needed to create a tiled ground.

```javascript

var precision = {
    "w" : 2,
    "h" : 2
};
var subdivisions = {
    'h' : 8,
    'w' : 8
};
var tiledGround = BABYLON.Mesh.CreateTiledGround("Tiled Ground", -3, -3, 3, 3, subdivisions, precision, scene, false);
```

Parameters are: name, xmin, zmin, xmax, zmax, subdivisions = the number of tiles. (subdivisions.w : in width; subdivisions.h: in height), precision = the number of subdivisions inside a tile. (precision.w : in width; precision.h: in height), scene, updatable.

Kostar111 was also kind enough to give us a fine tutorial about how to use tiled grounds. [**Click right here**](http://makina-corpus.com/blog/metier/how-to-use-multimaterials-with-a-tiled-ground-in-babylonjs) to view it. At that link, Kostar111 thoroughly explains how the tiled ground works, and also provides some Babylon.js Playground scenes that nicely demonstrate some of its many uses.

## Wrapping Up ##
And that’s it! Now you have seen all of our basic elements, and some ways to use them. Keep watching this area of the tutorial for new basic elements, as they are being added quite quickly : you'll find the updated list with all parameter explanations [**in this section**](http://doc.babylonjs.com/tutorials/Mesh_CreateXXX_Methods_With_Options_Parameter). 
Feel free to imagine a few of your own basic element ideas, and present them on the forum. Help us make our list of basic elements grow, if you can.  

## Next step ##
----
We saw that we needed a bit of 'positioning' to keep our basic elements from sitting atop one another in the scene. Now let's learn more about positions (sometimes called translations) as well as about rotation and scaling. Ready? Sure you are! [**Click here for the next tutorial.**](http://doc.babylonjs.com/tutorials/Materials)
