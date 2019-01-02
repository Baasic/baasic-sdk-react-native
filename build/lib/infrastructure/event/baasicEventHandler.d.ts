import { IEventHandler } from 'baasic-sdk-javascript';
declare class BaasicEventHandler implements IEventHandler {
    events: {};
    pushMessage(message: any, args: any): void;
    triggerEvent(eventName: any, data: any): void;
    addEvent(eventName: any, func: any): void;
}
export { BaasicEventHandler };
