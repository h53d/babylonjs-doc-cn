---
ID_PAGE: 22531
PG_TITLE: How to use Actions
---
Actions are a simple way to add interactions in your scenes. An action is launched when its trigger is fired.

For instance, you can specify that when the user clicks (or touches) a mesh, an action is executed.

# How to use it
To use actions, you have to attach an `BABYLON.ActionManager` to a mesh or to your scene:
`mesh.actionManager = new BABYLON.ActionManager(scene);`

Once the ActionManager is created, you can start registering actions:

```javascript
mesh.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPickTrigger, light, "diffuse", BABYLON.Color3.Black(), 1000));
```

For instance this action will animate the `light.diffuse` property to black in 1000ms when the user picks the mesh.

You can also chain actions:

```javascript
mesh.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPickTrigger, light, "diffuse", BABYLON.Color3.Black(), 1000))
        .then(new BABYLON.SetValueAction(BABYLON.ActionManager.NothingTrigger, mesh.material, "wireframe", false));
```

In this case, the first click will animate the `light.diffuse` property, the second click will set `mesh.material` to false. The third one will start again and will animate the `light.diffuse` property and so on...

Finally, you can add a condition to your actions. In this case, actions are launched when the trigger is fired if the condition is true:

```javascript
var condition1 = new BABYLON.PredicateCondition(sphere.actionManager, function () {
    return light1.diffuse.equals(BABYLON.Color3.Red());
});
sphere.actionManager.registerAction(new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPickTrigger, camera, "alpha", 0, 500, condition1));
```

In this example, the `camera.alpha` property will be animated to 0 in 500ms when the user clicks the sphere only if the `light1.diffuse` property is equal to red.

# Triggers
Currently, 12 different triggers are supported:

The following list defines triggers associated with meshes:

* `BABYLON.ActionManager.NothingTrigger`: Never raised. Used for sub-actions with `action.then` function.
* `BABYLON.ActionManager.OnPickTrigger`: Raised when the user touches/clicks on a mesh.
* `BABYLON.ActionManager.OnPickUpTrigger`: Raised when the user touches/clicks up on a mesh.
* `BABYLON.ActionManager.OnPickOutTrigger`: Raised when the user touches/clicks down on a mesh and then move off-of the mesh.
* `BABYLON.ActionManager.OnLeftPickTrigger`: Raised when the user touches/clicks on a mesh with left button.
* `BABYLON.ActionManager.OnRightPickTrigger`: Raised when the user touches/clicks on a mesh with right button.
* `BABYLON.ActionManager.OnCenterPickTrigger`: Raised when the user touches/clicks on a mesh with center button.
* `BABYLON.ActionManager.OnLongPressTrigger`: Raised when the user touches/clicks up on a mesh for a long period of time (defined by BABYLONActionManager.LongPressDelay). 
* `BABYLON.ActionManager.OnPointerOverTrigger`: Raised when the pointer is over a mesh. Raised just once.
* `BABYLON.ActionManager.OnPointerOutTrigger`: Raised when the pointer is no more over a mesh. Raised just once.
* `BABYLON.ActionManager.OnIntersectionEnterTrigger`: Raised when the mesh is in intersection with another mesh. Raised just once.
* `BABYLON.ActionManager.OnIntersectionExitTrigger`: Raised when the mesh is no more in intersection with another mesh. Raised just once.
* `BABYLON.ActionManager.OnKeyDownTrigger`: Raised when a key is press.
* `BABYLON.ActionManager.OnKeyUpTrigger`: Raised when a key is up

For intersection triggers, you have to specify the "other" mesh with the following code:

```javascript
mesh.actionManager.registerAction(

new BABYLON.SetValueAction({ trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: otherMesh }, 

mesh, "scaling", new BABYLON.Vector3(1.2, 1.2, 1.2)));
```

You can as well define if you want to use precise intersections:

```javascript
mesh.actionManager.registerAction(

new BABYLON.SetValueAction({ trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger, parameter: { mesh:otherMesh, usePreciseIntersection: true} }, 

mesh, "scaling", new BABYLON.Vector3(1.2, 1.2, 1.2)));

```

The following list defines triggers associated with scene:

* `BABYLON.ActionManager.OnEveryFrameTrigger`: Raised once per frame.
* `BABYLON.ActionManager.OnKeyDownTrigger`: Raised when a key is pressed.
* `BABYLON.ActionManager.OnKeyUpTrigger`: Raised when a key is released.

For OnKeyUpTrigger and OnKeyDownTrigger triggers, you can filter events based on a key, either in your code or with a parameter:

```javascript
scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
   if (evt.sourceEvent.key == "r") {
       ...
   }
}));

scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction({ trigger: BABYLON.ActionManager.OnKeyUpTrigger, parameter: "r" },
  function () {
            ...
  }));
```

# Actions
Most of the action have a `propertyPath` property. This string defines the path to the property to affect with the action. You can use direct values like `position` or `diffuse`. But you can also provide complex paths like `position.x`

* `BABYLON.SwitchBooleanAction`: Used to switch the current value of a boolean property:

    `SwitchBooleanAction(trigger, target, propertyPath, condition)`

* `BABYLON.SetValueAction`: Used to specify a direct value for a property:

    `SetValueAction(trigger, target, propertyPath, value, condition)`

* `BABYLON.IncrementValueAction`: Add a specified value to a number property:

    `IncrementValueAction(trigger, target, propertyPath, value, condition)`

* `BABYLON.PlayAnimationAction`: Launch an animation on a specified target:

    `PlayAnimationAction(trigger, target, from, to, loop, condition)`

* `BABYLON.StopAnimationAction`: Stop an animation on a specified target:

    `StopAnimationAction(trigger, target, condition)`

* `BABYLON.DoNothingAction`: Do nothing :)

    `DoNothingAction(trigger, condition)`

* `BABYLON.CombineAction`: This action is a container. You can use it to execute many actions simultaneously on the same trigger. The children property must be an array of actions:

    `CombineAction(trigger, children, condition)`

* `BABYLON.ExecuteCodeAction`: Execute your own code when the trigger is raised and the condition is true:

    `ExecuteCodeAction(trigger, func, condition)`

* `BABYLON.SetParentAction`: Used to define the parent of a node (camera, light, mesh):

    `SetParentAction(trigger, target, parent, condition)`

* `BABYLON.InterpolateValueAction`: This action creates an animation to interpolate the current value of a property to a given target. The following types are supported:
   * `number`
   * `BABYLON.Color3`
   * `BABYLON.Vector3`
   * `BABYLON.Quaternion`

    `InterpolateValueAction(trigger, target, propertyPath, value, duration, condition, stopOtherAnimations)`

* `BABYLON.PlaySoundAction` and `BABYLON.StopSoundAction`: The "sound" parameter is the reference of the sound you created using `var sound = new BABYLON.Sound(...)`

    `PlaySoundAction(trigger, sound, condition)`

    `StopSoundAction(trigger, sound, condition)`

# Conditions
There are three kinds of conditions:

* `BABYLON.ValueCondition`: This condition is true when a given property is equal / greater / lesser / different from a specific value. The following operands are thus supported:
   * `BABYLON.ValueCondition.IsEqual`
   * `BABYLON.ValueCondition.IsDifferent`
   * `BABYLON.ValueCondition.IsGreater`
   * `BABYLON.ValueCondition.IsLesser`

    `ValueCondition(actionManager, target, propertyPath, value, operator)`

* `BABYLON.PredicateCondition`: This condition uses a predicate to determine its state:

    `PredicateCondition(actionManager, predicate)`

* `BABYLON.StateCondition`: This condition checks the ```state``` property of an object and compares it to given value:

    `StateCondition(actionManager, target, value)`

# Experimenting actions
So basically, let's imagine you want to almost hide a mesh when the user touches it.
First of all you have to add a `BABYLON.ActionManager` on it:

`mesh.actionManager = new BABYLON.ActionManager(scene);`

Then you can create an action that will be associated with the `BABYLON.ActionManager.OnPickTrigger` trigger. This action will interpolate the ```mesh.visibility``` property to 0.2:

`var action = new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPickTrigger, mesh, "visibility", 0.2, 1000);`

Then add this action to the mesh:

`mesh.actionManager.registerAction(action);`

And you're done! Easy, right?

You can also chain another action to restore the `mesh.visibility` property to default value:

`var action = new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPickTrigger, mesh, "visibility", 0.2, 1000);`

`var action2 = new BABYLON.InterpolateValueAction(BABYLON.ActionManager.OnPickTrigger, mesh, "visibility", 1.0, 1000);`

`mesh.actionManager.registerAction(action).then(action2);`

In this case, the first click will hide the button, the following click will restore it, and so on...

# Sprites 
Starting with Babylon.js 2.3, sprites can have an action manager: http://www.babylonjs...nd.com/#9RUHH#5

Please note that the SpriteManager must turn picking support on by using `spriteManager.isPickable = true`
Sprites can also control picking with `sprite.isPickable = false / true` (False by default)

# Playground
If you want to play with actions, you can try them at our playground:
http://www.babylonjs.com/playground/?17
