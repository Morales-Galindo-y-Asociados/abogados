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
    try {
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
            gsap.from("#map-container", { opacity: 0, y: 50, duration: 1, ease: "power2.out", delay: 0.5 });
            initMap();
        }
    } catch (error) {
        console.error("Error in showSection:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded, starting initialization");
    try {
        const loader = document.getElementById('loader');
        const mainHeader = document.getElementById('main-header');
        const inicioSection = document.getElementById('inicio');
        const loaderLogo = document.getElementById('loader-logo');

        if (!loader || !mainHeader || !inicioSection || !loaderLogo) {
            console.error("Critical elements missing:", { loader, mainHeader, inicioSection, loaderLogo });
            throw new Error("Missing required DOM elements");
        }

        loaderLogo.addEventListener('error', () => {
            console.error("Failed to load logo image at images/logo.png. Ensure the file exists in the images folder.");
        });

        // File upload handling
        const fileInput = document.getElementById('files');
        const filePreview = document.getElementById('file-preview');
        let selectedFiles = [];

        fileInput.addEventListener('change', (e) => {
            try {
                const newFiles = Array.from(e.target.files);
                selectedFiles = [...selectedFiles, ...newFiles];
                updateFilePreview();
                fileInput.value = ''; // Reset input
            } catch (error) {
                console.error("Error handling file input:", error);
            }
        });

        function updateFilePreview() {
            try {
                filePreview.innerHTML = '';
                selectedFiles.forEach((file, index) => {
                    const fileContainer = document.createElement('div');
                    fileContainer.className = 'relative flex items-center bg-gray-800 border border-gold-600 rounded-lg p-2';

                    const fileName = document.createElement('span');
                    fileName.className = 'text-gray-200 truncate max-w-[150px]';
                    fileName.textContent = file.name;

                    const deleteButton = document.createElement('button');
                    deleteButton.type = 'button';
                    deleteButton.className = 'ml-2 text-red-500 hover:text-red-400';
                    deleteButton.innerHTML = '×';
                    deleteButton.addEventListener('click', () => {
                        selectedFiles.splice(index, 1);
                        updateFilePreview();
                    });

                    fileContainer.appendChild(fileName);
                    fileContainer.appendChild(deleteButton);
                    filePreview.appendChild(fileContainer);
                });
            } catch (error) {
                console.error("Error updating file preview:", error);
            }
        }

        // Simplified loader sequence
        console.log("Starting loader sequence");
        setTimeout(() => {
            try {
                console.log("Hiding loader");
                gsap.to(loader, {
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out",
                    onComplete: () => {
                        loader.style.display = 'none';
                        mainHeader.style.display = 'block';
                        inicioSection.style.display = 'block';
                        inicioSection.classList.add('active');
                        console.log("Loader hidden, showing main content");
                        initializeContent();
                    }
                });
            } catch (error) {
                console.error("Error hiding loader:", error);
                forceShowContent();
            }
        }, 3000);

        // Fallback to force content display
        setTimeout(() => {
            if (loader.style.display !== 'none') {
                console.warn("Fallback: Forcing content display");
                forceShowContent();
            }
        }, 6000);

        function forceShowContent() {
            try {
                loader.style.display = 'none';
                mainHeader.style.display = 'block';
                inicioSection.style.display = 'block';
                inicioSection.classList.add('active');
                console.log("Forced content display");
                initializeContent();
            } catch (error) {
                console.error("Error in forceShowContent:", error);
            }
        }

        function initializeContent() {
            try {
                // Hero animation
                const slides = document.querySelectorAll('#hero-animation .slide');
                if (slides.length === 0) {
                    console.warn("No slides found for hero animation");
                } else {
                    console.log(`Found ${slides.length} slides`);
                    let currentSlide = 0;
                    const showSlide = (index) => {
                        try {
                            gsap.to(slides[currentSlide], { opacity: 0, scale: 1.1, duration: 2, ease: "power2.out" });
                            currentSlide = index % slides.length;
                            gsap.to(slides[currentSlide], { opacity: 1, scale: 1, duration: 2, ease: "power2.out" });
                        } catch (error) {
                            console.error("Error in slide animation:", error);
                        }
                    };
                    showSlide(0);
                    setInterval(() => showSlide(currentSlide + 1), 6000);
                }

                // Initial animations
                gsap.from("#inicio h1", { opacity: 0, y: 50, duration: 1.5, ease: "power3.out", delay: 0.5 });
                gsap.from("#inicio p", { opacity: 0, y: 30, duration: 1.5, ease: "power3.out", delay: 1 });
                gsap.from("#inicio .case-button", { opacity: 0, scale: 0.8, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 1.5 });

                // Lawyer card hover effects
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

                // Service card hover effects
                const serviceCards = document.querySelectorAll('.service-card');
                serviceCards.forEach(card => {
                    card.addEventListener('mouseenter', () => {
                        gsap.to(card.querySelector('.service-title'), { scale: 1.05, duration: 0.3, ease: "power2.out" });
                        gsap.to(card, { scale: 1.05, boxShadow: "0 0 15px rgba(255, 215, 0, 0.3)", duration: 0.3 });
                    });
                    card.addEventListener('mouseleave', () => {
                        gsap.to(card.querySelector('.service-title'), { scale: 1, duration: 0.3, ease: "power2.out" });
                        gsap.to(card, { scale: 1, boxShadow: "0 0 0 rgba(255, 215, 0, 0)", duration: 0.3 });
                    });
                });

                // Navigation links
                document.querySelectorAll('nav a[data-section], .case-button').forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        const sectionId = link.getAttribute('data-section');
                        showSection(sectionId);
                    });
                });

                // Form submission
                const caseForm = document.getElementById('case-form');
                caseForm.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    try {
                        const formData = new FormData(caseForm);
                        const webAppUrl = 'https://script.google.com/macros/s/AKfycbzt820yrgQzv6YeKOGrLuoQW1xK_erc3ijJLyXu_C4ncbTB9bI-bFITh59hADKpg_p_/exec';
                        const maxFileSize = 10 * 1024 * 1024; // 10MB

                        // Validate file sizes
                        for (const file of selectedFiles) {
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
                        if (selectedFiles.length > 0) {
                            const filePromises = selectedFiles.map(file => {
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

                        // Submit to Web App
                        console.log('Submitting form to:', webAppUrl);
                        const response = await fetch(webAppUrl, {
                            method: 'POST',
                            mode: 'no-cors',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(textData)
                        });

                        console.log('Form submitted, assuming success');
                        alert('¡Gracias! Tu caso ha sido enviado. Pronto te contactaremos.');
                        caseForm.reset();
                        selectedFiles = [];
                        updateFilePreview();
                    } catch (error) {
                        console.error('Error submitting form:', error);
                        alert(`Hubo un error al enviar tu caso: ${error.message || 'No se pudo conectar con el servidor'}. Por favor, intenta de nuevo.`);
                    }
                });
            } catch (error) {
                console.error("Error initializing content:", error);
            }
        }
    } catch (error) {
        console.error("Critical error in DOMContentLoaded:", error);
        // Emergency fallback
        setTimeout(() => {
            const loader = document.getElementById('loader');
            const mainHeader = document.getElementById('main-header');
            const inicioSection = document.getElementById('inicio');
            if (loader && mainHeader && inicioSection) {
                loader.style.display = 'none';
                mainHeader.style.display = 'block';
                inicioSection.style.display = 'block';
                inicioSection.classList.add('active');
                console.log("Emergency content display");
            }
        }, 1000);
    }
});
