import { Component, OnInit } from '@angular/core';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  courses: Observable<Course[]>;
  // courses: Course[] = []; // if courses was not observables
  displayedColumns: string[] = ['name', 'category'];

  constructor(private courseService: CoursesService) {
    this.courses = this.courseService.list();

    // this.courseService.list().subscribe((courses) => (this.courses = courses));
    // if courses was not observables
  }

  ngOnInit(): void {}
}
