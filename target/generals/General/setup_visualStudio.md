---
配置Visual Studio以便为Babylon.js做贡献
---
## 为什么?
有许多IDE可用与为Babylon.js做贡献, Visual Studio是其中之一.
通过Visual Studio你将能够将库和你的代码一起编译，而且能测试两者(库和你的代码.
## 编译模式
在深入之前，你需要明白有两种编译模式可用来编译Babylon.js.

### 发布模式
你可以使用[Gulp](https://github.com/BabylonJS/Babylon.js/tree/master/Tools/Gulp)脚本来创建主发布文件(babylon.js, babylon.max.js, babylon.d.ts) , 它们将被存储到[之前的路径里](https://github.com/BabylonJS/Babylon.js/tree/master/dist/preview%20release).
这个模式通常用来创建一个新版本快速发布, 编译需要花费些时间所以不适合用在开发/测试流程里.
**也请注意，你不能调试Babylon.js的TypeScript代码, 调试器总是会进入到主JavaScript文件(比如Babylon.js).**
 
### 开发模式
这种模式使用与你修改库时, 与依赖Gulp 来生成发布文件相反，你可以简单的将所有的.ts文件编译成.js (以及.js.map)文件.
#### 优点
 * 编译快速(它仅仅编译.ts文件成.js文件, 没有合并/缩小)
 * 你可以在TypeScript里调试库, 在.ts文件里设置断点, 等等.
#### 缺点
 * 你必须引用BabylonJS的大约150个 .js 文件而不是一个主文件(比如Babylon.js)
 * 需要为引擎做特别的配置才能使它正常工作.
 * 整个库文件必须都可访问，且通过WEB服务器提供服务.
最新的.js文件列表和引擎配置的指示可以在这儿[here](http://doc.babylonjs.com/generals/Creating_the_Mini-fied_Version)找到

## 摘要
这个是我们将怎么做的宏观步骤:
 
 * 把Babylon.js仓库复制到本地
 * 创建一个WEB应用程序工程/解决方案, 并把它移动到Babylon.js仓库的根目录下，然后调好
 * 在该WEB工程里包含进Babylon.js源代码
 * 创建一个小的TypeScript安全沙盒

## 1) 复制仓库
使用[Cmder](http://cmder.net/) 或者其它任意Shell, 转到你希望存储仓库的地方，然后复制出一个仓库来.
![GIT01](http://i.imgur.com/ROTb1fN.png)

![GIT02](http://i.imgur.com/YhFVMbN.png)

顺便说下, 关于为Babylon.js做贡献你可以在 [这儿](http://pixelcodr.com/tutos/contribute/contribute.html)找到更多信息
## 2) 创建Visual Studio工程
Visual Studio或Git都不会在一个非空目录下创建工程/仓库, 这对我们来说是个问题，因为我们希望该Visual Studio工程位于仓库的根目录.
所以我们见在仓库的子目录里创建Visual Studio工程，然后把它移动到上层.
![VS01](http://i.imgur.com/msPuayq.png)

---

![VS02](http://i.imgur.com/Tb3nxWZ.png)
确保你选择了 "为解决方案创建目录", 这样则c:\test\babylon.js目录会被用于存储该 .sln 文件，而且在c:\test\babylon.js\babylon.js里会为工程创建一个新文件夹
---

![VS03](http://i.imgur.com/fZLlLQW.png)
我们选择 ASP.Net 4, 不要尝试第5版模版: 它现在还有许多问题.
### 将工程移动到上层目录
在 Visual Studio里关掉钢厂创建的解决方案, 到被创建的工程目录，然后将它移到上层(c:\test\babylon.js\babylon.js\ 被移动到 c:\test\babylon.js\)
![VS04](http://i.imgur.com/bMRmkPc.png)

_剪切目录..._
---

![VS05](http://i.imgur.com/fcnZDzu.png)

_粘贴到上一层._
---

![VS06](http://i.imgur.com/BBFfRLE.png)

_预计的结果_
### 修复Visual Studio解决方案和工程
返回到Visual Studio里, 打开那个解决方案.
![VS07](http://i.imgur.com/gTjX1m5.png)

_移除已废弃的工程_
---

![VS08](http://i.imgur.com/hB7z6vU.png)

_添加一个新的_
---

## 3) 引入Babylon.js源代码
现在在解决方案里点击"显示所有文件" 按钮，然后选择我们关心的包含进来.
![VS09](http://i.imgur.com/RkR1dFU.png)

![VS10](http://i.imgur.com/XZ58SpM.png)

_我们仅需要 "external refeernces" 和 "src" 文件夹来编译Babylon.js._
---

当我们包含进 "src" 文件夹时，也包含进了和 .ts 文件相应的 .js 文件, 我们需要将它们从工程里删除掉，因为我们不使用它们. 最快的方式是编辑Visual Studio工程文件.
我们也需要修复因移动Visual Studio工程到上层目录产生的nuget包引用异常的问题
你需要将工程从解决方案写在后再编辑它.
![VS11](http://i.imgur.com/t0nOL17.png)

![VS12](http://i.imgur.com/dvTYcR3.png)

---

![VS13](http://i.imgur.com/xvtScCd.png)

![VS14](http://i.imgur.com/rMASFHL.png)

_避免所有的 .js 文件引用_
---

![VS15](http://i.imgur.com/xDB1gvI.png)

_用"packages"执行搜索/替换 "..\packages" , 替换所有._
---

你还要在TypeScriptSourceMap元素下面添加一行，以便启用TypeScriptExperimentalDecorators.
结果看起来像这样:
```xml
    <TypeScriptSourceMap>True</TypeScriptSourceMap>
    <TypeScriptExperimentalDecorators>true</TypeScriptExperimentalDecorators>
```


---

保存然后重新加载工程
![VS16](http://i.imgur.com/AmXRYZj.png)

### 构建 !
构建解决方案, 所有的 .ts 文件将被编译成 .js 文件，伴随生成 .js.map 文件 (调试需要).
![VS16](http://i.imgur.com/GIecIBA.png)

## 4) 创建一个小的安全沙盒
你可以获取这些文件:
 - [sandbox.ts](https://github.com/nockawa/Documentation/blob/master/content/generals/General/setupVisual/sandbox.ts)
 - [index.html](https://github.com/nockawa/Documentation/blob/master/content/generals/General/setupVisual/index.html)
 - [web.config](https://github.com/nockawa/Documentation/blob/master/content/generals/General/setupVisual/Web.config)

在你的工程你创建一个新的TypeScript文件，必要忘记添加下面这些行:
```javascript

BABYLON.Engine.CodeRepository = "/src/";
BABYLON.Engine.ShadersRepository = "/src/Shaders/";
```

当你不是用主 .js 文件工作时需要这些内容, 原因是：着色器被作为变量存储在主 .js 文件里, 当你没使用它时引擎必须通过你指定的WEB服务加载 .fx 文件. 这就是为什么资源必须存储在WEB服务器能够访问的位置.
![VS17](http://i.imgur.com/gcd0WX0.png)

_TypeScript文件_
---

创建一个HTML文件用于引用Babylon.js的所有js文件 (列表可以在[这儿](http://doc.babylonjs.com/generals/Creating_the_Mini-fied_Version)找到)
![VS18](http://i.imgur.com/srkwpF5.png)

_HTML 页面_
---

![VS19](http://i.imgur.com/9HMP6UN.png)

_设置启动页面_
---

我们终于可以编辑web.config文件来声明一些文件类型了(实际上仅 .fx 文件就够了) ，那些允许WEB服务访问的文件.
![VS20](http://i.imgur.com/mKDOqMu.png)

_在web.config添加新的文件类型_
---

![VS21](http://i.imgur.com/Ee91e78.png)

_构建, 运行瞧瞧看哦 !_
你现在可以使用源码调试Babylon.js了.
![VS22](http://i.imgur.com/vtcjnQm.png)
