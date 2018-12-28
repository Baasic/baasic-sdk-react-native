"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var NativeStorageHandler = /** @class */ (function () {
    function NativeStorageHandler(inMemoryStorage) {
        this.inMemoryStorage = inMemoryStorage;
        react_native_1.AsyncStorage.getAllKeys(function (err, keys) {
            react_native_1.AsyncStorage.multiGet(keys, function (err, stores) {
                stores.map(function (result, i, store) {
                    // get at each store's key/value so you can work with it
                    var key = store[i][0];
                    var value = store[i][1];
                    debugger;
                    inMemoryStorage[key] = value;
                });
            });
        });
    }
    NativeStorageHandler.prototype.clear = function () {
        this.inMemoryStorage.clear();
        react_native_1.AsyncStorage
            .clear()
            .catch(handleError);
    };
    NativeStorageHandler.prototype.remove = function (key) {
        this.inMemoryStorage.remove(key);
        react_native_1.AsyncStorage
            .removeItem(key)
            .catch(handleError);
    };
    NativeStorageHandler.prototype.set = function (key, data) {
        this.inMemoryStorage.set(key, data);
        react_native_1.AsyncStorage
            .setItem(key, JSON.stringify(data))
            .catch(handleError);
    };
    NativeStorageHandler.prototype.get = function (key) {
        return this.inMemoryStorage.get(key) || "{}";
    };
    NativeStorageHandler.prototype.getItemsForKeys = function (keys) {
        var promises = keys.map(function (key) {
            return react_native_1.AsyncStorage.getItem(key)
                .then(function (data) { return JSON.parse(data); })
                .then(function (data) { return new KeyValueItem(key, data); });
        });
        return Promise.all(promises).then(function (items) {
            var result = {};
            items.forEach(function (item) {
                result[item.key] = item.data;
            });
            return result;
        });
    };
    NativeStorageHandler.prototype.getAllAsync = function () {
        return react_native_1.AsyncStorage
            .getAllKeys()
            .then(this.getItemsForKeys);
    };
    return NativeStorageHandler;
}());
exports.NativeStorageHandler = NativeStorageHandler;
var KeyValueItem = /** @class */ (function () {
    function KeyValueItem(key, data) {
        this.key = key;
        this.data = data;
    }
    return KeyValueItem;
}());
function handleError(data) {
    console.warn('IStorageHandler -> StorageHandler -> AsyncStorage Error', data);
}
