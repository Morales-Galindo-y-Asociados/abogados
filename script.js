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

    // Check if the target section is already active
    if (targetSection.classList.contains('active')) {
        console.log(`Section ${sectionId} is already active, no action needed`);
        return;
    }

    const safeGSAP = typeof gsap !== 'undefined' ? gsap : {
        to: (el, opts) => {
            el.style.transition = 'opacity 0.5s';
            el.style.opacity = opts.opacity;
            if (opts.onComplete) setTimeout(opts.onComplete, 500);
        },
        from: (el, opts) => {
            el.style.transition = `all ${opts.duration || 0.5}s ${opts.ease || 'ease'}`;
            el.style.opacity = 0;
            el.style.transform = `translateY(${opts.y || 0}px) scale(${opts.scale || 1})`;
            setTimeout(() => {
                el.style.opacity = 1;
                el.style.transform = 'translateY(0) scale(1)';
            }, 100);
        },
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

    // Update active nav link
    document.querySelectorAll('nav a[data-section]').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        }
    });

    // Section-specific animations
    if (sectionId === 'inicio') {
        safeGSAP.from("#inicio h2", { opacity: 0, y: 50, duration: 1.5, ease: "power3.out", delay: 0.5 });
        safeGSAP.from("#inicio p", { opacity: 0, y: 50, duration: 1.5, ease: "power3.out", delay: 0.7 });
        safeGSAP.from(".value-card", { opacity: 0, y: 50, scale: 0.9, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.9 });
        safeGSAP.from("#inicio .case-button", { opacity: 0, scale: 0.8, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 1.3 });
        safeGSAP.from("#inicio .caption p", { opacity: 0, x: 50, duration: 1.5, ease: "power3.out", delay: 1.5 });
        initializeSlideshow();
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

    // Re-animate WhatsApp bubble on section change
try {
    const whatsappBubble = document.getElementById('whatsapp-bubble');
    if (whatsappBubble) {
        safeGSAP.to(whatsappBubble, {
            y: -10,
            duration: 0.5,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
            delay: 0.5
        });
    }
} catch (error) {
    console.error("Error re-animating WhatsApp bubble:", error);
}
}

// Initialize hero slideshow
function initializeSlideshow() {
    const safeGSAP = typeof gsap !== 'undefined' ? gsap : {
        to: (el, opts) => {
            console.warn("GSAP not loaded, using CSS fallback");
            el.style.transition = 'opacity 1s, transform 1s';
            el.style.opacity = opts.opacity;
            el.style.transform = `scale(${opts.scale || 1})`;
        },
        set: (el, opts) => {
            el.style.opacity = opts.opacity !== undefined ? opts.opacity : el.style.opacity;
            el.style.transform = opts.scale !== undefined ? `scale(${opts.scale})` : el.style.transform;
        }
    };

    try {
        const slides = document.querySelectorAll('#hero-gallery .gallery-slide');
        const dots = document.querySelectorAll('#hero-gallery .gallery-dot');
        if (slides.length === 0 || dots.length === 0) {
            console.warn("No slides or dots found for gallery");
            return;
        }

        console.log(`Found ${slides.length} slides and ${dots.length} dots for gallery`);

        // Verify slide images are loaded
        slides.forEach((slide, index) => {
            const bgImage = slide.style.backgroundImage;
            if (!bgImage || bgImage === 'none') {
                console.warn(`Slide ${index} has no background image`);
                slide.style.backgroundColor = '#1F2937'; // Fallback color
            } else {
                const img = new Image();
                const url = bgImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
                img.src = url;
                img.onerror = () => console.error(`Failed to load image for slide ${index}: ${url}`);
                img.onload = () => console.log(`Image loaded for slide ${index}: ${url}`);
            }
        });

        // Reset all slides and dots
        slides.forEach(slide => safeGSAP.set(slide, { opacity: 0, scale: 1.1 }));
        dots.forEach(dot => dot.classList.remove('opacity-100'));

        // Show first slide and dot
        if (slides[0] && dots[0]) {
            safeGSAP.set(slides[0], { opacity: 1, scale: 1 });
            dots[0].classList.add('opacity-100');
        }

        let currentSlide = 0;
        let autoSlideInterval = null;

        const showSlide = (index) => {
            console.log(`Showing slide ${index}`);
            // Ensure index is within bounds
            index = ((index % slides.length) + slides.length) % slides.length;

            // Fade out current slide and dot
            if (slides[currentSlide] && dots[currentSlide]) {
                safeGSAP.to(slides[currentSlide], { opacity: 0, scale: 1.1, duration: 1, ease: "power2.out" });
                dots[currentSlide].classList.remove('opacity-100');
            }

            // Update current slide index
            currentSlide = index;

            // Fade in new slide and dot
            if (slides[currentSlide] && dots[currentSlide]) {
                safeGSAP.to(slides[currentSlide], { opacity: 1, scale: 1, duration: 1, ease: "power2.out" });
                dots[currentSlide].classList.add('opacity-100');
            }
        };

        // Auto-rotation
        const startAutoSlide = () => {
            if (autoSlideInterval) clearInterval(autoSlideInterval);
            autoSlideInterval = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 6000);
        };

        // Stop auto-rotation
        const stopAutoSlide = () => {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
                autoSlideInterval = null;
            }
        };

        // Dot navigation
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                console.log(`Dot ${index} clicked`);
                stopAutoSlide();
                showSlide(index);
                setTimeout(startAutoSlide, 10000); // Resume after 10s
            });
        });

        // Start auto-rotation
        startAutoSlide();
    } catch (error) {
        console.error("Error in gallery:", error);
        // Fallback: Show first slide statically
        const firstSlide = document.querySelector('#hero-gallery .gallery-slide');
        const firstDot = document.querySelector('#hero-gallery .gallery-dot');
        if (firstSlide) {
            firstSlide.style.opacity = 1;
            firstSlide.style.transform = 'scale(1)';
        }
        if (firstDot) firstDot.classList.add('opacity-100');
    }
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded, initializing content");

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });

        // Close mobile menu when a link is clicked
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
            });
        });
    } else {
        console.warn("Mobile menu elements not found:", { mobileMenuButton, mobileMenu });
    }

    // Set up navigation listeners
    document.querySelectorAll('nav a[data-section], .case-button, #logo-button').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Clicked link:', link.getAttribute('data-section') || 'inicio');
            const sectionId = link.getAttribute('data-section') || 'inicio';
            showSection(sectionId);
        });
    });

    const mainHeader = document.getElementById('main-header');
    const inicioSection = document.getElementById('inicio');

    if (!mainHeader || !inicioSection) {
        console.error("Missing critical elements:", { mainHeader, inicioSection });
        if (mainHeader) mainHeader.style.display = 'block';
        if (inicioSection) {
            inicioSection.style.display = 'block';
            inicioSection.classList.add('active');
            const contentElements = inicioSection.querySelectorAll('h2, p, h3, .caption, .case-button');
            contentElements.forEach(el => el.style.opacity = '1');
        }
        showSection('inicio');
        initializeSlideshow();
        return;
    }

    const safeGSAP = typeof gsap !== 'undefined' ? gsap : {
        to: (el, opts) => {
            console.warn("GSAP not loaded, using CSS fallback");
            el.style.transition = 'opacity 0.5s';
            el.style.opacity = opts.opacity;
            if (opts.onComplete) setTimeout(opts.onComplete, 500);
        },
        from: (el, opts) => {
            console.warn("GSAP not loaded, using CSS fallback");
            el.style.transition = `all ${opts.duration || 0.5}s ${opts.ease || 'ease'}`;
            el.style.opacity = 0;
            el.style.transform = `translateY(${opts.y || 0}px)`;
            setTimeout(() => {
                el.style.opacity = 1;
                el.style.transform = 'translateY(0)';
            }, 100);
        },
        set: (el, opts) => {
            el.style.opacity = opts.opacity !== undefined ? opts.opacity : el.style.opacity;
            el.style.transform = opts.scale !== undefined ? `scale(${opts.scale})` : el.style.transform;
        }
    };

    // Show main content immediately
    mainHeader.style.display = 'block';
    inicioSection.style.display = 'block';
    inicioSection.classList.add('active');

    // Run animations
    try {
        safeGSAP.from("#inicio h2", { opacity: 0, y: 50, duration: 1.5, ease: "power3.out", delay: 0.5 });
        safeGSAP.from("#inicio p", { opacity: 0, y: 50, duration: 1.5, ease: "power3.out", delay: 0.7 });
        safeGSAP.from(".value-card", { opacity: 0, y: 50, scale: 0.9, duration: 1, stagger: 0.2, ease: "power3.out", delay: 0.9 });
        safeGSAP.from("#inicio .case-button", { opacity: 0, scale: 0.8, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 1.3 });
        safeGSAP.from("#inicio .caption p", { opacity: 0, x: 50, duration: 1.5, ease: "power3.out", delay: 1.5 });
    } catch (error) {
        console.error("Error in initial animations:", error);
    }

    // Initialize slideshow
    try {
        setTimeout(initializeSlideshow, 500);
    } catch (error) {
        console.error("Error initializing slideshow:", error);
    }

   // Animate footer icons
try {
    const footerIcons = document.querySelectorAll('#footer i');
    footerIcons.forEach((icon, index) => {
        safeGSAP.from(icon, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: 0.5 + index * 0.2
        });
    });
} catch (error) {
    console.error("Error animating footer icons:", error);
}

// Animate WhatsApp bubble
try {
    const whatsappBubble = document.getElementById('whatsapp-bubble');
    if (whatsappBubble) {
        safeGSAP.from(whatsappBubble, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "bounce.out",
            delay: 1.5
        });
    }
} catch (error) {
    console.error("Error animating WhatsApp bubble:", error);
}
});

// Lawyer and Service Card Animations
try {
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
} catch (error) {
    console.error("Error setting up card animations:", error);
}

// Dynamic Juicio Options based on Materia selection
try {
    const materiaSelect = document.getElementById('materia');
    const juicioSelect = document.getElementById('juicio');

    const juicioOptions = {
        'Derecho Civil': [
            'Elaboración de Contratos (arrendamiento, compraventa, etc)',
            'Otorgamiento de Escritura Pública',
            'Reivindicatorio',
            'Usucapión',
            'Hipoteca'
        ],
        'Derecho Familiar': [
            'Divorcio',
            'Pensión Alimenticia',
            'Guarda y Custodia',
            'Régimen de Visita y Convivencia',
            'Ejecución y/o Modificación de Convenio',
            'Reconocimiento de Paternidad',
            'Pérdida de Patria Potestad',
            'Sucesión Testamentaria e Intestamentaria',
            'Autorización Judicial Para que un Menor Salga del País (Obtención de Visa y Pasaporte)',
            'Consignacion de Alimentos',
            'Rectificación y Aclaración de Actas de Nacimiento, Defunción, Matrimonio',
            'Certificación y Unificación de CURP'
        ],
        'Derecho Mercantil': [
            'Cobro de pagarés',
            'Demandas y contestación de demanda contra bancos',
            'Sociedades (A.C., S.A., C.V., etc)'
        ],
        'Derecho Laboral': [
            'Defensa Legal al Patrón',
            'Despido Injustificado',
            'Designación de Beneficiarios',
            'Contratos Laborales Individuales y Colectivos'
        ],
        'Derecho Penal': [
            'Presentación de denuncias o querellas por cualquier delito ante el Ministerio Público',
            'Representación legal ante el Ministerio Público, fiscalia y Juzgados Estatales y Federales'
        ],
        'Amparo': [
            'Directo e Indirecto',
            'Contra leyes',
            'Representación Tercero Interesado'
        ],
        'Otro Asunto': [
            'Otro'
        ]
    };

    materiaSelect.addEventListener('change', () => {
        const selectedMateria = materiaSelect.value;
        juicioSelect.innerHTML = '<option value="" disabled selected>Seleccione un juicio</option>';
        juicioSelect.disabled = !selectedMateria;

        if (selectedMateria && juicioOptions[selectedMateria]) {
            juicioOptions[selectedMateria].forEach(option => {
                const opt = document.createElement('option');
                opt.value = option;
                opt.textContent = option;
                juicioSelect.appendChild(opt);
            });
        }
    });
} catch (error) {
    console.error("Error setting up form options:", error);
}

// Form Submission
try {
    const caseForm = document.getElementById('case-form');
    const fileInput = document.getElementById('files');
    const fileList = document.getElementById('file-list');
    let selectedFiles = []; // Array to track selected files

    // Handle file selection
    fileInput.addEventListener('change', () => {
        console.log('Files selected:', fileInput.files);
        // Add new files to selectedFiles, avoiding duplicates
        const newFiles = Array.from(fileInput.files).filter(file => 
            !selectedFiles.some(existingFile => 
                existingFile.name === file.name && existingFile.size === file.size
            )
        );
        selectedFiles = [...selectedFiles, ...newFiles];
        updateFileList();
        // Clear the input to allow re-selecting the same file
        fileInput.value = '';
    });

    // Update the displayed file list
   const updateFileList = () => {
    fileList.innerHTML = '';
    selectedFiles.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'flex items-center justify-between bg-gray-700 p-2 rounded-lg';
        fileItem.innerHTML = `
            <span class="text-gray-200 truncate max-w-[50%]">${file.name}</span>
            <button type="button" class="preview-file bg-gold-400 text-black px-2 py-1 rounded hover:bg-gold-300 mr-2" data-index="${index}">Visualizar</button>
            <button type="button" class="delete-file bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500" data-index="${index}">Eliminar</button>
        `;
        fileList.appendChild(fileItem);
    });

    // Add delete button listeners
    document.querySelectorAll('.delete-file').forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-index'));
            console.log(`Deleting file at index ${index}: ${selectedFiles[index].name}`);
            selectedFiles.splice(index, 1);
            updateFileList();
        });
    });

    // Add preview button listeners
    document.querySelectorAll('.preview-file').forEach(button => {
        button.addEventListener('click', () => {
            const index = parseInt(button.getAttribute('data-index'));
            console.log(`Previewing file at index ${index}: ${selectedFiles[index].name}`);
            const file = selectedFiles[index];
            const fileURL = URL.createObjectURL(file);
            window.open(fileURL, '_blank');
        });
    });
};

caseForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(caseForm);
    const webAppUrl = 'https://script.google.com/macros/s/AKfycbzDJNI7OeeHJUDML4A9rQSWfP-ISkeadPNh7ci4e0mGXedZHxD_mc-_3p7ofaKDVTGV-Q/exec';
    const maxFileSize = 10 * 1024 * 1024; // 10MB
    const submitButton = caseForm.querySelector('.form-submit-button');
    const loadingSpinner = document.getElementById('loading-spinner');

    // Show spinner and disable button
    submitButton.disabled = true;
    submitButton.classList.add('opacity-50', 'cursor-not-allowed');
    loadingSpinner.classList.remove('hidden');
    loadingSpinner.classList.add('flex');

    try {
        // Validate files
        for (const file of selectedFiles) {
            if (file.size > maxFileSize) {
                throw new Error(`El archivo ${file.name} excede el tamaño máximo de 10MB.`);
            }
        }

        const textData = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            contactTime: formData.get('contact-time'),
            caseType: `${formData.get('materia')} - ${formData.get('juicio')}`,
            description: formData.get('description'),
            files: []
        };

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
        selectedFiles = []; // Clear selected files
        updateFileList(); // Clear file list display
        const juicioSelect = document.getElementById('juicio');
        juicioSelect.innerHTML = '<option value="" disabled selected>Primero seleccione una materia</option>';
        juicioSelect.disabled = true;
    } catch (error) {
        console.error('Error submitting form:', error);
        alert(`Hubo un error al enviar tu caso: ${error.message || 'No se pudo conectar con el servidor'}. Por favor, intenta de nuevo.`);
    } finally {
        // Hide spinner and re-enable button
        submitButton.disabled = false;
        submitButton.classList.remove('opacity-50', 'cursor-not-allowed');
        loadingSpinner.classList.add('hidden');
        loadingSpinner.classList.remove('flex');
    }
});

    
} catch (error) {
    console.error("Error setting up form submission:", error);
}

// Global error handler
window.addEventListener('error', (event) => {
    console.error("Global error caught:", {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
    const mainHeader = document.getElementById('main-header');
    const inicioSection = document.getElementById('inicio');
    if (mainHeader) mainHeader.style.display = 'block';
    if (inicioSection) {
        inicioSection.style.display = 'block';
        inicioSection.classList.add('active');
        const contentElements = inicioSection.querySelectorAll('h2, p, h3, .caption, .case-button');
        contentElements.forEach(el => el.style.opacity = '1');
    }
    showSection('inicio');
    initializeSlideshow();
});
