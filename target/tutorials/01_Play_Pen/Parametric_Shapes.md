---
ID_PAGE: 24847
PG_TITLE: Parametric Shapes
---
## Introduction

The basic meshes you've seen up until now have an expected shape : when you create a sphere mesh, you expect to see a spherical shape. The same goes for a box mesh, a torus, a cylinder, etc.

There is another kind of mesh whose final shapes aren't fixed. Their final shape depends upon some parameters. So we call these meshes "Parametric Shapes".

## The Ribbon

The ribbon is a very simple and versatile shape. As it is very elementary, you can model almost any shape using a ribbon or many merged ribbons.

![Ribbon](http://jerome.bousquie.fr/BJS/images/ribbon.png)

```javascript
CreateRibbon(name, pathArray, closeArray, closePath, offset, scene, updatable, sideOrientation);
```
  * **name** : string.
  * **pathArray** : an array of paths.  
As explained in the [Basic Elements](02. Discover Basic Elements) section, the ribbon is the surface between two, or more, paths.  
A path is a series of successive points in space (Vector3).  
So a path can be designed by many ways : you can set points manually, import them from some set of data (json, etc), compute them with some maths function ... or even a bit of all of this.  
The javascript representation of a path is simply an array of Vector3.  
A path must have at least two points (four points if you provide a single path). 
In order to create a ribbon, you just have to pass an array of paths. This array can contain only one path and in this case, the _offset_ parameter is used. 

  * **closeArray** : _default False_  boolean, if true an extra set of triangles is constructed between the last path and the first path of pathArray.
example : http://www.babylonjs-playground.com/#295H7U  
Here we populate an array called _paths_ with many path arrays.  
Each _path_ array is populated itself with Vector3 along a Bézier curve. Anything else could have been chosen for this example, but I love this strange shape.  
Before dealing with the ribbon, we just display each path with the _CreateLines()_ method so we can figure out what these paths look like. As we can see, the curves are side by side around an incomplete circle.  
If we apply this _paths_ array to a ribbon mesh, we get this : http://www.babylonjs-playground.com/#295H7U#1  
You can see that a surface is constructed between each _path_ as expected.  
Here is the same with a plain material ans still the _paths_ displayed : http://www.babylonjs-playground.com/#295H7U#2  
If we set _closeArray_ to _true_, the missing surface between the first and the last _paths_ is then constructed : http://www.babylonjs-playground.com/#295H7U#3  
The mesh becomes then a real closed volume and the light reflects in a continuous way along its surface.  


  * **closePath** : _default False_ boolean, if true the last point of each path of _pathArray_ is joined to the first point of this same path.  
example : http://www.babylonjs-playground.com/#1TDTHJ  
Here is some kind of unclosed tubular ribbon. 
It is made with only two paths _path1_ and _path2_ each following an incomplete circle.   
If we set the _closePath_ to _true_ (http://www.babylonjs-playground.com/#1TDTHJ#1), you can notice that _path1_ and _path2_ are now closed and two triangles are added between the beginning and the end of each path.  
If we give this ribbon a plain material, you can then notice it is really closed as the normals are computed to reflect the light in a continuous way : http://www.babylonjs-playground.com/#1TDTHJ#2  
Here is the example of the former _closeArray_ parameter with _closeArray_ and _closePath_ set to true : http://www.babylonjs-playground.com/#295H7U#4  

  * **offset** : _default half size of the pathArray length_, mandatory only for pathArray containing a single path.  
example : http://www.babylonjs-playground.com/#1W5VJN#14
Here is a single path _path1_, a simple helix. It is just shown with _CreateLines()_.  
We can populate the _pathArray_ with this single path : _[path1]_  
In this case, the ribbon will be constructed by joining each point of the path to another point located _offset_ positions further in the path. Example : _offset = 10_, the point 1 will be joined to the point 11, the point 2 to the point 12, etc.  
If you don't provide an _offset_ value, or if you provide a value greater than half of_path1 length, the _offset_ will be set by default to half of _path1_ length.  
Back to our example : http://www.babylonjs-playground.com/#1W5VJN#15  
_Offset_ is set to 20 here.  
Let's change it to 5 : http://www.babylonjs-playground.com/#1W5VJN#16  
So this parameter allows you to construct different meshes from a same single path.  
So playing with _offset_, _closeArray_, or other parameters, you can easily get volumic shapes, even with a single path : http://www.babylonjs-playground.com/#1W5VJN#17  
 
  * **updatable** : boolean, true if the ribbon could updated after creation
 
  * **sideOrientation** : _default DEFAULTSIDE_
  possible other values :  
    * BABYLON.Mesh.FRONTSIDE
    * BABYLON.Mesh.BACKSIDE
    * BABYLON.Mesh.DOUBLESIDE  
    see full explanation about _sideOrientation_ parameter in [**02-Basic elements**](http://doc.babylonjs.com/page.php?p=22011)

If you need more details about ribbon uses, you might want to read the [Ribbon Tutorial]() part.


## The Tube
Basically a tube is just a curved (or not) cylinder.  
However it can be far more than just a cylinder if you consider it as a parametric shape.  
Example with a simple cos/sin path :  http://www.babylonjs-playground.com/#LG3GS#8    

```javascript
var tube =  BABYLON.Mesh.CreateTube(name, path, radius, tessellation, radiusFunction, cap, scene, updatable?, sideOrientation);
```
  * **name** : string.
  * **path** : an array of successive Vector3. It represents the path the tube will be constructed along. This path is the central axis of the tube. This array must have at least two Vector3. The first point is the start of the tube and the last point is the end of the tube. So having only two points, you get a simple cylinder.  
This path can be filled as you like : manually, by importing Vector3 from a data set, with some maths function or even a bit of all of this. It's just an array filled with Vector3 to set where the tube axis goes into space.  
  * **radius** : a radius number value. This is the constant radius value applied along the tube. This value is taken into account only if the _radiusFunction_ parameter is _null_.  
  * **tessellation** : the number of radial segments. If you set it to 3 you get a triangular tube section, if you set to 4 you get a squared section, and so on. So set it to what level of precision you need, just keep in mind the more segments, the heavier your mesh.  
  *  **cap** : BABYLON.Mesh.NO_CAP, BABYLON.Mesh.CAP_START, BABYLON.Mesh.CAP_END, BABYLON.Mesh.CAP_ALL.  
  *  **radiusFunction** : a custom javascript function.  
If you pass this parameter to the _CreateTube()_ method, then the _radius_ parameter value will be ignored.  
Your custom function will be called at each point of the path while constructing the tube.  
It will then be passed two arguments : the position of the current point _i_ and the _distance_ of this _i-th_ point from the beginnig of the tube.  
Your function must just return a radius value.  
Example :
```javascript
var myFunction = function(i, distance) {
  var radius = 3 * Math.cos(distance / 5);
  return radius;
};
var tube = BABYLON.Mesh.CreateTube("lumps", path, null, 20, myFunction, scene);
```

Here is an example with both an _i_ sinusoidal radius function and _x_ sinusoidal incrementing path :
http://www.babylonjs-playground.com/#LG3GS#9    
Here's another example with a circular path and varying radius : http://www.babylonjs-playground.com/#LG3GS#10    

## Extrusion
What is extrusion ?  
Extrusion is the way to transform a 2D shape into a volumic shape.  
Let's imagine that you define a star shape by filling an array with successive _Vector3_. In order to have a 2D shape, you only set these points in the xOy plane, so every z coordinate is zero.  
ex : http://www.babylonjs-playground.com/#RF9W9  
Let's show the World axis so it is clearer : http://www.babylonjs-playground.com/#RF9W9#1  
Let's now imagine you could stretch this 2D shape along the Z-axis to give it some volume... this is extrusion :  http://www.babylonjs-playground.com/#RF9W9#30    

Let's now imagine you can extrude your star along a 3D path in space, a sinus curve for example, and not only along the z-axis.  
http://www.babylonjs-playground.com/#RF9W9#31    


Extrusion can be accomplished with two different methods. A basic one and an advanced or custom one.  

BASIC METHOD  
```javascript
BABYLON.Mesh.ExtrudeShape(name, shape, path, scale, rotation, cap, scene, updatable?, sideOrientation)
```
* **name** : the extruded mesh name.
* **shape** : the shape to be extruded, an array of successive Vector3.
* **path** : the path to extrude the shape along, an array of successive Vector3.
* **scale** : _default 1_, the value to scale the initial shape.
* **rotation** : _default 0_, the step value to rotate the shape at each path point.
*  **cap** : BABYLON.Mesh.NO_CAP, BABYLON.Mesh.CAP_START, BABYLON.Mesh.CAP_END, BABYLON.Mesh.CAP_ALL.  
* **scene** : the current scene.
* **updatable?** : if the mesh is updatable.
* **sideOrientation** : the side orientation - _front, back_ or _double_.  

If we change the _scale_ value from 1 to 3 for example (line 84), the initial star is scaled to 3 along the curve : http://www.babylonjs-playground.com/#RF9W9#4  
If we now change the _rotation_ step value from 0 to _PI / 24_ for example, the curve is twisted this angle at each curve point : http://www.babylonjs-playground.com/#RF9W9#218  

Of course, even if you define your 2D shape in the xOy plane as described, the extrusion still works along any path direction : http://www.babylonjs-playground.com/#RF9W9#32    

Moreover, the shape doesn't need to be closed. You can have a simple (or complex) open shape : http://www.babylonjs-playground.com/#RF9W9#7  
Extrusion : http://www.babylonjs-playground.com/#RF9W9#33      
Extrusion with rotation : http://www.babylonjs-playground.com/#RF9W9#34    

Remember that your shape doesn't need to be centered on the coordinate system either. Here is an offset simple shape : http://www.babylonjs-playground.com/#RF9W9#10  
Extrusion (the extrusion path is shown in magenta so the offset is visible) : http://www.babylonjs-playground.com/#RF9W9#35    
Now rotation... around the path axis : http://www.babylonjs-playground.com/#RF9W9#36    
As you can see, this is a way to build complex curved helix meshes without handling maths or simpler ones : http://www.babylonjs-playground.com/#RF9W9#37    
As the shape to be extruded is unpredictable, it is assumed that the cap, if want to add it one or two to your extruded mesh, is computed with its center set to the shape barycenter.  



ADVANCED METHOD  
```javascript
BABYLON.Mesh.ExtrudeShapeCustom(name, shape, path, scaleFunction, rotateFunction, ribbonCloseArray, ribbonClosePath, cap, scene)
```
* **name** : the extruded mesh name,
* **shape** : the shape to be extruded, an array of successive Vector3.
* **path** : the path to extrude the shape along, an array of successive Vector3.
* **scaleFunction** : a custom javascript function. This function is called on each path point and is given the _i_ position of the point in the path and its _distance_ from the begining of the path. It must return a _scale_ numeric value. This value will be the scaling applied to the shape drawn at the _i-th_  point.
* **rotationFunction** : a custom javascript function. This function is called on each path point and is given the _i_ position of the point in the path and its _distance_ from the begining of the path. It must return a _rotation_ numeric value. This value will be the rotation applied to the shape drawn at the _i-th_  point.
* **ribbonCloseArray** : _default false_, boolean. The underlying ribbon _closeArray_  parameter. This can be used to automatically close a path with right normals computation.
* **ribbonClosePath** : _default false_, boolean. The underlying ribbon _closePath_  parameter. This can be used to automatically close a shape with right normals computation.  
*  **cap** : BABYLON.Mesh.NO_CAP, BABYLON.Mesh.CAP_START, BABYLON.Mesh.CAP_END, BABYLON.Mesh.CAP_ALL.  
* **scene** : the current scene.
* **updatable?** : if the mesh is updatable.
* **sideOrientation** : the side orientation - _front, back_ or _double_.

In this advanced method, the _scale_ and _rotation_ parameters are replaced by custom functions.  

  **_scaleFunction_**   
This javascript function will be called on each path point iteration when extruding. It will be passed two parameters : _i_ and _distance_.  

* **i** is the point position in the path, starting from zero for the first point.
* **distance** is the current point distance from the begining of the path.  

This custom function must return a _scale_ numeric value which will be applied to the shape on the _i-th_ point.  
Example :
```javascript
var myScale = function(i, distance) {
  var scale = 2 * Math.sin(i / 5);
  return scale;
};
```

Here is an example with an unclosed un-centered simple shape whose scale evolves linearly along the path : http://www.babylonjs-playground.com/#RF9W9#38    
Now if we use a sinus scaling function instead and as the shape isn't centered, we get interesting results : http://www.babylonjs-playground.com/#RF9W9#39    
We can even emulate rotation by alternately scaling positive/negative : http://www.babylonjs-playground.com/#RF9W9#40    


  **_rotateFunction_**  
This javascript function will be called on each path point iteration when extruding. It will be passed two parameters : _i_ and _distance_.  

* **i** is the point position in the path, starting from zero for the first point.
* **distance** is the current point distance from the begining of the path. 

This custom function must return a _rotation_ numeric value which will be applied to the shape on the _i-th_ point.  
Example :
```javascript
var myRotation = function(i, distance) {
  var rotation = distance / 20;
  return rotation;
};
```
Here is an example of constant scale and rotation evolving with the distance : http://www.babylonjs-playground.com/#RF9W9#41    
You can set a non-linear rotation function of course, sinus here : http://www.babylonjs-playground.com/#RF9W9#42    



  **Fixed values**

This advanced method needs two custom functions. But you may want to use a custom scale function with a fixed (or no) rotation function, for example. In this case, just pass a custom rotation function returning a fixed value :  
Example :  
```javascript
var noRotation = function(i, distance) {
  return 0;
};
```
If you carefully read the code of this previous example, you can see in line 41 that the _scaleFunction_ returns the constant 1 value : http://www.babylonjs-playground.com/#RF9W9#41      

  **_ribbonCloseXXX_ parameters**

The extruded mesh is based on an underlying ribbon. When you extrude a shape, you actually make a particular ribbon.  
This means you can also set this ribbon _closeArray_ and _closePath_ parameter if you need to automatically close the extruded shape.  
NOTE : the _closeXXX_ names are the ribbon ones. Not the extruded shape ones.  
So it may be confusing because :  

* **_ribbonCloseArray_** set to true will close your shape extrusion path,
* **_ribbonClosePath_** set to true will close your shape itself (if unclosed).  

Let's now do this unclosed, un-centered extruded shape : http://www.babylonjs-playground.com/#RF9W9#20  
And this almost circular path : http://www.babylonjs-playground.com/#RF9W9#21  
Extrusion with constant scale and no rotation : http://www.babylonjs-playground.com/#RF9W9#43    
Now let's set the _ribbonCloseArray_ to true :http://www.babylonjs-playground.com/#RF9W9#44    
As you can see, it closes the extrusion path. Let's set it back to false and let's set the _ribbonClosePath_ to true instead : http://www.babylonjs-playground.com/#RF9W9#45    
Now the shape is closed.  
Both together : http://www.babylonjs-playground.com/#RF9W9#46    


 **Summary**  
At last, the extrude custom function call would be, for example:  
```javascript
BABYLON.Mesh.ExtrudeShapeCustom("extruded", shape, path, myScale, myRotation, false, true, scene)
```
A shape is an array of successive Vector3. This means 2D or 3D shapes can be extruded as well.  
The shape is to be designed in the local coordinate system knowing that the z-axis will be the extrusion path axis.  
Finally, shapes don't have to be centered in the local coordinate system.  
A centered shape will be extruded symmetrically centered along the path axis. An un-centered shape will be extruded offset from the path axis.  

Easy way to generate strange shapes : http://www.babylonjs-playground.com/#RF9W9#47   