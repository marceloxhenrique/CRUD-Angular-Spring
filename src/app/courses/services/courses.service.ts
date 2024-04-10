import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Course } from '../model/course';
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = '/assets/courses.json';
  constructor(private httpClient: HttpClient) {}
  list() {
    return this.httpClient.get<Course[]>(this.API).pipe(
      first(), // unsubscribe from observables when get the first answer
      tap((courses) => console.log(courses))
    );
  }
}
