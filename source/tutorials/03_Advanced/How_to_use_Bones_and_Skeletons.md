---
ID_PAGE: 22421
PG_TITLE: How to use Bones and Skeletons
---
Babylon.js supports bones animations for your meshes.

![Bones](http://www.babylonjs.com/Screenshots/bones.jpg)

### Basics
Basically a skeleton (```BABYLON.Skeleton```) contains a hierarchy of bones (```BABYLON.Bone```). A bone is defined by a name, a parent (can be null) and a transformation matrix.

Here are the constructors:
```
BABYLON.Skeleton = function (name, id, scene)
BABYLON.Bone = function (name, skeleton, parentBone, matrix)
```

Inside a skeleton, bones can be found inside the ```skeleton.bones``` array.

A bone can contain [animations](http://doc.babylonjs.com/page.php?p=22081) to animate its ```matrix``` property.

### Preparing mesh
A skeleton can be applied to a mesh through the ```mesh.skeleton``` property.

You should note that babylon.js supports up to **4 bones influences per vertex**.

The mesh must also have additional vertices data:
* _Matrices weights_: 4 floats to weight bones matrices (```mesh.setVerticesData(matricesWeights, BABYLON.VertexBuffer.MatricesWeightsKind, false)```)
* _Matrices indices_: 4 floats to index bones matrices (```mesh.setVerticesData(floatIndices, BABYLON.VertexBuffer.MatricesIndicesKind, false)```)

The final matrix applied to each vertex is computed as follows:
```
finalMatrix = worldMatrix * (bonesMatrices[index0] * weight0 + bonesMatrices[index1] * weight1 + bonesMatrices[index2] * weight2 + bonesMatrices[index3] * weight3)
```

On low-end hardware, the maximum bones influences per vertex is reduced to 3.

### Loading bones
Skeletons and bones can be loaded from .babylon files (FBX and Blender exporter support bones generation).

Here is a sample of how to load a boned mesh and how to launch skeleton animation:

```Javascript
BABYLON.SceneLoader.ImportMesh("him", "Scenes/Dude/", "Dude.babylon", scene, function (newMeshes, particleSystems, skeletons) {
    var dude = newMeshes[0];

    dude.rotation.y = Math.PI;
    dude.position = new BABYLON.Vector3(0, 0, -80);

    scene.beginAnimation(skeletons[0], 0, 100, true, 1.0);
}),
```

A complete running example can be found [here](http://www.babylonjs.com/index.html?BONES)

### Cloning bones
Bones and skeletons can be cloned (This is the case with the rabbits in the previous link).

Here is a sample of how to load and clone a mesh and its skeleton:

```Javascript
BABYLON.SceneLoader.ImportMesh("Rabbit", "Scenes/Rabbit/", "Rabbit.babylon", scene, function (newMeshes, particleSystems, skeletons) {
        var rabbit = newMeshes[1];

        rabbit.scaling = new BABYLON.Vector3(0.4, 0.4, 0.4);
        shadowGenerator.getShadowMap().renderList.push(rabbit);

        var rabbit2 = rabbit.clone("rabbit2");
        var rabbit3 = rabbit.clone("rabbit2");

        rabbit2.position = new BABYLON.Vector3(-50, 0, -20);
        rabbit2.skeleton = rabbit.skeleton.clone("clonedSkeleton");

        rabbit3.position = new BABYLON.Vector3(50, 0, -20);
        rabbit3.skeleton = rabbit.skeleton.clone("clonedSkeleton2");

        scene.beginAnimation(skeletons[0], 0, 100, true, 0.8);
        scene.beginAnimation(rabbit2.skeleton, 73, 100, true, 0.8);
        scene.beginAnimation(rabbit3.skeleton, 0, 72, true, 0.8);
    }),
```
### Cloning Complex Models
More complex models, such as the Dude, contain submeshes. When cloning you must iterate and clone the submeshes as well. Here is an example of how to clone a more complex model:

```Javascript
BABYLON.SceneLoader.ImportMesh("him", "Dude/", "dude.babylon", scene, function (newMeshes, particleSystems, skeletons) {

    newMeshes[0].position = new BABYLON.Vector3(0, 0, 5);  // The original dude
    scene.beginAnimation(skeletons[0], 0, 120, 1.0, true);

    dudes = [];

    for (i = 0; i < 10; i++) { // 10 clones
        var xrand = Math.floor(Math.random() * 501) - 250;
        var zrand = Math.floor(Math.random() * 501) - 250;

        var c = [];

        for (j = 1; j < newMeshes.length; j++) {
            c[j] = newMeshes[j].clone("c" + j);
            c[j].position = new BABYLON.Vector3(xrand, 0, zrand);
            c[j].skeleton = newMeshes[j].skeleton.clone();
            scene.beginAnimation(c[j].skeleton, 0, 120, 1.0, true);
        }
        dudes[i] = c;
    }
}
```

### Attaching a mesh to a specific bone
Starting with babylon.js v2.2, you can now attach a mesh to a bone (like a sword in the hand of your character for instance). To do so, just specify on which bone with the following code:
```
sword.attachToBone(skeleton.bones[34], character);
```

Please note that you also need to specify on which mesh the bone is currently applied.
You can find a sample [here](http://www.babylonjs-playground.com/#11BH6Z#18)

### Performance considerations
Bones are computed using shaders by default. This allows better performance. But on low end devices shaders could be limited and not able to process bones. You can in this case ask Babylon.js to compute bones using CPU by setting mesh.computeBonesUsingShaders = false.