// Initialize Google Map (deferred until map section is shown)
function initMap() {
    console.log("Initializing Google Map");
    const mapContainer = document.getElementById("map-container");
    if (!mapContainer) {
        console.error("Map container not found");
        return;
    }
    try {
        const offices = [
            { lat: 19.0566, lng: -98.2347, title: "Puebla - Reforma", address: "Blvrd Esteban de Antuñano 2702, Piso 5, Reforma, 72160 Puebla, Pue. México" },
            { lat: 19.1128, lng: -97.2950, title: "Puebla - Esperanza", address: "Avenida Independencia 11, Piso 2, Esperanza, C.P 75560, Puebla, México" },
            { lat: 19.4341, lng: -99.1747, title: "Ciudad de México", address: "Calz. Gral. Mariano Escobedo n°510 Penthouse, Col. Anzures, C.P. 11590, Alcaldia Miguel Hidalgo, Ciudad de Mexico" }
        ];
        const map = new google.maps.Map(mapContainer, {
            zoom: 8,
            center: { lat: 19.0566, lng: -98.2347 },
            styles: [
                { elementType: "geometry", stylers: [{ color: "#000000" }] },
                { elementType: "labels.text.fill", stylers: [{ color: "#FFD700" }] },
                { elementType: "labels.text.stroke", stylers: [{ color: "#1F2937" }] },
                { featureType: "road", elementType: "geometry", stylers: [{ color: "#4B5563" }] },
                { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#6B7280" }] },
                { featureType: "water", elementType: "geometry", stylers: [{ color: "#1E3A8A" }] },
                { featureType: "poi", elementType: "geometry", stylers: [{ color: "#374151" }] },
                { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#1F2937" }] }
            ]
        });
        offices.forEach(office => {
            const marker = new google.maps.Marker({
                position: { lat: office.lat, lng: office.lng },
                map: map,
                title: office.title,
                icon: {
                    url: "images/logo.png",
                    scaledSize: new google.maps.Size(60, 60)
                }
            });
            const infoWindow = new google.maps.InfoWindow({
                content: `<h3 class="text-gold-400 font-semibold">${office.title}</h3><p class="text-gray-200">${office.address}</p>`
            });
            marker.addListener("click", () => {
                infoWindow.open(map, marker);
            });
        });
    } catch (error) {
        console.error("Error initializing map:", error);
    }
}

// Show section with animations
function showSection(sectionId) {
    console.log(`Showing section: ${sectionId}`);
    const sections = document.querySelectorAll('.section');
    const targetSection = document.getElementById(sectionId);

    if (!targetSection) {
        console.error(`Section ${sectionId} not found`);
        return;
    }

    const safeGSAP = typeof gsap !== 'undefined' ? gsap : {
        to: (el, opts) => {
            el.style.transition = 'opacity 0.5s';
            el.style.opacity = opts.opacity;
            setTimeout(() => opts.onComplete(), 500);
        },
        from: () => console.warn("GSAP not loaded, skipping animation"),
        set: (el, opts) => Object.assign(el.style, opts)
    };

    sections.forEach(section => {
        if (section.classList.contains('active')) {
            safeGSAP.to(section, {
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

    safeGSAP.set(targetSection, { opacity: 0, display: 'block' });
    targetSection.classList.add('active');
    safeGSAP.to(targetSection, { opacity: 1, duration: 0.5, ease: "power2.in" });

    if (sectionId === 'inicio') {
        safeGSAP.from("#inicio h1", { opacity: 0, y: 50, duration: 1.5, ease: "power3.out", delay: 0.5 });
        safeGSAP.from("#inicio p", { opacity: 0, y: 30, duration: 1.5, ease: "power3.out", delay: 1 });
        safeGSAP.from("#inicio .case-button", { opacity: 0, scale: 0.8, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 1.5 });
    } else if (sectionId === 'about') {
        safeGSAP.from("#about h2", { opacity: 0, y: 30, duration: 1, ease: "power2.out", delay: 0.3 });
        safeGSAP.from("#about p", { opacity: 0, y: 30, duration: 1, ease: "power2.out", delay: 0.5 });
        safeGSAP.from(".lawyer-card", { opacity: 0, y: 50, duration: 1, stagger: 0.2, ease: "power2.out", delay: 0.7 });
        safeGSAP.from("#about .case-button", { opacity: 0, scale: 0.8, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 0.9 });
    } else if (sectionId === 'services') {
        safeGSAP.from("#services h2", { opacity: 0, y: 30, duration: 1, ease: "power2.out", delay: 0.3 });
        safeGSAP.from(".service-card", { opacity: 0, y: 50, duration: 1, stagger: 0.2, ease: "power2.out", delay: 0.5 });
        document.querySelectorAll('.service-card').forEach(card => {
            safeGSAP.from(card.querySelectorAll('.service-item'), {
                opacity: 0,
                y: 20,
                duration: 0.5,
                stagger: 0.1,
                ease: "power2.out",
                delay: 0.7
            });
        });
        safeGSAP.from("#services .case-button", { opacity: 0, scale: 0.8, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 0.9 });
    } else if (sectionId === 'contact') {
        safeGSAP.from("#contact h2", { opacity: 0, y: 30, duration: 1, ease: "power2.out", delay: 0.3 });
        safeGSAP.from("#contact p", { opacity: 0, y: 30, duration: 1, ease: "power2.out", delay: 0.5 });
        safeGSAP.from("#case-form > div", { opacity: 0, y: 50, duration: 1, stagger: 0.2, ease: "power2.out", delay: 0.7 });
        safeGSAP.from("#contact .grid > div", { opacity: 0, y: 50, duration: 1, stagger: 0.2, ease: "power2.out", delay: 0.9 });
    } else if (sectionId === 'map') {
        safeGSAP.from("#map h2", { opacity: 0, y: 30, duration: 1, ease: "power2.out", delay: 0.3 });
        safeGSAP.from(".location-card", { opacity: 0, y: 50, duration: 1, stagger: 0.2, ease: "power2.out", delay: 0.5 });
        safeGSAP.from("#map-container", { opacity: 0, y: 50, duration: 1, ease: "power2.out", delay: 0.9 });
        initMap();
    }
}

// Loader and initial setup
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded, starting loader sequence");

    const loader = document.getElementById('loader');
    const mainHeader = document.getElementById('main-header');
    const inicioSection = document.getElementById('inicio');

    // Check if critical elements exist
    if (!loader || !mainHeader || !inicioSection) {
        console.error("Missing critical elements:", { loader, mainHeader, inicioSection });
        if (loader) loader.style.display = 'none';
        if (mainHeader) mainHeader.style.display = 'block';
        if (inicioSection) {
            inicioSection.style.display = 'block';
            inicioSection.classList.add('active');
        }
        showSection('inicio');
        return;
    }

    // Fallback if GSAP is unavailable
    const safeGSAP = typeof gsap !== 'undefined' ? gsap : {
        to: (el, opts) => {
            console.warn("GSAP not loaded, using CSS fallback");
            el.style.transition = 'opacity 0.5s';
            el.style.opacity = opts.opacity;
            setTimeout(() => opts.onComplete(), 500);
        },
        from: () => console.warn("GSAP not loaded, skipping animation"),
        set: (el, opts) => Object.assign(el.style, opts)
    };

    // Hide loader after 2 seconds
    setTimeout(() => {
        console.log("Hiding loader and showing main content");
        safeGSAP.to(loader, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
                loader.style.display = 'none';
                mainHeader.style.display = 'block';
                inicioSection.style.display = 'block';
                inicioSection.classList.add('active');

                // Start hero slideshow
                const slides = document.querySelectorAll('#hero-animation .slide');
                if (slides.length > 0) {
                    console.log(`Found ${slides.length} slides for hero animation`);
                    let currentSlide = 0;
                    const showSlide = (index) => {
                        console.log(`Showing slide ${index}`);
                        safeGSAP.to(slides[currentSlide], { opacity: 0, scale: 1.1, duration: 2, ease: "power2.out" });
                        currentSlide = index % slides.length;
                        safeGSAP.to(slides[currentSlide], { opacity: 1, scale: 1, duration: 2, ease: "power2.out" });
                    };
                    showSlide(0);
                    setInterval(() => showSlide(currentSlide + 1), 6000);
                } else {
                    console.warn("No slides found for hero animation");
                }

                // Animate "Inicio" section
                safeGSAP.from("#inicio h1", { opacity: 0, y: 50, duration: 1.5, ease: "power3.out", delay: 0.5 });
                safeGSAP.from("#inicio p", { opacity: 0, y: 30, duration: 1.5, ease: "power3.out", delay: 1 });
                safeGSAP.from("#inicio .case-button", { opacity: 0, scale: 0.8, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 1.5 });
            }
        });
    }, 2000);

    // Hard fallback: Force hide loader after 4 seconds
    setTimeout(() => {
        if (loader && loader.style.display !== 'none') {
            console.log("Fallback: Forcing loader hide");
            loader.style.display = 'none';
            mainHeader.style.display = 'block';
            inicioSection.style.display = 'block';
            inicioSection.classList.add('active');
            showSection('inicio');
        }
    }, 4000);
});

// Lawyer and Service Card Animations
const lawyerCards = document.querySelectorAll('.lawyer-card');
lawyerCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const safeGSAP = typeof gsap !== 'undefined' ? gsap : {
            to: (el, opts) => {
                el.style.transition = 'all 0.3s';
                Object.assign(el.style, opts);
            }
        };
        safeGSAP.to(card.querySelector('img'), { scale: 1.1, duration: 0.3 });
        safeGSAP.to(card.querySelector('.shadow'), { opacity: 1, duration: 0.3 });
    });
    card.addEventListener('mouseleave', () => {
        const safeGSAP = typeof gsap !== 'undefined' ? gsap : {
            to: (el, opts) => {
                el.style.transition = 'all 0.3s';
                Object.assign(el.style, opts);
            }
        };
        safeGSAP.to(card.querySelector('img'), { scale: 1, duration: 0.3 });
        safeGSAP.to(card.querySelector('.shadow'), { opacity: 0, duration: 0.3 });
    });
});

const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const safeGSAP = typeof gsap !== 'undefined' ? gsap : {
            to: (el, opts) => {
                el.style.transition = 'all 0.3s';
                Object.assign(el.style, opts);
            }
        };
        safeGSAP.to(card.querySelector('.service-title'), { scale: 1.05, duration: 0.3, ease: "power2.out" });
        safeGSAP.to(card, { scale: 1.05, boxShadow: "0 0 15px rgba(255, 215, 0, 0.3)", duration: 0.3 });
    });
    card.addEventListener('mouseleave', () => {
        const safeGSAP = typeof gsap !== 'undefined' ? gsap : {
            to: (el, opts) => {
                el.style.transition = 'all 0.3s';
                Object.assign(el.style, opts);
            }
        };
        safeGSAP.to(card.querySelector('.service-title'), { scale: 1, duration: 0.3, ease: "power2.out" });
        safeGSAP.to(card, { scale: 1, boxShadow: "0 0 0 rgba(255, 215, 0, 0)", duration: 0.3 });
    });
});

// Navigation and Case Button Clicks
document.querySelectorAll('nav a[data-section], .case-button').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('data-section');
        showSection(sectionId);
    });
});

// Form Submission
const caseForm = document.getElementById('case-form');
caseForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(caseForm);
    const webAppUrl = 'https://script.google.com/macros/s/AKfycbzt820yrgQzv6YeKOGrLuoQW1xK_erc3ijJLyXu_C4ncbTB9bI-bFITh59hADKpg_p_/exec';
    const maxFileSize = 10 * 1024 * 1024; // 10MB

    try {
        const files = formData.getAll('files');
        for (const file of files) {
            if (file.size > maxFileSize) {
                throw new Error(`El archivo ${file.name} excede el tamaño máximo de 10MB.`);
            }
        }

        const textData = {
            name: formData.get('name'),
            birthplace: formData.get('birthplace'),
            caseType: formData.get('case-type'),
            description: formData.get('description'),
            files: []
        };

        if (files.length > 0 && files[0].size > 0) {
            const filePromises = files
                .filter(file => file.size > 0)
                .map(file => {
                    return new Promise((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve({
                            name: file.name,
                            mimeType: file.type,
                            data: reader.result.split(',')[1]
                        });
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    });
                });
            textData.files = await Promise.all(filePromises);
        }

        console.log('Submitting form to:', webAppUrl);
        const response = await fetch(webAppUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(textData)
        });

        console.log('Form submitted');
        alert('¡Gracias! Tu caso ha sido enviado. Pronto te contactaremos.');
        caseForm.reset();
    } catch (error) {
        console.error('Error submitting form:', error);
        alert(`Hubo un error al enviar tu caso: ${error.message || 'No se pudo conectar con el servidor'}. Por favor, intenta de nuevo.`);
    }
});

// Global error handler to catch unhandled errors
window.addEventListener('error', (event) => {
    console.error("Global error caught:", event.message, event.filename, event.lineno);
    const loader = document.getElementById('loader');
    if (loader && loader.style.display !== 'none') {
        console.log("Error detected, forcing loader hide");
        loader.style.display = 'none';
        document.getElementById('main-header').style.display = 'block';
        document.getElementById('inicio').style.display = 'block';
        document.getElementById('inicio').classList.add('active');
        showSection('inicio');
    }
});
