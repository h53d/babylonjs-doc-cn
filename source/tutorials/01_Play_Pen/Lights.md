---
ID_PAGE: 22071
PG_TITLE: 06. Lights
---
Now that you have learned about the camera types and how to place them into your scene, we will continue our tutorial series with learning about Babylon.js lights.

![Elements](http://www.babylonjs.com/Screenshots/testlight.jpg)

_A pretty sphere with multiple lights_

## How can I do this ?

Lights are used to produce the diffuse and specular color received by each pixel. This color is then used by materials to determine the final color of every pixel. Babylon.js allows you to create and register as many lights as you choose, but know that a single StandardMaterial can only handle 4 simultaneous lights (the first four enabled lights of the scene's lights list).

During this tutorial, I will show you how to use every kind of light that is supported by Babylon.js.

## Activating/Deactivating Lights ##

Every light can be activated or deactivated by calling its *setEnabled(true/false)* method. You can also control the global intensity of any light by using the *intensity* property. It uses a floating point value (such as 1.5). An example near the end of this tutorial shows how to use both the *intensity* property and the *setEnabled()* method.

## Lights types##
Here we go... with our 4 cool Babylon.js light types:

- **The Point Light**

A point light is a light defined by an unique point in world space. The light is emitted in every direction from this point. A good example of a point light is the sun.

You can control the color of any light... with the *diffuse* and *specular* properties:

```javascript
var light0 = new BABYLON.PointLight("Omni0", new BABYLON.Vector3(1, 10, 1), scene);
light0.diffuse = new BABYLON.Color3(1, 0, 0);
light0.specular = new BABYLON.Color3(1, 1, 1);
```
![](http://blogs.msdn.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-01-44-73-metablogapi/8484.image_5F00_thumb_5F00_53D78E00.png)

_Red diffuse point light with white specular_

- **The Directional Light**

A directional light is defined by a direction (what a surprise!). The light is emitted from everywhere... toward a specific direction, and has an infinite range. By default, the directional light is created at origin (0,0,0) position. Like a point light, you can control the color of the light with the *diffuse* and *specular* properties:

```javascript
var light0 = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, -1, 0), scene);
light0.diffuse = new BABYLON.Color3(1, 0, 0);
light0.specular = new BABYLON.Color3(1, 1, 1);
```

![](http://blogs.msdn.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-01-44-73-metablogapi/1563.image_5F00_1ECD8F81.png)

_Red diffuse directional light with white specular_

- **The Spot Light**

A spot light is defined by a position (2nd arg), a direction (3rd arg), an angle (4th arg), and an exponent (5th arg). These values define a cone of light starting from the position, emitting toward the direction. 

The angle defines the size (field of illumination) of the spotlight's conical beam (in radians), and the exponent defines the speed of the decay of the light with distance (the light's 'reach distance'). Just like the other lights, you can control the color of the light with the *diffuse* and *specular* properties:

![](http://blogs.msdn.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-01-44-73-metablogapi/7723.image_5F00_thumb_5F00_11F5CA14.png)

_A simple drawing showing the shape of a spot light_

```javascript
var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 30, -10), new BABYLON.Vector3(0, -1, 0), 0.8, 2, scene);
light0.diffuse = new BABYLON.Color3(1, 0, 0);
light0.specular = new BABYLON.Color3(1, 1, 1);
```

![](http://blogs.msdn.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-01-44-73-metablogapi/1738.image_5F00_thumb_5F00_18AB6448.png)

_A red diffuse spot light with white specular, a 0.8 radians-wide cone, and an exponent of 2_

- **The Hemispheric Light**

A hemispheric light is an easy way to simulate realistic ambient environment light. A hemispheric light is defined by a direction to the sky (the 2nd arg in the constructor) and by 3 colors: one for the diffuse (the sky color - for pixels/faces facing upward), one for the ground (the color for pixels/faces facing downward), and one for the specular.

Above, I used the terms 'upward' and 'downward', but keep in mind that the direction to the sky (the 2nd arg in the constructor) can be set to any direction. The direction to the sky is often straight upward (0, 1, 0). We are simulating light from a cloudy sky, but even on cloudy days, the sun crosses the sky above the clouds. So, you could tilt this light slightly toward the east for cloudy morning skies, and slightly toward the west for cloudy evening skies. This is a soft light that cannot produce shadows.

Now, back to creating the useful and interesting hemispheric light:

```javascript
var light0 = new BABYLON.HemisphericLight("Hemi0", new BABYLON.Vector3(0, 1, 0), scene);
light0.diffuse = new BABYLON.Color3(1, 1, 1);
light0.specular = new BABYLON.Color3(1, 1, 1);
light0.groundColor = new BABYLON.Color3(0, 0, 0);
```

![](http://blogs.msdn.com/cfs-file.ashx/__key/communityserver-blogs-components-weblogfiles/00-00-01-44-73-metablogapi/4760.image_5F00_thumb_5F00_058CC84D.png)

_White/black hemispheric light - upward pixels white (diffuse), downward pixels black (groundColor)_

Our [web site](http://www.babylonjs.com/) has a nice lights demo in the Features Tests section, and a similar lights demo can be found at our 'playground', [right here](http://www.babylonjs.com/playground/?06).

## Extra Information About Babylon.js One-Line Constructors: ##
Here is an example of a one-line constructor:
```javascript
var light0 = new BABYLON.SpotLight("Spot0", new BABYLON.Vector3(0, 30, -10), new BABYLON.Vector3(0, -1, 0), 0.8, 2, scene);
```
That one-line is all it takes to create a spot light. We want Babylon.js scene item creation... to be as quick and simple as possible. We also want the scene item to be seen/operating with just one line of programming. The spot light is a rather powerful scene item, and it takes quite a few arguments (args) in the constructor... in order for it to appear and operate in one line of code. Each 'arg' of the one-line constructor is setting a 'necessary initial property' on the scene item. By doing that, we know that it will turn-on/operate with just that one line.

There are some properties which we set 'behind-the-scenes'. One such property is *intensity*. We 'default' that property to a float 1.0 value. We set that 'necessary initial property' for you. We also call the light's *setEnabled(true)* method.

I want you to know two important things. First, all properties on a spot light or on any Babylon.js scene item... can be set after the object has been constructed. Second, if you so choose, you can null-out (set to zero/empty) the args in the one-line constructor, and then set all of the necessary initial properties yourself... property by property. You have already seen the fast/simple way to construct the spot light scene item. Below is an example of the slower and less-simple way to construct a spot light.

```javascript
var light0 = new BABYLON.SpotLight("", new BABYLON.Vector3.Zero(), new BABYLON.Vector3.Zero(), 0, 0, scene);
light0.name = "My Slowly and Discretely Constructed Spot Light"
light0.position = new BABYLON.Vector3(0, 30, -10);
light0.direction = new BABYLON.Vector3(0, -1, 0);
light0.angle = 0.8;
light0.exponent = 2;
light0.intensity = 0.5;
light0.diffuse = new BABYLON.Color3(1, 1, 1);
light0.specular = new BABYLON.Color3(1, 1, 1);
light0.setEnabled(1);
```
Using this 'long method' of scene item constructing... is rarely necessary or wanted. But we thought you should know that you can do constructing in this way, if you so choose.

## Normals and Backfaces - Seeing the Light: ##
You may have heard words like '_normals_' and '_backfaces_' spoken or written, during your 3D travels. We will not be deeply examining those two terms in this tutorial, but I am going to try to explain how normals and backfaces... affect lights. 

The picture below will help you understand how lights interact with normals and backfaces. The picture shows two planes and two lights. One light is a spot light, the other is a point light. The arrows show the direction of the lighting normals, and these arrows are not visible in a standard scene. They are used in the picture to help illustrate the concept of normals, as are the diamond and cone shapes for the two lights. Let's look at the picture carefully.

![](http://urbanproductions.com/wingy/babylon/misc/normals03.jpg)
_A blue back-faced plane and a blue front-faced plane, with a spot light and point light_

As you can see, when a standard Babylon.js plane has its backface lit (the left plane), the lights have no affect, because its normals are not facing toward the lights. Conversely, when a standard plane has its frontface lit (the right plane), both lights work perfectly to light the plane, because its normals are facing toward the lights. 

It is also interesting to note that neither plane blocks the lights. You can see that the arrows on the left plane, are lit by the lights. The plane is not blocking the light rays. The only way that any mesh can block light rays in Babylon.js, is with the use of a ShadowGenerator or two. 

As a last note, I want you to know that the left plane's material.backFaceCulling = false. Whether it is set to true or false, there will be no change in how lights affect backfaces. The lights are primarily concerned about the direction of the lighting normals (the arrows). The standard Babylon.js plane (and ground) has its lighting normals aimed toward the frontface.

**NEW**: In recent versions of Babylon.js, a new property was introduced... called _.range_:

```javascript
light.range = 300;
```
More information about the _.range_ property... coming soon. Stay tuned.

## Next Step ##
With the use of these powerful lights, your scene is likely really starting to 'shine'. And don't forget that you can animate light positions, directions, colors, and therefore create wonderful 'light shows'. We'll talk about that soon, or have fun discovering how to do it on your own. Maybe you could do light property settings inside the scene's render loop function. Its fun and beautiful!

Although not truly a light, you might be interested in our [Volumetric Light Scattering](http://doc.babylonjs.com/tutorials/Using_the_Volumetric_LightScattering_post-process) (GodRays) system.

Guess what! The next tutorial... is about animation! [Click this and let's go!](http://doc.babylonjs.com/tutorials/Animations)
