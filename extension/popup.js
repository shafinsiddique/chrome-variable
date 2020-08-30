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
    if (key != null) {
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
function sendValue(value = null) {
    var valueElement = document.getElementById("lookup-value")
    clearChildNodes(valueElement)
    valueElement.clea
    var text = document.createElement("p")
    if (value != null) {
        var copy = document.createElement("button")
        copy.classList.add("btn")
        copy.classList.add("btn-link")
        copy.innerText = "copy"
        copy.addEventListener("click", (event) => copyToClipboard(value))
        valueElement.appendChild(copy)
        textBody = value

    }

    else {
        textBody = "variable not found"
        text.classList.add("red-font")
    }

    text.appendChild(document.createTextNode(textBody))
    valueElement.appendChild(text)
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