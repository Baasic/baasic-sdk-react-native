"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaasicEventHandler = /** @class */ (function () {
    function BaasicEventHandler() {
        this.events = {};
    }
    BaasicEventHandler.prototype.pushMessage = function (message, args) {
        // we don't need this implementation on mobile for now
    };
    BaasicEventHandler.prototype.triggerEvent = function (eventName, data) {
        var event = this.events[eventName];
        if (!event) {
            return;
        }
        event.trigger(data);
    };
    BaasicEventHandler.prototype.addEvent = function (eventName, func) {
        var event = this.events[eventName];
        if (!event) {
            event = new Event(eventName);
            this.events[eventName] = event;
        }
        event.registerCallback(func);
    };
    return BaasicEventHandler;
}());
exports.BaasicEventHandler = BaasicEventHandler;
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
