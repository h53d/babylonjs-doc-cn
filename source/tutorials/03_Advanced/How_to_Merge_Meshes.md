---
ID_PAGE: 22451
PG_TITLE: How to Merge Meshes
---

##Native Babylon.js function

To easily merge a number of meshes to a single mesh use the static `MergeMeshes` of the `Mesh` class:

```javascript
var newMesh = BABYLON.Mesh.MergeMeshes(arrayOfMeshes[, disposeSource, allow32BitsIndices, meshSubclass]);
```

|variable| description|
|----------|-----------|
|arrayOfMeshes| An array of Meshes.  They should all be of the same material.|
|disposeSource (optional)| When true (default), the source meshes will be disposed upon completion.|
|allow32BitsIndices (optional)| When the sum of the vertices > 64k, this must be set to true.|
|meshSubclass (optional)| When set, vertices inserted into this Mesh.  Meshes can then be merged into a Mesh sub-class.|

##Use your own merge function

If you want to merge meshes into a new one using a self implemented function, you can use the following code as basis and improve it to your needs:

Note: Careful, when you merge cloned mesh, you need to update the world matrix of the mesh with computeWorldMatrix before calling the function.

**Note: This article covers the internal merging process. You can also use ```BABYLON.VertexData``` object and its ```merge()``` function for a simpler solution.**

```javascript
var mergeMeshes = function (meshName, arrayObj, scene) {
    var arrayPos = [];
    var arrayNormal = [];
    var arrayUv = [];
    var arrayUv2 = [];
    var arrayColor = [];
    var arrayMatricesIndices = [];
    var arrayMatricesWeights = [];
    var arrayIndice = [];
    var savedPosition = [];
    var savedNormal = [];
    var newMesh = new BABYLON.Mesh(meshName, scene);
    var UVKind = true;
    var UV2Kind = true;
    var ColorKind = true;
    var MatricesIndicesKind = true;
    var MatricesWeightsKind = true;

    for (var i = 0; i != arrayObj.length ; i++) {
        if (!arrayObj[i].isVerticesDataPresent([BABYLON.VertexBuffer.UVKind]))
            UVKind = false;
        if (!arrayObj[i].isVerticesDataPresent([BABYLON.VertexBuffer.UV2Kind]))
            UV2Kind = false;
        if (!arrayObj[i].isVerticesDataPresent([BABYLON.VertexBuffer.ColorKind]))
            ColorKind = false;
        if (!arrayObj[i].isVerticesDataPresent([BABYLON.VertexBuffer.MatricesIndicesKind]))
            MatricesIndicesKind = false;
        if (!arrayObj[i].isVerticesDataPresent([BABYLON.VertexBuffer.MatricesWeightsKind]))
            MatricesWeightsKind = false;
    }

    for (i = 0; i != arrayObj.length ; i++) {
        var ite = 0;
        var iter = 0;
        arrayPos[i] = arrayObj[i].getVerticesData(BABYLON.VertexBuffer.PositionKind);
        arrayNormal[i] = arrayObj[i].getVerticesData(BABYLON.VertexBuffer.NormalKind);
        if (UVKind)
            arrayUv = arrayUv.concat(arrayObj[i].getVerticesData(BABYLON.VertexBuffer.UVKind));
        if (UV2Kind)
            arrayUv2 = arrayUv2.concat(arrayObj[i].getVerticesData(BABYLON.VertexBuffer.UV2Kind));
        if (ColorKind)
            arrayColor = arrayColor.concat(arrayObj[i].getVerticesData(BABYLON.VertexBuffer.ColorKind));
        if (MatricesIndicesKind)
            arrayMatricesIndices = arrayMatricesIndices.concat(arrayObj[i].getVerticesData(BABYLON.VertexBuffer.MatricesIndicesKind));
        if (MatricesWeightsKind)
            arrayMatricesWeights = arrayMatricesWeights.concat(arrayObj[i].getVerticesData(BABYLON.VertexBuffer.MatricesWeightsKind));

        var maxValue = savedPosition.length / 3;

        arrayObj[i].computeWorldMatrix(true);
        var worldMatrix = arrayObj[i].getWorldMatrix();

        for (var ite = 0 ; ite != arrayPos[i].length; ite += 3) {
            var vertex = new BABYLON.Vector3.TransformCoordinates(new BABYLON.Vector3(arrayPos[i][ite], arrayPos[i][ite + 1], arrayPos[i][ite + 2]), worldMatrix);
            savedPosition.push(vertex.x);
            savedPosition.push(vertex.y);
            savedPosition.push(vertex.z);
        }

        for (var iter = 0 ; iter != arrayNormal[i].length; iter += 3) {
            var vertex = new BABYLON.Vector3.TransformNormal(new BABYLON.Vector3(arrayNormal[i][iter], arrayNormal[i][iter + 1], arrayNormal[i][iter + 2]), worldMatrix);
            savedNormal.push(vertex.x);
            savedNormal.push(vertex.y);
            savedNormal.push(vertex.z);
        }

        var tmp = arrayObj[i].getIndices();
        for (it = 0 ; it != tmp.length; it++) {
            arrayIndice.push(tmp[it] + maxValue);
        }
        arrayIndice = arrayIndice.concat(tmp);

        arrayObj[i].dispose(false);
    }

    newMesh.setVerticesData(BABYLON.VertexBuffer.PositionKind, savedPosition, false);
    newMesh.setVerticesData(BABYLON.VertexBuffer.NormalKind, savedNormal, false);
    if (arrayUv.length > 0)
        newMesh.setVerticesData(BABYLON.VertexBuffer.UVKind, arrayUv, false);
    if (arrayUv2.length > 0)
        newMesh.setVerticesData(BABYLON.VertexBuffer.UV2Kind, arrayUv, false);
    if (arrayColor.length > 0)
        newMesh.setVerticesData(BABYLON.VertexBuffer.ColorKind, arrayUv, false);
    if (arrayMatricesIndices.length > 0)
        newMesh.setVerticesData(BABYLON.VertexBuffer.MatricesIndicesKind, arrayUv, false);
    if (arrayMatricesWeights.length > 0)
        newMesh.setVerticesData(BABYLON.VertexBuffer.MatricesWeightsKind, arrayUv, false);

    newMesh.setIndices(arrayIndice);
    return newMesh;
};
```
