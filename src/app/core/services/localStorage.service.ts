import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class LocalStorageService {
  public getItem<T>(key: string): T | null {
    const result = localStorage.getItem(key);

    if (result !== null) {
      return JSON.parse(result) as T;
    }
    return null;
  }

  public setItem<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public search<T>(searchKey: string): { key: string; value: T }[] {
    const results: { key: string; value: T }[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes(searchKey)) {
        const value = this.getItem<T>(key);
        if (value !== null) {
          results.push({ key: key, value: value });
        }
      }
    }
    return results;
  }
}
