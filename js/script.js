window.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
    const tabs = require('../modules/tabs.js'),
          modal = require('../modules/modal.js'),
          slider = require('../modules/slider.js'),
          calculator = require('../modules/calculator.js'),
          timer = require('../modules/timer.js'),
          cards = require('../modules/cards.js');

    calculator();
    timer();
    tabs();
    modal();
    slider();
    cards();
=======
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
    
    function hideTabContent() {

        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach( (item, i) => {
               if(target == item) {
                   hideTabContent();
                   showTabContent(i);
               } 
            });
        }
    });
>>>>>>> b6ba2e6... I've set up tabs on the site, also added classes 'show', 'hide', 'fade' in the css filein order to the tabs display in the right way. Besides I've changed index.html removed comments
});