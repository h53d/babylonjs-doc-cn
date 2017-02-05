---
ID_PAGE: 22121
PG_TITLE: 12. 粒子
---
## 介绍

本教程会谈论BabylonJS里的粒子系统. 粒子通常时许多小的精灵，被用来模拟难以再现的现象，比如火，烟，水，或者抽象的视觉效果，比如魔法闪光和神奇灰尘。

![粒子](http://www.babylonjs.com/tutorials/12%20-%20Particles/12.png)

一副[娱乐场的粒子系统演示](http://babylonjs-playground.azurewebsites.net/?12)的图景

## 我怎么做到这个 ?

为了执行这个魔法，首先需要创建一个新的粒子发射器对象. 在本例里，一个盒子将成为我们的发生器，代表一个粒子喷泉.

```javascript
var fountain = BABYLON.Mesh.CreateBox("fountain", 1.0, scene);
```

发射器作为粒子源，它在三维空间里的位置决定着粒子的在哪生成以及如何移动。因此注意盒子对象的位置和运转。
在本例里，发射器是由喷泉来定义，但是如果你愿意的话，也可以使用仅仅一个向量 (BABYLON.Vector3)来定义发射器.

现在，我们必须创建一个新的(未渲染的)粒子系统对象:
```javascript
var particleSystem = new BABYLON.ParticleSystem("particles", 2000, scene, customEffect);
```

        简单吧. 第一个参数是名称，第二个参数是最大粒子数，第三个是粒子所在的场景，可选的第四个参数是粒子着色器的引用---用来覆盖默认的着色器. 我会在更后面些讨论第四个参数.


    一个重要的部分是定义每个粒子的纹理。每个粒子都会拥有相同的纹理模式，因此请仔细选择你想要的纹理。但请记住，一个场景里可以有多个粒子系统，而且每个粒子系统只能发射出一种纹理模式。也请记住，多个粒子系统能够共用同一个发射器。
我们的粒子纹理将是这样的:

![耀斑](http://www.babylonjs.com/tutorials/12%20-%20Particles/Flare.png)

为了定义纹理，添加一行这样的代码:
```javascript
particleSystem.particleTexture = new BABYLON.Texture("Flare.png", scene);
```

(在娱乐场的演示，我们使用 /textures/flare.png)


对这种纹理，你可以使用可选的掩码来过滤些颜色，或者过滤部分透明通道.
```javascript
particleSystem.textureMask = new BABYLON.Color4(0.1, 0.8, 0.8, 1.0);
```

这是该配置的输出:

![纹理掩码](http://www.babylonjs.com/tutorials/12%20-%20Particles/12-1.png)

最后件要做的事就是定义个发射器，我们早些时候讨论过的:
```javascript
// 粒子的来源地
particleSystem.emitter = fountain; // 开始的对象，发射器，在我们这例子里是盒子.
```

现在你应该看到你的粒子系统工作了. 但它可能不是我们的最终结果. 我们可以优化一些参数:
* 围绕发射器的盒子. 我们的发射器时粒子源的中心，但是如果你希望粒子从不同的点发射，那么你可以告诉它这也做：
```javascript
particleSystem.minEmitBox = new BABYLON.Vector3(-1, 0, 0); // Starting all From
    particleSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 0); // 目标...
```

正如你所见，粒子沿着X轴从不同的位置发射出来:

![发射盒EmitBox](http://www.babylonjs.com/tutorials/12%20-%20Particles/12-2.png)

* 现在你可以给粒子赋予一些颜色. 颜色一和二被混合，而且 “colorDead”(死亡色)是粒子消失去前展现出来的颜色.
```javascript
// 所有粒子的颜色 (被拆分成2种色 + 1种特殊色的方式来处理)
particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);
```

* 粒子的大小:
```javascript
// 每个粒子的大小 (在两值间随机...)
particleSystem.minSize = 0.1;
particleSystem.maxSize = 0.5;
```

* 粒子的时长:
```javascript
// 每个粒子的时长(在两值间随机...)
particleSystem.minLifeTime = 0.3;
particleSystem.maxLifeTime = 1.5;
```

* 发射速率. 这是粒子的密度, 粒子流的速率:
```javascript
particleSystem.emitRate = 1000;
```

![发射速率](http://www.babylonjs.com/tutorials/12%20-%20Particles/12-3.png)

    如果你想一次加载特定颗数的粒子，那也是可以做到的。比如，你想仅发射300颗粒子:
```javascript
particleSystem.manualEmitCount = 300;
```
    要注意粒子流不在是持续的了. 这是个一次性的粒子发射，因此这个功能覆盖了之前的发射速率(“emitRate”)参数.

* 粒子的选中模式. 你能够在“BLENDMODE_ONEONE” (默认选择: 源色附加到目标色，不受透明通道影响), 和“BLENDMODE_STANDARD” (将当前颜色和粒子的透明通道色混合)模式间选择.
```javascript
particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;
```

* 重力. 如果你想给粒子方向性你就可以启用重力(例如: 火焰粒子在Y轴向上)
```javascript
//为所有粒子设置重力(不一定向下)
particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);
```

* 方向. 粒子发射后其方向随机介于方向1和方向2之间.
```javascript
particleSystem.direction1 = new BABYLON.Vector3(-7, 8, 3);
particleSystem.direction2 = new BABYLON.Vector3(7, 8, -3);
```

![发射速率](http://www.babylonjs.com/tutorials/12%20-%20Particles/12-4.png)

* 角速度. 你可以为每个粒子沿Z轴定义转角 (弧度单位):
```javascript
particleSystem.minAngularSpeed = 0;
particleSystem.maxAngularSpeed = Math.PI;
```

* 速度/强度. 离可以给发射中的粒子定义力量，以及作为整体运动的速度(默认更新速度是0.01, 更快的更新速度等于更快的播放动画).
```javascript
particleSystem.minEmitPower = 1;
particleSystem.maxEmitPower = 3;

particleSystem.updateSpeed = 0.005;
```

* 持续时间. 你可以设置粒子系统的持续运行时间量 (取决于上面提到的粒子的整体运行速度).
```javascript
particleSystem.targetStopDuration = 5;
```

* 后期处理. 粒子系统停止时的处理或不处理 (对于射击类粒子系统非常有用):
```javascript
particleSystem.disposeOnStop = true;
```

最后，你可以在代码里任何时候启用这个粒子系统:
```javascript
particleSystem.start();
```

而且自然的停止它:
```javascript
particleSystem.stop();
```

去[**我们的在线娱乐场**](http://babylonjs-playground.azurewebsites.net/?12)随意体验这个场景吧...

### 自定义效果(该构造函数的第四个参数customEffect)

var ps = new BABYLON.ParticleSystem("particles", 2000, scene, **customEffect**);

自定义效果customEffect是BABYLON.Effect类型的，用于定义一个有效的着色器程序.

Babylon.js的主要作品足以为我们提供[一个使用片段着色器实现的神奇粒子系统的演示](http://babylonjs-playground.azurewebsites.net/#1ASENS). 访问连接，然后你就可以看到一个存储在着色器里的片段着色器程序. 注意那行:

```javascript
BABYLON.Effect.ShadersStore["myParticleFragmentShader"] = [...]
```

下面一点, 你会看到:
```javascript
var effect = engine.createEffectForParticles("myParticle", ["time"]);
```

_.createEffectForParticles_ 接受下面的参数:
- 片段名(可以是着色器里存储的，或者时页面DOM元素的ID)
- 附加参数的数组(类型统一)
- 附加采样的数组(给附加纹理使用的!)


粒子的效果对象稍有改变[Babylon效果对象](http://doc.babylonjs.com/classes/Effect). 还要注意，ShadersStore是基于该特殊[效果对象](http://doc.babylonjs.com/classes/Effect)的命名空间. 

该效果对象有许多设置('setter')方法，其中之一便是_.setFloat_. 注意在registerBeforeRender函数中是如何使用它的. 这导致粒子效果以大约20秒为一个跨度循环. 在场景的渲染循环里，我们(演示程序的作者)不断改变片段着色器程序的时间参数大小!我们喜欢它!

这是Deltakosh的一个简短的评论... 关于上面连接里的娱乐场演示:

> Babylon.js默认为你提供了一个纹理向量(vUV)变参和一个颜色向量(vColor)变参. 它也会为你传递粒子纹理. 但是你可以随意的添加新参数，就像我添加参数'time'那样做.

本教程的这节正在构建中. 很快我们会谈论更多内容.

## 自定义方法
通过使用自定义方法你可以获得更多的控制粒子:
```startDirectionFunction: (emitPower: number, worldMatrix: Matrix, directionToUpdate: Vector3)```: 这个函数能够用为每个新粒子定义初始方向. 默认情况下, 这个函数时用以下代码定义的:

    startDirectionFunction = (emitPower: number, worldMatrix: Matrix, directionToUpdate: Vector3): void => {
        var randX = randomNumber(this.direction1.x, this.direction2.x);
        var randY = randomNumber(this.direction1.y, this.direction2.y);
        var randZ = randomNumber(this.direction1.z, this.direction2.z);
    
        Vector3.TransformNormalFromFloatsToRef(randX * emitPower, randY * emitPower, randZ * emitPower, worldMatrix, directionToUpdate);
    }


```startPositionFunction = (worldMatrix: Matrix, positionToUpdate: Vector3)```: 这个函数能够用为每个新粒子定义初始位置. 默认情况下, 这个函数时用以下代码定义的:

    startPositionFunction = (worldMatrix: Matrix, positionToUpdate: Vector3): void => {
        var randX = randomNumber(this.minEmitBox.x, this.maxEmitBox.x);
        var randY = randomNumber(this.minEmitBox.y, this.maxEmitBox.y);
        var randZ = randomNumber(this.minEmitBox.z, this.maxEmitBox.z);
    
        Vector3.TransformCoordinatesFromFloatsToRef(randX, randY, randZ, worldMatrix, positionToUpdate);
    }


```updateFunction: (particles: Particle[])```:这个函数能够用为有效粒子提供自定义更新. 当粒子老化、位置变化、颜色变化等时该函数会被调用以取代常规的更新. 不要忘记该函数会在每帧被调用，因此要尽力保证它简单而快速 :). 默认情况下，以下代码被使用:

    updateFunction = function(particles) {
         for (var index = 0; index < particles.length; index++) {
               var particle = particles[index];
               particle.age += this._scaledUpdateSpeed;
            
               if (particle.age >= particle.lifeTime) { // 循环利用
                    particles.splice(index, 1);
                    this._stockParticles.push(particle);
                    index--;
                    continue;
               }
               else {
                    particle.colorStep.scaleToRef(this._scaledUpdateSpeed, this._scaledColorStep);
                    particle.color.addInPlace(this._scaledColorStep);
    
                    if (particle.color.a < 0)
                                 particle.color.a = 0;
    
                    particle.angle += particle.angularSpeed * this._scaledUpdateSpeed;
    
                    particle.direction.scaleToRef(this._scaledUpdateSpeed, this._scaledDirection);
                    particle.position.addInPlace(this._scaledDirection);
    
                    this.gravity.scaleToRef(this._scaledUpdateSpeed, this._scaledGravity);
                    particle.direction.addInPlace(this._scaledGravity);
               }
         }
    }


## 下一步
粒子系统时非常强有力且灵活的工具，它能够给你的场景带来真实感和运动感. 不要犹豫使用它们吧，因为它们不是资源敏感的.

继续跟我来, 因为我们将学习个新的，非常有趣的东西: [配置环境](http://doc.babylonjs.com/tutorials/Environment).
