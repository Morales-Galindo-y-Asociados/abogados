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
                    url: Messiah://images/logo.png,
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

                const slides = document.querySelectorAll('#hero-animation .slide');
                if (slides.length === 0) {
                    console.error("No slides found for hero animation");
                    inicioSection.style.display = 'block';
                    return;
                }
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

                gsap.from("#inicio h1", { opacity: 0, y: 50, duration: 1.5, ease: "power3.out", delay: 0.5 });
                gsap.from("#inicio p", { opacity: 0, y: 30, duration: 1.5, ease: "power3.out", delay: 1 });
                gsap.from("#inicio a", { opacity: 0, scale: 0.8, duration: 1.5, ease: "elastic.out(1, 0.5)", delay: 1.5 });

                // Lawyer carousel
                const carousel = document.getElementById('lawyer-carousel');
                const prevButton = document.getElementById('prev-lawyer');
                const nextButton = document.getElementById('next-lawyer');
                let currentIndex = 0;
                const totalLawyers = document.querySelectorAll('.lawyer-card').length;

                const updateCarousel = () => {
                    const offset = currentIndex * -100;
                    gsap.to(carousel, { xPercent: offset, duration: 0.5, ease: "power2.inOut" });
                    prevButton.disabled = currentIndex === 0;
                    nextButton.disabled = currentIndex === totalLawyers - 1;
                };

                prevButton.addEventListener('click', () => {
                    if (currentIndex > 0) {
                        currentIndex--;
                        updateCarousel();
                    }
                });

                nextButton.addEventListener('click', () => {
                    if (currentIndex < totalLawyers - 1) {
                        currentIndex++;
                        updateCarousel();
                    }
                });

                // Modal functionality
                const modal = document.getElementById('lawyer-modal');
                const modalContent = document.getElementById('modal-content');
                const closeModal = document.getElementById('close-modal');
                const lawyerCards = document.querySelectorAll('.lawyer-card');

                const lawyerData = {
                    morales: {
                        name: "Arturo Morales Rojas",
                        image: "images/Art.jpg",
                        education: "Maestría en Derecho Penal y Laboral, Universidad Autónoma de Puebla",
                        experience: "15 años de práctica legal en derecho penal y laboral",
                        cases: [
                            "Defensa exitosa en caso de despido injustificado, recuperando $2M para el cliente",
                            "Representación en juicio penal, logrando absolución completa"
                        ],
                        highlights: [
                            "Conferencista en derecho laboral en foros nacionales",
                            "Miembro de la Barra Mexicana de Abogados"
                        ]
                    },
                    galindo: {
                        name: "Abogado Galindo",
                        image: "images/lawyer2.jpg",
                        education: "Licenciatura en Derecho, Benemérita Universidad Autónoma de Puebla",
                        experience: "10 años especializado en derecho familiar",
                        cases: [
                            "Resolución favorable en caso de custodia, asegurando el bienestar de menores",
                            "Negociación exitosa de pensión alimenticia en divorcio de alto perfil"
                        ],
                        highlights: [
                            "Reconocido por su enfoque empático en conflictos familiares",
                            "Asesor legal en más de 200 casos de divorcio"
                        ]
                    }
                };

                lawyerCards.forEach(card => {
                    card.addEventListener('click', () => {
                        const lawyerId = card.dataset.lawyer;
                        const data = lawyerData[lawyerId];
                        modalContent.innerHTML = `
                            <img src="${data.image}" alt="${data.name}" class="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gold-400">
                            <h3 class="text-2xl font-semibold text-gold-400 mb-4">${data.name}</h3>
                            <h4 class="text-xl text-gold-300 mb-2">Educación</h4>
                            <p class="mb-4">${data.education}</p>
                            <h4 class="text-xl text-gold-300 mb-2">Experiencia</h4>
                            <p class="mb-4">${data.experience}</p>
                            <h4 class="text-xl text-gold-300 mb-2">Casos Destacados</h4>
                            <ul class="list-disc list-inside mb-4">
                                ${data.cases.map(case => `<li>${case}</li>`).join('')}
                            </ul>
                            <h4 class="text-xl text-gold-300 mb-2">Reconocimientos</h4>
                            <ul class="list-disc list-inside">
                                ${data.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                            </ul>
                        `;
                        modal.classList.remove('hidden');
                        gsap.to(modal.querySelector('.bg-gray-800'), { scale: 1, duration: 0.3, ease: "back.out(1.7)" });
                    });
                });

                closeModal.addEventListener('click', () => {
                    gsap.to(modal.querySelector('.bg-gray-800'), { 
                        scale: 0, 
                        duration: 0.3, 
                        ease: "back.in(1.7)",
                        onComplete: () => modal.classList.add('hidden')
                    });
                });

                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        gsap.to(modal.querySelector('.bg-gray-800'), { 
                            scale: 0, 
                            duration: 0.3, 
                            ease: "back.in(1.7)",
                            onComplete: () => modal.classList.add('hidden')
                        });
                    }
                });

                initMap();
            }, 1000);
        }, 3000);

        setTimeout(() => {
            const loader = document.getElementById('loader');
            if (loader && loader.style.display !== 'none') {
                console.log("Fallback: Forcing loader hide");
                loader.style.display = 'none';
                document.getElementById('main-header').style.display = 'block';
                document.getElementById('inicio').style.display = 'block';
                const slides = document.querySelectorAll('#hero-animation .slide');
                if (slides.length > 0) {
                    let currentSlide = 0;
                    const showSlide = (index) => {
                        gsap.to(slides[currentSlide], { opacity: 0, scale: 1.1, duration: 2, ease: "power2.out" });
                        currentSlide = index % slides.length;
                        gsap.to(slides[currentSlide], { opacity: 1, scale: 1, duration: 2, ease: "power2.out" });
                    };
                    showSlide(0);
                    setInterval(() => showSlide(currentSlide + 1), 6000);
                }
                initMap();
            }
        }, 5000);
    } catch (error) {
        console.error("Critical error in loader sequence:", error);
        const loader = document.getElementById('loader');
        if (loader) loader.style.display = 'none';
        document.getElementById('main-header').style.display = 'block';
        document.getElementById('inicio').style.display = 'block';
        initMap();
    }
});
