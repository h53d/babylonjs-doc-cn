---
ID_PAGE: 22061
PG_TITLE: 05. 相机
---
# Babylon.js的相机#

在任何Babylon.js场景中, 你可以创建你想要的任意多个相机, 但是一次只能激活一个相机(除非你启用[多视图](http://doc.babylonjs.com/tutorials/How_to_use_Multi-Views)).

在Babylon.js里相机管理非常简单: 首先你创建下面相机清单中的一个相机, 让后将它和画布上的鼠标和触摸输入设备相关联(参见 **结束语** 部分).

Babylon.js支持许多类型相机. 我们将从两种最普通类型 - 自由相机和弧形旋转相机开始.

* **自由相机** - 它是一个 '第一人称射击' (FPS) 类型的相机，你通过鼠标和光标键控制相机. 我们许多相机都可以添加控制键，或者重新分配别的控制键，诸如'w', 'a', 's', 和 'd'.

自由相机不会自动的对准目标，但是创建自由相机后，你能够使用 _lockedtarget_ 属性来轻松的将它锁定到一个网格或某一三维坐标上.

这儿教你如何创建一个Babylon.js自由相机:
```javascript
// 自由相机 >> 你可以使用鼠标和光标键将之在场景中移动
// 参数: 名称，位置，场景
    var camera = new BABYLON.FreeCamera("FreeCamera", new BABYLON.Vector3(0, 1, -15), scene);
```
创建的相机朝着某一正Z轴方向. 我们在上面的构造函数中使用的定位数值... 把相机放在了一个有用的起始位置. 自由相机有许多属性可以用来调整视图. 其中一些最常用的属性有_位置(position)_, _转角(rotation)_, _速度(speed)_, _惯性(inertia)_, 和_视线夹角(fov)_. 自由相机也是作为许多其它相机的基础相机使用，所以你会把它当做老朋友看待的. 请参见[自由相机API页面](http://doc.babylonjs.com/classes/FreeCamera) for more information.

* **弧形旋转相机** - 这种相机围绕目标点旋转. 它可以被光标和鼠标控制，或者触摸事件也行. 它需要用到叫做“hand.js”的第三方组件. 在我们许多的演示中都包含有该文件，也可以通过 [**点击这里**](http://handjs.codeplex.com/releases/view/119684)来下载它.

这儿教你如何创建方便的弧形旋转相机:

```javascript
// 弧形旋转相机 >> 使用鼠标和光标键将相机绕着一个三维点(此处时0坐标处) 旋转
// 参数: 名称, 水平角(alpha), 垂直角(beta), 半径, 围绕的目标, 场景
   var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
```

刚开始时，弧形旋转相机使用起来有点怪怪的，但是没多久，你就会经常轻松自如的使用它们的. 弧形旋转相机有三个唯一的属性，它们是：_经度角alpha_ (弧度单位), _纬度角beta_ (弧度单位), 和_半径_ (一个数值). 如果你将弧度相机想象成一颗围绕地球旋转的卫星, 那么_alpha_就是经度或横向平轴, _beta_是纬度或者上下轴, 而_radius_是从地球核心往外的海拔或高度(距离). 这是个说明例子:
![](http://urbanproductions.com/wingy/babylon/misc/arc01.jpg)

弧形旋转相机有许多属性可以用来调整你的视图. 其中一些最常使用的有_经度(alpha)_, _纬度(beta)_, _半径_, _旋转目标(target)_, _速度_, _惯性(inertia)_, 和 _视线夹角(fov)_.

默认情况, (没有设置.alpha 和 .beta 的值), 弧形旋转相机朝着某一正X轴方向. 搞笑的是, 弧形旋转相机本身没有旋转属性，但是有个位置属性. 因为弧形旋转相机的朝向是相对其_旋转目标(target)_的, 所以使用方便的_setPosition()_方法设置相机位置是个好注意.

在下面的例子里, 我们将构造个旋转相机： 旋转目标是 '零点' 同时没有初始化_经度_, _纬度_, 和 _半径_ 值. (注意: 一个归零的弧形旋转相机的对准目标是怪异的，除非调用_setPosition()_给它设置位置). 那么我们将一个普通的三维向量值传给setPosition()函数... 一次完成我们的 _经度_, _纬度_, 和 _半径_ 值设置:

```javascript
   // 创建一个弧形旋转相机瞄准0,0,0, 没有经度，纬度和半径, 所以仔细点. 它看起来破碎了.
   var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
   // 快点， 让我们使用setPosition() 方法... 带一个普通三维向量, 以使相机的瞄向更好的目标.
   camera.setPosition(new BABYLON.Vector3(0, 15, -30));
```

当我们使用得力的 _setPosition()_ 方法时, 我们自己不需要关心 _经度_, _纬度_, 和 _半径_. 我们只要确保有个合适的 _旋转目标_ 属性的设置 ( 我们之前用new BABYLON.Vector3.Zero() 构造的), 然后使用 _setPosition()_ 把相机准确地放置到我们期望的三维空间中的位置. 便捷的 _setPosition()_ 方法将会做好剩下的事情. 简单吧.

对于播放动画来说弧形旋转相机非常棒. 默认情况下, 弧形旋转相机的经度在竖直方向不存 _上限(upperAlphaLimit)_ 和 _下限(lowerAlphaLimit)_. 所以一旦你将弧形旋转相机设置为场景的激活相机 (请往后看更多), 你就可以将弧形旋转相机围绕目标运转... 把下面一行Javascript代码放到场景的渲染循环中即可:

```javascript
   scene.activeCamera.alpha += .01;
```

漂亮，简洁， 这就是Babylon.js. 请查看 [弧形旋转相机API页面](http://doc.babylonjs.com/classes/ArcRotateCamera) for more information.

弧形旋转相机也可以平移， 有趣吧. 默认情况可以通过CTRL+ 鼠标左键 做到， 但是你也可以指定使用鼠标右键来代替, 通过在 _attachControl_ 调用中将l设置 _useCtrlForPanning_ 设置为 false来实现 :

```javascript
   camera.attachControl(canvas, noPreventDefault, useCtrlForPanning);
```
(关于这个方法的更多信息请参见 **总结**部分)

如果有需要你也可以通过设定来完全禁止平移:
```javascript
   scene.activeCamera.panningSensibility = 0;
```

## 独特用途的相机

存在一些特殊用途的Babylon.js相机我将试着解释它们的用途，我们检验每个相机的用途和构造函数.

下面两种相机...触控相机相机和手持相机... 有点会被新的[通用相机](http://doc.babylonjs.com/classes/UniversalCamera)取代(再晚些会讲解).  此处也包含有触控相机和手持相机的，以作为历史参考.

* **触控相机** - 它是和hand.js紧密接合使用的相机, 而且是基于DOM技术的开放式手势操作事件. 触碰是种'姿态', 无论在平板还是屏幕上使用手指、手写笔、手套、脚指或激光笔. 任何能被感知的运动... 都可以说是一种姿态. 你可以通过访问[**关于姿态的维基百页**](http://en.wikipedia.org/wiki/Gesture_recognition)学习所有的姿态技术.

触控相机是专程为几乎所有的现代手势活动输入设备准备的. 它的强大力多源于hand.js. 如果你想学习更多的hand.js及其手势调用方法, 看一看我们的朋友和英雄David Catuhe写的[**此综合博客条目**](http://blogs.msdn.com/b/eternalcoding/archive/2013/01/16/hand-js-a-polyfill-for-supporting-pointer-events-on-every-browser.aspx) .

触控相机底层有许多潜在的魔法, 但是正如Babylon.js里许多其它技术一样, 我们使之简单和容易上手. 这是如何创建一个触控相机:
```javascript
// 触控相机 >> 使用触控设备来在场景中移动它
// 参数: 名称，位置，场景
    var camera = new BABYLON.TouchCamera("TouchCamera", new BABYLON.Vector3(0, 1, -15), scene);
```
触控相机使用自由相机作为基础, 所以我们熟悉的自由相机具有的所有属性都可以在触控相机上找到. 你可以在[**我们的API文档网站**](http://doc.babylonjs.com/classes/TouchCamera)探索触控相机具有的所有属性和方法...

* **手持相机(GamepadCamera)** - 它也是很酷的虚拟操纵杆相机(VirtualJoysticksCamera)发明者 - 我们的本地英雄David "davrous" Rousset - 发明的. 谢谢David! 你猜对了，Babylon.js的手持相机(GamepadCamera)hi特别为游戏手柄设计的. 这种相机同Babylon.js的游戏手柄，游戏手柄类以及Xbox360Pad类密切接合起来工作. 关于那很快会写更多内容的.

好吧，让我们创建一个手持相机:

```javascript
// 手持相机 >> 使用控制手柄在场景中移动它
// 参数: 名称，位置，场景
var camera = new BABYLON.GamepadCamera("Camera", new BABYLON.Vector3(0, 15, -45), scene);
```
简单吧. 我们熟悉的自由相机的许多强有力属性和方法都可以在手持相机上找到. 注意下._角度感知(angularSensibility)_ 和 ._运动感知(moveSensibility)_ 属性, 类似于我们的设备定向相机(DeviceOrientationCamera). 你可以在[**我们的API文档网站**](http://doc.babylonjs.com/classes/GamepadCamera)探索手持相机具有的所有属性和方法...

* **设备定向相机(DeviceOrientationCamera)** - 它是专程为响应方向事件的设备设计的相机. 当你前后倾斜或左右倾斜现代移动设备时，定向设备将控制相机或场景中的其它物品. 再一次的， 我们的朋友和技术大拿David Catuhe已经创建了[**精彩详细的博客条目**](http://blogs.msdn.com/b/eternalcoding/archive/2013/10/07/understanding-deviceorientation-events-by-creating-a-small-3d-game-with-babylon-js.aspx)来教我们关于它的所以知识.

再次的, 我们希望它对你们来说简单而充满乐趣. 这儿是如何创建一个Babylon.js设备定向相机的方法:
```javascript
// 设备定向相机 >> 使用定向设备在场景中移动相机
// 参数：名称，位置，场景
    var camera = new BABYLON.DeviceOrientationCamera("DevOr_camera", new BABYLON.Vector3(0, 1, -15), scene);
```
设备定向相机也是使用自由相机作为基础, 因此我们熟悉的自由相机上所有强大的属性和方法在设备定向相机也能够找到. 设备定向相机上有两个特别重要的属性: _角度感知(angularSensibility)_ 和_运动感知(moveSensibility)_, 这些你可以和其它属性以及方法一起在[**我们的API文档站点**](http://doc.babylonjs.com/classes/DeviceOrientationCamera)发现和探索.

* **跟随相机(FollowCamera)** - 论域用户AlexB好心的将便捷的跟随相机贡献给了Babylon.js. (感谢AlexB!) 它特别设计的， 以便通过一个._position_属性设置来使相机随场景中的任何移动物品... . 它可以设置成从后面，前面，或任何角度跟随目标. 它的跟随距离和运动速度也可以被设置.

下面显示的它的构造方法是出自[Alex的跟随相机论坛主题](http://www.html5gamedevs.com/topic/8433-smooth-camera-follow/), 正如你所见，Alex使之很容易. 这儿是教你如何创建Babylon.js的跟随相机:
```javascript
// 跟随相机 >> 跟随个网格对象在场景里穿越
// 参数：名称，位置，场景
    var camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 15, -45), scene);
    camera.target = myMeshObject; // target any mesh or object with a "position" Vector3
```
上面的代码... 构建一个跟随相机然后设置个目标网格，这就是全部需要做到的. 如果你乐意，跟随相机还有许多有用的属性可以设置. 这儿就是些设置了属性值的:
```javascript
camera.radius = 30; // 距离跟随对象多远
camera.heightOffset = 8; // 在跟随对象上面多高放置相机
camera.rotationOffset = 180; // 观察角度
camera.cameraAcceleration = 0.05 // 移动速度
camera.maxCameraSpeed = 20 // 速度限制
```
不要忘了设置:
```javascript
scene.activeCamera = camera;
```

就这些，你实现了跟随相机. AlexB的酷酷的跟随相机. 在 [**我们的API文档站点**](http://doc.babylonjs.com/classes/FollowCamera)探索其它所有的属性和方法吧.


* **虚拟操纵杆相机(VirtualJoysticksCamera)** - 它是专门为响应虚拟操纵杆事件的设备设计的相机.. 虚拟操纵杆是屏幕上层(画布叠加)的二维图像，它用来控制相机或其它屏幕物品. 这次，我么另一位朋友和英雄... David Rousset... 为我们带来了[**一段虚拟操纵杆视频**](https://www.youtube.com/watch?v=53Piiy71lB0), 而且使它看起来很简单. 应为它 **本就** 简单. 你也可在David的博客上阅读[**关于虚拟操纵杆**](http://blogs.msdn.com/b/davrous/archive/2013/02/22/creating-an-universal-virtual-touch-joystick-working-for-all-touch-models-thanks-to-hand-js.aspx).

通过触碰触摸屏，或者点击鼠标键激活虚拟操纵杆. 你不需做其它额外的工作. 就像Babylon.js里的其它技术一样, 我们使之简单而充满乐趣. 下面就是如何构建Babylon.js的虚拟操纵杆相机:
```javascript
// 虚拟操纵杆相机 >> 通过屏幕上的虚拟操纵杆控制它在场景中移动
//参数：名称，位置，场景
    var camera = new BABYLON.VirtualJoysticksCamera("VJ_camera", new BABYLON.Vector3(0, 1, -15), scene);
```
虚拟操纵杆相机也是用自由相机作为基础, 因此自由相机的所有属性和方法均能在虚拟操纵杆相机上找到. 

我们有个[特别教程专为虚拟操纵杆相机](http://doc.babylonjs.com/tutorials/How_to_use_VirtualJoysticksCamera)准备.

你可以在 [**我们的API文档站点**](http://doc.babylonjs.com/classes/VirtualJoysticksCamera)探索虚拟操纵杆相机的所有属性和方法.

* **立体相机(AnaglyphCamera)** - 它是为使用红色与青色的3D眼镜准备的. 对于Babylon.js来说它也很新鲜性感的. 它使用后期处理过滤技术. 实际上有立体相机有两种类型.


第一种是 **弧形旋转立体相机**. 它的构造函数看起来像这样:
```javascript
// 弧形旋转立体相机 >> 使用过滤偏移技术实现三维立体效果的弧形旋转相机
// 参数 : 名称，经度，维度，半径，目标(三维向量形式)，眼界(度为单位)，场景
var camera = new BABYLON.AnaglyphArcRotateCamera("aar_cam", -Math.PI/2, Math.PI/4, 20, new BABYLON.Vector3.Zero(), 0.033, scene);
```

第二种是 **自由立体相机**. 它的构造函数看起来像这样的:
```javascript
// 立体自由相机 >> 使用过滤偏移技术实现三维立体效果的自由相机
// 参数：名称，位置(三维向量形式)，眼界(度为单位)，场景
var camera = new BABYLON.AnaglyphFreeCamera("af_cam", new BABYLON.Vector3(0, 1, -15), 0.033, scene);
```

那个_眼界(eyeSpace)_ 参数(和属性)设置左眼视图和右眼视图的偏差(搭界区域). 一旦你带上3D眼镜，你就会想进入该虚无飘渺之境体验下.

你可以访问[维基百页-漂浮立体技术](http://en.wikipedia.org/wiki/Anaglyph_3D)来学习其所有技术知识. 

* **虚拟现实设备定向相机(VRDeviceOrientationFreeCamera)** -  [这个玩意](http://doc.babylonjs.com/classes/VRDeviceOrientationFreeCamera)是新鲜东西, 但是我们也游戏文档.  这是构造函数:

```javascript
var camera = new BABYLON.VRDeviceOrientationFreeCamera ("Camera", new BABYLON.Vector3 (-6.7, 1.2, -1.3), scene, 0);
```

这儿有个使用了_虚拟现实设备定向相机_的[娱乐场演示](http://www.babylonjs-playground.com/#DZTQH#2) , 它也展示了如何将该相机初始化成指定角度的顶级秘笈.  它也介绍了我们新的给相机提供的[组合输入](http://doc.babylonjs.com/tutorials/Customizing_Camera_Inputs).  信息量比那还多... 走得更远一点.

_虚拟现实设备定向相机_也是使用自由相机作为基础... 因此自由相机的所有属性和方法都可以在_虚拟现实设备定向相机_上找到.

* **页面虚拟现实自由相机(WebVRFreeCamera)** - [这玩意儿](http://doc.babylonjs.com/classes/WebVRFreeCamera) 也非常新潮.  这是它的构造函数:

```javascript
// 页面虚拟现实自由相机 >> 在虚拟现实场景中移动
// 参数：名称，位置，场景
    var camera = new BABYLON.WebVRFreeCamera("WVR", new BABYLON.Vector3(0, 1, -15), scene);
```
页面虚拟现实自由相机也是用自由相机作为基础.. 因此自由相机的所有属性和方法也都可以在它上面找到.

* **万能相机** - Babylon.js2.3版本中引入的, 如其名所表述的，这种相机提供一种通用的方法来处理输入. 它基本上时自由相机 + 触控相机 + 手持相机的组合.

现在若没有特别指定，万能相机就是Babylon.js中默认使用的相机, 而且是你最好选择-如果你喜欢场景中拥有第一人称视角一样的控制. 事实上，在桌面机器上你可以使用键盘/鼠标来控制相机, 在移动设备、平板上或XboxOne上用手指/触控设备来控制. 一部相机同时支持处理这3种输入... 并以透明的方式提供给你. 这意味着在一台支持触控的PC上, 你可以在这台机器上是使用这3种输入方式，只要你喜欢. ;-) 在babylonjs.com网站上所有的演示都是基于该功能的. 将一个Xbox控制器接入你的PC，然后你就可以傲游大多数的演示了, 用用吧.

## 输入

Babylon.js的每种相机都会为你自动地处理输入... 只要你调用了相机的 _attachControl_函数. 而且你可以使用_detachControl_函数来卸载该自动处理. 大多Babylon.js老鸟以两步走的方式使用相机：激活相机，挂载相机:

```javascript
   // 第一部, 设定场景的激活相机指向你的相机.
   scene.activeCamera = myCamera;
   // 然后把激活相机挂载到画布上.
   scene.activeCamera.attachControl(canvas, noPreventDefault);
```

一个简化的版本看起来像这样的:
```javascript
myCamera.attachControl(canvas);
```

默认情况下 _noPreventDefault_ 被设置成 false, 意味着所有画布上的鼠标点击和触碰事件都会自动触发调用_preventDefault()_.


## 自定义输入

自由相机和弧形旋转相机依赖于用户的输入来移动. 如果你高兴，你可以使用Babylon.js提供的相机预设功能, 就像操纵杆相机，只要你能坚持.

如果你想基于用户的喜好改变输入方式, 可以使用预设的定指一个, 或者使用你自己的输入机制.  这些相机有个输入管理器，是为高级情景设计的. 请阅读[自定义相机输入](http://doc.babylonjs.com/tutorials/Customizing_Camera_Inputs)，以学习更多的为相机调整输入机制.

## 下一步
现在你已经学会了如何使用许多相机，而且学了我们两种最常用相机提供的一些高级输入选项. 你能控制如观看看场景，你能选择输入机制以及查看设备, 而且你知道如何移动相机. 为了给你的场景提供更真实的效果，现在我们开始学习 [**如何管理光源**](http://doc.babylonjs.com/tutorials/Lights). 很快再见面的.
