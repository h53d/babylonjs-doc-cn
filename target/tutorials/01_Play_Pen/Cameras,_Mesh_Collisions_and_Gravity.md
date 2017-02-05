---
ID_PAGE: 22091
PG_TITLE: 09. 相机，网格碰撞和重力
---
你玩过一款FPS (第一人称视角射击)游戏么?在本教程里, 我们将模拟同样的(FPS)相机运动: 放在地板上的相机，与地面发生的碰撞，以及可能与场景中的任何物体发生的碰撞。

![Elements](https://camo.githubusercontent.com/7422be3bf5ae147243aa3d29d9660a0210530201/687474703a2f2f7777772e626162796c6f6e6a732e636f6d2f7475746f7269616c732f30392532302d253230436f6c6c6973696f6e73253230477261766974792f30392e706e67)

_最终结果_ 

## 我怎么做到这个 ?

要复现这个运动, 我们需要做简单的3步:

**1 - 定义并应用重力**

第一件要做的时定义我们的重力向量，定义重力加速度G. 在一个经典的世界里，比如地球上，重力加速度的方向是沿着Y轴向下的(负方向) , 但是你可以自由的改变它!
```javascript
scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
```
 
重力加速度可以应用到任何你代码里之前已经定义的相机上。.
```javascript 
camera.applyGravity = true; 
```

**2 - 定义一个椭球体**

下一个重要的步骤是定义个椭球体包围相机. 这个椭球体表示我们播放器大小: 当网格和椭球体发生接触时就会抛出一个碰撞事件，以预防我们的相机和该网格考得太近:

![椭球体](https://camo.githubusercontent.com/19931f529e19679a0e2556e23fc94536e6a9b88c/687474703a2f2f7777772e626162796c6f6e6a732e636f6d2f7475746f7269616c732f30392532302d253230436f6c6c6973696f6e73253230477261766974792f30392d312e6a7067)

Babylon.js里相机的_椭球体_属性默认大小是 (0.5, 1, 0.5), 但是你通过改变值可以更高、更大、更小、更薄, 这依赖于轴的调整. 下面的例子里，我们将使相机的椭球体比默认的大一点:

```javascript
//设置包围相机的椭球体 (如您的播放器大小)
camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
```

**3 - 应用碰撞**

一旦你完成前面的设置，我们最后一步便是声明我们的场景对碰撞检测感兴趣:

```javascript
// 启用碰撞检测
scene.collisionsEnabled = true;
camera.checkCollisions = true;
```

然后声明哪些网格会和我们的相机发生碰撞:

```javascript
ground.checkCollisions = true;
box.checkCollisions = true;
```

这就可以了!简单!

通过访问Babylon.js [**娱乐场的演示**](http://www.babylonjs-playground.com/#4HUQQ)你能够体验下我们例子里使用的场景.

现在，你的相机会沿Y轴下落直到和地面发生碰撞. 而且，你的相机会和盒子发生碰撞当你将相机移近它时。

**4 - 物体间的碰撞**

你也能够在网格间执行同样的功能，通过使用 _mesh.ellipsoid_ 属性并调用 _mesh.moveWithCollisions(velocity)_ 函数来实现. 当启用碰撞检测时，此函数将根据给定的加速度移动网格，并检测当前网格和任何其它网格对象间是否会碰撞.

你也能使用 _mesh.ellipsoidOffset_ 在网格上偏移椭球体 (默认情况下椭球体位于网格中心)

```javascript
var speedCharacter = 8;
var gravity = 0.15;
var character = 你的网格对象;

character.ellipsoid = new BABYLON.Vector3(0.5, 1.0, 0.5);
character.ellipsoidOffset = new BABYLON.Vector3(0, 1.0, 0);

var forwards = new BABYLON.Vector3(parseFloat(Math.sin(character.rotation.y)) / speedCharacter, gravity, parseFloat(Math.cos(character.rotation.y)) / speedCharacter);
forwards.negate();
character.moveWithCollisions(forwards);
// 或者
var backwards = new BABYLON.Vector3(parseFloat(Math.sin(character.rotation.y)) / speedCharacter, -gravity, parseFloat(Math.cos(character.rotation.y)) / speedCharacter);
character.moveWithCollisions(backwards);
```

Dad72提供了演示: [**支持重力和碰撞检测的角色移动**](http://www.babylon.actifgames.com/moveCharacter/)

## 基于碰撞检测的Web工作线程 (2.1版本以上)

BabylonJS 2.1 允许用户将碰撞检测的计算移到外部的Web工作线程以实现更好的实时渲染.
该工作线程的实现集成在那个单一的框架文件中，而且开发者不需要做什么改变.
场景现在有新的标识(默认为false):
```javascript
scene.workerCollisions = true|false
```
设置该值为true将使工作线程在后台执行. 该线程将接收来自相机和网格的全部碰撞检测请求. 设置为false将使它为常规的碰撞检测计算.

想读到更多关于工作线程是如何实现的，请移步到Raanan的网页博客:

* https://blog.raananweber.com/2015/05/26/collisions-using-workers-for-babylonjs/
* https://blog.raananweber.com/2015/06/06/collisions-using-workers-for-babylonjs-part-2/

## 弧形旋转相机
弧形旋转相机也能支持检测碰撞，但是当碰撞发生时相机会停止移动而不是沿着障碍物移动。

为了启用碰撞检测，仅需调用 ```camera.checkCollisions = true```. 你可以使用这行代码来定义碰撞半径:

```javascript
camera.collisionRadius = new BABYLON.Vector3(0.5, 0.5, 0.5)
```

## 下一步
非常棒, 现在你能够开发真实的FPS游戏了!但是你也许想知道一个网格时什么时候与另外的网格发生碰撞的?非常好，因为这就是我们[下一教程](http://doc.babylonjs.com/tutorials/Intersect_Collisions_-_mesh)的教学目的.
