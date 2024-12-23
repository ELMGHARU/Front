import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StudySessionService } from './study-session.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('StudySessionService', () => {
  let service: StudySessionService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule  // Include if the service uses Router
      ],
      providers: [
        StudySessionService
      ]
    });

    service = TestBed.inject(StudySessionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Add more tests for the service methods here
});
