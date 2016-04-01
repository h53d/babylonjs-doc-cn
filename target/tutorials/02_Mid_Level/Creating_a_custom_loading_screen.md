Starting with Babylon.js 2.3 the loading screen (the screen used when loading assets or a scene) can be changed by the developer.

To create a new loading screen, you will have to create a simple class, implementing the following interface:

```javascript
interface ILoadingScreen {
  //What happens when loading starts
  displayLoadingUI: () => void;
  //What happens when loading stops
  hideLoadingUI: () => void;
  //default loader support. Optional!
  loadingUIBackgroundColor: string;
  loadingUIText: string;
}
```
In plain JavaScript, your loader code will look like this:

```javascript
function MyLoadingScreen( /* variables needed, for example:*/ text) {
  //init the loader
  this.loadingUIText = text;
}
MyLoadingScreen.prototype.displayLoadingUI = function() {
  alert(this.loadingUIText);
};
MyLoadingScreen.prototype.hideLoadingUI = function() {
  alert("Loaded!");
};
```

In TypeScript the same will look like this:

```javascript
class MyLoadingScreen implements ILoadingScreen {
  //optional, but needed due to interface definitions
  public loadingUIBackgroundColor: string
  constructor(public loadingUIText: string) {}
  public displayLoadingUI() {
    alert(this.loadingUIText);
  }

  public hideLoadingUI() {
    alert("Loaded!");
  }
}
```

The usage is the same in both languages:

```javascript
var loadingScreen = new MyLoadingScreen("I'm loading!!");
//Set the loading screen in the engine to replace the default one
engine.loadingScreen = loadingScreen;
```
