function initMap() {
    console.log("Initializing Google Map");
    try {
        const offices = [
            { 
                lat: 19.0566, 
                lng: -98.2347, 
                title: "Puebla - Reforma", 
                address: "Blvrd Esteban de Antuñano 2702, Piso 5, Reforma, 72160 Puebla, Pue. México",
                phones: ["(+52) 2226401809", "(+52) 5633572693"]
            },
            { 
                lat: 19.1128, 
                lng: -97.2950, 
                title: "Puebla - Esperanza", 
                address: "Avenida Independencia 11, Piso 2, Esperanza, C.P 75560, Puebla, México",
                phones: ["(+52) 2226401809", "(+52) 5633572693"]
            },
            { 
                lat: 19.4341, 
                lng: -99.1747, 
                title: "Ciudad de México", 
                address: "Calz. Gral. Mariano Escobedo n°510 Penthouse, Col. Anzures, C.P. 11590, Alcaldia Miguel Hidalgo, Ciudad de Mexico",
                phones: ["(+52) 2226401809", "(+52) 5633572693"]
            }
        ];
        const map = new google.maps.Map(document.getElementById("map-container"), {
            zoom: 6,
            center: { lat: 19.2439, lng: -98.7049 }, // Center between Puebla and CDMX
            styles: [
                { elementType: "geometry", stylers: [{ color: "#212121" }] },
                { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
                { elementType: "labels.text.fill", stylers: [{ color: "#FFD700" }] },
                { featureType: "road", elementType: "geometry", stylers: [{ color: "#424242" }] },
                { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] }
            ]
        });
        offices.forEach(office => {
            const marker = new google.maps.Marker({
                position: { lat: office.lat, lng: office.lng },
                map: map,
                title: office.title,
                icon: {
                    url: "images/logo.png",
                    scaledSize: new google.maps.Size(40, 40)
                }
            });
            const phoneContent = office.phones.map(phone => `<p class="text-gray-800 font-medium">${phone}</p>`).join('');
            const infoWindow = new google.maps.InfoWindow({
                content: `
                    <div class="info-window" style="font-family: 'Arial', sans-serif; padding: 15px; background: #FFFFFF; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.3); max-width: 250px;">
                        <h3 style="color: #FFD700; font-size: 18px; font-weight: bold; margin-bottom: 10px;">${office.title}</h3>
                        <p style="color: #1F2937; font-size: 14px; line-height: 1.5; margin-bottom: 10px;">${office.address}</p>
                        ${phoneContent}
                    </div>
                `
            });
            marker.addListener("click", () => {
                infoWindow.open(map, marker);
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

    gsap.set(targetSection, { opacity: 0, display: 'block' });
    targetSection.classList.add('active');
    gsap.to(targetSection, { opacity: 1, duration: 0.5, ease: "power2.in" });

    if (sectionId === 'inicio') {
        gsap.from("#inicio h1", { opacity: 0, y: 50, duration: 1.5, ease: "power3.out", delay: 0.5 });
        gsap.from("#inicio p", { opacity: 0, y: 30, duration: 1.5, ease: "power3.out", delay: 1 });
        gsap.from("#inicio .case-button", { opacity: 0, scale: 0.8, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 1.5 });
    } else if (sectionId === 'about') {
        gsap.from("#about h2", { opacity: 0, y: 30, duration: 1, ease: "power2.out", delay: 0.3 });
        gsap.from("#about p", { opacity: 0, y: 30, duration: 1, ease: "power2.out", delay: 0.5 });
        gsap.from(".lawyer-card", { opacity: 0, y: 50, duration: 1, stagger: 0.2, ease: "power2.out", delay: 0.7 });
        gsap.from("#about .case-button", { opacity: 0, scale: 0.8, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 0.9 });
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
        gsap.from("#services .case-button", { opacity: 0, scale: 0.8, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 0.9 });
    } else if (sectionId === 'contact') {
        gsap.from("#contact h2", { opacity: 0, y: 30, duration: 1, ease: "power2.out", delay: 0.3 });
        gsap.from("#contact p", { opacity: 0, y: 30, duration: 1, ease: "power2.out", delay: 0.5 });
        gsap.from("#case-form > div", { opacity: 0, y: 50, duration: 1, stagger: 0.2, ease: "power2.out", delay: 0.7 });
        gsap.from("#contact .grid > div", { opacity: 0, y: 50, duration: 1, stagger: 0.2, ease: "power2.out", delay: 0.9 });
    } else if (sectionId === 'map') {
        gsap.from("#map h2", { opacity: 0, y: 30, duration: 1, ease: "power2.out", delay: 0.3 });
        gsap.from(".location-card", { opacity: 0, y: 50, duration: 1, stagger: 0.2, ease: "power2.out", delay: 0.5 });
        gsap.from("#map-container", { opacity: 0, y: 50, duration: 1, ease: "power2.out", delay: 0.9 });
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

                gsap.from("#inicio h1", { opacity: 0, y: 50, duration: 1.5, ease: "power3.out", delay: 0.5 });
                gsap.from("#inicio p", { opacity: 0, y: 30, duration: 1.5, ease: "power3.out", delay: 1 });
                gsap.from("#inicio .case-button", { opacity: 0, scale: 0.8, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 1.5 });

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

                document.querySelectorAll('nav a[data-section], .case-button').forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const sectionId = link.getAttribute('data-section');
                        showSection(sectionId);
                    });
                });

                const caseForm = document.getElementById('case-form');
                caseForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const formData = new FormData(caseForm);
                    const webAppUrl = 'https://script.google.com/macros/s/AKfycbzt820yrgQzv6YeKOGrLuoQW1xK_erc3ijJLyXu_C4ncbTB9bI-bFITh59hADKpg_p_/exec';
                    const maxFileSize = 10 * 1024 * 1024; // 10MB

                    try {
                        // Validate file sizes
                        const files = formData.getAll('files');
                        for (const file of files) {
                            if (file.size > maxFileSize) {
                                throw new Error(`El archivo ${file.name} excede el tamaño máximo de 10MB.`);
                            }
                        }

                        // Prepare text data
                        const textData = {
                            name: formData.get('name'),
                            birthplace: formData.get('birthplace'),
                            caseType: formData.get('case-type'),
                            description: formData.get('description'),
                            files: []
                        };

                        // Prepare file data
                        if (files.length > 0 && files[0].size > 0) {
                            const filePromises = files
                                .filter(file => file.size > 0)
                                .map(file => {
                                    return new Promise((resolve, reject) => {
                                        const reader = new FileReader();
                                        reader.onload = () => resolve({
                                            name: file.name,
                                            mimeType: file.type,
                                            data: reader.result.split(',')[1] // Base64 data
                                        });
                                        reader.onerror = reject;
                                        reader.readAsDataURL(file);
                                    });
                                });
                            textData.files = await Promise.all(filePromises);
                        }

                        // Submit to Web App
                        console.log('Submitting form to:', webAppUrl);
                        console.log('Form data:', textData);
                        const response = await fetch(webAppUrl, {
                            method: 'POST',
                            mode: 'no-cors', // Revert to no-cors to bypass CORS
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(textData)
                        });

                        // Since mode is 'no-cors', we can't read the response
                        console.log('Form submitted, assuming success (check server logs)');
                        alert('¡Gracias! Tu caso ha sido enviado. Pronto te contactaremos.');
                        caseForm.reset();
                    } catch (error) {
                        console.error('Error submitting form:', error);
                        alert(`Hubo un error al enviar tu caso: ${error.message || 'No se pudo conectar con el servidor'}. Por favor, intenta de nuevo.`);
                    }
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
