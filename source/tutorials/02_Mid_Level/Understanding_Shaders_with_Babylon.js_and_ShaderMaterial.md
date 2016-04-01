---
ID_PAGE: 22311
PG_TITLE: 15. Understanding Shaders with Babylon.js and ShaderMaterial
---
We're headed for David Catuhe's Blog!

Please click [right here](http://blogs.msdn.com/b/eternalcoding/archive/2014/04/17/learning-shaders-create-your-own-shaders-with-babylon-js.aspx)


More additional information

The ShaderMaterial will automatically add #define in your shader for the following options:


* Instances: **"#define INSTANCES"** will be added. You will have to add *"world0"*, *"world1"*, *"world2"*, *"world3"* attributes to you shader like [here](https://github.com/BabylonJS/Babylon.js/blob/master/src/Shaders/ShadersInclude/instancesVertex.fx)
* Bones: **"#define NUM_BONE_INFLUENCERS"** will be added. You can then use this value to compute our bone transformation like [here](https://github.com/BabylonJS/Babylon.js/blob/master/src/Shaders/ShadersInclude/bonesVertex.fx). You also need to add *BABYLON.VertexBuffer.MatricesIndicesKind* and *BABYLON.VertexBuffer.MatricesWeightsKind* to your attributes list.
* Alpha test: **"#define ALPHATEST"** will be added
