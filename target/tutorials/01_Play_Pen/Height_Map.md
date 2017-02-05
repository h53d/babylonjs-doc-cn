---
ID_PAGE: 22141
PG_TITLE: 14. 高度图
---
## 介绍

在本教程,我们的目标是理解高度图,然后学习如何生成真实地面.

![高度图](http://www.babylonjs.com/tutorials/14%20-%20Height%20map/14.png)

_最终结果_ 

## 我怎么做到这个 ?

* **介绍**

通过Babylon.js非常容易生成这些山峰, 而且只需要一个函数. 但是开始做之前,我们必须定义一个新的材质,就像我们之前做过的很多次那样:

```javascript
var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
groundMaterial.diffuseTexture = new BABYLON.Texture("Earth__land.jpg", scene);

var groundPlane = BABYLON.Mesh.CreatePlane("groundPlane", 200.0, scene);
groundPlane.material = groundMaterial;
```

![高度图2](http://www.babylonjs.com/tutorials/14%20-%20Height%20map/14-1.png)

_我们的材质, 一张纹理, 应用到该平面上_

* **一张高度图的阐释**

理解高度图是本教程的主要目的. 一张高度图是个简化的绘图图像, 正如我们将使用的

![高度图3](http://www.babylonjs.com/tutorials/14%20-%20Height%20map/worldHeightMap.jpg)

这个图片将被用来生成我们的地形, 使用图片上不同的灰度产生不同的变形. 此图片就是地形的高程数据. 每个像素的颜色被解析成到网格"地面"的位移或"高度". 因此,像素越白,则你的山峰会越高.

为了帮助你生成这些灰度高度图,你可以使用诸如“Terragen”或”Picogen”等软件. 

* **Javascript code**

现在让我们看看这个名为“CreateGroundFromHeightMap”的强大函数:
```javascript
var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "worldHeightMap.jpg", 200, 200, 250, 0, 10, scene, false, successCallback);
```

此处有许多参数:
* _名字_
* _高度图图片地址_
* 网格大小: 
* > _宽度_
* > _高度_
* _细分数目_: 会增加网格的复杂性, 以提高其视觉效果:

![高度图4](http://www.babylonjs.com/tutorials/14%20-%20Height%20map/14-2.png)

* _最小高度_ : 网格的最低级别
* _最大高度_ : 网格的最高级别
* _场景_: 实际场景
* _是否可更新_: 指明该网格后继是否可被动态更新(布尔值)
* 成功后的回调函数: 当高度图被创建和顶点数据被创建后 将会调用该回调函数. 它是网格对象将作为其第一个参数的函数.

最周,当我们的新网格准备好后,我们可简单地应用我们的材质:
```javascript
ground.material = groundMaterial;
```

现在我们有个漂亮的三维的地球视图了!

![高度图4](http://www.babylonjs.com/tutorials/14%20-%20Height%20map/14-3.png)

在我的例子里,我已经添加了个天空盒(像我们在之前在[这](http://doc.babylonjs.com/tutorials/Environment)学到的), 还有个聚光灯来模拟太阳光的活动.

这儿是另一个展示你可以用BabylonJS高度图实现效果的例子:

![高度图5](http://www.babylonjs.com/tutorials/14%20-%20Height%20map/14-4.png)

* **提示**

当用户在操作相机时, 如果能够从地面下面看到高度图或在天空盒外放大高度图,那么它(高度图)会显得比较拙劣. 因此,为了避免这种情况,我们可以约束相机的运动:

```javascript
var camerasBorderFunction = function () {
        //角度
        if (camera.beta < 0.1)
            camera.beta = 0.1;
        else if (camera.beta > (Math.PI / 2) * 0.9)
            camera.beta = (Math.PI / 2) * 0.9;

  //缩放
        if (camera.radius > 150)
            camera.radius = 150;

        if (camera.radius < 30)
            camera.radius = 30;
    };

    scene.registerBeforeRender(camerasBorderFunction);
```

也许你有兴趣访问这个 [**娱乐场演示**](http://babylonjs-playground.azurewebsites.net/?14),那和本教程相辅相成.

## 下一步
干得漂亮!你的场景现在看起来不错了,而且你能想想许多新的风景了!一个更重要的事情你需要知道: [如何创建阴影](http://doc.babylonjs.com/tutorials/Shadows). 阴影会给你场景漂亮的渲染效果, 所以不要忘记它们!
