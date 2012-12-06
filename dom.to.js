;(function(undefined){
    function createIndent(indent){
        var indentString = '';
        for(var i = 0; i < indent; i++){
            indentString += '     ';
        }
        return indentString;
    }  
    
    function domToJs(element, type, settings, indent){
        var settings = settings || {},
            indent = indent = indent || 0;
            
        indent++;
        var plugin = domToJs.plugins[type || 'vanilla'],
            result = '';
        
        if(element.nodeType === 3){ // text node
            var text;
            if(settings.keepWhitespace){
                text = element.nodeValue.replace(/\n/g, '\\n');
            }else{
                text = $.trim(element.nodeValue);
            }
            if(text !== ""){
                return plugin.createText(text, indent);
            }
            return;
        }else if(element.nodeType === 1){ // html node
            
            result += plugin.createNode(element, indent);
            result += plugin.setAttributes(element, indent);
            
            var hadChildren;
        
            if(element.childNodes.length){
                var children = [];
                for(var childIndex = 0; childIndex < element.childNodes.length; childIndex++){
                    var child = domToJs(element.childNodes[childIndex], type, settings, indent);
                    child && children.push(child);                    
                };
                hadChildren = !!children.length;
                for(var childIndex = 0; childIndex < children.length; childIndex++){
                    var child = children[childIndex];
                    result += '\n'
                    result += createIndent(indent) + plugin.appendChild(child, childIndex, childIndex === 0, childIndex === children.length-1, indent);              
                }
            }
            
            hadChildren && (result += '\n' + createIndent(indent-1));
            result += plugin.endNode(indent);
        }
        
        return result;
        
    }
    
    domToJs.createIndent = createIndent;
    
    domToJs.plugins = {
        'vanilla':{
            createText: function(text, indent){
                return 'document.createTextNode("' + text + '")';
            },
            createNode: function(element, indent){
                var result = '(function(){\n';
                result += domToJs.createIndent(indent) + 'var element = document.createElement("';
                result += element.tagName.toLowerCase();
                result += '");\n';
                return result;
                
            },
            setAttributes: function(element, indent){
                var result = '';
                for(var attributeIndex = 0; attributeIndex < element.attributes.length; attributeIndex++){
                    var attribute = element.attributes[attributeIndex];
                    result += domToJs.createIndent(indent) + 'element.setAttribute("' + attribute.nodeName;
                    result += '",' + JSON.stringify(attribute.nodeValue);
                    result += ');\n';
                }         
                return result;       
            },
            appendChild: function(child, index, first, last, indent){
                var result = '';
                result += '\n';
                result += domToJs.createIndent(indent) + 'var child' + index +' = ' + child + ';';
                result += '\n';
                result += domToJs.createIndent(indent) + 'element.appendChild(' + 'child' + index + ');';
                result += '\n';
                return result;
            },
            endNode: function(indent){
                var result = '';
                result += createIndent(indent) + 'return element;\n';
                result += createIndent(indent-1) + '})()';  
                return result;          
            }
        }
    }
    
    window.domToJs = domToJs;
    
    // jQuery integration
    if(window.jQuery){
        window.jQuery.fn.toJs = function(plugin){
            result = [];
            this.each(function(){
                result.push(domToJs(this, plugin));
            });
            
            return result;
        }
    }
})();