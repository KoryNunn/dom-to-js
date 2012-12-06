;(function(){
    domToJs.plugins['laconic'] = {
        createText: function(text, indent){
            return '"' + text + '"';
        },
        createNode: function(element, indent){
            return '$.el.' + element.tagName.toLowerCase() + '(';
            
        },
        setAttributes: function(element, indent){
            if(!element.attributes.length){
                return '';
            }
            var settings = {};
            for(var attributeIndex = 0; attributeIndex < element.attributes.length; attributeIndex++){
                var attribute = element.attributes[attributeIndex];
                settings[attribute.nodeName] = attribute.nodeValue;
            }
            return JSON.stringify(settings) + ',';     
        },
        appendChild: function(child, index, first, last, indent){
            var result = '';
            result += child;            
            if(!last){       
                result += ','
            }
            return result;
        },
        endNode: function(indent){        
            return ')';        
        }
    };
})();