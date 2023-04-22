'use strict';
sessionStorage.removeItem('AppUser');

$(document).ready( () => {

    setTimeout(() => {
        
        $('.slider')[0].scrollTo(($('.slider')[0].scrollWidth / 2) - 180, 0);

        const slider = document.querySelector('.slider');
        const images = slider.querySelectorAll('img');

        $('.slider').scroll( () => {
        
            const visibleWidth = slider.offsetWidth;
            const scrollLeft = slider.scrollLeft;
            const halfWidth = visibleWidth / 2;

            images.forEach((image) => {
                const imageLeft = image.offsetLeft - slider.offsetLeft;
                const imageCenter = imageLeft + image.offsetWidth / 2 + 90;

                if (imageCenter > scrollLeft + halfWidth && imageCenter < scrollLeft + halfWidth * 2) {
                    image.classList.add('destacada');
                } else {
                    image.classList.remove('destacada');
                }
            });
    
        });

    }, 500);

    $('#btnStart').click( () => {

        goLocation.ChangeView('./views/carta/');   
        
    });

    $('#btnAddress').click( () => {

        window.open('https://goo.gl/maps/hKVzFUnwRDgC98269');
        
    });

    $(window).on('load', () => {

        $('spinner').hide();

    });

});