---
ID_PAGE: 22631
PG_TITLE: The Playground Tutorial
---
Introducing...

# The BabylonJS Playground!

![](http://urbanproductions.com/wingy/babylon/misc/playground02.jpg)
A Saved 'Custom' Playground Scene: http://babylonjs-playground.azurewebsites.net/#QKQHS

## What is it?

The BabylonJS Playground is an on-line white-boarding and experimenting application... used to assist in creating scenes for the Javascript-based BabylonJS webGL framework.&nbsp; Your browser must be WebGL-ready and have Javascript active... in order to use the playground.&nbsp; &nbsp;Most modern browsers have these capabilities.

Briefly said, you can enter or modify Javascript-based BabylonJS scene code on the left-side 'editor' portion of the playground, press the Run button, and the playground will attempt to render the webGL scene on the right side, using the latest version of the BabylonJS framework.

## The Top Menu
![](http://urbanproductions.com/wingy/babylon/misc/playground_tm01.jpg)

The playground's top menu currently contains 8 buttons:

**Run** - The Run button is easy to understand. After you paste-in code to the editor, or after you make changes to the code in the editor, you press **Run**.&nbsp; This commands the playground to try to render your scene.

**Save** - The Save button will cause your scene to be permanently stored in the playground's database, and it will issue a unique URL, which we will talk more about, below.&nbsp; Don't worry about accidentally overwriting any of the pre-installed demo scenes in the playground.&nbsp; That is not allowed to happen. Often, the **Save** button is used so that you may share the scene's URL with others, or to allow you to bookmark the saved URL in your browser, and return to continue your 'play' at another time.

**Get .zip** - The Get .zip button is a handy playground feature. If you wish to take your scene home, publish it on a web server, or hand it out to others, THIS is your button.&nbsp; **Get .zip** attempts to install your editor code into a single index.html file, and puts that file into a zip called sample.zip.&nbsp; Then it offers the sample.zip file to you, for downloading.&nbsp; Once downloaded and unzipped, you will see the file named index.html.&nbsp; You can browse this file with a webGL-ready browser, and your scene should render nicely in your browser.&nbsp; After you are sure that your index.html file is working properly, you may want to publish it to a web server and share your beautiful playground scene with the entire world.&nbsp; There is no need to install framework files such as babylon.js and hand.js in nearby directories, because the index.html file references the same on-line versions of the framework... as the playground itself uses.&nbsp; The index.html file is ready-to-run and completely portable.&nbsp; (We love it!)

**New** - The New button is a unique and handy feature. If you look carefully at the editor code in the picture above, or if you have selected one of the pre-installed playground scenes from the drop-down scene selector, you will notice that they are 'wrapped' in a function called 'createScene()'.&nbsp; The createScene() function is a very common function used in many BabylonJS scenes.&nbsp; Copying and pasting createScene() functions is done often with users of the BabylonJS framework.&nbsp; By pressing this button, you will empty the contents of the editor, and a basic un-programmed createScene() function will be placed in the editor.&nbsp; A camera is provided by default, but you may want to add some light and mesh, so the new scene becomes renderable.

**Clear** - The Clear button is also easy to understand. This button simply empties all the code out of the playground editor.&nbsp; It is often used in preparing for the pasting-in of a createScene() function, or in preparation for some experimenting that you are about to embark-upon.&nbsp; The BabylonJS playground is a fantastic way to create experiments using the BabylonJS framework.&nbsp; It is a wonderful way to learn.

**Font size** - The Font size button almost needs no explaining. This button and resulting pull-down selector allows you to adjust the font size of the code in the playground editor.

**Scene Selector** - This pull-down selector button (shown as 'Custom' in the picture above)... is used to select any of the pre-installed playground demo scenes.&nbsp; 'Custom' is not the name of any of those demo scenes.&nbsp; The reason that it says 'Custom' is because the scene in the editor at the time that the picture was taken... was a 'custom' scene.&nbsp; It was a modified Basic Scene demo that I created for use in the picture.&nbsp; Often, when you first arrive at the playground site, this button will be labeled 'Basic Scene'.&nbsp; No matter what label is currently on the button, the button is called the **Scene Selector** button.

**Fullscreen** - The Fullscreen button also needs very little explaining. This button causes the right-side rendering canvas to go into fullscreen mode.&nbsp; Upon entering fullscreen mode, your browser will provide instructions about how to exit fullscreen mode and return to the playground's default split-screen mode.

## The Editor
![](http://urbanproductions.com/wingy/babylon/misc/playground_ed02.jpg)

The playground's left-side code editor is a 'smart' editor which is based-upon [the Ace Editor](http://ace.c9.io/).&nbsp; The playground editor has many fantastic features.&nbsp; It uses type-ahead features such as automatically adding matched quotes, parentheses, braces, and brackets... handy things for a programming editor.&nbsp; It tries to spot programming errors, and places little icons along the left side when it sees potential syntax problems.&nbsp; If you place your mouse pointer over these little icons that sometimes appear, the editor will pop-up a small window telling you about what it has seen.&nbsp; The editor also has syntax highlighting, code-folding, text drag-and-drop, automatic indent and outdent, and a 4 million line capacity. Telling of the many features of our editor... is beyond the scope of this tutorial.&nbsp; You can learn more about the wonderful Ace Editor... with [a visit to their website](http://ace.c9.io/#nav=about)... and by simply spending some time using the playground editor.

**oops** - One of the most important features in any programmer's editor... is UNDO and REDO, and our playground editor fully supports both of these features.&nbsp; I am not familiar with the undo and redo keypresses for all OS systems, but for Windows... undo is Control-z and redo is Shift-Control-z.&nbsp; You can do multiple undo and redo, as well. This is very handy, and again, we love it.

## The Rendering Canvas
![](http://urbanproductions.com/wingy/babylon/misc/playground_rc01.jpg)

What can you say about the BabylonJS webGL rendering canvas, other than "IT IS THE COOLEST THING ON THE PLANET!".&nbsp; This right-side area of the playground is where the BabylonJS webGL framework attempts to render the scene that you currently have in the editor.&nbsp; Is the rendering canvas blank?&nbsp; Did you click the Run button?&nbsp; Have you got a camera?&nbsp; Is the camera aimed correctly?&nbsp; Do you have some lighting or an emissiveColor set on your mesh's material?

If your code is wrapped in a createScene() function, does it include *var scene = new BABYLON.Scene(engine),* near the top of the function?&nbsp; How about a *return scene;* line as the last line inside the function braces?&nbsp; Do you have some mesh like a box, cylinder, ground, sphere, plane, torus, torusknot, etc?

Are you running in free-flying mode and not wrapping your code in a createScene() function?&nbsp; That is certainly allowed, but you still need a camera, a light, and a mesh shape.&nbsp; These are a few things that can prevent your scene from rendering.&nbsp; Study the playground demo scenes listed under the drop-down Scene Selector button, and soon you will be a BabylonJS playground expert.

## Compilation Errors
![](http://urbanproductions.com/wingy/babylon/misc/playground_ce01.jpg)

This is a picture of the playground's pop-up compilation error detector panel.&nbsp; A compilation error is an error detected by the BabylonJS framework... after you have clicked the Run button.&nbsp; It is not a syntax error detected by the editor, but the editor might ALSO detect it and possibly mark the problem line with a red X icon along its left side. The compilation error does not always contain pertinent information about the reason for the error, yet it is still handy.&nbsp; It tells you that the BabylonJS framework is not happy with something in your scene code.&nbsp; After making an adjustment to your code, you will want to close the compilation error pop-up (using its X closer) before clicking on Run again.

## Playground URL formats
When you first arrive at the BabylonJS playground web site, the URL in your browser's address field... will look like this:

http://www.babylonjs.com/playground/

If you choose one of the demo scenes from the drop-down Scene Selector button, the playground URL will change to this:

http://www.babylonjs.com/playground/#

(Feel free to edit the code of the demo scenes and click Run or Save. You can't damage the pre-installed demos)

When you save a scene to the playground's database in order to share the URL with others or remember the scene for later, the URL will look something like this:

http://www.babylonjs.com/playground/#QKQHS

(Be sure to bookmark it, using your browser's bookmark system)

If you save that scene again... (maybe after doing more work on the scene), the URL will increment, and look like this:

http://www.babylonjs.com/playground/#QKQHS#1

If you save that scene again... the URL will increment, and look like this:

http://www.babylonjs.com/playground/#QKQHS#2

(Again, be sure to bookmark this URL so you can easily return to it later)

And lastly, if you want to load a specific pre-installed demo scene, such as the #12 Particles demo, you can use a URL that looks like this:

http://www.babylonjs.com/playground/?12


### Maintaining Your Focus
Sometimes you will run a scene and use your cursor keys and mouse in the rendering canvas, and then want to 'focus' back to the editor... to make some more code changes.&nbsp; Sometimes, you will need to mouse-click somewhere in the editor area... to give the editor focus again.&nbsp; Once the editor has focus, your cursor keys will, once again, move the editor's cursor.&nbsp; This happens most often when a Babylon FreeCamera is the active camera.


### And... That's A Wrap
Hey, thanks for reading this tutorial and for discovering the BabylonJS playground.&nbsp; We are very proud of it, and we think you will enjoy using it.&nbsp; This tutorial is still quite new, and will likely be changing often.&nbsp; Be sure to check back for updates and future features.

### The BabylonJS Playground is located at... http://www.babylonjs.com/playground/

#### Feel free to discuss the BabylonJS Playground, or any other BabylonJS framework topic... on our forum... located at...&nbsp; http://www.html5gamedevs.com/forum/16-babylonjs/
