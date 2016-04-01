---
ID_PAGE: 22441
PG_TITLE: How to use PostProcessRenderPipeline
---
Post Process Renders pipelines allow you to create a chain of post processes and attach it to a camera.
A render pipeline can be managed by enabling and disabling some effects and displaying a specific pass for debugging.


## Base Render Pipeline

![](https://raw.githubusercontent.com/michael-korbas/Babylon.js/Docs/Docs/RenderPipeline/Resources/Architecture.png)

Renders Pipelines are composed of serval classes.

| Class | Description |
|--------|--------|
|**`BABYLON.PostProcessRenderPipelineManager`**| Managing all pipelines, allow you to enable or disable an effect, displaying a pass of post process for debugging.|
|**`BABYLON.PostProcessRenderPipeline`**|Set of effects that can be ordered.|
|**`BABYLON.PostProcessRenderEffect`**|A render effect is a smart postprocess who can manage their own instances itself.|
|**`BABYLON.PostProcessRenderPass`**|A render pass is a render texture that you can use in differents render effects.|

## Reference

### BABYLON.PostProcessRenderPipelineManager

<center>`new BABYLON.PostProcessRenderPipelineManager(),`</center> 




| Method | Description |
|--------|--------|
|**`PostProcessRenderPipelineManager()`**|Create a new instance of PostProcessRenderPipelineManager.|
|**`addPipeline(renderPipeline)`**|Add a new pipeline to an instance of PostProcessRenderPipelineManager.|
|**`attachCamerasToRenderPipeline(renderPipelineName, cameras, unique)`**|Attach a render pipeline to a list(or unique) of cameras|
|**`detachCamerasFromRenderPipeline(renderPipelineName, cameras)`**|Detach a render pipeline from a list(or unique) of cameras|
|**`enableEffectInPipeline(renderPipelineName, renderEffectName, cameras)`**|Enable an effect in a pipeline for a list(or unique) of cameras|
|**`disableEffectInPipeline(renderPipelineName, renderEffectName, cameras)`**|Disable an effect in a pipeline for a list(or unique) of cameras|
|**`enableDisplayOnlyPass(renderPipelineName, passName, cameras)`**|Enable displaying of a specific pass used in a specific render pipeline, for a list(or unique) of cameras|
|**`disableDisplayOnlyPass(renderPipelineName, passName, cameras)`**|Disable displaying of a specific pass used in a specific render pipeline, for a list(or unique) of cameras|
|**`update`**|Update all pipelines.|


### BABYLON.PostProcessRenderPipeline

<center>`new BABYLON.PostProcessRenderPipeline(BABYLON.Engine engine, string name),`</center> 



| Method | Description |
|--------|--------|
|**`PostProcessRenderPipeline(engine, name)`**|Create a new instance of PostProcessRenderPipeline.|
|**`addEffect(renderEffect)`**|Add a new render effect to the pipeline.|


### BABYLON.PostProcessRenderEffect

`new BABYLON.PostProcessRenderEffect(BABYLON.Engine engine, string name, string postProcessType, number ratio, BABYLON.Texture.SAMPLING_MODE samplingMode, bool singleInstance);`



| Method | Description |
|--------|--------|
|**`PostProcessRenderEffect(engine, name, createPostProcessFunction, singleInstance)`**|Create a new instance of PostProcessRenderEffect. The createPostProcessFunction have to return a nes instance of the postprocess you want to use|
|**`addPass(renderPass)`**|Add a new pass to the effect.|
|**`addRenderEffectAsPass(renderEffect)`**|Add a render effect as a pass.|
|**`removePass(renderPass)`**|Delete a pass from the effect.|



| Attribut | Description |
|--------|--------|
|**`parameters`**|Callback used for passing extra parameters on a post process.|

### BABYLON.PostProcessRenderPass

`new BABYLON.PostProcessRenderPass(BABYLON.Scene scene, string name, object size, BABYLON.Mesh[] renderList, function(){} beforeRender, function(){} afterRender)`



| Method | Description |
|--------|--------|
|**`PostProcessRenderPass(scene, name, size, renderList, beforeRender, afterRender)`**|Create a new instance of PostProcessRenderPass.|
|**`setRenderList(meshes)`**|Update the renderList.|


## Let's play with Render Pipeline

### Simple Pipeline

```javascript
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);

var camera_01 = new BABYLON.ArcRotateCamera("Camera_01", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
var camera_02 = new BABYLON.ArcRotateCamera("Camera_02", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
var camera_03 = new BABYLON.ArcRotateCamera("Camera_03", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);
var camera_04 = new BABYLON.ArcRotateCamera("Camera_04", 1, 0.8, 10, new BABYLON.Vector3(0, 0, 0), scene);

camera_01.viewport = new BABYLON.Viewport(0.0, 0.0, 0.5, 0.5);
camera_02.viewport = new BABYLON.Viewport(0.5, 0.0, 0.5, 0.5);
camera_03.viewport = new BABYLON.Viewport(0.0, 0.5, 0.5, 0.5);
camera_04.viewport = new BABYLON.Viewport(0.5, 0.5, 0.5, 0.5);

scene.activeCameras.push(camera_01);
scene.activeCameras.push(camera_02);
scene.activeCameras.push(camera_03);
scene.activeCameras.push(camera_04);

var light0 = new BABYLON.PointLight("Omni_0", new BABYLON.Vector3(0, 0, 10), scene);
var light1 = new BABYLON.PointLight("Omni_1", new BABYLON.Vector3(0, 10, 0), scene);
var light2 = new BABYLON.PointLight("Omni_2", new BABYLON.Vector3(10, 0, 0), scene);

var box = BABYLON.Mesh.CreateBox("Box", 3.0, scene);

camera_01.attachControl(canvas);
camera_02.attachControl(canvas);
camera_03.attachControl(canvas);
camera_04.attachControl(canvas);

var standardPipeline = new BABYLON.PostProcessRenderPipeline(engine, "standardPipeline");

var blackAndWhiteEffect = new BABYLON.PostProcessRenderEffect(engine, "blackAndWhiteEffect",
    function() {return new BABYLON.BlackAndWhitePostProcess("bw", 1.0, null, null, engine, true)});

var horizontalBlur = new BABYLON.PostProcessRenderEffect(engine, "horizontalBlurEffect",
    function() { return new BABYLON.BlurPostProcess("hb", new BABYLON.Vector2(1.0, 0), 10, 1.0, null, null, engine, true) });

var verticalBlur = new BABYLON.PostProcessRenderEffect(engine, "verticalBlurEffect",
    function() { return new BABYLON.BlurPostProcess("vb", new BABYLON.Vector2(0, 1.0), 10, 1.0, null, null, engine, true) });

standardPipeline.addEffect(blackAndWhiteEffect);
standardPipeline.addEffect(horizontalBlur);
standardPipeline.addEffect(verticalBlur);

scene.postProcessRenderPipelineManager.addPipeline(standardPipeline);
scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("standardPipeline", camera_01);
scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("standardPipeline", camera_02);
scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("standardPipeline", camera_03);
scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("standardPipeline", camera_04);

scene.postProcessRenderPipelineManager.disableEffectInPipeline("standardPipeline", "blackAndWhiteEffect", camera_01);

scene.postProcessRenderPipelineManager.disableEffectInPipeline("standardPipeline", "blackAndWhiteEffect", camera_02);
scene.postProcessRenderPipelineManager.disableEffectInPipeline("standardPipeline", "horizontalBlurEffect", camera_02);
scene.postProcessRenderPipelineManager.disableEffectInPipeline("standardPipeline", "verticalBlurEffect", camera_02);

scene.postProcessRenderPipelineManager.disableEffectInPipeline("standardPipeline", "horizontalBlurEffect", camera_03);
scene.postProcessRenderPipelineManager.disableEffectInPipeline("standardPipeline", "verticalBlurEffect", camera_03);


//Render Loop
engine.runRenderLoop(function () {
    scene.render();
});
```

http://www.babylonjs.com/playground/#21EWA7