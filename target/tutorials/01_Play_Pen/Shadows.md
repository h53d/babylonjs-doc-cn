---
ID_PAGE: 22151
PG_TITLE: 15. 阴影
---
## 介绍

在本教程里,我们将学习在Babylon JS如何创建阴影. 阴影现在已经时动态的,而且时根据一个光源动态的生成.

![阴影](http://www.babylonjs.com/tutorials/15%20-%20Shadows/15.png)

_最终结果_ 

## 我怎么做到这个 ?

使用babylon.js的“ShadowGenerator”创建阴影很容易. 这个函数使用阴影映射: 从光源点视角生成的场景映射, 正如你在此处所见:

![阴影2](http://www.babylonjs.com/tutorials/15%20-%20Shadows/15-1.png)

阴影生成器使用的两个参数是: 阴影的大小, 和用于计算阴影的光源.
```javascript
var shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
```

接下来,你需要定义渲染哪个的阴影. 此处我们想要我们那个环的阴影, 但时你可以添加任何你想要的网格对象的:
```javascript 
shadowGenerator.getShadowMap().renderList.push(torus);
```

最后,你需要定义下阴影在哪儿呈现... 通过将网格的一个参数设置成来完成:
```javascript
ground.receiveShadows = true;
```

你可能希望减小因精度不够造成的阴影瑕疵. 要做到这点,你可以定义偏差(默认值是0.00005):
```javascript
shadowGenerator.bias = 0.01;
```

## 过滤器

你过你想更进一层, 就可以激活阴影过滤.

有三个过滤器可用:

### 差分阴影映射
```javascript
shadowGenerator.useVarianceShadowMap = true;
```
默认为_true_, 因为它对阴影的抗锯齿非常有用. 但是如果你想缩减计算的时间, 可以随意的改变它的值.

### 泊松采样
```javascript
shadowGenerator.usePoissonSampling = true;
```
你过你把该值设置为_true_, 则差分阴影映射将被禁用. 这个过滤器使用泊松采样柔化阴影. 结果会更好,但是也更慢.

qi### 模糊阴影映射 
```javascript
shadowGenerator.useBlurVarianceShadowMap = true;
```
这是个更好的柔化阴影过滤器但是也更慢. 它使用模糊阴影映射.

模糊的质量由两个属性定义:

* shadowGenerator.blurScale: 在应用模糊化的后期处理之前定义用于降级的级数. 默认情况,该值是2
* shadowGenerator.blurBoxOffset: 为应用在模糊化的盒子定义边缘偏移值. 默认情况下,该值是1 (Meaning the box will go from -1 to 1 in bot direction resulting in 9 values read by the blur postprocess).

### 例子

请在这里寻找一个聚光灯情况下各种过滤器的图片:

![生硬的阴影](http://www.babylonjs.com/forumpics/hard.jpg)

*没有过滤器*

![泊松采样](http://www.babylonjs.com/forumpics/poisson.jpg)


*泊松采样*

![差分阴影映射](http://www.babylonjs.com/forumpics/vsm.jpg)


*差分阴影映射*

![模糊差分阴影映射](http://www.babylonjs.com/forumpics/blurVSM.jpg)


*差分阴影映射*

## 关于光源
要记住,这个阴影生成器只能和一个光源配合使用. 如果你想根据另一个光源生成阴影, 那么你需要创建另一个阴影生成器.

仅点光源,定向光源和聚光灯光源能够投影:

```
var light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
```
点光源使用立方贴图渲染,因此需要慎重启用,因为这会导致一些性能问题.

聚光源使用透视投影,而定向光源使用正交投影. 两种投影都是自动计算以为你提供尽可能最好的阴影映射.

对于定向光源, 你可以通过修改```light.shadowOrthoScale``` (默认值为0.1,意味着从投影窗口最佳尺寸增加10%的大小)值来控制投影窗口的大小.

光源位置, 还有你加入到渲染列表的网格对象的位置, 一起决定着阴影将在哪出现.

现在你可能想访问为本教程准备的 [**娱乐场景**](http://babylonjs-playground.azurewebsites.net/?15).

你也可以访问 [点光源映射的娱乐场景](http://www.babylonjs-playground.com/#LYCSQ#12)

## 下一步
现在你已经成为了一名Babylon.js专业人才了, 也许是时候深入代码来掌握复杂的着色器,网格或纹理了. 我们的[维基主页菜单](http://doc.babylonjs.com/) 是你获取许多高级话题门户网站. 你也可以通过访问我们的Github页来参与到这个项目: [https://github.com/BabylonJS/Babylon.js](https://github.com/BabylonJS/Babylon.js) 同时参与到我们非常活跃的论坛: [http://www.html5gamedevs.com/forum/16-babylonjs](http://www.html5gamedevs.com/forum/16-babylonjs). 稍后见.
