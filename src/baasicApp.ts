import { BaasicApp as BaasicSdkApp, BaasicPlatform as BaasicSdkPlatform } from 'baasic-sdk-reactjs';
import { IBaasicOptions, IEventHandler } from 'baasic-sdk-javascript';
import { NativeStorageHandler } from './infrastructure/storage';
import { InMemoryStorageHandler } from './infrastructure/storage';
import { BaasicEventHandler } from './infrastructure/event';

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