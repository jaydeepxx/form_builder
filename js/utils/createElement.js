export function createElement(tag, options = {}) {
    const element = document.createElement(tag);
    
    if (options.classes) {
        element.classList.add(...options.classes);
    }
    
    if (options.attributes) {
        Object.entries(options.attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
    }
    
    if (options.text) {
        element.textContent = options.text;
    }
    
    if (options.value) {
        element.value = options.value;
    }
    
    if (options.disabled) {
        element.disabled = true;
    }
    
    if (options.hidden) {
        element.hidden = true;
    }
    
    return element;
}