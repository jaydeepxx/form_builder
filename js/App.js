import FormModel from './Model.js';
import FormView from './View.js';
import FormController from './Controller.js';

document.addEventListener('DOMContentLoaded', () => {
    const model = new FormModel();
    const view = new FormView();
    const controller = new FormController(model, view);
});