This tutorial will guide you through the process of creating a material for the [materials library](https://github.com/BabylonJS/Babylon.js/tree/master/materialsLibrary)

## Setting up environment

First of all, you need to create a folder for your shader in the /materials folder. Let's call it diffuseEmissive.
Then you need to create your files:
* babylon.diffuseEmissiveMaterial.ts (just copy/paste from babylon.simpleMaterial.ts)
* diffuseEmissive.vertex.fx (just copy/paste from simple.vertex.fx)
* diffuseEmissive.fragment.fx (just copy/paste from simple.fragment.fx)

Then update the config.json to add your files:

```
{
  "materials": [
    {
      "file": "materials/simple/babylon.simpleMaterial.ts",
      "shaderFiles": [
        "materials/simple/simple.vertex.fx",
        "materials/simple/simple.fragment.fx"
      ],
      "output": "babylon.simpleMaterial.js"
    },
	{
      "file": "materials/diffuseEmissive/babylon.diffuseEmissiveMaterial.ts",
      "shaderFiles": [
        "materials/diffuseEmissive/diffuseEmissive.vertex.fx",
        "materials/diffuseEmissive/diffuseEmissive.fragment.fx"
      ],
      "output": "babylon.diffuseEmissiveMaterial.js"
    }
  ],
  "build": {
    "distOutputDirectory": "dist/"
  }
}
```

To compile your files, just run `gulp()`.

## Update the shaders

Because we used the simple material as source, we already have everything required for a complete babylon.js material.
The simple material already supports diffuse texture.

To add support for an emissive texture, let's add this code to the header of diffuseEmissive.vertex.fx file:

```
#ifdef EMISSIVE 
varying vec2 vEmissiveUV; 
uniform mat4 emissiveMatrix; 
uniform vec2 vEmissiveInfos; 
#endif 
```

Then add this code in the main function:

```
#ifdef EMISSIVE
	if (vEmissiveInfos.x == 0.)
	{
		vEmissiveUV = vec2(emissiveMatrix * vec4(uv, 1.0, 0.0));
	}
	else
	{
		vEmissiveUV = vec2(emissiveMatrix * vec4(uv2, 1.0, 0.0));
	}
#endif
```

This code will generate the correct UV to read from emissive texture. Please note that we use #ifdef to take profit of the babylon.js smart shaders.

Then you have to update the fragment shader. First add this code to the header:

```
#ifdef EMISSIVE
varying vec2 vEmissiveUV;
uniform sampler2D emissiveSampler;
uniform vec2 vEmissiveInfos;
#endif
```

Then add this code at the end of the main function (just before the last line (gl_FragColor = ...):

```
#ifdef EMISSIVE
	color.rgb += texture2D(emissiveSampler, vEmissiveUV) * vEmissiveInfos.y;
#endif
```

## Update the material

First of all, rename all occurences of *SimpleMaterialDefines* to *DiffuseEmissiveMaterialDefines* and *SimpleMaterial* to *DiffuseEmissiveMaterial*.

Then add this property to *SimpleMaterialDefines* class:

```
public EMISSIVE = false;
```

Add this property to the *DiffuseEmissiveMaterial* class:

```
public emissiveTexture: BaseTexture;
```

Then go to *isReady* function and add this code in the `if (scene.textureEnabled)` block:

```
if (this.emissiveTexture && StandardMaterial.EmissiveTextureEnabled) {
	if (!this.emissiveTexture.isReady()) {
    	return false;
    } else {
    	needUVs = true;
        this._defines.EMISSIVE = true;
	}
} 
```		

The next function to update is *bind*. Add this code after the `//Textures` comment:

```
if (this.emissiveTexture && StandardMaterial.EmissiveTextureEnabled) {
	this._effect.setTexture("emissiveSampler", this.emissiveTexture);

    this._effect.setFloat2("vEmissiveInfos", this.emissiveTexture.coordinatesIndex, this.emissiveTexture.level);
    this._effect.setMatrix("emissiveMatrix", this.emissiveTexture.getTextureMatrix());
}
```

You may also need to add this code to the *clone* function:

```
if (this.emissiveTexture && this.emissiveTexture.clone) {
	newMaterial.emissiveTexture = this.emissiveTexture.clone();
}
```		

For completeness, you will also have to complete the *serialize* and *Parse* functions (This is only required if you want to save/load your material to a .babylon file).
Please note that *serialize* function needs to output the complete material name to the serializationObject like here:

```
serializationObject.customType = "BABYLON.SimplelMaterial";
```

And you're done for the material! Now it is time to test it.

## Update the test page

Open *test/index.html* and add this reference:

```
<script src="../dist/babylon.diffuseEmissiveMaterial.js"></script>
```

Then add the material at line 120:

```
var diffuseEmissive = new BABYLON.DiffuseEmissiveMaterial("diffuseEmissive", scene); 
diffuseEmissive.diffuseTexture = new BABYLON.Texture("textures/amiga.jpg", scene); 
diffuseEmissive.diffuseTexture.uScale = 5; 
diffuseEmissive.diffuseTexture.vScale = 5; 

diffuseEmissive.emissiveTexture = new BABYLON.Texture("textures/amiga.jpg", scene); 
diffuseEmissive.emissiveTexture.uScale = 10; 
diffuseEmissive.emissiveTexture.vScale = 10;
```

Finally update the UI control:

```
gui.add(options, 'material', ['standard', 'simple', 'diffuseEmissive']).onFinishChange(function () {
	switch (options.material) {
		case "diffuseEmissive":
			currentMaterial = diffuseEmissive;
			break;
		case "simple":
			currentMaterial = simple;
			break;
		default:
			currentMaterial = std;
			break;
		}

		currentMesh.material = currentMaterial;
	});
```

## Launch the test server

To test your result, just execute:

```
gulp webserver
```

