**Babylon.js** comes with different versions that you can find in the /dist folder of the [repository](https://github.com/BabylonJS/Babylon.js/tree/master/dist):

## CDN

Babylon.js files can be found on our CDN:

* http://cdn.babylonjs.com/2-2/babylon.js 
* http://cdn.babylonjs.com/2-2/babylon.max.js 
* http://cdn.babylonjs.com/2-2/babylon.noworker.js 


## Unminified version: *babylon.max.js*

This version is aimed to be used for debugging purpose only. It is not minified so you can easy use it to debug. 
Please do not use it in production environment as the file size is really important (more than 1.5 MB).

## Minified version: *babylon.js*

This is the complete version of babylon.js. File size is less than 250KB when gizipped. This version is aimed for production.

## No worker version: *babylon.noworker.js*

This version of babylon.js does not include web worker support for collision. File size is less than 200KB when gizipped. This version is aimed for production.

## Core version: *babylon.core.js* (introduced in 2.3)

The core version is based on the "no worker" version and it is here to keep the file to a minimal size (< 150 KB gzipped).

The following files are not included in the core version:

* babylon.shaderMaterial.js
* babylon.tools.dds.js
* babylon.cannonJSPlugin.js
* babylon.oimoJSPlugin.js
* babylon.displayPassPostProcess.js
* babylon.meshSimplification.js
* babylon.sceneSerializer.js
* babylon.csg.js
* babylon.vrDistortionCorrectionPostProcess.js
* babylon.virtualJoystick.js
* babylon.virtualJoysticksCamera.js
* babylon.anaglyphPostProcess.js
* babylon.outlineRenderer.js
* babylon.assetsManager.js
* babylon.vrDeviceOrientationCamera.js
* babylon.webVRCamera.js
* babylon.sceneOptimizer.js
* babylon.meshLODLevel.js
* babylon.rawTexture.js
* babylon.polygonMesh.js
* babylon.octree.js
* babylon.octreeBlock.js
* babylon.blurPostProcess.js
* babylon.refractionPostProcess.js
* babylon.blackAndWhitePostProcess.js
* babylon.convolutionPostProcess.js
* babylon.filterPostProcess.js
* babylon.fxaaPostProcess.js
* babylon.stereoscopicInterlacePostProcess.js
* babylon.lensFlare.js
* babylon.lensFlareSystem.js
* babylon.deviceOrientationCamera.js
* babylon.gamepads.js
* babylon.gamepadCamera.js
* babylon.analyser.js,
* babylon.audioEngine.js
* babylon.sound.js
* babylon.soundtrack.js
* babylon.depthRenderer.js
* babylon.ssaoRenderingPipeline.js
* babylon.volumetricLightScatteringPostProcess.js
* babylon.lensRenderingPipeline.js
* babylon.colorCorrectionPostProcess.js
* babylon.stereoscopicCameras.js
* babylon.hdrRenderingPipeline.js
* babylon.edgesRenderer.js
* babylon.tonemapPostProcess.js
* babylon.pbrMaterial.js
* babylon.reflectionProbe.js
* babylon.solidParticle.js
* babylon.solidParticleSystem.js
