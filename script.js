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

function showSection(sectionId) {
    console.log(`Showing section: ${sectionId}`);
    const sections = document.querySelectorAll('.section');
    const targetSection = document.getElementById(sectionId);

    if (!targetSection) {
        console.error(`Section ${sectionId} not found`);
        return;
    }

    // Fade out all sections
    sections.forEach(section => {
        if (section.classList.contains('active')) {
            gsap.to(section, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.out",
                onComplete: () => {
                    section.classList.remove('active');
                    section.style.display = 'none';
                }
            });
        }
    });

    // Fade in target section
    gsap.set(targetSection, { opacity: 0, display: 'block' });
    targetSection.classList.add('active');
    gsap.to(targetSection, { opacity: 1, duration: 0.5, ease: "power2.in" });

    // Run section-specific animations
    if (sectionId === 'inicio') {
        gsap.from("#inicio h1", { opacity: 0, y: 50, duration: 1.5, ease: "power3.out", delay: 0.5 });
        gsap.from("#inicio p", { opacity: 0, y: 30, duration: 1.5, ease: "power3.out", delay: 1 });
        gsap.from("#inicio a", { opacity: 0, scale: 0.8, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 1.5 });
    } else if (sectionId === 'about') {
        gsap.from("#about h2", { opacity: 0, y: 30, duration: 1, ease: "power2.out", delay: 0.3 });
        gsap.from("#about p", { opacity: 0, y: 30, duration: 1, ease: "power2.out", delay: 0.5 });
        gsap.from(".lawyer-card", { opacity: 0, y: 50, duration: 1, stagger: 0.2, ease: "power2.out", delay: 0.7 });
    } else if (sectionId === 'services') {
        gsap.from("#services h2", { opacity: 0, y: 30, duration: 1, ease: "power2.out", delay: 0.3 });
        gsap.from(".service-card", { opacity: 0, y: 50, duration: 1, stagger: 0.2, ease: "power2.out", delay: 0.5 });
        document.querySelectorAll('.service-card').forEach(card => {
            gsap.from(card.querySelectorAll('.service-item'), {
                opacity: 0,
                y: 20,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.7
            });
        });
    } else if (sectionId === 'contact') {
        gsap.from("#contact h2", { opacity: 0, y: 30, duration: 1, ease: "power2.out", delay: 0.3 });
        gsap.from("#contact p", { opacity: 0, y: 30, duration: 1, ease: "power2.out", delay: 0.5 });
        gsap.from("#contact .grid > div", { opacity: 0, y: 50, duration: 1, stagger: 0.2, ease: "power2.out", delay: 0.7 });
        gsap.from("#contact iframe", { opacity: 0, y: 50, duration: 1, ease: "power2.out", delay: 0.9 });
    } else if (sectionId === 'map') {
        gsap.from("#map h2", { opacity: 0, y: 30, duration: 1, ease: "power2.out", delay: 0.3 });
        gsap.from("#map-container", { opacity: 0, y: 50, duration: 1, ease: "power2.out", delay: 0.5 });
        initMap();
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

        setTimeout(() => {
            console.log("Hiding loader and showing main content");
            const loader = document.getElementById('loader');
            const mainHeader = document.getElementById('main-header');
            const inicioSection = document.getElementById('inicio');

            if (!loader || !mainHeader || !inicioSection) {
                console.error("Required elements not found:", { loader, mainHeader, inicioSection });
                document.querySelectorAll('#loader, #main-header, #inicio').forEach(el => {
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
                inicioSection.style.display = 'block';
                inicioSection.classList.add('active');

                // Initialize hero slideshow
                const slides = document.querySelectorAll('#hero-animation .slide');
                if (slides.length === 0) {
                    console.error("No slides found for hero animation");
                } else {
                    console.log(`Found ${slides.length} slides for hero animation`);
                    let currentSlide = 0;
                    const showSlide = (index) => {
                        console.log(`Showing slide ${index}`);
                        gsap.to(slides[currentSlide], { opacity: 0, scale: 1.1, duration: 2, ease: "power2.out" });
                        currentSlide = index % slides.length;
                        gsap.to(slides[currentSlide], { opacity: 1, scale: 1, duration: 2, ease: "power2.out" });
                    };
                    showSlide(0);
                    setInterval(() => showSlide(currentSlide + 1), 6000);
                }

                // Initialize animations for Inicio
                gsap.from("#inicio h1", { opacity: 0, y: 50, duration: 1.5, ease: "power3.out", delay: 0.5 });
                gsap.from("#inicio p", { opacity: 0, y: 30, duration: 1.5, ease: "power3.out", delay: 1 });
                gsap.from("#inicio a", { opacity: 0, scale: 0.8, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 1.5 });

                // Initialize hover effects for lawyer cards
                const lawyerCards = document.querySelectorAll('.lawyer-card');
                lawyerCards.forEach(card => {
                    card.addEventListener('mouseenter', () => {
                        gsap.to(card.querySelector('img'), { scale: 1.1, duration: 0.3 });
                        gsap.to(card.querySelector('.shadow'), { opacity: 1, duration: 0.3 });
                    });
                    card.addEventListener('mouseleave', () => {
                        gsap.to(card.querySelector('img'), { scale: 1, duration: 0.3 });
                        gsap.to(card.querySelector('.shadow'), { opacity: 0, duration: 0.3 });
                    });
                });

                // Initialize hover effects for service cards
                const serviceCards = document.querySelectorAll('.service-card');
                serviceCards.forEach(card => {
                    card.addEventListener('mouseenter', () => {
                        gsap.to(card.querySelector('.service-title'), {
                            scale: 1.05,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                        gsap.to(card, {
                            scale: 1.05,
                            boxShadow: "0 0 15px rgba(255, 215, 0, 0.3)",
                            duration: 0.3
                        });
                    });
                    card.addEventListener('mouseleave', () => {
                        gsap.to(card.querySelector('.service-title'), {
                            scale: 1,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                        gsap.to(card, {
                            scale: 1,
                            boxShadow: "0 0 0 rgba(255, 215, 0, 0)",
                            duration: 0.3
                        });
                    });
                });

                // Navigation event listeners
                document.querySelectorAll('nav a[data-section], #inicio a[data-section]').forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const sectionId = link.getAttribute('data-section');
                        showSection(sectionId);
                    });
                });

            }, 1000);
        }, 3000);

        setTimeout(() => {
            const loader = document.getElementById('loader');
            if (loader && loader.style.display !== 'none') {
                console.log("Fallback: Forcing loader hide");
                loader.style.display = 'none';
                document.getElementById('main-header').style.display = 'block';
                document.getElementById('inicio').style.display = 'block';
                document.getElementById('inicio').classList.add('active');
                showSection('inicio');
            }
        }, 5000);
    } catch (error) {
        console.error("Critical error in loader sequence:", error);
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
        document.getElementById('main-header').style.display = 'block';
        document.getElementById('inicio').style.display = 'block';
        document.getElementById('inicio').classList.add('active');
        showSection('inicio');
    }
});
