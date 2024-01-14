import { TestBed } from "@angular/core/testing";
import { LocalStorageService } from "./localStorage.service";

describe("LocalStorage Service Unit Test", () => {
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
    });

    localStorageService = TestBed.inject(LocalStorageService);
  });

  it("SHOULD be created", () => {
    expect(localStorageService).toBeTruthy();
  });

  it("SHOULD set and get item from localStorage", () => {
    const key = "testKey";
    const value = { name: "Test", age: 25 };

    localStorageService.setItem(key, value);

    const retrievedValue = localStorageService.getItem(key);

    expect(retrievedValue).toEqual(value);
  });

  it("SHOULD remove item from localStorage", () => {
    const key = "testKey";
    const value = { name: "Test", age: 25 };

    localStorageService.setItem(key, value);

    localStorageService.removeItem(key);

    const retrievedValue = localStorageService.getItem(key);

    expect(retrievedValue).toBeNull();
  });

  it("SHOULD search for items in localStorage", () => {
    localStorageService.setItem("key1", { name: "John", age: 30 });
    localStorageService.setItem("key2", { name: "Jane", age: 25 });
    localStorageService.setItem("key3", { name: "Doe", age: 40 });

    const searchResults = localStorageService.search("key");

    expect(searchResults.length).toBe(3);
    expect(searchResults).toContain({
      key: "key1",
      value: { name: "John", age: 30 },
    });
    expect(searchResults).toContain({
      key: "key2",
      value: { name: "Jane", age: 25 },
    });
    expect(searchResults).toContain({
      key: "key3",
      value: { name: "Doe", age: 40 },
    });
  });
});
