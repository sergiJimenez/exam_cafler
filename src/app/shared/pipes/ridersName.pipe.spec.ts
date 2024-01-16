import { TestBed } from "@angular/core/testing";
import { RidersNamePipe } from "./ridersName.pipe";
import { IRiders } from "../interfaces/riders.interface";

describe("RidersName Pipe Unit Test", () => {
  let pipe: RidersNamePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RidersNamePipe],
    });
    pipe = TestBed.inject(RidersNamePipe);
  });

  it("SHOULD create an instance", () => {
    expect(pipe).toBeTruthy();
  });

  it("SHOULD return rider name when driverId is a string", () => {
    const driverId = "123";
    const driversArray: IRiders[] = [
      {
        driverId: "1",
        driverName: "Rider A",
        initialLocation: { lat: 1, lng: 2 },
      },
    ];

    const result = pipe.transform(driverId, driversArray);

    expect(result).toBe("noRiderName");
  });

  it("SHOULD return noRiderName when driverId is a string and not found in driversArray", () => {
    const driverId = "789";
    const driversArray: IRiders[] = [
      {
        driverId: "1",
        driverName: "Rider 1",
        initialLocation: { lat: 1, lng: 2 },
      },
    ];

    const result = pipe.transform(driverId, driversArray);

    expect(result).toBe("noRiderName");
  });

  it("SHOULD return rider name when driverId is an IRiders object with driverName", () => {
    const driver: IRiders = {
      driverId: "123",
      driverName: "Rider A",
      initialLocation: {
        lat: 0,
        lng: 0,
      },
    };

    const result = pipe.transform(driver, []);

    expect(result).toBe("Rider A");
  });

  it("SHOULD return noRiderName when driverId is an IRiders object without driverName", () => {
    const driver: IRiders = {
      driverId: "123",
      driverName: "",
      initialLocation: {
        lat: 0,
        lng: 0,
      },
    };

    const result = pipe.transform(driver, []);

    expect(result).toBe("noRiderName");
  });
});
