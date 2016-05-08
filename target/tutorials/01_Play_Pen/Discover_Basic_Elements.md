---
ID_PAGE: 22011
PG_TITLE: 02. 探索基础元素
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
], scene);
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


* **创建一条板带**

什么是板带 ?

首先, 想象一下一系列连续点定义的路径.
接下来，想象另一系列连续点，定义的一条路径.
现在, 如果你在第一条路径和第二条路径上互相间隔着连接点来构建三角形, 就像你系鞋带的方式, 你就会得到一个板带.

你的路径间不需要平行. 它们甚至不需要是直线或在同一平面内.
它们可以是任何你想要的方式. 板带就沿着你定义的路径.

现在, 想象一下, 不是两条路径, 你定义了许多连续的不同路径.
成对路径间构成的所有板带会结合起来形成连续表面.

```javascript
var ribbon = BABYLON.Mesh.CreateRibbon("ribbon", [path1, path2, ..., pathn], false, false, 0, scene, false, BABYLON.Mesh.DEFAULTSIDE);
```

参数为: 名称, 路径数组, 闭合数组, 闭合路径, 偏移量, 场景, 可更新否?(如果网格之后要被修改)  和可选的朝向 (参见下面).


  * 名称: 一个字符串, 你想要给你的造型物定义的名称,
  * 路径数组: 填充路径的数组. 路径也是数组, 由一系列连续点 _三元向量_ 填充. 你需要至少一条路径形成板带,而且每条路径包含至少四个 _三元向量_,
  * 闭合数组: 布尔值, 如果为真, 则会由 _路径数组_ 里的第一条路径和最后一条路径产生一组额外的三角形,
  * 闭合路径: 布尔值, 如果为真, 则 _路径数组_ 里的每条路径的最后一个点和其第一个点相连接,
  * 偏移量 : 正数 (默认值是 _路径_ 大小的一半), 仅当 _路径数组_ 只有一条路径时才必须指定. 此时板带由该单条路径上的 第 i 个点和第 i+偏移量 个点连接来构成. 这个参数会被忽略如果 _路径数组_ 里有多于一条路径,
  * 场景 : 当前场景对象,
  * 可更新否: 布尔值, 如果允许之后更新缎带则设置为true,
  * 朝向: 期望的面朝向(BABYLON.Mesh.FRONTSIDE / BACKSIDE / DOUBLESIDE / DEFAULT).

如果仅需要使用默认表现则最后两个参数可以被忽略:
```javascript
var ribbon = BABYLON.Mesh.CreateRibbon("ribbon", [path1, path2, ..., pathn], false, false, 0, scene);
```

如果你想知道处理该方法的更多细节, 你可能会阅读[**参数化造型**](http://doc.babylonjs.com/教程/Parametric_Shapes) 部分.

* ** 创业一个管子**

```javascript
var tube = BABYLON.Mesh.CreateTube("tube", [V1, V2, ..., Vn], radius, tesselation, radiusFunction, cap, scene, false, BABYLON.Mesh.DEFAULTSIDE);

```
参数为: 名称, 路径, 半径, 曲面细分, 可选的半径函数,  头罩, 场景, 可更新否, 朝向.

* 名称: 字符串, 管子网格的名字符,
  * 路径: 连续的三元向量数组,  至少两个三元向量,
  * 半径: 数值, 管子的半径, 当 _半径函数_ 参数设置为 _null_时使用,
  * 曲面细分: 径向的段数,
  * 半径函数: _可选的_, 一个返回半径值的 javascript 函数. 这个可以设置为 _null_,
  * 头罩: BABYLON.Mesh.NO_CAP, BABYLON.Mesh.CAP_START, BABYLON.Mesh.CAP_END, BABYLON.Mesh.CAP_ALL,
  * 可更新否: 布尔值, 该管子后面是否可以被更新,
  * 朝向: 期望有用的朝向 (前向, 后像 或 双向).

如果你仅仅要使用默认的表现则最后两个参数可以忽略:
```javascript
var tube = BABYLON.Mesh.CreateTube("tube", [V1, V2, ..., Vn], radius, tesselation, radiusFunction, cap, scene);
```
管子也可以通过设置一个半径函数而作为[**参数化造型**](http://doc.babylonjs.com/tutorials/Parametric_Shapes) 的方式使用.



#### 可更新否
这个参数, 在每个网格创建方法里出现... 告知该网格在创建后是否可以被更新.
如果为 false (默认值), 则该网格数仅仅往GPU传送一次.
如果为 true, 则该网格数据可以被重新计算并在每帧刷新时传递给GPU.

#### 朝向
当一个网格被创建时, 可以为其提供一个可选的朝向.
该朝向被用来提供可见性而且/或则光反射性.
这个值有四个可能的值:
* BABYLON.Mesh.FRONTSIDE,

  * BABYLON.Mesh.BACKSIDE,
  * BABYLON.Mesh.DOUBLESIDE,
  * BABYLON.Mesh.DEFAULT 这是默认值, 当前同 FRONTSIDE.

这个参数时可选的. 如果没提供, 则 DEFAULT 值被设置.

*(我们假设默认 backFaceCulling 被启用了)*

 例如, 假设你创建一个基本形状像, 比如一个盒子，球体或平面，你没给它的设置材质.
如果你到平面的背后或者盒子/球体的里面, 你会注意到那些面时不可见的: Babylon.js 网格通常都是由默认的朝向 _FRONTSIDE_ 构成. 这意味着每个面只有一边可见.
试验下: http://www.babylonjs-playground.com/#14RNAU#4

如果你为网格应用了一个材质, 设置 _material.backFaceCulling = false;_, 同时用光源照明它, 你会注意到背面(或者里面)... 现在可见了, 但是它却不反射光.  同样的原因: 默认的朝向仍然是 _FRONTSIDE_.
*(你可以用这个值来禁用 _backFaceCulling_ )*

现在, 在你的网格构造函数里仅仅改变 _朝向_ 参数为 _BABYLON.Mesh.BACKSIDE_.  (也移除你试验的材质.)  你仅能看到平面的背面, 或者仅看到盒子和球体的里面 (内部的面).
试验: http://www.babylonjs-playground.com/#14RNAU#5

如果你为网格提供一些材质, 你可以看到光源仅仅能照射到背面 (平面的)或者里面 (盒子的, 球体的等).
*(你可以用_朝向_值来禁用 _backFaceCulling_ )*


最后, 改变 _朝向_ 参数值为 _BABYLON.Mesh.DOUBLESIDE_.
正如你猜测的, 网格面现在两边可见了. 而且如果你提供了材质, 光也会在两边都反射.
试验: http://www.babylonjs-playground.com/#14RNAU#6

那么为何不总是用 _BABYLON.Mesh.DOUBLESIDE_ 作为默认值 ?

因为此值创建一个前向面的网格两倍的顶点. 在其它方面, 你的网格消耗将翻倍.
*(你不能用 _BABYLON.Mesh.DOUBLESIDE_ 值来禁用 _backFaceCulling_)*



### 更多基础元素 - 地面
对这点, 我们在 [**娱乐场演示场景 02**](http://babylonjs-playground.azurewebsites.net/?2)里谈论过该基础元素, 但有更多的重要网格造型 (基础元素)没有包含在那个演示场景里.  它们(下面例子)是Babylon.js创建'地面'的各种方法.  让我们看看:

* **创建一个地面**

```javascript
var ground = BABYLON.Mesh.CreateGround("ground", 6, 6, 2, scene);
```

参数为: 名称, 宽度, 纵深, 子分段数, 场景

我们的 [**娱乐场演示场景01**](http://www.babylonjs-playground.com/?1)使用了一个CreateGround构造函数... 所以你可以使用上面的链接来看看它的行为.

* **使用高度图创建地面**

```javascript
var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "heightmap.jpg", 200, 200, 250, 0, 10, scene, false, successCallback);
```
参数为: 名称, 高度图路径, 宽度, 纵深, 子分段数, 最小高度,最大高度, 场景, 可更新否, 成功回调

高度图地面很简单, 但是我们决定创建一个独立的教程讲它, 以便能更多的讲述Babylon.js的这个重要特征. 请看我们的[**高度图教程**](http://doc.babylonjs.com/tutorials/Height_Map) 以学习所有的高度图地面知识.

* **创建一个瓦片地图**

感谢论坛用户Kostar111提供了这个方便的瓦片地图构造方法. 这儿是创建一个瓦片地图所需的基础代码.

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

参数为: 名称, 最小x值, 最小z值, 最大x值, 最大z, 细分数量 = 瓦片数量. (subdivisions.w : 宽度上的细分数量; subdivisions.h: 高度上的细分数量), 精度 = 一个瓦片内部的细分数量. (precision.w : 宽度上的精度; precision.h: 高度上的精度), 场景, 可更新否.

Kostar111 好人做到底了:为我们提供了一个关于如何使用瓦片地图的很好教程. [**点击这儿**](http://makina-corpus.com/blog/metier/how-to-use-multimaterials-with-a-tiled-ground-in-babylonjs) 查看该教程. 在那个链接, Kostar111全面地说明了瓷砖地面的工作方式，还提供了一些Babylon.js游乐场景, 很好地演示了一些它的许多用途.

## 结束语 ##
就是这样!现在你已经看了我们所有的基础元素, 同时看了它们的一些使用方法. 保持关注教程里这方面的内容, 因为新的基础元素很快会被添加: 你会[**在这个章节里**](http://doc.babylonjs.com/tutorials/Mesh_CreateXXX_Methods_With_Options_Parameter)发现更新了的名单和其所有参数的解释.
请自由设想你自己的基础元素创意, 并把它们提交到论坛上. 如果你能,请帮助我们增加基础元素列表.

## 下一步 ##
----
我们看到过, 我们需要一点'定位'来保持我们基础元素不覆盖场景里另一个基础元素. 现在,我们进一步的学习定位(有时叫做平移) 还有旋转和缩放. 准备好了吗?你肯定准备好了! [**点击这儿进入下一教程.**](http://doc.babylonjs.com/tutorials/Materials)
