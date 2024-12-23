import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CloudinaryService } from './cloudinary.service';

describe('CloudinaryService', () => {
  let service: CloudinaryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CloudinaryService]
    });
    service = TestBed.inject(CloudinaryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should upload an image', () => {
    const mockFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
    const mockResponse = { secure_url: 'https://example.com/image.jpg' };

    service.uploadImage(mockFile).subscribe(url => {
      expect(url).toBe(mockResponse.secure_url);
    });

    const req = httpMock.expectOne(`https://api.cloudinary.com/v1_1/${service['cloudName']}/image/upload`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body instanceof FormData).toBeTruthy();
    req.flush(mockResponse);
  });
});
