---
ID_PAGE: 22431
PG_TITLE: How to use PostProcesses
---
Postprocesses allow you to create 2D effects on top of your scene.
A postprocess is linked to a camera and can be part of a chain of postprocesses where each postprocess uses the result of the previous one as input for its own processing.

# Base postprocess
Every postprocess is based upon ```BABYLON.PostProcess``` which uses this constructor:

```javascript
BABYLON.PostProcess = function (name, fragmentUrl, parameters, samplers, ratio, camera, samplingMode, engine, reusable)
```

We will get back to _fragmentUrl_, _parameters_ and _samplers_ parameters.

The _ratio_ is used to define the size of the postprocess (0.5 means that your postprocess will have a width = canvas.width * 0.5 and a height = canvas.height * 0.5).

The _camera_ parameter is self-explanatory.

The _samplingMode_ can be one of the following:
* BABYLON.Texture.NEAREST_SAMPLINGMODE
* BABYLON.Texture.BILINEAR_SAMPLINGMODE (**default**)
* BABYLON.Texture.TRILINEAR_SAMPLINGMODE

The _engine_ parameter is the engine where you want to attach your postprocess.

The _reusable_ paameter indicates if your postprocess can be reused multiple times on the same camera (default is false).

# Attach postprocess
Depending on how you have defined a postprocess, it can be attached one or more times to the same camera. 
The same instance can also be attached to multiple cameras.

A camera has two methods:
#### **attachPostProcess**

```javascript
NUMBER function(PostProcess postProcess [,NUMBER atIndice])
```

#### **detachPostProcess**

```javascript
NUMBER function(PostProcess postProcess [,NUMBER[] atIndices])
```

# Builtin postprocesses
Babylon.js comes with a set of ready to use postprocesses.
* Pass: Do nothing. Used to copy the framebuffer into a postprocess for further use

```javascript
var postProcess = new BABYLON.PassPostProcess("Scene copy", 1.0, null, null, engine, true);
```

* Black and white: apply a black and white effect:

```javascript
var postProcess = new BABYLON.BlackAndWhitePostProcess("bandw", 1.0, null, null, engine, true);
```

* Blur: apply a directional blur:

```javascript
var postProcess = new BABYLON.BlurPostProcess("Horizontal blur", new BABYLON.Vector2(1.0, 0), blurWidth, 0.25, null, null, engine, true);
```

* Convolution: apply a kernel matrix to every pixel:

```javascript
var sepiaKernelMatrix = BABYLON.Matrix.FromValues(
                    0.393, 0.349, 0.272, 0,
                    0.769, 0.686, 0.534, 0,
                    0.189, 0.168, 0.131, 0,
                    0, 0, 0, 0
                );
var postProcess = new BABYLON.ConvolutionPostProcess("Sepia", sepiaKernelMatrix, 1.0, null, null, engine, true);
```

* FXAA: apply a full screen antialiasing filter:

```javascript
var postProcess = new BABYLON.FxaaPostProcess("fxaa", 1.0, null, null, engine, true);
```

* Refraction: apply a refraction texture:

```javascript
var postProcess = new BABYLON.RefractionPostProcess("Refraction", "refMap.jpg", new BABYLON.Color3(1.0, 1.0, 1.0), 0.5, 0.5, 1.0, null, null, engine, true);
```
The constructor of this postprocess is the following:

```javascript
BABYLON.RefractionPostProcess = function (name, refractionTextureUrl, color, depth, colorLevel, ratio, null, samplingMode, engine, reusable)
```
_refractionTextureUrl_ is the URL of the refraction map. The luminance of every pixel is used to define the refraction level (white = min, black = max)
_color_ is the base color of the refraction (used to taint the rendering)
_depth_ is the simulated refraction depth
_colorLevel_ is the coefficient of the base color (0 to remove base color tainting)

* Color Correction: apply a color filter:

```javascript
var postProcess = new BABYLON.ColorCorrectionPostProcess("color_correction", "./table.png", 1.0, null, null, engine, true);
```
The second parameter of the constructor is the URL of the color look-up table (also known as _LUT_) that contains the filter to apply. This must be a texture 16 pixels high and 256 pixels wide containing a modified set of RGB colors (x=red value, y=green value, z=blue value). The post-processing will then map the RGB values of the rendered pixels to the new values contained in the look-up table.

Here is what the default (without filter) look-up table looks like:

![LUT](http://udn.epicgames.com/Three/rsrc/Three/ColorGrading/RGBTable16x1.png)

Examples of filtered LUT to use for various filters:

![LUT](http://i.imgur.com/gC9vQCz.png)
 Inverted colors

![LUT](http://i.imgur.com/rupMyVN.png)
 High contrast

![LUT](http://i.imgur.com/IX93hGO.png)
 Posterize

You can easily create new filters by using a image editing software to alter the look-up table to fit your needs. Copy/paste the default look-up table on a screenshot or picture before altering it to see in real time what the filtered image will look like.

# Custom postprocesses
You can also develop your own postprocess using ```BABYLON.PostProcess``` object.

To do so, you need to create a .fragment.fx file, a shader-storing DOM node, or a ShaderStore entry where you will store the GLSL shader code used for every pixel of the screen:

```javascript
GLSL
#ifdef GL_ES
precision highp float;
#endif

// Samplers
varying vec2 vUV;
uniform sampler2D textureSampler;

// Parameters
uniform vec2 screenSize;
uniform float highlightThreshold;

float highlights(vec3 color)
{
 return smoothstep(highlightThreshold, 1.0, dot(color, vec3(0.3, 0.59, 0.11)));
}

void main(void) 
{
 vec2 texelSize = vec2(1.0 / screenSize.x, 1.0 / screenSize.y);
 vec4 baseColor = texture2D(textureSampler, vUV + vec2(-1.0, -1.0) * texelSize) * 0.25;
 baseColor += texture2D(textureSampler, vUV + vec2(1.0, -1.0) * texelSize) * 0.25;
 baseColor += texture2D(textureSampler, vUV + vec2(1.0, 1.0) * texelSize) * 0.25;
 baseColor += texture2D(textureSampler, vUV + vec2(-1.0, 1.0) * texelSize) * 0.25;
 
 baseColor.a = highlights(baseColor.rgb);

 gl_FragColor = baseColor;
}
```

Your shader must define the following values:
* Precision must be set to highp
* A varying vUV must be used to read texture coordinates
* The first sampler must be named textureSampler

Once you created your sampler, you can create a postprocess:

```javascript
var postProcess = new BABYLON.PostProcess("Down sample", "./Scenes/Customs/postprocesses/downsample", ["screenSize", "highlightThreshold"], null, 0.25, null, BABYLON.Texture.BILINEAR_SAMPLINGMODE, engine, true);
```

You have to specify:
* A name
* The URL of the shader coder*
* A list of your uniforms parameters
* A list of additional samplers
* The ratio
* The parent camera (deprecated)
* The sampling mode
* The engine
* Can be reusable

(*Please see the link at the bottom of this document to learn more ways to store shader code.)

You can set up things before the postprocess is applied by specifying a onApply function:

```javascript
postProcess.onApply = function (effect) {
    effect.setFloat2("screenSize", postProcess1.width, postProcess1.height);
    effect.setFloat("highlightThreshold", 0.90);
};
```

Please note that you can also use the output of a previous postprocess as the source for your own sampler:

```javascript
effect.setTextureFromPostProcess("sceneSampler", postProcess0);
```

# Chaining postprocesses
You can chain postprocesses on a specific camera. They are processed using the creation order. For instance here is the code used to simulate a bloom effect:

```javascript
var blurWidth = 1.0;

var postProcess0 = new BABYLON.PassPostProcess("Scene copy", 1.0, camera);
var postProcess1 = new BABYLON.PostProcess("Down sample", "./Scenes/Customs/postprocesses/downsample", ["screenSize", "highlightThreshold"], null, 0.25, camera, BABYLON.Texture.BILINEAR_SAMPLINGMODE);
postProcess1.onApply = function (effect) {
    effect.setFloat2("screenSize", postProcess1.width, postProcess1.height);
    effect.setFloat("highlightThreshold", 0.90);
};
var postProcess2 = new BABYLON.BlurPostProcess("Horizontal blur", new BABYLON.Vector2(1.0, 0), blurWidth, 0.25, camera);
var postProcess3 = new BABYLON.BlurPostProcess("Vertical blur", new BABYLON.Vector2(0, 1.0), blurWidth, 0.25, camera);
var postProcess4 = new BABYLON.PostProcess("Final compose", "./Scenes/Customs/postprocesses/compose", ["sceneIntensity", "glowIntensity", "highlightIntensity"], ["sceneSampler"], 1, camera);
postProcess4.onApply = function (effect) {
    effect.setTextureFromPostProcess("sceneSampler", postProcess0);
    effect.setFloat("sceneIntensity", 0.5);
    effect.setFloat("glowIntensity", 0.4);
    effect.setFloat("highlightIntensity", 1.0);
};
```
You might want to read more about shaders and try our CYOS shader editor [**RIGHT HERE**](http://blogs.msdn.com/b/eternalcoding/archive/2014/04/17/learning-shaders-create-your-own-shaders-with-babylon-js.aspx).

