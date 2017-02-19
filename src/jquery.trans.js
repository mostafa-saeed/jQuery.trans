/**
*	jQuery.Trans
*		Description: A Client Side translation that is based on jQuery.
*		author: Mostafa Saeed (mostafa.saeed543@gmail.com)
*		Contribute: https://github.com/mostafa-saeed/jQuery.trans
*		License: MIT
*/
(function($) {
	'use strict';

	var lang = '';
	var lang_c = {};
	var options = {};
	var vars = [];

	function translation() {
		//if translation is loaded
		if(!$.isEmptyObject(lang_c)){
			//translate elements in the array
			vars.forEach(function(element, index){
				$(element.item).html(function() {
					//return default if key doesn't exist
					return element.key in lang_c ? lang_c[element.key] : element.def;
				});
			});

			//translate using class
			$('[data-trans-key]').html(function(){
				//return default if key doesn't exist
				return $(this).attr('data-trans-key') in lang_c ? lang_c[$(this).attr('data-trans-key')] : $(this).attr('data-trans-def');
			});
		} else {
			console.log('err!');
			throw new Error("Translation is empty or missing file!");
		}
	}



	$.trans = {
		/**
		*	The construct function
		*		parameters:
		*			langs: [Array] / (String) an array of languages names or a string in case there is only one translation ready.
		*			default: (String) for the default language, Which is loaded if no parameter is passed!
		*			path: (String) the folder where json files are located. Should be internal because of CORS.
		*			change: (Boolean) auto translate after the json file is loaded
		*		Return: (Void)
		*/
		init: function(opts) {
			var defParams = {
				langs: ['ar', 'en'],
				default: 'en',
				path: 'langs/',
				change: true
			}
			var obj = this;
			options = $.extend({}, defParams, opts);

			/* some validation */
			if(!$.isArray(options.langs) && $.type(options.langs) === "string") {
				options.langs = [options.langs];
			}
			if(!$.isArray(options.langs) && $.type(options.langs) !== "string") {
				options.langs = defParams.langs;
			}
			if($.inArray(options.default, options.langs) < 0) {
				options.default = options.langs[0];
			}

			lang = document.documentURI.split('lang=').length >= 1 ? document.documentURI.split('lang=')[1] : options.default;

			obj.setLang(lang, options.change);
		},
		/**
		*	Changes the current used language
		*		parameters:
		*			lang: (String) the selected lang
		*			forceChange: Optional (Boolean) for the main language
		*		Return: (Void)
		*/
		setLang: function(newLang, forceChange) {
			if(newLang === lang && !$.isEmptyObject(lang_c)) {
				this.transShow();
			} else {
				lang = '';
				lang_c = {};

				var obj = this;

				lang = $.inArray(newLang, options.langs) >= 0 ? newLang : options.default;

				$('body').attr('lang', lang);

				$.ajax(options.path + '/' + lang + ".json")
					.done(function(scr, sta){
						lang_c = scr;
						console.log('Language ' + lang + ' file loaded');
						if(forceChange)
							obj.transShow();
					})
					.fail(function(xhr, settings, exception){
						console.log(settings);
						console.log(exception);
					});
			}
		},
		/**
		*	Shows the translation if lang_c is not empty
		*		It waits until ajax is done and then throws an error if lang_c is empty
		*		Return: (Void)
		*
		*/
		transShow: function() {
			if($.active >= 1) {
				$(document).ajaxComplete(function() {
					translation();
				});
			} else {
				translation();
			}
		},
	};
	/**
	*	Add to translation array selector
	*		parameters:
	*			key: (String) the translation word key in the json object
	*			def: (String) the value if the key doesn't exist
	*/
	$.fn.transHTML = function(key, def) {
		vars.push({
			item: this,
			key: key,
			def: def
		});
		return this;
	};
}(jQuery));