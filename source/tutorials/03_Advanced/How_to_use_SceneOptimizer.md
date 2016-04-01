---
ID_PAGE: 22581
PG_TITLE: How to use SceneOptimizer
---
Rendering a scene on a browser is a great experience because you can reach a lot of different users and hardware. But the main associated caveat is that you can encounter very low end devices.

The SceneOptimizer tool is designed to help you reach a specific framerate by gracefully degrading rendering quality at runtime.

# Basic usage
The main function you have to know is ```BABYLON.SceneOptimizer.OptimizeAsync()```. You can call this function when you want to optimize your scene. The simplest call you can do is the following:

```javascript
BABYLON.SceneOptimizer.OptimizeAsync(scene),
```

You have to provide at least a scene. That previous code line is actually equivalent to this:

```javascript
BABYLON.SceneOptimizer.OptimizeAsync(scene, BABYLON.SceneOptimizerOptions.ModerateDegradationAllowed(),
function() {
   // On success
}, function() {
   // FPS target not reached
}),
```

As you can see, you can provide success/fail callbacks and a set of options.
A set of options contains a list of optimization to apply in a specific order. As soon as the target FPS is reached, the SceneOptimizer stops. There are different layers (or passes) that are applied one after another. The SceneOptimizer pauses between each layer to ensure a stable FPS, for measuring.

By default, there are 3 sets available:

```javascript
BABYLON.SceneOptimizerOptions.LowDegradationAllowed()
BABYLON.SceneOptimizerOptions.ModerateDegradationAllowed()
BABYLON.SceneOptimizerOptions.HighDegradationAllowed()
```

All these sets return a ```BABYLON.SceneOptimizerOptions``` object configured with progressive degradations.

Here are the properties available on a ```BABYLON.SceneOptimizerOptions``` object:

* targetFrameRate: a number defining the FPS you want to achieve (60 by default)
* optimizations: an array of ```BABYLON.SceneOptimization``` objects.
* trackerDuration: time in milliseconds between passes (2000 by default)

SceneOptimizer comes with some out-of-the-box optimizations:

* ```BABYLON.TextureOptimization(priority, maximumSize)```: This optimization tries to reduce the size of render textures.
* ```BABYLON.HardwareScalingOptimization(priority, maximumScale)```: This optimization increments the value of hardware scaling. This is a really aggressive optimization.
* ```BABYLON.ShadowsOptimization(priority)```: This optimization disables shadows.
* ```BABYLON.PostProcessesOptimization(priority)```: This optimization disables post-processes.
* ```BABYLON.LensFlaresOptimization(priority)```: This optimization disables lens flares.
* ```BABYLON.ParticlesOptimization(priority)```: This optimization disables particles.
* ```BABYLON.RenderTargetsOptimization(priority)```: This optimization disables render targets.

Based on these optimizations, the basic sets are configured like this:

* BABYLON.SceneOptimizerOptions.LowDegradationAllowed():
 * Level 0: ShadowsOptimization and LensFlaresOptimization
 * Level 1: PostProcessesOptimization and ParticlesOptimization
 * Level 2: TextureOptimization(2, 1024)
* BABYLON.SceneOptimizerOptions.ModerateDegradationAllowed():
 * Level 0: ShadowsOptimization and LensFlaresOptimization
 * Level 1: PostProcessesOptimization and ParticlesOptimization
 * Level 2: TextureOptimization(2, 512)
 * Level 3: RenderTargetsOptimization
 * Level 4: HardwareScalingOptimization(4, 2)
* BABYLON.SceneOptimizerOptions.HighDegradationAllowed():
 * Level 0: ShadowsOptimization and LensFlaresOptimization
 * Level 1: PostProcessesOptimization and ParticlesOptimization
 * Level 2: TextureOptimization(2, 256)
 * Level 3: RenderTargetsOptimization
 * Level 4: HardwareScalingOptimization(4, 4)

# Advanced usage
You can create your own set of options with the following code:

```javascript
var result = new BABYLON.SceneOptimizerOptions(60, 2000);

var priority = 0;
result.optimizations.push(new BABYLON.ShadowsOptimization(priority));
result.optimizations.push(new BABYLON.LensFlaresOptimization(priority));

// Next priority
priority++;
result.optimizations.push(new BABYLON.PostProcessesOptimization(priority));
result.optimizations.push(new BABYLON.ParticlesOptimization(priority));

// Next priority
priority++;
result.optimizations.push(new BABYLON.TextureOptimization(priority, 256));

// Next priority
priority++;
result.optimizations.push(new BABYLON.RenderTargetsOptimization(priority));

// Next priority
priority++;
result.optimizations.push(new BABYLON.HardwareScalingOptimization(priority, 4));

return result;
```

You can also create your own optimization by creating your own object:

```javascript
function mySceneOptimization(priority) {
  if (typeof priority === "undefined") {
     priority = 0;
  }

  this.priority = priority;
  this.apply = function (scene) {
     // Work on scene...
  };
}
```
