---
ID_PAGE: 25088
PG_TITLE: Ribbon Tutorial
---
Here you'll find almost everything to understand how the Ribbon object works and how to play with it. 

## Under the hood
_series of paths_
_paths with different lengths_


It's not mandatory that all paths have the same length.  
In this example, _path2_ and _path3_ are longer than _path1_ and _path4_ : http://www.babylonjs-playground.com/#88AZQ   
As you can see, the final ribbon adjust to different lengths. The rule is they all start from first path points and each intermediate ribbon then stops at first of its both constituting paths end.   
There is also no incidence on light reflection for ribbon with different length paths : http://www.babylonjs-playground.com/#88AZQ#1  
Therefore you **can't add a texture** for now to a ribbon constructed with different length paths.  
This is due to the fact that the nested ribbon texturing algorithm only knows how to deal with a unique length for all paths. Indeed, as a ribbon is a parametric shape, so unpredictable, it's assumed that we could unwrap a volumic ribbon (so each one of its paths) onto a full rectangular image and this assumption keeps consistency only with the same length for all paths.  

So it's not mandatory that all the ribbon paths have the same length, but it is hardly recommended.  
The best way to emulate different lengths for some parts of your mesh is then to simply use many ribbons.  

## Closed shapes : normals or textures ?
The ribbon mesh provides two ways to automatically close an unclosed shape.

* _closeArray_ parameter : this will add an extra unit ribbon between the last path and the first path of your _pathArray_.
* _closePath_ parameter : this will join the last and first points of each _path_ in your _pathArray_.
Here's an unclosed ribbon : http://www.babylonjs-playground.com/#3XMWZ#1
```javascript
var ribbon = BABYLON.Mesh.CreateRibbon("ribbon", paths, false, false, 0, scene, false, BABYLON.Mesh.BACKSIDE);
```
Don't mind about how it is mathematically built. This is not the topic.  

The same closed ribbon with _closeArray_ set to _true_ : http://www.babylonjs-playground.com/#3XMWZ#2
```javascript
var ribbon = BABYLON.Mesh.CreateRibbon("ribbon", paths, true, false, 0, scene, false, BABYLON.Mesh.BACKSIDE);
```
As you can see, when rotating the camera, there is no edge on the ribbon surface. The light reflects continuously.  

If we now apply a texture to this automatically closed ribbon : http://www.babylonjs-playground.com/#3XMWZ#3  
You can notice that the texture isn't stretched on the surface added by the automatic closing.  

The reason of this behavior is that, with ribbon _closeXXX_ parameters, priority is given on normals (the tools that compute light reflection) over textures.  

If you don't care about continuous light reflection but you do want your texture to be stretched along the whole surface, you just have to forget automatic closing (_closeArray_ then set to _false_) and close the ribbon by yourself.  
A simple way is just to re-push the first _path_ at the end of the _pathArray_
```javascript
paths.push(paths[0]);
var ribbon = BABYLON.Mesh.CreateRibbon("ribbon", paths, false, false, 0, scene, false, BABYLON.Mesh.BACKSIDE);
```
Example : http://www.babylonjs-playground.com/#3XMWZ#4  

Obviously, the same rules and workarounds apply to the _closePath_ parameter.  
automatically _path_ closed : http://www.babylonjs-playground.com/#3XMWZ#5  
then textured : http://www.babylonjs-playground.com/#3XMWZ#6  



## Maths computed paths

The Ribbon is very adapted to elaborated maths computed meshes.    
You can easily start from an equation to get a full volumic complex shape.     
There are many ways to do it.  

If you don't feel at ease with maths, here is a way to start :   
### First, let's have a small recall.  
We just set points in space. These points have got each a set of three coordinates : x, y and z.  
We call here these points _Vector3_.  

When we want to design a curve or a path in space, we need to get a collection of successive _Vector3_.   
We can't have an infinity of points.  
So we define a path with a certain number of _Vector3_. The more _Vector3_, the more smooth the curve and the more computations too.   

So when you want your path to follow a mathematical curve, you need to compute each path _Vector3_ coordinates.  
You could choose a known math curve in wikipedia or dedicated sites (http://en.wikipedia.org/wiki/List_of_curves , http://www.mathcurve.com/courbes2d/courbes2d.shtml , http://www.uiowa.edu/~examserv/mathmatters/tutorial_quiz/geometry/commoncurves.html, etc) or, when you feel more comfortable, create you own.  

As you can see, curve equations are often like this : _f(x, y) = 0_ or like this : _y = f(x)_.  
This means _y_ is expressed in function of _x_.  
This kind of equation is called a _cartesian equation_. It is probably the most used among mathematicians, but it won't help us a lot because we need to compute _x_ and _y_ (and _z_) simultaneously to set each _Vector3_.  
So we will prefer the _parametric equations_.   
In a _parametric equation_ each different coordinate is defined in function of a parameter _k_ :   
  _x = fct1(k)_   
  _y = fct2(k)_   
  _z = fct3(k)_   

So if you are given a _cartesian equation_, it is quite almost possible to translate it in a _parametric equation_.   
example with a parabola : y =  x²   
_the cartesian equation y = x * x_ will give the _parametric equation :_   
  _x = k_   
  _y = k * k_   
You then give _k_ values from -20 to 20 for example and you  get your 40 successive _Vector3_ on the parabola. Easy, isn't it ?  
You now know the way to fill a path with successive _Vector3_ along a math curve.  

### Back to the Ribbon
Well, we just learnt how to fill a path but a Ribbon needs many paths (okay, we can still construct a ribbon with a single path too, but it's more complex), so how do we add different paths as there is no real interest to add many times the same path ?   
It's quite easy once you've got your parametric equation.  

Let's get into javascript now.   
Your former parametric equation could be this way :   
```javascript
var path = [];
for (var k = -20; k <= 20; k++) {
  var x = k;
  var y = k * k;
  var z = 0;
  path.push(new BABYLON.Vector3(x, y, z));
}
```
Right ?   
http://www.babylonjs-playground.com/#1HSC2O   

Let's now imagine, you create the same path array 10 times on the z-axis with _z = t_ :   
```javascript
var paths = [];
for (var t = 0; t < 10; t++) {
  var path = [];
  for (var k = -20; k <= 20; k++) {
    var x = k;
    var y = k * k;
    var z = t;
    path.push(new BABYLON.Vector3(x, y, z));
  }
  paths.push(path);
}
```
What do we get now ?   
http://www.babylonjs-playground.com/#1HSC2O#1   
An array _paths_ filled with 10 similar _paths_.  
Just what is needed to create a ribbon : http://www.babylonjs-playground.com/#1HSC2O#2   
If you now change slightly each path equation so they aren't all similar, say, by dividing _y_ by _t_ :  
```javascript
var paths = [];
for (var t = 1; t < 10; t++) {
  var path = [];
  for (var k = -20; k <= 20; k++) {
    var x = k;
    var y = k * k / t;
    var z = t;
    path.push(new BABYLON.Vector3(x, y, z));
  }
  paths.push(path);
}
```
You immediatly get a set of different paths along the z-axis : http://www.babylonjs-playground.com/#1HSC2O#8   
So a more complex ribbon : http://www.babylonjs-playground.com/#1HSC2O#9     

At last, if we change a bit _x_ and _z_ variation to scale the curve, we can get a nice parabolic shape :   
```javascript
var paths = [];
for (var t = 1; t < 10; t++) {
  var path = [];
  for (var k = -20; k <= 20; k++) {
    var x = k * 8;
    var y = k * k / t;
    var z = t * 50;
    path.push(new BABYLON.Vector3(x, y, z));
  }
  paths.push(path);
}
```
http://www.babylonjs-playground.com/#1HSC2O#10    
Quick fun ?    
multiply _y_ by _Math.sin(t)_ to make it wave : http://www.babylonjs-playground.com/#1HSC2O#11    
or funnier : http://www.babylonjs-playground.com/#1HSC2O#12    
I couldn't stop playing ...  

### Summary
An easy way to create math computed shapes is so :  

* to choose a 2D math curve,
* to get its parametric equation,
* to fill an array with _Vector3_ computed with a simple _for_ loop iterating on the number of points wanted (set them in a 2D plane to start, with z = 0 for instance),
* to check your curve with _BABYLON.Mesh.CreateLines("name", yourArray, scene)_,
* to derivate your first curve by varying _x_ or _y_ and iterating on _z_ since adding each derivated path into a _paths_ array,
* to check again with _BABYLON.Mesh.CreateLines("name", yourArray, scene)_ on each _z_ iteration,
* to finally build your ribbon with the _paths_ array. 

## From Basic Shapes to Complex Ones

The Ribbon is very versatile. So you can redo every BabylonJS basic shapes.   
Why would you want to do this ?  
Well, you probably don't. There is no need to re-invent the wheel. But you could need to model your own shape which derivates from one of the basic shapes.   
The main rule should be :  

* if you need a basic shape as it stands, then use the provided BJS basic shapes.
* if you need a shape made up of many basic shapes, then use Constructive Solid Geometry or merge provided BJS basic shapes.
* if you need a computed shape having a symetry axis, then use the Tube mesh or the extrusion, which don't require many maths.
* if you need something else, then use the Ribbon itself... and your maths skills.

### Sphere
Let's try here to redo a sphere and then to modify it into something different.   
As you've seen in the former part, you need to create many paths to build a ribbon. For a sphere, you can imagine that you stack many circles, each circle being a path.  
To create a circle, you just set points at _x = sin(angle)_ and _z = cos(angle)_ and give _angle_ some values between 0 and 2 x PI.   
```javascript
var pi2 = Math.PI * 2;
var step = pi2 / 60;       // we want 60 points
for (var i = 0; i < pi2; i += step ) {
  var x = radius * Math.sin(i);
  var z = radius * Math.cos(i);
  var y = 0;
  path.push( new BABYLON.Vector3(x, y, z) );
  }
path.push(path[0]);       // to close the circle
```
demo : http://www.babylonjs-playground.com/#E6IX1#1   

Now, you add circles along the y-axis, making the radius evolving with another angle _p_ varying from the sphere south pole -PI / 2 to its north pole +PI /2. These circles (path) are stored in an array called _paths_ :     
```javascript
var radius = 10;
var tes = 60;
var pi2 = Math.PI * 2;
var step = pi2 / tes;
var paths = [];
for (var p = -Math.PI / 2; p < Math.PI / 2; p += step / 2) {
  var path = [];
  for (var i = 0; i < pi2; i += step ) {
    var x = radius * Math.sin(i) * Math.cos(p);
    var z = radius * Math.cos(i) * Math.cos(p);
    var y = radius * Math.sin(p);
    path.push( new BABYLON.Vector3(x, y, z) );
    }
    path.push(path[0]);
    paths.push(path);
}
```
demo : http://www.babylonjs-playground.com/#E6IX1  

Let's apply a ribbon to these paths : http://www.babylonjs-playground.com/#E6IX1#2   
You get (almost) a sphere.
To get a nice full sphere, you need to complete the missing point at north pole and set the ribbon _closePath_ parameter to true instead of manually close each circle after the former iteration :   
```javascript
var lastPath = [];
for (var j = 0; j < pi2; j += step ) {
  lastPath.push( new BABYLON.Vector3(0, radius, 0) );
}
paths.push(lastPath);
   
var sphere = BABYLON.Mesh.CreateRibbon("sph", paths, false, true ,  0, scene);
```
demo : http://www.babylonjs-playground.com/#E6IX1#3  
Pretty much maths and iterations o far to get a simple sphere, isn't it ?
This is why you should really use the BJS provided sphere if you only want a sphere !

But don't worry, all those efforts so far aren't vain. From now, let's the magic happens with only little changes ...   
Remember : the _for_ loop iterating on _p_ is for the south to north pole angle. What if you don't increment _p_ until PI / 2 but stop before, say at PI /2 - 1.5 :   
```javascript
for (var p = -Math.PI / 2; p < Math.PI / 2 - 1.5; p += step / 2) {
```
demo : http://www.babylonjs-playground.com/#E6IX1#4   
Quite easy. You just derivated the initial sphere into another shape you wouldn't have got another way.
Now, you can keep the original pole angle limit PI / 2 but add a new behavior : if a certain angle limit is reached, then inverse the y radius around this limit.  
```javascript
var yRadius;
var limit = Math.PI / 2 - 1;
for (var p = -Math.PI / 2; p < Math.PI / 2; p += step / 2) {
  var path = [];
  yRadius = p < limit ? Math.sin(p) : 2 * Math.sin(limit) - Math.sin(p) ;
  for (var i = 0; i < pi2; i += step ) {
    var x = radius * Math.sin(i) * Math.cos(p);
    var z = radius * Math.cos(i) * Math.cos(p);
    var y = radius * yRadius;
    path.push( new BABYLON.Vector3(x, y, z) );
  }
  paths.push(path);
} 
```
demo :  http://www.babylonjs-playground.com/#E6IX1#5   

Let's change the initial _for_ loop limits now :  
```javascript
for (var p = -Math.PI / 2 + 0.5; p < Math.PI / 2  - 0.5; p += step / 2) {
```
demo : http://www.babylonjs-playground.com/#E6IX1#6  
Well, is this still a sphere ?   
Let's close the ribbon :
```javascript
var sphere = BABYLON.Mesh.CreateRibbon("sph", paths, true, true ,  0, scene);
```
demo : http://www.babylonjs-playground.com/#E6IX1#7   
Well, it's no longer a sphere, but a symetric shape you could probably have got in a simpler way with a Tube mesh or with CSG ... or not.  
Since you wrote the initial sphere maths code, you've added until now very few changes to get this derivated shape.
Too symetric, not enough, ok ? let's morph it once more so you get out the CSG or Tube way :  let's moderate _x_ with an extra _cosinus_ function
```javascript
for (var i = 0; i < pi2; i += step ) {
  var x = radius * Math.sin(i) * Math.cos(p) * Math.cos(i / 6);
  var z = radius * Math.cos(i) * Math.cos(p);
  var y = radius * yRadius;
  path.push( new BABYLON.Vector3(x, y, z) );
}
```
demo : http://www.babylonjs-playground.com/#E6IX1#8  
You are now in the real Ribbon world !
Want more ? let's moderate _y_ with another _cosinus_ function and multiply _z_ by 2 (why ? why not !).
```javascript
for (var i = 0; i < pi2; i += step ) {
  var x = radius * Math.sin(i) * Math.cos(p) * Math.cos(i / 6);
  var z = radius * Math.cos(i) * Math.cos(p) * 2;
  var y = radius * yRadius * Math.cos(i * 2);
  path.push( new BABYLON.Vector3(x, y, z) );
}
```
demo : http://www.babylonjs-playground.com/#E6IX1#9  



## Various paths concatenation  
_make many different computed or manual pathArrays, then concatenate them_  



_edition in progress_