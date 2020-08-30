function createRows(items) {
    var table = document.getElementsByClassName("table")[0]
    var tbody = document.createElement("tbody");
    var pairs = Object.entries(items);
    for (x=0;x<pairs.length; x++) {
        tbody.appendChild(createRow(x+1, pairs[x][0], pairs[x][1]))
    }

    table.appendChild(tbody)
}

function delKey(key) {
    chrome.storage.sync.remove(key, (items) => {})
}

function onChanges() {
    var form = document.querySelectorAll("form")[0]
    var keyObj = form.elements.namedItem("key")
    var valueObj = form.elements.namedItem("value")
    var new_key = keyObj.value
    var new_value = valueObj.value
    var original_key = keyObj.defaultValue

    if (new_value.trim() && new_key.trim() ) {
        if (new_key != original_key) {
            delKey(original_key)
        }

        chrome.storage.sync.set({[new_key]: new_value}, () => {})
        sendOutput(true, false)
    }

    else {
        sendOutput(false, false)
    }
}

function clearChildNodes(element) {
    while (element.firstChild) {
        element.firstChild.remove()
    }
}

function sendOutput(valid, deleted) {
    element = document.getElementById("message")
    clearChildNodes(element)
    if (valid) {
        if (deleted) {
            html = "<p>variable has been deleted</p>"
        }
        else {
            html = "<p>variable has been changed</p>"
        }
    }

    else {
        html = "<p class='red-font'>name or value cannot be empty</p>" 
    }

    element.innerHTML = html
}

function setButtonListeners(key, value) {
    var edit = document.getElementById("edit")
    var del = document.getElementById("delete")
    edit.addEventListener("click", (ev) => {
        onChanges()
    })

    del.addEventListener("click", (ev) => {
        delKey(key)
        sendOutput(true, true)

    })
}
function onEdit(k, v) {
    modal = document.querySelector(".modal")
    modal.style.display = "block"
    window.onclick = function(e){
        if(e.target == modal){
            modal.style.display = "none"
            location.reload()
        }
    
    var form = document.querySelectorAll("form")[0]
    var key = form.elements.namedItem("key")
    var value = form.elements.namedItem("value")
    key.defaultValue = k
    value.defaultValue = v 
    setButtonListeners(k, v)
}
}

function createRow(index, key, value) {
    var tRow = document.createElement("tr");
    var idCol = document.createElement("td")
    idCol.innerText = index
    var keyCol = document.createElement("td")
    keyCol.innerText = key
    tRow.appendChild(keyCol)
    var valCol = document.createElement("td")
    valCol.innerText = value;
    tRow.appendChild(valCol)
    var button = document.createElement("button")
    button.setAttribute("id","edit-button")
    button.setAttribute("type","button")
    button.setAttribute("data-toggle","modal")
    button.setAttribute("data-target","#exampleModal")
    button.classList.add("btn")
    button.classList.add("btn-link")
    button.innerText = "Edit"
    button.addEventListener('click', () => onEdit(key, value))
    tRow.appendChild(button)
    return tRow
}

chrome.storage.sync.get(null, createRows)


