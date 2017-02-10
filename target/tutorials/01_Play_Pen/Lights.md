---
ID_PAGE: 22071
PG_TITLE: 06. 光源
---
现在你已经学习了相机类型和如何在场景中放置相机, 我们将继续我们的系列教程-学习Babylon.js 的光源.

![元素](http://www.babylonjs.com/Screenshots/testlight.jpg)

_多光源下的一个漂亮球体_

## 我怎么做到这个 ?

光线用来产生各个像素的漫反射和镜面反射的颜色. 然后这种颜色被用来决定每个像素的材质的最终颜色. Babylon.js允许你想要多少就创建并注册多少光源, 但是要知道一种标准材质只能同事处理4个光源(场景光源列表中先启用的四个光源).

在这教程里，我将教你如何创建Babylon.js支持的每种类型的光源.

## 激活/停用光源 ##

每个光源可以通过调用器 *setEnabled(true/false)* 方法来激活或停用. 你也可以通过 *intensity* 属性来控制任何光源的全局强度. 它使用一个浮点类型的值 (比如 1.5). 这个教程临近结尾部分的一个例子展示了如何使用 *intensity* 属性和 *setEnabled()* 方法.

## 光源类型##
这就开始... Babylon.js有的很酷的四种光源:

- **点光源**

点光源时世界空间中由一个唯一点定义的光源. 光源从该点向所有方向发射光线. 点光源的一个好例子是太阳.

你可以通过 *漫反射(diffuse)* 和 *镜面反射(specular)* 属性来控制任何光源的颜色:

```javascript
var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(1, 10, 1), scene);
light0.diffuse = new BABYLON.Color3(1, 0, 0);
light0.specular = new BABYLON.Color3(1, 1, 1);
```
![](http://blogs.msdn.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-01-44-73-metablogapi/8484.image_5F00_thumb_5F00_53D78E00.png)

_带白色镜面反射的红色漫反射点光源_

- **定向光源**

一个定向光是通过一个方向定义的(没什么好惊奇的!). 该光源无处不在... 但是朝向一个特别的方向发射, 并且具有无限的范围. 默认情况，定向光建立在原点(0,0,0)的位置. 像点光源一样, 你可以通过 *漫反射(diffuse)* 和 *镜面反射(specular)* 属性来控制该光源的颜色:

```javascript
var light0 = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, -1, 0), scene);
light0.diffuse = new BABYLON.Color3(1, 0, 0);
light0.specular = new BABYLON.Color3(1, 1, 1);
```

![](http://blogs.msdn.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-01-44-73-metablogapi/1563.image_5F00_1ECD8F81.png)

_带白色镜面反射的红色漫反射定向光源_

- **聚光灯光源**

一个聚光灯光源是通过一个位置 (第二个参数), 一个方向(第三个参数), 一个角度(第四个参数), 和一个指数(第五个参数)定义的. 这些值定义了一个圆椎体，光源从中发射出来. 

角度(弧度单位)定义了聚光灯光源椎体光束的大小(照明q区域), 同时指数定义了光随距离(光照射的距离)衰减的速度. 像其它光源一样，你可以通过 *漫反射(diffuse)* 和 *镜面反射(specular)* 属性来控制该光的颜色:

![](http://blogs.msdn.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-01-44-73-metablogapi/7723.image_5F00_thumb_5F00_11F5CA14.png)

_一个简单绘图显示了聚光灯光源的形状_

```javascript
var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 30, -10), new BABYLON.Vector3(0, -1, 0), 0.8, 2, scene);
light0.diffuse = new BABYLON.Color3(1, 0, 0);
light0.specular = new BABYLON.Color3(1, 1, 1);
```

![](http://blogs.msdn.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-01-44-73-metablogapi/1738.image_5F00_thumb_5F00_18AB6448.png)

_一个带红色漫反射的白色镜面反射光聚光灯光源，椎体0.8弧度，衰减指数2_

- **半球状光源**

半球光源是模式现实环境光的简单方法. 半球光源是通过一个朝天的方向(构造函数的第二个参数)和三种颜色定义， 一种颜色提供给漫反射(天空的颜色-朝上的像素/面片)，一种是给地面的 (朝下的像素/面片的颜色), 以及一种给镜面反射的.

上面，完使用了词语 '朝上' 和 '朝下', 但是记住那个指向天空的方向 (构造函数的第二个参数) 可以被设置成任何方向. 朝向天空的方向经常是笔直向上的. 我们正模拟光从天空云里照射下来, 但是即使在阴天, 阳光也会从云层之上穿透下来. 所以，你可以将光线稍微像东倾斜以模拟多云的早晨天空，以及向西稍微倾斜模拟多云的傍晚天空. 这是个不会产生阴影的柔和光源.

现在，回到创建有用且有趣的半球光源:

```javascript
var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
light0.diffuse = new BABYLON.Color3(1, 1, 1);
light0.specular = new BABYLON.Color3(1, 1, 1);
light0.groundColor = new BABYLON.Color3(0, 0, 0);
```

![](http://blogs.msdn.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-01-44-73-metablogapi/4760.image_5F00_thumb_5F00_058CC84D.png)

_白/黑半球光源 - 朝上的像素白色(漫反射), 朝下的像素黑色(底色)_

在我们[网站](http://www.babylonjs.com/) 的特性测试节有个漂亮光源演示, 以及一个类似的光源演示可以在我们的 '娱乐场'找到, [点击这儿](http://www.babylonjs.com/playground/?06).

## 关于Babylon.js一行代码构造函数的额外信息: ##
这儿是一行构造函数的例子:
```javascript
var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 30, -10), new BABYLON.Vector3(0, -1, 0), 0.8, 2, scene);
```
那一行就是用来创建一个聚光源的全部. 我们希望Babylon.js场景中物品的创建... 尽可能快且尽可能简单. 我们也相关场景中的物品看起来/操作起来都只需编写一行代码. 聚光源是个非常强大的场景物品, 它的构造函数... 以便于在一行代码里表示和操作. 每个一行代码构造函数参数都有个设置场景物品的 '必要的初始化属性'. 通过那样做，我们知道它将通过一行代码来打开／运行.

有些属性我们设置为 '场景幕后的'. 比如属性 *强度*. 我们让该属性为'默认'浮点值1.0. 我们为你设置那个'必要的初始化属性'. 我们也调用光源的*setEnabled(true)* 方法.

我希望你知道两件重要的事情. 第一件，一个光源或任何Babylon.js场景物品的所有属性... 都可以在该对象被创建后设置. 第二件，如果你选择这样做， 你可以空着(设置为零或空)一行构造函数的参数, 然后一个属性一个属性的设置那些必须初始化的所有属性. 你已经见识过快速／简单的构造聚光源场景物品的方法. 下面是个慢且不那么简单的构造一个聚光源的方法.

```javascript
var light0 = new BABYLON.SpotLight("", new BABYLON.Vector3.Zero(), new BABYLON.Vector3.Zero(), 0, 0, scene);
light0.name = "我的缓慢且分散的构造聚光光源"
light0.定位 = new BABYLON.Vector3(0, 30, -10);
light0.direction = new BABYLON.Vector3(0, -1, 0);
light0.angle = 0.8;
light0.exponent = 2;
light0.intensity = 0.5;
light0.diffuse = new BABYLON.Color3(1, 1, 1);
light0.specular = new BABYLON.Color3(1, 1, 1);
light0.setEnabled(1);
```
使用这种构造场景的'长方法' ... 很少有必要或想要的. 当时我们认为你应该知道你可以用这种方式来构造，只要你选择.

## 发线和北面 - 看见光: ##
在你学习3D知识过程中，你应该在口头或书面听闻过词汇如 '_法线_' 和 '_背面_'. 在本教材中我们不会深入解释着两个概念，但是我们将尽力说明法线和背面是如何影响光线的. 

下面的图片将有助于你理解光源和法线以及背面是如何相互作用的. 图片展示了两个平面和两个光源. 一个光源是聚光源, 另一个是点光源. 那些箭头表明光线方向的法线，在标准场景中这些箭头是不可见的. 在这张图片中它们是被用来阐述法线概念的，正如那个钻石体和那个锥体是用来阐述两个光源的. 让我们自习看下图片.

![](http://urbanproductions.com/wingy/babylon/misc/normals03.jpg)
_一个蓝色背面平面和一个蓝色前面，在一个聚光源和一个点光源照射下_

正如你所见，当一个标准的Babylon.js平面的背面被照到时(左边平面)，是没有光照效果的,因为它的法线没有面对光线. 相反，但一个平面的前面被照到时，两个光源都很好的照亮了该平面，因为它的法线面对光线. 

有趣的是，注意两个平面都没挡住光线. 你可以看到左平面上的箭头，被光源照亮. 该平面没有阻止光线. 在Babylon.js里任何网格可阻挡光线的唯一方法是, 使用一个或两个ShadowGenerator(阴影生成器). 

最后注意， 我希望你知道左边平面的材质的背面剪切(backFaceCulling)属性被设置成否: material.backFaceCulling = false. 是否将其设置为 true 或 false， 光线对背面的照射效果都没有改变. 光线效果主要和被照射处的采光法线方向(图中箭头)相关. 标准Babylon.js平面(和地面)的采光法线方向瞄向前面.

**新**: 在经期Babylon.js版本里, 一个新属性被引入了... 叫做 _.range_:

```javascript
light.range = 300;
```
很快就介绍更多的 _.range_ 属性信息... 敬请关注.

## 下一步 ##
使用强大的光源，你的场景可能真的开始 '明亮'起来. 而且别忘了你可以变动光源的位置，方向，颜色，并因此创建一个精彩的'光秀'. 我们很快会谈论的，或者你可以自己探索如何做的. 也许你可以在场景的渲染循环里设置光线属性的. 有趣且漂亮!

尽管不是真的光，你也许对我们的[散射体光源](http://doc.babylonjs.com/教程/Using_the_Volumetric_LightScattering_post-process)(神光)系统感兴趣 .

猜猜看t!下一教程... 是关于动画的![点击这，我们开始吧!](http://doc.babylonjs.com/教程/Animations)
