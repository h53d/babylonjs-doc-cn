---
ID_PAGE: 22661
PG_TITLE: 文件格式(.babylon)
---
**Babylon.js** 使用JSON文件格式来描述场景.

你可以在这儿找到完整的加载器代码:
https://github.com/BabylonJS/Babylon.js/blob/master/src/Loading/Plugins/babylon.babylonFileLoader.js

## 基础类型
.babylon 文件使用下面的约定来定义基础类型:

* **Vector3**: 一个含有3个浮点数([x, y, z])的数组. 例子: [1.1, 2.2, 3.3]
* **Vector4**: 一个含有4个浮点数([x, y, z, w])的数组. 例子: [1.1, 2.2, 3.3, 4.4]
* **Color3**: 一个含有3个浮点数且大小在0和1间的 ([r, g, b])数组. 例子: [0.2, 0.3, 0.5]
* **Matrix**: 行优先(先按行存储)的含有16个浮点数的数组
* **Boolean**: 真或假

## 全局结构体
.babylon文件里的全局结构体是下面这样的:

```javascript
{
    "autoClear": boolean,
    "clearColor": color3,
    "ambientColor": color3,
    "gravity": vector3 (通常是[0,-9,0]),
    "cameras": 相机数组 (见下面),
    "activeCamera_": string,
    "lights": array of Lights (见下面),
    "materials": 材质数组 (见下面),
    "geometries": {...} (见下面),
    "meshes": 网格数组 (见下面),
    "multiMaterials": 多材质数组(见下面),
    "shadowGenerators":  ShadowGenerators数组 (见下面),
    "skeletons": Skeletons数组 (见下面),
    "particleSystems": ParticleSystems数组 (见下面),
    "lensFlareSystems": LensFlareSystems数组 (见下面),
    "actions": actions数组 (见下面),
    "sounds": Sounds数组 (见下面),
    "workerCollisions": boolean,
    "collisionsEnabled": boolean,
    "physicsEnabled": boolean,
    "physicsGravity": vector3 (默认是[0,-9.81,0]),
    "physicsEngine": string ("oimo" 或 "cannon", 引擎默认为(oimo),
    "animations": Animations数组 (见下面，可以省略),
    "autoAnimate": boolean,
    "autoAnimateFrom": int,
    "autoAnimateTo": int,
    "autoAnimateLoop": boolean (可以省略),
    "autoAnimateSpeed": number (can be omitted)
}
```

## 相机
一个相机通过如下JSON格式定义:
```javascript
{
    "name": string,
    "id": string,
    "type": string,
    "tags": string,
    "parentId": string,
    "lockedTargetId": string,
    "position": vector3,
    "target": vector3,
    "alpha": float, // 仅仅支持ArcRotateCamera 和 AnaglyphArcRotateCamera
    "beta": float, // 仅仅支持 ArcRotateCamera 和 AnaglyphArcRotateCamera
    "radius": float, // 仅仅支持 ArcRotateCamera, FollowCamera 和 AnaglyphArcRotateCamera
    "eye_space": float, // 仅仅支持 AnaglyphFreeCamera 和 AnaglyphArcRotateCamera
    "heightOffset": float, // 仅仅支持 FollowCamera
    "rotationOffset": float, // 仅仅支持 FollowCamera
    "cameraRigMode": int (可以忽略),
    "fov": float (弧度单位),
    "minZ": float,
    "maxZ": float,
    "speed": float,
    "inertia": float (在0和1间),
    "checkCollisions": boolean,
    "applyGravity": boolean,
    "ellipsoid": vector3,
    "animations": Animations数组 (见下面，可以忽略),
    "autoAnimate": boolean,
    "autoAnimateFrom": int,
    "autoAnimateTo": int,
    "autoAnimateLoop": boolean (可以忽略),
    "autoAnimateSpeed": number (可以忽略),
    "inputmgr" : map of camera inputs (可以忽略, 见下面)
}
```

## 相机的输入映射
这是个对象，它字面上用输入类型作为键，同时用输入设定作为子对象。每个输入类型都有其自身的属性.

## 光源
光源通过如下的JSON格式定义:
```javascript
{
    "name": string,
    "id": string,
    "tags": string,
    "type": int (0表示点光，1表示方向光, 2表示聚光，3表示球面光),
    "position": vector3,
    "direction": vector3,
    "angle": float (用于点光源),
    "exponent": float (用于点光源),
    "groundColor": color3 (用于球面光光源),
    "intensity": float,
    "range": float,
    "diffuse": color3,
    "specular": color3,
    "excludedMeshesIds": array of string,
    "includedOnlyMeshesIds": array of string,
    "animations": array of Animations (见下面，可以忽略),
    "autoAnimate": boolean,
    "autoAnimateFrom": int,
    "autoAnimateTo": int,
    "autoAnimateLoop": boolean (可以忽略),
    "autoAnimateSpeed": number (可以忽略)
}
```

## 材质
一个材质通过如下JSON格式定义:
```javascript
{
    "name": string,
    "id": string,
    "tags": string,
    "disableDepthWrite": boolean (可以忽略),
    "ambient": color3,
    "diffuse": color3,
    "specular": color3,
    "specularPower": float,
    "emissive": color3,
    "alpha": float,
    "backFaceCulling": boolean,
    "wireframe": boolean,
    "diffuseTexture": Texture (见下面),
    "ambientTexture": Texture (见下面),
    "opacityTexture": Texture (见下面,
    "reflectionTexture": Texture (见下面),
    "refractionTexture": Texture (见下面),
    "indexOfRefraction": float,
    "emissiveTexture": Texture (见下面),
    "specularTexture": Texture (见下面),
    "bumpTexture": Texture (见下面),
    "lightmapTexture": Texture (见下面),
    "useLightmapAsShadowmap": boolean, 
    "checkReadyOnlyOnce": boolean
    "useReflectionFresnelFromSpecular": boolean (可以忽略),
    "useEmissiveAsIllumination": boolean (可以忽略),
    "diffuseFresnelParameters": 菲涅耳参数 (见下面),
    "opacityFresnelParameters": 菲涅耳参数 (见下面),
    "reflectionFresnelParameters": 菲涅耳参数 (见下面),
    "refractionFresnelParameters": 菲涅耳参数 (见下面),
    "emissiveFresnelParameters": 菲涅耳参数 (见下面)
}
```

## 菲涅耳参数
菲涅耳参数通过如下的JSON格式定义:
```javascript
{
    "isEnabled": boolean,
    "leftColor": color3,
    "rightColor": color3,
    "bias": float,
    "power": float
}
```

## 纹理
纹理通过如下的JSON个格式定义:
```javascript
{
    "name": string (文件名),
    "level": float (在0和1间),
    "hasAlpha": boolean,
    "getAlphaFromRGB": boolean,
    "coordinatesMode": int (0 = 显式, 1 = 球, 2 = 平面, 3 = 立方, 4 = 投影, 5 = 天空盒),
    "uOffset": float,
    "vOffset": float,
    "uScale": float,
    "vScale": float,
    "uAng": float,
    "vAng": float,
    "wAng": float,
    "wrapU": boolean,
    "wrapV": boolean,
    "coordinatesIndex": int,
    "animations": array of Animations (见下面，可以忽略),
    "base64String": string (可以忽略)
}
```

## 多纹理
多纹理通过如下JSON格式定义:
```javascript
{
    "name": string,
    "id": string,
    "tags": string,
    "materials": string数组 (都是子纹理的ID)
}
```

## 几何体
几何体的结构如下:
```javascript
{
    "boxes": array of Boxes (见下面),
    "spheres": array of Spheres (见下面),
    "cylinders": array of Cylinders (见下面),
    "toruses": array of Toruses (见下面),
    "grounds": array of Grounds (见下面),
    "planes": array of Planes (见下面),
    "torusKnots": array of TorusKnots (见下面),
    "vertexData": array of VertexData (见下面)
}
```

## 盒子
盒子通过如下的JSON格式定义:
```javascript
{
    "id": string,
    "size": float,
    "canBeRegenerated": bool,
    "tags": string
}
```

## 球体
球体通过如下的JSON格式定义:
```javascript
{
    "id": string,
    "segments": float,
    "diameter": float,
    "canBeRegenerated": bool,
    "tags": string
}
```

## 圆柱体
圆柱体通过如下的JSON格式定义:
```javascript
{
    "id": string,
    "height": float,
    "diameterTop": float,
    "diameterBottom": float,
    "tessellation": float,
    "subdivisions": integer,
    "canBeRegenerated": bool,
    "tags": string
}
```

## 环型体
环型体通过如下的JSON定义:
```javascript
{
    "id": string,
    "diameter": float,
    "thickness": float,
    "tessellation": float,
    "canBeRegenerated": bool,
    "tags": string
}
```

## 地面
地面通过如下的JSON格式定义:
```javascript
{
    "id": string,
    "width": float,
    "height": float,
    "subdivisions": float,
    "canBeRegenerated": bool,
    "tags": string
}
```

##平面
平面通过如下的JSON格式定义:
```javascript
{
    "id": string,
    "size": float,
    "canBeRegenerated": bool,
    "tags": string
}
```

## 环形节
环形节通过如下的JSON格式定义:
```javascript
{
    "id": string,
    "radius": float,
    "tube": float,
    "radialSegments": float,
    "tubularSegments": float,
    "p": float,
    "q": float,
    "canBeRegenerated": bool,
    "tags": string
}
```

## 顶点数据
顶点数据通过如下的JSON格式定义:
```javascript
{
    "id": string,
    "updatable": bool,
    "positions": array of floats (每顶点3个数值),
    "normals": array of floats (每顶点3个数值),
    "uvs": array of floats (每顶点2个数值),
    "uv2s": array of floats (每顶点2个数值) 第2个纹理坐标 (可以忽略),
    "uv3s": array of floats (每顶点2个数值) 第3个纹理坐标 (可以忽略),
    "uv4s": array of floats (每顶点2个数值) 第4个纹理坐标 (可以忽略),
    "uv5s": array of floats (每顶点2个数值) 第5个纹理坐标 (可以忽略),
    "uv6s": array of floats (每顶点2个数值) 第6个纹理坐标 (可以忽略),
    "colors": array of floats (每顶点3个数值)每个顶点的颜色 (可以忽略),
    "matricesIndices": array of ints (每顶点4个数值) 骨骼数据在矩阵数组里的索引 (可以忽略),
    "matricesWeights": array of floats (每顶点4个数值) 骨骼数据在矩阵数组里的权重  (可以忽略),
    "indices": array of ints (每面点3个数值),
    "tags": string
}
```

## 实例
实例过如下的JSON格式定义:
```javascript
{
    "name": string,
    "tags": string,
    "position": vector3,
    "rotation": vector3 (可以忽略),
    "rotationQuaternion": vector4 (可以忽略),
    "scaling": vector3
}
```

## 网格
网格过如下的JSON格式定义:
```javascript
{
    "name": string,
    "id": string,
    "tags": string,
    "parentId": string,
    "materialId": string,
    "geometryId": string (可以忽略),
    "position": vector3,
    "rotation": vector3 (可以忽略),
    "rotationQuaternion": vector4 (可以忽略),
    "scaling": vector3,
    "pivotMatrix": matrix,
    "freezeWorldMatrix": boolean (可以忽略),
    "infiniteDistance": boolean,
    "showBoundingBox": boolean,
    "showSubMeshesBoundingBox": boolean,
    "isVisible": boolean,
    "isEnabled": boolean,
    "pickable": boolean,
    "applyFog": boolean,
    "alphaIndex": int,
    "checkCollisions": boolean,
    "billboardMode": int (0 = None, 1 = X, 2 = Y, 4 = Z, 7 = All),
    "receiveShadows": boolean,
    "physicsImpostor": int (0 = None, 1 = Box, 2 = Sphere),
    "physicsMass": float,
    "physicsFriction": float,
    "physicsRestitution": float,
    "positions": array of floats (每顶点3个数值),
    "normals": array of floats (每顶点3个数值),
    "uvs": array of floats (每顶点2个数值),
    "uvs2": array of floats (每顶点2个数值)  第2个纹理坐标(可以忽略),
    "uv3s": array of floats (每顶点2个数值)  第3个纹理坐标 (可以忽略),
    "uv4s": array of floats (每顶点2个数值)  第5个纹理坐标 (可以忽略),
    "uv5s": array of floats (每顶点2个数值)  第6个纹理坐标 (可以忽略),
    "uv6s": array of floats (每顶点2个数值)  第7个纹理坐标 (可以忽略),
    "colors": array of floats (每顶点4个数值) 每个顶点的颜色 (可以忽略),
    "hasVertexAlpha": 指明颜色是否包含透明信息的值(可以忽略),
    "matricesIndices": array of ints (每顶点4个数值)  骨骼数据在矩阵数组里的索引  (可以忽略),
    "matricesWeights": array of floats (每顶点4个数值)  骨骼数据在矩阵数组里的权重 (可以忽略),
    "indices": array of ints (每面3个数值,
    "subMeshes": array of SubMeshes (见下面),
    "animations": array of Animations (见下面, 可以忽略),
    "autoAnimate": boolean,
    "autoAnimateFrom": int,
    "autoAnimateTo": int,
    "autoAnimateLoop": boolean,
    "autoAnimateSpeed": number (可以忽略)
    "instances": array of Instances (见下面, 可以忽略),
    "actions": array of actions (见下面)
}
```

请注意，父网格的描述必须在其子节点出现之前。

## 子网格
子网格过如下的JSON格式定义:
```javascript
{
    "materialIndex": int,
    "verticesStart": int,
    "verticesCount": int,
    "indexStart": int,
    "indexCount": int
}
```

## 动画
动画过如下的JSON格式定义:
```javascript
{
    "dataType": int (0 = 浮点, 1 = 3元量, 2 = 4元量, 3 = 矩阵),
    "framePerSecond": int,
    "loopBehavior": int (0 = 相对, 1 = 周期, 2 = 常量),
    "name": string,
    "property": string,
    "keys": array of AnimationKeys (见下面),
    "autoAnimate": boolean,
    "autoAnimateFrom": int,
    "autoAnimateTo": int,
    "autoAnimateLoop": boolean
}
```

## 动画关键帧
动画关键帧通过如下的JSON格式定义:
```javascript
{
    "frame": int,
    "values": array of float (取决于播放的值)
}
```

## 阴影生成器
阴影生成器通过如下的JSON格式定义:
```javascript
{
    "useBlurVarianceShadowMap": boolean,
    "useVarianceShadowMap": boolean,
    "usePoissonSampling": boolean,
    "mapSize": int (在64和2048之间, 必须是2的幂),
    "bias": float,
    "forceBackFacesOnly": float,
    "lightId": string,
    "renderList": array of string (网格的ID)
}
```

## 骨架
骨架通过如下的JSON格式定义:
```javascript
{
    "name": string,
    "id": string,
    "bones": array of Bones (见下面)
    "needInitialSkinMatrix": boolean
}
```

## 骨骼
骨骼通过如下的JSON格式定义:
```javascript
{
    "parentBoneIndex": int,
    "name": string,
    "matrix": matrix,
    "animations": array of Animations (必须是个矩阵类型)
}
```

## 粒子系统
粒子系统通过如下的JSON格式定义:
```javascript
{
     "emitterId": string,
     "gravity": vector3,
     "direction1": vector3,
     "direction2": vector3,
     "minEmitBox": vector3,
     "maxEmitBox": vector3,
     "color1": color3,
     "color2": color3,
     "colorDead": color3,
     "deadAlpha": float,
     "emitRate": float,
     "updateSpeed": float,
     "targetStopFrame": int,
     "minEmitPower": int,
     "maxEmitPower": float,
     "minLifeTime": float,
     "maxLifeTime": float,
     "minSize": float,
     "maxSize": float,
     "minAngularSpeed": float,
     "maxAngularSpeed": float,
     "textureName": string,
     "blendMode": int,
     "capacity": int,
     "textureMask": color4,
     "linkToEmitter": bool,
    "animations": Animations数组 (见下面，可以省略),
    "autoAnimate": boolean,
    "autoAnimateFrom": int,
    "autoAnimateTo": int,
    "autoAnimateLoop": boolean (可以省略),
    "autoAnimateSpeed": number (可以忽略)
}
```

## 镜头光晕系统
镜头光晕系统通过如下的JSON格式定义:
```javascript
{
     "emitterId": string,
     "borderLimit": int,
     "flares": array of LensFlares (见下面)
}
```

## 镜头光晕
镜头光晕通过如下的JSON格式定义:
```javascript
{
     "position": float,
     "size": float,
     "color": color3,
     "textureName": string
}
```

## 音效
音效通过如下的JSON格式定义:
```javascript
{
     "name": string, (要加载的文件名)
     "volume": float, (如果忽略则为1)
     "autoplay": bool, (可忽略)
     "loop": bool, (可忽略)
     "soundTrackId": int, (可忽略)
     "spatialSound": bool, (启用3维音效，可忽略)
     "position": vector3, (如果忽略则为0,0,0)
     "refDistance": float, (可忽略, 默认为1)
     "rolloffFactor": float, (可忽略, 默认为1)
     "maxDistance": float, (可忽略, 默认为100)
     "distanceModel": string, (可忽略, 默认为线性的，其它值: 倒数或指数)
     "panningModel": string, (可忽略, 默认为HRTF, 其它值: 等幂)
     "isDirectional": bool, (启用方向椎体)
     "coneInnerAngle": float, (可忽略,用来设置有向音效)
     "coneOuterAngle": float, (可忽略,用来设置有向音效)
     "coneOuterGain": float, (可忽略,用来设置有向音效)
     "connectedMeshId": string, (网格附着对象的ID)
     "localDirectionToMesh": vector3 (可忽略,默认1,0,0)
}
```

## 动作
动作通过如下的JSON格式定义. 动作可以包含多个子的动作.
```javascript
{
    "type": number, (动作类型. 0 = 触发式, 1 = 动作, 2 = 流控制)
    "name": string, (触发式或流程的动作名)
    "detached": boolean, (节点是否挂载上. 如果detached === true意味着不会被计算)
    "properties": array of properties, (见下面)
    "children": array of Actions,
    "combine": array of Actions (用于组合动画. 例如 name = "CombineAction". 可以为null)
}
```

属性通过如下JSON格式定义. 属性值总是字符串
```javascript
{
    "name": string, (属性名)
    "value": string, (属性值. 例如: name = "target" 和 value = "Plane001")
    "targetType": string (BabylonJS动作创建器内部使用的, 指明在哪找到"propertyPath"属性的)
}
```

## 例子
这儿是个简单的.babylon文件的例子:
```javascript
{
    "autoClear": true,
    "clearColor": [0, 0, 0],
    "ambientColor": [0, 0, 0],
    "gravity": [0, -9.81, 0],
    "cameras": [{
        "name": "Camera",
        "id": "Camera",
        "position": [7.4811, 5.3437, -6.5076],
        "target": [-0.3174, 0.8953, 0.3125],
        "fov": 0.8576,
        "minZ": 0.1,
        "maxZ": 100,
        "speed": 1,
        "inertia": 0.9,
        "checkCollisions": false,
        "applyGravity": false,
        "ellipsoid": [0.2, 0.9, 0.2]
    }],
    "activeCamera": "Camera",
    "lights": [{
        "name": "Sun",
        "id": "Sun",
        "type": 1,
        "position": [0.926, 7.3608, 14.1829],
        "direction": [-0.347, -0.4916, -0.7987],
        "intensity": 1,
        "diffuse": [1, 1, 1],
        "specular": [1, 1, 1]
    }],
    "materials": [{
        "name": "Material",
        "id": "Material",
        "ambient": [0.8, 0.8, 0.8],
        "diffuse": [0.64, 0.64, 0.64],
        "specular": [0.5, 0.5, 0.5],
        "specularPower": 50,
        "emissive": [0, 0, 0],
        "alpha": 1,
        "backFaceCulling": true,
        "diffuseTexture": {
            "name": "Metal1.png",
            "level": 1,
            "hasAlpha": 1,
            "coordinatesMode": 0,
            "uOffset": 0,
            "vOffset": 0,
            "uScale": 1,
            "vScale": 1,
            "uAng": 0,
            "vAng": 0,
            "wAng": 0,
            "wrapU": true,
            "wrapV": true,
            "coordinatesIndex": 0
        }
    },
    {
        "name": "Material.001",
        "id": "Material.001",
        "ambient": [0.8, 0.8, 0.8],
        "diffuse": [0.64, 0.64, 0.64],
        "specular": [0.5, 0.5, 0.5],
        "specularPower": 50,
        "emissive": [0, 0, 0],
        "alpha": 1,
        "backFaceCulling": true,
        "diffuseTexture": {
            "name": "concrete5.png",
            "level": 1,
            "hasAlpha": 1,
            "coordinatesMode": 0,
            "uOffset": 0,
            "vOffset": 0,
            "uScale": 5,
            "vScale": 5,
            "uAng": 0,
            "vAng": 0,
            "wAng": 0,
            "wrapU": true,
            "wrapV": true,
            "coordinatesIndex": 0
        }
    }],
    "geometries": {
        "boxes": [{
            "id": "BoxPrimitive",
            "size": 2,
            "canBeRegenerated": true,
            "tags": "Box Primitive Cube CanBeRegenerated"
        }],
        "vertexData": [{
            "id": "CubeGeometry",
            "updatable": false,
            "positions": [ 1, -1, 1, 1, -1, -1, -1, -1, 1, 1, 1, 1, -1, 1, 1, 1, 1, -1, 1, 1, 1, 1, -1, -1, 1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, 1, 1, 1, 1, 1, -1, 1, -1, 1, 1, -1, -1, -1, -1, 1, -1, 1, 1, 1, 1, 1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, 1, -1, 1, -1, -1, 1, -1, 1, 1],
            "normals": [0.5773, -0.5773, 0.5773, 0.5773, -0.5773, -0.5773, -0.5773, -0.5773, 0.5773, 0.5773, 0.5773, 0.5773, -0.5773, 0.5773, 0.5773, 0.5773, 0.5773, -0.5773, 0.5773, 0.5773, 0.5773, 0.5773, -0.5773, -0.5773, 0.5773, -0.5773, -0.5773, 0.5773, 0.5773, -0.5773, -0.5773, -0.5773, -0.5773, -0.5773, -0.5773, -0.5773, -0.5773, 0.5773, -0.5773, -0.5773, -0.5773, 0.5773, 0.5773, 0.5773, 0.5773, 0.5773, -0.5773, 0.5773, -0.5773, 0.5773, 0.5773, -0.5773, -0.5773, -0.5773, -0.5773, 0.5773, -0.5773, 0.5773, 0.5773, 0.5773, 0.5773, 0.5773, -0.5773, 0.5773, -0.5773, -0.5773, 0.5773, 0.5773, -0.5773, -0.5773, 0.5773, -0.5773, -0.5773, 0.5773, 0.5773, -0.5773, -0.5773, 0.5773, 0.5773, -0.5773, 0.5773, -0.5773, -0.5773, 0.5773, -0.5773, 0.5773, 0.5773],
            "uvs": [0.5, 0.5, 0.5, 0, 0, 0.5, 0.5, 1, 0, 1, 0.5, 0.5, 0.5, 1, 0, 0.5, 0.5, 0.5, 0.5, 1, 0, 0.5, 0.5, 0.5, 0.5, 1, 1, 0.5, 0.5, 0.5, 0.5, 0, 0, 0.5, 0, 0, 0, 0.5, 0.5, 1, 0, 1, 0, 0.5, 0.5, 1, 0, 1, 1, 1, 1, 0.5, 0.5, 0, 0, 0, 0, 0.5],
            "indices": [0, 1, 2, 3, 4, 5, 0, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 1, 17, 2, 4, 18, 5, 19, 20, 21, 22, 23, 10, 12, 24, 25, 26, 27, 28]
        }]
    },
    "meshes": [{
        "name": "Plane",
        "id": "Plane",
        "materialId": "Material.001",
        "position": [0.0172, -2.9787, -0.5184],
        "rotation": [0, 0, 0],
        "scaling": [87.1479, 0.8635, 87.1479],
        "isVisible": true,
        "isEnabled": true,
        "checkCollisions": false,
        "billboardMode": 0,
        "receiveShadows": true,
        "positions": [-1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, 1],
        "normals": [0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0],
        "uvs": [0.0001, 0.0001, 0.9999, 0.0001, 0.0001, 0.9999, 0.9999, 0.9999],
        "indices": [0, 1, 2, 1, 3, 2],
        "subMeshes": [{
            "materialIndex": 0,
            "verticesStart": 0,
            "verticesCount": 4,
            "indexStart": 0,
            "indexCount": 6
        }]
    },
    {
        "name": "Cube",
        "id": "Cube",
        "materialId": "Material",
        "geometryId": "CubeGeometry",
        "position": [0, 0, 0],
        "rotation": [0, 0, 0],
        "scaling": [1, 1, 1],
        "isVisible": true,
        "isEnabled": true,
        "checkCollisions": false,
        "billboardMode": 0,
        "receiveShadows": false,
        "subMeshes": [{
            "materialIndex": 0,
            "verticesStart": 0,
            "verticesCount": 29,
            "indexStart": 0,
            "indexCount": 36
        }],
        "animations": [{
            "dataType": 1,
            "framePerSecond": 30,
            "loopBehavior": 1,
            "name": "position animation",
            "property": "position",
            "keys": [{
                "frame": 0,
                "values": [0,0,0.0291]
            },
            {
                "frame": 1,
                "values": [0,0,0.0291]
            },
            {
                "frame": 30,
                "values": [0,0,10]
            },
            {
                "frame": 60,
                "values": [0,0,9.975]
            },
            {
                "frame": 90,
                "values": [0,0,0]
            },
            {
                "frame": 250,
                "values": [0,0,0]
            }]
        },
        {
            "dataType": 1,
            "framePerSecond": 30,
            "loopBehavior": 1,
            "name": "rotation animation",
            "property": "rotation",
            "keys": [{
                "frame": 0,
                "values": [-0.016, 0, 0]
            },
            {
                "frame": 30,
                "values": [-0.016, 0, 0]
            },
            {
                "frame": 60,
                "values": [-6.2832, 0, 0]
            },
            {
                "frame": 250,
                "values": [-6.2832, 0, 0]
            }]
        }],
        "autoAnimate": true,
        "autoAnimateFrom": 0,
        "autoAnimateTo": 250,
        "autoAnimateLoop": true
    },
    {
        "name": "Cube2",
        "id": "Cube2",
        "materialId": "Material",
        "geometryId": "CubeGeometry",
        "position": [10, 0, 0],
        "rotation": [0, 0, 0],
        "scaling": [1, 1, 1],
        "isVisible": true,
        "isEnabled": true,
        "checkCollisions": false,
        "billboardMode": 0,
        "receiveShadows": false,
        "subMeshes": [{
            "materialIndex": 0,
            "verticesStart": 0,
            "verticesCount": 29,
            "indexStart": 0,
            "indexCount": 36
        }]
    },
    {
        "name": "Cube3",
        "id": "Cube3",
        "materialId": "Material",
        "geometryId": "BoxPrimitive",
        "position": [-10, 0, 0],
        "rotation": [0, 0, 0],
        "scaling": [1, 1, 1],
        "isVisible": true,
        "isEnabled": true,
        "checkCollisions": false,
        "billboardMode": 0,
        "receiveShadows": false,
        "subMeshes": [{
            "materialIndex": 0,
            "verticesStart": 0,
            "verticesCount": 29,
            "indexStart": 0,
            "indexCount": 36
        }]
    }],
    "multiMaterials": [],
    "shadowGenerators": [{
        "useVarianceShadowMap": true,
        "mapSize": 1024,
        "lightId": "Sun",
        "renderList": ["Cube", "Cube2", "Cube3"]
    }],
    "skeletons": [],
    "sounds": [{          
        "name": "violons11.wav",
        "volume": 1,
        "autoplay": true,
        "loop": true,
        "soundTrackId": 1
        "spatialSound": true,
        "position": [0, 0, 0]
        "refDistance": 1.0,
        "rolloffFactor": 1.0,
        "maxDistance": 100,
        "distanceModel": "linear",
        "panningModel": "equalpower",
        "isDirectional": false,
        "coneInnerAngle": 90,
        "coneOuterAngle": 180,
        "coneOuterGain": 0,
        "connectedMeshId": 0,
        "localDirectionToMesh": [1, 0, 0]
   }]
}
```
