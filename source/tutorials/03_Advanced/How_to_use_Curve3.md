---
ID_PAGE: 25091
PG_TITLE: How to use Curve3
---
BabylonJS provides an object to manage some math curves for you : **Curve3**.

This object allow you to generate 3D curves according to some complex math function. You can then get an array of successive points (_Vector3_) representing the curve.

##Quadratic Bezier curve
http://en.wikipedia.org/wiki/B%C3%A9zier_curve#Quadratic_curves

![Wikipedia Quadratic Bezier Curve](http://upload.wikimedia.org/wikipedia/commons/3/3d/B%C3%A9zier_2_big.gif)

```javascript
var bezier2 = BABYLON.Curve3.CreateQuadraticBezier(origin, control, destination, nb_of_points);
```
* **origin** : _Vector3_ the origin point,
* **control** : _Vector3_ the control point,
* **destination** : _Vector3_ the destination point,
* **nb_of_points** : _number_ the wanted final curve number of points in the array.

This static method returns an instance of _Curve3_.   
Just use the Curve3 _getPoints()_ method to fill your array : _getPoints()_ returns an array of successive _Vector3_.    
You can then use it for ribbons, tubes, extrusion paths, etc.    
The _length()_ method returns the curve length.   
```javascript
var path = bezier2.getPoints();
var l = bezier2.length();
```

##Cubic Bezier curve
http://en.wikipedia.org/wiki/B%C3%A9zier_curve#Higher-order_curves

![Wikipedia Cubic Bezier Curve](http://upload.wikimedia.org/wikipedia/commons/d/db/B%C3%A9zier_3_big.gif)
```javascript
var bezier3 = BABYLON.Curve3.CreateCubicBezier(origin, control1, control2, destination, nb_of_points)
```
* **origin** : _Vector3_ the origin point,
* **control1** : _Vector3_ the first control point,
* **control2** : _Vector3_ the second control point,
* **destination** : _Vector3_ the destination point,
* **nb_of_points** : _number_ the wanted final curve number of points in the array.

This static method returns an instance of _Curve3_.   
Just use the Curve3 _getPoints()_ method to fill your array : _getPoints()_ returns an array of successive _Vector3_.    
You can then use it for ribbons, tubes, extrusion paths, etc.    
The _length()_ method returns the curve length.    
```javascript
var path = bezier3.getPoints();
var l = bezier3.length();
```

Playground example : http://www.babylonjs-playground.com/#1PSZDF#2
Read from line 50


##Hermite spline
http://en.wikipedia.org/wiki/Cubic_Hermite_spline

![EScience Hermite](http://escience.anu.edu.au/lecture/cg/Spline/Image/HermiteSpec.gif)
```javascript
var hermite = BABYLON.Curve3.CreateHermiteSpline(p1, t1, p2, t2, nbPoints);
```
* **p1** : _Vector3_ the origin point,
* **t1** : _Vector3_ the origin tangent vector,
* **p2** : _Vector3_ the destination point,
* **t2** : _Vector3_ the destination tangent vector,
* **nbPoints** : _number_ the wanted final curve number of points in the array.

This static method returns an instance of _Curve3_.    
Just use the Curve3 _getPoints()_ method to fill your array : _getPoints()_ returns an array of successive _Vector3_.    
You can then use it for ribbons, tubes, extrusion paths, etc.    
The _length()_ method returns the curve length.   
```javascript
var path = hermite.getPoints();
var l = hermite.length();
```

##Curve3 object
You can also instantiate your own Curve3 object from a simple array of successive Vector3.   
Why would you do this ?   
Because you can then use the _continue()_ method to stick together many curves whatever their initial origin.   

Let's imagine you've got an array of your own filled Vector3 along a simple sinus curve.  
```javascript
var mySinus = [];
for (var i = 0; i < 30; i++) {
 mySinus.push( new BABYLON.Vector3(i, Math.sin(i / 10), 0) );
}
```
You don't really know where your last Vector3 is set in space but you would like to continue your _mySinus_ curve with the former _bezier3_ curve (although it starts from the system origin) and then the former _bezier2_ to design some extrusion path for instance.   
So you can create your own _Curve3_ object and then stick it the _bezier3_ and _bezier2_.  
```javascript
var mySinusCurve3 = new BABYLON.Curve3(mySinus);
var myFullCurve = mySinusCurve3.continue(bezier3).continue(bezier2);
```
The _**continue()**_ method returns a new _Curve3_ object and lets _mySinusCurve3_, _bezier3_ and _bezier2_ unchanged.   


If you then need to draw the curve or use it for ... whatever you want (extrusion path, ribbon path, shape path, path3D, etc), you just get the array of points with the _**getPoints()**_ method. This method simply returns an array of successive _Vector3_.
```javascript
var path = myFullCurve.getPoints();
var extruded = BABYLON.Mesh.ExtrudeShape("extrudedShape", shape, path, 1, 0, scene);
```

If you need then to know the curve length, just use the _**length()**_ method.    
```javascript
var l = myFullCurve.length();
```



Here is an example where a Hermite Spline is used to close smoothly a concatenation of two Bezier curves :   

* The first and last points of the concatenation are used as last and first point of the Hermite spline.  
* The first and last segments of the concatenation are used as last and first tangent vectors of the Hermite. Since these segment are quite small, they are scaled according to the concatenation _length_ so the longer the concatenation, the more curved the spline.   

```javascript
// two concatened cubic Bezier
var cubicA = BABYLON.Curve3.CreateCubicBezier(vA0, vA1, vA2, vA3, 50);
var cubicB = BABYLON.Curve3.CreateCubicBezier(vB0, vB1, vB2, vB3, 50);
var continued = cubicA.continue(cubicB);

// initial Hermite values from continued first and last segments
var t = continued.length() / 2;                             // tangent scale factor
var points = continued.getPoints();
var p1 = points[points.length - 1];                         // last continued point = first hermite point
var t1 = (p1.subtract(points[points.length - 2])).scale(t); // last segment scaled = hermite tangent t1
var p2 = points[0];                                         // first continued point = last hermite point
var t2 = (points[1].subtract(p2)).scale(t);                 // first segment scaled = hermite tangent t2

var hermite = BABYLON.Curve3.CreateHermiteSpline(p1, t1, p2, t2, 50);
continued = continued.continue(hermite);

// finally drawing a smooth closed curve
var closedCurve = BABYLON.Mesh.CreateLines("closed", continued.getPoints(), scene);
```


example : http://www.babylonjs-playground.com/#2GCEVH  
The orange and yellow curves are Bezier curves.   
In light blue, these two curves are continued each other and a hermite curve is also added in continuation to close the path.   