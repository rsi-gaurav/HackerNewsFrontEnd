import { Component, OnInit, ViewChild } from '@angular/core';
import { HackerNewsService } from '../services/story.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

export interface PeriodicElement {
  title: any;
  url: any;
}

@Component({
  selector: 'app-story-list',
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.scss']
})
export class StoryListComponent implements OnInit {
  stories: any[] = [];
  selectedStories: any[] = [];
  searchQuery: string = '';

  displayedColumns: string[] = ['title', 'url'];
  isLoading = false;
  dataSource: MatTableDataSource<PeriodicElement>
  story: any = [];
  @ViewChild('paginator') paginator!: MatPaginator;
  constructor(private hackerNewsService: HackerNewsService) { }

  ngOnInit(): void {
    this.loadStories();
  }

  /**
   * Applies a filter to the data source.
   * @param filterValue - The value to filter the data source by.
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   /**
   * Loads stories from the HackerNewsService and initializes the data source.
   */
  loadStories() {
    this.isLoading = true;
    this.hackerNewsService.NewStories().subscribe((data: any[]) => {
      this.stories = data;
      console.log('Stories loaded:', this.stories);
      this.dataSource = new MatTableDataSource<PeriodicElement>(this.stories);
      this.dataSource.paginator = this.paginator;
      this.isLoading = false; // Stop loading once the data is fetched
    }, (error: any) => {
      console.error('Error loading stories', error);
      this.isLoading = false; // Stop loading in case of error
    });
  }
}
