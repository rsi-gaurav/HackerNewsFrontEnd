import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StoryListComponent } from './story-list.component';
import { HackerNewsService } from '../services/story.service';
import { of, throwError } from 'rxjs';

describe('StoryListComponent', () => {
  let app : any;
  let service : any;
  let component: StoryListComponent;
  let fixture: ComponentFixture<StoryListComponent>;
  let hackerNewsService: HackerNewsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatTableModule, MatPaginatorModule],
      declarations: [StoryListComponent],
      providers: [HackerNewsService]
    }).compileComponents();
    fixture = TestBed.createComponent(StoryListComponent);
    app = fixture.componentInstance;
    service = fixture.debugElement.injector.get(HackerNewsService);
  });

  it('should create', () => {
    expect(StoryListComponent).toBeTruthy();
  });

  it('should load stories on StoryListComponentinitialization', () => {
    const mockStories = [
      { title: 'Story 1', url: 'https://example.com/story1' },
      { title: 'Story 2', url: 'https://example.com/story2' }
    ];// Mock stories data
    spyOn(service,"NewStories").and.callFake(() => {
      return of(mockStories);
    });
      app.loadStories();
      expect(app.stories).toEqual(mockStories);
      expect(app.dataSource.data).toEqual(mockStories);
      expect(app.isLoading).toBeFalse();
  });

  it('should handle error while loading stories', () => {
    const mockError = 'Error loading stories';
    spyOn(service,"NewStories").and.callFake(() => {
      return of(throwError(mockError));
    });
    app.loadStories();
    expect(app.isLoading).toBeFalse();
  });
 });