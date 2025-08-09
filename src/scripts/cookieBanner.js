document.addEventListener("DOMContentLoaded", function () {
    let cookieBanner = document.getElementById("cookie-banner");
    let acceptButton = document.getElementById("accept-cookies");
    let declineButton = document.getElementById("decline-cookies");

    function showBanner() {
        cookieBanner.style.visibility = "visible";
        cookieBanner.style.opacity = "1";
    }

    function hideBanner() {
        cookieBanner.style.opacity = "0";
        setTimeout(() => {
            cookieBanner.style.visibility = "hidden";
        }, 300); // Matches the CSS transition
    }

    // Check if consent is already given
    if (localStorage.getItem("cookieConsent") === "accepted") {
        enableTracking();
        hideBanner();
    } else if (localStorage.getItem("cookieConsent") === "declined") {
        disableTracking();
        hideBanner();
    } else {
        showBanner(); // Ensure banner fades in instead of shifting
    }

    // Accept button event
    acceptButton.addEventListener("click", function () {
        localStorage.setItem("cookieConsent", "accepted");
        enableTracking();
        hideBanner();
    });

    // Decline button event
    declineButton.addEventListener("click", function () {
        localStorage.setItem("cookieConsent", "declined");
        disableTracking();
        hideBanner();
    });

    function enableTracking() {
        // Dynamically add Google Analytics script if user accepts cookies
        let analyticsScript = document.createElement("script");
        analyticsScript.async = true;
        analyticsScript.src = "https://www.googletagmanager.com/gtag/js?id=G-MEX5S05GEQ";
        document.head.appendChild(analyticsScript);

        let analyticsInit = document.createElement("script");
        analyticsInit.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-MEX5S05GEQ');
        `;
        document.head.appendChild(analyticsInit);
    }

    function disableTracking() {
        // Block Google Analytics script
        window['ga-disable-G-MEX5S05GEQ'] = true;
    }
});
