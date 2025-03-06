import { createElement } from '../../utils/createElement.js';


export function createDragHandle() {
    const dragHandle = createElement('div', {
        classes: ['drag-handle'],
        attributes: {
            'aria-label': 'Drag to reorder'
        }
    });
    
    const dragIcon = createElement('span', {
        classes: ['material-symbols-outlined', 'drag-icon'],
        text: 'drag_indicator'
    });
    
    dragHandle.appendChild(dragIcon);
    return dragHandle;
}