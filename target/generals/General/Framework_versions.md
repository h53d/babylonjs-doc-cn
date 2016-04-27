**Babylon.js** 随同不同的版本一起提供，你可以在[仓库](https://github.com/BabylonJS/Babylon.js/tree/master/dist)的 /dist 文件夹下找到不同版本:

## CDN(内容分发网络)

Babylon.js文件能够在CDN上找到:

* http://cdn.babylonjs.com/2-2/babylon.js 
* http://cdn.babylonjs.com/2-2/babylon.max.js 
* http://cdn.babylonjs.com/2-2/babylon.noworker.js 


## 非迷你版本: *babylon.max.js*

这个版本目的仅仅是供调试使用的. 它没有被压小因此你可以很容易的用它来调试
请不要将它用在生产环境，因为文件大小是需要考虑的重要因素 (超过1.5 MB).

## 迷你版: *babylon.js*

这个是完整的babylon.js版本. 当压缩后文件小于250KB. 这个版本是以生产环境为目标的.

## 无worker的版本: *babylon.noworker.js*

这个版本的babylon.js没有WebWorker(H5中的新技术)来解决冲突问题. 当压缩后文件小于200KB. 这个版本是以生产环境为目标的.

## 核心版本: *babylon.core.js* (在2.3中介绍引入)

核心版本是基于"no worker" 版本，而且此处保持文件的精小 (压缩后 < 150 KB ).

下面文件没有包含在核心版本里:

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
