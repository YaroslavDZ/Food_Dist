import tabs from '../modules/tabs.js';
import modal from '../modules/modal.js';
import slider from '../modules/slider.js';
import calculator from '../modules/calculator.js';
import timer from '../modules/timer.js';
import cards from '../modules/cards.js';

window.addEventListener('DOMContentLoaded', () => {
    calculator();
    timer();
    tabs();
    modal();
    slider();
    cards();
});