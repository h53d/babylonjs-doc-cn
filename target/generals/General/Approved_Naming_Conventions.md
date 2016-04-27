---
ID_PAGE: 22671
PG_TITLE: 批准的命名约定
---
如果你想为babylon.js做贡献 (多么*杰出* 的想法!), 你应当按照下面的命名约定调整你的代码:


- 私有变量的命名以 _开头 : ```_myVariable```
- 驼峰规则(单词间首字母大写)用在非静态的属性/函数/变量: ```var myUberUsefulVariable```
- Pascal规则(单词间点号隔开)必须用在静态函数: ```BABYLON.Vector3.Project```
- 每个循环即使只有一行内容的也必须使用大括号({})包围:
```
if (条件) {
    this.doSomething();
}
```
- 大括号的开始和代码在同一行，而大括号的结尾另起一行
- 每个新文件必须只有一个类

你必须使用 **TypeScript** 提交拉取请求.

如果你想加个新文件, 请也按照下面要求做好:

- 更新gulp的配置[config.json](https://github.com/BabylonJS/Babylon.js/blob/master/Tools/Gulp/config.json)
- 更新[文档](http://doc.babylonjs.com/generals/Creating_the_Mini-fied_Version)
