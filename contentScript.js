function tryModifyInput(element, event){ 
    if (event.key == ".") {
        tryParse(element);         
    }
}

function tryParse(element) {
    i = 0
    while (i < element.value.length) {
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
    chrome.storage.sync.get(variableName, function(result) {
        var key_value = Object.entries(result)[0]
        if (key_value != undefined) {
            element.value = element.value.substring(0, starting) + key_value[1] + element.value.substring(ending+1, 
                element.value.length-1)
        }
    } )
}

function addListenerToType(type) {
    var elements = document.querySelectorAll(type)
    console.log(elements.length)
    for (x=0;x<elements.length; x++) {
        element = elements[x]
        try {
            element.addEventListener('keyup', function(e) {
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

var types = ["input","textarea"]
var lengths = types.map(type => document.querySelectorAll(type).length)
addListenersToTypes(types)
window.setInterval(onInterval, 7000)

function onInterval() {
    console.log("running on interval")
    var new_lengths = types.map(type => document.querySelectorAll(type).length)
    for (x=0; x<new_lengths.length; x++) {
        if (new_lengths[x] != lengths[x]) {
            lengths[x] = new_lengths[x]
            addListenerToType(types[x])

        }
    }

}



