import { Injectable } from "@angular/core";

@Injectable({
	providedIn: 'root'
})
export class ObjectUtils {

	public static isEqual<T>(object1: T, object2: T): boolean {
		return JSON.stringify(object1) === JSON.stringify(object2);
	}

	public static copy<T>(object: T): T {
		return JSON.parse(JSON.stringify(object));
	}
	
}