import { IStorageHandler } from 'baasic-sdk-javascript';
export declare class InMemoryStorageHandler implements IStorageHandler {
    memoryStore: any;
    clear(): void;
    remove(key: string): void;
    set(key: string, data: any): void;
    get(key: string): any;
}
