function initMap() {
    const offices = [
        { lat: 19.0434, lng: -98.1986, title: "Oficina Centro" },
        { lat: 19.0500, lng: -98.2100, title: "Oficina Angelópolis" },
        { lat: 19.0300, lng: -98.1900, title: "Oficina Cholula" }
    ];
    const map = new google.maps.Map(document.getElementById("map-container"), {
        zoom: 12,
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
}

const Loader = () => {
    return (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50" id="loader">
            <img src="images/logo.png" alt="Morales-Galindo y Asociados" className="w-64" id="loader-logo" />
        </div>
    );
};

const HeroAnimation = () => {
    const slides = [
        {
            image: 'images/courthouse1.jpg',
            text: 'Defendiendo la justicia en los juzgados de Puebla',
            office: 'Oficina Centro, Puebla'
        },
        {
            image: 'images/courthouse2.jpg',
            text: 'Arturo Morales Rojas - Maestro del Derecho Penal',
            office: 'Oficina Angelópolis, Puebla'
        },
        {
            image: 'images/courthouse3.jpg',
            text: 'Abogado Galindo - Experto en Derecho Familiar',
            office: 'Oficina Cholula, Puebla'
        }
    ];

    return (
        <div className="absolute inset-0">
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 bg-cover bg-center opacity-0 transition-opacity duration-1000 slide-${index}`}
                    style={{ backgroundImage: `url(${slide.image})` }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                        <div className="text-center text-gold-400">
                            <h2 className="text-4xl font-extrabold mb-2 tracking-wide">{slide.text}</h2>
                            <p className="text-xl font-light">{slide.office}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

document.addEventListener('DOMContentLoaded', () => {
    // Render loader
    ReactDOM.render(<Loader />, document.getElementById('loader'));

    // Loader animation
    gsap.fromTo(
        '#loader-logo',
        { scale: 0, rotation: -180, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 2, ease: 'power3.out' }
    );
    gsap.to('#loader-logo', {
        filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.8))',
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // Hide loader and show content after 4 seconds
    setTimeout(() => {
        gsap.to('#loader', {
            opacity: 0,
            duration: 1,
            onComplete: () => {
                document.getElementById('loader').style.display = 'none';
                document.getElementById('main-header').classList.remove('hidden');
                document.getElementById('main-content').classList.remove('hidden');
                // Render hero animation after loader
                ReactDOM.render(<HeroAnimation />, document.getElementById('hero-animation'));
                // Hero slides animation
                const slides = document.querySelectorAll('[class*="slide-"]');
                let currentSlide = 0;
                const showSlide = (index) => {
                    gsap.to(slides[currentSlide], { opacity: 0, scale: 1.1, duration: 1.5, ease: "power2.out" });
                    currentSlide = index % slides.length;
                    gsap.to(slides[currentSlide], { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" });
                };
                showSlide(0);
                setInterval(() => showSlide(currentSlide + 1), 5000);
                initMap();
            }
        });
    }, 4000);
});
