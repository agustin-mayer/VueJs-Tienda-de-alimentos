const PUBLIC_VAPID_KEY = 'BJbVEBkf9oC1Qb9FblEQLBLczv6f-7gxkiFROiLVGlVAIMPQt6FGBExYduTOLBWPcDz2_1xOsqqDf9pRLqnBQ-Y'

function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

//esto envia la subscripcion cuando registra el service worker
const subscripcion = async () => {
    if ('serviceWorker' in navigator) {
        // Service Worker
        const register = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
        })
        console.log('New Service Worker')

        const subscription = await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY) //clave publica provista por el servicio web
        })

        await fetch('https://promo-iaw-web-service.vercel.app/subscription', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log("Subscribed")
    }
}


subscripcion()