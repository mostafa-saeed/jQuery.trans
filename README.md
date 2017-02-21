# jQuery.trans
A Client Side translation that is based on jQuery.

## Features
* Super light-weight.
* Easy to use.
* HTML Attributes based translation.
* Completely Client sided (you don't have to reload the page to show translation).
* Compatibility with cross-platform mobile APPs (you can easily use it with jQuery Mobile).
* Useing JSON for translation.

## How To Use
After loading jQuery and the plugin JavaScript file, You should initiate the plugin using this snippet of code for example:
```javascript
jQuery(document).ready(function($){
	$.trans.init({
		'langs': ['ar', 'en'],
		'default': 'en',
		'path': 'langs',
	});
});
```
Now choose the elements you want to translate by one of the 2 following methods:
###1 Selector method '$(element).transHTML()':
```javascript
$('p').transHTML('home', 'my website home page');
```
the nice thing about using this method is that it allows you to use jQuery chaining, But you have to run the following after choosing all of your elements:
```javascript
$.trans.transShow();
```
###2 HTML Attributes (data-trans-key & data-trans-def):
this method is usful when you want to show the translation directly after the language JSON file is loaded, here's an example:
```html
<p data-trans-key="home" data-trans-def="my website home page"></p>
```
