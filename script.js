function initMap() {
    const officeLocation = { lat: 19.0434, lng: -98.1986 }; // Replace with actual coordinates of the office in Puebla
    const map = new google.maps.Map(document.getElementById("map-container"), {
        zoom: 15,
        center: officeLocation,
    });
    new google.maps.Marker({
        position: officeLocation,
        map: map,
        title: "Oficina de [Nombre del Abogado]",
    });
}
