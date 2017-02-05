---
ID_PAGE: 22131
PG_TITLE: 13. 环境
---
## 介绍

你已经走过漫长的路途了，已经学了造型，光源，精灵，粒子，材质. 但是你的场景里还缺某种东西: 像样环境. 这是三个连续教程的第一部分，谈论场景的环境因素和效果。我们将从简单的场景清理颜色(`clearColor` 设置背景色)开始, 然后简述下场景的环境色`ambientColor`), 然后是6纹理的天空盒, 最后是为场景提供深度感的雾.

![环境](http://www.babylonjs.com/tutorials/13%20-%20Environment/13.png)

_一图展示Babylon.js的雾感_

## 我怎么做到这个?

不久我们将讨论那个漂亮的雾效果. 首先, 我想给介绍下[场景类型对象](http://doc.babylonjs.com/classes/Scene)的两个有趣属性:

* `scene.clearColor` - 改变'背景'色.
 `scene.ambientColor` - 通过几种效果改变颜色，包括环境光源.

两者都非常有用，且在各自范围内效果强劲.

### 改变背景色(`scene.clearColor`)

场景对象的这个'clearColor'属性，是基础的环境属性/调整器. 简单的说，这是你改变场景背景色的方式. 这个就是具体做法:

```javascript
scene.clearColor = new BABYLON.Color3(0.5, 0.8, 0.5);
```
或者你想使用某个预设的颜色而避免使用`new`关键字:
```javascript
scene.clearColor = BABYLON.Color3.Blue();
```
在网格、材质、纹理或任何其它东西最终颜色的计算中，该颜色和属性都不会被使用. 它简化了场景的背景色. 简单.

### 改变环境色(`scene.ambientColor`)

相反，场景对象的`环境色(ambientColor)`属性是个非常强大、有影响力的环境属性和调节器. 首先，让我们看看它的语法:

```javascript
scene.ambientColor = new BABYLON.Color3(0.3, 0.3, 0.3);
```
正如你所见，它的使用方式和设置`清理背景色(clearColor)`一样, 但是`环境色(ambientColor)`是用在很少的几个计算上---以决定场景物品的最终颜色.&nbsp; ,它主要用来和网格`标准材质的环境色属性(StandardMaterial.ambientColor)`合成出该网格材质最终的`环境色(ambientColor)`. 

你会发现当没有`场景环境色(scene.ambientColor)`时, `标准材质的环境色属(StandardMaterial.ambientColor)`和`标准材质的环境纹理(StandardMaterial.ambientTexture)`将没有任何表现效果.&nbsp; 给`场景的环境色(scene.ambientColor)`设置一些值,就如上面例子所示,然后那些网格上的你应用了的`标准材质的环境色属(StandardMaterial.ambientColor)`以及`标准材质的环境纹理(StandardMaterial.ambientTexture)`将会被激活.

默认情况下, `场景的环境色(scene.ambientColor)`被设置成`纯黑色(Color3(0, 0, 0))`, 它意味着没有场景环境色.

(请在我们的[运用标准材质](http://blogs.msdn.com/b/eternalcoding/archive/2013/07/01/babylon-js-unleash-the-standardmaterial-for-your-babylon-js-game.aspx)教程里查看环境色一节,以获取更多信息)

### 天空盒

为了给漂亮的晴朗天空一个完美的演绎, 我们准备创建一个简单的盒子,但是它具有特殊的纹理.

![天空盒](http://www.babylonjs.com/tutorials/13%20-%20Environment/13-1.png)

首先,我们的盒子没什么新东西, 只是要注意到被禁掉的[背面裁剪](http://en.wikipedia.org/wiki/Back-face_culling):
```javascript
var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene);
var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
skyboxMaterial.backFaceCulling = false;
skyboxMaterial.disableLighting = true;
skybox.material = skyboxMaterial;
```

接下来,我们设置`infiniteDistance` 属性. 这使天空盒跟随我们相机的位置.
```javascript
skybox.infiniteDistance = true;
```

现在我们必须删除天空盒的所有反射光(天空不会反射出太阳!):
```javascript
skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
```

然后,我们将特殊的天空纹理应用到盒子上去. 这纹理必须时为天空盒准备的, 它在我们这个例子里位于专用目录,名为"天空盒":
```javascript
skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("textures/skybox", scene);
skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
```
(关于反射纹理(reflectionTextures)的更多信息可以去我们的[运用标准材质](http://blogs.msdn.com/b/eternalcoding/archive/2013/07/01/babylon-js-unleash-the-standardmatNext, we apply our special sky texture to iterial-for-your-babylon-js-game.aspx)教程查看.)

在那个`/skybox` 目录, 我们必能找到6个天空纹理, 一个纹理支持天空盒的一个面. 每个图片名字必须根据盒子面来命名成: “skybox_nx.png”, “skybox_ny.png”, “skybox_nz.png”, “skybox_px.png”, “skybox_py.png”, “skybox_pz.png”.

![天空盒](http://www.babylonjs.com/tutorials/13%20-%20Environment/13-2.png)

如果你想要些免费的天空盒的纹理样例,将浏览器定位到: http://3delyvisions.co/skf1.htm (在使用前请看下授权说明.) 正如你从这些例子中所见,天空盒子纹理不单只为天空的花纹. 建筑,丘陵,山峰,树木,胡泊,行星,恒星(都可以被很好的利用)你均可以指定它为天空纹理的一部分.

最好要注意, 如果你想天空盒被渲染在所有其它东西的后面, 就要设置天空盒的`renderingGroupId`属性值为`0`, 同时所有其它对象`renderingGroupId`属性值均大于零,例如:
```javascript
skybox.renderingGroupId = 0;

// 一些其它网格对象的
myMesh.renderingGroupId = 1;
```

关于渲染组和渲染顺序的更多信息可以在[这儿](http://doc.babylonjs.com/tutorials/Transparency_and_How_Meshes_Are_Rendered)找到.

### 雾

雾是个相当高级的效果,但是在Babylon.js里雾已经被最大限度简化了. 现在给你的场景添加雾非常简单.&nbsp; 首先,像这样定义雾的模式:

```javascript
scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
```

这些是时可以使用的模式:
- `BABYLON.Scene.FOGMODE_NONE` - 默认值,雾被停用.
- `BABYLON.Scene.FOGMODE_EXP` - 雾的密度是根据一个指数函数定义.
- `BABYLON.Scene.FOGMODE_EXP2` - 和上面那个一样但是更快.
- `BABYLON.Scene.FOGMODE_LINEAR` - 雾的密度是根据一个线性函数定义.

-> 如果你选择`EXP`, 或 `EXP2` 模式, 那么你就可以定义密度选项(默认是`0.1`):
```javascript
scene.fogDensity = 0.01;
```
-> 否则, 你选择`LINEAR`模式, 那么你就可以定义雾起止的地方:
```javascript
scene.fogStart = 20.0;
scene.fogEnd = 60.0;
```

最后,无论你选择哪种模式,你都能够指定雾的颜色(默认是`BABYLON.Color3(0.2, 0.2, 0.3)`):
```javascript
scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
```
清楚了吧, 我告诉过你很容易的.

如果你想在游乐场看看并体验下本教程的场景, 你可以[**右击此处**](http://babylonjs-playground.azurewebsites.net/?13).

## 下一步
你现在应该已经有个漂亮的场景了, 只是缺乏你的三维模型, 你的虚拟世界很平坦, 那就是你场景的简陋之处. 因此,在我们下一个环境教程里, 我们将把你平坦的地面变成漂亮的山峰. 要学习这个,去[这儿!](http://doc.babylonjs.com/tutorials/Height_Map)
