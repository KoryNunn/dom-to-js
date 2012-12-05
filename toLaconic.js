(function(){
    function toLaconic(){
        if(this.nodeType === 3){
            //textnode
            var text = $.trim(this.nodeValue);
            if(text !== ""){
                return '"' + text + '"';
            }
            return '';
        }

        var $element = $(this),
            currentResult = '$.el.';
        
        //add tagName
        currentResult += this.tagName.toLowerCase();
        currentResult += '(';
        
        //add settings
        var settings = {};
        for(var attributeIndex = 0; attributeIndex < this.attributes.length; attributeIndex++){
            var attribute = this.attributes[attributeIndex];
            settings[attribute.nodeName] = attribute.nodeValue;
        }
        currentResult += JSON.stringify(settings);
        
        
        //add contents       
        if(this.childNodes.length){
            for(var childIndex = 0; childIndex < this.childNodes.length; childIndex++){
                var child = toLaconic.call(this.childNodes[childIndex]);
                if(child){
                    currentResult += ',';
                    currentResult += child;
                }
            };
        
        }
        
        currentResult += ')';
        
        return currentResult;
    }
    
    $.fn.toLaconic = function($elements){
        result = [];
        this.each(function(){
            result.push(toLaconic.call(this));
        });
        
        return result;
    }
})();