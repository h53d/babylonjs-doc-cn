# Babylon.js Physics Engine - Basic Usage

## Introdution

Bablon.js has a plugin system for physics engines that enables the user to add phyisics interactions to the scene's objects.
Unlike the internal collision system, a physics engine calculates objects'  body dynamics and emulates "real-life" interactions between them. So if two objects collide, they will "bounce" off one another, just like you would expect from a real-life object.

Babylon.js' plugin system allowed us to use well established physics engines and to integrate them into Babylon.js' render loop. Apart from very advanced usage, there is no need to interact directly with the physics engine. Babylon.js does the work for you.

This tutorial will show the basic usage of the physics system.

## What physics engine are integrated?

There are plugins for 3 physics engines:

1. Cannon.js - a wonderful physics engine written entirely in JavaScript
2. Oimo.js - a JS port of the lightweight Oimo physics engine
3. Energy.js - (Soon to go public) - a JS port of a C++ physics engine.
Each engine has its own features and its own way of calculating the body dynamics. We at Babylon.js tried collecting the common usage of all engines and provide an easy-to-use interface to them.

## Basic usage

### Enabling the physics engine

To enable the physics engine, call the scene's `enablePhysics` function:

```javascript
var scene = new BABYLON.Scene(engine);
var gravityVector = new BABYLON.Vector3(0,-9.81, 0);
var physicsPlugin = new BABYLON.CannonJSPlugin();
scene.enablePhysics(gravityVector, physicsPlugin);
```
Both parameters are optional. The default parameters are shown in the example. This is the same as calling:
```javascript
scene.enablePhysics();
```

To use OimoJS simply change the 2nd parameter to `new BABYLON.OimoJSPlugin()`:

```javascript
scene.enablePhysics(new BABYLON.Vector3(0,-9.81, 0), new BABYLON.OimoJSPlugin());
```

Calling this function will create a new BABLON.PhysicsEngine object that will be in charge of handlig the physics interactions.

The physics engine is now enabled and is running during the render loop.

### Impostors
To allow interaction between objects the physics engines use an impostor, which is a simpler representation of a complex object. 
An impostor, as a rule, is a rigid body - meaning it cannot be changed during interaction. A sphere will always have the same radius, a box will always have the same length. If you want to change the object, a new impostor will be created.

Each physics engine has different types of Impostors. The following table shows what each engine supports, and what it uses to simulate the missing impostors

| Impostor Type | Cannon.js | Oimo.js | Energy.js | Notes   |
|---------------|-----------|---------|-----------|---------|
| Box           | Box       | Box     | Box       |         |
| Sphere        | Sphere    | Sphere  | Sphere    |         |
| Particle      | Particle  | Sphere  | Unknown   |         |
| Plane         | Plane     | Box     | Plane     | Simulates an unlimited surface. Like a floor that never ends. Consider using Box |
| Cylinder      | Cylinder  | Cylinder| Cylinder  |         |
| Mesh          | Mesh      | Box     | Mesh      | Use only when neccessary - will lower performance. Cannon's mesh impostor only collides against sphers and planes |
| Heightmap     | Heightmap | Box     | Mesh      |         |

Using simple impostors for complex objects will increase performance but decrease the reality of the scene's physics. Consider when complex impostors (like the mesh or the heightmap) is needed, and when the simpler geometries can be used.

### Babylon's physics impostor

To enable physics on an object(*) you need to assign it a physics impostor. The signature of the impostor's constructor is (provided with TypeScript type definition):

```javascript
new BABYLON.PhysicsImpostor(object: IPhysicsEnabledObject, type: number, options: PhysicsImpostorParameters, scene:BABYLON.Scene);
```

#### object
You will notice that I keep on writing object and not mesh, and that the first parameter is not a mesh but an interface (IPhysicsEnabledObject). It is possible to assign an impostor to any Babylon object that has at least two parameters:

```
position: BABYLON.Vector3;
rotationQuaternion: BABYLON.Quaternion
```

An AbstractMesh will be the first choice, of course. But a Solide Particle also applys, and so is a light or certain cameras. I will show how to use an impostor on different object types in the advanced tutorial.

#### type
Type can be one of the following:

```javascript
BABYLON.PhysicsImpostor.SphereImpostor;
BABYLON.PhysicsImpostor.BoxImpostor;
BABYLON.PhysicsImpostor.PlaneImpostor;
BABYLON.PhysicsImpostor.MeshImpostor;
BABYLON.PhysicsImpostor.CylinderImpostor;
BABYLON.PhysicsImpostor.ParticleImpostor;
BABYLON.PhysicsImpostor.HeightmapImpostor;
```

#### options
Options is a JSON. The interface is as follows:

```javascript
    export interface PhysicsImpostorParameters {
        mass: number;
        friction?: number;
        restitution?: number;
        nativeOptions?: any;
    }
```

* mass: The only mandatory parameters is mass, which is the object's mass in kg. A `0` as a value will create a static impostor - good for floors.
* friction: is the impostor's friction when colliding against other impostors. 
* restitution: is the amount of force the body will "give back" when colliding. A low value will create no bounce, a value of 1 will be a very bouncy interaction.
* nativeOptions: is a JSON with native options of the selected physics plugin. More about it in the advanced tutorial.

#### scene

I hope no explanation is required.

### Basic physics scene

I will extend the playground's basic scene to have physics interactions between the sphere and the ground.

I will first have to enable physics:

```javascript
scene.enablePhysics();
```

Afterwards, I can create the impostors.

```javascript
sphere.physicsImpostor = new BABYLON.PhysicsImpostor(sphere, BABYLON.PhysicsImpostor.SphereImpostor, { mass: 1, restitution: 0.9 }, scene);
ground.physicsImpostor = new BABYLON.PhysicsImpostor(ground, BABYLON.PhysicsImpostor.BoxImpostor, { mass: 0, restitution: 0.9 }, scene);
```

Playground example: http://www.babylonjs-playground.com/#BEFOO

### Further functionality of the Impostor class
In the example above you noticed I kept a reference on the pyhscis impostor attached to the sphere and the ground. This is not mandatory, but it is recommended to keep a reference of this object in order to interact with the physics body.

The physics impostor holds a set of functions that can be executed on the physics engine's body:

#### Bidirectional transformation linking

The physics impostor synchronizes the physics engine's body and the connected object with each frame.
That means that changing the object's position or rotation in babylon code will also move the impostor. The impostor is also the one updating the object's position after the physics engine is finished calculating the next step.

Playground example (sphere rotation and position) - http://www.babylonjs-playground.com/#B5BDU
Notice how the sphere rotates (due to the rotate function), but this rotation is not being taken into account by the phyysics engine.

Playground example (box rotation and position) - http://www.babylonjs-playground.com/#2ADVLV
In this case the rotation does influence the physics engine due to the geometric shape - a box standing on its edge will need to fall to either side, which influences its velocities.

#### Linear velocity

Simply put the linear velocity is in charge of updating the object's position. a velocity in any axis will cause a movement in its direction.
To get the object's liner velocity (a BABYLON.Vector3):

```javscript
impostor.getLinearVelocity();
```

To set the object's linear velocity use:
```javscript
impostor.setLinearVelocity(new BABYLON.Vector3(0,1,0));
```

Playground example - http://www.babylonjs-playground.com/#BXII

The pyhscis engine is in charge of calculating the body's velocity. Changing it will not make it fixed, but give it a "push". The physics engine will take the velocity into account and will modify it using gravity and collision interactions.

#### Angular velocity

If the linear velocity was changing the position, the angular velocity is changing the rotation.

To get the object's angular velocity (a BABYLON.Quaternion):

```javscript
impostor.getAngularVelocity();
```

To set the object's liner velocity use:
```javscript
impostor.setAngularVelocity(new BABYLON.Quaternion(0,1,0,0));
```

playground - http://www.babylonjs-playground.com/#IGM3H

Same as the linear velocity - setting this value will only for the physics engine to recalculate the body dynamics. The value will not stay fixed.

#### Impulses and forces

Applying a force/impulse on a body will change its velocities (liner and angular) according to the body's properties (mass is taken into account, for example).

Cannon supports both force and impulse (different aspects of the same concept. Read about the difference here - http://www.differencebetween.com/difference-between-impulse-and-vs-force/)
Oimo only supports impulses. Applying a force will fallback to impulse.

To apply an impulse use the applyImpulse function of the impostor:

```javascript
impostor.applyImpulse(new BABYLON.Vector3(10, 10, 0), sphere.getAbsolutePosition());
```

The first variable is the impulse to apply. The second is where on the body itself should the force be applied to. This about a game of pool - you can hit the ball in many positions and the interaction with it will be different. This is the way to simulate that.

Playground example - http://www.babylonjs-playground.com/#26LQEZ
Playground example with a different position of the impulse, giving the ball a "spin" - http://www.babylonjs-playground.com/#26LQEZ#1

#### Collision callbacks

I can add a callback that will be called when an impostor collides with another impostor. 
This is how to change the color of an object if it collides against the ground

```javascript
sphereImpostor.registerOnPhysicsCollide(groundImpostor, function(main, collided) {
    main.object.material.diffuseColor = new BABYLON.Color3(Math.random(), Math.random(), Math.random());
});
```

Note that in this case I assumed the impostor's body is a mesh with a material.

Playground example - http://www.babylonjs-playground.com/#1NASOD

Notice that the callback will be executed each and every time both impostors collide, but will stop when they are touching (when the sphere no longer bounces).

### Physics Joints

#### What are joints?

To connect two impostors together I can now use joints. 
Think of the joint as a limitation (or constraint) of either rotation or position (or both) between two impostors. 
Each engine supports different types of joints (which usually have different names as well):

| Joint Type | Cannon.js | Oimo.js | Energy.js | Notes   |
|---------------|-----------|---------|-----------|---------|
| Distance  | Distance | Distance | ---   |  A fixed distance bwtween two impostors |
| Hinge | Hinge | Hinge | Hinge | A joint allowing rotation on a single axis (much like your knee) |
| Hinge2| ----  | Wheen  | Hinge2   | A joint allowing rotation on a single axis in two different points |
| Ball And Socket | Point To Point | Ball | Ball And Socket | A joint allowing one of the objects to rotate around a specific socket (like your hip) |
| Slider | ---- | Slider | Slider | A joint allowing changing the position along a single axis |

Cannon has also a special Spring joint that will simulate a spring connected between two impostors.

*A further explanation of the joints (including inlustrations) is soon to be written.*

#### Adding a new joint

To add a new joint the impostor has two help classes:

```javascript
impostor.addJoint(otherImpostor, joint);
//or
impostor.createJoing(otherImpostor, jointType, jointData);
```

Joint types can be selected from the following enum:

```javscript
BABYLON.PhysicsJoint.DistanceJoint;
BABYLON.PhysicsJoint.HingeJoint;
BABYLON.PhysicsJoint.BallAndSocketJoint;
BABYLON.PhysicsJoint.WheelJoint;
BABYLON.PhysicsJoint.SliderJoint;
BABYLON.PhysicsJoint.Hinge2Joint = BABYLON.PhysicsJoint.WheelJoint;
BABYLON.PhysicsJoint.PointToPointJoint = BABYLON.PhysicsJoint.BallAndSocketJoint;
BABYLON.PhysicsJoint.SpringJoint;
```

Babylon has 3 help-classes to add joints:

`BABYLON.DistanceJoint` , `BABYLON.HingeJoint`, `BABYLON.Hinge2Joint`.

DistanceJoint playground - http://www.babylonjs-playground.com/#26QVLZ 
SpringJoint example - http://www.babylonjs-playground.com/#1BHF6C

### Interaction with the physics engine

using `scene.getPhysicsEngine()` I can get access to functions that will influence the engine directly.

#### Setting the time step

The physics engine assumes a certain framerate to be taken into account when calculating the interactions.
The time between each step can be changed to "accelerate" or "slow down" the physics interaction. 
Here is the same scene with different time steps - accelerating and slowing down:

Default time step - http://www.babylonjs-playground.com/#2B84TV
Slowing down - http://www.babylonjs-playground.com/#2B84TV#1
Speeding up - http://www.babylonjs-playground.com/#2B84TV#2

#### Setting the scene's gravity

I can change the scene's gravity using the physics engine's `setGravity(vector3)` function.
This can be done in real time, even after setting the gravity:

Playground demo (click to toggle positive/negative gravity) - http://www.babylonjs-playground.com/#A2WGF