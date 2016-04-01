---
ID_PAGE: 22091
PG_TITLE: 09. Cameras, Mesh Collisions and Gravity
---
Did you ever play a FPS (First Person Shooter) game? In this tutorial, we are going to simulate the same camera movements: the camera is on the floor, in collision with the ground, and potentially in collision with any objects in the scene.

![Elements](https://camo.githubusercontent.com/7422be3bf5ae147243aa3d29d9660a0210530201/687474703a2f2f7777772e626162796c6f6e6a732e636f6d2f7475746f7269616c732f30392532302d253230436f6c6c6973696f6e73253230477261766974792f30392e706e67)

_最终结果_ 
## How can I do this ?

To replicate this movement, we have to do 3 simple steps:

**1 - Define and apply gravity**

The first thing to do is to define our gravity vector, defining the G-force. In a classic world such as Earth, the direction of the force of gravity is down (negative) along the Y axis, but feel free to change it!
```javascript
scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
```
 
Gravity can be applied to any camera that you have defined previously in your code.
```javascript 
camera.applyGravity = true; 
```

**2 - Define an ellipsoid**

The next important step is to define the ellipsoid around our camera. This ellipsoid represents our player’s dimensions: a collision event will be raised when a mesh comes in contact with this ellipsoid, preventing our camera from getting too close to this mesh:

![Ellipsoid](https://camo.githubusercontent.com/19931f529e19679a0e2556e23fc94536e6a9b88c/687474703a2f2f7777772e626162796c6f6e6a732e636f6d2f7475746f7269616c732f30392532302d253230436f6c6c6973696f6e73253230477261766974792f30392d312e6a7067)

The _ellipsoid_ property on babylon.js cameras is default to size (0.5, 1, 0.5), but changing values will make you taller, bigger, smaller, thinner, it depends upon the adjusted axis. In the example below, we will make our camera's ellipsoid a bit bigger than the default one:

```javascript
//Set the ellipsoid around the camera (e.g. your player's size)
camera.ellipsoid = new BABYLON.Vector3(1, 1, 1);
```

**3 - Apply collision**

Once you have those previous settings completed, our final step is to declare that we are interested in sensing collisions in our scene:

```javascript
// Enable Collisions
scene.collisionsEnabled = true;
camera.checkCollisions = true;
```

And declare which meshes could be in collision with our camera:

```javascript
ground.checkCollisions = true;
box.checkCollisions = true;
```

That’s it! Easy!

You can play with the scene used in this tutorial... by visiting the Babylon.js [**playground demo**](http://www.babylonjs-playground.com/#4HUQQ).

Now, your camera is going to fall on the y-axis until it collides with the ground. And, your camera will collide with the box when you move it too near to it.

**4 - Object vs. object collision**

You can also do the same thing with a mesh by playing with _mesh.ellipsoid_ property and _mesh.moveWithCollisions(velocity)_ function. This function will try to move the mesh according to given velocity and will check if there is no collision between current mesh and all meshes with checkCollisions activated.

You can also use _mesh.ellipsoidOffset_ to move the ellipsoid on the mesh (By default the ellipsoid is centered on the mesh)

```javascript
var speedCharacter = 8;
var gravity = 0.15;
var character = Your mesh;

character.ellipsoid = new BABYLON.Vector3(0.5, 1.0, 0.5);
character.ellipsoidOffset = new BABYLON.Vector3(0, 1.0, 0);

var forwards = new BABYLON.Vector3(parseFloat(Math.sin(character.rotation.y)) / speedCharacter, gravity, parseFloat(Math.cos(character.rotation.y)) / speedCharacter);
forwards.negate();
character.moveWithCollisions(forwards);
// or
var backwards = new BABYLON.Vector3(parseFloat(Math.sin(character.rotation.y)) / speedCharacter, -gravity, parseFloat(Math.cos(character.rotation.y)) / speedCharacter);
character.moveWithCollisions(backwards);
```

Demo by Dad72: [**Move character with gravity and collision**](http://www.babylon.actifgames.com/moveCharacter/)

## Web worker based collision system (Since 2.1)

BabylonJS 2.1 allows the user to move the collision calculations to an external web worker thus achieving better rendering time.
The worker is integrated in the single framework file, and no changes are required by the developer.
The scene has now a new flag (false per default):
```javascript
scene.workerCollisions = true|false
```
Setting this flag to true will start the worker in the background. The worker will then receive all collision requests from the cameras and meshes. Setting it to false will set the collision to the regular collision calculation as it always was.

To read more about how workers were integrated head to Raanan Weber's blog:

* https://blog.raananweber.com/2015/05/26/collisions-using-workers-for-babylonjs/
* https://blog.raananweber.com/2015/06/06/collisions-using-workers-for-babylonjs-part-2/

## ArcRotateCamera
The ArcRotateCamera can also check collisions but instead of sliding along obstacles, this camera won't move when a collision appends.

To activate collisions, just call ```camera.checkCollisions = true```. You can define the collision radius with this code:

```javascript
camera.collisionRadius = new BABYLON.Vector3(0.5, 0.5, 0.5)
```

## Next step
Great, now you can develop a real FPS game! But maybe you would like to know when a mesh is in collision with another mesh? Good, because that is exactly the purpose of our [next tutorial](http://doc.babylonjs.com/tutorials/Intersect_Collisions_-_mesh).
