import { IStorageHandler, IDefaultStorageConfig } from 'baasic-sdk-javascript';
import { InMemoryStorageHandler } from 'infrastructure/core/storage';
declare class NativeStorageHandler implements IStorageHandler, IDefaultStorageConfig {
    private inMemoryStorage;
    constructor(inMemoryStorage: InMemoryStorageHandler);
    clear(): void;
    remove(key: string): void;
    set(key: string, data: any): void;
    get(key: string): any;
    getItemsForKeys(keys: string[]): Promise<any>;
    getAllAsync(): any;
    keyGenerator?: (key: string) => string;
}
export { NativeStorageHandler };
