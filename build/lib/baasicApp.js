"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var baasic_sdk_reactjs_1 = require("baasic-sdk-reactjs");
var storage_1 = require("./infrastructure/core/storage");
var storage_2 = require("./infrastructure/core/storage");
var BaasicApp = /** @class */ (function (_super) {
    tslib_1.__extends(BaasicApp, _super);
    function BaasicApp(apiKey, options) {
        return _super.call(this, apiKey, getOptions(options)) || this;
    }
    return BaasicApp;
}(baasic_sdk_reactjs_1.BaasicApp));
exports.BaasicApp = BaasicApp;
var BaasicPlatform = /** @class */ (function (_super) {
    tslib_1.__extends(BaasicPlatform, _super);
    function BaasicPlatform(options) {
        return _super.call(this, getOptions(options)) || this;
    }
    return BaasicPlatform;
}(baasic_sdk_reactjs_1.BaasicPlatform));
exports.BaasicPlatform = BaasicPlatform;
function getOptions(options) {
    var defaults = {
        storageHandler: function () { return new storage_1.NativeStorageHandler(new storage_2.InMemoryStorageHandler()); },
        eventHandler: function () { return new BaasicEventHandler(); }
    };
    return Object.assign({}, defaults, options);
}
;
var BaasicEventHandler = /** @class */ (function () {
    function BaasicEventHandler() {
        this.events = {};
    }
    BaasicEventHandler.prototype.pushMessage = function (message, args) {
        // we don't need this implementation on mobile for now
    };
    BaasicEventHandler.prototype.triggerEvent = function (eventName, data) {
        var event = this.events[eventName];
        event.trigger(data);
    };
    BaasicEventHandler.prototype.addEvent = function (eventName, func) {
        var event = this.events[eventName] || new Event(eventName);
        event.registerCallback(func);
    };
    return BaasicEventHandler;
}());
var Event = /** @class */ (function () {
    function Event(name) {
        this.callbacks = [];
        this.name = null;
        this.name = name;
    }
    Event.prototype.registerCallback = function (callback) {
        this.callbacks.push(callback);
    };
    Event.prototype.trigger = function (data) {
        var callbacks = this.callbacks.slice();
        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i](data);
        }
    };
    return Event;
}());
