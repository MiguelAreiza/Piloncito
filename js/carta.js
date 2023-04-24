'use strict';
sessionStorage.removeItem('AppUser');

$(document).ready( () => {

    setTimeout(() => {
        
        $('.sliderPromotions')[0].scrollTo(($('.sliderPromotions')[0].scrollWidth / 2) - 180, 0);

        const slider = document.querySelector('.sliderPromotions');
        const images = slider.querySelectorAll('img');

        $('.sliderPromotions').scroll( () => {
        
            const visibleWidth = slider.offsetWidth;
            const scrollLeft = slider.scrollLeft;
            const halfWidth = visibleWidth / 2;

            images.forEach((image) => {
                const imageLeft = image.offsetLeft - slider.offsetLeft;
                const imageCenter = imageLeft + image.offsetWidth / 2 + 105;

                if (imageCenter > scrollLeft + halfWidth && imageCenter < scrollLeft + halfWidth * 2) {
                    image.classList.add('destacada');
                } else {
                    image.classList.remove('destacada');
                }
            });
    
        });

    }, 500);
    
    $(window).on('load', () => {

        $('spinner').hide();

    });

});