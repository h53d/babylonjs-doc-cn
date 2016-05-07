---
ID_PAGE: 22011
PG_TITLE: 02. 发现基础元素
---
## 介绍
在本教程, 我们将学习如何使用Babylon.js创建基础元素, 比如盒子, 球体, 和平面.
![元素](http://urbanproductions.com/wingy/babylon/misc/tut02pic.jpg)
[**娱乐场演示场景2 - 七个基本形状/网格**](http://babylonjs-playground.azurewebsites.net/?2)
## 我怎么做到这个 ?
一个简单的方法是通过访问[**娱乐场演示场景 02**](http://babylonjs-playground.azurewebsites.net/?2)来开始使用基础元素.  你可能想使用弹出菜单的'下载.zip压缩包' 选项.  你得到的zip压缩包里的index.html文件,包含有你开始创建基础元素所需的一切.  记住那个链接, 因为我们将更多的谈论到它.
我确定你已经读过[**Babylon.js初级教程**](http://doc.babylonjs.com/generals/A_Babylon.js_Primer) 和 [**先前的教程**](http://doc.babylonjs.com/tutorials/Creating_a_Basic_Scene), 因此你应该知道如何设置场景文件格式.  因此, 我们不在谈论它了.  我们将一步步通过[**娱乐场演示场景02**](http://babylonjs-playground.azurewebsites.net/?2)来学习.  在新标签页或窗口中打开那个链接, 然后返回此处, 我们马上开始.
从盒子开始, 我们创建了高中基础元素, 在该函数的最后将它们定位好(以防止它们堆叠起来).  让们一一谈论下各个基础形状/网格.
* **创建一个盒子**
```javascript
var box = BABYLON.Mesh.CreateBox("box", 6.0, 场景, false, BABYLON.Mesh.DEFAULTSIDE);
```
参数为: 名字,盒子大小, 它们将放到场景, 是否可更新?(如果该网格后面必须被更新) 和可选的面朝向(参见下面). 如果你需要默认表现那么最后两个参数可以忽略:
```javascript
var box = BABYLON.Mesh.CreateBox("box", 6.0, scene);
```
* **创建一个球体**
```javascript
var sphere = BABYLON.Mesh.CreateSphere("sphere", 10.0, 10.0, 场景, false,  BABYLON.Mesh.DEFAULTSIDE);
```
参数为: 名字, 细分段数 (高度细节或不需), 大小, 将被放到的场景, 是否可更新?(如果该网格后面必须被更新) 和可选的面朝向(参见下面). 如果你需要默认的表现那么最后两个参数可以忽略:
```javascript
var sphere = BABYLON.Mesh.CreateSphere("sphere", 10.0, 10.0, scene);
```
记得根据你的网格对象到校调整细分段数 ;)
* **创建一个平面**
```javascript
var plane = BABYLON.Mesh.CreatePlane("plane", 10.0, scene, false, BABYLON.Mesh.DEFAULTSIDE);
```

参数为: 名字, 大小, 和将被放到的场景, 是否可更新?(如果该网格后面必须被更新) 和可选的面朝向(参见下面). 如果你需要默认的表现,那么最后两个参数可以忽略 :
```javascript
var plane = BABYLON.Mesh.CreatePlane("plane", 10.0, scene);
```
* **创建一个盘片(或着一个规则多边形)**
```javascript
var disc = BABYLON.Mesh.CreateDisc("disc", 5, 30, scene, false, BABYLON.Mesh.DEFAULTSIDE);
```
参数为: 名字, 半径, 边数, 场景, 可更新否和可选的朝向(参见下面). 如果你需要默认的表现,那么最后两个参数参数可以忽略:
```javascript
var disc = BABYLON.Mesh.CreateDisc("disc", 5, 30, scene);
```
根据_tessellation_ 的值, 你可以创建一个多边形:  
3产生一个三角形,  
4产生一个正方形,  
5产生一个五边形,  
6产生一个六边形, 7产生一个七边形, 8产生一个八卦形, 以此类推.
* **创建一个圆柱体**
```javascript
var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 3, 6, 1, 场景, false, BABYLON.Mesh.DEFAULTSIDE);
```
参数为: 名称, 高度, 顶直径, 底直径, 边数, 高向细分度, 场景, 可更新否和可选的朝向(参见下面). 如果你需要默认表现,那么最后两个参数可以忽略:
```javascript
var cylinder = BABYLON.Mesh.CreateCylinder("cylinder", 3, 3, 3, 6, 1, scene);
```
* **创建一个环面体**
```javascript
var torus = BABYLON.Mesh.CreateTorus("torus", 5, 1, 10, scene, false, BABYLON.Mesh.DEFAULTSIDE);
```
参数为: 名称, 直径, 厚度, 边数(高度细节或不是), 场景, 可更新否和可选的朝向(参见下面). 如果你使用默认表现那么最后两个参数可忽略 :
```javascript
var torus = BABYLON.Mesh.CreateTorus("torus", 5, 1, 10, scene);
```
* **创建一个结**
```javascript
var knot = BABYLON.Mesh.CreateTorusKnot("knot", 2, 0.5, 128, 64, 2, 3, scene, false, BABYLON.Mesh.DEFAULTSIDE);
```
参数为: 名称, 半径, tube, 半径上分段数, tubularSegments, p, q, 场景, 可更新否和可选的朝向(参见下面). 如果你使用默认的表现那么最后的两个参数可以忽略 :
```javascript
var knot = BABYLON.Mesh.CreateTorusKnot("knot", 2, 0.5, 128, 64, 2, 3, scene);
```
将将在[**此处**](http://en.wikipedia.org/wiki/Torus_knot)关于 结 学习更多知识.
* **创建线型网格**
```javascript
var lines = BABYLON.Mesh.CreateLines("lines", [
    new BABYLON.Vector3(-10, 0, 0),
    new BABYLON.Vector3(10, 0, 0),
    new BABYLON.Vector3(0, 0, -10),
    new BABYLON.Vector3(0, 0, 10)
], 场景);
```
参数为: 名称, [都好分隔的向量数组], 场景.
我可以解释线型网格是如何工作的, 当时我认为剋可以通过观察上面的演示代码而知晓.  注意 [ 和 ].  这两个是数组的起止标志, 数值是Javascript的另一种值类型.  数组里的头个三元向量是线的开始地方.  那之后, 一个逗号, 然后下一个三元向量为画线的线一个定位点.  然后, 又一个逗号, 和又一个三元向标示点新定位点.  可以添加任意多个向量, 但是注意最后一个三元向量之后没有逗号跟随.  请按照个格式组织向量数组.
* **绘制点划线网格**
```javascript
var dashedlines = BABYLON.Mesh.CreateDashedLines("dashedLines", [v1, v2, ... vn], dashSize, gapSize, dashNb, 场景);
```
参数为 : 名称, [三元向量数组], 划线大小, 间隙大小, 段划线数, 场景.
作为许多线段, 每条段先都是以三元向量组的方式呈现在空间里. 上面函数设置了这条点划线里线段的数量, 每段都是由两个连续三元向量定义.
_划线大小_ 和 _间隙大小_ 是指点划线里每个划线和之间间隙的相对大小.
你可能会被我们新的[线系统](http://doc.babylonjs.com/tutorilas/Mesh_CreateXXX_Methods_With_Options_Parameter#linesystem)吸引住.

* **创建丝带**
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
