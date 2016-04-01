---
ID_PAGE: 22691
PG_TITLE: Render Scene on a PNG
---
# Why is it better than "ctrl + prt scr" screenshot?

With a ctrl + print screen you can't make screenshot with higher resolution than your screen resolution. With BabylonJS screenshot feature you can, there is no problem with creating a 1920x1080 screenshot on a 800x600 screen (provided the graphics card is powerful enough to compute it).
Another cool aspect of using this feature, is that you can use a non active camera to make the screenshot, so you can create many screenshots, without switching beetween your different cameras!

# How can we do it?

Simply by calling this method: `BABYLON.Tools.CreateScreenshot(engine, camera, size),`
You need to provide your BabylonJS engine, and the camera you want to use for the rendering.
The size parameter could be like this:

* If you need a square screenshot (ratio 1:1) simply use this: `size = 512;`.

![size = 512 HillValley render](http://pix.keuse.fr/images/screencdc.png)

* If you want to have a custom width and height (like 600x400) use this: `size = { width: 600, height: 400};` if you provide only one parameter, it will compute the missing one to keep canvas ratio.

![600x400 HillValley render](http://pix.keuse.fr/images/screenvwv.png)

* If you just want to keep your canvas ratio, with more or less precision: `size = { precision: 2 }` (in this example a 800x600 canvas will give you a 1600x1200 screenshot).
Example with precision 0.5 on my computer (the result is 960x503):

![HillValley render with precision of 0.5](http://pix.keuse.fr/images/screenhsh.png)

The result will be automatically downloaded if your browser supports it, otherwise it will be displayed on a new tab, it will be in any cases a PNG picture. **This feature does not support antialiasing for now !**

Just for fun here is render of Hill Valley using 3840x2160 resolution (4K).

![4K render of Hill Valley](http://pix.keuse.fr/images/screenjqj.jpg)