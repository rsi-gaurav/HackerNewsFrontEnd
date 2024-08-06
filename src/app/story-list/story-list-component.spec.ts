import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { StoryListComponent } from './story-list.component';
import { HackerNewsService } from '../services/story.service';
import { of, throwError } from 'rxjs';

describe('StoryListComponent', () => {
  let component: StoryListComponent;
  let fixture: ComponentFixture<StoryListComponent>;
  let hackerNewsService: HackerNewsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatTableModule, MatPaginatorModule],
      declarations: [StoryListComponent],
      providers: [HackerNewsService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryListComponent);
    component = fixture.componentInstance;
    hackerNewsService = TestBed.inject(HackerNewsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load stories on initialization', () => {
    const mockStories = [
      { title: 'Story 1', url: 'https://example.com/story1' },
      { title: 'Story 2', url: 'https://example.com/story2' }
    ];// Mock stories data
    spyOn(hackerNewsService, 'NewStories').and.returnValue(of(mockStories));

    component.ngOnInit();

    expect(component.stories).toEqual(mockStories);
    expect(component.dataSource.data).toEqual(mockStories);
    expect(component.isLoading).toBeFalse();
  });

  it('should apply filter and update data source', () => {
      const mockEvent: unknown = {
        target: {
          value: 'search query'
        }
      };
      const filterValue = (mockEvent as { target: { value: string } }).target.value;
      const mockData = [
        { title: 'Story 1', url: 'https://example.com/story1' },
        { title: 'Story 2', url: 'https://example.com/story2' }
      ];
      component.stories = mockData;
      component.dataSource = new MatTableDataSource(mockData);
      spyOn(component.dataSource, 'filter' as never);
      spyOn(component.dataSource.paginator, 'firstPage' as never);
  
      component.applyFilter(mockEvent as Event);
  
      expect(component.dataSource.filter).toHaveBeenCalledWith(filterValue.trim().toLowerCase());
      expect(component.dataSource.paginator?.firstPage).toHaveBeenCalled();
    });

  it('should handle error while loading stories', () => {
    const mockError = 'Error loading stories';
    spyOn(hackerNewsService, 'NewStories').and.returnValue(throwError(mockError));

    component.loadStories();

    expect(component.isLoading).toBeFalse();
    expect(console.error).toHaveBeenCalledWith('Error loading stories', mockError);
  });
});