---
ID_PAGE: 22101
PG_TITLE: 10. 网格碰撞相交
---
## 介绍

在动态场景里，物体是在运动中彼此相互作用的. 为了更好的渲染此种情景，你需要知道你的网格具体什么 时候彼此相交的. 在本教程里，我们将探索碰撞检测系统是如何工作的.

![碰撞检测](http://www.babylonjs.com/tutorials/10%20-%20Collisions%20Intersect/10.png)

_最终结果_ 

## 我怎么做到这个 ?

本教程里将为你展示两种碰撞检测的方法: 第一种时当网格彼此相交时抛出碰撞事件，另一种是检测网格和单点的接触.

我们将讨论上面的场景. 第一个和第二个球体(气球)将在旋转的地面上碰撞, 后者仅是单点的接触碰撞. 当你你创建了这个基础的场景后，请继续阅读以学习更多的碰撞检测知识.

* **相交网格**

此处的关键是检测气球和地面间的接触点。我们用带两个参数的 “intersectsMesh()” 函数 : 被检测的网格，和相交的精度(布尔类型).

```javascript
if (balloon1.intersectsMesh(plan1, false)) {
  balloon1.material.emissiveColor = new BABYLON.Color4(1, 0, 0, 1);
} else {
  balloon1.material.emissiveColor = new BABYLON.Color4(1, 1, 1, 1);
}
```

为了避免网格上大量细节的检测计算销， Babylon引擎在物体的周围创建了一个边界盒, 以及碰撞网格. 这儿是个边界盒的例子:

![碰撞检测](http://www.babylonjs.com/tutorials/10%20-%20Collisions%20Intersect/10-1.png)

而且这个边界盒的精度可大可小, 这就是为什么我们有第二个参数的原因. 简而言之, 如果这个参数为true (默认是false), 那么边界盒将更叫贴近网格(OBB边界类型), 但是会有更多的计算开销. 请注意这种类型的边界盒对于旋转了一定角度的网格特别有用。

![碰撞检测](http://www.babylonjs.com/tutorials/10%20-%20Collisions%20Intersect/10-2.png)

因此，当你选择碰撞检测方式是请考虑对碰撞细节的要求。

如果你了解第二个参数的更多信息，你可以看看这个维基网页: [http://en.wikipedia.org/wiki/Bounding_volume](http://en.wikipedia.org/wiki/Bounding_volume), 特别是关于AABB和OBB模式

* **相交点**

另一个你可以使用的函数是“intersectsPoint()”，通过指定点来调用, 像这样:

```javascript
var pointToIntersect = new BABYLON.Vector3(10, -5, 0);
if (balloon3.intersectsPoint(pointToIntersect)){
  balloon3.material.emissiveColor = new BABYLON.Color4(1, 0, 0, 1);
}
```

我们在场景中定义了个精确的点, 如果我们的气球和这个点相交，那么特定事件将会被抛出，然后我们会改变气球的颜色。

通过访问[**我们娱乐厅的一个演示**](http://babylonjs-playground.azurewebsites.net/?10)，你能够体验本教程使用的这些代码.

## 下一步
通过这两个函数，你的场景变得更加的动态了: 你可以为相交和碰撞定义指定的响应方式， 以及开始为你的场景引入物理概念.

在我们下一教程, 你会发现如何[检测场景与鼠标的碰撞](http://doc.babylonjs.com/tutorials/Picking_Collisions).
