---
ID_PAGE: 22082
PG_TITLE: 08. 精灵
---
在本教程里，我们将学习如何操作精灵. 精灵是二维的图片或动画，我们将使用精灵来显示具有透明通道的图片。精灵总是朝向摄像机的。

如今，精灵往往用于显示动画角色，粒子效果，以及模拟复杂的三维对象，比如树木。 

![Elements](http://www.babylonjs.com/tutorials/08%20-%20Sprites/08.png)

_最终结果_ 

## 我怎么做到这个 ?

1- **精灵管理器**

 如果你想使用精灵，你需要创建一个"精灵管理"(在一处分组管理精灵的多个实例)来优化GPU资源。
这个管理器是强制的，即使你至想创建一个精灵。你只需像这样写代码:

```javascript
// 创建一个精灵管理器
var spriteManagerTrees = new BABYLON.SpriteManager("treesManagr", "Assets/Palm-arecaceae.png", 2000, 800, scene);
```

当创建一个精灵管理器时，你需要确定一些参数:
* Name: 该管理器的名字.
* 二维图片的地址 (大多数时候，你会使用带透明通道的图片，比如.PNG格式的).
* 管理器的容量: 这个管理器里可以管理的最大实例数(在我们的例子里, 我们可以创建树的两千个实例)。
* 单元尺寸，取决于你的图片尺寸，就像我们将在下面看到.
* 实际的场景，我们往其中添加本管理器.

在举一个例子，看看这个代码片段:
```javascript
var spriteManagerPlayer = new BABYLON.SpriteManager("playerManagr","Assets/Player.png", 2, 64, scene);
```

这次，我们仅要2个实例，而且我们精灵的尺寸是64像素的. 这个是我们的图片看起来的样子:

![Elements](http://www.babylonjs.com/tutorials/08%20-%20Sprites/08-1.png)

没给精灵的图片必须存储在64像素的方块中，不多也不少.

2- **创建一个实例**

现在我们已经有了管理器，我们可以创建精灵并将其关联到该管理器上。创建实例就是如此简单:

```javascript
var player = new BABYLON.Sprite("player", spriteManagerPlayer);
```

瞧， 你已经显示出你的精灵了!

如果你希望给这个实例添加参数，你可以像操作其它网格对象一样:
```javascript
player.position.y = -0.3;
```

但是因为它是个精灵，你可以使用特殊的参数: 你可以改变它们的大小，或者它们的朝向:
```javascript
player.size = 0.3;
player.angle = Math.PI/4;
player.invertU = -1;
```

从Babylon.js v2.1开始, 你可以定义精灵的宽度和高度:
```
player.width = 0.3;
player.height = 0.4;
```

你可以继续使用 ```player.size``` 而且在这种情况下宽度和高度是一样的.

3- **精灵动画**

使用精灵的优势之一是利用它们的动画功能. 你仅需加载一个大的包含所有动画图像的图片文件. 只是要注意在管理器中指定方形的像素尺寸 (例如 64 像素的).

这儿是个完整的精灵图像例子的样子:

![Elements](http://www.babylonjs.com/tutorials/08%20-%20Sprites/08-2.png)

这个会演示角色的40多个动作定位，取决于具体的情况 (走路，跳跃,…). Babylon的引擎会自动读取精灵数据，这些都是引擎帮你做的 :)

如果你想开始播放动画，可以简单的调用这个函数:
```javascript
player.playAnimation(0, 43, true, 100);
```

通过使用这些参数来调用 « playAnimation » , 我们的角色会播放从0帧到43帧的动画. 第三个参数指示这个动画时否会循环播放。. 还有第三个参数是帧间的延迟 (延迟越小，动画会播放得更快).

最后，如果你想定位到某个特殊图像上 (例如. 最后一帧的图像, 当角色不在移动时), 就调用:
```javascript
player.cellIndex = 44;
```

你可以通过访问 [**娱乐场场精灵演示**](http://babylonjs-playground.azurewebsites.net/?8) 来体验本教程的这些场景和代码.

## 下一步
在你的场景中使用精灵吧，不要犹豫: 它们不是资源密集性的，而且它们真的有助于保持应用程序的高帧频.

现在你知道如何创建一个完整简约的动态场景，而且它对于即将讨论[碰撞](http://doc.babylonjs.com/tutorials/Intersect_Collisions_-_mesh)非常重要.
