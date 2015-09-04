/* ==================================================================================
 * Include this (concatenate to it) for global definitions
 * 
 * VFS Gobal Helper Library.
 * 
 *  This library contains extensions to JavaScript, jQuery and other components 
 *  to add some helper functionality to any JS app.
 *  
 *  @author: Scott Henshaw
 *  @copyright: 2014 Kibble Games Inc in cooperation with Vancouver Film School.
 *  
 */


/*==================================================================================
 * 
 * MyClass.extends( ParentClass );
 * 
 * Easier prototypal inheritance by extending the Function prototype with some easy 
 * to read inheritance properties
 * 
 * Function augmentation to deliver more easily readable classes with inheritance
 * 
 * @author: Scott Henshaw, based largely on Douglas Crockford's work
 * 
 */
Function.prototype.extends = function( parentClassOrObject ){
	
	if ( parentClassOrObject.constructor == Function )	{
		
		//Normal Inheritance 
		this.prototype = Object.create( parentClassOrObject.prototype );
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject.prototype;
		
	} else {
		
		//Pure Virtual Inheritance 
		this.prototype = Object.create( parentClassOrObject );
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject;
	} 
	
	return this;
};



/*================================================================================== 
 * 
 * $.include() - async load/include a JavaScript source file at this point
 * 
 * Javascript does not natively have includes relying on the HTML/PHP do do it
 * but dependencies are not honoured easily; so we can create our own.
 * This makes a global include function that can be called to use AJAX to load a script
 * 
 * usage: $.include( "js/subscript.js" ); 
 * 
 * @author: Scott Henshaw
 *   
 */
jQuery.fn.extend( {
	
	include: function( script ) {
		// Make a jQuery AJAX call to the server, ask for the script
	    $.ajax({
	        url: script,
	        dataType: "script",
	        async: false,           // <-- This is the key - make it synchronous
	        success: function () {
	        	// all good, do nothing script loaded...
	        	// need to flag scripts already loaded so we can't re-load them
	        	console.log("Script [" + script + "] was successfully loaded.");
	        },	        
	        error: function () {
	        	throw new Error("Could not load script [" + script + "].");
	        }
	    });
	}
});



/*==================================================================================
 * 
 * vfs.disableSource();
 *  
 * Cute little singleton to contain the code redirecting and disabling some of the right click
 * menu functionality (copy save images, view source in most browsers.   use with care.
 * 
 * @author: Scott Henshaw
 *  
 */
var vfs = (function() {

	return {
		disableSource: disableSource
	};
	
	var _message = "Function Disabled!";
	
	function disableClickIE4() {
		
		if (event.button == 2) {
			alert( _message );
			return false;
		}
	}

	function disableClickNS4(e) {
		
		if (document.layers || document.getElementById && !document.all) {
			if (e.which == 2 || e.which == 3) {
				alert(message);
				return false;
			}
		}
	}

	function disableSource() {
		
		if (document.layers) {
	
			document.captureEvents( Event.MOUSEDOWN );
			document.onmousedown = disableClickNS4;
			
		} else if ( document.all && !document.getElementById ) {
			
			document.onmousedown = disableClickIE4;
		}

		document.oncontextmenu = new Function( "alert(message);return false" );
	}


})();


// Global initialization if required
(function() { 
	
	// vfs.disableSource();  // uncomment this line to disable the right click view source action in most browsers
})();