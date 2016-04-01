---
PG_TITLE: How to use EdgesRenderer
---
BABYLON.EdgesRenderer is a tool used to render edges on top of a mesh. Edges are rendered between two faces if the dot product of their normals is less than epsilon.

![](/img/edgesRenderer.jpg)

You can enable edges rendering like this:

```
var box = BABYLON.Mesh.CreateBox("box1", 2, scene);
box.enableEdgesRendering();	
box.edgesWidth = 4.0;
box.edgesColor = new BABYLON.Color4(0, 0, 1, 1);
```

the ```enableEdgesRendering``` can be called with a custom epsilon (default value is 0.95).

Dot product is the cosine of the angle between the vectors, so for default epsilon 0.95 the angle is acos(.95) ~= 18 degrees - so if the angle between two faces is less than that no line gets drawn.

You can try it here: http://www.babylonjs-playground.com/#TYAHX#10
