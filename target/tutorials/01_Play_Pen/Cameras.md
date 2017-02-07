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

* **AnaglyphCamera** - The AnaglyphCamera is for use with red and cyan 3D glasses. It is very new to Babylon.js, and to be honest quite sexy. It uses post-processing filtering techniques. There are actually two types of AnaglyphCamera.


The first is the **AnaglyphArcRotateCamera**. Its constructor looks like this:
```javascript
// AnaglyphArcRotateCamera >> Analglyph 3D using filter-shifted ArcRotateCamera
// Parameters : name, alpha, beta, radius, target (in Vector3), eyeSpace (in degrees), scene
var camera = new BABYLON.AnaglyphArcRotateCamera("aar_cam", -Math.PI/2, Math.PI/4, 20, new BABYLON.Vector3.Zero(), 0.033, scene);
```

The second is the **AnaglyphFreeCamera**. Its constructor looks like this:
```javascript
// AnaglyphFreeCamera >> Analglyph 3D using filter-shifted FreeCamera
// Parameters : name, position (in Vector3), eyeSpace (in degrees), scene
var camera = new BABYLON.AnaglyphFreeCamera("af_cam", new BABYLON.Vector3(0, 1, -15), 0.033, scene);
```

The _eyeSpace_ parameter (and property) sets the amount of shift between the left eye view and the right eye view. Once you are wearing your 3D glasses, you might want to experiment with this float value.

You can learn all about anaglyphs by visiting a [Wikipedia page that explains it thoroughly](http://en.wikipedia.org/wiki/Anaglyph_3D). 

* **VRDeviceOrientationFreeCamera** - The [VRDeviceOrientationFreeCamera](http://doc.babylonjs.com/classes/VRDeviceOrientationFreeCamera) is new, but we have SOME documentation.  Here is the constructor:

```javascript
var camera = new BABYLON.VRDeviceOrientationFreeCamera ("Camera", new BABYLON.Vector3 (-6.7, 1.2, -1.3), scene, 0);
```

Here is a [playground demo](http://www.babylonjs-playground.com/#DZTQH#2) that uses it, as well as showing some top secret tricks for making the camera initialize to certain angles.  It also introduces our new [Composable Inputs](http://doc.babylonjs.com/tutorials/Customizing_Camera_Inputs) for cameras.  More about that... a bit further along.

The VRDeviceOrientationFreeCamera uses FreeCamera as its basis, so all of the properties and methods of FreeCamera... are also found on our VRDeviceOrientationFreeCamera.

* **WebVRFreeCamera** - The [WebVRFreeCamera](http://doc.babylonjs.com/classes/WebVRFreeCamera) quite new as well.  Here is its constructor:

```javascript
// WebVRFreeCamera >> Move in your VR scene
// Parameters : name, position, scene
    var camera = new BABYLON.WebVRFreeCamera("WVR", new BABYLON.Vector3(0, 1, -15), scene);
```
The WebVRFreeCamera uses FreeCamera as its basis, so all of the properties and methods of FreeCamera... are also found on our WebVRFreeCamera.

* **Universal Camera** - Introduced with version 2.3 of Babylon.js, this camera, as its name says... provides a universal way to handle inputs. It's basically a combination of the FreeCamera + TouchCamera + GamepadCamera.

The Universal Camera is now the default camera used by Babylon.js if nothing is specified, and it’s your best choice if you’d like to have a FPS-like control in your scene. Indeed, you can control the camera using keyboard/mouse on a desktop machine, using a finger/touch on a mobile device and a gamepad controller on Xbox One, for instance. The same camera is handling those 3 inputs at the same time... in a transparent way for you. This also means that on a touch PC, you can use those 3 types of inputs on the same machine, if you’d like. ;-) All demos on babylonjs.com are based upon that feature. Plug a Xbox controller into your PC and you’ll be able to navigate most of our demos, using it, for instance.

## Inputs

Every Babylon.js camera will automatically handle inputs for you... once you call the camera's _attachControl_ function. And you can revoke the control by using the _detachControl_ function. Most Babylon.js experts use a two-step process to activate and attach a camera:

```javascript
   // First, set the scene's activeCamera... to be YOUR camera.
   scene.activeCamera = myCamera;
   // Then attach the activeCamera to the canvas.
   scene.activeCamera.attachControl(canvas, noPreventDefault);
```

A simpler version might look like this:
```javascript
myCamera.attachControl(canvas);
```

By default _noPreventDefault_ is set to false, meaning that _preventDefault()_ is automatically called on all canvas mouse clicks and touch events.


## Customizing inputs

FreeCamera and ArcRotateCamera rely upon user inputs to move the camera. If you are happy with the camera presets Babylon.js is giving you, like the GamepadCamera, just stick with it.

If you want to change user inputs based upon user preferences, customize one of the existing presets, or use your own input mechanisms.  Those cameras have an input manager that is designed for those advanced scenarios. Read [customizing camera inputs](http://doc.babylonjs.com/tutorials/Customizing_Camera_Inputs) to learn more about tweaking inputs on your cameras.

## Next step
You have now learned how to use many cameras, and learned some advanced input options available on our two most-used cameras. You can control how you see your scene, you can choose your input and viewing devices, and you now know how to move cameras around. To give your scene a more realistic effect, we are now going to learn [**how to manage lights**](http://doc.babylonjs.com/tutorials/Lights). See you soon.
