---
ID_PAGE: 22621
PG_TITLE: A Babylon.js Primer
---
Welcome to the...

## Babylon.js WebGL Game Creation System!##

Hi! Welcome to The Babylon.js Primer, an introduction to some of the things you will need to know in order to get the most out of this useful Javascript-based WebGL framework.
What is a framework, you ask?&nbsp; You can think of a framework as scaffolding for a building, allowing you to build around it without worrying about the foundation. It makes a complicated system, (WebGL,) much easier to use.

We hope to teach you a large amount of information in a very quick manner.&nbsp; Often there are more ways than one to accomplish a task here.&nbsp; I will let you discover those other ways by yourself.&nbsp; For now we will teach you the quickest and easiest ways, determined by studying the traits of other new users of Babylon.js.

## The Browser ##
Simply put, you will need to use a browser that supports WebGL and has Javascript activated.&nbsp; Internet Explorer 11+, Firefox 4+, Google Chrome 9+, Opera 12+, etc.&nbsp; WebGL is also supported by many browsers for mobile devices.&nbsp; I will let you investigate the details of mobile WebGL, but know that Babylon.js has many features designed with mobile WebGL in mind.&nbsp; Additionally, Babylon.js has complete support for full-immersion stereoscopic viewing and virtual reality head gear!

## Useful Links ##
| Clickable Link&nbsp; | What you will find |
| ------------- | ------------- |
| [**BabylonJS Main Website**](http://www.babylonjs.com/) |&nbsp; Many great demos and useful links near the bottom |
| [**BabylonJS Forum**](http://www.html5gamedevs.com/forum/16-babylonjs) | Ask questions, help others, meet great friends |
| [**BabylonJS GitHub Site**](http://www.babylonjs.com) |&nbsp; Downloads, tutorials, and many links (scroll down when there) |
| [**BabylonJS API Documentation**](http://doc.babylonjs.com) | A complete API map of all Babylon.js classes |
| [**BabylonJS Playground**](http://babylonjs-playground.azurewebsites.net) |&nbsp; On-line white-boarding and basic scene testing site |
| [**BabylonJS Sandbox**](http://www.babylonjs.com/sandbox) | On-line site for testing .babylon files exported from modelers |

## Scene File Layout ##

Although we have another tutorial that covers basic scenes, I would like you to now EXAMINE a basic Babylon.js scene file.&nbsp; So here we go:

![](http://urbanproductions.com/wingy/babylon/misc/codepic04.jpg)

That is a BIG picture, isn't it?&nbsp; This is a complete Babylon.js scene, using the 'single HTML file' method.&nbsp; This is not the only (or best) method of setting up a scene, but it is fast and easy.&nbsp; I have colored important sections of 'the big picture' and we will now examine each section individually.

### The External Includes - Red Section ###

'Includes' is not necessarily the best term to describe the red section of the big picture, but I will be using that term often in this tutorial.&nbsp; Three external Javascript files are being included into this scene.

The first external include is hand.minified-1.2.js (often simply called hand.js) - a small Javascript framework that assists the Babylon.js cameras.

The next is cannon.js - an optional physics 'engine' that allows WebGL shapes (meshes) to act like real life objects.

After that comes oimo.js - a different physics 'engine' that performs a similar function to cannon.js, but is generally faster although it lacks some of the more advanced features present in cannon.js.

Most important, though, is the Babylon.js framework, our pride and joy.

Each of these includes are JavaSCRIPT files, and so they are included-in by using HTML `<SCRIPT>` elements/tags.&nbsp; The shown 'src' (source location) of these files is at the Babylon.js web site folders, but later I will tell you how to put these files on your home hard drive if you wish, and include them from there.&nbsp; They load-in faster when they are 'local', but you will need to change the 'src' URL once you have saved them locally.&nbsp; I will show you how to do that soon.

### The CSS Styles - Blue Section ###
&nbsp;Notice the blue section of the big picture.&nbsp; That is the CSS (Cascading Style Sheets) styles used to present the scene's web page,&nbsp; and adjust its WebGL canvas to be centered and filled-out nicely in your browser.

Someday, you may want to 'externalize' these styles by placing them in a separate file, possibly called styles.css.&nbsp; Then you could remove the blue section from this HTML file, and use a HTML LINK element/tag to include-in that separate CSS style document.&nbsp; I will not be telling you how to do that, but there are plenty of documents on the web that will show you how.&nbsp; It is very easy.

### The Internal Include - Green Section ###

Here is the fifth HTML SCRIPT element/tag in the big picture scene file.&nbsp; We used 4 SCRIPT elements/tags to do the external includes.&nbsp; This one is an INTERNAL include.&nbsp; Notice that it has no 'src' URL.&nbsp; That is because it is a section of Javascript code that YOU have written directly into this document.&nbsp; Yes, YOU.&nbsp; Now you are a Javascript programmer!

You could 'externalize' the entire green section, and possibly place it into a file called... 'myJavascript.js'... maybe in a folder called 'jsfolder'.&nbsp; Then you could remove the green section, and add one more EXTERNAL INCLUDE script element/tag that might look like this:
``` html
<script src="./jsfolder/myJavascript.js"></script>
```
You need not concern yourself with that, at this point.&nbsp; Externalizing your Javascript is often done when you have written LOTS of Javascript code.&nbsp; Externalizing your code into separate files helps your project be organized, but it is not necessary this early in your webGL adventures.

The JS code you see inside the green section... will be talked about soon.&nbsp; Mainly, I would like you to study the big picture, and see how the single HTML file method of creating Babylon.js scenes... is structured.&nbsp; I want you to try to visualize and somewhat memorize... this scene file's 'layout'.

### The createScene() Function - Purple Section ###
The purple section of the big picture... is the createScene() 'function'... a Javascript 'function'.&nbsp; It is the most important section of a 'single HTML file' Babylon.js scene.&nbsp; You are not required to use a createScene() function in your Javascript code, but please do... in these early days of your webGL learning.&nbsp; I have some magic to show you... which is available if you keep most of your scene code... inside a function called createScene().&nbsp; (Like the one shown in the big picture.)

Inside the createScene() function (the purple section)... we will be doing the actual Babylon.js commands and directives that cause beautiful webGL to happen.&nbsp; The rest of the big picture sections... are simply helpers and preparations... for the fantastic purple section... the createScene() function.&nbsp; Remember its name, because I will be mentioning it often in many Playpen Series tutorials.&nbsp; It will become your best friend.&nbsp; This I can promise.

## A Visit to The Playground ##
We have worked hard and learned much, so we deserve some playground time, at the Babylon.js Playground web site.&nbsp; Here is a scene that I once created and then saved... at the playground:

## BabylonJS Playground ##

You might want to open that playground scene in a new window or new tab, so you can switch back and forth between here and there.

See the 'createScene' function in the left-side code editing window?&nbsp; Does it look familiar?&nbsp; It is the very same code from the purple section of the big picture (but with a couple of word-wrapped lines).&nbsp; Now you can see why the createScene function is an important section.&nbsp; It is somewhat portable.&nbsp; You can copy createScene functions to/from the playground editor, and to/from your home scene files.

Let's pretend that you have been working on a scene file at home, and after many tries, you just cannot get it to work properly.&nbsp; You could copy your home createScene function, then visit the playground, press its **CLEAR** button to empty its editor window, and then paste YOUR createScene function into the editor. Press the playground's **RUN** button and see if it works.&nbsp; If it does not work, you can do some changes in the editor window, and hit **RUN** again... and again, and again.&nbsp; Experiment with it there, and if you still cannot get it to work, you can press the **SAVE** button.&nbsp; When you do that, the playground will give your scene a unique URL.&nbsp; It will look something like this:

http://babylonjs-playground.azurewebsites.net/#QKQHS

Now you can bookmark that unique URL, and then visit the Babylon.js forum at:

http://www.html5gamedevs.com/forum/16-babylonjs/

There, you can start a new topic, tell everyone the URL to your broken playground createScene function, and ask others if they will please visit your playground scene and help you get it working correctly.&nbsp; 

This is called white-boarding.&nbsp; It is an easy way to allow many people to work on your createScene function and help you figure out what is wrong.&nbsp; See how the createScene function is 'portable'?&nbsp; You took it from your home, to the playground, then played with it there for awhile.&nbsp; Then, if needed, you clicked the playground's **SAVE** button, which gave it a URL.&nbsp; &nbsp;Then you went to the forum and showed that URL to others, and asked for their help.&nbsp; Handy, huh?&nbsp; We think so.

## More About The Playground ##
Once again let's visit the saved playground scene that I sent you to, above.

http://babylonjs-playground.azurewebsites.net/#QKQHS

This time, I would like you to press the **Get .zip** button.&nbsp; The playground will open a small panel allowing you to download this scene.&nbsp; Save the zip file in some new empty folder on your home computer.&nbsp; Now use an UNZIP utility program to unzip it.&nbsp; Notice that there is one file in the folder, called index.html.&nbsp; Please load that file into a text editor or programming editor.&nbsp; Does it look like the big picture above?&nbsp; Sure it does.&nbsp; ANY scene from the Babylon.js playground, including its pre-installed demo scenes, can be brought to your home with the **Get .zip** button.&nbsp; Most of them will look very similar to the big picture, above.

There is a tutorial for the Babylon.js playground.&nbsp; Just [**click here**](http://doc.babylonjs.com/page.php?p=22631).

Wow, this is a lot of information, isn't it?&nbsp; You have learned what a scene file (the big picture) looks like, you have learned about its important createScene() function and how copy'n'paste portable it is.&nbsp; You have seen a createScene() function in the Babylon.js playground, and you have been introduced to the playground's RUN, SAVE, and Get .zip buttons.

You are becoming a Babylon.js TOOLS expert.&nbsp; When I say 'tools', I mean... you have learned the things that SUPPORT the createScene() function.&nbsp; Are you ready to engage in learning some things about the code that is used in a createScene() function?&nbsp; I knew you were.

## Diving into createScene() ##
&nbsp;
I would like you to visit the Babylon.js Playground once again (open in a new window or new tab, if possible), but this time we will visit its base URL at:

http://babylonjs-playground.azurewebsites.net

Notice the button that is currently labeled **Basic Scene**.&nbsp; (It is actually called the Scene Selector button, but it is currently LABELED 'Basic Scene')

Click on it, please.&nbsp; Notice that there is a wide variety of pre-installed scenes (createScene functions).&nbsp; Feel free to select any of them.&nbsp; Tour them, drag your pointer around on them, and even change the code in the editor and hit **RUN** again.&nbsp; You cannot damage the pre-installed scenes, even if you hit **SAVE**.&nbsp; You are safe in a playground of Babylon.js scenes, and you can see MANY createScene functions in action.&nbsp; You can play with their settings and hit Run again - fun.&nbsp; And again, you can use the **Get .zip** button on any of these playground demos, and take copies of them for your home collection.&nbsp; Handy, yes?

Now for the good stuff.&nbsp; Every createScene() (every scene)... in Babylon.js... generally REQUIRES three things.

**1. A Camera.**&nbsp; The three most commonly used TYPES of cameras... are ArcRotateCamera, FreeCamera, and TouchCamera.&nbsp; There are many types of camera available in Babylon.js, but these three are the most common.&nbsp; ANY number of cameras can be coded into a scene, but only one of those cameras... is the 'active camera'.&nbsp; We have a tutorial in our Playpen Series... dedicated to talking about cameras.

**2. A Light.**&nbsp; &nbsp;There are 4 basic types of lights available in Babylon.js.&nbsp; They are PointLight, SpotLight, DirectionalLight, and HemisphericLight.&nbsp; ANY number of lights can be coded into a scene,&nbsp; but only the first 4 lights in the scene's lights list... will be used by the scene.

To be honest, a light is not an absolute requirement.&nbsp; If the mesh in a scene... all have a material.emissiveColor or material.emissiveTexture properly set, then they will each produce their own light.&nbsp; They will be 'self-illuminated'.&nbsp; Careful, it is easy to get lost in a scene without a light.&nbsp; Good advice would be to ALWAYS have one light (a HemisphericLight aimed to the sky, is a very handy wide-lighting tool).&nbsp; You can adjust its .intensity value to set its brightness.&nbsp; We have a tutorial in our Playpen Series... dedicated to talking about lights.

**2. A Shape.**&nbsp; A shape is also called a **mesh**.&nbsp; Every scene needs something to be viewed, right?&nbsp; Cameras are invisible, and so are lights.&nbsp; Every scene needs a mesh, or many.&nbsp; There is no limit to the number of mesh in your scene.&nbsp; A mesh can be one of the many shapes that are built-in to Babylon.js, or it can be a shape that you plotted yourself using Babylon's VertexData system, or it can be a mesh that has been 'imported' into the scene... from a modeling package such as Blender or 3D Studio Max.

You can learn many more things about Babylon.js scenes... in the other [tutorials and documentation](http://doc.babylonjs.com/).&nbsp; And don't forget to look at the 'createScene()' functions of the playground's pre-installed demo scenes.&nbsp; The Babylon.js playground is a learning wonderland, and it is a whole lot of fun, too.

## Babylon.js Objects, Properties, Methods, and Values ##

You have seen some createScene functions, and you have noticed that much of the Javascript code used to make a Babylon.js scene... sets values on object properties.&nbsp; To illustrate what I mean:

``` javascript
object.property = value;
```
Let's talk more about these four things... objects, properties, methods, and values.

**Objects**

First, do not think of objects as 3D shapes/mesh.&nbsp; Those ARE objects, but here, we are talking about...&nbsp; 

**Javascript Objects**

Some of the common Javascript objects used in a Babylon.js scene... are named **engine, scene, canvas, mesh, light, camera, Vector3, Color3, ActionManager, and Animation**.&nbsp; 

For example, each of the following code lines... creates a Javascript object (or more):

``` javascript
// Create a BABYLON.Engine type of object.
var engine = new BABYLON.Engine(canvas, true);

// Creates a BABYLON.Scene type of object.
var scene = new BABYLON.Scene(engine);

// Creates a BABYLON.FreeCamera type of object
var camera = new BABYLON.FreeCamera("freecam", new BABYLON.Vector3(0, 0, 5), scene);

// Creates a BABYLON.DirectionalLight type of object
var light = new BABYLON.DirectionalLight("Dir0", new BABYLON.Vector3(0, -1, 0), scene);

// Creates a BABYLON.Mesh type of object
var mybox = BABYLON.Mesh.CreateBox("box", 6.0, scene);
```
You get the idea.&nbsp; Javascript objects, are used often in Babylon.js scenes.&nbsp; Sometimes you will create them, and other times you will get a 'reference' or 'handle' to an object that was created earlier.&nbsp; Getting a reference/handle to a Javascript object, essentially means opening a communication line to an already-built object.

Each of these Javascript objects have named 'pockets' to store things-within.&nbsp; Often, values, data, and objects... get stored in those pockets.&nbsp; These value-storing pockets are called object 'properties'.&nbsp; Properties are commonly 'set' (putting a value INTO the pocket), and often 'get' (looking into the pocket to see what's there).

**Properties**

Properties store values.&nbsp; These values are used by the Babylon.js framework... to 'render' the scene.&nbsp; Here is an example:

``` javascript
light.intensity = 0.5;
```
Here, we 'set' the property named 'intensity' on the object called 'light' to a value of 0.5 (0.5 is called a FLOATING POINT value, or just 'a float').&nbsp; We'll talk about values, shortly.&nbsp; The main thing I want you to notice is that the property (pocket) had a NAME... .intensity, and we stored the value 0.5 into that pocket (on the object named 'light').

**Methods**

The other common type of 'pocket' on a Javascript object... is called a 'method' (sometimes called a 'function').&nbsp; Methods are used to store Javascript code onto Javascript objects.&nbsp; Earlier, I said that properties are 'set'.&nbsp; Well, methods are 'called'.&nbsp; Here is the way a method is 'called'.

``` javascript
scene.getMeshByName("box");
```
Here, we have 'called' the getMeshByName() method that is located on the object called 'scene'.&nbsp; See that "box" thing inside the parentheses?&nbsp; That is called a 'parameter' or sometimes called an 'argument' or just... 'an arg'.&nbsp; Some methods require one or more parameters inside the parentheses, and some require none at all.&nbsp; If you look at your createScene function (method) from the big picture above, it had empty parentheses.&nbsp; It did not require any parameters in order to be called.&nbsp; At other times, you might see createScene(engine).&nbsp; In this case, the createScene method DOES require a parameter...&nbsp; a Javascript ENGINE-type of object.

It is beyond the scope of this tutorial to teach everything about callable methods and settable properties on Javascript objects.&nbsp; The main thing is to try to take notice WHEN a 'pocket' on an object... is a property, and when it is a method.&nbsp; Methods always use parentheses... sometimes empty, sometimes full of parameters/args.&nbsp; Properties never use parentheses and therefore never require parameters.

Sometimes, methods are used to SET values of properties, and sometimes methods are used to GET values of properties.&nbsp; These methods/functions are often called GETTERS and SETTERS.&nbsp; Notice the word 'get' in the getMeshByName method above?&nbsp; It is a GETTER method.&nbsp; Here is a more proper use of that 'call':

``` javascript
var box_I_made = scene.getMeshByName("box");
```
This call is getting a reference/handle on a box that was made earlier in the code, and putting that reference into a variable called 'box_I_made'.&nbsp; After you get that reference, you can do things to the box... like set property values.
``` javascript
box_I_made.rotation.y = Math.PI/2;&nbsp; // Rotate the box 90 degrees on the Y-axis.
```
It is difficult for me to explain, but actually quite easy to do, thanks to Babylon.js.&nbsp; Experimenting with properties and methods... is the fastest way to learn.

**Values**

Values... are often the things that are stored in an object's properties ('pockets') and the things that are returned when GETTER methods are called.&nbsp; As crazy as this sounds, all values are Javascript objects.&nbsp; Remember that 0.5 float that we saw earlier?&nbsp; That is a Floating Point&nbsp; NUMBER OBJECT.&nbsp; The 'box_I_made' variable above... it is a MESH OBJECT.&nbsp; The names of mesh, cameras, and lights... are STRING OBJECTS. Objects are everywhere, but they are good friends that help us stay organized.

There are two types of value objects that are very common in Babylon.js.&nbsp; They are the Vector3 value, and the Color3 value.&nbsp; Vector3 and Color3 values... deserve to have their own section in this giant tutorial.&nbsp; Here we go...

## Vector3 and Color3 Values ##

Two of the most-used values in Babylon.js, are Vector3 values and Color3 values.

### Vector3 Values ###
Vector3 values take the form of...
``` javascript
BABYLON.Vector3(xValue, yValue, zValue)
```
They are often used to set/store...

- the value of a .position property on mesh, light, or camera objects
- the value of a .rotation property on a mesh object
- the value of a .scaling property on a mesh object
- the value of a .direction property on a light object

The three 'parameters' inside the parentheses of a Vector3 value... are floats.&nbsp; They can be negative or positive, and there is no practical limit to the size of those values.&nbsp; Let's look at a Vector3 being used to set the .position of a mesh.

``` javascript
box.position = new BABYLON.Vector3(0, 10, 0);
```
The xValue is 0, meaning that the box is positioned in the center of the x-axis.&nbsp; The yValue is 10, meaning that the box is positioned 10 units above the center of the y-axis.&nbsp; The zValue is 0, meaning that the box is positioned in the center of the z-axis.&nbsp; Easy.&nbsp; We will talk more about positioning... further below.&nbsp; 

Now let's look at a Vector3 being used to set a .rotation value:

``` javascript
box.rotation = new BABYLON.Vector3(Math.PI/4, 0, 0);
```
Here, our box is being rotated around the x-axis... about 45 degrees.&nbsp; In Babylon.js, rotation is measured in radians.&nbsp; Math.PI/4 is approximately .707 radians.&nbsp; To rotate 90 degrees, it would be Math.PI/2, or about 1.57 radians.&nbsp; For 180 degrees, it would be Math.PI, or about 3.14 radians.&nbsp; To rotate 360 degrees, it would Math.PI times 2, or about 6.28 radians.

Keep in mind that Vector3 values can be negative numbers as well.&nbsp; So you could easily use -Math.PI/4, -Math.PI/2, -Math.PI, and -Math.PI times 2.&nbsp; These values would rotate the object in the opposite direction around the x-axis.&nbsp; How about this Vector3 rotation:
``` javascript
box.rotation = new BABYLON.Vector3(Math.PI/2, 0, -.707);
```
If you think that it rotates our box in a positive (+) direction 90 degrees around the x-axis, AND ALSO rotates our box 45 degrees in a negative (-) direction around the z-axis, you would be correct.&nbsp; 

Even though Vector3 values can contain very large negative or positive numbers, it is rarely necessary for any xValue, yValue, or zValue... to be outside the range of -6.28 to +6.28 **for setting rotations**.&nbsp; Any numbers outside that range would be unnecessary, because -6.28 (radians) rotates 360 degrees in one direction, and +6.28 (radians) rotates 360 degrees in the opposite direction.&nbsp; That's a full range of rotation, isn't it?&nbsp; We'll talk a bit more about rotation, further below.

Now let's see a Vector3 used for scaling (stretching and shrinking) a mesh:

``` javascript
box.scaling = new BABYLON.Vector3(1, 1, 3);
```
Scaling is a way to shrink or stretch a mesh along any of the 3 scene axes.&nbsp; In the above example, the xValue (1) indicates that no scaling change to the mesh along its x-axis... is desired.&nbsp; The yValue of 1 indicates that we want no change in scaling along the y-axis, either.&nbsp; The zValue of 3 indicates that we we are 'stretching' our mesh along its z-axis... to 3 times its normal size.&nbsp; Easy, right?&nbsp; You bet!&nbsp; 

I will talk more about scaling... further below.

Another use for a Vector3 value... is setting the .direction for certain types of lights:

``` javascript
mySpotLight.direction = new BABYLON.Vector3(0, -1, 0);
```
Generally speaking, when a Vector3 value is used to set a DIRECTION, the xValue, yValue, and zValue are each in a range of negative 1... to positive 1.&nbsp; In the example above, our light is aimed negative on the y-axis... or... straight down.&nbsp; Directions (directional vectors) are used for more things than just lights, but lights is a common use.&nbsp; Directional vectors are not always easy things to determine the x, y, and z parameters/values for.&nbsp; We have some helpful tools on our lights... that will assist you in setting directions.&nbsp; You will learn about those tools in our lights tutorial.
&nbsp;
### Color3 Values ###
Color3 values look very much like Vector3 values.&nbsp; Here is an example:
``` javascript
BABYLON.Color3(rValue, gValue, bValue)
```
The rValue is for red, the gValue is for green, and the bValue is for blue.&nbsp; I bet you have already figured out that Color3 values are used for setting colors.&nbsp; The rValue, gValue, and bValue, all contain float numbers in the range of 0 to 1.&nbsp; Let's look at a few examples:
``` javascript
BABYLON.Color3(1, 0, 0) - red
BABYLON.Color3(0, 1, 1) - cyan
BABYLON.Color3(0, 1, 0) - green
BABYLON.Color3(1, 0, 1) - violet
BABYLON.Color3(1, 1, 0) - yellow
BABYLON.Color3(0, 0, 0) - black
BABYLON.Color3(1, 1, 1) - white
BABYLON.Color3(0.5, 0.5, 0.5) - medium gray
BABYLON.Color3(0.2, 0, 0.2) - dark purple
```
&nbsp;
Not so difficult.&nbsp; Let's say that you wanted to put a color on a box that you have already created.&nbsp; The first thing you do is create a Javascript object called a StandardMaterial.&nbsp; Then you would apply (set) that StandardMaterial as the box's .material property.&nbsp; This is covered by our Materials tutorial, but let's look at how that is done, here.

``` javascript
var myMaterial = new BABYLON.StandardMaterial("mymat", scene);
myBox.material = myMaterial;&nbsp; 
```
The first line creates a StandardMaterial and puts it into the variable named myMaterial.&nbsp; The second line sets the box's .material property... to be that newly-made StandardMaterial.&nbsp; The appearance of the box will not change yet, because we have not given the StandardMaterial any information about what color we want the box to be.&nbsp; 

One of the many properties on a StandardMaterial object... is named .diffuseColor.&nbsp; That property is the primary way to set a basic color.&nbsp; And right here... is where we use our new Color3 value.&nbsp; Let's have a look:
``` javascript
myMaterial.diffuseColor = new BABYLON.Color3(0, 0.5, 0);
```
Our box is now colored medium green.&nbsp; It's just that easy.&nbsp; The StandardMaterial object has many other properties on it.&nbsp; You can add color to properties such as&nbsp; .specularColor, .emissiveColor, .ambientColor.&nbsp; All those properties are set (if you choose)... using our friend... the Babylon.js Color3 value.

Another use of the Color3 value is to set the .diffuse property of lights.&nbsp; Take careful note that the name of this property is .diffuse, and not .diffuseColor.&nbsp; Lights use a property named .diffuse to set their primary color.&nbsp; Let's take a look at how to set the primary color of a light that you have already created:

``` javascript
myLight.diffuse = new BABYLON.Color3(0.5, 0, 0);
```
And there we go.&nbsp; We have colored the light beam that emits from our light... to be medium red.&nbsp; There is one more use for a Color3 value, and that is on one of our newest basic shape objects... called a LINES object.&nbsp; A LINES object does not use a StandardMaterial object for its color.&nbsp; It uses a property called .color.&nbsp; Here is an example of a LINES object being created, and then colored:

``` javascript
// Creation of a triangular lines mesh
var myLines = BABYLON.Mesh.CreateLines("itsName", [
&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; new BABYLON.Vector3(-5, 0, 5),
&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; new BABYLON.Vector3(5, 0, 5),
&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; new BABYLON.Vector3(0, 0, -5),
&nbsp;&nbsp; &nbsp;&nbsp; &nbsp; new BABYLON.Vector3(-5, 0, 5)
], scene);

// And here is how it is colored green...
myLines.color = new BABYLON.Color3(0,1,0);
```
The creation of the lines object was a bit strange, but it sure was easy to make it green, using a Color3 value.&nbsp; You will learn more about the lines mesh.... in our Basic Elements tutorial.&nbsp; For now, I just wanted to show you that it does not use a .diffuseColor property like a box with a StandardMaterial applied, nor a .diffuse property like we used for coloring light beams.&nbsp; It, instead, uses a property called .color.&nbsp; Simple.


## My New Friends - .position, .rotation, and .scaling&nbsp; ##

As you toured the Babylon.js Playground demo scenes, you surely saw some .position, .rotation, and maybe some .scaling properties being 'set' with values.&nbsp; Let's take a look at each one:

**POSITION** - Also called translation, every mesh is POSITIONED in a scene using X, Y, and Z settings.&nbsp; You can think of the .position property... as the mesh's LOCATION.&nbsp; The link below... is a saved playground scene that illustrates using a mesh's .position property.&nbsp; Try to open it in a new window or new tab, so you can jump back and forth between this tutorial... and the playground scene:

http://babylonjs-playground.azurewebsites.net/#35CPC

In the yellow text at the top of the scene, you will see the Babylon.js one-line way to set mybox.position (using our friend... the Vector3 value object).

Below that, in green text, you will see 3 more lines of Babylon.js code.&nbsp; You see, you are NOT required to use a Vector3 to set a .position on a mesh.&nbsp; You can use the '**discrete**' way, instead.&nbsp; Loosely defined, 'discrete' means... piece by piece... one step at a time.&nbsp; If you would like to set a mesh's .position values axis by axis, feel free to use the handy green 'discrete' ways of doing it.

Watch this positioning demo scene for some time, if you please.&nbsp; It will not take long for you to completely understand mesh positioning.&nbsp; 

**ROTATION** - Every mesh is ROTATED in a scene... by setting the amount of spin around the shape's X, Y, and Z axes.&nbsp; Picture a box with a rod stuck through every side and coming out the opposite side.&nbsp; There are 6 sides to a box, so there would be 3 rods, an X rod, a Y rod, and a Z rod.&nbsp; Rotation is the amount (and direction) of spin... AROUND each of these invisible rods.&nbsp; 

Let's take a look at a playground scene that I once created and saved.&nbsp; In this demo, I made those invisible rods... be visible:

http://babylonjs-playground.azurewebsites.net/#YIT1S

Take some time to carefully watch that scene.&nbsp; Like the last demo scene, the yellow text shows a Vector3 being used to set the .rotation property with some computer-generated values.&nbsp; The box is shown doing positive and negative rotations around each of the 3 axes.&nbsp; Under the yellow text... you again see the green text...&nbsp; showing the 3 'discrete' ways to set the box's .rotation property with values.&nbsp; I bet you understand this completely, don't you?&nbsp; Easy.

**SCALING** - Scaling... is stretching or shrinking... along any of the 3 scene axes.&nbsp; Let's jump right into a saved playground scene that demonstrates scaling:

http://babylonjs-playground.azurewebsites.net/#1VMQNH

Again, take some time to watch the scene.&nbsp; And once more, the yellow text shows the one-line Vector3 way of setting a mesh's .scaling, or you can use one or more of the discrete ways of setting scaling... shown in the green text. You may have noticed that scaling values are never negative.&nbsp; It would be illogical to use a negative scaling value, and if you decide to use some negative values, unexpected results may occur.

I would like you to take note... that scaling is **for mesh only**.&nbsp; For example, you can POSITION a mesh, camera, or light.&nbsp; You can often ROTATE a mesh, camera, or light.&nbsp; But SCALING... is for mesh.&nbsp; If you stretch or shrink (scale) a camera or light, you will break its electrical parts.&nbsp; (It's a joke, ok?)&nbsp; &nbsp;There is no reason to set scaling for a camera or light.&nbsp; They are invisible scene items.

## Quick Downloading 'The Big 4' Externals ##

Remember 'The Big Picture' far above?&nbsp; In that section, I introduced you to 'The Big 4' external include files...&nbsp; hand.js, cannon.js, oimo.js, and babylon.js.&nbsp; Many people use GitHub version-management systems to download those files from the Babylon.js GitHub source code repository.&nbsp; Some people make their own 'minified' versions of Babylon.js... using the absolute latest source code files.&nbsp; Others like to be able to grab reasonably fresh versions of The Big 4... in simpler ways.

When you click Get .zip at the Babylon.js playground, you get a zip that contains a file called index.html.&nbsp; If you examine index.html in a text editor, you will see a file that looks very much like The Big Picture far above.&nbsp; Look at the external includes section... the first four HTML SCRIPT elements/tags.&nbsp; The .src attribute within each of those SCRIPT elements... point to URL's located at the Babylon.js web site.

If you want to make your home demo scenes run faster, you can download copies of the external includes... and put them into a folder.&nbsp; That folder should be located WITHIN the folder that holds your index.html.&nbsp; For example, in the same folder as index.html, you could create a folder called 'js' (no quotes).&nbsp; Inside the js folder, you could put home copies of The Big 4 external include files.

Once you have that folder made, you can use the 4 links shown below... to get copies of The Big 4... and put each of them into your js folder.

[**hand.js**](http://www.babylonjs.com/hand.minified-1.2.js)&nbsp; <= right-click... save link/target

[**cannon.js**](http://www.babylonjs.com/cannon.js)&nbsp; <= right-click... save link/target

[**oimo.js**](http://www.babylonjs.com/oimo.js)&nbsp; <= right-click... save link/target

[**babylon.js**](http://www.babylonjs.com/babylon.js)&nbsp; &nbsp;<= right-click... save link/target

Store each of those files into the new js folder.&nbsp; Also, you might want to copy them to some other folder as well, for using later.&nbsp; Try to remember to repeat these actions fairly often, maybe once per month, to ensure that you are always using a reasonably fresh version of The Big 4 files.&nbsp; Babylon.js is always evolving.&nbsp; New features are being added very quickly, and you want your home versions of The Big 4... to be fresh, so you can take advantage of those new features.

Once you have those external includes saved into your new js folder, you need to make some adjustments to the HTML.&nbsp; In your index.html file, you will need to change the .src attributes of all four external includes (the first four SCRIPT elements).&nbsp; Likely, you will want to make your SCRIPT elements look like this:
``` html
&nbsp;&nbsp; &nbsp; <script src="./js/hand.minified-1.2.js"></script>
&nbsp;&nbsp; &nbsp; <script src="./js/cannon.js"></script>&nbsp; <!-- optional -->
&nbsp;&nbsp; &nbsp; <script src="./js/oimo.js"></script>&nbsp; <!-- optional -->
&nbsp;&nbsp; &nbsp; <script src="./js/babylon.js"></script>
```
If you are not using physics in your scene, you might want to remark-out (disable) the script elements that include-in cannon.js and oimo.js.&nbsp; To do that, you could do this:
``` html
&nbsp;&nbsp; &nbsp; <script src="./js/hand.minified-1.2.js"></script>
&nbsp;&nbsp; &nbsp; <!-- <script src="./js/cannon.js"></script> -->
&nbsp;&nbsp; &nbsp; <!-- <script src="./js/oimo.js"></script> -->
&nbsp;&nbsp; &nbsp; <script src="./js/babylon.js"></script>
```
Easy.&nbsp; Most of these things you already know, don't you?&nbsp; I thought so.

## Hey, you made it! ##

You are finally at the bottom of this tutorial.&nbsp; It was a long, but fun trip, wasn't it?&nbsp; Things will be easy from now on.&nbsp; The next tutorial in the Playpen Series tutorials... is about building a very basic scene.&nbsp; I think it will be quite easy and fast, for you.&nbsp; You have graduated from tutorial #0... this tutorial.&nbsp; You are already a Babylon.js expert.