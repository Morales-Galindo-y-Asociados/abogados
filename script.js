function initMap() {
    console.log("Initializing Google Map");
    try {
        const offices = [
            { lat: 19.0434, lng: -98.1986, title: "Puebla - Reforma" },
            { lat: 18.6769, lng: -97.3447, title: "Tecamachalco" },
            { lat: 20.1833, lng: -98.0167, title: "Chignahuapan" },
            { lat: 18.2797, lng: -97.2239, title: "Ajalpan" },
            { lat: 19.1128, lng: -97.2950, title: "Esperanza" }
        ];
        const map = new google.maps.Map(document.getElementById("map-container"), {
            zoom: 8,
            center: { lat: 19.0434, lng: -98.1986 },
            styles: [
                { elementType: "geometry", stylers: [{ color: "#212121" }] },
                { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
                { elementType: "labels.text.fill", stylers: [{ color: "#FFD700" }] },
                { featureType: "road", elementType: "geometry", stylers: [{ color: "#424242" }] },
                { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] }
            ]
        });
        offices.forEach(office => {
            new google.maps.Marker({
                position: { lat: office.lat, lng: office.lng },
                map: map,
                title: office.title,
                icon: {
                    url: "images/logo.png",
                    scaledSize: new google.maps.Size(40, 40)
                }
            });
        });
    } catch (error) {
        console.error("Error initializing map:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded, starting loader sequence");
    try {
        const loaderLogo = document.getElementById('loader-logo');
        if (!loaderLogo) {
            console.error("Loader logo element not found");
            throw new Error("Missing loader-logo");
        }
        loaderLogo.addEventListener('error', () => {
            console.error("Failed to load logo image at images/logo.png");
        });

        // Hide loader and show content after 3 seconds
        setTimeout(() => {
            console.log("Attempting to hide loader and show main content");
            const loader = document.getElementById('loader');
            const mainHeader = document.getElementById('main-header');
            const mainContent = document.getElementById('main-content');
            
            if (!loader || !mainHeader || !mainContent) {
                console.error("Required elements not found:", { loader, mainHeader, mainContent });
                // Fallback: Force show content
                document.querySelectorAll('#loader, #main-header, #main-content').forEach(el => {
                    if (el.id === 'loader') el.style.display = 'none';
                    else el.style.display = 'block';
                });
                return;
            }

            loader.style.opacity = '0';
            loader.style.transition = 'opacity 1s';
            setTimeout(() => {
                console.log("Loader hidden, showing main content");
                loader.style.display = 'none';
                mainHeader.style.display = 'block';
                mainContent.style.display = 'block';

                // Hero slides animation
                const slides = document.querySelectorAll('#hero-animation .slide');
                if (slides.length === 0) {
                    console.error("No slides found for hero animation");
                    // Fallback: Ensure Inicio is visible
                    document.getElementById('main-content').style.display = 'block';
                    return;
                }
                console.log(`Found ${slides.length} slides for hero animation`);
                let currentSlide = 0;
                const showSlide = (index) => {
                    console.log(`Showing slide ${index}`);
                    gsap.to(slides[currentSlide], { opacity: 0, scale: 1.05, duration: 1.5, ease: "power2.out" });
                    currentSlide = index % slides.length;
                    gsap.to(slides[currentSlide], { opacity: 0.8, scale: 1, duration: 1.5, ease: "power2.out" });
                };
                showSlide(0);
                setInterval(() => showSlide(currentSlide + 1), 5000);
                initMap();
            }, 1000);
        }, 3000);

        // Fallback: Force hide loader after 5 seconds
        setTimeout(() => {
            const loader = document.getElementById('loader');
            if (loader && loader.style.display !== 'none') {
                console.log("Fallback: Forcing loader hide");
                loader.style.display = 'none';
                document.getElementById('main-header').style.display = 'block';
                document.getElementById('main-content').style.display = 'block';
                const slides = document.querySelectorAll('#hero-animation .slide');
                if (slides.length > 0) {
                    let currentSlide = 0;
                    const showSlide = (index) => {
                        gsap.to(slides[currentSlide], { opacity: 0, scale: 1.05, duration: 1.5, ease: "power2.out" });
                        currentSlide = index % slides.length;
                        gsap.to(slides[currentSlide], { opacity: 0.8, scale: 1, duration: 1.5, ease: "power2.out" });
                    };
                    showSlide(0);
                    setInterval(() => showSlide(currentSlide + 1), 5000);
                }
                initMap();
            }
        }, 5000);
    } catch (error) {
        console.error("Critical error in loader sequence:", error);
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
        document.getElementById('main-header').style.display = 'block';
        document.getElementById('main-content').style.display = 'block';
        initMap();
    }
});
