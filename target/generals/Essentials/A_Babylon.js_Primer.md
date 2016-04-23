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
Javascript对象里另外的'存储空间'常见''类型叫做'方法'(有时叫做 '函数').&nbsp; 方法用来讲Javascript代码存储到Javascript对象里.&nbsp; 早些时候,我说的'set'属性也是个方法.&nbsp; 嗯, 方法是被'调用'的.&nbsp; 这儿是个方法被'调用'的方式.
``` javascript
scene.getMeshByName("box");
```
此处,我们调用了一个叫做'scene'的对象上的 getMeshByName() 方法.&nbsp; 看到括号里面的 "box" 了么?&nbsp; 那是一个 '参数' 或者有时也叫做一个 '变元' 或简化为 '一个arg'.&nbsp; 有些方法需要一个或多个参数在括号里, 而且有些压根不需要参数.&nbsp; 如果你从上面的大图里查看下创建场景的函数(方法), 你会发现它的括号里是空的.&nbsp; 调用一个函数并不必须提供参数.&nbsp; 另外一些时候,你可能看到createScene(engine)这样的调用函数.&nbsp; 这种情况下, 创建场景方法确实需要一个Javascript对象的引擎类型的参数.
讨论Javascript对象的可调用方法和可设置属性的所有知识点已经超越了本教程的范围.&nbsp; 此处的主要目标是让大家注意到什么情况下'存储空间'里放的是对象的方法，什么情况下是属性; 方法后面总是跟着小括号... 有时括号里面是空的, 有时填满了参数.&nbsp; 属性后面绝不会有括号因此也绝不需要参数.
有时候, 方法被用来设置属性值， 有时后别用来获取属性值.&nbsp; 这些方法/函数通常被称为 GETTERS 和 SETTERS.&nbsp; 注意到上面getMeshByName方法里的用词 'get' 没?&nbsp; 它就是个 GETTER 方法.&nbsp; 这儿又是一个该方法调用':
``` javascript
var box_I_made = scene.getMeshByName("box");
```
这个调用获取了之前代码创建的盒子对象引用/句柄, 然后把它赋值给一个叫 'box_I_made'的变量.&nbsp; 你获得那个句柄后，就可以操作那个盒子了... 像设置属性.
``` javascript
box_I_made.rotation.y = Math.PI/2;&nbsp; // 在Y轴上旋转90度.
```
对我来而言，空说难但具体做起来很容易, 这要归功于 Babylon.js.&nbsp; 尽快熟悉属性和方法... 是最佳的学习途径.
**值**
值... 通常是存储在对象的属性(存储空间)里的内容, 而且可以通过调用 GETTER 方法获取到.&nbsp; 也许听起来这很疯狂：所有值都是Javascript对象.&nbsp; 还记得前面看到的那个0.5浮点数吗?&nbsp; 那是个数值对象.&nbsp; 上面那个 'box_I_made' 变量... 它是个网格对象.&nbsp; 网格，像机和灯光的名称 是字符串对象. 对象无处不在, 然而它是我们组织管理存储内容的好助手.
在Babylon.js中有两类十分常见 的值类型.&nbsp; 它们是三元向量(Vector3)值和3元颜色( Color3)值.&nbsp; Vector3和Color3 values...保留着，后面各自有章节讲有.&nbsp; 我们继续此处的内容....
## Vector3 和 Color3 值 ##
Babylon.js里最常用的两种值是 Vector3 值和 Color3 值.
### Vector3 值 ###
Vector3 值的形式是...
``` javascript
BABYLON.Vector3(xValue, yValue, zValue)
```
它们长被用来设置/存储...
- 网格,灯光活着相机对象的位置(.position)属性的值
- 网格对象的旋转(.rotation)属性的值
- 网格对象的缩放(.scaling)属性的值
- 灯光对象的方向(.direction)属性的值
Vector3值的括号里三个'参数'是浮点类型的.&nbsp; 它们可正可负, 这些值并没有实际大小的限制.&nbsp; 让我们看个使用Vector3给网格对象设置位置属性值的例子.
``` javascript
box.position = new BABYLON.Vector3(0, 10, 0);
```
该 xValue 为是0, 意味着那个盒子位于X轴的中心.&nbsp; 该yValue值是10, 意味着那个盒子位于Y轴中心上方10个单位的位置.&nbsp; 该zValue值是0, 意味着那个盒子位于Z轴中心的位置.&nbsp; 简单吧.&nbsp; 在后面我们讲更多的讨论位置.&nbsp;
现在让我们可个使用Vector3来设置旋转值的例子:
``` javascript
box.rotation = new BABYLON.Vector3(Math.PI/4, 0, 0);
```
此处, 我们的盒子绕着X轴旋转呢来大约45度.&nbsp; 在Babylon.js里, 旋转是以弧度为度量单位的.&nbsp; Math.PI/4 约等于.707 弧度.&nbsp; 要旋转90度, 将是Math.PI/2, 或着说大约1.57 弧度.&nbsp; 对于180度, 是Math.PI, 或大约3.14 弧度.&nbsp; 要旋转360度, 那就是Math.PI 乘以2, 或者大约6.28弧度.
记住Vector3点值也能为负数.&nbsp; 因此你可以使用 -Math.PI/4, -Math.PI/2, -Math.PI, 和 -Math.PI乘以2.&nbsp; 这些值将是绕着X轴向相反方向旋转.&nbsp; 这个Vector3如何旋转呢:
``` javascript
box.rotation = new BABYLON.Vector3(Math.PI/2, 0, -.707);
```
如果你是这样想的就对了:将盒子绕着X轴旋转正的90度, 而且也绕着Z轴旋转负的45度.&nbsp;
尽管Vector3的值可以是非常的大正数或负数, 但通常没必要为旋转属性将xValue, yValue, 或 zValue的值设置超出 -6.28 和 +6.28之外的值.&nbsp; 任何这个范围之外的值都没必要, 因为 -6.28 (弧度) 是在一个方向旋转 360 度, 而 +6.28 (弧度) 是在另一个方向旋转 360.&nbsp; 那是可旋转的所有范围, 不是么?&nbsp; 后面我们将在多些讨论旋转.
现在让我看看使用Vector3设置缩放(拉伸和缩减)一个网格:
``` javascript
box.scaling = new BABYLON.Vector3(1, 1, 3);
```
缩放是种在场景3轴的任何方向上缩减或拉伸网格的方法.&nbsp; 在上面的例子里, 该xValue (1) 表明网格在X轴上没有缩放改变.&nbsp; 该yValue值1 表明也不要在Y轴上做缩放改变.&nbsp; 该zValue值3表明我们希望在Z轴上拉伸到3倍原大小.&nbsp; 简单吧, 这样就对了?&nbsp; 你矇对了!&nbsp;
在后面我们会更多的讨论缩放.
那外种使用 Vector3 值是用来设置灯光的方向:
``` javascript
mySpotLight.direction = new BABYLON.Vector3(0, -1, 0);
```
通常来说, 当一个Vector3值被用来设置一个方向是, 该xValue, yValue, 和 zValue是在负1和正1之间的.&nbsp; 在上面的例子里, 我们的光是瞄向Y轴负方向的... 或者直接向下.&nbsp; 矢量 (方向向量) 被用在不仅仅是灯光上, 但通常是灯光上.&nbsp; 矢量并不总是能很容易的用x, y, 和z 为参数来衡量.&nbsp; 我们有些辅助工具来处理灯光... 它们将帮助你设置方向.&nbsp; 你讲在我们的灯光教程里来学习那些工具.
&nbsp;
### Color3值 ###
Color3值非常像Vector3值.&nbsp;这儿是个例子:
``` javascript
BABYLON.Color3(rValue, gValue, bValue)
```
该rValue是用来表示红色, 该gValue用来表示绿色, 同时该bValue是用来表示蓝色.&nbsp; 我猜你已经知道Color3是用在颜色上的.&nbsp; 这些rValue, gValue, 和 bValue, 都是在0和1间的浮点值.&nbsp; 让我们看些例子:
``` javascript
BABYLON.Color3(1, 0, 0) - 红
BABYLON.Color3(0, 1, 1) - 青
BABYLON.Color3(0, 1, 0) - 绿
BABYLON.Color3(1, 0, 1) - 紫
BABYLON.Color3(1, 1, 0) - 黄
BABYLON.Color3(0, 0, 0) - 黑
BABYLON.Color3(1, 1, 1) - 白
BABYLON.Color3(0.5, 0.5, 0.5) - 中灰
BABYLON.Color3(0.2, 0, 0.2) - 暗紫
```
&nbsp;
没看起来这么难.&nbsp; 让我们假设你要把一个颜色用到你之前已经创建的一个盒子上.&nbsp; 你要做的第一件事情是创建一个叫做标准材质的Javascript对象.&nbsp; 然后将该标准材质应用(设置)到盒子的材质(.material)属性上.&nbsp; 这将在材质教程里讲, 但现在我们看这是如何做到的.
``` javascript
var myMaterial = new BABYLON.StandardMaterial("mymat", scene);
myBox.material = myMaterial;&nbsp; 
```
第一行创建了个标准材质并把它放入一个名为myMaterial的变量.&nbsp; 第二行设置盒子的材质(.material)属性为那个新创建的标准材质.&nbsp; 孩子的外观还没有改变,因为我们还没有给该标准材质提供任何我们想要的颜色.&nbsp;
在标准材质对象的众多属性中,有个叫作漫反射颜色(.diffuseColor).&nbsp; 那个属性是设置基础颜色的主要途径.&nbsp; 此处... 我们使用新分配的 Color3值来设置.&nbsp; 让们看看代码:
``` javascript
myMaterial.diffuseColor = new BABYLON.Color3(0, 0.5, 0);
`
我们的盒子现在是种绿色了.&nbsp; 就是那么简单.&nbsp; 标准材质对象有许多其它的属性.&nbsp; 你可以给诸如&nbsp;镜面光颜色( .specularColor), 放射光颜色(.emissiveColor), 环境光颜色(.ambientColor)等属性天假颜色.&nbsp; 所有这些属性都使用(如果你选择这样做)Babylon.js的三元色(Color3)值来设置.
另一个Color3值的用途是设置光的散射(.diffuse)属性.&nbsp; 注意该属性的名字是.diffuse, 而不是.diffuseColor.&nbsp; 光源使用一个名为.diffuse的属性设置其主色.&nbsp; 让们看看如何给那个你创建的光源设置主色:
``` javascript
myLight.diffuse = new BABYLON.Color3(0.5, 0, 0);
```
我们开始吧.&nbsp; 我们将光源发散出来的光线着色为中红色.&nbsp; 有不止一种使用Color3值的方式, 其中一种使用在来我们最基础的造型对象(线对象)上.&nbsp; 一个线对象不使用标准材质作为其颜色.&nbsp; 它使用一个称为颜色(.color)的属性.&nbsp; 此处我们有个例子创建一个线对象,然后为其着色的例子:
``` javascript
// 三角线网格的创建
var myLines = BABYLON.Mesh.CreateLines("itsName", [
&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; new BABYLON.Vector3(-5, 0, 5),
&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; new BABYLON.Vector3(5, 0, 5),
&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; new BABYLON.Vector3(0, 0, -5),
&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; new BABYLON.Vector3(-5, 0, 5)
], scene);
// 然后是如何对它着色...
myLines.color = new BABYLON.Color3(0,1,0);
```
线对象的创建优点怪怪的, 但是使它为绿色确很简单, 使用一个Color3值.&nbsp; 关于线网格你将会学到更多.... 在我们的基础元素教程里.&nbsp; 至于现在, 我只是想表示它(线对象)不像盒子那样应用标准材质并对其(材质)使用.diffuseColor属性来设置颜色, 也不想光线那样使用.diffuse属性来设置颜色.&nbsp; 相反,我们直接使用一个.color属性.&nbsp; 就是这样简单.

## 新的帮手 - 位置属性(.position), 旋转属性(.rotation), 和缩放属性(.scaling)&nbsp; ##
如果你浏览了Babylon.js娱乐展示厅的演示场景, 你必定看到了一些位置属性(.position), 旋转属性(.rotation), 可能还有些缩放属性(.scaling)设置了值.&nbsp; 让我们一个个的看看:
**位置** - 也被叫作平移, 每个网格对象都通过设定其X, Y, 和Z来被定位到场景里.&nbsp; 你可以把位置属性(.position)认为称网格对象的定位.&nbsp; 下面的链接... 是一个保存的娱乐场景,它阐述了网格对象的位置属性的使用.&nbsp; 请试着在新窗口或标签页中打开, 那样你就可以前后跳转,以在本教程和娱乐展示场景间切换:
http://babylonjs-playground.azurewebsites.net/#35CPC

场景顶部的黄颜色文本, 你将看到一行Bayblon.js代码设置mybox.position的方式 (使用我们的助手... 那个Vector3值对象).
在那下面, 在绿色文本里, 你将看到另3行Babylon.js代码.&nbsp; 你该清楚了, 你不需被迫使用Vector3值来设置网格的位置属性(.position).&nbsp; 相反,你可以用'**零散(discrete)**'的方式.&nbsp; 没有严格的定义, '林散' 意味着... 一块一块的... 一次一小步.&nbsp; 如果你想一个轴一个轴的设置网格的位置属性, 可以自便的按照那个些绿色'零散'的方式去做.
如果你乐意, 请多花些时间看这个关于位置属性的演示场景.&nbsp; 要不了多久你就会完全理解网格定位了.&nbsp;
**旋转** - 场景里的每个网格的旋转... 都是通过设置造型的X, Y, 和 Z 轴的自旋量来实现的.&nbsp; 想象一个画面:一个盒子,每个面都有个棒从这个面的边穿进去另一边穿出来.&nbsp; 一个盒子有6个面, 所以需要3个棒, 一个为X轴, 一个为Y轴, 同时一个为Z轴.&nbsp; 旋转是自旋量(包括方向)的累积... 围绕每个这些无形的棒.&nbsp;
让我们看看娱乐展示厅里的一个我曾经创建保存的场景.&nbsp; 在这个演示里, 我将这些无形的棒可视化了:
http://babylonjs-playground.azurewebsites.net/#YIT1S

花些时间仔细观察下这个场景.&nbsp; 更上个演示场景类似, 黄颜色文本显示了一个Vector3量, 它被一些电脑生成的值填充并被用来设置旋转属性(.rotation).&nbsp; 盒子展示着绕3个轴各自独立正转反转的情形.&nbsp; 在黄颜色文本下面... 你再次看到绿颜色文本...&nbsp; 展示着3种 '零散'方式给盒子的旋转属性(.rotation)设置值.&nbsp; 我打赌你已经完全理解了, 难道你们么??&nbsp; 就是如此简单.
**缩放** - 缩放... 是指拉伸或缩小... 沿着场景轴的三个方向中的任意方向.&nbsp; 我们直接跳转到娱乐展示厅中演示缩放的场景:
http://babylonjs-playground.azurewebsites.net/#1VMQNH

再次的,请花些时间观察下该场景.&nbsp; 而且又一次的, 黄颜色的文本显示了通过一行代码里用Vector3量设置网格的缩放(.scaling)属性的方式, 或者你也可以使用一种或多种方式零散设置缩放... 绿色文本显示了那些方法. 你也许注意到了缩放值没有出现过负数.&nbsp; 使用负数值来缩放是非法的, 而且如果你决定使用负数值, 可能会出现未知异常.
我希望你注意... 缩放是**仅仅网格可以**.&nbsp; 例如, 你可以定位一个网格, 相机, 活着光源.&nbsp; 你可以经常旋转一个网格, 相机, 或者光源.&nbsp; 但是对于缩放... 它是针对网格的.&nbsp; 如果你拉伸或缩小(缩放)一个相机或光源, 你会破坏其电力部分.&nbsp; (开玩笑的,好么?)&nbsp; &nbsp;没有必要缩放相机或光源.&nbsp; 它们是场景中不可见项.
## 快速下载'四大'外部资源 ##
还记得上面的'大图片'么?&nbsp; 在那个段中, 我给你介绍了包含的'四大'外部文件资源...&nbsp; hand.js, cannon.js, oimo.js, 和 babylon.js.&nbsp; 许多人通过GitHub版本管理系统从Babylon.js的GitHub源代码仓库下载这些文件.&nbsp; 有些人使用最新的源代码文件创建自己的 '缩小'版Babylon.js&nbsp; 其他人则喜欢通过网络抓取的简单方式获取合适的新版四大文件资源.
当你在娱乐展示厅里点击获取.zip时, 你得到一个zip压缩文件其中包含个叫做index.html的文件.&nbsp; 如果你在文本编辑器中查看这个index.html文件, 你将看到一个和上面大图里非常像的文件内容.&nbsp; 查看下外部包含的段落... 第一批4个页面SCRIPT元素/标签.&nbsp; 每个标签里的.src属性... 指向里Babylon.js网站的网址.
如果你想让家里的演示场景运行快些, 你可以下载这些外部文件的拷贝... 然后把它们放入一个文件夹.&nbsp; 该本文件夹必须和你的index.html文件位于同一个文件夹下.&nbsp; 例如, 在index.html的同一文件夹里, 你创建一个叫做'js' (没有引号)的文件夹.&nbsp; 将你下载4大外部资源文件放入该js文件夹.
一旦你准备好那个文件夹, 你可以使用下面显示的4个链接... 获取4大资源拷贝... 然后将它们各自放入你的文件夹.
[**hand.js**](http://www.babylonjs.com/hand.minified-1.2.js)&nbsp; <= 右击... 保存链接/目标
[**cannon.js**](http://www.babylonjs.com/cannon.js)&nbsp; <= 右击... 保存链接/目标
[**oimo.js**](http://www.babylonjs.com/oimo.js)&nbsp; <= 右击... 保存链接/目标
[**babylon.js**](http://www.babylonjs.com/babylon.js)&nbsp; &nbsp;<= 右击... 保存链接/目标
将这些文件保存到新的js文件夹.&nbsp; 此外, 你也许想拷贝它们到其它文件夹, 以便以后使用.&nbsp; 尽量经常重复这些动作, 也许每月一次的好, 以确保你使用的4大文件资源总是最新的版本.&nbsp; Babylon.js一直在持续进化.&nbsp; 新特性的添加非常快, 你想家里的4大资源文件版本保持新的, 以便利用这些新特性, 因此你就要经常重复上面的动作.
一旦你将那些外部资源保存到你的新js文件夹, 你就需要调整下你的页面HTML内容.&nbsp; 在你的index.html文件里, 你需要改变4个外部包含(那4个SCRIPT元素)的.src属性内容.&nbsp; 可能, 你想让你的SCRIPT元素看起来像这样子:
``` html
&nbsp;&nbsp; &nbsp; <script src="./js/hand.minified-1.2.js"></script>
&nbsp;&nbsp; &nbsp; <script src="./js/cannon.js"></script>&nbsp; <!-- 可选项 -->
&nbsp;&nbsp; &nbsp; <script src="./js/oimo.js"></script>&nbsp; <!-- 可选项 -->
&nbsp;&nbsp; &nbsp; <script src="./js/babylon.js"></script>
```
如果你在场景里不使用物理特性, 你可能会标注掉(禁用)包含cannon.js 和 oimo.js脚本的元素 .&nbsp; 为了实现它, 你可以这样做:
``` html
&nbsp;&nbsp; &nbsp; <script src="./js/hand.minified-1.2.js"></script>
&nbsp;&nbsp; &nbsp; <!-- <script src="./js/cannon.js"></script> -->
&nbsp;&nbsp; &nbsp; <!-- <script src="./js/oimo.js"></script> -->
&nbsp;&nbsp; &nbsp; <script src="./js/babylon.js"></script>
```
简单吧.&nbsp; 大部分内容你都已经知道了, 难道你还没么?&nbsp; 我想你会了.
## 嘿, 你做到了!##
你终于到达这个教程的底部了.&nbsp; 它很长, 但是很有趣, 不是么?&nbsp; 从现在开始将很容易的.&nbsp; 下一演练系列的教程里... 是关于常见一个非常基础的场景的.&nbsp; 我想对你而言,它会非常简单而且快; 你已经从本教程#0毕业啦... &nbsp; 你已经是个Babylon.js专家啦.