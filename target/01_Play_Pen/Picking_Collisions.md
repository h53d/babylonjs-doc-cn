---
ID_PAGE: 22111
PG_TITLE: 11. Picking Collisions
---
## Introduction

The last collision type could be very useful for you: it’s picking an object with your mouse. The main difficulty is to click on a 3D object whereas your screen is a flat 2D display.

Let’s see how we can get your mouse position transposed in your 3D scene by this gun shooting example:


![Picking](http://www.babylonjs.com/tutorials/11%20-%20Collisions%20PickResult/11.png)

_最终结果_ 
## How can I do this ?

Babylon engine lets you do this very easily by giving you useful functions.

First of all, after creation of a plane representing the wall, and a plane with our impact’s picture, we have to detect a click on the UI (User Interface). Once the event is raised, use the function “pick” to get some powerful information about the relation between your click and your scene.
```javascript
//When click event is raised
window.addEventListener("click", function () {
   // We try to pick an object
   var pickResult = scene.pick(scene.pointerX, scene.pointerY);
}),
```
 
The pickResult object is mainly composed of 4 pieces of information:

1. _hit_ (bool): « True » if your click hits an object in the scene.
1. _distance_ (float): the “distance” between the active camera and your hit (infinite if no mesh was hit)
1. _pickedMesh_ (BABYLON.Mesh): if you hit an object, this is the selected mesh. If not, it’s null.
1. _pickedPoint_ (BABYLON.Vector3): the point you have clicked, transformed in 3D coordinates, depending on the object you’ve clicked. Null if no hit.

Now we have all the data we need to build our scene. We just have to position our gun’s impact picture (a plane made earlier... called impact) when the user clicks on the wall plane:
```javascript
// if the click hits the wall object, we change the impact picture position
if (pickResult.hit) {
            impact.position.x = pickResult.pickedPoint.x;
            impact.position.y = pickResult.pickedPoint.y;
}
```
Fast, and easy, isn’t it?

Feel free to play with this scene... [at our online playground](http://babylonjs-playground.azurewebsites.net/?11).

## Advanced Picking Features

Please note that the pickResult object can provide you with additional information, detailed below:

- `faceId`: this is the position of the picked face's indices in the indices array. These can be accessed like so:
```
var indices = pickResult.pickedMesh.getIndices();
var index0 = indices[pickResult.faceId * 3];
var index1 = indices[pickResult.faceId * 3 + 1];
var index2 = indices[pickResult.faceId * 3 + 2];
```

- `submeshId`: the ID of the picked submesh inside the picked mesh

- `bu` and `bv` properties: these are the barycentric coordinates of the picked point in the face. The picked face is a polygon composed of 3 vertices, and the picked point is the barycenter of those three vertices with the following weights:

  * `1 - bu - bv` for the vertex n. 0
  * `bu` for the vertex n. 1
  * `bv` for the vertex n. 2

- `getTextureCoordinates()`: computes the texture coordinates of the picked point; these will be returned as a `Vector2` in texture space, which means its coordinates will be between 0 and 1.

Possible uses include:

- Drawing on a texture using a DynamicTexture,
- Modifying a face that was hit (delete, move vertices, change color...),
- Changing a submesh material,
- etc.


## Next step
This collision method is convenient in a lot of situations. Once you understand mouse pick events, you can begin using that functionality to advance your application’s development.

Now you should know everything about collisions, so it’s time to move on to a classic effect in 3D : [particles](http://doc.babylonjs.com/tutorials/Particles).
