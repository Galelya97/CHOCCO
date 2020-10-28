function init(){
    let myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 11,
        controls: []
    });

    let coords = [
        [55.75, 37.50],
        [55.75, 37.71],
        [55.70, 37.70]
    ];

    const myCollection = new ymaps.GeoObjectCollection({}, {
        iconLayout: 'default#image',
        iconImageHref: './assets/img/marker.png',
        draggable: false
    });
    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    });

    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
        //... отключаем перетаскивание карты
        myMap.behaviors.disable('drag');
    }
}

ymaps.ready(init);



