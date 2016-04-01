---
ID_PAGE: 25101
PG_TITLE: Supporting fog with ShaderMaterial
---
In order to support fog in your custom shaders, you will have to add some lines of code in your vertex and pixel shaders.

##Vertex shader
First, you need to declare a varying variable:

```
varying float fFogDistance;
```

Then you have to compute this value inside the shader:

```
fFogDistance = (view * worldPosition).z; // This is the distance of the vertex from the point of view of the camera (Camera space)
```

##Pixel shader
Next, you need to add the following code to be able to compute the fog accordingly to parameters sent by the scene:

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

Then, inside the shader, you have to use this function to get the fog color:

```
float fog = CalcFogFactor();
color.rgb = fog * color.rgb + (1.0 - fog) * vFogColor;
```

##Javascript

You then have to add the following code for the onBind callback of your ShaderMaterial:

```
shaderMaterial.onBind = function(mat, mesh) {
    var effect = mat.getEffect();
    effect.setMatrix("view", scene.getViewMatrix());
    effect.setFloat4("vFogInfos", scene.fogMode, scene.fogStart, scene.fogEnd, scene.fogDensity); 
    effect.setColor3("vFogColor", scene.fogColor);
}
```

And, you are done :)
