---
ID_PAGE: 25110
PG_TITLE: Position, Rotate, Translate and Spaces
---
The simple creature in Fig 1 is our pilot (a mesh) through the world of positions, rotations, translations and spaces in Babylon.js.

![](https://lh3.googleusercontent.com/-TXIlDKjJp9U/VW2qvPO0UbI/AAAAAAAAABY/ZLIuZI43XnE/h120/fig1.png) 
Fig 1

NOTE - When a mesh is created its position and rotation are both set to (0, 0, 0).

In all figures X axis is red, Y axis is Green and Z axis is blue.

##Position and Rotation Methods##

###Position###

The easiest way of placing the pilot within the world is ``` pilot.position = new BABYLON.Vector3(x, y, z);``` and this is equivalent to
```typescript
pilot.position.x  =  x;
pilot.position.y  =  y;
pilot.position.z  =  z;
```

See [Demo 1](http://www.babylonjs-playground.com/#UMR7M#5)

In this case a mathematician and game designer will agree 

```typescript
pilot.position = new BABYLON.Vector3(3, 3, 3); 
pilot.position = new BABYLON.Vector3(2, 4, 1);
```

moves the pilot to position vector (2, 4, 1) as in Fig 2, since this is the last position vector set by the code.

![](https://lh3.googleusercontent.com/-HD2SFW9hc80/VW2qzMQx58I/AAAAAAAAAFI/NkNpHIRsC94/s210/fig2.jpg)
Fig 2

###Rotation###

The easiest way of rotating the pilot within the world is ```pilot.rotation = new BABYLON.Vector3(alpha, beta, gamma)``` and this is equivalent to

```typescript
pilot.position.x  =  alpha;
pilot.position.y  =  beta;
pilot.position.z  =  gamma;
```
where alpha, beta and gama are angles in radians that give the rotations
 anti-clockwise about the x, y and z axes respectively when viewed in 
the positive direction along the axes.

Now a mathematician begins to get a little worried. Rotations are not commutative so the order they are carried out is important yet this method does not give any order. More of this later, for the moment consider the results of using pilot.rotation.

A rotation of PI/2 about the y (vertical axis) is achieved by ```pilot.rotation =  new BABYLON.Vector3(0, Math.PI/2, 0);```

See [Demo 2](http://www.babylonjs-playground.com/#UMR7M#27) and Fig 3.

![](https://lh3.googleusercontent.com/-yiEQHWq-Rnc/VW2qzX3rTgI/AAAAAAAAAEI/gE8n7Jf-AdQ/s210/fig3.jpg)
Fig 3

The first thing to note is that the rotation takes place about axes local to the pilot. From the point of view of a simulation of the real world this makes sense, since when we observe things rotating generally we see them turning about their own local axes. For example watching a big (ferris) wheel or straightening a picture.

What happens when the following is applied?
```typescript
pilot.rotation = new new BABYLON.Vector3(0, Math.PI/2, 0);
pilot.rotation = new new BABYLON.Vector3(Math.PI/2, 0, 0);
```

You get the same result as just doing 

```typescript
pilot.rotation = new new BABYLON.Vector3( Math.PI/2, 0, 0);
```

This can be seen in [Demo 3](http://www.babylonjs-playground.com/#UMR7M#25) by commenting out pilot.rotation lines in turn.

Just as pilot.position sets a position vector based from the world origin (0, 0, 0) so pilot.rotation sets, say, an 'orientation vector' starting from a local orientation matching the world orientation of (0, 0, 0). It is the last set rotation that is achieved.

The following three sets of code are all equivalent for a given alpha, beta and gamma.
```typescript
pilot.rotation = new BABYLON.Vector3(alpha, beta, gamma);
```

```typescript
pilot.rotation.x  =  alpha;
pilot.rotation.y  =  beta;
pilot.rotation.z  =  gamma;
```
```typescript
pilot.rotation.x  =  beta;
pilot.rotation.z  =  gamma;
pilot.rotation.y  =  alpha;
```
since the rendering is done after the angles are set. In other words the order of setting rotations for x, y and z is not important.

[Demo 4](http://www.babylonjs-playground.com/#UMR7M#11) shows an example with alpha = beta = gamma = PI/2 with the result is shown in Fig 4. 

![](https://lh3.googleusercontent.com/-8hFr6rL0-AM/VW2qz8n4mMI/AAAAAAAAAEE/tqCnYgrRKLY/s210/fig4.jpg)
Fig 4


Commenting out different groups of lines in [Demo 4](http://www.babylonjs-playground.com/#UMR7M#11) shows that the order in which the x, y and z rotations are set makes no difference to the result.  The actual order is rotation around y first, then x then z.

To see that the rotations are around the local axis use [Demo 4](http://www.babylonjs-playground.com/#UMR7M#11) and 

Step 1 comment out all rotation
Step 2 comment out all rotations except 
```typescript
pilot.rotation.y = Math.PI/2;
```  
Step 3 comment out all rotations except 
```typescript
pilot.rotation.y = Math.PI/2;
pilot.rotation.x = Math.PI/2; 
```
Step 4 Comment out all rotations except
```typescript 
pilot.rotation.y = Math.PI/2;
pilot.rotation.x = Math.PI/2;
pilot.rotation.z = Math.PI/2;
```
 
Results for 1, 2, 3 and 4 are in Figs 5a, b, c, d.

![](https://lh3.googleusercontent.com/-eJLh8Kv_fCo/VW2q0hEOxXI/AAAAAAAAADI/XN2Sp-vQANA/s210/fig5a.jpg)  ![](https://lh3.googleusercontent.com/-KDKmxOGZy_Y/VW2q0-n8aOI/AAAAAAAAAEA/o_CmG0imIjg/s210/fig5b.jpg) 
![](https://lh3.googleusercontent.com/-ryMZR5kfGu4/VW2q1PmlE5I/AAAAAAAAADQ/3GvWjsHPHpw/s210/fig5c.jpg)
![](https://lh3.googleusercontent.com/-Gs1pqOB1_XQ/VW2q1dw1eiI/AAAAAAAAADw/1mDeScFg9O4/s210/fig5d.jpg)

            Fig 5a            Fig5b                 Fig 5c             Fig 5d

Starting at 

Fig 5a apply a rotation around local (= world) y axis (green)  to obtain

Fig 5b apply a rotation around local x axis (red) to obtain 

Fig 5c apply a rotation around local z axis (blue) to obtain

Fig 5d

##Translate and Rotate##

Translate and Rotate change the position and orientation of a mesh along a given vector or axis using either the world or the mesh's local axes.

###Translate###

you can use pilot.translate(vector, distance, space) to move the pilot the given distance in the direction of the vector based on either the world or local space.

####The World Space####

The world space is set using BABYLON.Space.WORLD

[Demo 5](http://www.babylonjs-playground.com/#UMR7M#14) using the vectors (3, 3, 3) and (2, 4, 1) with a distance of 1 shows that in the world space pilot.translate behaves like pilot.position set to these vectors.

Experimenting with the distance shows that the pilot moves distance * vector length.

It is often useful if the given vector is a unit vector so the distance moved is precisely the distance given.

For a given V = new BABYLON.Vector3(x, y, z) a unit vector in this direction is given by V.normalize(). Also V.length() will give the length of the vector.

For convenience unit vectors in the positive directions of the x, y and z axes are pre-defined as the constants BABYLON.Axis.X, BABYLON.Axis.Y and BABYLON.Axis.Z respectively.

####The Local Space####

The local space is set using BABYLON.Space.LOCAL. 

In the local space translate behaves as would a mathematical translate. That is, a sequence of translations is an accumulation of direction vectors as opposed to the setting of a position vector.

[Demo 6](http://www.babylonjs-playground.com/#UMR7M#15) shows how the translation (3, 3, 3) followed by the translation (2, 4, 1) results in the translation (5, 7, 4).

###Rotate###

NOTE  

* local-axes means axes local to the pilot that maintain their original orientation to the pilot, ie as the pilot turns the local axes turn with it.

* world-local-axes means axes local to the pilot that stay in the direction of the world axes whatever the orientation of the pilot.

####The world space.####

Rotations take place around the world-local-axes and are accumulative. This can be seen in [Demo 7](http://www.babylonjs-playground.com/#UMR7M#16).

Commenting the correct lines in [Demo 7](http://www.babylonjs-playground.com/#UMR7M#16) gives the sequence in Figs 6a, b, c, d.

![](https://lh3.googleusercontent.com/-5ti2Ahyaszg/VW2q1qwIOnI/AAAAAAAAADc/4Vomi3kXUvU/s210/fig6a.jpg)
1[](https://lh3.googleusercontent.com/-oNmkqraiIkg/VW2q2OmbCsI/AAAAAAAAADk/Y8_s5Y35byo/s210/fig6b.jpg)
![](https://lh3.googleusercontent.com/-AWKJUC_TxOU/VW2q2t_YxyI/AAAAAAAAAD4/09lbS3gKkgY/s210/fig6c.jpg)
![](https://lh3.googleusercontent.com/-TcRVwV1YfKo/VW2q2n1VqpI/AAAAAAAAADs/uxqN-ft5npE/s210/fig6d.jpg)

            Fig 6a            Fig6b                 Fig 6c             Fig 6d

Starting from

Fig 6a rotate about the world-local-axis y to obtain

Fig 6b rotate about world-local-axis y to obtain  

Fig 6c rotate about world local axis x to obtain

Fig 6d


####The local space####

[Demo 8](http://www.babylonjs-playground.com/#UMR7M#17) shows that the rotations take place around the local-axes and are accumulative. The stages are shown in Figs 7a, b, c, d, e

![](https://lh3.googleusercontent.com/-9LHIGaanKrU/VW2q3T2kXFI/AAAAAAAAAEc/0Q0-fQr9SiE/s210/fig7a.jpg)
![](https://lh3.googleusercontent.com/-dpp79sOIFMg/VW2q3wemWSI/AAAAAAAAAEM/AoWev1t4ODU/s210/fig7b.jpg)
![](https://lh3.googleusercontent.com/-nybw5ErTfGc/VW2q4Z4IVwI/AAAAAAAAAEg/I1zCMBcJBNI/s210/fig7c.jpg)
![](https://lh3.googleusercontent.com/-wC2ZcwTce9I/VW2q4_-s6GI/AAAAAAAAAEk/ApmBi9O4DQ0/s210/fig7d.jpg)
![](https://lh3.googleusercontent.com/-ccXHJ4DM7s4/VW2q6NgYZ8I/AAAAAAAAAE8/GQHH_6CGlAU/s210/fig7e.jpg)

            Fig 7a            Fig7b                 Fig 7c               Fig 7d               Fig 7e

Starting from 

Fig 7a rotate about local-axis y to obtain

Fig 7b rotate about local-axis y to obtain  

Fig 7c rotate about local-axis x to obtain

Fig 7d rotate about local-axis z to obtain

Fig 7e

###Combining translate and rotate###

Whether the pilot is rotated in the world or the local space applying pilot.translate in the world space is essentially equivalent to applying pilot.position. 

So what happens when pilot.translate is applied in the local space after rotations.

Firstly when rotating in the world space the word-local-axes are used for rotation and these are then also used for pilot.translate(vector, distance, BABYLON.Space.LOCAL). See Figs 8a, b

[Demo 9](http://www.babylonjs-playground.com/#UMR7M#20) can be used to play with WORLD rotations followed by LOCAL translations

![](https://lh3.googleusercontent.com/-dFoKaUKuhco/VW2q6JTUs7I/AAAAAAAAAFA/Hys5M-c3F5k/s210/fig8a.jpg)
![](https://lh3.googleusercontent.com/-Di1IAnzgGeo/VW2q6VjteKI/AAAAAAAAAE4/_cV4zZnFnw8/s210/fig8b.jpg)

            Fig 8a            Fig8b 

Starting from 

Fig 8a translate LOCAL applies a translation of -2 along z world-local-axes to obtain

Fig 8b

Secondly when rotating in the local space the local axes are used for rotation and the world-local-axes are still used for pilot.translate(vector, distance, BABYLON.Space.LOCAL). 

Fig 9 shows that the translation of (0, 0, -2) is still along the world-local-axis for z as it was in Fig 8b.

![](https://lh3.googleusercontent.com/-F7SPrEzEACQ/VW2q7WOGJPI/AAAAAAAAAFE/UuZBKbLX4I8/s210/fig9.jpg)

[Demo 10](http://www.babylonjs-playground.com/#UMR7M#36) can be used to play with LOCAL rotations followed by LOCAL translations.


####What if you want to translate using the local axes following rotations?####

You use pilot.locallyTranslate(vector), where vector is a BABYLON.Vector3 giving the required translation.

#####[Demo 11](http://www.babylonjs-playground.com/#UMR7M#35) can be used to play with WORLD rotations followed by translations applied locally.#####

Figs 10 a, b, c and d show the pilot rotations around the world-local-axes.

Fig 11 shows the final result as in Fig 10d but with the local-axes shown. 

Fig 12 shows the result of applying the following two translations, the first of distance 3 along the local z axis and the second of distance 3 along the local y axis.

![](https://lh3.googleusercontent.com/-fJ-XFFFnJAw/VW2qvXwty1I/AAAAAAAAABs/M0VJOjmc3Aw/s210/fig10a.jpg)
![](https://lh3.googleusercontent.com/-zOYaqhIE-Sc/VW2qvaeI3LI/AAAAAAAAAFM/ii0PKtjlIro/s210/fig10b.jpg)
![](https://lh3.googleusercontent.com/-np5-CAjwm4k/VW2qvtOd4pI/AAAAAAAAAFU/a4WOaoxolgc/s210/fig10c.jpg)
![](https://lh3.googleusercontent.com/-HdrqHeKoBeA/VW2qv2U3x3I/AAAAAAAAACM/DkjoYYW91y0/s210/fig10d.jpg)

            Fig 10a            Fig10b                 Fig 10c             Fig 10d

Starting from

Fig 10a rotate around world-local-axis y to obtain

Fig 10b rotate around world-local-axis y to obtain

Fig 10c rotate around world-local-axis x to obtain

Fig 10d

![](https://lh3.googleusercontent.com/-p5vZalr4_qc/VW2qwBetivI/AAAAAAAAACI/vJk4bAMVgI8/s210/fig11.jpg)Fig 11

![](https://lh3.googleusercontent.com/-g_R9L8SWcJ0/VW2qwXAKfLI/AAAAAAAAAB8/bI9zYIE33uU/s210/fig12.jpg)Fig 12


#####[Demo 12](http://www.babylonjs-playground.com/#UMR7M#37) can be used to play with LOCAL rotations followed by translations applied locally.#####

Figs 13 a, b, c and d show the pilot rotations around the local-axes.

Fig 14 shows the final result as in Fig 13d but with the local-axes shown. 

Fig 15 shows the result of applying the following two translations, the first of distance 3 along the local z axis and the second of distance 3 along the local y axis.

![](https://lh3.googleusercontent.com/-pXngvpfxbrE/VW2qw09lIoI/AAAAAAAAACA/rxtA7murqqs/s210/fig13a.jpg)
![](https://lh3.googleusercontent.com/-9ypxtidQ9k4/VW2qxCR1-VI/AAAAAAAAACE/QvToY4pprc0/s210/fig13b.jpg)
![](https://lh3.googleusercontent.com/-0MUYfF7wZfw/VW2qxQb9oWI/AAAAAAAAACo/rKuPKTxjh9k/s210/fig13c.jpg)
![](https://lh3.googleusercontent.com/-UWIWpjPcdCg/VW2qxv--OuI/AAAAAAAAACg/91Sz-x0fgtk/s210/fig13d.jpg)

            Fig 13a            Fig13b                 Fig 13c             Fig 13d

Starting from

Fig 13a rotate around local-axis y to obtain

Fig 13b rotate around local-axis y to obtain

Fig 13c rotate around local-axis x to obtain

Fig 13d

![](https://lh3.googleusercontent.com/-X9vYvWVehWI/VW2qylL6ZWI/AAAAAAAAACs/7dcGpUnp_bQ/s210/fig14.jpg)Fig 14

![](https://lh3.googleusercontent.com/-kvP4tfZYRac/VW2qywCg3cI/AAAAAAAAACw/eaWslJbqhaA/s210/fig15.jpg)Fig 15