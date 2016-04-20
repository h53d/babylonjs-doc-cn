---
ID_PAGE: 22621
PG_TITLE: A Babylon.js 初级教程
---
欢迎到此...
## Babylon.js 页面图像库 游戏创建系统!##
Hi!欢迎阅读 Babylon.js 初级教程, 这是后面学习最棒的基于Javascript的网页图形库框架所需必备知识的一个基础介绍.
你想知道什么是框架么?&nbsp; 你可以把框架认为成 建筑里的脚手架, 它支撑你围绕它创建新东西而不必为底层细节操心. Babylon.js构造里一个复杂的系统, 让网页图形库更容易使用.
我们希望以一种非常快速的方式教给你大量的信息.&nbsp; 通常这里的任务都有多于一种方式达成.&nbsp; 我希望你自己去发现其它的方式.&nbsp; 根据对Babylon.js初学者特点的研究, 现在我们教你最快最简单的方式.
## 浏览器 ##
简而言之,你需要一个支持WebGL并且激活了javascript的浏览器.&nbsp; IE11+, Firefox 4+, Google Chrome 9+, Opera 12+, 等都可以.&nbsp; WebGL 也被许多移动设备等浏览器支持.&nbsp; 请你自己调查移动设备的WEBGL详细情况, 但是你需要知晓的是 Babylon.js 有许多特性在设计时考虑了移动设备WebGL的.&nbsp; 此外, Babylon.js 已经全面支持沉浸式立体视野和虚拟现实头盔!
## 有用链接 ##
| 可点击链接&nbsp; | 可找到内容 |
| ------------- | ------------- |
| [**BabylonJS 主站**](http://www.babylonjs.com/) |&nbsp; 许多很棒的演示而且底部有有用的链接 |
| [**BabylonJS 论坛**](http://www.html5gamedevs.com/forum/16-babylonjs) | 询问,助人,预见小伙伴 |
| [**BabylonJS GitHub 站点**](http://www.babylonjs.com) |&nbsp; 下载, 教程, 和许多链接 (在那个页面的底部) |
| [**BabylonJS API 文档**](http://doc.babylonjs.com) | 所有Babylon.js类的完整 API 图册 |
| [**BabylonJS 娱乐展示**](http://babylonjs-playground.azurewebsites.net) |&nbsp; 在线的,白板式 基础场景测试站点 |
| [**BabylonJS 沙箱**](http://www.babylonjs.com/sandbox) | 在线测试从建模工具导出的 .babylon 文件.
## 场景文件格式 ##
尽管我们有另一个教程盖含基础场景, 我仍然希望你现在检查下一个基本的 Babylon.js 场景文件的内容.&nbsp; 所以我们现在就开始:
![](http://urbanproductions.com/wingy/babylon/misc/codepic04.jpg)

它是个大图片,不是么? &nbsp; 这是个完整的 Babylon.js 场景, 使用 '简单的 HTML 文件' 的方法.&nbsp; 这不是唯一(也不是最好)的设置一个场景的方法, 但是快速而简单.&nbsp; 我已经在"大图片上"的重要段上标色,而且我们现在就一段段段查看.
### 外部包含 - 红色部分 ###
'包含' 不一定是对 图中红色部分的最好的描述方式, 但是在这个教程中我会常常使用这中方式.&nbsp; 三个外部的Javascript文件被包含到这个场景里.
第一个从外部包含的是 hand.minified-1.2.js (通常简称为hand.js) - 一个用来辅助Babylon.js相机的小Javascript框架.
下一个是 cannon.js - 一个可选的物理 '引擎', 其使WebGL里的造型(网格)的行为像真实生活里的物体对象.
之后的是 oimo.js - 一个不同的物理 '引擎',  其表现的功能有点像 cannon.js, 但是它更快速高效, 尽管它缺少 cannon.js中出现的许多高级特性.
最重要是 Babylon.js 框架, 我们的骄傲与荣幸.
每个包含都是 JavaSCRIPT 文件, 所以它们被放在使用 HTML的 `<SCRIPT>` 元素/标签中.&nbsp; 这些文件里显示的 'src' (源码位置) 在 the Babylon.js 网站的文件夹里, 但是稍后我将告诉你如何把这些文件放到你的硬盘驱动器里 - 如果你希望那样做, 然后从那儿包含它们.&nbsp; 当是"本地" 时她们加载会更快, 但是当你将它们保存到本地后你需要修改 'src' 的网址; 我很快会告诉你如何做的.
### CSS 样式 - 蓝色部分 ###
&nbsp;注意大图片中的蓝色部分.&nbsp; 那是用来呈现场景页面的 CSS (布局样式表) 样式,&nbsp; 它会调整 WebGL 画布居中且填满你的整个浏览器.
有一天, 你希望通过把这些样式内容放在单独的文件里使它们外部化, 也许可以把文件叫做 styles.css.&nbsp; 那是可以把蓝色部分从这个HTML文件里移除掉, 然后使用HTML LINK元素/标签把样式文件放到里面.&nbsp; 我不回教你怎么做那个, 但是网上满是文档教你如何做的; 它非常简单.
### 内部包含 - 绿色部分 ###
这是大图片场景文件里的第五个 HTML SCRIPT 元素/标签 .&nbsp; 我们用了4个 SCRIPT 元素/标签 实现外部包含.&nbsp; 这个是内部包含.&nbsp; 注意没有 'src' 地址.&nbsp; 那是因为它是你直接写入这个文档的 Javascript代码部分.&nbsp; 是的, 你写的.&nbsp; 现在你是名 Javascript 程序员!
你可以把绿色部分外部化, 可以把它们放到一个叫做... 'myJavascript.js'文件里, 也许还在个叫做... 'jsfolder'的目录里.&nbsp; 然后你可以移除绿色部分, 且再添加一个外部包含 脚本 元素/标签, 看起来就像这样:
``` html
<script src="./jsfolder/myJavascript.js"></script>
```
You need not concern yourself with that, at this point.&nbsp; Externalizing your Javascript is often done when you have written LOTS of Javascript code.&nbsp; Externalizing your code into separate files helps your project be organized, but it is not necessary this early in your webGL adventures.
你看到的在绿色部分里的 JS 代码... 很快会被讨论到.&nbsp; 我主要是希望你学习下大图片里的内容, 而且弄明白单个HTML文件里的Babylon.js场景是如何创建的.&nbsp; 对这个文件的格式, 我希望你能够尽力留下印象且记得一点点.
### createScene() 函数 - 紫色部分 ###
大图片里的紫色部分...是createScene() '函数'... 一个Javascript '函数'.&nbsp; 它是'单HTML文件'场景里的最重要部分的.&nbsp; 在你的Javascript代码里你不必使用createScene()函数, 但是在学习WebGL的早期日子里,请这样做吧.&nbsp; 我有些魔法展示给你看... 如果你把大部分的场景代码放到一个叫做createScene()的函数里.&nbsp; (就像大图片里展示的那样.)
在 createScene() 函数里 (紫色部分)... 我们将开始执行真实的 Babylon.js 指令, 以产生漂亮的WebGL效果出现.&nbsp; 大图片里的剩下部分... 是些简单的辅助和准备工作... 为神奇的紫色部分(那个createScene()函数)服务的.&nbsp; 记住这个函数名, 因为我将在许多游戏练习系列教材里常常提到它.&nbsp; 我能保证,它将成为你最好的支持者.&nbsp
## 访问 娱乐展示厅 ##
我们做得很努力且学到不少东西了, 所以我们可以获得一些时间在 Babylon.js 娱乐展示厅游乐一下了.&nbsp; 此处是创建保存一次性场景的练习场:
## BabylonJS 娱乐展示厅 ##
你也许希望在新的浏览器窗口或标签页来打开娱乐联系的场景, 那样可以通过后退和前进切换不同场景.
看到左边代码窗口里的 'createScene' 函数里么?&nbsp; 看起来熟悉吧?&nbsp; 它是和大图片里的紫色部分非常像的代码(只是多了些换行).&nbsp; 现在你该清楚了为什么那个 createScene 函数是一个重要的部分.&nbsp; 它是有一定可移植性的.&nbsp; 你能够在 createScene 函数和你本地的场景文件之间将代码拷来拷去.
让我们假设,你在一直在家中创建了一个场景文件, 经过多次尝试, 它就是不能正常工作.&nbsp; 你可以复制你家里的 createScene 函数, 然后访问娱乐展示厅, 点击 **清除** 按钮 来清空编辑窗口, 最后把你的 createScene 函数粘贴到编辑区域里. 按下娱乐展示厅的**运行**按钮,看看它是否有效.&nbsp; 如果不正常, 你可以在编辑窗口里做些修改, 然后再次点击 **运行** ... 如此不断调整.&nbsp; 尝试下, 如果你你仍然不能使它有效运行, 你可以按下 **保存** 按钮.&nbsp; 之后会为你的场景生成一个唯一的网址.&nbsp; 看起来就像这个样子:
http://babylonjs-playground.azurewebsites.net/#QKQHS

现在你可以用书签纪录下那个唯一的网址, 然后去访问 Babylon.js 论坛:
http://www.html5gamedevs.com/forum/16-babylonjs/

在那,你可以开始一个新的话题, 将破坏你娱乐展示场景的createScene函数网址告诉大家,  问下是否有人乐意访问你的娱乐展示场景并帮助你修正.&nbsp;
这就是所谓的白板.&nbsp; 它使得其他人能很容易的在你创建的场景上工作, 并帮你指出错误之处.&nbsp; 清楚了创建场景函数是如何'可移植'了么?&nbsp; 从家里获得, 扔到娱乐展示厅, 然后在上面折腾一阵.&nbsp; 如果有必要, 你可以点击娱乐展示厅上的 **保持** 按钮, 产生一个网址.&nbsp; &nbsp;最后到论坛上讲网址告诉其他人, 向他们求助.&nbsp; 很方便吧, 哼??&nbsp; 我们认为是这样的.
## 关于娱乐展示厅更多 ##
让我们再次访问上面发给你的保存的娱乐展示场景网站.
http://babylonjs-playground.azurewebsites.net/#QKQHS

这次,我希望你按下 **获取zip压缩包** 按钮.&nbsp; 娱乐展示厅将打开一个小面板让你下载该场景.&nbsp; 保存这个zip压缩文件到你家里电脑上某个新的空文件夹下.&nbsp; 现在使用一个 UNZIP 工具程序解压开.&nbsp; 注意那个文件夹下有一个index.html文件.&nbsp; 请将该文件用文本编辑器或编程用 编辑器打开.&nbsp; 它看起来像上面的大图片吧?&nbsp; 必需的.&nbsp; Babylon.js 娱乐展示厅的任何场景, 包括它里面预装的演示场景, 都可以通过 **获取.zip压缩包** 按钮下载到你家里的电脑上.&nbsp; 其中的大部分看起来都非常像上面的大图片.
Babylon.js 娱乐展示厅有个教程.&nbsp; 就在 [**点击这儿**](http://doc.babylonjs.com/page.php?p=22631).
哇, 到这儿信息量很大了,不是吗?&nbsp; 你已经学了如何识别一个场景文件 (大突破) 了, 学了它重要的 createScene() 函数, 而且学了怎么复制粘贴它到别处.&nbsp; 你已经见识了娱乐展示厅里的 createScene() 函数, 而且为你介绍了它的 运行, 保存 和 获取.zip压缩包的按钮.
您正在成为Babylon.js工具专家.&nbsp; 我所说的 '工具', 是指... 那些你学到的支持 createScene() 函数的东西.&nbsp; 你已经准备好加入学习代码知识,以用在创建场景的功能么?&nbsp; 我知道你准备好了.
## 深入 createScene() ##
&nbsp;
我希望你在此访问下 Babylon.js 娱乐展示厅 (如果可能的话,用新的窗口或标签打开), 只是这次我们访问的是它的基础网址:
http://babylonjs-playground.azurewebsites.net

注意当前标注了 **基础场景**的按钮.&nbsp; (实际上它叫做场景选择按钮, 只是当前标上了'基础场景').
请点击它.&nbsp; 注意那有许多不同当预装场景 (创建场景的功能).&nbsp; 可以在它们中自便的选择.&nbsp; 浏览一下, 在之中拖动鼠标, 甚或在编辑区域修改下代码然后点击 **运行** .&nbsp; 你不可能毁坏预装的场景, 甚至你点击了 **保存**也不会.&nbsp; 你在 Babylon.js 的娱乐展示厅的场景里很安全, 而且你可以看到许多的创建场景的函数.&nbsp; 你可以使用它们的设定玩一下, 再次点击 运行.&nbsp; 再次的, 你可以使用娱乐演示图任何一个演示上方的 *获取 .zip压缩包**, 从而实现你的收集梦想.&nbsp; 方便, 是吧?
现在来讲干货stuff.&nbsp; 在Babylon.js里每次 createScene()调用 (也就是每个场景)通常需要三件事情:
**1. 相机.**&nbsp; 众多相机类型里3种常用的是, ArcRotateCamera(弧形旋转相机), FreeCamera(自由相机), 和 TouchCamera(触控相机).&nbsp; 在Babylon.js里有许多种可用的相机, 但是这3种是最常见的.&nbsp; 一个场景里可以编码任意多个相机, 但是只有其中一个能是'激活的相机'.&nbsp; 在操练系列教程里我们有一个例子, 专门谈论各种相机.
**2. 光源.**&nbsp; &nbsp;在Babylon.js里有4种基础类型的光源.&nbsp; 它们是 PointLight(点光灯光源), SpotLight(聚光灯光源), DirectionalLight(平行光光源), 和 HemisphericLight(半球光源).&nbsp; 一个场景里编码任意数量的光源,&nbsp; 但是在场景光源列表里只有前4个光源被场景使用.
老实说, 光源不是绝对必需的.&nbsp; 如果场景里的网格对象都设置了material.emissiveColor(材料的颜色)或material.emissiveTexture(材料的纹理)属性, 那么它们自己会产生各自的光.&nbsp; 它们将是 '自发光的'.&nbsp; 注意, 如果一个场景里没有光是很容易迷失的.&nbsp; 好的建议是总是创建一个光源(半球体光源(HemisphericLight)是个非常方便的灯光工具 - 应用到天空体上).&nbsp; 你可以通过调整它的 .intensity 值来设置光的亮度.&nbsp;在操练系列教程里我们有一个例子, 专门谈论各种光源.
**2. 有型物.**&nbsp; 有型物也叫做 **网格对象**.&nbsp; 每个场景里都需要可视物,对吧?&nbsp; 相机是不可见的, 光源也不可见.&nbsp; 每个场景都需要个有型物, 或者许多个.&nbsp; 没有限制在你的场景里可有的网格对象个数.&nbsp; 一个网格对象可以是Babylon.js的许多内置有型物之一, 或者是你自己通过Babylon.js的顶点数据系统绘制的有型物, 或者是从外部建模软件,例如 Blender 或 3D Studio Maxl里'导入'到场景里的一个网格对象.
关于Babylon.js的场景, 在另外的 [教程和文档](http://doc.babylonjs.com/)里你可以学到许多.&nbsp; 而且别忘了察看娱乐展示厅里 'createScene()' 函数的预装演示场景.&nbsp; Babylon.js的娱乐展示厅是个学习乐园, 也充满乐趣.
## Babylon.js 对象, 属性, 方法, 和值 ##
你已经见识了一些创建场景的函数, 而且你也应该注意到大量Javascript代码被用来创建Babylon.js场景... 给些代码阐述下我的意思, &nbsp;比如设置对象的属性值:
``` javascript
object.property = value;
```
让我们更深入的讨论这4个事情: 对象, 属性, 方法, 和 值.
**对象**
首先,不要把对象认为成 3D造型/网格.&nbsp; 那些事物品对象, 但此处, 我们谈论的事关于...&nbsp;
**Javascript 语言里的对象**
Javascript 对象里的一些常见对象在 Babylon.js 场景里有使用... 它们叫做 **引擎(engine), 场景(scene), 花布(canvas), 网格(mesh), 灯光(light), 相机(camera), 三元向量(Vector3), 三元颜色(Color3), 动作管理器(ActionManager), 和动画(Animation)**.&nbsp;
比如, 下面每行代码... 创建了一个Javascript对象 (或者多个):
``` javascript
// 创建一个 BABYLON.Engine 引擎对象类型.
var engine = new BABYLON.Engine(canvas, true);
// 创建一个 BABYLON.Scene 场景对象类型.
var scene = new BABYLON.Scene(engine);
// 创建一个 BABYLON.FreeCamera 自由相机对象类型
var camera = new BABYLON.FreeCamera("freecam", new BABYLON.Vector3(0, 0, 5), scene);
// 创建一个 BABYLON.DirectionalLight 方向光对象类型
var light = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, -1, 0), scene);
// 创建一个 BABYLON.Mesh 网格对象类型
var mybox = BABYLON.Mesh.CreateBox("box", 6.0, scene);
```
你该清楚了.&nbsp; Javascript 对象, 常常用在 Babylon.js 场景里.&nbsp; 又是你创建它们, 另外一些时候你获得一个早些时候创建的对象的'引用' 或 '句柄' .&nbsp; 持有一个Javascript对象的引用或句柄, 实质上意味着和已有的对象建立了通信线.
这些每个 Javascript 对象都有命名的 '存储空间' 来保存内容到里面.&nbsp; 通常是, 值, 数据, 和对象... 被存在这些内存空间里.&nbsp; 这些存储着值的空间被叫做对象的'属性'.&nbsp; 属性通常被 '设置(set)' (将一个值放入存储空间), 和 '获取(get)' (到存储空间查看里面是什么内容).
**属性**
属性是存储着的值.&nbsp; 这些纸被Babylon.js框架使用... 用于 '渲染(render)' 场景.&nbsp; 这是个例子:
``` javascript
light.intensity = 0.5;
```
此处, 我们给一个被称为'光'的对象设置其叫做 'intensity'的属性值为0.5 (0.5 叫做浮点值, 或仅称为'a float').&nbsp; 我们后面简短的谈论下值.&nbsp; 我主要是希望你注意 那个具有intensity名字的属性(存储空间), 而且我们吧值0.5存到那里(属于那个称为'light'的对象).
**方法**
The other common type of 'pocket' on a Javascript object... is called a 'method' (sometimes called a 'function').&nbsp; Methods are used to store Javascript code onto Javascript objects.&nbsp; Earlier, I said that properties are 'set'.&nbsp; Well, methods are 'called'.&nbsp; Here is the way a method is 'called'.

``` javascript
scene.getMeshByName("box");
```
Here, we have 'called' the getMeshByName() method that is located on the object called 'scene'.&nbsp; See that "box" thing inside the parentheses?&nbsp; That is called a 'parameter' or sometimes called an 'argument' or just... 'an arg'.&nbsp; Some methods require one or more parameters inside the parentheses, and some require none at all.&nbsp; If you look at your createScene function (method) from the big picture above, it had empty parentheses.&nbsp; It did not require any parameters in order to be called.&nbsp; At other times, you might see createScene(engine).&nbsp; In this case, the createScene method DOES require a parameter...&nbsp; a Javascript ENGINE-type of object.

It is beyond the scope of this tutorial to teach everything about callable methods and settable properties on Javascript objects.&nbsp; The main thing is to try to take notice WHEN a 'pocket' on an object... is a property, and when it is a method.&nbsp; Methods always use parentheses... sometimes empty, sometimes full of parameters/args.&nbsp; Properties never use parentheses and therefore never require parameters.

Sometimes, methods are used to SET values of properties, and sometimes methods are used to GET values of properties.&nbsp; These methods/functions are often called GETTERS and SETTERS.&nbsp; Notice the word 'get' in the getMeshByName method above?&nbsp; It is a GETTER method.&nbsp; Here is a more proper use of that 'call':

``` javascript
var box_I_made = scene.getMeshByName("box");
```
This call is getting a reference/handle on a box that was made earlier in the code, and putting that reference into a variable called 'box_I_made'.&nbsp; After you get that reference, you can do things to the box... like set property values.
``` javascript
box_I_made.rotation.y = Math.PI/2;&nbsp; // Rotate the box 90 degrees on the Y-axis.
```
It is difficult for me to explain, but actually quite easy to do, thanks to Babylon.js.&nbsp; Experimenting with properties and methods... is the fastest way to learn.

**Values**

Values... are often the things that are stored in an object's properties ('pockets') and the things that are returned when GETTER methods are called.&nbsp; As crazy as this sounds, all values are Javascript objects.&nbsp; Remember that 0.5 float that we saw earlier?&nbsp; That is a Floating Point&nbsp; NUMBER OBJECT.&nbsp; The 'box_I_made' variable above... it is a MESH OBJECT.&nbsp; The names of mesh, cameras, and lights... are STRING OBJECTS. Objects are everywhere, but they are good friends that help us stay organized.

There are two types of value objects that are very common in Babylon.js.&nbsp; They are the Vector3 value, and the Color3 value.&nbsp; Vector3 and Color3 values... deserve to have their own section in this giant tutorial.&nbsp; Here we go...

## Vector3 and Color3 Values ##

Two of the most-used values in Babylon.js, are Vector3 values and Color3 values.

### Vector3 Values ###
Vector3 values take the form of...
``` javascript
BABYLON.Vector3(xValue, yValue, zValue)
```
They are often used to set/store...

- the value of a .position property on mesh, light, or camera objects
- the value of a .rotation property on a mesh object
- the value of a .scaling property on a mesh object
- the value of a .direction property on a light object

The three 'parameters' inside the parentheses of a Vector3 value... are floats.&nbsp; They can be negative or positive, and there is no practical limit to the size of those values.&nbsp; Let's look at a Vector3 being used to set the .position of a mesh.

``` javascript
box.position = new BABYLON.Vector3(0, 10, 0);
```
The xValue is 0, meaning that the box is positioned in the center of the x-axis.&nbsp; The yValue is 10, meaning that the box is positioned 10 units above the center of the y-axis.&nbsp; The zValue is 0, meaning that the box is positioned in the center of the z-axis.&nbsp; Easy.&nbsp; We will talk more about positioning... further below.&nbsp; 

Now let's look at a Vector3 being used to set a .rotation value:

``` javascript
box.rotation = new BABYLON.Vector3(Math.PI/4, 0, 0);
```
Here, our box is being rotated around the x-axis... about 45 degrees.&nbsp; In Babylon.js, rotation is measured in radians.&nbsp; Math.PI/4 is approximately .707 radians.&nbsp; To rotate 90 degrees, it would be Math.PI/2, or about 1.57 radians.&nbsp; For 180 degrees, it would be Math.PI, or about 3.14 radians.&nbsp; To rotate 360 degrees, it would Math.PI times 2, or about 6.28 radians.

Keep in mind that Vector3 values can be negative numbers as well.&nbsp; So you could easily use -Math.PI/4, -Math.PI/2, -Math.PI, and -Math.PI times 2.&nbsp; These values would rotate the object in the opposite direction around the x-axis.&nbsp; How about this Vector3 rotation:
``` javascript
box.rotation = new BABYLON.Vector3(Math.PI/2, 0, -.707);
```
If you think that it rotates our box in a positive (+) direction 90 degrees around the x-axis, AND ALSO rotates our box 45 degrees in a negative (-) direction around the z-axis, you would be correct.&nbsp; 

Even though Vector3 values can contain very large negative or positive numbers, it is rarely necessary for any xValue, yValue, or zValue... to be outside the range of -6.28 to +6.28 **for setting rotations**.&nbsp; Any numbers outside that range would be unnecessary, because -6.28 (radians) rotates 360 degrees in one direction, and +6.28 (radians) rotates 360 degrees in the opposite direction.&nbsp; That's a full range of rotation, isn't it?&nbsp; We'll talk a bit more about rotation, further below.

Now let's see a Vector3 used for scaling (stretching and shrinking) a mesh:

``` javascript
box.scaling = new BABYLON.Vector3(1, 1, 3);
```
Scaling is a way to shrink or stretch a mesh along any of the 3 scene axes.&nbsp; In the above example, the xValue (1) indicates that no scaling change to the mesh along its x-axis... is desired.&nbsp; The yValue of 1 indicates that we want no change in scaling along the y-axis, either.&nbsp; The zValue of 3 indicates that we we are 'stretching' our mesh along its z-axis... to 3 times its normal size.&nbsp; Easy, right?&nbsp; You bet!&nbsp; 

I will talk more about scaling... further below.

Another use for a Vector3 value... is setting the .direction for certain types of lights:

``` javascript
mySpotLight.direction = new BABYLON.Vector3(0, -1, 0);
```
Generally speaking, when a Vector3 value is used to set a DIRECTION, the xValue, yValue, and zValue are each in a range of negative 1... to positive 1.&nbsp; In the example above, our light is aimed negative on the y-axis... or... straight down.&nbsp; Directions (directional vectors) are used for more things than just lights, but lights is a common use.&nbsp; Directional vectors are not always easy things to determine the x, y, and z parameters/values for.&nbsp; We have some helpful tools on our lights... that will assist you in setting directions.&nbsp; You will learn about those tools in our lights tutorial.
&nbsp;
### Color3 Values ###
Color3 values look very much like Vector3 values.&nbsp; Here is an example:
``` javascript
BABYLON.Color3(rValue, gValue, bValue)
```
The rValue is for red, the gValue is for green, and the bValue is for blue.&nbsp; I bet you have already figured out that Color3 values are used for setting colors.&nbsp; The rValue, gValue, and bValue, all contain float numbers in the range of 0 to 1.&nbsp; Let's look at a few examples:
``` javascript
BABYLON.Color3(1, 0, 0) - red
BABYLON.Color3(0, 1, 1) - cyan
BABYLON.Color3(0, 1, 0) - green
BABYLON.Color3(1, 0, 1) - violet
BABYLON.Color3(1, 1, 0) - yellow
BABYLON.Color3(0, 0, 0) - black
BABYLON.Color3(1, 1, 1) - white
BABYLON.Color3(0.5, 0.5, 0.5) - medium gray
BABYLON.Color3(0.2, 0, 0.2) - dark purple
```
&nbsp;
Not so difficult.&nbsp; Let's say that you wanted to put a color on a box that you have already created.&nbsp; The first thing you do is create a Javascript object called a StandardMaterial.&nbsp; Then you would apply (set) that StandardMaterial as the box's .material property.&nbsp; This is covered by our Materials tutorial, but let's look at how that is done, here.

``` javascript
var myMaterial = new BABYLON.StandardMaterial("mymat", scene);
myBox.material = myMaterial;&nbsp; 
```
The first line creates a StandardMaterial and puts it into the variable named myMaterial.&nbsp; The second line sets the box's .material property... to be that newly-made StandardMaterial.&nbsp; The appearance of the box will not change yet, because we have not given the StandardMaterial any information about what color we want the box to be.&nbsp; 

One of the many properties on a StandardMaterial object... is named .diffuseColor.&nbsp; That property is the primary way to set a basic color.&nbsp; And right here... is where we use our new Color3 value.&nbsp; Let's have a look:
``` javascript
myMaterial.diffuseColor = new BABYLON.Color3(0, 0.5, 0);
```
Our box is now colored medium green.&nbsp; It's just that easy.&nbsp; The StandardMaterial object has many other properties on it.&nbsp; You can add color to properties such as&nbsp; .specularColor, .emissiveColor, .ambientColor.&nbsp; All those properties are set (if you choose)... using our friend... the Babylon.js Color3 value.

Another use of the Color3 value is to set the .diffuse property of lights.&nbsp; Take careful note that the name of this property is .diffuse, and not .diffuseColor.&nbsp; Lights use a property named .diffuse to set their primary color.&nbsp; Let's take a look at how to set the primary color of a light that you have already created:

``` javascript
myLight.diffuse = new BABYLON.Color3(0.5, 0, 0);
```
And there we go.&nbsp; We have colored the light beam that emits from our light... to be medium red.&nbsp; There is one more use for a Color3 value, and that is on one of our newest basic shape objects... called a LINES object.&nbsp; A LINES object does not use a StandardMaterial object for its color.&nbsp; It uses a property called .color.&nbsp; Here is an example of a LINES object being created, and then colored:

``` javascript
// Creation of a triangular lines mesh
var myLines = BABYLON.Mesh.CreateLines("itsName", [
&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; new BABYLON.Vector3(-5, 0, 5),
&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; new BABYLON.Vector3(5, 0, 5),
&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; new BABYLON.Vector3(0, 0, -5),
&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; new BABYLON.Vector3(-5, 0, 5)
], scene);

// And here is how it is colored green...
myLines.color = new BABYLON.Color3(0,1,0);
```
The creation of the lines object was a bit strange, but it sure was easy to make it green, using a Color3 value.&nbsp; You will learn more about the lines mesh.... in our Basic Elements tutorial.&nbsp; For now, I just wanted to show you that it does not use a .diffuseColor property like a box with a StandardMaterial applied, nor a .diffuse property like we used for coloring light beams.&nbsp; It, instead, uses a property called .color.&nbsp; Simple.


## My New Friends - .position, .rotation, and .scaling&nbsp; ##

As you toured the Babylon.js Playground demo scenes, you surely saw some .position, .rotation, and maybe some .scaling properties being 'set' with values.&nbsp; Let's take a look at each one:

**POSITION** - Also called translation, every mesh is POSITIONED in a scene using X, Y, and Z settings.&nbsp; You can think of the .position property... as the mesh's LOCATION.&nbsp; The link below... is a saved playground scene that illustrates using a mesh's .position property.&nbsp; Try to open it in a new window or new tab, so you can jump back and forth between this tutorial... and the playground scene:

http://babylonjs-playground.azurewebsites.net/#35CPC

In the yellow text at the top of the scene, you will see the Babylon.js one-line way to set mybox.position (using our friend... the Vector3 value object).

Below that, in green text, you will see 3 more lines of Babylon.js code.&nbsp; You see, you are NOT required to use a Vector3 to set a .position on a mesh.&nbsp; You can use the '**discrete**' way, instead.&nbsp; Loosely defined, 'discrete' means... piece by piece... one step at a time.&nbsp; If you would like to set a mesh's .position values axis by axis, feel free to use the handy green 'discrete' ways of doing it.

Watch this positioning demo scene for some time, if you please.&nbsp; It will not take long for you to completely understand mesh positioning.&nbsp; 

**ROTATION** - Every mesh is ROTATED in a scene... by setting the amount of spin around the shape's X, Y, and Z axes.&nbsp; Picture a box with a rod stuck through every side and coming out the opposite side.&nbsp; There are 6 sides to a box, so there would be 3 rods, an X rod, a Y rod, and a Z rod.&nbsp; Rotation is the amount (and direction) of spin... AROUND each of these invisible rods.&nbsp; 

Let's take a look at a playground scene that I once created and saved.&nbsp; In this demo, I made those invisible rods... be visible:

http://babylonjs-playground.azurewebsites.net/#YIT1S

Take some time to carefully watch that scene.&nbsp; Like the last demo scene, the yellow text shows a Vector3 being used to set the .rotation property with some computer-generated values.&nbsp; The box is shown doing positive and negative rotations around each of the 3 axes.&nbsp; Under the yellow text... you again see the green text...&nbsp; showing the 3 'discrete' ways to set the box's .rotation property with values.&nbsp; I bet you understand this completely, don't you?&nbsp; Easy.

**SCALING** - Scaling... is stretching or shrinking... along any of the 3 scene axes.&nbsp; Let's jump right into a saved playground scene that demonstrates scaling:

http://babylonjs-playground.azurewebsites.net/#1VMQNH

Again, take some time to watch the scene.&nbsp; And once more, the yellow text shows the one-line Vector3 way of setting a mesh's .scaling, or you can use one or more of the discrete ways of setting scaling... shown in the green text. You may have noticed that scaling values are never negative.&nbsp; It would be illogical to use a negative scaling value, and if you decide to use some negative values, unexpected results may occur.

I would like you to take note... that scaling is **for mesh only**.&nbsp; For example, you can POSITION a mesh, camera, or light.&nbsp; You can often ROTATE a mesh, camera, or light.&nbsp; But SCALING... is for mesh.&nbsp; If you stretch or shrink (scale) a camera or light, you will break its electrical parts.&nbsp; (It's a joke, ok?)&nbsp; &nbsp;There is no reason to set scaling for a camera or light.&nbsp; They are invisible scene items.

## Quick Downloading 'The Big 4' Externals ##

Remember 'The Big Picture' far above?&nbsp; In that section, I introduced you to 'The Big 4' external include files...&nbsp; hand.js, cannon.js, oimo.js, and babylon.js.&nbsp; Many people use GitHub version-management systems to download those files from the Babylon.js GitHub source code repository.&nbsp; Some people make their own 'minified' versions of Babylon.js... using the absolute latest source code files.&nbsp; Others like to be able to grab reasonably fresh versions of The Big 4... in simpler ways.

When you click Get .zip at the Babylon.js playground, you get a zip that contains a file called index.html.&nbsp; If you examine index.html in a text editor, you will see a file that looks very much like The Big Picture far above.&nbsp; Look at the external includes section... the first four HTML SCRIPT elements/tags.&nbsp; The .src attribute within each of those SCRIPT elements... point to URL's located at the Babylon.js web site.

If you want to make your home demo scenes run faster, you can download copies of the external includes... and put them into a folder.&nbsp; That folder should be located WITHIN the folder that holds your index.html.&nbsp; For example, in the same folder as index.html, you could create a folder called 'js' (no quotes).&nbsp; Inside the js folder, you could put home copies of The Big 4 external include files.

Once you have that folder made, you can use the 4 links shown below... to get copies of The Big 4... and put each of them into your js folder.

[**hand.js**](http://www.babylonjs.com/hand.minified-1.2.js)&nbsp; <= right-click... save link/target

[**cannon.js**](http://www.babylonjs.com/cannon.js)&nbsp; <= right-click... save link/target

[**oimo.js**](http://www.babylonjs.com/oimo.js)&nbsp; <= right-click... save link/target

[**babylon.js**](http://www.babylonjs.com/babylon.js)&nbsp; &nbsp;<= right-click... save link/target

Store each of those files into the new js folder.&nbsp; Also, you might want to copy them to some other folder as well, for using later.&nbsp; Try to remember to repeat these actions fairly often, maybe once per month, to ensure that you are always using a reasonably fresh version of The Big 4 files.&nbsp; Babylon.js is always evolving.&nbsp; New features are being added very quickly, and you want your home versions of The Big 4... to be fresh, so you can take advantage of those new features.

Once you have those external includes saved into your new js folder, you need to make some adjustments to the HTML.&nbsp; In your index.html file, you will need to change the .src attributes of all four external includes (the first four SCRIPT elements).&nbsp; Likely, you will want to make your SCRIPT elements look like this:
``` html
&nbsp;&nbsp; &nbsp; <script src="./js/hand.minified-1.2.js"></script>
&nbsp;&nbsp; &nbsp; <script src="./js/cannon.js"></script>&nbsp; <!-- optional -->
&nbsp;&nbsp; &nbsp; <script src="./js/oimo.js"></script>&nbsp; <!-- optional -->
&nbsp;&nbsp; &nbsp; <script src="./js/babylon.js"></script>
```
If you are not using physics in your scene, you might want to remark-out (disable) the script elements that include-in cannon.js and oimo.js.&nbsp; To do that, you could do this:
``` html
&nbsp;&nbsp; &nbsp; <script src="./js/hand.minified-1.2.js"></script>
&nbsp;&nbsp; &nbsp; <!-- <script src="./js/cannon.js"></script> -->
&nbsp;&nbsp; &nbsp; <!-- <script src="./js/oimo.js"></script> -->
&nbsp;&nbsp; &nbsp; <script src="./js/babylon.js"></script>
```
Easy.&nbsp; Most of these things you already know, don't you?&nbsp; I thought so.

## Hey, you made it! ##

You are finally at the bottom of this tutorial.&nbsp; It was a long, but fun trip, wasn't it?&nbsp; Things will be easy from now on.&nbsp; The next tutorial in the Playpen Series tutorials... is about building a very basic scene.&nbsp; I think it will be quite easy and fast, for you.&nbsp; You have graduated from tutorial #0... this tutorial.&nbsp; You are already a Babylon.js expert.