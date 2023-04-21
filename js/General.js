'use strict';

function Redirect() {

    this.Facebook = () => {
        window.open('https://www.facebook.com/miguelangel.areizaberrio/');
    }

    this.Instagram = () => {
        window.open('https://www.instagram.com/areizam11/');
    }

    this.WhatsApp = () => {
        window.open('https://api.whatsapp.com/send?phone=573245026814&text=¡Quiero cotizar un producto digital!');        
    }
    
}

function Toastr() {

    this.Info = (mesagge, title, time) => {
        newMesagge(mesagge, title, 'toast-info', time);
    }

    this.Success = (mesagge, title, time) => {
        newMesagge(mesagge, title, 'toast-success', time);
    }

    this.Error = (mesagge, title, time) => {
        newMesagge(mesagge, title, 'toast-error', time);
    }

    this.Warning = (mesagge, title, time) => {
        newMesagge(mesagge, title, 'toast-warning', time);
    }
    
    function newMesagge(mesagge, title, type, time = 5000, id = newId()) {
        
        let data = $('#notifications :last-child').html() || '';

        if (!data.includes(mesagge)) {
            
            title ? title = `<b class="titleToast">${title}</b>`: title = '';

            $('#notifications').append(`<div class="toast ${type}" id="${id}">${title}${mesagge}</div>`);
    
            $(`#${id}`).click(()=>{
                $(`#${id}`).remove();
            });
        
            setTimeout(() => {
                $(`#${id}`).remove();
            }, time);

        }

    }   

}

function newId() {
    
    let Codigo = '';
    
    for (let i = 0; i < 3; i++) {   
        
        let str1, str2, str3, str4;
        /*Generar numeros random de acuerdo al codigo ASCII y convertirlos*/
        str1 = String.fromCharCode(Math.round((Math.random() * (57 - 48)) + 48));
        str2 = String.fromCharCode(Math.round((Math.random() * (90 - 65)) + 65));
        str3 = String.fromCharCode(Math.round((Math.random() * (122 - 97)) + 97));
        str4 = String.fromCharCode(Math.round((Math.random() * (57 - 48)) + 48));    
        
        /*Integrarlo al codigo*/
        Codigo += `${str1}${str2}${str3}${str4}`;
        
        if (i != 2) {
            Codigo += `-`;
        }
        
    }
    
    return Codigo;
    
}

function GoLocation() {

    this.ChangeView = (urlView) => {

        history.pushState(null, "", urlView); 

        fetch('./').then(async (response) => {
            
            $('body').html(await response.text());

            setTimeout(() => {
                
                $('spinner').hide();

            }, 300);

        }).catch(() => {

            toastr.Error('Error en la transaccion');

        });

    }

}

function ExecSp(spName) {
    
    return new Promise((resolve, reject) => {
        
        if (!spName) {

            return reject('Error en el parametro');
            
        }
        
        fetch('https://www.TioLucho.somee.com/api/Procedures/ExecProcedure', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "procedure": spName
            }),
            redirect: 'follow'
        }).then(async response => {
            
            let data = (await response.json());
            resolve(data);    

        }).catch( error => {

            reject(error);   

        });

    });

}

function GetUser() {
    
    this.Id = (sessionStorage.AppUser) ? JSON.parse(sessionStorage.AppUser).Id : '';

    this.NameUser = (sessionStorage.AppUser) ? JSON.parse(sessionStorage.AppUser).StrName : '';

}

function MoneyCast(numb) {
    let str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$ ${str.join(".")}`;
}

var redirect = new Redirect();
var toastr = new Toastr();
var goLocation = new GoLocation();
var getUser = new GetUser();

$('.facebook').click( () => {
    redirect.Facebook()
});

$('.instagram').click( () => {
    redirect.Instagram()
});

$('.whatsApp').click( () => {
    redirect.WhatsApp()
});

$('#btnMenu').click( () => {

    
    if ($('#menu').css('display') == 'none') {
        
        $('#btnMenu').css('transform', 'rotate(270deg)');
        
        $('#menu').show();
        
        setTimeout(() => {
            
            $('#menu').css({'height':'calc(100vh - 90px)'});
            $('#btnMenu').css('background-image', 'url("../assets/images/menu/MenuOn.svg")');

        }, 100);
        
    } else {
        
        $('#btnMenu').css('transform', 'rotate(0deg)');

        setTimeout(() => {
            
            $('#btnMenu').css('background-image', 'url("../assets/images/menu/MenuOff.svg")');

        }, 100);

        $('#menu').css({'height':'0'});
        
        setTimeout(() => {
            
            $('#menu').hide();

        }, 1100);

    }

});

$('#language').click( (e) => {
    
    if (sessionStorage.language == 'ES' || !sessionStorage.language) {

        e.target.src = './assets/images/language/LanguageEN.svg';

        let lib = new google.translate.TranslateService();
        lib.translatePage('es', 'en', function () {});

        toastr.Success('Translate to english', null, 3000);
        sessionStorage.setItem('language', 'EN');
        
    } else {
        
        e.target.src = './assets/images/language/LanguageES.svg';
        
        let lib = new google.translate.TranslateService();
        lib.translatePage('en', 'es', function () {});
        
        toastr.Success('Traducción a español', null, 3000);
        sessionStorage.setItem('language', 'ES');

    }

});