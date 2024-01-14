import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";
import { RidersService } from "./riders.service";
import { IRiders } from "src/app/shared/interfaces/riders.interface";
import { environment } from "src/environments/environment";
import { LocalStorageService } from "src/app/core/services/localStorage.service";

describe("Riders Service Unit Test", () => {
  let service: RidersService;
  let httpMock: HttpTestingController;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    const localStorageSpy = jasmine.createSpyObj("LocalStorageService", [
      "setItem",
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RidersService,
        { provide: LocalStorageService, useValue: localStorageSpy },
      ],
    });

    service = TestBed.inject(RidersService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorageService = TestBed.inject(
      LocalStorageService
    ) as jasmine.SpyObj<LocalStorageService>;
  });

  const MOCK_RIDERS: IRiders[] = [
    {
      driverId: "1",
      driverName: "Rider 1",
      initialLocation: { lat: 1, lng: 2 },
    },
    {
      driverId: "2",
      driverName: "Rider 2",
      initialLocation: { lat: 3, lng: 4 },
    },
  ];

  afterEach(() => {
    httpMock.verify();
  });

  it("SHOULD be created", () => {
    expect(service).toBeTruthy();
  });

  it("SHOULD make an HTTP request and store riders in local storage", fakeAsync(() => {
    service.getRiders().subscribe((riders) => {
      expect(riders).toEqual(MOCK_RIDERS);
    });

    const req = httpMock.expectOne(
      `${environment.BASE_URL}${environment.RIDERS}`
    );
    expect(req.request.method).toBe("GET");
    req.flush(MOCK_RIDERS);

    tick();

    expect(localStorageService.setItem).toHaveBeenCalledWith(
      "riderList",
      MOCK_RIDERS
    );
  }));
});
