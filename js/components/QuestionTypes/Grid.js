import { createElement } from '../../utils/createElement.js';
import { createInputOption, createAddOptionButton } from '../QuestionOptions.js';


export function createMultipleChoiceGridOptions(question, index, handlers) {
    const gridContainer = createElement('div', { 
        classes: ['grid-container'],
        attributes: {
            'id': `grid-container-${index}`,
            'data-question-index': index
        }
    });
    
    // Create Rows
    const gridRows = createElement('ul', { 
        classes: ['grid-rows'],
        attributes: {
            'id': `grid-rows-${index}`,
            'data-question-index': index
        }
    });
    
    const rowHeading = createElement('span', { 
        classes: ['row-heading'],
        text: 'Rows'
    });
    
    gridRows.appendChild(rowHeading);
    
    question.options.rows.forEach((row, rowIndex) => {
        const rowElement = createInputOption('number', rowIndex + 1, {
            label: row.value,
            questionIndex: index,
            optionIndex: rowIndex,
            isRow: true,
            handlers
        });
        gridRows.appendChild(rowElement);
    });
    
    // Add row button
    const addRowOptionButton = createAddOptionButton('number', {
        value: question.options.rows.length + 1,
        questionIndex: index,
        isRow: true,
        handlers
    });
    gridRows.appendChild(addRowOptionButton);
    
    // Create Columns
    const gridColumns = createElement('ul', { 
        classes: ['grid-columns'],
        attributes: {
            'id': `grid-columns-${index}`,
            'data-question-index': index
        }
    });
    
    const columnHeading = createElement('span', { 
        classes: ['column-heading'],
        text: 'Columns'
    });
    
    gridColumns.appendChild(columnHeading);
    
    question.options.columns.forEach((column, columnIndex) => {
        const columnElement = createInputOption('radio', columnIndex + 1, {
            label: column.value,
            questionIndex: index,
            optionIndex: columnIndex,
            isColumn: true,
            name: `multipleChoiceGrid-${index}`,
            handlers
        });
        gridColumns.appendChild(columnElement);
    });
    
    // Add column button
    const addColumnOptionButton = createAddOptionButton('radio', {
        value: question.options.columns.length + 1,
        questionIndex: index,
        isColumn: true,
        name: `multipleChoiceGrid-${index}`,
        handlers
    });
    gridColumns.appendChild(addColumnOptionButton);
    
    gridContainer.appendChild(gridRows);
    gridContainer.appendChild(gridColumns);
    
    return gridContainer;
}