/**
 * Created by João Guilherme.
 */
function detectPlugin() {
// allow for multiple checks in a single pass
    var daPlugins = detectPlugin.arguments;

// consider pluginFound to be false until proven true
    var pluginFound = false;

// if plugins array is there and not fake
    if (navigator.plugins && navigator.plugins.length > 0) {
        var pluginsArrayLength = navigator.plugins.length;

// for each plugin...
        for (pluginsArrayCounter=0; pluginsArrayCounter < pluginsArrayLength; pluginsArrayCounter++ ) {

            // loop through all desired names and check each against the current plugin name
            var numFound = 0;
            for(namesCounter=0; namesCounter < daPlugins.length; namesCounter++) {

                // if desired plugin name is found in either plugin name or description
                if( (navigator.plugins[pluginsArrayCounter].name.indexOf(daPlugins[namesCounter]) >= 0) ||
                    (navigator.plugins[pluginsArrayCounter].description.indexOf(daPlugins[namesCounter]) >= 0) ) {
                    // this name was found
                    numFound++;
                }
            }
            // now that we have checked all the required names against this one plugin,
            // if the number we found matches the total number provided then we were successful
            if(numFound == daPlugins.length) {
                pluginFound = true;
                // if we've found the plugin, we can stop looking through at the rest of the plugins
                break;
            }
        }
    }
    return pluginFound;} // detectPlugin

//pluginFound = detectPlugin('Shockwave','Flash');