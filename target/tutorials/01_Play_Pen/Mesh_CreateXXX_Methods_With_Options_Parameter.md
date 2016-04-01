##MeshBuilder CreateXXX() Methods With Options Parameter
In this tutorial, we will learn how to use the classical _CreateXXX()_ methods with the _options_ parameter instead of the full list of parameters.  
Indeed, as for BJS 2.3+, all the _CreateXXX()_ methods can be called either by 
```javascript
var mesh = BABYLON.Mesh.CreateMesh(name, param1, param2, param3, ..., scene);
```
either by
```javascript
var mesh = BABYLON.MeshBuilder.CreateMesh(name, {param1 : val1, param2: val2}, scene);
```

Why to use then the _options_ parameter if it only does the same as the parameter list ?

Because it doesn't do just only the same ...  
Depending on the shape type, it allows to make some (or all) parameters optional or it provides more features to the created mesh.  

###Fixed Shapes
We call _fixed shapes_ all the mesh types that are not parametric, it is to say all the mesh types what have an expected final shape.  
For instance, if we create a _Sphere_ or a _Box_ mesh, we expect to get a spherical or a cubic shape whereas if we create a _Ribbon_ mesh, as it depends upon a data set to be created (the _pathArray_), we can't predict its final shape.  

All fixed shapes can be created by default by using a blank _options_ parameter :
```javascript
var cylinder = BABYLON.MeshBuilder.CreateCylinder("cyl", {}, scene);
```
This means all the _options_ properties are simply optional.  

####Box
Example :
```javascript
var box = BABYLON.MeshBuilder.CreateBox("box", {height: 5, faceColors: myColors}, scene);
```
Properties, all optional :

property|value|default value
--------|-----|------------
size|_(number)_ size of each box side|1
height|_(number)_ height size, overwrites _size_ property|size
width|_(number)_ width size, overwrites _size_ property|size
depth|_(number)_ depth size,  overwrites _size_ property|size 
faceColors|_(Color4[])_ array of 6 _Color4_, one per box face|Color4(1, 1, 1, 1) for each side
faceUV|_(Vector4[])_ array of 6 _Vector4_, one per box face| UVs(0, 0, 1, 1) for each side
updatable|_(boolean)_ true if the mesh is updatable|false
sideOrientation|_(number)_ side orientation|DEFAULTSIDE
To understand how to set _faceUV_ or _faceColors_, please read this : http://doc.babylonjs.com/tutorials/CreateBox_Per_Face_Textures_And_Colors

####Sphere
Example :
```javascript
var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, diameterX: 3}, scene);
```
Properties, all optional :

property|value|default value
--------|-----|-------------
segments|_(number)_ number of horizontal segments|32
diameter|_(number)_ diameter of the sphere|1
diameterX|_(number)_ diameter on X axis, overwrites _diameter_ property|diameter
diameterY|_(number)_ diameter on Y axis, overwrites _diameter_ property|diameter
diameterZ|_(number)_ diameter on Z axis, overwrites _diameter_ property|diameter
arc|_(number)_ ratio of the circumference (latitude) between 0 and 1|1
slice|_(number)_ ratio of the height (longitude) between 0 and 1|1
updatable|_(boolean)_ true if the mesh is updatable|false
sideOrientation|_(number)_ side orientation|DEFAULTSIDE

####Cylinder or Cone
If you set _diameterTop_ to zero, you get a cone instead of a cylinder.
Example :
```javascript
var cone = BABYLON.MeshBuilder.CreateCylinder("cone", {diameterTop: 0, tessellation: 4}, scene);
```
Properties, all optional :

property|value|default value
--------|-----|-------------
height|_(number)_ height of the cylinder|2
diameterTop|_(number)_ diameter of the top cap, can be zero to create a cone, overwrites the _diameter_ property|1
diameterBottom|_(number)_ diameter of the bottom cap, can't be zero, overwrites the _diameter_ property|1
diameter|_(number)_ diameter of both caps|1
tessellation|_(number)_ number of radial sides|24
subdivisions|_(number)_ number of rings|1
faceColors|_(Color4[])_ array of 3 _Color4_, 0 : bottom cap, 1 : cylinder tube, 2 : top cap|Color4(1, 1, 1, 1) for each face
faceUV|_(Vector4[])_ array of 3 _Vector4_, 0 : bottom cap, 1 : cylinder tube, 2 : top cap| UVs(0, 0, 1, 1) for each face
arc|_(number)_ ratio of the circumference between 0 and 1|1
updatable|_(boolean)_ true if the mesh is updatable|false
sideOrientation|_(number)_ side orientation|DEFAULTSIDE
To understand how to set _faceUV_ or _faceColors_, please read this by considering 3 faces only : http://doc.babylonjs.com/tutorials/CreateBox_Per_Face_Textures_And_Colors

####Plane
Example :
```javascript
var plane = BABYLON.MeshBuilder.CreatePlane("plane", {width: 5}, scene);
```
Properties, all optional :

property|value|default value
--------|-----|-------------
size|_(number)_ side size of the plane|1
width|_(number)_ size of the width|size
height|_(number)_ size of the height|size
updatable|_(boolean)_ true if the mesh is updatable|false
sideOrientation|_(number)_ side orientation|DEFAULTSIDE
sourcePlane|_(Plane)_ source plane (math) the mesh will be transformed to|null

####Ground
Example :
```javascript
var ground = BABYLON.MeshBuilder.CreateGround("gd", {width: 6, subdivsions: 4}, scene);
```
Properties, all optional :

property|value|default value
--------|-----|-------------
width|_(number)_ size of the width|1
height|_(number)_ size of the height|1
updatable|_(boolean)_ true if the mesh is updatable|false
subdivisions|_(number)_ number of square subdivisions|1

####Ground From a Height Map
Example :
```javascript
var ground = BABYLON.MeshBuilder.CreateGroundFromHeightMap("gdhm", url, {width: 6, subdivsions: 4}, scene);
```
Don't forget the _url_ parameter.  

Properties, all optional :

property|value|default value
--------|-----|-------------
width|_(number)_ size of the map width|10
height|_(number)_ size of the map height|10
subdivisions|_(number)_ number of map subdivisions|1
minHeight|_(number)_ minimum altitude|0
maxHeigth|_(number)_ maximum altitude|1
onReady|_(function)_ a callback js function that is called and passed the just built mesh|(mesh) => {return;}
updatable|_(boolean)_ true if the mesh is updatable|false

####Tiled Ground
Example :
```javascript
var tiledGround = BABYLON.MeshBuilder.CreateTiledGround("tgd", {subdivsions: {w:4, h:6} }, scene);
```
Properties, all optional :

property|value|default value
--------|-----|-------------
xmin|_(number)_ map min x coordinate value|-1
zmin|_(number)_ map min z coordinate value|-1
xmax|_(number)_ map max x coordinate value|1
zmin|_(number)_ map max z coordinate value|1
subdivisions|_( {w: number, h: number} )_ number of subdivisions (tiles) on the height and the width of the map|{w: 6, h: 6}
precision|_( {w: number, h: number} )_ number of subdivisions on the height and the width of each tile|{w: 2, h: 2}
updatable|_(boolean)_ true if the mesh is updatable|false


####Disc
Remembe you can create any kind of regular plane polygon with _CreateDisc()_  
Example :  
```javascript
var disc = BABYLON.MeshBuilder.CreateDisc("disc", {tessellation: 3}, scene); // makes a triangle
```
Properties, all optional :

property|value|default value
--------|-----|-------------
radius|_(number)_ the radius of the disc or polygon|0.5
tessellation|_(number)_ the number of disc/polygon sides|64
arc|_(number)_ ratio of the circumference between 0 and 1|1
updatable|_(boolean)_ true if the mesh is updatable|false
sideOrientation|_(number)_ side orientation|DEFAULTSIDE

####Torus
Example :
```javascript
var torus = BABYLON.MeshBuilder.CreateTorus("torus", {thickness: 0.2}, scene);
```
Properties, all optional :

property|value|default value
--------|-----|-------------
diameter|_(number)_ diameter of the torus|1
thickness|_(number)_ thickness of its tube|0.5
tessellation|_(number)_ number of segments along the circle|16
updatable|_(boolean)_ true if the mesh is updatable|false
sideOrientation|_(number)_ side orientation|DEFAULTSIDE

####Torus Knot
Example :
```javascript
var torus = BABYLON.MeshBuilder.CreateTorusKnot("tk", {}, scene);
```
Properties, all optional :

property|value|default value
--------|-----|-------------
radius|_(number)_ radius of the torus knot|2
tube|_(number)_ thickness of its tube|0.5
radialSegments|_(number)_ number of radial segments|32
tubularSegments|_(number)_ number of tubular segments|32
p|_(number)_ number of windings|2
q|_(number)_ number of windings|3
updatable|_(boolean)_ true if the mesh is updatable|false
sideOrientation|_(number)_ side orientation|DEFAULTSIDE

####Polyhedron
Example :
```javascript
var octahedron = BABYLON.MeshBuilder.CreatePolyhedron("oct", {type: 1, size: 3}, scene);
```
Properties, all optional :

property|value|default value
--------|-----|-------------
type|_(number)_ polyhedron type in the range [0,14]|0
size|_(number)_ polyhedron size|1
sizeX|_(number)_ X polyhedron size, overwrites the _size_ property|1
sizeY|_(number)_ Y polyhedron size, overwrites the _size_ property|1
sizeZ|_(number)_ Z polyhedron size, overwrites the _size_ property|1
custom|_(polygonObjectReference)_ a polyhedron object, overwrites the _type_ property|null
faceColors|_(Color4[])_ array of _Color4_, one per face|Color4(1, 1, 1, 1) for each side
faceUV|_(Vector4[])_ array of _Vector4_, one per face| UVs(0, 0, 1, 1) for each side
flat|_(boolean)_ if false, a polyhedron has a single global face, _faceUV_ and _faceColors_ are ignored|true
updatable|_(boolean)_ true if the mesh is updatable|false
sideOrientation|_(number)_ side orientation|DEFAULTSIDE
To understand how to set _faceUV_ or _faceColors_, please read this by considering the right number of faces of your polyhedron, instead of only 6 for the box : http://doc.babylonjs.com/tutorials/CreateBox_Per_Face_Textures_And_Colors

#####Provided polyhedron types :

type|name|side number
----|----|-----------
0|Tetrahedron|4
1|Octahedron|8
2|Dodecahedron|12
3|Icosahedron|20
4|Rhombicuboctahedron|26
5|Triangular Prism|5
6|Pentagonal Prism|7
7|Hexagonal Prism|8
8|Square Pyramid (J1)|5
9|Pentagonal Pyramid (J2)|6
10|Triangular Dipyramid (J12)|6
11|Pentagonal Dipyramid (J13)|10
12|Elongated Square Dipyramid (J15)|12
13|Elongated Pentagonal Dipyramid (J16)|15
14|Elongated Pentagonal Cupola (J20)|22

If you need to use a custom polyhedron (http://www.babylonjs-playground.com/#21QRSK#1 : minimize the code editor with the button "EDITOR-" to see polyhedron names under the mouse pointer) instead of the provided ones, you will find the full sample file here : https://github.com/BabylonJS/Extensions/tree/master/Polyhedron  
Just copy/paste the wanted polyhedron object in your code like this :

```javascript
var heptagonalPrism = { "name":"Heptagonal Prism", "category":["Prism"], "vertex":[[0,0,1.090071],[0.796065,0,0.7446715],[-0.1498633,0.7818315,0.7446715],[-0.7396399,-0.2943675,0.7446715],[0.6462017,0.7818315,0.3992718],[1.049102,-0.2943675,-0.03143449],[-0.8895032,0.487464,0.3992718],[-0.8658909,-0.6614378,-0.03143449],[0.8992386,0.487464,-0.3768342],[0.5685687,-0.6614378,-0.6538232],[-1.015754,0.1203937,-0.3768342],[-0.2836832,-0.8247995,-0.6538232],[0.4187054,0.1203937,-0.9992228],[-0.4335465,-0.042968,-0.9992228]],
"face":[[0,1,4,2],[0,2,6,3],[1,5,8,4],[3,6,10,7],[5,9,12,8],[7,10,13,11],[9,11,13,12],[0,3,7,11,9,5,1],[2,4,8,12,13,10,6]]};

var mesh = BABYLON.MeshBuilder.CreatePolyhdron("h", {custom: heptagonalPrism}, scene);
```

####IcoSphere
This a sphere based upon an icosahedron with 20 triangular faces which can be subdivided.
```javascript
var icosphere = BABYLON.MeshBuilder.CreateIcoSphere("ico", {radius: 5, radiusY: 8, subdivisions: 6}, scene);
```

Properties, all optional :

property|value|default value
--------|-----|-------------
radius|_(number)_ radius | 1
radiusX|_(number)_  the X radius, overwrites the radius value|radius
radiusY|_(Vector3)_  the Y radius, overwrites the radius value|radius
radiusZ|_(number)_ the Z radius, overwrites the radius value|radius
subdivisions|_(number)_ the number of subdivisions|4
flat|_(boolean)_ if true, the mesh faces have their own normals|true
updatable|_(boolean)_ true if the mesh is updatable|false
sideOrientation|_(number)_ side orientation|DEFAULTSIDE

####Decals  
Example :
```javascript
var decal = BABYLON.MeshBuilder.CreateDecal("decal", mesh,  {position: myPos}, scene);
```
Don't forget the _mesh_ parameter what is the mesh depicting the decal.

Properties, all optional :

property|value|default value
--------|-----|-------------
position|_(Vector3)_ position of the decal (World coordinates) | (0, 0, 0)
normal|_(Vector3)_  the normal of the mesh where the decal is applied onto (World coordinates)|Vector3.Up
size|_(Vector3)_  the x, y, z sizes of the decal|(1, 1, 1)
angle|_(number)_ the angle to rotate the decal|0
  
<br/>
<br/>  
###Parametric Shapes
####Lines
You must set at least the _points_ property.  
On update, you must set the _points_ and _instance_ properties.  

Example :
```javascript
lines = BABYLON.MeshBuilder.CreateLines("lines", {points: myArray, instance: lines});
// updates the existing instance of lines : no need for the parameter scene here
```
Properties :

property|value|default value
--------|-----|-------------
points|_(Vector3[])_  array of Vector3, the path of the line **REQUIRED** 
updatable|_(boolean)_ true if the mesh is updatable|false
instance|_(LineMesh)_ an instance of a line mesh to be updated|null

####Dashed Lines
You must set at least the _points_ property.  
On update, you must set the _points_ and _instance_ properties.  

Example :
```javascript
dashedLines = BABYLON.MeshBuilder.CreateDashedLines("dl", {points: myArray, instance: dashedLines});
// updates the existing instance of dashedLines : no need for the parameter scene here
```
Properties :

property|value|default value
--------|-----|-------------
points|_(Vector3[])_  array of Vector3, the path of the line **REQUIRED** |
dashSize|_(number)_  size of the dashes|3
gapSize|_(number)_  size of the gaps|1
dashBn|_(number)_  intended number of dashes|200
updatable|_(boolean)_ true if the mesh is updatable|false
instance|_(LineMesh)_ an instance of a line mesh to be updated|null

####LineSystem
You must set at least the _lines_ property.  
On update, you must set the _lines_ and _instance_ properties.  

Example :
```javascript
lineSystem = BABYLON.MeshBuilder.CreateLineSystem("lineSystem", {lines: myArray, instance: lineSystem});
// updates the existing instance of lineSystem : no need for the parameter scene here
```
Properties :

property|value|default value
--------|-----|-------------
lines|_(Vector3[])_  array of lines, each line being an array of successive Vector3 **REQUIRED** 
updatable|_(boolean)_ true if the mesh is updatable|false
instance|_(LineMesh)_ an instance of a line system mesh to be updated|null

####Ribbon
You must set at least the _pathArray_ property.  
On update, you must set the _pathArray_ and _instance_ properties.  

Example :
```javascript
ribbon = BABYLON.MeshBuilder.CreateRibbon("ribbon", {pathArray: myPaths, instance: ribbon});
// updates the existing instance of ribbon : no need for the parameter scene
```
Properties :

property|value|default value
--------|-----|-------------
pathArray|_(Vector3[][])_  array of array of Vector3, the array of paths **REQUIRED** 
closeArray|_(boolean)_  to force the ribbon to join its last and first paths|false
closePath|_(boolean)_  to force each ribbon path to join its last and first points|false
offset|_(number)_  used if the pathArray has one path only|half the path length
updatable|_(boolean)_ true if the mesh is updatable|false
sideOrientation|_(number)_ side orientation|DEFAULTSIDE
instance|_(LineMesh)_ an instance of a ribbon to be updated|null

####Tube
You must set at least the _path_ property.  
On update, you must set the _path_ and _instance_ properties and you can set the _radius_, _radiusFunction_ or _arc_ properties.   

Example :
```javascript
tube = BABYLON.MeshBuilder.CreateTube("tube", {path: myPath, instance: tube});
// updates the existing instance of tube : no need for the parameter scene
```
Properties :

property|value|default value
--------|-----|-------------
path|_(Vector3[])_  array of Vector3, the path of the tube **REQUIRED** |
radius|_(number)_  the radius of the tube|1
tessellation|_(number)_  the number of radial segments|64
radiusFunction|_( function(i, distance) )_  a function returning a radius value from _(i, distance)_ parameters|null
cap|_(number)_ tube cap : NO_CAP, CAP_START, CAP_END, CAP_ALL|NO_CAP
arc|_(number)_ ratio of the tube circumference between 0 and 1|1
updatable|_(boolean)_ true if the mesh is updatable|false
sideOrientation|_(number)_ side orientation|DEFAULTSIDE
instance|_(LineMesh)_ an instance of a tube to be updated|null

####Extruded Shapes
You must set at least the _shape_ and _path_ properties.
On update, you must set the _shape_, _path_ and _instance_ properties and you can set the _scale_ and _rotation_ properties.   

Example :
```javascript
extruded = BABYLON.MeshBuilder.ExtrudeShape("ext", {shape: myShape, path: myPath, scale: newScale, rotation: newRotation instance: extruded});
// updates the existing instance of extruded : no need for the parameter scene
```
Properties :

property|value|default value
--------|-----|-------------
shape|_(Vector3[])_  array of Vector3, the shape you want to extrude **REQUIRED** |
path|_(Vector3[])_  array of Vector3, the extrusion axis **REQUIRED** |
scale|_(number)_  the value to scale the shape|1
rotation|_(number)_  the value to rotate the shape each step along the path|0
cap|_(number)_ extrusion cap : NO_CAP, CAP_START, CAP_END, CAP_ALL|NO_CAP
updatable|_(boolean)_ true if the mesh is updatable|false
sideOrientation|_(number)_ side orientation|DEFAULTSIDE
instance|_(LineMesh)_ an instance of an extruded shape to be updated|null

####Custom Extruded Shapes
You must set at least the _shape_ and _path_ properties.  
On update, you must set the _shape_, _path_ and _instance_ properties and you can set the _rotationFunction_ or _scaleFunction_ properties.   

Example :
```javascript
extruded = BABYLON.MeshBuilder.ExtrudeShapeCustom("ext", {shape: myShape, path: myPath, scaleFunction: myScaleF, rotationFunction: myRotF instance: extruded});
// updates the existing instance of extruded : no need for the parameter scene
```
Properties :

property|value|default value
--------|-----|-------------
shape|_(Vector3[])_  array of Vector3, the shape you want to extrude **REQUIRED**| 
path|_(Vector3[])_  array of Vector3, the extrusion axis **REQUIRED** |
scaleFunction|_( function(i, distance) )_  a function returning a scale value from _(i, distance)_ parameters|{return 1;}
rotationFunction|_( function(i, distance) )_  a function returning a rotation value from _(i, distance)_ parameters|{return 0;}
ribbonClosePath|_(boolean)_ the underlying ribbon _closePath_ parameter value|false
ribbonCloseArray|_(boolean)_ the underlying ribbon _closeArray_ parameter value|false
cap|_(number)_ extrusion cap : NO_CAP, CAP_START, CAP_END, CAP_ALL|NO_CAP
updatable|_(boolean)_ true if the mesh is updatable|false
sideOrientation|_(number)_ side orientation|DEFAULTSIDE
instance|_(LineMesh)_ an instance of an extruded shape to be updated|null

####Lathe  
You must set at least the _shape_ property.

Example :
```javascript
var lathe = BABYLON.MeshBuilder.Lathe("lathe", {shape: myShape}, scene);
```
Properties :

property|value|default value
--------|-----|-------------
shape|_(Vector3[])_  array of Vector3, the shape you want to turn **REQUIRED** |
radius|_(number)_  the value to radius of the lathe|1
tessellation|_(number)_  the number of iteration around the lathe|64
arc|_(number)_ ratio of the circumference between 0 and 1|1
cap|_(number)_ tube cap : NO_CAP, CAP_START, CAP_END, CAP_ALL|NO_CAP
closed|_(boolean)_ to open/close the lathe circumference, should be set to `false` when used with `arc`|true
updatable|_(boolean)_ true if the mesh is updatable|false
sideOrientation|_(number)_ side orientation|DEFAULTSIDE




<br/>
<br/>
  

