---
ID_PAGE: 25363
PG_TITLE: Layermasks and Multi-Cam Textures
---
##Different meshes for multiple cameras using Layermasks#
---
A `layerMask` is a number assigned to each mesh and camera.&nbsp; It is used at the bit level to indicate whether lights and cameras should shine-upon or show the mesh.&nbsp; The default value, 0x0FFFFFFF, will cause the mesh to be shined upon shown by any stock light and camera.

The feature is used primarily when multiple cameras are active at the same time.&nbsp; If you wish to have a mesh that is always visible on the screen and pickable, e.g. a button, you might add a second camera and light to the scene to exclusively show and light it.&nbsp; 

You'll need the 2nd camera to ONLY see the button.&nbsp; The button should also only be visible once. 

Notice that the default `layerMask` starts with the first 4 bits being 0, or off.&nbsp; If the 2nd camera and button were to both have a `layerMask` with one of the 4 values below, then the 2nd camera would only see the button:
- 0x10000000
- 0x20000000
- 0x40000000
- 0x80000000

It should also be noted that should a mesh with a `layerMask` of 0, can never be seen by anyone.&nbsp; This might be good for hiding things.

To setup for multi-cameras:
```javascript
if (scene.activeCameras.length === 0){
&nbsp;&nbsp; &nbsp;scene.activeCameras.push(scene.activeCamera);
}&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; 
var secondCamera = new Babylon.Camera(...);
secondCamera.layerMask = 0x10000000;
scene.activeCameras.push(secondCamera);

var Button = new BABYLON.Mesh(...);
Button.layerMask = 0x10000000;
```&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
##Lights##
Unless the material for the meshes for the 2nd camera is purely emissive, this still leaves any light for the button shining on all the other meshes, and lights of the scene shining on the button.&nbsp; To keep scene lights from shining on the button, loop through the existing lights, and set the excludeWithLayerMask value:
```javascript
for(var i = scene.lights.length - 1; i >= 0; i--){
&nbsp;&nbsp; &nbsp;scene.lights[i].excludeWithLayerMask = 0x10000000;
}
```&nbsp; 
Then make the "button" light:
```javascript
var light = new BABYLON.Light(...);
light.includeOnlyWithLayerMask = 0x10000000;
```
Finally, if there may be more lights generated later, you can register a call-back whenever a light is added:
```javascript
scene.onNewLightAdded = onNewLight;
```&nbsp; 
This could be:
```javascript
onNewLight = function (newLight, positionInArray, scene) {
&nbsp;&nbsp; &nbsp;newLight.excludeWithLayerMask = 0x10000000;
};
```&nbsp; 
##Gun Sight Example##
Here is a simple example of using a 2nd orthographic camera which shows a gun sight.&nbsp; To keep it simple, emissive material was used to avoid lighting it.&nbsp; Just copy and paste it into any scene, then call it.&nbsp; The `layerMask` chosen also allows Dialog extension to inter-operate.&nbsp; Perhaps these could be combined to do a heads-up tank sight with range finder.&nbsp; 

A commercial quality implementation would probably not use `CreateBox()`, since it creates depth faces that cannot be seen straight-on anyway.&nbsp; It should also take into account a window size change, unless it is a tablet app.
```javascript
function addGunSight(scene){
&nbsp;&nbsp; &nbsp;if (scene.activeCameras.length === 0){
&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; scene.activeCameras.push(scene.activeCamera);
&nbsp;&nbsp; &nbsp;}&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; 
&nbsp;&nbsp; &nbsp;var secondCamera = new BABYLON.FreeCamera("GunSightCamera", new BABYLON.Vector3(0, 0, -50), scene);&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp; 
&nbsp;&nbsp; &nbsp;secondCamera.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
&nbsp;&nbsp; &nbsp;secondCamera.layerMask = 0x20000000;
&nbsp;&nbsp; &nbsp;scene.activeCameras.push(secondCamera);

&nbsp;&nbsp; &nbsp;meshes = [];
&nbsp;&nbsp; &nbsp;var h = window.innerHeight;
&nbsp;&nbsp; &nbsp;var w = window.innerWidth;

&nbsp;&nbsp; &nbsp;var y = BABYLON.Mesh.CreateBox("y", h * .2, scene);
&nbsp;&nbsp; &nbsp;y.scaling = new BABYLON.Vector3(0.05, 1, 1);
&nbsp;&nbsp; &nbsp;y.position = new BABYLON.Vector3(0, 0, 0);
&nbsp;&nbsp; &nbsp;meshes.push(y);
&nbsp;&nbsp; &nbsp;
&nbsp;&nbsp; &nbsp;var x = BABYLON.Mesh.CreateBox("x", h * .2, scene);
&nbsp;&nbsp; &nbsp;x.scaling = new BABYLON.Vector3(1, 0.05, 1);
&nbsp;&nbsp; &nbsp;x.position = new BABYLON.Vector3(0, 0, 0);
&nbsp;&nbsp; &nbsp;meshes.push(x);
&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; 
&nbsp;&nbsp; &nbsp;var lineTop = BABYLON.Mesh.CreateBox("lineTop", w * .8, scene);
&nbsp;&nbsp; &nbsp;lineTop.scaling = new BABYLON.Vector3(1, 0.005, 1);
&nbsp;&nbsp; &nbsp;lineTop.position = new BABYLON.Vector3(0, h * 0.5, 0);
&nbsp;&nbsp; &nbsp;meshes.push(lineTop);
&nbsp;&nbsp; &nbsp;
&nbsp;&nbsp; &nbsp;var lineBottom = BABYLON.Mesh.CreateBox("lineBottom", w * .8, scene);
&nbsp;&nbsp; &nbsp;lineBottom.scaling = new BABYLON.Vector3(1, 0.005, 1);
&nbsp;&nbsp; &nbsp;lineBottom.position = new BABYLON.Vector3(0, h * -0.5, 0);
&nbsp;&nbsp; &nbsp;meshes.push(lineBottom);
&nbsp;&nbsp; &nbsp;
&nbsp;&nbsp; &nbsp;var lineLeft = BABYLON.Mesh.CreateBox("lineLeft", h, scene);
&nbsp;&nbsp; &nbsp;lineLeft.scaling = new BABYLON.Vector3(0.010, 1,&nbsp; 1);
&nbsp;&nbsp; &nbsp;lineLeft.position = new BABYLON.Vector3(w * -.4, 0, 0);
&nbsp;&nbsp; &nbsp;meshes.push(lineLeft);
&nbsp;&nbsp; &nbsp;
&nbsp;&nbsp; &nbsp;
&nbsp;&nbsp; &nbsp;var lineRight = BABYLON.Mesh.CreateBox("lineRight", h, scene);
&nbsp;&nbsp; &nbsp;lineRight.scaling = new BABYLON.Vector3(0.010, 1,&nbsp; 1);
&nbsp;&nbsp; &nbsp;lineRight.position = new BABYLON.Vector3(w * .4, 0, 0);
&nbsp;&nbsp; &nbsp;meshes.push(lineRight);

&nbsp;&nbsp; &nbsp;var gunSight = BABYLON.Mesh.MergeMeshes(meshes);
&nbsp;&nbsp; &nbsp;gunSight.name = "gunSight";
&nbsp;&nbsp; &nbsp;gunSight.layerMask = 0x20000000;
&nbsp;&nbsp; &nbsp;gunSight.freezeWorldMatrix();

&nbsp;&nbsp; &nbsp;var mat = new BABYLON.StandardMaterial("emissive mat",scene);
&nbsp;&nbsp; &nbsp;mat.checkReadyOnlyOnce = true;
&nbsp;&nbsp; &nbsp;mat.ambientColor = new BABYLON.Color3(1,1,1);
&nbsp;&nbsp; &nbsp;
&nbsp;&nbsp; &nbsp;gunSight.material = mat;
}
```
