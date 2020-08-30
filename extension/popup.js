document.addEventListener('DOMContentLoaded',function() {
    var save = document.getElementById("save");
    save.addEventListener('click', function() {
        tryStoreValue()
    })
    var variables = document.getElementById("variables");
    variables.addEventListener('click', () => chrome.tabs.create({ url: "variables.html" }))

    var find = document.getElementById("find");
    find.addEventListener("click", () => {
        tryGetValue()
    })
})

function tryGetValue(){ 
    var form = document.querySelectorAll("form")[1]
    var key = form.elements.namedItem("lookup").value
    if (key!= null) {
        chrome.storage.sync.get(key, function(result) {
            var key_value = Object.entries(result)[0]
            if (key_value != undefined){ 
                sendValue(key_value[1])
            }

            else {
                console.log("value not found")
            }
        })
    }

    else {

    }
}

function sendValue(value = null) {
    var valueElement = document.getElementById("lookup-value")
    if (value != null) {
        valueElement.innerHTML = "<p>" + value + "</p>"
    }
}
function tryStoreValue() {
    var form = document.querySelectorAll("form")[0]
    var key = form.elements.namedItem("key").value
    var value = form.elements.namedItem("value").value
    if (key != "" && value != "" ) {
        chrome.storage.sync.set({[key]: value}, () => sendOutput(true))
    }
    else {
        sendOutput(false)
    }
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