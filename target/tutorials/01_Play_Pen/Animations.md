---
ID_PAGE: 22081
PG_TITLE: 07. 动画
---
# 动画
你的场景开始看起来很棒了，但它仍然是呆板且静态。为了给它注入动态，我们将开始学习如何控制电脑来按照你指定的方式移动你创建的网格对象。

![Elements](http://www.babylonjs.com/tutorials/07%20-%20Animation/07.png)

_最终结果_ 

有两种主要的方式实现场景动画。第一种方式是定义一系列的键值集合，并且定义好每个键值对应的对象物状态。第二种方式可以定义更复杂的动画，在运行是改变动画代码。

## 简单动画

基于众多物体对象动画也叫电影片段。一个动画是由许多属性和一系列的键值定义的。每个键值代表了动画片段在那个时刻的值。

为了实现今天的动态场景，我们开始创建自己的环境：

```javascript
function createScene() {
  //这儿... 作为开头的基础场景元素[scene,light,camera]
  
  //创建盒子
  var box1 = BABYLON.Mesh.CreateBox("Box1", 10.0, scene);
  box1.position.x = -20;
```

我们的目标是：移动这个"box1"。首先，创建动画对象：

```javascript
var animationBox = new BABYLON.Animation("myAnimation", "scaling.x", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
```

更多信息在参数里：

**参数1** - 动画的名称，仅此而已。

**参数 2** - 关心的属性。这个可以是网格的任何属性，取决于你要修改什么。此处我们想在X轴方向上放大对象, 所以此处使用“scaling.x”。

**参数 3** - 请求的每秒帧数：这个动画里最大 的FPS。

**参数 4** - 修改的类型。此处你决定开始修改什么类型的数据：floating（比如是平移），一个向量(比如是方向)，或四元数。具体的值会是：

* ```BABYLON.Animation.ANIMATIONTYPE_FLOAT```
* ```BABYLON.Animation.ANIMATIONTYPE_VECTOR2```
* ```BABYLON.Animation.ANIMATIONTYPE_VECTOR3```
* ```BABYLON.Animation.ANIMATIONTYPE_QUATERNION```
* ```BABYLON.Animation.ANIMATIONTYPE_MATRIX```
* ```BABYLON.Animation.ANIMATIONTYPE_COLOR3```

**参数 5** - 最后,  你需要决定并输入这个动画的行为类型，这些会决定动画的受限(比如:当到最后一帧时是否继续，是否重新开始，或者停止)：

* 使用之前的值然后递增： ```BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE```
* 从初始值重启 ```BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE```
* 保持最后的值: ```BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT```

现在我们已经有动画对象了，可以谈论如何修改那些值了。在我们这个案例，我们想放大盒子，但是不是线性方式，而是放大时盒子越大则放大的速度越快，缩小时盒子越小缩得越慢。如此:

```javascript
// 存储所有动画键值的数组
var keys = [];

//在动画0键，放大倍数是 1。
  keys.push({
    frame: 0,
    value: 1
  });

//在动画的第20键，放大倍数是0.2。
  keys.push({
    frame: 20,
    value: 0.2
  });

//在动画的第100键，放大倍数是1。
  keys.push({
    frame: 100,
    value: 1
  });
```

紧接着，最重要的两步：
* 将存有动画信息的数组添加到动画对象上。

```javascript
animationBox.setKeys(keys);
```
* 将动画和对象链接起来

```javascript
box1.animations.push(animationBox);
```

最后，你可以在你应用的任何时间点通过一行代码加载动画。

```javascript
scene.beginAnimation(box1, 0, 100, true);
```

**提供给scene.beginAnimation的参数：**

  | 名称 | 类型 | 描述
---|---|---|---
  | 目标 | 任意 | 特定目标
  | 起始| 数 | 开始fps
  | 止于 | 数量 | 结束fps
可选 | 循环 | 布尔值 | 如果为真,则动画循环播放 (取决于BABYLON.Animation.ANIMATIONLOOPMODE)
可选 | 速率 | 数值 | 默认 : 1. 动画的速率
可选 | onAnimationEnd | () => void | 该函数在动画的结束被触发调用(同样取决于 ANIMATIONLOOPMODE)
可选 | 可播放 | [Animatable](http://doc.babylonjs.com/classes/Animatable) | 一个可选的特殊动画
---

这个函数返回一个 ```BABYLON.Animatable``` 对象,通过该对象能够访问个别的动画 (例如使用 ```getAnimationByTargetProperty``` 功能).

该 ```BABYLON.Animatable``` 对象也支持下列函数:
- ```pause()```
- ```restart()```
- ```stop()```
- ```reset()```

这些指令将应用到包涵在 _animations 数组里的每个动画对象上. 通过提供目标对象来调用 ```scene.getAnimatableByTarget()``` 你也可以访问当前正在运行的 ```BABYLON.Animatable``` 对象.

你做到了!现在我们已经完全实现在x轴方向缩放 box1 的动画. 现在你也许希望在y轴上缩放box1, 而且实时移动box1. 不要犹豫在一个网格对象上合并多个动画, 通过创建多个动画片段并把它们追加到 _animation_ 属性上. ;)

## 控制动画

每个动画片段都有一个属性: ```currentFrame``` , 其指明当前动画的键.

对于高级的关键帧动画, 你也可以定义个函数实现在键之间插入过度效果. 默认情况下,这个函数如下:

```javascript
BABYLON.Animation.prototype.floatInterpolateFunction = function (startValue, endValue, gradient) {
  return startValue + (endValue - startValue) * gradient;
};

BABYLON.Animation.prototype.quaternionInterpolateFunction = function (startValue, endValue, gradient) {
  return BABYLON.Quaternion.Slerp(startValue, endValue, gradient);
};

BABYLON.Animation.prototype.vector3InterpolateFunction = function (startValue, endValue, gradient) {
  return BABYLON.Vector3.Lerp(startValue, endValue, gradient);
};
```

## 帮助函数

通过一个扩展函数你可以创建快速动画:

```Javascript
Animation.CreateAndStartAnimation = function(name, mesh, tartgetProperty, framePerSecond, totalFrame, from, to, loopMode);
```

为了使用该函数,你需要知道这些:
- 你的动画需要有预定义的关键帧 (仅有2个关键帧被创建 : **开始** 和 **结束**)
- 这些动画仅在 **AbstractMesh** 对象上有效.
- 这些动画在该函数调用后立即播放.

这有个使用 **CreateAndStartAnimation()** 函数的例子:

```Javascript
BABYLON.Animation.CreateAndStartAnimation('boxscale', box1, 'scaling.x', 30, 120, 1.0, 1.5);
```
快速而简便. :)

## 动画渲染

作为2.3+版本的 Babylon.js, 你能通过设置 *enableBlending* 为 true来启动一个动画. 被渲染了的动画将被添加到当前对象状态上. 这会对用户很方便 - 例如:控制行走中的角色, 或者实时响应来自输入设备的数据值变化.

在下面这个娱乐展示中, 每次你点击 FPS 标签时, 那个盒子的当前位置会被作为参数重新渲染. :

http://www.babylonjs-playground.com/#2BLI9T#2

尽管这个娱乐展示的是 渲染自身重复的动画, 但更常见的情况是, 渲染不同的动画 - 进入不同的状态,比如当一个走动中的角色切换到跑动.

## 简化函数

你可以使用简化函数给动画添加一些不同的行为.
如果你希望获得关于简化函数的更多信息,这儿有一些有用的链接 : 
- [MSDN 简化函数文档](http://msdn.microsoft.com/en-us/library/ee308751.aspx)
- [简化函数懒人表单](http://easings.net/fr)

所有这些BABYLON实现的简化函数,都允许使用自定义的数学公式应用在动画上.

这儿是一些你可直接使用的预定义简化函数 : 
- ```BABYLON.CircleEase()```
- ```BABYLON.BackEase(amplitude)```
- ```BABYLON.BounceEase(bounces, bounciness)```
- ```BABYLON.CubicEase()```
- ```BABYLON.ElasticEase(oscillations, springiness)```
- ```BABYLON.ExponentialEase(exponent)```
- ```BABYLON.PowerEase(power)```
- ```BABYLON.QuadraticEase()```
- ```BABYLON.QuarticEase()```
- ```BABYLON.QuinticEase()```
- ```BABYLON.SineEase()```

你可以使用 **EasingMode** 这个属性来修改简化函数的行为, 也就是, 改变动画是如何插入的.
有三个值你可以用来赋给 EasingMode: 
- ```BABYLON.EasingFunction.EASINGMODE_EASEIN``` : 按照简化函数的数学公式来控制插入.
- ```BABYLON.EasingFunction.EASINGMODE_EASEOUT``` : 按照内插法 减去 简化函数的公式输出 来控制插入 .
- ```BABYLON.EasingFunction.EASINGMODE_EASEINOUT``` : 头半部份用EASEIN的方式,后半部份用EASEOUT的方式来控制插入. 

这儿是个简单的例子, 使用简化函数 ```CirleEase``` 来让椭圆环体动起来的动画 :

```Javascript
//创建一个3维空间里的30帧每秒的动画
var animationTorus = new BABYLON.Animation("torusEasingAnimation", "position", 30, BABYLON.Animation.ANIMATIONTYPE_VECTOR3, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

// 椭圆环体的目标位置
var nextPos = torus.position.add(new BABYLON.Vector3(-80, 0, 0));

// 动画片段的键值
var keysTorus = [];
keysTorus.push({ frame: 0, value: torus.position });
keysTorus.push({ frame: 120, value: nextPos });
animationTorus.setKeys(keysTorus);

// 创建一个简化函数
var easingFunction = new BABYLON.CircleEase();

// 对于每个简化函数, 你可以从 EASEIN (default), EASEOUT, EASEINOUT 中选择一个模式
easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);

// 将简化函数添加到动画中
animationTorus.setEasingFunction(easingFunction);

// 将动画添加到我的 椭圆环体动画集中
torus.animations.push(animationTorus);

//最后, 以不断重复从0到120键值的方式加载动画
scene.beginAnimation(torus, 0, 120, true);
```

你也能用贝塞尔曲线的算法, 使用 **BezierCurveEase(x1, y1, x2, y2)** 函数.
这特地准备了一个参考来说明如何创建你的曲线算法 : [http://cubic-bezier.com](http://cubic-bezier.com)

这儿是个非常酷的使用贝塞尔算法的实现 :

![](http://www.dotmim.com/sitefiles/babylon/bezier.jpg)

```Javascript
var bezierEase = new BABYLON.BezierCurveEase(0.32, -0.73, 0.69, 1.59);
```

最后, 你能够扩展 **EasingFunction** 基础函数, 从而创造你自己的简化函数,像这样:

```Javascript
var FunnyEase = (function (_super) {
  __extends(FunnyEase, _super);
  function FunnyEase() {
    _super.apply(this, arguments);
  ;}
  FunnyEase.prototype.easeInCore = function (gradient) {
    // 这是你创建自己的简化函数时应该修改的核心方法.
    // Gradient 是改变值的百分比
    return Math.pow(Math.pow(gradient, 4), gradient);

};
  return FunnyEase;
})(BABYLON.EasingFunction);
```
在娱乐展示里, 你会找到一个简化函数行为的完整演示: [**简化函数娱乐展示**](http://babylonjs-playground.azurewebsites.net/?20)

## 复杂动画

复杂动画允许你选择每帧的每样东西(每一瞬间). 运行时的计算代码必须位于这个函数内:

```javascript
scene.registerBeforeRender(function () {
  //你的代码放在这里
});
```

这个函数对复杂动画特别有用,比如一些游戏里角色的移动必需依赖于许多参数.

不用犹豫, 可以混合使用所有这些动画类型. 如果我们做到了, 它将是强大的.

不要忘记 [访问我们的API文档](http://doc.babylonjs.com/classes/) 以学习更多关于 [**Babylon.js 动画**](http://doc.babylonjs.com/classes/Animation) 和 [**Babylon.js 支持动画的**](http://doc.babylonjs.com/classes/Animatable) 类.

## 给动画添加事件

从Babylon.js 2.3 版本开始, 你可以附加 [动画事件](http://doc.babylonjs.com/classes/AnimationEvent) 给一个动画的指定帧.

一个事件 是在某指定帧会被调用的函数.

这样做非常简单:
```javascript
// 用3个参数创建一个事件:
// - 触发事件的帧
// - 将执行的动作
// - 一个布尔值表明事件是否仅被执行一次 (默认 否)
var event1 = new BABYLON.AnimationEvent(50, function() { console.log("Yeah!"); }, true);
// 将你的事件附加到动画上
animation.addEvent(event1);
```

就这些!

**下一步**

你的场景现在动起来了, 你的所有网格都可在所有方向上移动!请自己尝试在不同的物体上实现不同的动画, 然后回到这里再学习更多的关于 [**精灵**](http://doc.babylonjs.com/tutorials/Sprites).
