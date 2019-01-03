
import { IEventHandler } from 'baasic-sdk-javascript';

class BaasicEventHandler implements IEventHandler {
    events = {};

    pushMessage(message, args) {
        // we don't need this implementation on mobile for now
    }

    triggerEvent(eventName, data) {
        const event = this.events[eventName];
        if(!event){
            return;
        }
        event.trigger(data);
    }

    addEvent(eventName, func) {
        let event = this.events[eventName];
        if (!event) {
            event = new Event(eventName);
            this.events[eventName] = event;
        }
        event.registerCallback(func);
    }
}

class Event {
    callbacks = [];
    name = null;

    constructor(name) {
        this.name = name;
    }

    registerCallback(callback) {
        this.callbacks.push(callback);
    }

    trigger(data) {
        const callbacks = [...this.callbacks];
        for (let i = 0; i < callbacks.length; i++) {
            callbacks[i](data);
        }
    }
}

export {
    BaasicEventHandler
}