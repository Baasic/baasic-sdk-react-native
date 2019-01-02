import { IStorageHandler, IDefaultStorageConfig } from 'baasic-sdk-javascript';
import { AsyncStorage } from 'react-native';
import { InMemoryStorageHandler } from 'infrastructure/core/storage';

class NativeStorageHandler implements IStorageHandler, IDefaultStorageConfig {
        constructor(
                private inMemoryStorage: InMemoryStorageHandler
        ) {
                AsyncStorage.getAllKeys((err, keys) => {
                        AsyncStorage.multiGet(keys, (err, stores) => {
                                stores.map((result, i, store) => {
                                        // get at each store's key/value so you can work with it
                                        let key = store[i][0];
                                        let value = store[i][1];
                                        debugger;
                                        this.inMemoryStorage.set(key,value);
                                });
                        });
                });
        }

        clear(): void {
                this.inMemoryStorage.clear();
                AsyncStorage
                        .clear()
                        .catch(handleError)
        }

        remove(key: string): void {
                this.inMemoryStorage.remove(key);
                AsyncStorage
                        .removeItem(key)
                        .catch(handleError)
        }

        set(key: string, data: any): void {
                this.inMemoryStorage.set(key, data);
                AsyncStorage
                        .setItem(key, JSON.stringify(data))
                        .catch(handleError)
        }

        get(key: string) {
                return this.inMemoryStorage.get(key) || "{}";
        }

        getItemsForKeys(keys: string[]) {
                var promises = keys.map((key) => {
                        return AsyncStorage.getItem(key)
                                .then((data) => JSON.parse(data))
                                .then(data => new KeyValueItem(key, data))
                });

                return Promise.all(promises).then((items) => {
                        var result: any = {};
                        items.forEach((item) => {
                                result[item.key] = item.data;
                        });
                        return result;
                });
        }

        getAllAsync() {
                return AsyncStorage
                        .getAllKeys()
                        .then(this.getItemsForKeys);
        }

        public keyGenerator?: (key: string) => string
}

class KeyValueItem {
        key: string;
        data: any;

        constructor(key: string, data: any) {
                this.key = key;
                this.data = data;
        }
}

function handleError(data: any) {
        console.warn('IStorageHandler -> StorageHandler -> AsyncStorage Error', data)
}

export { NativeStorageHandler }