function createRows(items) {
    var table = document.getElementsByClassName("table")[0]
    var tbody = document.createElement("tbody");
    var pairs = Object.entries(items);
    for (x=0;x<pairs.length; x++) {
        console.log(pairs[x][0])
        tbody.appendChild(createRow(x+1, pairs[x][0], pairs[x][1]))
    }

    table.appendChild(tbody)
}

function createRow(index, key, value) {
    var tRow = document.createElement("tr");
    var idCol = document.createElement("td")
    idCol.innerText = index
    tRow.appendChild(idCol)
    var keyCol = document.createElement("td")
    keyCol.innerText = key
    tRow.appendChild(keyCol)
    var valCol = document.createElement("td")
    valCol.innerText = value;
    tRow.appendChild(valCol)

    return tRow

}

chrome.storage.sync.get(null, createRows)

// var rows = getRowBody()
// var table = document.getElementsByClassName("table")[0]
// function getRowBody() {
//     var body = document.createElement("tbody")
//     getRows();

// }

// function getRows() {
//     keys =[]
//     chrome.storage.sync.get(null, (items) => {
//         var allKeys = Object.keys(items);
//         console.log(allKeys);

//     } )
// }