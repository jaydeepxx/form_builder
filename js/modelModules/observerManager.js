export class ObserverManager {
    constructor() {
        this.listeners = [];
    }
    
    subscribe(listener) {
        this.listeners.push(listener);
    }
    
    notify(data) {
        this.listeners.forEach(listener => {
            listener(data);
        });
    }
}