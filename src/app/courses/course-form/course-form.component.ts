import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private service: CoursesService,
    private _snackBar: MatSnackBar
  ) {
    this.form = this.formBuilder.group({
      name: [null],
      category: [null],
    });
  }
  onSubmit() {
    this.service.save(this.form.value).subscribe(
      (result: Course) => console.log(result),
      (error: HttpErrorResponse) => this.onError()
    );
  }

  onCancel() {}

  private onError() {
    this._snackBar.open(`Error while saving the course`, ' ', {
      duration: 3000,
    });
  }
}
