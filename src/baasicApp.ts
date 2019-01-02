import { BaasicApp as BaasicSdkApp, BaasicPlatform as BaasicSdkPlatform } from 'baasic-sdk-reactjs';
import { IBaasicOptions, IEventHandler } from 'baasic-sdk-javascript';
import { NativeStorageHandler } from './infrastructure/core/storage';
import { InMemoryStorageHandler } from './infrastructure/core/storage';

class BaasicApp extends BaasicSdkApp {
    constructor(apiKey: string, options?: Partial<IBaasicOptions>) {
        super(apiKey, getOptions(options));
    }
}

class BaasicPlatform extends BaasicSdkPlatform {
    constructor(options?: Partial<IBaasicOptions>) {
        super(getOptions(options));
    }
}

function getOptions(options: Partial<IBaasicOptions>): Partial<IBaasicOptions> {
    var defaults: Partial<IBaasicOptions> = {
        storageHandler: () => new NativeStorageHandler(new InMemoryStorageHandler()),
        eventHandler: () => new BaasicEventHandler()
    };

    return Object.assign({}, defaults, options);
};

export {
    BaasicApp,
    BaasicPlatform
}

class BaasicEventHandler implements IEventHandler {
        events = {};
    
        pushMessage(message, args) {
            // we don't need this implementation on mobile for now
        }
    
        triggerEvent(eventName, data) {
            const event = this.events[eventName];
            debugger;
            event.trigger(data);
        }
    
        addEvent(eventName, func) {
                debugger;
            const event = this.events[eventName] || new Event(eventName);
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