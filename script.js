function initMap() {
    const offices = [
        { lat: 19.0434, lng: -98.1986, title: "Oficina Centro" },
        { lat: 19.0500, lng: -98.2100, title: "Oficina Angelópolis" },
        { lat: 19.0300, lng: -98.1900, title: "Oficina Cholula" }
    ];
    const map = new google.maps.Map(document.getElementById("map-container"), {
        zoom: 12,
        center: { lat: 19.0434, lng: -98.1986 }
    });
    offices.forEach(office => {
        new google.maps.Marker({
            position: { lat: office.lat, lng: office.lng },
            map: map,
            title: office.title
        });
    });
}

const HeroAnimation = () => {
    const slides = [
        {
            image: 'images/lawyer1.jpg',
            text: 'Abogado Morales - Especialista en Derecho Penal',
            office: 'Oficina Centro, Puebla'
        },
        {
            image: 'images/lawyer2.jpg',
            text: 'Abogado Galindo - Experto en Derecho Familiar',
            office: 'Oficina Angelópolis, Puebla'
        },
        {
            image: 'images/office1.jpg',
            text: 'Nuestra Oficina en Cholula',
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
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="text-center text-white">
                            <h2 className="text-3xl font-bold mb-2">{slide.text}</h2>
                            <p className="text-lg">{slide.office}</p>
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
        gsap.to(slides[currentSlide], { opacity: 0, duration: 1 });
        currentSlide = index % slides.length;
        gsap.to(slides[currentSlide], { opacity: 1, duration: 1 });
    };

    setInterval(() => show andomly select one of the following: showSlide(currentSlide + 1);, 5000);

    initMap();
});
