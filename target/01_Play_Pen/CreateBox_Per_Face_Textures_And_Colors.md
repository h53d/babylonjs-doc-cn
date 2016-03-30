##MeshBuilder CreateBox per face textures and colors

In this tutorial, we will learn how to use the _faceUV_ and _faceColors_ parameters of the `MeshBuilder.CreateBox()` method in order to set a different texture or color per box face.


###Textures


Imagine that we have an image file such as this : http://jerome.bousquie.fr/BJS/images/spriteAtlas.png  
We call it, in video games development,  a sprite atlas because we have 24 different spite images in a single file : 4 rows of 6 sprites, each having the same size. This is just an example, we could have had 32 rows of 32 images as well.    

Well, I'm about to talk about atlases here, but remember it's only an example to illustrate the per-texture feature. It's not mandatory to use an atlas, we can just use a regular texture file and choose what part of it to display on each (or only some) box face.  

Let's start...

We create a rectangular box by using the `options` parameters line 43 and 50 : http://www.babylonjs-playground.com/#1V3CAT#10  
Then we set the texture as a value on a material as usual : http://www.babylonjs-playground.com/#1V3CAT#11    
Nothing new until now, right ?  

Let's go on.

Please let's have a look from line 27 :  
Line 30, we define a new array called _faceUV_, sized 6 because our box has 6 faces. This array will always content Vector4 elements.  
Each _Vector4(x, y, z, w)_ will be defined in this way :  

x = Ubottom  
y = Vbottom  
z = Utop   
w = Vtop  
all are in the range [0, 1]

as _Ubottom_, _Vbottom_ are the 2D coordinates of the bottom left point of where the texture crop starts and _Utop_, _Vtop_ the top right ones of where the texture crop ends.  
Not clear ?  

Let's go back to our sprite atlas : we've got 4 rows of 6 sprites.  
So if we iterate i from 0 to 5 (so 6 times as 6 box faces) and if we assign  
```javascript
Ubottom = i / 6
Vbottom = 0
Utop = (i+1) / 6
Vtop = 1 / 4
```
to each array element, we actually set a different sprite from the first horizontal row to each box face in the _faceUV_ array.  
code :
```javascript
  var hSpriteNb =  6;  // 6 sprites per raw
  var vSpriteNb =  4;  // 4 sprite raws

  var faceUV = new Array(6);

  for (var i = 0; i < 6; i++) {
    faceUV[i] = new BABYLON.Vector4(i/hSpriteNb, 0, (i+1)/hSpriteNb, 1 / vSpriteNb);
  }
```
Then, to pass this array to the `CreateBox()` method, just add a parameter called `faceUV`, valued with this array, to the options :  
```javascript
  var options = {
    width: 10,
    height: 3,
    depth: 5,
    faceUV: faceUV
  };

  var box = BABYLON.MeshBuilder.CreateBox('box', options, scene);
  box.material = mat;
```
Here's the result : http://www.babylonjs-playground.com/#1V3CAT#12  
Quite easy, isn't it ?  
<br/>
<br/>
Now let's look at the red haired character on the top face of the box. He has his head on the left, correct ?  
What if we want to flip only this face ?  
This face is the box face 4 (just make attempts to discover the box geometry). We just then need to swap _y_ and _w_ coordinate values :  
```javascript
  var f = 4;
  var temp = faceUV[f].y;
  faceUV[f].y = faceUV[f].w;
  faceUV[f].w = temp;
```
And now, his head is in on the right : http://www.babylonjs-playground.com/#1V3CAT#13  
<br/>
<br/>
Obviously, we aren't not required to set every box face.  
Imagine we want to set only the face 4.  
Forget about the _for{}_ loop, just initialize our _faceUV_ array and set only _faceUV[4]_ :  
```javascript
  var faceUV = new Array(6);
  faceUV[4] = new BABYLON.Vector4(0, 0, 1 / hSpriteNb, 1 / vSpriteNb);
```
Only two lines of code only and that's all : http://www.babylonjs-playground.com/#1V3CAT#25  
<br/>
<br/>
We could also want to apply two different images from the same texture file onto two different meshes.  
Nothing easier : http://www.babylonjs-playground.com/#1V3CAT#26    
Two boxes, two images, but only one texture !
<br/>
<br/>

###Colors

Let's go back to our initial rectangular box : http://www.babylonjs-playground.com/#1V3CAT#10   
We are about to apply the same principle here not with textures, but with colors.  
Let's define a 6 element array _faceColors_ (6 box faces) and just set the color of the faces we want with `Colors4`.  
```javascript
  var faceColors = new Array(6);

  faceColors[4] = new BABYLON.Color4(1,0,0,1);   // red top
  faceColors[1] = new BABYLON.Color4(0,1,0,1);   // green front
```
Then pass this array to the `CreateBox()` method with the new `faceColors` parameter of `options`    
```javascript
  var options = {
    width: 10,
    height: 3,
    depth: 5,
    faceColors : faceColors
  };

  var box = BABYLON.MeshBuilder.CreateBox('box', options, scene);
```
Simple, isn't it ?  http://www.babylonjs-playground.com/#1V3CAT#14  

These colors are BJS Color4-class values. The Color4 alpha values become active if we set `hasVertexAlpha = true` : http://www.babylonjs-playground.com/#1V3CAT#27  

We can even combine the vertex colors with a colored material, blue here :  http://www.babylonjs-playground.com/#1V3CAT#15  

And finally we can also mix per-face colors with per-face textures, and/or mix either of those... with the material's standard colors. :  
```javascript
  var options = {
    width: 10,
    height: 3,
    depth: 5,
    faceUV: faceUV,
    faceColors : faceColors
  };
```
Enjoy : http://www.babylonjs-playground.com/#1V3CAT#16  

No need for submaterials or submeshes, when seeking such simple things as box-side materials.

