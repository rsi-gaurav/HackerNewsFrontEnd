import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HackerNewsService } from './story.service';
import { environment } from 'src/environments/environment';

describe('HackerNewsService', () => {
    let service: HackerNewsService;
    let httpMock: HttpTestingController;
    const API_URL = environment.apiUrl;

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

    it('should fetch new stories', () => {
        const dummyStories = [{ id: 1, title: 'Story 1' }, { id: 2, title: 'Story 2' }];

        service.NewStories().subscribe((stories: any[]) => {
            expect(stories.length).toBe(2);
            expect(stories).toEqual(dummyStories);
        });

        const req = httpMock.expectOne(`${API_URL}/api/HackerNews/NewStories`);
        expect(req.request.method).toBe('GET');
        req.flush(dummyStories);
    });
});