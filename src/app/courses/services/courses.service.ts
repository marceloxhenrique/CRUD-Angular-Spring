import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Course } from '../model/course';
import { first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = 'api/courses';
  constructor(private httpClient: HttpClient) {}
  list() {
    return this.httpClient.get<Course[]>(this.API).pipe(
      first(), // unsubscribe from observables when get the first answer
      tap((courses: Course) => console.log(courses))
    );
  }
  save(record: Course) {
    return this.httpClient.post<Course>(this.API, record).pipe(first());
  }
}
