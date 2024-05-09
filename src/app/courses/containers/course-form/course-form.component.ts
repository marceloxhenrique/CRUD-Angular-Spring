import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

import { Course } from '../../model/course';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent implements OnInit {
  form = this.formBuilder.group({
    _id: [''],
    name: [''],
    category: [''],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category,
    });
    console.log(course);
  }

  onSubmit() {
    this.service.save(this.form.value).subscribe(
      (result: Course) => this.onSucces(),
      (error: HttpErrorResponse) => this.onError()
    );
  }

  onCancel() {
    this.location.back();
  }

  private onSucces() {
    this._snackBar.open(`Course sucessfuly saved`, ' ', {
      duration: 4000,
    });
    this.onCancel();
  }

  private onError() {
    this._snackBar.open(`Error while saving the course`, ' ', {
      duration: 4000,
    });
  }
}
