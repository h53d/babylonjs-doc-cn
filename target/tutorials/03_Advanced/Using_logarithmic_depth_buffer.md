---
PG_TITLE: Using logarithmic depth buffer
---

Pretty much every 3D programmer runs into depth buffer issues sooner or later. 
Especially when doing space rendering where objects can be distant from light years.

In this case the linear depth buffer used by default can generate glitches when distances start reaching big numbers. 
In short, the depth values are proportional to the reciprocal of Z. This gives amounts of precision near the camera but little off in the distance.

You can get an interesting analysis by Brano Kemen on this blog: http://www.gamasutra.com/blogs/BranoKemen/20090812/85207/Logarithmic_Depth_Buffer.php

To help with this issue, you may want to use a better Z-value distribution: the logarithmic depth buffer where Z = log(C*z + 1) / log(C*Far + 1) * w

StandardMaterial can enable logarithmic depth buffer is the browser supports *GL_EXT_frag_depth* extension.

To enable it, just use this code:
```
material.useLogarithmicDepth = true;
```

If the extension is not supported, Babylon.js will revert to linear depth buffering.