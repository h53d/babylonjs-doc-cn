---
ID_PAGE: 22661
PG_TITLE: File Format Map (.babylon)
---
**Babylon.js** uses a JSON file format for describing scenes.

You can find the complete loader code here:
https://github.com/BabylonJS/Babylon.js/blob/master/Babylon/Loading/Plugins/babylon.babylonFileLoader.js

## Basic types
.babylon files uses the following convention for basic types:

* **Vector3**: An array of 3 floats ([x, y, z]). Example: [1.1, 2.2, 3.3]
* **Vector4**: An array of 4 floats ([x, y, z, w]). Example: [1.1, 2.2, 3.3, 4.4]
* **Color3**: An array of 3 floats between 0 and 1 ([r, g, b]). Example: [0.2, 0.3, 0.5]
* **Matrix**: An array of 16 floats exposed with row first convention
* **Boolean**: true or false

## Global structure
The global structure of a .babylon file is the following:

```javascript
{
    "autoClear": boolean,
    "clearColor": color3,
    "ambientColor": color3,
    "gravity": vector3 (usually [0,-9,0]),
    "cameras": array of Cameras (see below),
    "activeCamera_": string,
    "lights": array of Lights (see below),
    "materials": array of Materials (see below),
    "geometries": {...} (see below),
    "meshes": array of Meshes (see below),
    "multiMaterials": array of MultiMaterials (see below),
    "shadowGenerators": array of ShadowGenerators (see below),
    "skeletons": array of Skeletons (see below),
    "particleSystems": array of ParticleSystems (see below),
    "lensFlareSystems": array of LensFlareSystems (see below),
    "actions": array of actions (see below),
    "sounds": array of Sounds (see below),
    "workerCollisions": boolean,
    "collisionsEnabled": boolean,
    "physicsEnabled": boolean,
    "physicsGravity": vector3 (defaults to [0,-9.81,0]),
    "physicsEngine": string ("oimo" or "cannon", defaults to the default engine (oimo),
    "animations": array of Animations (see below, can be omitted),
    "autoAnimate": boolean,
    "autoAnimateFrom": int,
    "autoAnimateTo": int,
    "autoAnimateLoop": boolean (can be omitted),
    "autoAnimateSpeed": number (can be omitted)
}
```
## Cameras
A camera is defined by the following JSON:
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
    "alpha": float, // only for ArcRotateCamera and AnaglyphArcRotateCamera
    "beta": float, // only for ArcRotateCamera and AnaglyphArcRotateCamera
    "radius": float, // only for ArcRotateCamera, FollowCamera and AnaglyphArcRotateCamera
    "eye_space": float, // only for AnaglyphFreeCamera and AnaglyphArcRotateCamera
    "heightOffset": float, // only for FollowCamera
    "rotationOffset": float, // only for FollowCamera
    "cameraRigMode": int (can be omitted),
    "fov": float (in radians),
    "minZ": float,
    "maxZ": float,
    "speed": float,
    "inertia": float (between 0 and 1),
    "checkCollisions": boolean,
    "applyGravity": boolean,
    "ellipsoid": vector3,
    "animations": array of Animations (see below, can be omitted),
    "autoAnimate": boolean,
    "autoAnimateFrom": int,
    "autoAnimateTo": int,
    "autoAnimateLoop": boolean (can be omitted),
    "autoAnimateSpeed": number (can be omitted),
    "inputmgr" : map of camera inputs (can be omitted, see below)
}
```
## Map of camera inputs
This is an object literal using the input type as a key, and the input settings as a child object. Each input type has its own properties.

## Lights
A light is defined by the following JSON:
```javascript
{
    "name": string,
    "id": string,
    "tags": string,
    "type": int (0 for point light, 1 for directional, 2 for spot and 3 for hemispheric),
    "position": vector3,
    "direction": vector3,
    "angle": float (for spot lights),
    "exponent": float (for spot lights),
    "groundColor": color3 (for hemispheric lights),
    "intensity": float,
    "range": float,
    "diffuse": color3,
    "specular": color3,
    "excludedMeshesIds": array of string,
    "includedOnlyMeshesIds": array of string,
    "animations": array of Animations (see below, can be omitted),
    "autoAnimate": boolean,
    "autoAnimateFrom": int,
    "autoAnimateTo": int,
    "autoAnimateLoop": boolean (can be omitted),
    "autoAnimateSpeed": number (can be omitted)
}
```

## Materials
A material is defined by the following JSON:
```javascript
{
    "name": string,
    "id": string,
    "tags": string,
    "disableDepthWrite": boolean (can be omitted),
    "ambient": color3,
    "diffuse": color3,
    "specular": color3,
    "specularPower": float,
    "emissive": color3,
    "alpha": float,
    "backFaceCulling": boolean,
    "wireframe": boolean,
    "diffuseTexture": Texture (see below),
    "ambientTexture": Texture (see below),
    "opacityTexture": Texture (see below),
    "reflectionTexture": Texture (see below),
    "refractionTexture": Texture (see below),
    "indexOfRefraction": float,
    "emissiveTexture": Texture (see below),
    "specularTexture": Texture (see below),
    "bumpTexture": Texture (see below),
    "lightmapTexture": Texture (see below),
    "useLightmapAsShadowmap": boolean, 
    "checkReadyOnlyOnce": boolean
    "useReflectionFresnelFromSpecular": boolean (can be omitted),
    "useEmissiveAsIllumination": boolean (can be omitted),
    "diffuseFresnelParameters": Fresnel parameters (see below),
    "opacityFresnelParameters": Fresnel parameters (see below),
    "reflectionFresnelParameters": Fresnel parameters (see below),
    "refractionFresnelParameters": Fresnel parameters (see below),
    "emissiveFresnelParameters": Fresnel parameters (see below)
}
```

## Fresnel parameters
Fresnel parameters are defined by the following JSON:
```javascript
{
    "isEnabled": boolean,
    "leftColor": color3,
    "rightColor": color3,
    "bias": float,
    "power": float
}
```

## Textures
A texture is defined by the following JSON:
```javascript
{
    "name": string (filename),
    "level": float (between 0 and 1),
    "hasAlpha": boolean,
    "getAlphaFromRGB": boolean,
    "coordinatesMode": int (0 = explicit, 1 spherical, 2 = planar, 3 = cubic, 4 = projection, 5 = skybox),
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
    "animations": array of Animations (see below, can be omitted),
    "base64String": string (can be omitted)
}
```

## MultiMaterials
A multiMaterial is defined by the following JSON:
```javascript
{
    "name": string,
    "id": string,
    "tags": string,
    "materials": array of string (which are the ids of sub-materials)
}
```

## Geometries
The structure of "geometries" is the following:
```javascript
{
    "boxes": array of Boxes (see below),
    "spheres": array of Spheres (see below),
    "cylinders": array of Cylinders (see below),
    "toruses": array of Toruses (see below),
    "grounds": array of Grounds (see below),
    "planes": array of Planes (see below),
    "torusKnots": array of TorusKnots (see below),
    "vertexData": array of VertexData (see below)
}
```

## Boxes
A box is defined by the following JSON:
```javascript
{
    "id": string,
    "size": float,
    "canBeRegenerated": bool,
    "tags": string
}
```

## Spheres
A sphere is defined by the following JSON:
```javascript
{
    "id": string,
    "segments": float,
    "diameter": float,
    "canBeRegenerated": bool,
    "tags": string
}
```

## Cylinders
A cylinder is defined by the following JSON:
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

## Toruses
A torus is defined by the following JSON:
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

## Grounds
A ground is defined by the following JSON:
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

## Planes
A plane is defined by the following JSON:
```javascript
{
    "id": string,
    "size": float,
    "canBeRegenerated": bool,
    "tags": string
}
```

## TorusKnots
A torusKnot is defined by the following JSON:
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

## VertexData
A vertexData is defined by the following JSON:
```javascript
{
    "id": string,
    "updatable": bool,
    "positions": array of floats (3 per vertex),
    "normals": array of floats (3 per vertex),
    "uvs": array of floats (2 per vertex),
    "uv2s": array of floats (2 per vertex) which is the 2nd texture coordinates (can be omitted),
    "uv3s": array of floats (2 per vertex) which is the 3nd texture coordinates (can be omitted),
    "uv4s": array of floats (2 per vertex) which is the 4nd texture coordinates (can be omitted),
    "uv5s": array of floats (2 per vertex) which is the 5nd texture coordinates (can be omitted),
    "uv6s": array of floats (2 per vertex) which is the 6nd texture coordinates (can be omitted),
    "colors": array of floats (3 per vertex) which is the per vertex color (can be omitted),
    "matricesIndices": array of ints (4 per vertex) which is the matrices indices for bones (can be omitted),
    "matricesWeights": array of floats (4 per vertex) which is the matrices weights for bones (can be omitted),
    "indices": array of ints (3 per face),
    "tags": string
}
```

## Instances
A instance is defined by the following JSON:
```javascript
{
    "name": string,
    "tags": string,
    "position": vector3,
    "rotation": vector3 (can be omitted),
    "rotationQuaternion": vector4 (can be omitted),
    "scaling": vector3
}
```

## Meshes
A mesh is defined by the following JSON:
```javascript
{
    "name": string,
    "id": string,
    "tags": string,
    "parentId": string,
    "materialId": string,
    "geometryId": string (can be omitted),
    "position": vector3,
    "rotation": vector3 (can be omitted),
    "rotationQuaternion": vector4 (can be omitted),
    "scaling": vector3,
    "pivotMatrix": matrix,
    "freezeWorldMatrix": boolean (can be omitted),
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
    "positions": array of floats (3 per vertex),
    "normals": array of floats (3 per vertex),
    "uvs": array of floats (2 per vertex),
    "uvs2": array of floats (2 per vertex) which is the 2nd texture coordinates (can be omitted),
    "uv3s": array of floats (2 per vertex) which is the 3nd texture coordinates (can be omitted),
    "uv4s": array of floats (2 per vertex) which is the 4nd texture coordinates (can be omitted),
    "uv5s": array of floats (2 per vertex) which is the 5nd texture coordinates (can be omitted),
    "uv6s": array of floats (2 per vertex) which is the 6nd texture coordinates (can be omitted),
    "colors": array of floats (4 per vertex) which is the per vertex color (can be omitted),
    "hasVertexAlpha": boolean to indicate if colors field contains useful alpha value (can be omitted),
    "matricesIndices": array of ints (4 per vertex) which is the matrices indices for bones (can be omitted),
    "matricesWeights": array of floats (4 per vertex) which is the matrices weights for bones (can be omitted),
    "indices": array of ints (3 per face),
    "subMeshes": array of SubMeshes (see below),
    "animations": array of Animations (see below, can be omitted),
    "autoAnimate": boolean,
    "autoAnimateFrom": int,
    "autoAnimateTo": int,
    "autoAnimateLoop": boolean,
    "autoAnimateSpeed": number (can be omitted)
    "instances": array of Instances (see below, can be omitted),
    "actions": array of actions (see below)
}
```

Please note that a parent mesh must be described before their children nodes

## SubMeshes
A subMesh is defined by the following JSON:
```javascript
{
    "materialIndex": int,
    "verticesStart": int,
    "verticesCount": int,
    "indexStart": int,
    "indexCount": int
}
```

## Animations
An animation can be defined by the following JSON:
```javascript
{
    "dataType": int (0 = float, 1 = vector3, 2 = quaternion, 3 = matrix),
    "framePerSecond": int,
    "loopBehavior": int (0 = relative, 1 = cycle, 2 = constant),
    "name": string,
    "property": string,
    "keys": array of AnimationKeys (see below),
    "autoAnimate": boolean,
    "autoAnimateFrom": int,
    "autoAnimateTo": int,
    "autoAnimateLoop": boolean
}
```

## AnimationKeys
An animationKey is defined by the following JSON:
```javascript
{
    "frame": int,
    "values": array of float (depending of animated value)
}
```

## ShadowGenerators
A shadowGenerator is defined by the following JSON:
```javascript
{
    "useBlurVarianceShadowMap": boolean,
    "useVarianceShadowMap": boolean,
    "usePoissonSampling": boolean,
    "mapSize": int (between 64 and 2048, must be a power of 2),
    "bias": float,
    "forceBackFacesOnly": float,
    "lightId": string,
    "renderList": array of string (which are IDs of meshes)
}
```

## Skeletons
A skeleton is defined by the following JSON:
```javascript
{
    "name": string,
    "id": string,
    "bones": array of Bones (see below)
    "needInitialSkinMatrix": boolean
}
```

## Bones
A bone is defined by the following JSON:
```javascript
{
    "parentBoneIndex": int,
    "name": string,
    "matrix": matrix,
    "animations": array of Animations (must be of matrix type)
}
```

## ParticleSystems
A particle system is defined by the following JSON:
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
    "animations": array of Animations (see below, can be omitted),
    "autoAnimate": boolean,
    "autoAnimateFrom": int,
    "autoAnimateTo": int,
    "autoAnimateLoop": boolean (can be omitted),
    "autoAnimateSpeed": number (can be omitted)
}
```

## LensFlareSystems
A lens flare system is defined by the following JSON:
```javascript
{
     "emitterId": string,
     "borderLimit": int,
     "flares": array of LensFlares (see below)
}
```

## LensFlares
A lens flare is defined by the following JSON:
```javascript
{
     "position": float,
     "size": float,
     "color": color3,
     "textureName": string
}
```

## Sounds
A sound is defined by the following JSON:
```javascript
{
     "name": string, (name of the file to load)
     "volume": float, (if omitted will be 1)
     "autoplay": bool, (can be omitted)
     "loop": bool, (can be omitted)
     "soundTrackId": int, (can be omitted)
     "spatialSound": bool, (to enable 3D sound, can be omitted)
     "position": vector3, (if omitted will be 0,0,0)
     "refDistance": float, (can be omitted, default to 1)
     "rolloffFactor": float, (can be omitted, default to 1)
     "maxDistance": float, (can be omitted, default to 100)
     "distanceModel": string, (can be omitted, default to linear, other values: inverse or exponential)
     "panningModel": string, (can be omitted, default to HRTF, other value: equalpower)
     "isDirectional": bool, (to enable directional cone)
     "coneInnerAngle": float, (can be omitted but set it for directional sound)
     "coneOuterAngle": float, (can be omitted but set it for directional sound)
     "coneOuterGain": float, (can be omitted but set it for directional sound)
     "connectedMeshId": string, (ID of the mesh to attach to)
     "localDirectionToMesh": vector3 (can be omitted, default to 1,0,0)
}
```

## Actions
An action is defined by the following JSON. An action can contain children actions.
```javascript
{
    "type": number, (action's type. 0 = Trigger, 1 = Action, 2 = Flow Control)
    "name": string, (name of the action, trigger or flow control)
    "detached": boolean, (if the node is detached or not. Means it will not be computed if detached === true)
    "properties": array of properties, (see below)
    "children": array of Actions,
    "combine": array of Actions (used as a combine action. i.e name = "CombineAction". Can be null)
}
```

A property is defined by the following JSON. A property value is always a string
```javascript
{
    "name": string, (name of the property)
    "value": string, (value of the property. For example: name = "target" and value = "Plane001")
    "targetType": string (internal use for the BabylonJS Actions Builder, specifies where to find the properties for "propertyPath")
}
```

## Example
Here is a simple example of .babylon file:
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
