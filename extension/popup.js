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
    if (key.trim()) {
        chrome.storage.sync.get(key, function(result) {
            var key_value = Object.entries(result)[0]
            if (key_value != undefined){ 
                sendValue(key_value[1])
            }

            else {
                sendValue(null)
            }
        })
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
    .then(() => {
    })
  . catch(err => {
    console.error('Could not copy text: ', err);
  });
}

function clearChildNodes(element)  {
    while (element.firstChild) {
        element.firstChild.remove();
    }
}

function addLineBreaks(element, count) {
    for (x =0; x<count; x++) {
        element.appendChild(document.createElement("br"))
    }
}

function outputValue(element, value) {
    text = document.createElement("textarea")
    text.classList.add("form-control")
    text.setAttribute("rows","4")
    text.setAttribute("readonly","true")
    text.value = value
    element.appendChild(text)
    addLineBreaks(element, 1)
    copy = document.createElement("button")
    copy.classList.add("btn")
    copy.classList.add("btn-primary")
    copy.innerText = "Copy to clipboard"
    copy.addEventListener("click", (event) => {
        copy.innerText = "Copied."
        copy.classList.add("btn-secondary")
        copy.disabled = true
        copyToClipboard(value)
    })

    element.appendChild(copy)
}


function sendValue(value = null) {
    var valueElement = document.getElementById("lookup-value")
    clearChildNodes(valueElement)
    if (value != null) {
        outputValue(valueElement, value)

    }
    else {
        valueElement.innerHTML = "<p class='red-font'>variable not found</p>"

    }

}
function tryStoreValue() {
    var form = document.querySelectorAll("form")[0]
    var key = form.elements.namedItem("key").value
    var value = form.elements.namedItem("value").value
    if (key.trim() && value.trim()) {
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