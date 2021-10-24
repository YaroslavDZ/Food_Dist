window.addEventListener('DOMContentLoaded', () => {
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
});