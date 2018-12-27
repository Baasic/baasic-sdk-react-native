import { BaasicApp as BaasicSdkApp, BaasicPlatform as BaasicSdkPlatform } from 'baasic-sdk-reactjs';
import { IBaasicOptions,  } from 'baasic-sdk-javascript';
import { NativeStorageHandler } from './infrastructure/core/storage';
import { InMemoryStorageHandler } from 'infrastructure/core/storage';

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
        storageHandler: () => new NativeStorageHandler(new InMemoryStorageHandler())
    };

    return Object.assign({}, defaults, options);
};

export {
    BaasicApp,
    BaasicPlatform
}