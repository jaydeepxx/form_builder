import { createFormHeader } from '../components/FormHeader.js';
import { createFormContent } from '../components/FormContent.js';

export class StructureRenderer {
    createInitialStructure(rootElement) {
        rootElement.innerHTML = '';

        // Add form header and content using component functions
        const formHeader = createFormHeader();
        rootElement.appendChild(formHeader);
        
        const formContent = createFormContent();
        rootElement.appendChild(formContent);
    }
}