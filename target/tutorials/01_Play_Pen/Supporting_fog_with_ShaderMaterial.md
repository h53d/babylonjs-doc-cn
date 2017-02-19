---
ID_PAGE: 25101
PG_TITLE: 带材质的雾
---
为零在你的自定义着色器里支持雾，我们必须在你的顶点和像素着色器里添加一些行代码.

##顶点着色器
首先，你需要声明一个变量:

```
varying float fFogDistance;
```

然后需要在着色器内计算其值:

```
fFogDistance = (view * worldPosition).z; // 这是从相机观察点(相机坐标空间)到顶点的距离
```

##像素着色器
下一步，你需要添加以下代码来启用计算雾，依据场景中传递过去的参数:

```
#define FOGMODE_NONE 0.
#define FOGMODE_EXP 1.
#define FOGMODE_EXP2 2.
#define FOGMODE_LINEAR 3.
#define E 2.71828

uniform vec4 vFogInfos;
uniform vec3 vFogColor;
varying float fFogDistance;

float CalcFogFactor()
{
 float fogCoeff = 1.0;
 float fogStart = vFogInfos.y;
 float fogEnd = vFogInfos.z;
 float fogDensity = vFogInfos.w;

 if (FOGMODE_LINEAR == vFogInfos.x)
 {
  fogCoeff = (fogEnd - fFogDistance) / (fogEnd - fogStart);
 }
 else if (FOGMODE_EXP == vFogInfos.x)
 {
  fogCoeff = 1.0 / pow(E, fFogDistance * fogDensity);
 }
 else if (FOGMODE_EXP2 == vFogInfos.x)
 {
  fogCoeff = 1.0 / pow(E, fFogDistance * fFogDistance * fogDensity * fogDensity);
 }

 return clamp(fogCoeff, 0.0, 1.0);
}
```

然后，在着色器内部，你必须使用该函数获取雾的颜色:

```
float fog = CalcFogFactor();
color.rgb = fog * color.rgb + (1.0 - fog) * vFogColor;
```

##Javascript

然后你必须把下面代码添加到你的着色器材质 (ShaderMaterial)的onBind回调函数上:

```
shaderMaterial.onBind = function(mat,mesh) {
    var effect = mat.getEffect();
    effect.setMatrix("view", scene.getViewMatrix());
    effect.setFloat4("vFogInfos", scene.fogMode, scene.fogStart, scene.fogEnd, scene.fogDensity);
    effect.setColor3("vFogColor", scene.fogColor);
}
```

最终，你做到的 :)
