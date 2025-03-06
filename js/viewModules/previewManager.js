import { createElement } from '../utils/createElement.js';

export class PreviewManager {
    constructor() {
        this.isPreviewMode = false;
    }
    
    togglePreviewMode(handlers, formContainer) {
        this.isPreviewMode = !this.isPreviewMode;

        // Update preview button text
        const previewButton = document.getElementById('preview-button');
        if (previewButton) {
            previewButton.textContent = this.isPreviewMode ? 'Edit' : 'Preview';
        }

        // Update form container class for CSS styling
        if (formContainer) {
            if (this.isPreviewMode) {
                formContainer.classList.add('preview-mode');
            } else {
                formContainer.classList.remove('preview-mode');
            }
        }

        // Update display of preview/edit elements
        this.updatePreviewModeElements(handlers);

        return this.isPreviewMode;
    }

    updatePreviewModeElements(handlers) {
        // Show/hide edit-only elements
        const editOnlyElements = [
            '.drag-handle',
            '.question-actions',
            '.add-option-button',
            '#add-question-button',
            '.upload-icon',
            '.custom-select',
            '[aria-label="remove-option"]'
        ];

        editOnlyElements.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.style.display = this.isPreviewMode ? 'none' : '';
            });
        });

        // Handle form inputs and controls based on preview mode
        this.toggleFormControlsForPreview(handlers);
    }

    toggleFormControlsForPreview(handlers) {
        // Disable/enable form inputs
        const formInputs = [
            'input[type="text"]',
            'textarea',
            'select',
            '.form-title-input',
            '.form-description',
            '.form-headline'
        ];

        formInputs.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                element.disabled = this.isPreviewMode;
                if (this.isPreviewMode) {
                    element.setAttribute('readonly', '');
                } else {
                    element.removeAttribute('readonly');
                }
            });
        });

        // Enable form controls in preview mode
        if (this.isPreviewMode) {
            this.enablePreviewModeControls(handlers);
        }
        else{
            this.disablePreviewModeControls();
        }
    }

    enablePreviewModeControls(handlers) {
        // Enable radio buttons, checkboxes, and other form controls
        document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
            input.disabled = false;
        });

        // Show date and time inputs
        document.querySelectorAll('input[type="date"], input[type="time"]').forEach(input => {
            input.disabled = false;
            input.hidden = false;
        });

        // Add a submit button in preview mode
        if (!document.getElementById('preview-submit-button')) {
            const submitButton = createElement('button', {
                classes: ['preview-submit-button'],
                attributes: {
                    'id': 'preview-submit-button',
                    'type': 'button'
                },
                text: 'Submit'
            });
            
            // Use passed handlers
            if (handlers && handlers.submitPreview) {
                submitButton.addEventListener('click', handlers.submitPreview);
            } else {
                submitButton.addEventListener('click', () => {
                    alert('Form submitted successfully!');
                });
            }
            
            const formContainer = document.getElementById('form-container');
            if (formContainer) {
                formContainer.appendChild(submitButton);
            }
        }
    }

    disablePreviewModeControls() {
        // Remove submit button in edit mode
        const submitButton = document.getElementById('preview-submit-button');
        if (submitButton) {
            submitButton.remove();
        }
    }
}