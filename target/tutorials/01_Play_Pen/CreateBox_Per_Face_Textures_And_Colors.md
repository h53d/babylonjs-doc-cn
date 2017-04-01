##创建各面不同纹理和颜色的网格盒子

在这个教程里, 我们将学习如何使用`MeshBuilder.CreateBox()` 方法的 _faceUV_ 和 _faceColors_ 参数来设置一个各面不同纹理和颜色的盒子.


###纹理


想象下我们有一个如这样的图片文件 : http://jerome.bousquie.fr/BJS/images/spriteAtlas.png  
我们在视频游戏开发中调用它,  一个精灵集合大图，因为在一个文件里我们有24个不同的精灵图片 : 4行，每行6个精灵，每个都同样大小. 这仅仅是个例子，我们也可以有32行，每行32个精灵图像.    

好了，我将在这开始讲集合大图，但是记住它仅是个用来阐述各面独立纹理特性的例子. 并不是强制使用集合大图，我们可以使用一个常规的文件而后选择其某一部分显示在盒子的每个(或仅一些) 面.  

让我们开始...

在43和50行我们使用 `可选` 参数创建了一个长方形盒子 : http://www.babylonjs-playground.com/#1V3CAT#10  
然后像通常那样我们在一个材质上设置纹理值 : http://www.babylonjs-playground.com/#1V3CAT#11    
直到现在也没有新东西，对吗 ?  

我们继续.

 请让我们从27行开始看:  
在30行, 我们定义了一个叫作 _faceUV_的新数组, 大小是6，因为我们的盒子有6个面. 这个数组的内容总是四元向量.
每个_四元向量(x, y, z, w)_ 将通过这种方式定义 :  

x = Ubottom  
y = Vbottom  
z = Utop   
w = Vtop  
所有值在[0, 1]区间

正如 _Ubottom_, _Vbottom_ 是左下点(纹理裁剪开始处)的2维坐标，同时 _Utop_, _Vtop_ 是右上点(纹理裁剪的结束处)的2维坐标.
不清楚么 ?  

让我们回头看看我们的精灵大集合图: 我们有4行每行6个精灵.
所以如果我们从0开始迭代到5(要6次，因为6个面) 而且如果我们这样赋值
给数组的每个元素：  
```javascript
Ubottom = i / 6
Vbottom = 0
Utop = (i+1) / 6
Vtop = 1 / 4
```, 我们实际是在从精灵集合图中第一水平行开始为盒子的每个面设置不同的精灵.
代码 :
```javascript
  var hSpriteNb =  6;  // 每行6个精灵
  var vSpriteNb =  4;  // 4行精灵

  var faceUV = new Array(6);

  for (var i = 0; i < 6; i++) {
    faceUV[i] = new BABYLON.Vector4(i/hSpriteNb, 0, (i+1)/hSpriteNb, 1 / vSpriteNb);
  }
```
然后，将这个数组传递给`CreateBox()` 方法, 只要在该方法的options参数里添加一个叫做 `faceUV`项, 用这个数组作为其值:  
```javascript
  var options = {
    width: 10,
    height: 3,
    depth: 5,
    faceUV: faceUV
  };

  var box = BABYLON.MeshBuilder.CreateBox('box', options, scene);
  box.material = mat;
```
这儿有结果 : http://www.babylonjs-playground.com/#1V3CAT#12  
非常简单，不是么?
<br/>
<br/>
现在让我们看下盒子上面的红发的角色. 他的头在左侧，正确么 ?
如果我们想翻转下这个面，怎么办 ?
这个面是盒子的4号面(只是方便区分组成盒子的几何形状). 我们只需要交换 _y_ 和 _w_ 的坐标值 :  
```javascript
  var f = 4;
  var temp = faceUV[f].y;
  faceUV[f].y = faceUV[f].w;
  faceUV[f].w = temp;
```
然后, 他的头就位于右侧了: http://www.babylonjs-playground.com/#1V3CAT#13  
<br/>
<br/>
显然, 我们并不需要设置每个面.
想象下我们仅想要设置4号面.
忘掉那个 _for{}_ 循环把, 只要初始化我们的_faceUV_ 数组同时只设置 _faceUV[4]_ :  
```javascript
  var faceUV = new Array(6);
  faceUV[4] = new BABYLON.Vector4(0, 0, 1 / hSpriteNb, 1 / vSpriteNb);
```
只需两行代码，而且那就是全部 : http://www.babylonjs-playground.com/#1V3CAT#25  
<br/>
<br/>
我们也可能想从同一个纹理文件中取两个不同的图像应用到两个不同的网格.
没有比这更简单的: http://www.babylonjs-playground.com/#1V3CAT#26    
两个盒子, 两个图像, 但只有个纹理!
<br/>
<br/>

###颜色

让我们回到我们初始的矩形盒子 : http://www.babylonjs-playground.com/#1V3CAT#10   
我们将应用两个同样的规则，但不是纹理，而是颜色.
让我们定义一个 6元素的数组 _faceColors_ (盒子6个面) 同时设置盒子各面的颜色，我们使用类型`Colors4`.
```javascript
  var faceColors = new Array(6);

  faceColors[4] = new BABYLON.Color4(1,0,0,1);   // red top
  faceColors[1] = new BABYLON.Color4(0,1,0,1);   // 绿色的前面
```
然后将这个数组传给 `CreateBox()` 方法，通过`options`参数新的`faceColors`项：     
```javascript
  var options = {
    width: 10,
    height: 3,
    depth: 5,
    faceColors : faceColors
  };

  var box = BABYLON.MeshBuilder.CreateBox('box', options, 场景);
```
简单，不是么 ?http://www.babylonjs-playground.com/#1V3CAT#14  

这些颜色是BJS的Color4类型值. 类型Color4的透明通道值回被激活，如果我们设置`hasVertexAlpha = true` : http://www.babylonjs-playground.com/#1V3CAT#27  

我们甚至可以将该顶点颜色和颜色材质结合使用， 此处是结合蓝色的:  http://www.babylonjs-playground.com/#1V3CAT#15  

而且最终我们也可以将每个面的颜色和其纹理混合，或者和标准材质里的其它颜色混合. :  
```javascript
  var options = {
    width: 10,
    height: 3,
    depth: 5,
    faceUV: faceUV,
    faceColors : faceColors
  };
```
把玩下 : http://www.babylonjs-playground.com/#1V3CAT#16  

不需要子材质也不需要子网格, 当搜寻如盒子面一样的材质时.

