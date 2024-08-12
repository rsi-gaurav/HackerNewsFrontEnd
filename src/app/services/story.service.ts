import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const API_URL = environment.apiUrl;

@Injectable({
    providedIn: 'root',
})
export class HackerNewsService {
    constructor(private http: HttpClient) { }

    /**
     * Fetches new stories from the Hacker News API.
     * @returns {Observable<any>} An observable containing the new stories.
     */
    NewStories(): any {
        return this.http.get(`${API_URL}/api/HackerNews/NewStories`,);
    }
}
