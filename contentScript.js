var forms = document.querySelectorAll('form')

for (x=0; x<forms.length; x++) {
    form = forms[x];

    for (y = 0; y<form.elements.length; y++) {
        element = form.elements[y]

        try {
            element.addEventListener('keyup', function(e) {
                if (this.value == "test") {
                    this.value = "Hi!"
                }
            })
        }

        catch {
            console.log("error")
        }
    }
}