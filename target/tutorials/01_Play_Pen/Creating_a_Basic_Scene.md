---
ID_PAGE: 21911
PG_TITLE: 01. 创建基础场景
---
### 在本教程里, 我们将用Babylon.js创建一个基础的3D场景.
![Babylon JS 01](http://urbanproductions.com/wingy/babylon/misc/tut01pic01.jpg)
_具有两个造型物的基础场景_

在你开始之前,请确定你有个支持WebGL的浏览器 (比如:IE11+, 火狐4+, 谷歌浏览器9+, Opera15+, 等.).

### HTML部分
首先, 创建一个基础的HTML5网页:
```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <title>Babylon - 基础场景</title>
   </head>
   <body>
   </body>

</html>
```
### CSS样式部分
在```<head>```内部, 请添加这个CSS以使画布视图最大化:
```css
<style>
  html, body {
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  #renderCanvas {
    width: 100%;
    height: 100%;
    touch-action: none;
  }
</style>
```

### 包含的外部Javascript部分(框架)
现在加载我们的框架文件.  在CSS后面, (同时也是在```<head>```内部), 请添加:
```html
<script src="babylon.js"></script>
<script src="hand.js"></script>
<script src="cannon.js"></script>  <!-- 可选的物理引擎 -->
<!-- <script src="Oimo.js"></script>  新的物理引擎 -->
```
(如果你还没有这些文件, 可以在此找到: https://github.com/BabylonJS/Babylon.js, and here: http://handjs.codeplex.com/)

下一步，我们进入页面的 ```<body>``` 内部... 然后添加一个HTML5 画布元素, 我们将用它来绘制我们的场景.
```html
<canvas id="renderCanvas"></canvas>
```

现在, 我们从HTML5跳进Javascript.  任然实在页面的 ```<body>```内部，请添加:
```javascript
<script>
// 从上面的HTML里获取我们的画布元素
  var canvas = document.getElementById("renderCanvas");
// 加载BABYLON 3D引擎
  var engine = new BABYLON.Engine(canvas, true);
```
之后, 你将添加创建场景的代码.  为了保持你的代码和Babylon.js娱乐场兼容, 我们建议你在此处插入一个 'createScene' 函数.  除了生成一个Babylon场景对象外，这个createScene() 函数里也是你添加场景所需的地方:  一个相机，一个光源，一个或多个造型/网格.
所以现在，将这里整个createScene函数添加到你的网页里:
 
```javascript
  // 这是创建函数的开头，该函数在被构建后立即调用t
  var createScene = function () {
// 现在创建一个Babylon场景对象
    var scene = new BABYLON.Scene(engine);
// 改变场景的背景色为绿色.
    scene.clearColor = new BABYLON.Color3(0, 1, 0);
// 创建并放置一个自由相机
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
// 将相机朝向对准场景原点
    camera.setTarget(BABYLON.Vector3.Zero());
// 将相机附加到画布上
    camera.attachControl(canvas, false);
        
    // 创建一个光源，在0,1,0点朝向天空.
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
// 将光源光线置为昏暗
    light.intensity = .5;
// 让我们尝试Babylonjs内置的'球'状造型. 参数:名称, 细分度, 大小, 场景
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
// 将移动球向上 1/2 其高度
    sphere.position.y = 1;
// 让我们尝试Babylonjs内置的'地面'状造型.  参数: 名称, 宽度, 深度, 细分度, 场景
    var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
// 离开该函数
    return scene;
};  // createScene函数结束
```
是的，这就是个函数，但是不要让它把你吓着了。这个教程后面你将学习光源，相机，内置造型物的更多参数和属性。最重要的一点是我们的createScene 函数具有所要求的全部。它包括:
*  一个Babylon场景对象
*  附加一个相机
*  一个设置好目标的光源
*  一个放置在0,1,0处的球体 (我们将它y轴上移了)
*  一个放置在0,0,0处的地面(默认地方)
还有三个东东要添加到你的页面里.  首先, 对刚完成的createScene函数的调用.  添加这个:
```javascript
  // 现在, 调用刚创建完的createScene函数
  var scene = createScene();
```
然后, 最重要的渲染循环.  添加这个:
```javascript
  // 注册一个渲染循环已重复的渲染场景
  engine.runRenderLoop(function () {
    scene.render();
  });
```
最后, 可选但是便捷的，对画布/窗口大小改变事件的处理程序.  添加这个:
```javascript
  // 监测浏览器/画布大小改变事件
  window.addEventListener("resize", 函数 () {
    engine.resize();
  });
```
那儿.  所有的Javascript代码已经写入完.  请确保你已经使HTML的script, body, 和 html标签元素闭合. HTML5页面 的最后3行应当是:
```html
</script>
</body>
</html>
```

你做到了!保存你的文件(在babylon.js, hand.js, 和cannon.js文件同一文件夹下)然后用已经支持WebGL的浏览器查看.  You should see your new scene displayed in 3D on its canvas.
A near-exact duplicate of the createScene function used in this tutorial... can be seen [**RIGHT HERE**](http://www.babylonjs.com/playground/#1GM4YQ) at the Babylon.js Playground.  You will also see the scene render LIVE, ONLINE!  Use the playground's 'Get .zip' choice if you want to download the entire index.html file used in this tutorial.

## Got Troubles? ##
Here is what the entire web page should look like:

```html
<!doctype html>
<html>
<head>
   <meta charset="utf-8">
   <title>Babylon - 基础场景</title>
   <style>
      html, body {
         overflow: hidden;
         width: 100%;
         height: 100%;
         margin: 0;
         padding: 0;
      }
      #renderCanvas {
         width: 100%;
         height: 100%;
         touch-action: none;
      }
   </style>
   <script src="babylon.js"></script>
   <script src="hand.js"></script>
   <script src="cannon.js"></script> <!-- optional physics engine -->
</head>
<body>
   <canvas id="renderCanvas"></canvas>
   <script type="text/javascript">
      // Get the canvas element from our HTML below
      var canvas = document.querySelector("#renderCanvas");
      // 加载BABYLON 3D引擎
      var engine = new BABYLON.Engine(画布, true);
      // -------------------------------------------------------------
      // Here begins a function that we will 'call' just after it's built
      var createScene = function () {
         // 现在创建一个Babylon场景对象
         var scene = new BABYLON.Scene(engine);
         // 改变场景的背景色为绿色.
         scene.clearColor = new BABYLON.Color3(0, 1, 0);
         // 创建并放置一个自由相机
         var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
         // 将相机朝向对准场景原点
         camera.setTarget(BABYLON.Vector3.Zero());
         // 将相机附加到画布上
         camera.attachControl(canvas, false);
         // 创建一个光源，在0,1,0点朝向天空.
         var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
         // 将光源光线置为昏暗
         light.intensity = .5;
         // 让我们尝试Babylonjs内置的'球'状造型. 参数:名称, 细分度, 大小, 场景
         var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
         // 将移动球向上 1/2 其高度
         sphere.position.y = 1;
         // 让我们尝试Babylonjs内置的'地面'状造型. 参数: 名称, 宽度, 深度, 细分度, 场景
         var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
         // 离开该函数
         return scene;
      }; // End of createScene function
      // -------------------------------------------------------------
      // 现在, 调用刚创建完的createScene函数
      var scene = createScene();
      // 注册一个渲染循环已重复的渲染场景
      engine.runRenderLoop(function () {
         scene.render();
      });
      // 监测浏览器/画布大小改变事件
      window.addEventListener("resize", 函数 () {
         engine.resize();
      });
   </script>
</body>
</html>
```

## 继续前进 ##
从本基础系列教程的这个点开始, 我将主要谈论createScene函数里面的内容(虚线之间的部分). 我假设你已经知道如何往HTML5页面文档里插入BabylonJS场景的createScene函数(就像上面那个).
努力记住这个页面布局, 而且弄清楚createScene函数是它的核心. 当你使用Babylon.js娱乐场一段时间后, 你会明白createScene()是多么的方便, 能够简单的往/从编辑器窗口粘贴和复制进出内容. 这个会允许其他人帮你解决问题,而且还允许你帮助其他人解决问题.
## 下一步 ##
----
现在你可以再进一步了, 学习如何创建更多的元素, 比如球体,圆柱体,盒子等.
在下一练笔系列里 - [**基础元素**](http://doc.babylonjs.com/tutorials/Discover_Basic_Elements)