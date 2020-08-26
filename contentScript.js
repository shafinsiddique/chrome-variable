function tryModifyInput(element, event){ 
    if (event.key == ".") {
        console.log(element.value)
        tryParse(element);         
    }
}

function tryParse(element) {
    i = 0
    while (i < element.value.length) {
        console.log("inside loop")
        if (element.value[i] == "<") {
            j = i+1
            while (j < element.value.length && element.value[j]!= ">") { j += 1 }
            if (j  != element.value.length) { tryReplace(element, i, j) }
            i = j+1
        }
        else {
            i += 1
        }
    }
}

function tryReplace(element, starting, ending) {
    variableName = element.value.substring(starting+1, ending)
    alreadyReplaced = false
    chrome.storage.sync.get(variableName, function(result) {
        console.log("variable name:  " + variableName)
        console.log("element name: " + element.value)
        var key_value = Object.entries(result)[0]
        if (key_value != undefined && !alreadyReplaced) {
            new_value = element.value.substring(0, starting) + key_value[1] + element.value.substring(ending+1, 
                element.value.length-1)
                element.value = new_value
                alreadyReplaced = true
        }
    })
}

function addListenerToType(type) {
    var elements = document.querySelectorAll(type)
    for (x=0;x<elements.length; x++) {
        element = elements[x]
        try {
            element.addEventListener('keydown', function(e) {
                tryModifyInput(this, e)
            })
        }
        catch {

        }

        }
}

function addListenersToTypes(types) {
    types.forEach(type => addListenerToType(type))
}

var types = ["input","textarea", "[contenteditable=true]"]
var lengths = types.map(type => document.querySelectorAll(type).length)
addListenersToTypes(types)
window.setInterval(onInterval, 7000)

function onInterval() {
    var new_lengths = types.map(type => document.querySelectorAll(type).length)
    for (x=0; x<new_lengths.length; x++) {
        if (new_lengths[x] != lengths[x]) {
            lengths[x] = new_lengths[x]
            addListenerToType(types[x])

        }
    }

}



