import { IStorageHandler } from 'baasic-sdk-javascript';


export class InMemoryStorageHandler implements IStorageHandler {
	memoryStore: any = {};

	clear(): void {
		this.memoryStore = {};
	}
	remove(key: string): void {
		delete this.memoryStore[key];
	}
	set(key: string, data: any): void {
		this.memoryStore[key] = data;
	}
	get(key: string) {
		return this.memoryStore[key];
	}
}
