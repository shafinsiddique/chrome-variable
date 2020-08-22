
var forms = document.querySelectorAll("form")
chrome.browserAction.onClicked.addListener(function(tab) {
    console.log("working")
});

// for (x =0; x<forms.length; x++) {
//     for (y=0; y<forms[x].elements.length; y++) {
//         element = forms[x].elements[y];

//         try {
//             element.value = "test"
//         }

//         catch {

//         }
//     }
// }