---
ID_PAGE: 22082
PG_TITLE: 08. Sprites
---
In this tutorial, we are going to learn how to manipulate Sprites. Sprites are 2D image/animation, and we will use them to display an image with alpha channel. Sprites always face the camera.

Nowadays, sprites are often used to display animated characters, and for particles, and to simulate 3D complex objects like trees. 

![Elements](http://www.babylonjs.com/tutorials/08%20-%20Sprites/08.png)

_最终结果_ 
## How can I do this ?

1- **Sprite manager**

If you want to use sprites, you need to create a “sprite manager” to optimize GPU resources by grouping in one place multiple instances of a sprite.
This manager is mandatory, even if you want to create one sprite. You just have to write:

```javascript
// Create a sprite manager
var spriteManagerTrees = new BABYLON.SpriteManager("treesManagr", "Assets/Palm-arecaceae.png", 2000, 800, scene);
```

When creating a sprite manager, you have to decide a few parameters:
* Name: a name for this manager.
* The 2D image URL (most of the time, you will want use an image format which contain alpha channel, like .PNG).
* The capacity of this manager : the maximum number of instances in this manager (in our example, we could create 2000 instances of trees).
* The cell size, corresponding to the size of your image, like we’ll see below.
* The actual scene, to which we will add this manager.

To give another example, look at this snippet:
```javascript
var spriteManagerPlayer = new BABYLON.SpriteManager("playerManagr","Assets/Player.png", 2, 64, scene);
```

This time, we only want 2 instances, and we said that our sprite’s size is 64. Here is what our image looks like:

![Elements](http://www.babylonjs.com/tutorials/08%20-%20Sprites/08-1.png)

Each image of a sprite must be contained in a 64 pixel square, no more no less.

2- **Create an instance**

Now that we have our manager, we can create instances of our sprite linked to this manager. Creating an instance is as simple as:

```javascript
var player = new BABYLON.Sprite("player", spriteManagerPlayer);
```

Voilà, you have got your sprite displayed!

If you want to add parameters to this instance, you can manipulate it like any other meshes:
```javascript
player.position.y = -0.3;
```

But because it’s a sprite, you may use specific parameters: you can change their size, or their orientation:
```javascript
player.size = 0.3;
player.angle = Math.PI/4;
player.invertU = -1;
```

Starting with Babylon.js v2.1, you can define sprite's width and height:
```
player.width = 0.3;
player.height = 0.4;
```

You can keep using ```player.size``` and in this case width and height will just be the same.

3- **Sprite animation**

One of the advantages of sprites is animations. You only have to load one large image file which will contain all animation images, one next to another. Just be careful to respect the square pixel size that you have specified in your manager (e.g. 64 pixel).

Here is what a complete sprite image looks like:

![Elements](http://www.babylonjs.com/tutorials/08%20-%20Sprites/08-2.png)

This will animate our players in more than 40 positions, depending upon the situation (walking, jumping,…). Babylon's engine is automatically reading sprites on more than one line, so the engine does the work for you :)

If you want to begin the animation, simply call this function:
```javascript
player.playAnimation(0, 43, true, 100);
```

By calling « playAnimation » with those parameters, our player will be animated from frame 0 to frame 43. The third parameter is indicating if this animation will loop or not. And the last parameter is the delay between the frames (the smaller it is, the faster the animation).

Finally, if you want to go to a specific image (e.g. the last one, when the character is not moving), just call:
```javascript
player.cellIndex = 44;
```

You can play with the scene and code used in this tutorial... by visiting the Babylon.js [**Playground sprites demo**](http://babylonjs-playground.azurewebsites.net/?8).

## Next step
Don’t hesitate to use sprites in your scene: they are not resource intensive, and they really can help keep high frame rates in your application.

Now you know how to create a complete simple dynamic scene and it is going to be important to talk about [collisions](http://doc.babylonjs.com/tutorials/Intersect_Collisions_-_mesh).
