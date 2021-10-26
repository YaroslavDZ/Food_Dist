import tabs from './modules/tabs.js';
import modal from './modules/modal.js';
import slider from './modules/slider.js';
import calculator from './modules/calculator.js';
import timer from './modules/timer.js';
import cards from './modules/cards.js';
import forms from './modules/forms.js';
import {openModal} from './modules/modal.js';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 3000);

    calculator();
    timer('.timer', '2021-12-25');
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    modal('.btn', '.modal', modalTimerId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    cards();
    forms('form', modalTimerId);
});