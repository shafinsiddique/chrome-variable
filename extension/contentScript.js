function tryModifyInput(element, event){ 
    if (event.key == ".") {
        tryParse(element);         
    }
}

async function tryParse(element) {
    var i = 0
    var handled
    while (i < element.value.length) {
        if (element.value[i] == "<") {
            j = i+1
            while (j < element.value.length && element.value[j]!= ">") { j += 1 }
            if (j  != element.value.length) { 
                handled = await tryReplace(element, i, j)
            }
        }
        i += 1
    }

    if (handled && element.value[element.value.length-1] == ".") {
        element.value = element.value.substring(0, element.value.length-1)
    }
}

function getValue(key) {
    return new Promise((resolve) => {
        chrome.storage.sync.get(key, function(result) {
            resolve(result)
        })
    }, 2000)
}

async function tryReplace(element, starting, ending) {
    var variableName = element.value.substring(starting+1, ending)
    alreadyReplaced = false
    var value = await getValue(variableName)
    var key_value = Object.entries(value)[0]
    if (key_value != undefined && !alreadyReplaced){ 
        alreadyReplaced = true
        element.value = element.value.substring(0, starting) + key_value[1] + element.value.substring(ending+1, 
            element.value.length)
            return true
    }
    return false
}

function addListenerToType(type) {
    var elements = document.querySelectorAll(type)
    for (x=0;x<elements.length; x++) {
        element = elements[x]
        try {
            element.addEventListener('keydown', function(event) {
                event.stopImmediatePropagation()
                tryModifyInput(this, event)
            })
        }
        catch {

        }

        }
}

function addListenersToTypes(types) {
    types.forEach(type => addListenerToType(type))
}

function checkIfGreenhouse() {
    var iFrame = document.getElementById("grnhse_iframe")
    if (iFrame != null) {
        alert("Message From Chrome Variable: \n\nThis site is using an embedded form from boards.greenhouse.io. " +
        "In order to use chrome variables in the form, please head to the actual form link at : " + iFrame.src)
    }
}

function onInterval() {
    var new_lengths = types.map(type => document.querySelectorAll(type).length)
    for (x=0; x<new_lengths.length; x++) {
        if (new_lengths[x] != lengths[x]) {
            lengths[x] = new_lengths[x]
            addListenerToType(types[x])
        }
    }

}


window.onload = function() {
    checkIfGreenhouse()
    types = ["input","textarea"]
    lengths = types.map(type => document.querySelectorAll(type).length)
    console.log(lengths)
    addListenersToTypes(types)
    setInterval(onInterval, 7000)
}






