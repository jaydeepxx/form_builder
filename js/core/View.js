// View.js - Main View class using modular components
import { initializeDragDrop } from '../utils/dragDrop.js';
import { EventBinder } from "../viewModules/eventBinder.js"
import { StructureRenderer } from '../viewModules/structureRenderer.js';
import { FormRenderer } from '../viewModules/formRenderer.js';
import { ThemeManager } from '../viewModules/themeManager.js';
import { PreviewManager } from '../viewModules/previewManager.js';

class FormView {
    constructor() {
        this.elements = {};
        this.isPreviewMode = false;
        this.handlers = null;

        // Initialize modules
        this.structureRenderer = new StructureRenderer();
        this.formRenderer = new FormRenderer();
        this.previewManager = new PreviewManager();
        this.themeManager = new ThemeManager();
        this.eventBinder = new EventBinder();
    }

    // Initialize view and cache DOM elements
    init() {
        // Root container
        this.elements.root = document.getElementById('root');

        // Create the initial structure
        this.structureRenderer.createInitialStructure(this.elements.root);

        this.initializeDragDrop();

        // Cache DOM elements after creation
        this.cacheElements();

    }

    cacheElements() {
        this.elements.formContainer = document.getElementById('form-container');
        this.elements.formTitle = document.getElementById('form-title');
        this.elements.formHeadline = document.getElementById('form-headline');
        this.elements.formDescription = document.getElementById('form-description');
        this.elements.undoButton = document.getElementById('undo-button');
        this.elements.redoButton = document.getElementById('redo-button');
        this.elements.themeToggleButton = document.getElementById('theme-icon-button');
        this.elements.themeToggleContainer = document.getElementById('theme-toggle');
        this.elements.addQuestionButton = document.getElementById('add-question-button');
        this.elements.clearFormButton = document.getElementById('clear-form-button');
        this.elements.publishButton = document.getElementById('publish-button');
        this.elements.previewButton = document.getElementById('preview-button');
    }

    // Bind event handlers - Store handlers and bind static elements
    bindEvents(handlers) {
        // Store handlers for access in element creation methods
        this.handlers = handlers;

        this.eventBinder.bindAllEvents(
            handlers, 
            this.elements,
            () => this.togglePreviewMode()
        );
    }

    // Main render method
    render(data) {
        // Store currently focused element before updating
        const focusInfo = this.formRenderer.storeFocusInfo();

        // Render each part of the UI
        this.formRenderer.renderFormTitle(data.formTitle, this.elements.formTitle);
        this.formRenderer.renderFormHeadline(data.formHeadline, this.elements.formHeadline);
        this.formRenderer.renderFormDescription(data.formDescription, this.elements.formDescription);
        const questionsRendered = this.formRenderer.renderQuestions(
            data.questions,
            this.handlers,
            this.elements.formContainer
        );

        this.themeManager.applyTheme(data.theme);
        this.updateUndoRedoButtons(data);

        // Update preview mode elements
        this.previewManager.updatePreviewModeElements();

        if (questionsRendered) {
            this.initializeDragDrop();
        }

        // Restore focus after rendering (only in edit mode)
        this.formRenderer.restoreFocus(focusInfo, this.isPreviewMode);
    }

    // Toggle preview mode
    togglePreviewMode() {
        this.isPreviewMode = this.previewManager.togglePreviewMode(
            this.handlers,
            this.elements.formContainer
        );
        
        // Now notify controller about state change
        if (this.handlers && this.handlers.togglePreviewMode) {
            this.handlers.togglePreviewMode(this.isPreviewMode);
        }
    }

    // Update undo/redo buttons state
    updateUndoRedoButtons(data) {
        if (this.elements.undoButton) {
            this.elements.undoButton.disabled = !data.canUndo;
            this.elements.undoButton.classList.toggle('disabled', !data.canUndo);
        }

        if (this.elements.redoButton) {
            this.elements.redoButton.disabled = !data.canRedo;
            this.elements.redoButton.classList.toggle('disabled', !data.canRedo);
        }
    }

    initializeDragDrop() {
        if (this.handlers && this.handlers.reorderQuestions) {
            initializeDragDrop();
        }
    }
}

export default FormView;