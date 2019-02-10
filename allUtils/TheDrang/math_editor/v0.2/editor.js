//Init Vars
var TeX = 
{
    "display" : "$$",
    "inline" : 
    {
        "start": "\(",
        "end": "\)"
    }
}

var AM = 
{
    "inline" : "`"
}


//when everything finishes loading / Initialization
$(window).load(function (e)
{
    $("#load").fadeOut(300, function ()
    {
        $("#overlay").fadeOut(150);
    });
});

$(document).ready(function ()
{
    Aloha.ready( function() {
        Aloha.jQuery("#txtarea").aloha();
    });
});

//prototypes
String.prototype.encodeHTML = function() 
{
    //encode string to html entities
    return this.replace(/[\u00A0-\u9999<>\&]/gim, function(i) {
        return '&#'+i.charCodeAt(0)+';';
    })
}

function getCharacterOffsetWithin(range, node) {
    var treeWalker = document.createTreeWalker(
        node,
        NodeFilter.SHOW_TEXT,
        function(node) {
            var nodeRange = document.createRange();
            nodeRange.selectNode(node);
            return nodeRange.compareBoundaryPoints(Range.END_TO_END, range) < 1 ?
                NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        },
        false
    );

    var charCount = 0;
    while (treeWalker.nextNode()) {
        charCount += treeWalker.currentNode.length;
    }
    if (range.startContainer.nodeType == 3) {
        charCount += range.startOffset;
    }
    return charCount;
}