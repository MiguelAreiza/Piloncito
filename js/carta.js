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
                const imageCenter = imageLeft + image.offsetWidth / 2 + 115;

                if (imageCenter > scrollLeft + halfWidth && imageCenter < scrollLeft + halfWidth * 2) {
                    image.classList.add('destacada');
                } else {
                    image.classList.remove('destacada');
                }
            });
    
        });

    }, 500);

    $('#optNuevoOutstanding').click( (e) => {
        
        GetProducts('Nuevo', 'contProductsOutstanding', e);

    });

    $('#optPopularOutstanding').click( (e) => {

        GetProducts('Popular', 'contProductsOutstanding', e);

    });

    $('#optAdicionesOutstanding').click( (e) => {

        GetProducts('Adiciones', 'contProductsOutstanding', e);

    });

    $('#optHamburguesasFoods').click( (e) => {

        GetProducts('Hamburguesas', 'contProductsFoods', e);

    });

    $('#optPerrosFoods').click( (e) => {

        GetProducts('Perros', 'contProductsFoods', e);

    });

    $('#optMexicanaFoods').click( (e) => {

        GetProducts('Mexicana', 'contProductsFoods', e);

    });

    $('#optCarnesFoods').click( (e) => {

        GetProducts('Carnes y Chuzos', 'contProductsFoods', e);

    });

    $('#optSalchipapasFoods').click( (e) => {

        GetProducts('Salchipapas', 'contProductsFoods', e);

    });

    $('#optPicadasFoods').click( (e) => {

        GetProducts('Picadas', 'contProductsFoods', e);

    });

    $('#optArepasFoods').click( (e) => {

        GetProducts('Arepas', 'contProductsFoods', e);

    });

    $('#optGaseosasDrinks').click( (e) => {

        GetProducts('Gaseosas', 'contProductsDrinks', e);

    });

    $('#optJugosDrinks').click( (e) => {

        GetProducts('Jugos', 'contProductsDrinks', e);

    });

    $('#optOtrasDrinks').click( (e) => {

        GetProducts('Otras', 'contProductsDrinks', e);

    });

    function GetProducts(categorie, container, element) {

        $('spinner').show();

        fetch("../../Products.txt", {
            method: 'GET'

        }).then(async response => {

            let data = await response.json();

            let filteredProducts = data.Products.filter(product => product.categoria === categorie);

            if (!filteredProducts.length) {
                throw new Error('.');
            }

            let html = ``;

            filteredProducts.map( (product) => {

                html += `<div class="cardProduct">
                            <img class="imageProduct" src="${product.imagen}" alt="Foto ${product.titulo}" draggable="false">
                            <div class="detailsProduct">
                                <label class="nameProduct">${product.titulo}</label>
                                <p class="descriptionProduct">${product.descripcion}</p>
                                <label class="priceProduct">$${product.precio}</label>
                            </div>
                        </div>`;

            });
            
            const box = $(`#${container}`);

            box.html(html);

            if (box[0].scrollWidth > box[0].clientWidth) {

                box.css('justify-content', 'left');

            } else {

                box.css('justify-content', 'center');

            }

            const parent = element.target.parentElement;
            
            for (let i = 0; i < parent.children.length; i++) {

                parent.children[i].classList.remove('optSelected');

            }

            element.target.classList.add('optSelected');

            $('.descriptionProduct').click( (e) => {

                if (e.target.style.whiteSpace == 'nowrap') {

                    e.target.style.whiteSpace = 'normal'

                } else {

                    e.target.style.whiteSpace = 'nowrap'
                    
                }
                
            });
            
            setTimeout(() => {                
                $('spinner').hide();
            }, 200);

        }).catch(error => {
            console.log(error);
            
            setTimeout(() => {                
                $('spinner').hide();
            }, 200);

            toastr.Warning('No existen productos para esta categoria', null, 4000);

        });

    }

    $('#optAdicionesOutstanding').click();
    $('#optHamburguesasFoods').click();
    $('#optGaseosasDrinks').click();       

    $('#optMenuInicio, .imageLogo').click( () => {
        
        goLocation.ChangeView('../');

    });

    $('#optMenuCarta').click( () => {
        
        goLocation.ChangeView('./');

    });
    
    $(window).on('load', () => {

        $('spinner').hide();

    });

});