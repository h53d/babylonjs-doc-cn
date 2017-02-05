---
ID_PAGE: 22051
PG_TITLE: 04. 材质
---
## 介绍

现在,你可以在场景的任意地方创建不同的基础网格元素, 我们将为这些网格赋予些材质, 以定义这些网格的外观.

![元素](http://www.babylonjs.com/tutorials/04%20-%20Materials/04.png)

[**娱乐场演示场景4 - 材质**](http://www.babylonjs.com/playground/?4)

## 我怎么做到这个 ?
我们对编写createScene函数已经很娴熟了,闭着眼睛都能搞定, 对吧?所以让我们开始摆弄一个全方位点光光源和一个有轨弧形旋转相机.  之后, 我们将开始制作些基础网格元素以便在其上测试我们的材质.

```javascript
function createScene() {
    var scene = new BABYLON.Scene(engine);
    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 100, 100), scene);
    var camera = new BABYLON.ArcRotateCamera("camera", 0, 0.8, 100, new BABYLON.Vector3.Zero(), scene);

    //Creation of spheres
    var sphere1 = BABYLON.Mesh.CreateSphere("Sphere1", 10.0, 6.0, scene);
    var sphere2 = BABYLON.Mesh.CreateSphere("Sphere2", 2.0, 7.0, scene);
    var sphere3 = BABYLON.Mesh.CreateSphere("Sphere3", 10.0, 8.0, scene);
[…]
    //Positioning the meshes
    sphere1.position.x = -40;
    sphere2.position.x = -30;
```

到目前为止, 你只有些灰色的网格. 多么的单调啊!为了给它们应用材质, 你需要像这样的创建一个新的材质对象:
```javascript
var materialSphere1 = new BABYLON.StandardMaterial("texture1", scene);
```

然后把这个材质应用到一个你选折的对象上, 比如:
```javascript
sphere1.material = materialSphere1;
```
或者, 创建并应用材质一步搞定:
```javascript
sphere1.material = new BABYLON.StandardMaterial("texture1", scene);
```

“我测试下我的场景, 然后 …没有变化…”

确切的说, 这个材质是默认的. 你可以根据你的喜好自定义材质. 你不需要改变网格本身, 只要修改该材质.

“所以,我该如何改变我的材质已使我的对象外观漂亮完美?”

这通过设置材质的属性实现, 我们看看它们么样:

* **透明度** (alpha通过)

Alpha合成和透明度一般会有点复杂. 关于透明度 [这儿](page.php?p=25100)能找到篇专门的文章. 你也许想阅读[关于它的维基页](http://en.wikipedia.org/wiki/Alpha_compositing).  当你在享受BabylonJS的粒子系统和精灵系统时, 你会遇到更多的透明度用途. 

 Alpha transparency, written in percent (%), can be applied to a material in this way:
```javascript
materialSphere1.alpha = 0.5;
```

* **散射**

一旦对象材质被一个光源点亮, 散射光就是材质对象的天然色. 你可以用```diffuseColor```属性指定一个纯色:
```javascript
materialSphere1.diffuseColor = new BABYLON.Color3(1.0, 0.2, 0.7);
```

或者, 你可以使用纹理:
```javascript
materialSphere1.diffuseTexture = new BABYLON.Texture("grass.png", scene);
```

![tof](http://www.babylonjs.com/tutorials/04%20-%20Materials/04-1.png)

**更多关于纹理:** 请确保你图片的路径正确 (相对或绝对路径). 支持的图片格式包括 JPG, PNG, JPEG, BMP, GIF… (每种图片格式都被你的浏览器支持).

如果你想在网格上平移(偏移) 你的纹理, 你可以使用 “uOffset” 和 “vOffset” 属性:
```javascript
materialSphere1.diffuseTexture.uOffset = 1.5;
materialSphere1.diffuseTexture.vOffset = 0.5;
```
而且,如果你想重复/铺瓦片模式使用图片(比如. 草地纹理), 你可以使用 “uScale” 和 “vScale” 属性:
```javascript
materialSphere1.diffuseTexture.uScale = 5.0;
materialSphere1.diffuseTexture.vScale = 5.0;
```

请记住 (u, v) 坐标参考下面轴:

![tof](/img/tutorials/crate.jpg)

而且如果你的材质有alpha特性, 你需要指明它:
```javascript
materialSphere1.diffuseTexture.hasAlpha = true;
```

这种情况下, alpha被用作alpha测试. 但是你也许想把它用在alpha混合上. 要做到这点, 只需设置 ```materialSphere1.useAlphaFromDiffuseTexture```

所有这些纹理设定对其它的标准材质属性也可同样使用. (.emissiveTexture, .ambientTexture, .specularTexture)  我将会提醒你的.  现在让我们继续谈论关于其它的标准材质属性.


* **放射光**

放射光决定了对象自身的颜色. 你可以用```emissiveColor```属性指定一个固体的色:
```javascript
materialSphere1.emissiveColor = new BABYLON.Color3(1, .2, .7);
```

或者, 你可以使用一个纹理:
```javascript
materialSphere1.emissiveTexture = new BABYLON.Texture("grass.png", scene);
```
参见上面的 **更多关于纹理** 一节.  当然, 要修改修改那个 'diffuse' 为 'emissive'.

* **环境光**

环境光可以被看作漫反射的第二层. 环境光产生的颜色对漫反色的作用是乘法效应. 这特别有用, 如果你想使用光照贴图烘焙到纹理. 你可以使用 ```ambientColor``` 属性指定一个固体的颜色:
```javascript
materialSphere1.ambientColor = new BABYLON.Color3(1, 0.2, 0.7);
```
或者, 你能够使用一个纹理:
```javascript
materialSphere1.ambientTexture = new BABYLON.Texture("grass.png", scene);
```
参加上面的 **更多关于纹理** 一节.  当然, 修改 'diffuse' 为 'ambient'.

* **镜面光**

镜面光体现了一个光滑平面对光源的反射色. 你可以通过 ```specularColor``` 属性指定一个固体的颜色:
```javascript
materialSphere1.specularColor = new BABYLON.Color3(1.0, 0.2, 0.7);
```
或者, 你能过使用一个纹理:
```javascript
materialSphere1.specularTexture = new BABYLON.Texture("grass.png", scene);
```
当使用纹理时能够设置 ```materialSphere1.useGlossinessFromSpecularMapAlpha``` 为真, 从而使用镜面映射alpha的光泽度.

你可也可以使用alpha值来控制镜面的行为表现. 默认情况下, 镜面光和alpha不相干, 但是你可以设置```materialSphere1.useSpecularOverAlpha``` 为真, 从而使alpha和镜面光成反比.

再次一的, 参见上面 **更多关于纹理** 一节.  当然, 修改出现的 'diffuse' 为 'specular'.

镜面光有另外一个属性.  镜面反射光的大小/强度可以通过```specularPower```属性来设定:
```javascript
materialSphere1.specularPower = 32;
```


*** 此处需要一节讲述 OpacityTexture , 很快就会有的. ***


在那里, 我们访问了标准材质的主要颜色和纹理属性.  但是我们还没讲完.  这儿还有些方便使用的属性.

* **背面剔除**

简单的说, “背面剔除”决定了一个标准材质从背面看时是否可见.  设置TRUE = NOT 可见.  更确切的说, 这个渲染速度优化的技术决定了一个图形对象上的多边形是否可见. 如果它设置为TRUE或布尔1, 则Babylon引擎不会渲染使用了该材质的网格对象的隐藏面. 默认是设置为TRUE, 但是如果需要的话可以改为false. You may want to read more about back-face culling at [the wikipedia page about it](http://en.wikipedia.org/wiki/Back_face_culling).  

在这个例子了, 纹理具有alpha, 而且前面那个球体的背面剔除被设置为false, 以便能够看到它的内面:

![tof](http://www.babylonjs.com/教程/04%20-%20Materials/04-2.png)

```javascript
materialSphere1.backFaceCulling = false;
```

* **线框**

你可以在线框模式下查看你的对象... 通过使用:
```javascript
materialSphere1.wireframe = true;
 ```

![tof](http://www.babylonjs.com/教程/04%20-%20Materials/04-3.png)

再次的, 在本教材里, 通过浏览[Babylon.js娱乐场场景 4](http://www.babylonjs.com/playground/?4), 你能越来越清晰生动地看事物了.

关于材质的更多信息, 可以通过阅读[**释放标准材质**](http://blogs.msdn.com/b/eternalcoding/archive/2013/07/01/babylon-js-unleash-the-standardmaterial-for-your-babylon-js-game.aspx) 和 [**高级纹理**](http://doc.babylonjs.com/tutorials/Advanced_Texturing)找到.

##下一步##
----
非常棒, 你的场景具有这些材质后看起来比之前好多了!稍后, 我们将看看如何使用高级材质技术. 但是现在, 我们必须学习 [**怎么使用相机**](http://doc.babylonjs.com/tutorials/Cameras).
