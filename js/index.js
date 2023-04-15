'use strict';
sessionStorage.removeItem('AppUser');

$(document).ready( () => {

    $('#btnStart').click( () => {

        goLocation.ChangeView('./views/login/');   
        
    });

    $('#btnAddress').click( () => {

        window.open('https://goo.gl/maps/hKVzFUnwRDgC98269');
        
    });

    $('#btnAddress').click( () => {

        window.open('https://goo.gl/maps/hKVzFUnwRDgC98269');
        
    });

    $('#btnPhone').click( () => {

        window.open('tel:3113175229');
        
    });

});