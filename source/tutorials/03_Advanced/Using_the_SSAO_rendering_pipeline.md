---
ID_PAGE: 24837
PG_TITLE: Using the SSAO rendering pipeline
---
BABYLON.SSAORenderingPipeline is a rendering pipeline (chained post-processes) that will compute the ambient occlusion of a given scene from the screen space.
You can find an example in our playground [here](http://www.babylonjs-playground.com/?24)

The post-processes chain is defined by:

* Original scene color post-process: saves the original scene color
* SSAO post-process
* Horizontal blur post-process
* Vertical blur post-process
* Combine post-process: blends the Vertical blur post-process output with the original scene color

Using it is pretty straightforward:

```
var ssao = new BABYLON.SSAORenderingPipeline('ssaopipeline', scene, 0.75);
```

The third argument is the ratio used by SSAO, Horizontal blur and Vertical blur post-processes
You can also set an array of Camera as fourth argument, then the constructor will automatically attach the rendering pipeline to the given cameras like:

```
var ssao = new BABYLON.SSAORenderingPipeline('ssaopipeline', scene, 0.75, [camera1 etc.]);
```

If you want to attach manually the rendering pipeline, just use the scene rendering pipeline manager like:

```
var ssao = new BABYLON.SSAORenderingPipeline('ssaopipeline', scene, 0.75);
scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("ssaopipeline", cameras);
```

**Warning: To save your performances, you should compute the SSAO/blurH/blurV with a lower ratio than 1.0 **

If you want to detach and destroy the rendering pipeline, you can just call ```dispose()``` method
```
ssao.dispose();
```

You can see the SSAO post-process output by detaching the combine post-process like:

```
scene.postProcessRenderPipelineManager.disableEffectInPipeline("ssaopipeline", ssao.SSAOCombineRenderEffect, cameras);
```

**Note: SSAO uses the depth map renderer and activates it by default. You can disable the depth map renderer by passing "true" as argument in the dispose() method **

For more customization, you can specify the SSAO and Combine post-processes ratios like:

```
var ssao = new BABYLON.SSAORenderingPipeline('ssaopipeline', scene, { ssaoRatio: 0.5, combineRatio: 1.0 }, [camera1 etc.]);
```