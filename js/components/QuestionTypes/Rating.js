import { createElement } from '../../utils/createElement.js';


export function createRatingOptions(question, index, handlers) {
    const container = createElement('div', {
        attributes: {
            'id': `rating-container-wrapper-${index}`,
            'data-question-index': index
        }
    });
    
    const ratingScaleContainer = createElement('div', { 
        classes: ['scale-question-option'],
        attributes: {
            'id': `rating-scale-${index}`,
            'data-question-index': index
        }
    });
    
    const ratingRange = createElement('select', { 
        classes: ['range-dropdown'],
        attributes: {
            'id': `rating-range-${index}`,
            'data-question-index': index
        }
    });
    
    // Add options for rating scale (1 to 5)
    for (let i = 1; i <= 5; i++) {
        const option = createElement('option', {
            attributes: { 'value': i },
            text: i.toString()
        });
        if (i === question.options.scale) {
            option.selected = true;
        }
        ratingRange.appendChild(option);
    }
    
    ratingScaleContainer.appendChild(ratingRange);
    
    const ratingContainer = createElement('div', { 
        classes: ['rating-container'],
        attributes: {
            'id': `rating-stars-${index}`,
            'data-question-index': index
        }
    });
    
    // Create star rating items
    for (let i = 1; i <= question.options.scale; i++) {
        const ratingItem = createElement('div', { 
            classes: ['rating-item'],
            attributes: {
                'id': `rating-item-${index}-${i}`,
                'data-question-index': index,
                'data-rating-value': i
            }
        });
        
        const ratingLabel = createElement('span', { text: `${i}` });
        
        const starLabel = createElement('label', { 
            classes: ['material-symbols-outlined', 'star-icon'],
            text: 'star'
        });
        
        const starInput = createElement('input', { 
            attributes: { 
                'type': 'radio',
                'name': `rating-${index}`,
                'value': i,
                'id': `rating-input-${index}-${i}`,
                'data-question-index': index
            },
            disabled: true,
            hidden: true
        });
        
        starLabel.appendChild(starInput);
        ratingItem.appendChild(ratingLabel);
        ratingItem.appendChild(starLabel);
        
        ratingContainer.appendChild(ratingItem);
    }
    
    container.appendChild(ratingScaleContainer);
    container.appendChild(ratingContainer);
    
    return container;
}