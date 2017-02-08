---
ID_PAGE: 22071
PG_TITLE: 06. 光源
---
现在你已经学习了相机类型和如何在场景中放置相机, 我们将继续我们的系列教程-学习Babylon.js 的光源.

![元素](http://www.babylonjs.com/Screenshots/testlight.jpg)

_多光源下的一个漂亮球体_

## 我怎么做到这个 ?

光线用来产生各个像素的漫反射和镜面反射的颜色. 然后这种颜色被用来决定每个像素的材质的最终颜色. Babylon.js允许你想要多少就创建并注册多少光源, 但是要知道一种标准材质只能同事处理4个光源(场景光源列表中先启用的四个光源).

在这教程里，我将教你如何创建Babylon.js支持的每种类型的光源.

## 激活/停用光源 ##

每个光源可以通过调用器 *setEnabled(true/false)* 方法来激活或停用. 你也可以通过 *intensity* 属性来控制任何光源的全局强度. 它使用一个浮点类型的值 (比如 1.5). 这个教程临近结尾部分的一个例子展示了如何使用 *intensity* 属性和 *setEnabled()* 方法.

## 光源类型##
这就开始... Babylon.js有的很酷的四种光源:

- **点光源**

点光源时世界空间中由一个唯一点定义的光源. 光源从该点向所有方向发射光线. 点光源的一个好例子是太阳.

你可以通过 *漫反射(diffuse)* 和 *镜面反射(specular)* 属性来控制任何光源的颜色:

```javascript
var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(1, 10, 1), scene);
light0.diffuse = new BABYLON.Color3(1, 0, 0);
light0.specular = new BABYLON.Color3(1, 1, 1);
```
![](http://blogs.msdn.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-01-44-73-metablogapi/8484.image_5F00_thumb_5F00_53D78E00.png)

_带白色镜面反射的红色漫反射点光源_

- **定向光源**

一个定向光是通过一个方向定义的(没什么好惊奇的!). 该光源无处不在... 但是朝向一个特别的方向发射, 并且具有无限的范围. 默认情况，定向光建立在原点(0,0,0)的位置. 像点光源一样, 你可以通过 *漫反射(diffuse)* 和 *镜面反射(specular)* 属性来控制该光源的颜色:

```javascript
var light0 = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, -1, 0), scene);
light0.diffuse = new BABYLON.Color3(1, 0, 0);
light0.specular = new BABYLON.Color3(1, 1, 1);
```

![](http://blogs.msdn.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-01-44-73-metablogapi/1563.image_5F00_1ECD8F81.png)

_带白色镜面反射的红色漫反射定向光源_

- **聚光灯光源**

一个聚光灯光源是通过一个位置 (第二个参数), 一个方向(第三个参数), 一个角度(第四个参数), 和一个指数(第五个参数)定义的. 这些值定义了一个圆椎体，光源从中发射出来. 

角度(弧度单位)定义了聚光灯光源椎体光束的大小(照明q区域), 同时指数定义了光随距离(光照射的距离)衰减的速度. 像其它光源一样，你可以通过 *漫反射(diffuse)* 和 *镜面反射(specular)* 属性来控制该光的颜色:

![](http://blogs.msdn.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-01-44-73-metablogapi/7723.image_5F00_thumb_5F00_11F5CA14.png)

_一个简单绘图显示了聚光灯光源的形状_

```javascript
var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 30, -10), new BABYLON.Vector3(0, -1, 0), 0.8, 2, scene);
light0.diffuse = new BABYLON.Color3(1, 0, 0);
light0.specular = new BABYLON.Color3(1, 1, 1);
```

![](http://blogs.msdn.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-01-44-73-metablogapi/1738.image_5F00_thumb_5F00_18AB6448.png)

_一个带红色漫反射的白色镜面反射光聚光灯光源，椎体0.8弧度，衰减指数2_

- **半球状光源**

A hemispheric light is an easy way to simulate realistic ambient environment light. A hemispheric light is defined by a direction to the sky (the 2nd arg in the constructor) and by 3 colors: one for the diffuse (the sky color - for pixels/faces facing upward), one for the ground (the color for pixels/faces facing downward), and one for the specular.

Above, I used the terms 'upward' and 'downward', but keep in mind that the direction to the sky (the 2nd arg in the constructor) can be set to any direction. The direction to the sky is often straight upward (0, 1, 0). We are simulating light from a cloudy sky, but even on cloudy days, the sun crosses the sky above the clouds. So, you could tilt this light slightly toward the east for cloudy morning skies, and slightly toward the west for cloudy evening skies. This is a soft light that cannot produce shadows.

Now, back to creating the useful and interesting hemispheric light:

```javascript
var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
light0.diffuse = new BABYLON.Color3(1, 1, 1);
light0.specular = new BABYLON.Color3(1, 1, 1);
light0.groundColor = new BABYLON.Color3(0, 0, 0);
```

![](http://blogs.msdn.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-01-44-73-metablogapi/4760.image_5F00_thumb_5F00_058CC84D.png)

_White/black hemispheric light - upward pixels white (diffuse), downward pixels black (groundColor)_

Our [web site](http://www.babylonjs.com/) has a nice lights demo in the Features Tests section, and a similar lights demo can be found at our 'playground', [right here](http://www.babylonjs.com/playground/?06).

## Extra Information About Babylon.js One-Line Constructors: ##
Here is an example of a one-line constructor:
```javascript
var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 30, -10), new BABYLON.Vector3(0, -1, 0), 0.8, 2, scene);
```
That one-line is all it takes to create a spot light. We want Babylon.js scene item creation... to be as quick and simple as possible. We also want the scene item to be seen/operating with just one line of programming. The spot light is a rather powerful scene item, and it takes quite a few arguments (args) in the constructor... in order for it to appear and operate in one line of code. Each 'arg' of the one-line constructor is setting a 'necessary initial property' on the scene item. By doing that, we know that it will turn-on/operate with just that one line.

There are some properties which we set 'behind-the-scenes'. One such property is *intensity*. We 'default' that property to a float 1.0 value. We set that 'necessary initial property' for you. We also call the light's *setEnabled(true)* method.

I want you to know two important things. First, all properties on a spot light or on any Babylon.js scene item... can be set after the object has been constructed. Second, if you so choose, you can null-out (set to zero/empty) the args in the one-line constructor, and then set all of the necessary initial properties yourself... property by property. You have already seen the fast/simple way to construct the spot light scene item. Below is an example of the slower and less-simple way to construct a spot light.

```javascript
var light0 = new BABYLON.SpotLight("", new BABYLON.Vector3.Zero(), new BABYLON.Vector3.Zero(), 0, 0, scene);
light0.name = "My Slowly and Discretely Constructed Spot Light"
light0.position = new BABYLON.Vector3(0, 30, -10);
light0.direction = new BABYLON.Vector3(0, -1, 0);
light0.angle = 0.8;
light0.exponent = 2;
light0.intensity = 0.5;
light0.diffuse = new BABYLON.Color3(1, 1, 1);
light0.specular = new BABYLON.Color3(1, 1, 1);
light0.setEnabled(1);
```
Using this 'long method' of scene item constructing... is rarely necessary or wanted. But we thought you should know that you can do constructing in this way, if you so choose.

## Normals and Backfaces - Seeing the Light: ##
You may have heard words like '_normals_' and '_backfaces_' spoken or written, during your 3D travels. We will not be deeply examining those two terms in this tutorial, but I am going to try to explain how normals and backfaces... affect lights. 

The picture below will help you understand how lights interact with normals and backfaces. The picture shows two planes and two lights. One light is a spot light, the other is a point light. The arrows show the direction of the lighting normals, and these arrows are not visible in a standard scene. They are used in the picture to help illustrate the concept of normals, as are the diamond and cone shapes for the two lights. Let's look at the picture carefully.

![](http://urbanproductions.com/wingy/babylon/misc/normals03.jpg)
_A blue back-faced plane and a blue front-faced plane, with a spot light and point light_

As you can see, when a standard Babylon.js plane has its backface lit (the left plane), the lights have no affect, because its normals are not facing toward the lights. Conversely, when a standard plane has its frontface lit (the right plane), both lights work perfectly to light the plane, because its normals are facing toward the lights. 

It is also interesting to note that neither plane blocks the lights. You can see that the arrows on the left plane, are lit by the lights. The plane is not blocking the light rays. The only way that any mesh can block light rays in Babylon.js, is with the use of a ShadowGenerator or two. 

As a last note, I want you to know that the left plane's material.backFaceCulling = false. Whether it is set to true or false, there will be no change in how lights affect backfaces. The lights are primarily concerned about the direction of the lighting normals (the arrows). The standard Babylon.js plane (and ground) has its lighting normals aimed toward the frontface.

**NEW**: In recent versions of Babylon.js, a new property was introduced... called _.range_:

```javascript
light.range = 300;
```
More information about the _.range_ property... coming soon. Stay tuned.

## Next Step ##
With the use of these powerful lights, your scene is likely really starting to 'shine'. And don't forget that you can animate light positions, directions, colors, and therefore create wonderful 'light shows'. We'll talk about that soon, or have fun discovering how to do it on your own. Maybe you could do light property settings inside the scene's render loop function. Its fun and beautiful!

Although not truly a light, you might be interested in our [Volumetric Light Scattering](http://doc.babylonjs.com/tutorials/Using_the_Volumetric_LightScattering_post-process) (GodRays) system.

Guess what! The next tutorial... is about animation! [Click this and let's go!](http://doc.babylonjs.com/tutorials/Animations)
