---
ID_PAGE: 22111
PG_TITLE: 11. 拾取碰触
---
## 介绍

为你准备的非常有用的最后一种碰撞类型: 它就是使用你的鼠标拾取物体. 主要的难点是：点击的是三维物体而与此同时你的显示器却是二维平面的.

通过下面这个用枪射击的例子，让我们弄明白如何在你的三维场景中获得转换后的鼠标位置:


![拾取](http://www.babylonjs.com/tutorials/11%20-%20Collisions%20PickResult/11.png)

_最终结果_ 

## 我怎么做到这个 ?

Babylon引擎提供了有用的函数让你非常轻松的实现这个.

首先, 创建一个代表墙的平面, 而且是个附有中弹效果的平面, 我们将检索UI (用户界面)上的鼠标点击. 当事件一旦抛出, 使用函数“pick”获取些强有力的信息---点击和场景的关系.
```javascript
//当点击事件抛出时
window.addEventListener("click", function () {
   // 我们尝试拾取一个物体
   var pickResult = scene.pick(scene.pointerX, scene.pointerY);
}),
```
 
该pickResult对象主要是4个信息片段的组合:

1. _点击_ (布尔值): « 真 » 如果你的点击命中了场景中的一个物体.
1. _距离_ (浮点值): 激活相机与你命中的物体间的 “距离” (如果没有命中则未无穷大)
1. _拾取的网格_ (BABYLON.Mesh): 如果你命中一个物体，这时该选中的网格. 如果没有，它是null.
1. _拾取点_ (BABYLON.Vector3): 你点击的点, 转换到三维空间坐标的, 依赖于你点击的物体. 如果没命中则为null.

现在我们已经有了创建场景的所有数据。当用户点击墙面时我们仅需把中弹效果图(之前已经创建好的平面...所谓的中弹)放置好:
```javascript
// 如果点击到了墙面, 我们改变中弹图片位置
if (pickResult.hit) {
            impact.position.x = pickResult.pickedPoint.x;
            impact.position.y = pickResult.pickedPoint.y;
}
```
Fast, and easy, isn’t it?

请去[我们的在线娱乐厅](http://babylonjs-playground.azurewebsites.net/?11)随意体验这个场景... 

## 高级拾取特征

请注意pickResult对象能够提供额外的信息，详细如下:

- `faceId`: 这是拾取面的索引位置--在索引数组里的. 这些索引可以这样访问:
```
var indices = pickResult.pickedMesh.getIndices();
var index0 = indices[pickResult.faceId * 3];
var index1 = indices[pickResult.faceId * 3 + 1];
var index2 = indices[pickResult.faceId * 3 + 2];
```

- `submeshId`: 拾取网格里的子网格ID

- `bu` 和 `bv` 属性: 这些是拾取面的重心坐标. 拾取面由3个顶点组成，而且拾取点是这三个顶点的重心with the following weights:

  * `1 - bu - bv` for the vertex n. 0
  * `bu` for the vertex n. 1
  * `bv` for the vertex n. 2

- `getTextureCoordinates()`: 计算拾取点的纹理坐标, 返回纹理空间的2维向量，也就是坐标值在0至1间的坐标.

可能的用处包括:

+- 绘制动态纹理,
- 改变选中面 (删除，移动顶点，修改颜色...),
- 改变子网格的材质,
- 等等


## 下一步
这种碰撞检测方式适用于大多数情况。一旦你理解了鼠标拾取事件，你就可以使用它们优化你的应用程序开发.

现在已经知道碰撞检测的所有技能了，所有是时候去瞧瞧经典的三维效果如何了: [粒子](http://doc.babylonjs.com/tutorials/Particles).
