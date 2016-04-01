This tutorial will guide you through the process of creating a procedural texture for the [procedural textures library](https://github.com/BabylonJS/Babylon.js/tree/master/proceduralTexturesLibrary)

## Setting up environment

First of all, you need to create a folder for your shader in the /proceduralTextures folder. Let's call it **cloudBis**.

Then you need to create your files:
* babylon.**cloudBis**ProceduralTexture.ts (just copy/paste from babylon.woodProceduralTexture.ts )
* **cloudBis**ProceduralTexture.fragment.fx (just copy/paste from woodProceduralTexture.fragment.fx )

Then update the config.json to add your files:

```
{
  "proceduralTextures": [
	{
      "file": "proceduralTextures/wood/babylon.woodProceduralTexture.ts",
      "shaderFiles": [
        "proceduralTextures/wood/woodProceduralTexture.fragment.fx"
      ],
      "output": "babylon.woodProceduralTexture.js"
    },
	{
      "file": "proceduralTextures/cloudBis/babylon.cloudBisProceduralTexture.ts",
      "shaderFiles": [
        "proceduralTextures/cloudBis/cloudBisProceduralTexture.fragment.fx"
      ],
      "output": "babylon.cloudBisProceduralTexture.js"
    }
  ],
  "build": {
    "distOutputDirectory": "dist/"
  }
}
```

To compile your files, just run `gulp()`.

## Update the shaders

Open the **cloudBisProceduralTexture.fragment.fx** file.
The shader is composed of 3 parts:

- The variables and uniforms definition

```
precision highp float;

varying vec2 vUV;

uniform vec4 skyColor;
uniform vec4 cloudColor;

```

- All the functions you need (here **rand**, **noise** and **fbm**)


```
float rand(vec2 n) {
	return fract(cos(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 n) {
	const vec2 d = vec2(0.0, 1.0);
	vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
	return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

float fbm(vec2 n) {
	float total = 0.0, amplitude = 1.0;
	for (int i = 0; i < 4; i++) {
		total += noise(n) * amplitude;
		n += n;
		amplitude *= 0.5;
	}
	return total;
}
```
- The **main** function which is the one called to get the pixel color

```
void main() {
	vec2 p = vUV * 12.0;
	vec4 c = mix(skyColor, cloudColor, fbm(p));
	gl_FragColor = c;
}
```

## Write the procedural texture

The procedural texture is a .ts file. It contains a class which has to inherit from the **ProceduralTexture** class.

To be sure that you have intelliSense and that the compilation phase works well you have to add a reference at the top of your **babylon.cloudBisProceduralTexture.ts** file :

```
/// <reference path="../../../dist/preview release/babylon.d.ts"/>
```

The main part of the magic for a procedural texture is happening in the shader file. The TypeScript file is mainly here to give its caller the ability to set values for uniforms and pass it to the shader itself.
By convention we create a function named **updateShaderUniforms()** which will be called from the construtor and in every setters for each property.

Here is an example for the CloudBisProceduralTexture.

As you can see the **setXXX** function is used to send a specific value to the shader.

The shader is called by its name in the constructor using the **super** function.

```
module BABYLON {
    export class CloudBisProceduralTexture extends ProceduralTexture {
        private _skyColor = new Color4(0.15, 0.68, 1.0, 1.0);
        private _cloudColor = new Color4(1, 1, 1, 1.0);
    
        constructor(name: string, size: number, scene: Scene, fallbackTexture?: Texture, generateMipMaps?: boolean) {
            super(name, size, "cloudProceduralTexture", scene, fallbackTexture, generateMipMaps);
            this.updateShaderUniforms();
            this.refreshRate = 0;
        }
    
        public updateShaderUniforms() {
            this.setColor4("skyColor", this._skyColor);
            this.setColor4("cloudColor", this._cloudColor);
        }
    
        public get skyColor(): Color4 {
            return this._skyColor;
        }
    
        public set skyColor(value: Color4) {
            this._skyColor = value;
            this.updateShaderUniforms();
        }
    
        public get cloudColor(): Color4 {
            return this._cloudColor;
        }
    
        public set cloudColor(value: Color4) {
            this._cloudColor = value;
            this.updateShaderUniforms();
        }
    }
}
```

## Update the test page

Open *test/index.html* and add this reference:

```
<script src="../dist/babylon.cloudBisProceduralTexture.js"></script>
```

Then add the procedural texture line 192:

```
var cloudBis = new BABYLON.CloudBisProceduralTexture("cloudPTBis", 256, scene);
```

Finally update the UI control:

```
	gui.add(options, 'texture', ['default', 'fire', 'wood', 'cloud', 'grass', 'road', 'brick', 'marble', 'starfield', 'cloudBis']).onFinishChange(function () {
					resetPTOptions();
					switch (options.texture) {
						case "fire":
							currentTexture = firePT;
							addPToptions(firePT, ['time', 'alphaThreshold', 'speed', ]);
							break;
						case "wood":
							currentTexture = woodPT;
							addPToptions(woodPT, ['ampScale', 'woodColor']);
							break;
						case "cloud":
							currentTexture = cloudPT;
							addPToptions(cloudPT, ['skyColor', 'cloudColor']);
							break;
						case "grass":
							currentTexture = grassPT;
							addPToptions(grassPT, ['groundColor']);
							break;
						case "road":
							currentTexture = roadPT;
							addPToptions(roadPT, ['roadColor']);
							break;
						case "brick":
							currentTexture = brickPT;
							addPToptions(brickPT, ['numberOfBricksHeight', 'numberOfBricksWidth', 'brickColor', 'jointColor']);
							break;
						case "marble":
							currentTexture = marblePT;
							addPToptions(marblePT, ['numberOfTilesHeight', 'numberOfTilesWidth', 'amplitude', 'jointColor']);
							break;
						case "starfield":
							currentTexture = starfieldPT;
							addPToptions(starfieldPT, ['saturation', 'distfading', 'darkmatter', 'alpha', 'time', 'beta', 'zoom', 'formuparam', 'stepsize', 'tile', 'brightness']);
							break;
						case "cloudBis":
							currentTexture = cloudBis;
							break;
						case "none":
						default:
							currentTexture = diffuseTexture;
							break;
					}

					std.diffuseTexture = currentTexture;
					window.enableTexture(options.texture);
				});
```

## (Optional) enable a graphical interface. 

If your procedural texture contains properties that allows the dev to customize it, you can enable an interface to change them live in the sample.

To do that, you only have to add a call to the **addPToptions** helper function in your **case**

Your code will look like this :

```
case "cloudBis":
currentTexture = cloudBis;
addPToptions(cloudBis, ['skyColor', 'cloudColor']);
break;
```

The first parameter is the texture object and the second one is an array containing the list of properties you want to make editable in the sample.

## Launch the test server

To test your result, just execute:

```
gulp webserver
```

