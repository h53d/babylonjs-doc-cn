---
ID_PAGE: 22251
PG_TITLE: 09. Using the Incremental Loading System
---
In order to support incremental loading (introduced by v1.5.0), you just have to go to [this page](https://github.com/BabylonJS/Babylon.js/tree/master/Tools/MakeIncremental) in order to get a tool to convert your .babylon file to a .incremental.babylon file alongside associated resources (_.babylonmeshdata_ and _.babylongeometrydata_ files).

These files can be used just like a standard _.babylon_ scene except that they will allow **Babylon.js** to load meshes and textures on the fly. This means that the meshes and the textures will not be loaded at startup but only when they become active (when the active camera can see them).

You have to put the _.babylonmeshdata_ and _.babylongeometrydata_ files in the same folder as the _.incremental.babylon_ file.

The Espilit demo on the [main site](http://www.babylonjs.com) uses incremental loading if you want an [example](https://github.com/BabylonJS/Samples/tree/master/Demos/Espilit).
