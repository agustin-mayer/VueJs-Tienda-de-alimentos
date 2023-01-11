const button = document.querySelector("button")

button.addEventListener("click", () => {
    Notification.requestPermission().then(perm => {
        if (perm === "granted") {
            alert(new Notification("¡Las cervezas estan en oferta!"))
        }
    })
})