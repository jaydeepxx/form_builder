// Application initialization
import FormModel from './core/Model.js';
import FormView from './core/View.js';
import FormController from './core/Controller.js';

document.addEventListener('DOMContentLoaded', () => {
    const model = new FormModel();
    const view = new FormView();
    const controller = new FormController(model, view);
});