/*
 * App Singleton MAIN 
 * 
 * @copyright: (C) 2014 Kibble Games Inc in cooperation with Vancouver Film School. All Rights Reserved. 
 * @author: Scott Henshaw {@link mailto:shenshaw@vfs.com} 
 * @version: 1.1.0 
 * 
 * @summary: Framework Singleton Class to contain a web app
 * 
 */
var App = (function() {

	function Class() {
	    
	    var local = {
	        // the local object contains all the private members used in this class	            
            done: false
	    }
	    
        var api = {
	        // the API object contains all the public members and methods we wish to expose
	        // the Class function shuld return this.
            run: run,
            init: init
	    };
	    return api;
	    
	    
        function init() {       	
        	// Do some initialization of the member variables for the app
    
        	// Create controllers to manage model objects and link them to DOM
            // view elements
            
            // Define the Event handlers for the app
    	}	
        
        
    	function run() {
            // Run the app
    		
    		while (!done) {
    			
    			updateData();			
    			refreshView();			
    			
    		}
    	};    	
    	
    	
        function updateData() {
            // Update the app/simulation model
        	// is the app finished running?
        	done = true;
        }
    
        
        function refreshView() {
            // Refresh the view - canvas and dom elements
        	
        }
        
    }
	
	return Class; 
	
})();  // Run the unnamed function and assign the results to app for use.


// ===================================================================
// MAIN
// Define the set of private methods that you want to make public and return
// them
$(document).ready( function() {

    App.init();
    App.run();

});
