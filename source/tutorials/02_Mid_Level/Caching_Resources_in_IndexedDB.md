---
ID_PAGE: 22231
PG_TITLE: 07. Caching Resources in IndexedDB
---
Starting with the **1.4 release** of Babylon.JS, you can now very easily indicate that you want to **cache the resources associated with your scene/game** inside the local **IndexedDB** of the browser. It can enhance the gamer experience as the JSON and textures files can be directly loaded from the database rather than from the web.

### Usage

To enable offline support, the first thing you need to do is create a _**.manifest**_ file associated with your scene. It should be named _NameOfYourScene.babylon.manifest_.

**Note:** by default, the Babylon engine is configured to use online resources. So if you don’t provide any .manifest file, it will assume that you want the resources to be loaded directly from the web all the time.

Inside this **.manifest** file, insert the following piece of JSON:

```javascript
{
  "version" : 1,
  "enableSceneOffline" : true,
  "enableTexturesOffline" : true
}
```

When you’re loading a scene using the Babylon engine, one of the first things it will try is loading this manifest file and checking this JSON description. If not found (404), it will directly load the resources from the web. If found, it will load the values. You can then change those values anytime, they will be verified every time the engine loads your scene.

You have 3 parameters to fill:

1. The first one is _**version**_ and must be an integer. It’s simply the current version of your assets. If you’re changing it, the Babylon engine will detect that change during the next reload of your scene.&nbsp; This will force a complete reload &amp;amp; update of all the assets into the browser’s database. This can be useful is you want to be sure that the client browser is using up-to-date textures or scene description recently put on your web server.

2. The second parameter _**enableSceneOffline**_ is a boolean. If set to true, you will be asking to load the JSON associated with your scene (the file with the .babylon extension) and store it into the local database of the user. Next time the user loads the game, the scene description will be directly loaded from the DB rather than from the hosting web server.

3. The third parameter _**enableTexturesOffline**_ is also a boolean. This time, you will be asking the Babylon engine to load all textures (PNG or JPG files) and store them into the local database of the user. Thus, the textures will be directly streamed from the database rather than the web server.

**Note:** images are loaded using XHR2 in the blob format. Only IE11 and Firefox support the storing of blob data into the IndexedDB. Chrome does not support it yet. That’s why, even if you’re setting “enableTexturesOffline” to true, Chrome will always try to download the textures from the web. Chrome’s users will at least benefit from loading the JSON scene from the DB.

### Samples

Most of the samples on our website are configured to use offline for their scene and textures: [www.babylonjs.com](http://www.babylonjs.com) . For instance, you can try the Espilit scene. The scene is described in _espilit.babylon_ and the associated manifest file is _espilit.babylon.manifest_.

One of the scenes is configured to only cache the texture. It’s the “The Car” scene. It’s because the JSON file, _TheCar.babylon_, is more than 93 MB. IE11 and Chrome can’t store a big file like that into their DB. I’ve decided to avoid trying to cache it.
