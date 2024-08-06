import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HackerNewsService } from './story.service';
import { environment } from 'src/environments/environment';

describe('HackerNewsService', () => {
    let service: HackerNewsService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [HackerNewsService]
        });
        service = TestBed.inject(HackerNewsService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should make a GET request to retrieve new stories', () => {
        const mockResponse = [1, 2, 3]; // Mock response data

        service.NewStories().subscribe((response: any) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne(`${environment.apiUrl}/api/HackerNews/NewStories`);
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });
});