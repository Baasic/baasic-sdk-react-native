"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var baasic_sdk_reactjs_1 = require("baasic-sdk-reactjs");
var storage_1 = require("./infrastructure/core/storage");
var storage_2 = require("infrastructure/core/storage");
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
        storageHandler: function () { return new storage_1.NativeStorageHandler(new storage_2.InMemoryStorageHandler()); }
    };
    return Object.assign({}, defaults, options);
}
;
