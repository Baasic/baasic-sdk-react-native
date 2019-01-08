"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InMemoryStorageHandler = /** @class */ (function () {
    function InMemoryStorageHandler() {
        this.memoryStore = {};
    }
    InMemoryStorageHandler.prototype.clear = function () {
        this.memoryStore = {};
    };
    InMemoryStorageHandler.prototype.remove = function (key) {
        delete this.memoryStore[key];
    };
    InMemoryStorageHandler.prototype.set = function (key, data) {
        this.memoryStore[key] = data;
    };
    InMemoryStorageHandler.prototype.get = function (key) {
        return this.memoryStore[key];
    };
    return InMemoryStorageHandler;
}());
exports.InMemoryStorageHandler = InMemoryStorageHandler;
