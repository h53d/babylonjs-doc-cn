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
     //创建球体
    var sphere1 = BABYLON.Mesh.CreateSphere("Sphere1", 10.0, 6.0, scene);
    var sphere2 = BABYLON.Mesh.CreateSphere("Sphere2", 2.0, 7.0, scene);
    var sphere3 = BABYLON.Mesh.CreateSphere("Sphere3", 10.0, 8.0, scene);
[…]
    //定位网格
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
百分比(%)形式的Alpha透明, 可以按这种方式应用到材质:
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
All of these texture settings apply to the other StandardMaterial 属性 as well. (.emissiveTexture, .ambientTexture, .specularTexture)  I will remind you.  Now let's continue talking about the other StandardMaterial properties.

* **Emissive**

The emissive is the color produced by the object itself. You can specify a solid color with the ```emissiveColor``` property:
```javascript
materialSphere1.emissiveColor = new BABYLON.Color3(1, .2, .7);
```

Or, you can use a texture:
```javascript
materialSphere1.emissiveTexture = new BABYLON.Texture("grass.png", scene);
```
See the **More About Textures** section above.  Change occurrences of 'diffuse' to 'emissive', of course.

* **Ambient**

The ambient can be seen as a second level of diffuse. The produced color is multiplied to the diffuse color. This is especially useful if you want to use light maps baked into textures. You can specify a solid color with the ```ambientColor``` property:
```javascript
materialSphere1.ambientColor = new BABYLON.Color3(1, 0.2, 0.7);
```
Or, you can use a texture:
```javascript
materialSphere1.ambientTexture = new BABYLON.Texture("grass.png", scene);
```
See the **More About Textures** section above.  Change occurrences of 'diffuse' to 'ambient', of course.

* **Specular**

The specular is the color produced by a light reflecting from a surface. You can specify a solid color with the ```specularColor``` property:
```javascript
materialSphere1.specularColor = new BABYLON.Color3(1.0, 0.2, 0.7);
```
Or, you can use a texture:
```javascript
materialSphere1.specularTexture = new BABYLON.Texture("grass.png", scene);
```
When using a texture you can set ```materialSphere1.useGlossinessFromSpecularMapAlpha``` to true to use specular map alpha as glossiness level.

You can also control how specular behaves with alpha. By default, specular does not interact with alpha, but you can set ```materialSphere1.useSpecularOverAlpha``` to true to have alpha inversely proportional to specular value.

Again, see the **More About Textures** section far above.  Change occurrences of 'diffuse' to 'specular', of course.

The specular property has one more setting.  The size/intensity of the specular reflection can be set using the ```specularPower``` property:
```javascript
materialSphere1.specularPower = 32;
```


*** Section on OpacityTexture needed here, coming soon. ***


There, we have visited the primary color and texture properties of StandardMaterial.  But we are not done yet.  Here are a few more handy properties.

* **Back-Face Culling**

Simply put, “back-face culling” determines whether or not a StandardMaterial is visible from its back side (from behind).  TRUE = NOT visible.  More precisely, this rendering-speed-optimization technique determines if a polygon of a graphical object is visible or not. If set to TRUE or boolean 1, the  Babylon engine won’t render hidden face(s) of the meshes that use this material. It is set TRUE by default, but can be changed to false as wanted. You may want to read more about back-face culling at [the wikipedia page about it](http://en.wikipedia.org/wiki/Back_face_culling).  

In this example, the texture has some alpha, and back-face culling is set to false for the front sphere... in order to see its black inside face:

![tof](http://www.babylonjs.com/tutorials/04%20-%20Materials/04-2.png)

```javascript
materialSphere1.backFaceCulling = false;
```

* **WireFrame**

You can see your object in wireframe mode... by using:
```javascript
materialSphere1.wireframe = true;
 ```

![tof](http://www.babylonjs.com/tutorials/04%20-%20Materials/04-3.png)

Again, you can see things from this tutorial... come to life... by browsing to [the Babylon.js Playground scene 4](http://www.babylonjs.com/playground/?4).

More information about materials can be found by reading [**Unleash the StandardMaterial**](http://blogs.msdn.com/b/eternalcoding/archive/2013/07/01/babylon-js-unleash-the-standardmaterial-for-your-babylon-js-game.aspx) and also [**Advanced Texturing**](http://doc.babylonjs.com/tutorials/Advanced_Texturing).

##Next step##
----
Great, your scene is looking better than ever with those materials! Later we will see how to use advanced techniques with materials. But for now, we have to learn [**how to use cameras**](http://doc.babylonjs.com/tutorials/Cameras).
