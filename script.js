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

const HeroAnimation = () => {
    const slides = [
        {
            image: 'images/lawyer1.jpg',
            text: 'Abogado Morales - Maestro del Derecho Penal',
            office: 'Oficina Centro, Puebla',
            logo: 'images/logo.png'
        },
        {
            image: 'images/lawyer2.jpg',
            text: 'Abogado Galindo - Experto en Derecho Familiar',
            office: 'Oficina Angelópolis, Puebla',
            logo: 'images/logo.png'
        },
        {
            image: 'images/office1.jpg',
            text: 'Nuestra Oficina en Cholula - Elegancia y Profesionalismo',
            office: 'Oficina Cholula, Puebla',
            logo: 'images/logo.png'
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
                            <img src={slide.logo} alt="Logo" className="w-40 mx-auto mb-4 animate-spin-slow" />
                            <h2 className="text-4xl font-extrabold mb-2 tracking-wide">{slide.text}</h2>
                            <p className="text-xl font-light">{slide.office}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

ReactDOM.render(<HeroAnimation />, document.getElementById('hero-animation'));

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('[class*="slide-"]');
    let currentSlide = 0;

    const showSlide = (index) => {
        gsap.to(slides[currentSlide], { opacity: 0, scale: 1.1, duration: 1.5, ease: "power2.out" });
        currentSlide = index % slides.length;
        gsap.to(slides[currentSlide], { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" });
    };

    setInterval(() => showSlide(currentSlide + 1), 5000);

    initMap();
});
