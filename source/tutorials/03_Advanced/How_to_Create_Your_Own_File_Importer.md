---
ID_PAGE: 22491
PG_TITLE: How to Create Your Own File Importer
---
By default, babylon.js comes with an importer for .babylon files.

You can also create your own importer by providing a specific object to the ```BABYLON.SceneLoader.RegisterPlugin``` function.

This object must have three properties:

* A list of supported file extensions (```extensions```)
* An ```importMesh``` function to import specific meshes
* A ```load``` function to import complete scene

Here is a sample importer object:
```javascript
    BABYLON.SceneLoader.RegisterPlugin({
        extensions: ".babylon",
        importMesh: function (meshesNames, scene, data, rootUrl, meshes, particleSystems, skeletons) {
            return true;
        },
        load: function (scene, data, rootUrl) {
            return true;
        }
    });
```

* ```meshesNames``` is the names of meshes to import
* ```scene``` is the scene to load data into
* ```data``` is the string representation of the file to load
* ```rootUrl``` defines the root URL of your assets
* ```meshes``` is the list of imported meshes
* ```particleSystems``` is the list of imported particle systems
* ```skeletons``` is the list of imported skeletons
