---
ID_PAGE: 24847
PG_TITLE: 参数化造型
---
## 介绍

直到目前你已经看到的基础网格都有预期的形状: 当你创建一个球体网格,你期望看到一个球形. 对于盒子,环,柱体等也时同样的情况.

存在另外一种网格,它们的形状不是固定的. 它们的最终形状取决于一些参数. 所以我们称这些网格为"参数化造型".

## 色带

色带是个非常简单和灵活的造型. 由于它是非常基础的, 所以你可以使用一个色带或多个色带合并来为任意形状建模.

![色带](http://jerome.bousquie.fr/BJS/images/ribbon.png)

```javascript
CreateRibbon(name, pathArray, closeArray, closePath, offset, scene, updatable, sideOrientation);
```
  * **name** : 字符串类型.
  * **pathArray** : 一个路径数组.  
如[基础元素]里解释的(02. 发现基础元素)一节, 色带是两个或多个路径间的面.  
路径时空间中一系列连续的点(三维向量).  
所以路径可以通过很多种方式设计: 你可以手动设定点, 从数据集(json等)中引入它们, 使用些数据函数计算它们... 甚或包括所有的数据点.  
Javascript表示的一条路径是一个简单的三维向量的数组。  
一条路径至少包含两个点(如果你提供一个单一的路径则至少四个点).
为了创建一条色带,你必须传递一个路径数组. 这个数组可以只包含一条路径,这种情况时必须使用_offset_参数. 

  * **closeArray** : _默认为否_  布尔值, 如果为真则在路径数组里的最后一条路径和第一条路径间额外创建一系列三角形.
示例: http://www.babylonjs-playground.com/#295H7U  
在这里我们使用许多路径数组填充出一个我们称为_paths_的数组.
每个路径数组接合贝赛尔曲线上的三维向量来填充. 这个示例可以有任何其它的选择结果,但是我就是喜欢这个奇怪的形状.  
在处理色带之前, 我们使用_CreateLines()_方法呈现每条路径,以便弄清除这些路径的样子. 正如我们所见,这些曲线边挨着边围绕着一个不完整的圆.  
如果我们将这些个_路径_ 数组应用到色带网格上, 我们获得这个 : http://www.babylonjs-playground.com/#295H7U#1  
你可以看到正如预期的:一个面是在各_路径_间构建的.  
Here is the same with a plain material ans still the _paths_ displayed : http://www.babylonjs-playground.com/#295H7U#2  
如果我们将_closeArray_设置为_true_, 则在第一个和最后一个路径间缺失的面将被构建出来: http://www.babylonjs-playground.com/#295H7U#3  
该网格将成为一个正真的封闭体,而且光线将沿着它的连续面反射.  


  * **closePath** : 布尔值,_默认为否_ , 如果为真则_路径数组里的_每条路径的首尾点将相连.  
示例: http://www.babylonjs-playground.com/#1TDTHJ  
这儿是些非封闭的管状色带.
lll 它仅由两个不完整圆的_path1_ 和 _path2_ 构成.   
如果我们把_closePath_ 设置为_true_ (http://www.babylonjs-playground.com/#1TDTHJ#1), 你会注意到_path1_ 和 _path2_ 就闭合了而且有两个三角形被添加到每条路径的首尾之处.  
如果我们为这条色带提供普通的材质,你会发现它真的闭合了,因为色带面的反射是按照连续法线的方式计算的: http://www.babylonjs-playground.com/#1TDTHJ#2  
这是个将之前的 _closeArray_参数和_closePath_设置为true的示例 : http://www.babylonjs-playground.com/#295H7U#4  

  * **offset** : _默认是路径数组长度的一半_, 仅在路径数组一个路径时强制使用.  
例子 : http://www.babylonjs-playground.com/#1W5VJN#14
这是一个路径的 _path1_, 一个简单的螺旋. 它只是使用 _CreateLines()_ 创建显示.  
我们可以使用这个单一的路径 : _[path1]_ 来计算该 _路径数组_  
在这种情况，色带的构建是通过：将路径上的每个点和路径上另一个相对_偏移_更远的点连接起来. 例子: _offset = 10_, 第1个点将和第11个点相连接，第2个点将和第12个点连接，以此类推.  
如果你不提供 _偏移_ 值, 或者你提供一个大于 _path1 长度一半的值, 该 _偏移_ 值将被设置成默认的，也就是 _path1_ 长度的一半.  
回到我们的例子 : http://www.babylonjs-playground.com/#1W5VJN#15  
_Offset_ 这里被设置成20.  
让我们把它改成5 : http://www.babylonjs-playground.com/#1W5VJN#16  
因此这个参数允许你使用单一路径构建不同的网格  
所以通过捣弄 _offset_, _closeArray_, 或其它参数, 你可以奇松的创建立体造型, 甚至只通过一个路径 : http://www.babylonjs-playground.com/#1W5VJN#17  
 
  * **updatable** : 布尔值, 如果创建后允许更新则设置为true
 
  * **sideOrientation** : _默认的预设朝向_
可以是其它值 :  
    * BABYLON.Mesh.FRONTSIDE
    * BABYLON.Mesh.BACKSIDE
    * BABYLON.Mesh.DOUBLESIDE  
    请在[**02-基础元素**](http://doc.babylonjs.com/page.php?p=22011)查看关于_sideOrientation_参数的全面阐述。

如果你需要更多的色带使用细节说明，请阅读[Ribbon 教程]()部分.


## 管道
基本上一个管道就是一个弯曲(或不弯曲)的柱体.  
然而，如果你把它看成个参数化造型，那么它就可以远不止柱体的.  
使用 cos/sin 曲线路径的管道例子 :  http://www.babylonjs-playground.com/#LG3GS#8    

```javascript
var tube =  BABYLON.Mesh.CreateTube(name, path, radius, tessellation, radiusFunction, cap, scene, updatable?, sideOrientation);
```
  * **name** : 字符串.
  * **path** : 连续的三元向量数组. 它代表构建管道将已从道路径. 该路径是管道的中心轴. 这个路径数组至少有两个三元向量. 第一个点是管道的开始，而第二个点是管道的结束. 所以只用两个点，你就获得了一个简单的柱体.  
只要你喜欢，可以这样提供该路径 : 手动， 从一个数据集里引入，使用些数学函数甚或这些方法组合. 它就是个三元向量的数组，用来设置管道轴线的空间走向.  
  * **radius** : 半径值. 这是沿着管道恒定的半径值. 这个值仅仅在该函数的 _radiusFunction_ 参数为 _null_ 时才使用.  
  * **tessellation** : 径向分段数量. 如果将它设置为3你就得到一个三角形管道，如果设置为4你就得到个方形管道，诸如等等. 因此根据你需要的精度来设置级别，记住段数越多，网格计算量就越重.  
  *  **cap** : BABYLON.Mesh.NO_CAP, BABYLON.Mesh.CAP_START, BABYLON.Mesh.CAP_END, BABYLON.Mesh.CAP_ALL.  
  *  **radiusFunction** : 一个自定义javascript 函数.  
如果你把这个参数传递给 _CreateTube()_ 方法, 那么 _radius_ 参数值将会被忽略.  
当在构建管道过程时会为每个轴线路径点调用该自定函数.  
该自定义函数会被传递两个参数 : 当前点 _i_ 点尾位置和从管道开始位置道这 _第i_ 个点的 _距离_ .  
你提供的自定义函数必须返回个半径值.  
例子 :
```javascript
var myFunction = function(i, distance) {
  var radius = 3 * Math.cos(distance / 5);
  return radius;
};
var tube = BABYLON.Mesh.CreateTube("lumps", path, null, 20, myFunction, scene);
```

这是个使用 正弦函数计算半径同时 使用 正弦函数增量路径位置点的管道例子 :
http://www.babylonjs-playground.com/#LG3GS#9    
这是另一个使用了圆形路径和变化半径的管道例子: http://www.babylonjs-playground.com/#LG3GS#10    

## 挤拉
什么是挤拉 ?  
挤拉是种将2维形状转换成有体积造型的方法.  
让我们想象下：你通过连续_三元向量_数组定义了一个星星形状. 为了定义二维的形状，你只需在 xOy 平面定义设置些点，因此所有的Z坐标都为零.  
比如 : http://www.babylonjs-playground.com/#RF9W9  
让我们显示出世界坐标轴，以便更加清楚展示 : http://www.babylonjs-playground.com/#RF9W9#1  
现在让我们想象下，你可以沿着Z轴拉伸这个二维形状从而让它有体积... 这就是挤拉 :  http://www.babylonjs-playground.com/#RF9W9#30    

现在让我们想象下：你可以沿着三维空间中的一个路径挤拉你的星星, 比如沿着正弦曲线, 而且不仅沿着Z轴.  
http://www.babylonjs-playground.com/#RF9W9#31    


挤拉可以通过两种不同的方法实现。一个基础的和一个自定义高级的.  

基础方法  
```javascript
BABYLON.Mesh.ExtrudeShape(name, shape, path, scale, rotation, cap, scene, updatable?, sideOrientation)
```
* **name** : 被挤拉网格的名字.
* **shape** : 被挤拉的造型, 一个连续三元向量数组.
* **path** : 沿着该路径挤拉造型，一个连续三元向量.
* **scale** : _默认为 1_, 初始造型的缩放值.
* **旋转** : _默认 0_, 路径上每步点上造型被旋转的值.
*  **cap** : BABYLON.Mesh.NO_CAP, BABYLON.Mesh.CAP_START, BABYLON.Mesh.CAP_END, BABYLON.Mesh.CAP_ALL.  
* **场景** : 当前场景.
* **updatable?** : 该网格可更新.
* **sideOrientation** : 面的朝向 - _前面, 背面_ 或者 _双面_.  

在这里例子里如果我们将 _scale_ 值从1 改成 3，初始的星星将沿着曲线被拉伸3倍: http://www.babylonjs-playground.com/#RF9W9#4  
If we now change the _旋转_ step value from 0 to _PI / 24_ for example, the curve is twisted this angle at each curve point : http://www.babylonjs-playground.com/#RF9W9#218  

当然，即使你如所述的那样在 xOy 平面上定义你的二维形状，挤拉操作仍然可以在任何路径方向上执行 : http://www.babylonjs-playground.com/#RF9W9#32    

更甚者, 形状也不必闭合. 你可以用个简单(或者复杂的)开放形状 : http://www.babylonjs-playground.com/#RF9W9#7  
挤拉 : http://www.babylonjs-playground.com/#RF9W9#33      
旋转挤拉: http://www.babylonjs-playground.com/#RF9W9#34    

记住你的形状也不必定位在坐标系统中心. 这个是有偏倚的简单形状 : http://www.babylonjs-playground.com/#RF9W9#10  
挤拉 (the extrusion path is shown in magenta so the offset is visible) : http://www.babylonjs-playground.com/#RF9W9#35    
现在旋转... 绕着路径轴 : http://www.babylonjs-playground.com/#RF9W9#36    
正如你所见, 这是种构建复杂螺旋曲线网格或其它简单些对象的方法，而不用手工处理数学函数 : http://www.babylonjs-playground.com/#RF9W9#37    
因为挤拉的形状不可预判，因此假设cap(如果给被挤拉网格添加1或2个)的中心位于形状的重心来计算.  



ADVANCED METHOD  
```javascript
BABYLON.Mesh.ExtrudeShapeCustom(name, shape, path, scaleFunction, rotateFunction, ribbonCloseArray, ribbonClosePath, cap, scene)
```
* **name** : the extruded mesh name,
* **shape** : the shape to be extruded, an array of successive Vector3.
* **path** : 沿着该路径挤拉造型，一个连续三元向量.
* **scaleFunction** : a custom javascript function. This function is called on each path point and is given the _i_ position of the point in the path and its _distance_ from the begining of the path. It must return a _scale_ numeric value. This value will be the scaling applied to the shape drawn at the _i-th_  point.
* **rotationFunction** : a custom javascript function. This function is called on each path point and is given the _i_ position of the point in the path and its _distance_ from the begining of the path. It must return a _rotation_ numeric value. This value will be the rotation applied to the shape drawn at the _i-th_  point.
* **ribbonCloseArray** : _default false_, boolean. The underlying ribbon _closeArray_  parameter. This can be used to automatically close a path with right normals computation.
* **ribbonClosePath** : _default false_, boolean. The underlying ribbon _closePath_  parameter. This can be used to automatically close a shape with right normals computation.  
*  **cap** : BABYLON.Mesh.NO_CAP, BABYLON.Mesh.CAP_START, BABYLON.Mesh.CAP_END, BABYLON.Mesh.CAP_ALL.  
* **scene** : the current scene.
* **updatable?** : 该网格可更新.
* **sideOrientation** : 面的朝向 - _前面, 背面_ 或者 _双面_.

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