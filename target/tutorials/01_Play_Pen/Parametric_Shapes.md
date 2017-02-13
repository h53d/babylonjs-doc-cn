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
现在如果我们将这个例子的 _旋转_ 步长值从 0 改成 _PI / 24_ , 则在曲线上每个点处被扭转 : http://www.babylonjs-playground.com/#RF9W9#218  

当然，即使你如所述的那样在 xOy 平面上定义你的二维形状，挤拉操作仍然可以在任何路径方向上执行 : http://www.babylonjs-playground.com/#RF9W9#32    

更甚者, 形状也不必闭合. 你可以用个简单(或者复杂的)开放形状 : http://www.babylonjs-playground.com/#RF9W9#7  
挤拉 : http://www.babylonjs-playground.com/#RF9W9#33      
旋转挤拉: http://www.babylonjs-playground.com/#RF9W9#34    

记住你的形状也不必定位在坐标系统中心. 这个是有偏倚的简单形状 : http://www.babylonjs-playground.com/#RF9W9#10  
挤拉 (the extrusion path is shown in magenta so the offset is visible) : http://www.babylonjs-playground.com/#RF9W9#35    
现在旋转... 绕着路径轴 : http://www.babylonjs-playground.com/#RF9W9#36    
正如你所见, 这是种构建复杂螺旋曲线网格或其它简单些对象的方法，而不用手工处理数学函数 : http://www.babylonjs-playground.com/#RF9W9#37    
因为挤拉的形状不可预判，因此假设cap(如果给被挤拉网格添加1或2个)的中心位于形状的重心来计算.  



高级方法  
```javascript
BABYLON.Mesh.ExtrudeShapeCustom(name, shape, path, scaleFunction, rotateFunction, ribbonCloseArray, ribbonClosePath, cap, scene)
```
* **name** : 被挤拉的网格名称,
* **shape** : 被挤拉的形状，一个连续三元向量数组.
* **path** : 沿着该路径挤拉造型，一个连续三元向量.
* **scaleFunction** : 一个自定义的 javascript 函数. 该函数在路径的每个点处被调用，并提供参数：路径上 _第几个_ 点及其距离路径开始处的 _距离_ . 它必须返回个 _缩放_ 值. 这个值将被作为缩放大小应用到造型的 _第i个_ 点上.
* **rotationFunction** : 一个自定义的 javascript 函数. 该函数在路径的每个点处被调用，并提供参数：路径上 _第几个_ 点及其距离路径开始处的 _距离_ . 它必须返回一个 _旋转_ 值. 这个值将被作为 旋转 大小应用到造型的 _第i个_  点.
* **ribbonCloseArray** : _默认为 false_, 布尔类型. 底层色带的 _closeArray_  的参数. 它可以和右手法线相结合来自动计算路径的闭合.
* **ribbonClosePath** : _默认 false_, 布尔类型. 底层色带的 _closePath_  的参数. 它可以和右手法线相结合来自动计算造型的闭合.  
*  **cap** : BABYLON.Mesh.NO_CAP, BABYLON.Mesh.CAP_START, BABYLON.Mesh.CAP_END, BABYLON.Mesh.CAP_ALL.  
* **场景** : the current 场景.
* **updatable?** : 该网格可更新.
* **sideOrientation** : 面的朝向 - _前面, 背面_ 或者 _双面_.

在这个高级方法中, 该 _scale_ 和 _旋转_ 参数被自定义函数取代.  

  **_scaleFunction_**   
这个自定函数会在挤拉中每个路径点迭代时被调用. 它会被传递两个参数 : _i_ 和 _distance_.  

* **i** 路径上的点序号, 用0开始表示第一个点.
* **distance** 当前点到路径开始处的距离.  

这个函数必须返回个 _缩放_ 值，用于造型的e _第i个_ 点.  
Example :
```javascript
var myScale = function(i, distance) {
  var scale = 2 * Math.sin(i / 5);
  return scale;
};
```

这儿是一个不闭合，不居中的简单造型的例子，造型随着路径位置线性缩放: http://www.babylonjs-playground.com/#RF9W9#38    
现在如果我们使用正弦函数代替线性函数缩放，同时将造型居中，我们得到个有趣的结果 : http://www.babylonjs-playground.com/#RF9W9#39    
我们甚至可以使用正／负数的缩放来模拟旋转 : http://www.babylonjs-playground.com/#RF9W9#40    


  **_rotateFunction_**  
这个 函数 会在每个路径点迭代挤拉时被调用. 它会被传递两个参数 : _i_ 和 _distance_.  

* **i** 路径上的点序号, 用0开始表示第一个点.
* **distance** 当前点到路径开始处的距离. 

这个自定义函数必须返回个 _旋转_ 值，将用于造型的 _第i个_ 点.  
Example :
```javascript
var myRotation = function(i, distance) {
  var rotation = distance / 20;
  return rotation;
};
```
这儿是个例子，缩放大小为常量，旋转值随距离变化 : http://www.babylonjs-playground.com/#RF9W9#41    
当然，你也可以设置非线的旋转函数,  此处时正弦函数的 : http://www.babylonjs-playground.com/#RF9W9#42    



  **固定值**

这个高级方法需要两个自定义函数. 但是你也许想使用个自定的缩放函数 和 一个旋转值固定(或无值)的函数，如下面例子. 这个案例里, 只是传递一个自定义旋转函数，它返回个固定值:  
Example :  
```javascript
var noRotation = function(i, distance) {
  return 0;
};
```
如果你仔细阅读过前面例子的代码，你可以在第 41 行代码看到 _scaleFunction_ 返回常量值 1 : http://www.babylonjs-playground.com/#RF9W9#41      

  **_ribbonCloseXXX_ 参数**

被挤拉的网格是基于一个底层的色带. 当你挤拉一个形状时，你实际上在制作一个特殊的色带.  
这意味着你也可以设置它的 _closeArray_  _closePath_ 参数，如果你需要自动闭合被挤拉的造型.  
注意 : 该 _closeXXX_ 名称是色带的名称. 不是被挤拉的造型的名称.  
因此这个容易混淆，因为 :  

* **_ribbonCloseArray_** 设置为 true 将闭合造型的挤拉路径,
* **_ribbonClosePath_** 设置为 true 将闭合造型本身 (如果未闭合).  

我们做个不闭合，不居中的挤拉造型 : http://www.babylonjs-playground.com/#RF9W9#20  
而且几乎是环形的路径And this almost circular path : http://www.babylonjs-playground.com/#RF9W9#21  
常量缩放同时无旋转道挤拉 : http://www.babylonjs-playground.com/#RF9W9#43    
现在让我们设置 _ribbonCloseArray_ 为 true :http://www.babylonjs-playground.com/#RF9W9#44    
你可以看到, 挤拉路径闭合了. 我们把它设置回 false 同时设置 _ribbonClosePath_ 为true : http://www.babylonjs-playground.com/#RF9W9#45    
现在造型闭合了.  
两个一起设置为true : http://www.babylonjs-playground.com/#RF9W9#46    


 **概要**  
最后, 挤拉的自定义函数可以是如下例:  
```javascript
BABYLON.Mesh.ExtrudeShapeCustom("extruded", shape, path, myScale, myRotation, false, true, scene)
```
一个形状是一个连续的三元向量数组. 这意味着二维或三位的形状都可以被挤拉.  
形状被设计在本地坐标系统中，Z轴作为挤拉的路径轴.  
最后，形状不必在本地坐标系统里居中。.  
居中的形状，将沿着路径轴被对称挤拉. 一个不居中的形状，将从路径轴偏倚挤拉.  

生成奇怪造型的简单方法 : http://www.babylonjs-playground.com/#RF9W9#47   