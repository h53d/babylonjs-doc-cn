---
ID_PAGE: 22521
PG_TITLE: How to use the Tags System
---
## Concepts

Tag? You may already have heard or read this word before. Let's see some generic concepts.

### Tags are used:

- as an index term assigned to a piece of information
- to pass parameters to subroutines
- as components of the HTML markup language
- as labels for specific revisions of a project
- as unique identifiers in URI
- as links to other Facebook pages
...

(from [Wikipedia](http://en.wikipedia.org/wiki/Tag))

### Tags on forums / Categories

If you spend some time on forums (let's pick one randomly: [forum](http://http://www.html5gamedevs.com/forum/16-babylonjs/) ;)), you may have noticed that tags are attached to topics (and/or posts sometimes).
The author can write words (tags) to shortly describe his/her topic without having to write a gramatically correct sentence. It's kind of a list of words that you could say during a brainstorming after reading the post.

Example of a topic with tags:

![Topic with tags](http://pix.keuse.fr/images/topic.jpg)

Thus, if you need information about, let's say, meshes, you can search for topics having "mesh" as a word in those topics, BUT you could also search for "mesh" as a tag of the topic. Indeed, maybe the word is never used in the topic (maybe it's only used, or not, in the title) but the author can choose to add it as a tag in the aim to categorize his/her topic.
Tags can be used to categorize/group things.

Here the first search results:

![Search results for "mesh" tag](http://pix.keuse.fr/images/meshtag.jpg)

### CSS classes

OK...? What's the link with tags? Why are we about to talk about CSS classes?

Because CSS classes are great and Tags in Babylon.js can be considered similar, in principle, to CSS classes. So let's talk about them.

CSS stands for Cascading Style Sheets. It's used to define how to display HTML elements.

CSS classes are added to HTML elements (by writing them directly in the HTML code or by adding them via javascript) as a value of the ```class``` attribute of the corresponding HTML elements.

HTML elements can have several CSS classes in their ```class``` attribute and the same CSS class can be used on different HTML elements. CSS classes, just like tags on forums, can then be used to categorize HTML elements. Thus, a same style (background, font, color...) can easily be applied to a group of HTML elements identified by a CSS class (or a list of CSS classes).

_Style for all HTML elements of the page having the "center" class on them (to find elements with a specific class, write a period character, followed by the name of the class)_

```css
.center
{
    text-align: center;
    color: red;
}
```

Thanks to javascript, you can even retrieve all these elements and then do further javascript operations on them (jQuery plugins largely use CSS classes).

```javascript
var elements = document.getElementsByClassName(".center");
```

The above directive would gather a collection of all HTML elements that use the .center class.

Here we are! **Tags in babylon.js can be used to categorize/group elements, and helper functions are provided to retrieve/gather tagged elements.**

## Integration to babylon.js

Tags were integrated into babylon.js on April 7, 2014. [Pull request](https://github.com/BabylonJS/Babylon.js/pull/170#event-109351015)

There was a [discussion](http://www.html5gamedevs.com/topic/4961-user-data-in-mesh-object/?p=30458) about adding this feature on the forum. The goal was to be able to retrieve meshes.

### Pure javascript

The concept was expanded to allow the adding of tags on any javascript object (not necessarily only the objects created by babylon.js). The ```Tag``` class that has been added to babylon.js contains all the necessary code for this generic concept ([Typescript code](https://github.com/BabylonJS/Babylon.js/blob/master/Babylon/Tools/babylon.tags.ts)) and internally uses the ```AndOrNotEvaluator``` class ([Typescript code](https://github.com/BabylonJS/Babylon.js/blob/master/Babylon/Tools/babylon.andOrNotEvaluator.ts)).

The use of tags for a javascript object can be enabled/disabled like this (javascript code):

```javascript
var myJSObj = {};
// enable tags for myJSObj
BABYLON.Tags.EnableFor(myJSObj);

// disable tags for myJSObj
BABYLON.Tags.DisableFor(myJSObj);
```

```EnableFor``` adds functions to the javascript object in the aim to:
*  test if it has tags ```hasTags```
*  add tags to it ```addTags```
*  remove tags from it ```removesTags```
*  test if it matches a tags query ```matchesTagsQuery``` (see below)

Those functions are proxies of static methods of ```Tags``` (```HasTags```, ```AddTagsTo```, ```RemoveTagsFrom``` and ```MatchesQuery```).

```Tags``` also contains ```GetTags``` which retrieves the array of tags of the javascript object.

Remark: Tags.AddTagsTo enables tags for the object if needed

```javascript
var myJSObj1 = {};
// enable tags for myJSObj1
BABYLON.Tags.EnableFor(myJSObj);// => addTags is available on myJSObj1
// add tags to myJSObj1
myJSObj1.addTags("tag1 tag2"); // same as BABYLON.Tags.AddTagsTo(myJSObj1, "tag1 tag2"),

var myJSObj2 = {};
// add tags to myJSObj2 without having to enable tags for it first
BABYLON.Tags.AddTagsTo(myJSObj2, "tag1 tag2"); // addTags couldn't be used on myJSObj2 since tags were not previously enabled for myJSObj2
```

Tags query:

```Tags.MatchesQuery``` (and ```matchesTagsQuery``` if tags are enabled for the javascript object) accepts a list of correct tags (see "Rules to respect") containing parenthesis, and boolean evaluators such as ```(tag1 && (tag2 || tag4 || !tag5)) || !(!tag1) && !!!tag5```. The tags query is evaluated thanks to ```AndOrNotEvaluator```.

Full example:

```javascript
var myJSObj1 = {};
BABYLON.Tags.AddTagsTo(myJSObj1, "tag1 tag2");

var myJSObj2 = {};
BABYLON.Tags.AddTagsTo(myJSObj2, "tag3 tag4 tag5");

var myJSObj3 = {};
BABYLON.Tags.EnableFor(myJSObj3);

var myJSObj4 = {};

myJSObj4.hasTags(); // TypeError: undefined is not a function
BABYLON.Tags.HasTags(myJSObj4); // false

myJSObj3.hasTags(); // false
BABYLON.Tags.HasTags(myJSObj3); // false

myJSObj2.hasTags(); // true
myJSObj1.hasTags(); // true

myJSObj1.matchesTagsQuery("tag1"); // true
myJSObj1.matchesTagsQuery("tag2"); // true
myJSObj1.matchesTagsQuery("tag1 || tag2"); // true
myJSObj1.matchesTagsQuery("tag1 && tag2"); // true
myJSObj1.matchesTagsQuery("tag3"); // false
myJSObj1.matchesTagsQuery("!tag3"); // true
myJSObj1.matchesTagsQuery("tag1 && tag3"); // false
myJSObj1.matchesTagsQuery("tag1 || tag3"); // true
myJSObj1.matchesTagsQuery("tag1 && !tag3"); // true

myJSObj1.removeTags("tag1");

myJSObj1.matchesTagsQuery("tag1 && !tag3"); // false

myJSObj2.removeTags("tag4 tag3 tag5");

myJSObj2.hasTags(); // false

BABYLON.Tags.DisableFor(myJSObj2);

myJSObj2.hasTags(); // TypeError: undefined is not a function

myJSObj3.matchesTagsQuery(""); // false
myJSObj3.matchesTagsQuery(); // true

myJSObj4.matchesTagsQuery(""); // TypeError: undefined is not a function
myJSObj4.matchesTagsQuery(); // TypeError: undefined is not a function

BABYLON.Tags.MatchesQuery(myJSObj4, ""); // false
BABYLON.Tags.MatchesQuery(myJSObj4, undefined); // true
BABYLON.Tags.MatchesQuery(myJSObj4); // true
```

### Rules to respect

* the tags "true" and "false" are reserved and cannot be used as tags.
* a tag cannot start with "||", "&&", or '!'
* a tag cannot contain whitespaces

### Use in babylon.js

Since it's possible to use tags on any javascript object and since meshes are javascript objects, it's possible to add tags on them and to retrieve them according to a tags query.

```javascript
var meshes = myScene.getMeshesByTags("tag1 && (tag2 || tag4 || !tag5)) || !(!tag1) && !!!tag5");
```

All tags added to meshes, cameras, lights... are saved to the scene files (see [.babylon file format](http://doc.babylonjs.com/generals/File_Format_Map_(.babylon))) and reloaded from them.

## What to do with them?

It's up to you!

You can use them to retrieve all the meshes that should be lighted by the light "light1":

```javascript
var meshesToLightByLight1 = myScene.getMeshesByTags("mustBeLightedByLight1");
```

or make some green ghosts appear when you want:

```javascript
var ghosts = myScene.getMeshesByTags("ghost && green");

for(var index=0; index < ghosts.length; index++) {
    ghosts[index].isVisible = true;
}
```