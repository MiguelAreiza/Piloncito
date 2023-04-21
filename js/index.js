'use strict';
sessionStorage.removeItem('AppUser');

$(document).ready( () => {

    $('#btnStart').click( () => {

        goLocation.ChangeView('');   
        
    });

    $('#btnAddress').click( () => {

        window.open('https://goo.gl/maps/hKVzFUnwRDgC98269');
        
    });

    $('#btnPhone').click( () => {

        window.open('tel:3113175229');
        
    });

    $(window).on('load', () => {

        $('spinner').hide();

    });

});