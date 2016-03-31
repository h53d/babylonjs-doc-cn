---
ID_PAGE: 21911
PG_TITLE: 01. Creating Basic Scene
---
### In this tutorial, we are going to create a basic 3D scene with Babylon.js.
![Babylon JS 01](http://urbanproductions.com/wingy/babylon/misc/tut01pic01.jpg)

_Two Basic Shapes in a Basic Scene_


Before you start, be sure you have a WebGL compatible browser (e.g.  Internet Explorer 11+, Firefox 4+, Google Chrome 9+, Opera 15+, etc.).


### The HTML Part
First, create a basic HTML5 web page:

```html
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">

   <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
      <title>Babylon - Basic scene</title>
   </head>

   <body>
   </body>

</html>
```
### The CSS Style Part

Inside the ```<head>``` part, please add this CSS to view the canvas in maximum size:
```css
<style>
  html, body {
    overflow: hidden;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #renderCanvas {
    width: 100%;
    height: 100%;
    touch-action: none;
  }
</style>
```

### The Javascript External Includes Part (the framework)

Now we load our framework files.  After the CSS, (but still inside the ```<head>``` part), please add:

```html
<script src="babylon.js"></script>
<script src="hand.js"></script>
<script src="cannon.js"></script>  <!-- optional physics engine -->
<!-- <script src="Oimo.js"></script>  New physics engine -->
```
(if you don't already have those files, you can find them here: https://github.com/BabylonJS/Babylon.js, and here: http://handjs.codeplex.com/)


Next, we go inside the ```<body>``` part of the web page... and add a HTML5 canvas element, which will be used to draw our scene.

```html
<canvas id="renderCanvas"></canvas>
```

Now, we make the jump from HTML5 into Javascript.  Still inside the ```<body>``` part of the web page,  please add:
```javascript
<script>

  // Get the canvas element from our HTML above
  var canvas = document.getElementById("renderCanvas");

  // Load the BABYLON 3D engine
  var engine = new BABYLON.Engine(canvas, true);
```

After this, you will add your scene creation code.  To keep your code compatible with the Babylon.js Playground, we recommend that you insert a 'createScene' function at this point.  Besides generating a Babylon Scene object, createScene() is where you will add your basic scene requirements:  One camera, one light, and one or more shapes/meshes.

So now, add this entire createScene function to your web page:
 
```javascript
  // This begins the creation of a function that we will 'call' just after it's built
  var createScene = function () {

    // Now create a basic Babylon Scene object 
    var scene = new BABYLON.Scene(engine);

// Change the scene background color to green.
    scene.clearColor = new BABYLON.Color3(0, 1, 0);
    // This creates and positions a free camera
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

// This attaches the camera to the canvas
    camera.attachControl(canvas, false);
        
    // This creates a light, aiming 0,1,0 - to the sky.
    var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
    // Dim the light a small amount
    light.intensity = .5;

    // Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
    var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

    // Move the sphere upward 1/2 its height
    sphere.position.y = 1;

    // Let's try our built-in 'ground' shape.  Params: name, width, depth, subdivisions, scene
    var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

    // Leave this function
    return scene;

  };  // End of createScene function
```

Yes, that is quite a function, but do not let it scare you.  You will learn more about the parameters and properties for lights, cameras, and built-in shapes... in the tutorials to come.  The main thing to know is that our createScene function has all requirements complete.  It contains:  

*  a Babylon Scene object
*  a camera that has been attached
*  a light that has been aimed
*  a sphere that has been placed at position 0,1,0 (we moved it upward +y)
*  a ground plane that has been placed at position 0,0,0 (default position)

There are three more things to add to your web page.  First, a 'call' to the createScene function that we just completed.  Add this:

```javascript
  // Now, call the createScene function that you just finished creating
  var scene = createScene();
```  

Then, the all-important rendering loop.  Add this:

```javascript
  // Register a render loop to repeatedly render the scene
  engine.runRenderLoop(function () {
    scene.render();
  });
```  

And last, an optional but handy canvas/window resize event handler.  Add this:

```javascript
  // Watch for browser/canvas resize events
  window.addEventListener("resize", function () {
    engine.resize();
  });
```

There.  All the Javascript inserting is done.  Make sure you close the script, body, and html elements. The last three lines of your HTML5 web page... should be:

```html
</script>
</body>
</html>
```

You are done! Save your file (in the same folder as babylon.js, hand.js, and cannon.js) and browse it with your WebGL-ready browser.  You should see your new scene displayed in 3D on its canvas.

A near-exact duplicate of the createScene function used in this tutorial... can be seen [**RIGHT HERE**](http://www.babylonjs.com/playground/#1GM4YQ) at the Babylon.js Playground.  You will also see the scene render LIVE, ONLINE!  Use the playground's 'Get .zip' choice if you want to download the entire index.html file used in this tutorial.

## Got Troubles? ##
Here is what the entire web page should look like:

```html
<!doctype html>
<html>
<head>
   <meta charset="utf-8">
   <title>Babylon - Basic scene</title>
   <style>
      html, body {
         overflow: hidden;
         width: 100%;
         height: 100%;
         margin: 0;
         padding: 0;
      }
      #renderCanvas {
         width: 100%;
         height: 100%;
         touch-action: none;
      }
   </style>
   <script src="babylon.js"></script>
   <script src="hand.js"></script>
   <script src="cannon.js"></script> <!-- optional physics engine -->
</head>
<body>
   <canvas id="renderCanvas"></canvas>
   <script type="text/javascript">
      // Get the canvas element from our HTML below
      var canvas = document.querySelector("#renderCanvas");
      // Load the BABYLON 3D engine
      var engine = new BABYLON.Engine(canvas, true);
      // -------------------------------------------------------------
      // Here begins a function that we will 'call' just after it's built
      var createScene = function () {
         // Now create a basic Babylon Scene object
         var scene = new BABYLON.Scene(engine);
         // Change the scene background color to green.
         scene.clearColor = new BABYLON.Color3(0, 1, 0);
         // This creates and positions a free camera
         var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
         // This targets the camera to scene origin
         camera.setTarget(BABYLON.Vector3.Zero());
         // This attaches the camera to the canvas
         camera.attachControl(canvas, false);
         // This creates a light, aiming 0,1,0 - to the sky.
         var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
         // Dim the light a small amount
         light.intensity = .5;
         // Let's try our built-in 'sphere' shape. Params: name, subdivisions, size, scene
         var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
         // Move the sphere upward 1/2 its height
         sphere.position.y = 1;
         // Let's try our built-in 'ground' shape. Params: name, width, depth, subdivisions, scene
         var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);
         // Leave this function
         return scene;
      }; // End of createScene function
      // -------------------------------------------------------------
      // Now, call the createScene function that you just finished creating
      var scene = createScene();
      // Register a render loop to repeatedly render the scene
      engine.runRenderLoop(function () {
         scene.render();
      });
      // Watch for browser/canvas resize events
      window.addEventListener("resize", function () {
         engine.resize();
      });
   </script>
</body>
</html>
```

## Moving On ##

From this point forward in the Basic Series tutorials, I will mostly talk about things that are contained in the createScene function (the part between the dashed lines). I will assume that you already know how to insert a createScene function into a Babylon.js HTML5 scene document (like the one above).

Try to memorize this web page layout, and see how the createScene function is at the heart of it. After you have spent some time using the Babylon.js Playground, you will see how createScene() is portable, and can be easily copied and pasted TO and FROM the playground editor window. This will allow others to help you with problems, and will also allow you to help others with their problems.

## Next step ##
----

Now you are ready to go further and learn how to create more elements like spheres, cylinders, boxes, etc.

Next in the Playpen Series - [**Basic elements**](http://doc.babylonjs.com/tutorials/Discover_Basic_Elements)
