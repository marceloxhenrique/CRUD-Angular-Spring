import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, of } from 'rxjs';

import { ErrorDialogComponent } from '../../shared/component/error-dialog/error-dialog.component';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]>;
  // courses: Course[] = []; // if courses was not observables
  displayedColumns: string[] = ['name', 'category', 'actions'];

  constructor(
    private courseService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.courses$ = this.courseService.list().pipe(
      catchError((error: any) => {
        this.onError(`Error while loading courses ${error}`);
        return of([]);
      })
    );

    // this.courseService.list().subscribe((courses) => (this.courses = courses));
    // if courses was not observables
  }
  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }

  ngOnInit(): void {
    /* TODO document why this method 'ngOnInit' is empty */
  }
  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
