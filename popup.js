document.addEventListener('DOMContentLoaded',function() {
    var save = document.getElementById("save");
    save.addEventListener('click', function() {
        tryStoreValue()
    })
})

function tryStoreValue() {
    var form = document.querySelectorAll("form")[0]
    var key = form.elements.namedItem("key").value
    var value = form.elements.namedItem("value").value
    
    if (key != "" && value != "" ) {
        chrome.storage.sync.set({key: value}, () => sendOutput(true))
        chrome.storage.sync.get("foo", getValues)
    }

    else {
        sendOutput(false)
    }
}

function getValues(items) {
    console.log(JSON.stringify(items))
}

function sendOutput(valid) {
    element = document.getElementById("message")
    if (valid) {
        html = "<p>variable has been set</p>"
    }

    else {
        html = "<p class='red-font'>name or value cannot be empty</p>" 
    }

    element.innerHTML = html
}