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
创建的相机对准Z轴正方向. The position numbers we used in the constructor above... place it in a useful starting position. FreeCameras have many properties that you can use to adjust your view. Some of the most commonly used properties are _position_, _rotation_, _speed_, _inertia_, and _fov_. The FreeCamera is also used as the base camera for many of our other cameras, so you will come to 'view' it as an old friend. Please see the [FreeCamera API page](http://doc.babylonjs.com/classes/FreeCamera) for more information.

* **ArcRotateCamera** - This is a type of camera that rotates around a given target pivot. It can be controlled with cursors and mouse, or with touch events. It requires a third-party file called “hand.js”. This file is included in many of our demos, or it can be downloaded by [**clicking right here**](http://handjs.codeplex.com/releases/view/119684).

Here is how you construct our handy ArcRotateCamera:

```javascript
// ArcRotateCamera >> Camera turning around a 3D point (here Vector zero) with mouse and cursor keys
// Parameters : name, alpha, beta, radius, target, scene
   var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
```

The ArcRotateCamera is a little strange to use, at first, but in no time, you will be using them often and easily. There are three unique properties on the ArcRotateCamera which are named _alpha_ (in radians), _beta_ (in radians), and _radius_ (a number). If you imagine an ArcRotateCamera being a satellite orbiting the Earth, then the _alpha_ is the longitudinal or sideways axis, the _beta_ is the latitudinal or up/down axis, and the _radius_ is the altitude or height (distance) from the Earth's core. Here is an illustration:
![](http://urbanproductions.com/wingy/babylon/misc/arc01.jpg)

The ArcRotateCamera has many properties that you can use to adjust your view. Some of the most commonly used properties are _alpha_, _beta_, _radius_, _target_, _speed_, _inertia_, and _fov_.

By default, (with no .alpha and .beta values set), ArcRotateCameras aim in a +x direction. Ironically, there is no rotation property on an ArcRotateCamera, but there is a position property. Because the orientation of an ArcRotateCamera is relative to its _target_ setting, it is wise to use a handy method called _setPosition()_ to set the camera position.

In the example below, we will construct an ArcRotateCamera with a target of 'Zero()' and no initial _alpha_, _beta_, or _radius_ values. (Be warned: A zeroed-out ArcRotateCamera aims in a strange way until _setPosition()_ is called). Then we will use the setPosition() function with a common Vector3 position value... to set our _alpha_, _beta_, and _radius_ values all at once, automatically:

```javascript
   // Create an ArcRotateCamera aimed at 0,0,0, with no alpha, beta or radius, so be careful. It will look broken.
   var camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 0, 0, 0, BABYLON.Vector3.Zero(), scene);
   // Quick, let's use the setPosition() method... with a common Vector3 position, to make our camera better aimed.
   camera.setPosition(new BABYLON.Vector3(0, 15, -30));
```

When we use that useful _setPosition()_ method, we need not concern ourselves with _alpha_, _beta_, and _radius_. We just make sure we have a _target_ property set ( which we did in the constructor with new BABYLON.Vector3.Zero() ), and then use _setPosition()_ to put our camera exactly where we want it, in 3D space. The handy _setPosition()_ method does the rest. 简单.

The ArcRotateCamera is an excellent camera to animate. By default, the ArcRotateCamera has no _upperAlphaLimit_ or _lowerAlphaLimit_. So once you have set your arcCamera as the scene.activeCamera (see further below), you can send your ArcRotateCamera gently orbiting around your target... by putting this simple line of Javascript into the render loop of your scene:

```javascript
   scene.activeCamera.alpha += .01;
```

It's beautiful, it's easy, it's Babylon.js. Please see the  [ArcRotateCamera API page](http://doc.babylonjs.com/classes/ArcRotateCamera) for more information.

It is interesting to know that panning an ArcRotateCamera is also possible. By default you can do that with CTRL+MouseLeftClick, but you can specify to use MouseRightClick instead, by setting _useCtrlForPanning_ to false in the _attachControl_ call :

```javascript
   camera.attachControl(canvas, noPreventDefault, useCtrlForPanning);
```
(more info about this method in the **Wrapping Up** section)

If required you can also totally deactivate panning by setting :
```javascript
   scene.activeCamera.panningSensibility = 0;
```

## Unique Purpose Cameras

There are some Babylon.js cameras that have unique purposes. I will try to explain their purposes as we examine each camera and their constructors.

The next 2 cameras... touch, and gamepad... are somewhat superseded by our new [Universal Camera](http://doc.babylonjs.com/classes/UniversalCamera) (explained far below).  The documentation for touch and gamepad cameras are still included here... for historical reference.

* **TouchCamera** - The TouchCamera is a camera that works closely with hand.js, and opens Babylon.js to the modern technology of DOM Gesture Events. Touch is a type a 'gesture', whether it be on a pad or screen, with finger(s), stylus, glove, feet, or laser pointer. Any movement that can be sensed... can be considered a gesture. You can learn all about gestures by visiting [**a wikipedia page that tells all about it**](http://en.wikipedia.org/wiki/Gesture_recognition).

The TouchCamera is specially programmed for nearly all modern gesture-active input devices. Much of its power comes from hand.js. If you would like to learn more about hand.js and its gestures-ready methods, take a look at [**this comprehensive blog entry**](http://blogs.msdn.com/b/eternalcoding/archive/2013/01/16/hand-js-a-polyfill-for-supporting-pointer-events-on-every-browser.aspx) written by our friend and hero David Catuhe.

There is much underlying magic to the TouchCamera, but like everything else in Babylon.js, we make it easy and enjoyable for you. Here is how to construct a TouchCamera:
```javascript
// TouchCamera >> Move in your world with your touch-gesture device
// Parameters : name, position, scene
    var camera = new BABYLON.TouchCamera("TouchCamera", new BABYLON.Vector3(0, 1, -15), scene);
```
The TouchCamera uses a FreeCamera as its basis, so all the powerful properties and methods of our familiar FreeCamera... are also found on our TouchCamera. You can explore all the properties and methods available on the TouchCamera... at [**our API documentation site**](http://doc.babylonjs.com/classes/TouchCamera).

* **GamepadCamera** - Local superhero David "davrous" Rousset, who invented our cool VirtualJoysticksCamera, is also the inventor of our cool GamepadCamera. Thanks David!  The Babylon.js GamepadCamera is specially designed to work with... you guessed it... gamepads. This camera works closely with Babylon.js Gamepad, Gamepads, and Xbox360Pad classes. More will be written about that, soon, and nearby.

Ok, let's create a GamepadCamera:

```javascript
// GamepadCamera >> Move in your scene with gamepad controls
// Parameters : name, position, scene
var camera = new BABYLON.GamepadCamera("Camera", new BABYLON.Vector3(0, 15, -45), scene);
```
Easy. Many of the powerful properties and methods found on our familiar FreeCamera... are also found on our GamepadCamera. Take notice of the ._angularSensibility_ and ._moveSensibility_ properties, similar to our DeviceOrientationCamera. You can explore all the properties and methods available on the GamepadCamera... at [our API documentation site](http://doc.babylonjs.com/classes/GamepadCamera).

* **DeviceOrientationCamera** - The DeviceOrientationCamera is a camera that is specifically designed to react-to device orientation events. Device orientation is when you tilt your modern mobile device forward or back, left or right, to control cameras or other scene items. And once again, our friend and technology guru David Catuhe has created [**a wonderfully-detailed blog entry**](http://blogs.msdn.com/b/eternalcoding/archive/2013/10/07/understanding-deviceorientation-events-by-creating-a-small-3d-game-with-babylon-js.aspx) to tell us all about it.

Again, we we want it to be easy and enjoyable for you. Here is how you construct a Babylon.js DeviceOrientationCamera:
```javascript
// DeviceOrientationCamera >> Move in your scene with device orientation
// Parameters : name, position, scene
    var camera = new BABYLON.DeviceOrientationCamera("DevOr_camera", new BABYLON.Vector3(0, 1, -15), scene);
```
The DeviceOrientationCamera also uses a FreeCamera as its basis, so all the powerful properties and methods of our familiar FreeCamera... are also found on our DeviceOrientationCamera. There are two rather important properties on the DeviceOrientationCamera: _angularSensibility_ and _moveSensibility_, which you can discover and explore... along with all of the other properties and methods... at [**our API documentation site**](http://doc.babylonjs.com/classes/DeviceOrientationCamera).

* **FollowCamera** - Forum user AlexB was kind enough to contribute the handy FollowCamera to Babylon.js. (Thanks AlexB!) This camera is specifically designed to follow any scene item with a ._position_... as it moves. It can be set to follow from the rear, from the front, or from any angle. Its follow distance and movement speeds can be set, as well.

The constructor method we will show below... is from [Alex's FollowCamera forum thread](http://www.html5gamedevs.com/topic/8433-smooth-camera-follow/) and, as you can see, Alex makes it easy. Here is how you construct a Babylon.js FollowCamera:
```javascript
// FollowCamera >> Follow a mesh through your scene
// Parameters : name, position, scene
    var camera = new BABYLON.FollowCamera("FollowCam", new BABYLON.Vector3(0, 15, -45), scene);
    camera.target = myMeshObject; // target any mesh or object with a "position" Vector3
```
The code above... constructs the FollowCamera and adds a target mesh, which is all that is required. But the FollowCamera has some more useful properties that you can set if you choose to do so. Here's a few, with some example values:
```javascript
camera.radius = 30; // how far from the object to follow
camera.heightOffset = 8; // how high above the object to place the camera
camera.rotationOffset = 180; // the viewing angle
camera.cameraAcceleration = 0.05 // how fast to move
camera.maxCameraSpeed = 20 // speed limit
```
And don't forget to set:
```javascript
scene.activeCamera = camera;
```

There you have it. AlexB's cool FollowCamera. Discover all of the other properties and methods... at [**our API documentation site**](http://doc.babylonjs.com/classes/FollowCamera).


* **VirtualJoysticksCamera** - The VirtualJoysticksCamera is a camera that is specifically designed to react-to Virtual Joystick events. Virtual Joysticks are on-screen (canvas atop canvas) 2D graphics that are used to control cameras or other scene items. This time, another friend and hero of ours... David Rousset... takes us on [**a video tour with Virtual Joysticks**](https://www.youtube.com/watch?v=53Piiy71lB0), and makes it look easy. That is because it **is** easy. You can also [**read about Virtual Joysticks**](http://blogs.msdn.com/b/davrous/archive/2013/02/22/creating-an-universal-virtual-touch-joystick-working-for-all-touch-models-thanks-to-hand-js.aspx) on David's blog.

With the touch of a touchscreen, or the click of a mouse button, the virtual joysticks activate. Not a bit of extra work for you. Like everything in Babylon.js, we try to make it easy and enjoyable. Here is how to construct a Babylon.js VirtualJoysticksCamera:
```javascript
// VirtualJoysticksCamera >> Move in your world with on-screen Virtual Joysticks
// Parameters : name, position, scene
    var camera = new BABYLON.VirtualJoysticksCamera("VJ_camera", new BABYLON.Vector3(0, 1, -15), scene);
```
The VirtualJoysticksCamera also uses a FreeCamera as its basis, so all the properties and methods of our familiar FreeCamera... are found on our VirtualJoysticksCamera as well. 

We have a [special tutorial dedicated to the VirtualJoysticksCamera](http://doc.babylonjs.com/tutorials/How_to_use_VirtualJoysticksCamera).

You can explore all the properties and methods available on the VirtualJoysticksCamera... at [**our API documentation site**](http://doc.babylonjs.com/classes/VirtualJoysticksCamera).

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
