---
ID_PAGE: 25094
PG_TITLE: 18. Using Parallax Mapping
---
Starting with Babylon.js v2.4, we introduced Parallax Mapping.

You can see a demo of this technique [right here](http://babylonjs-playground.com/#10I31V#8)

![Screenshot](http://i.imgur.com/8VBDRPe.png)

## What is Parallax Mapping
Parallax Mapping is an algorithm which, based from a height map, apply an offset on the material's textures in order to accentuate the effect of relief in the geometry's surface.

While this technique is independent from Normal Mapping (a.k.a Bump) it's often used in conjunction with it. The simple reason is that the height map needed to perform Parallax Mapping is most of the time encoded in the Alpha channel of the Normal Map texture.

There are many technique that are based on the Parallax Mapping principle, Babylon.js supports two of them.

### Parallax Mapping
The core algorithm which perform an offset computation for the texture UV coordinates, based on a height map. This algorithm is really quick to perform, you can almost think of it as being free if you already are using Bump.

### Parallax Occlusion Mapping (POM)
While traditional Parallax mapping compute the offset based on one sample of the height map, the Occlusion version will make a loop to sample the height map many times in order to reach a more precise location of what the pixel to compute should reflect.

The outcome is way more realistic than traditional Parallax but you can expect a performance hit that worthes consideration.

You can learn more about all the different techniques [here](http://sunandblackcat.com/tipFullView.php?topicid=28).

## Parallax Mapping with babylon.js
You can use Parallax Mapping through the following materials:

 - [StandardMaterial](http://doc.babylonjs.com/classes/2.3/StandardMaterial)
 - PBRMaterial

In Babylon.js we think Parallax Mapping as an extension of Normal Mapping, hence to benefit of the former, you have to enable the later. The reason is that we support only the height map being encoded in the Alpha channel of the normal map, as explained above.

You have three property to work with Parallax:

- **useParallax**: enables Parallax Mapping over Bump. These property won't have any effect if you didn't assigned a **bumpTexture**.
 - **useParallaxOcclusion**: enables Parallax Occlusion, when setting this property you must also set **useParallax** to true.
 - **parallaxScaleBias**: apply a scaling factor that determine which "depth" the height map should reprensent. A value between 0.05 and 0.1 is reasonnable in Parallax, you can reach 0.2 using Parallax Occlusion.
## Creating Height map

You will find an interesting [tutrial here](https://www.youtube.com/watch?v=Sd5Avnf_JuU) that explains how to create the height map.

If you happen to have normal map and height map in separated files, you can use this [Windows Tool](https://github.com/BabylonJS/Extensions/tree/master/NormalHeightMapTool) to merge them into a single file.



