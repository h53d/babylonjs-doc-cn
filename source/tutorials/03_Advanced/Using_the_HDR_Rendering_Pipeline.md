---
ID_PAGE: 25362
PG_TITLE: Using the HDR Rendering Pipeline
---
The HDR Rendering pipeline is a set of multiple post-processes. It tends to simulate the eye adaptation to the light and darkness and also simulate the most realistic glare.

The train demo (focus on the tunnel) : http://reath.free.fr/HDR/test.html

## Instancing the pipeline ##

```javascript
var hdr = new BABYLON.HDRRenderingPipeline("pipeline_name", scene, ratio, originalPostProcess, cameras);
```
The parameter ```originalPostProcess``` is the base color post-process for the pipeline. If ```null```, a ```BABYLON.PassPostProcess``` is created by default.

The parameter ```cameras``` is an array of cameras on which the pipeline will be attached to.

## Remove the pipeline ##

```javascript
hdr.dispose();
```
Will detach the pipeline from all cameras of the previously given scene.

## Working with parameters ##

### Gaussian Blur ###

The Gaussian Blur equation used:
![Elements](http://homepages.inf.ed.ac.uk/rbf/HIPR2/eqns/eqngaus1.gif)

```hdr.gaussCoeff``` controls the overall effect: ```hdr.gaussCoeff * theEffect```. Default 0.3
 
```hdr.gaussMean``` is used to ajust the ```x``` value:  ```x - hdr.gaussMean```. Default 1.0

```hdr.gaussStandDev``` controls the gaussian blur standard deviation (sigma). Default 0.8

```hdr.gaussMultiplier``` controls the blur intensity. Default 1.0

### Bright Pass ###

The bright pass is rendered before the gaussian blur pass. It is used to compute the minimum light needed to compute the HDR effect.

```hdr.brightThreshold``` default value is 0.8

### HDR ###

```hdr.exposure``` is used to ajust the colors. High exposures are used to see details in darkness and low exposures in bright areas. Default value is 1.0

```hdr.minimumLuminance``` is the minimum luminance that the post-process can output. Luminance is >= 0. Default value is 1.0.

```hdr.maximumLuminance``` is the maximum luminance that the post-process can output. Luminance is > ```hdr.minimumLuminance```. Default value is 1e20.

```hdr.luminanceIncreaserate``` controls the eye adaptation speed to the darkness. Default value is 0.5.

```hdr.luminanceDecreaseRate``` controls the eye adaptation speed to the light Default value is 0.5.

## Example of configuration to get focus on the effect ##

```javascript
var hdr = new BABYLON.HDRRenderingPipeline("hdr", scene, 1.0, [scene.activeCamera]);
hdr.brightThreshold = 0.7; // Minimum luminance needed to compute HDR
hdr.gaussCoeff = 0.5; // Gaussian coefficient = gaussCoeff * theEffectOutput;
hdr.gaussMean = 1; // The Gaussian blur mean
hdr.gaussStandDev = 5; // Standard Deviation of the gaussian blur.
hdr.exposure = 1.0;
hdr.minimumLuminance = 0.2;
hdr.maximumLuminance = 1e20;
hdr.luminanceDecreaseRate = 0.3; // Decrease rate: darkness to light
hdr.luminanceIncreaserate = 0.5; // Increase rate: light to darkness
hdr.gaussMultiplier = 4.0; // Increase the blur intensity
```

