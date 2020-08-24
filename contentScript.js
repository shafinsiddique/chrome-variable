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

var forms = document.querySelectorAll('form')

for (x=0; x<forms.length; x++) {
    form = forms[x];

    for (y = 0; y<form.elements.length; y++) {
        element = form.elements[y]

        try {
            element.addEventListener('keyup', function(e) {
                tryModifyInput(this, e)
            })
        }
        catch {
        }
    }
}