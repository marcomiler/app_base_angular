import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
// import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  // DateAdapter,
  // MAT_DATE_FORMATS,
  // MAT_DATE_LOCALE,
  MatNativeDateModule,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatetimepickerComponent } from '@components/datetimepicker/datetimepicker.component';
import { DirectivesModule } from '@core/directives/directives.module';
// import { CUSTOM_FORMATS_DATE } from 'src/app/utils/constants';

@Component({
  selector: 'app-forms-example',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    DirectivesModule,
    DatetimepickerComponent,
  ],
  templateUrl: './forms-example.component.html',
  styleUrls: ['./forms-example.component.scss'],
  // providers: [
  //   { provide: LOCALE_ID, useValue: 'es' },
  //   { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
  //   {
  //     provide: DateAdapter,
  //     useClass: MomentDateAdapter,
  //     deps: [MAT_DATE_LOCALE],
  //   },
  //   { provide: MAT_DATE_FORMATS, useValue: CUSTOM_FORMATS_DATE },
  // ],
})
export class FormsExampleComponent {
  private _fb: FormBuilder = inject(FormBuilder);

  public form: FormGroup = this._fb.group({
    date: [null, Validators.required],
    datetime: [null, Validators.required],
    number: [null, Validators.required],
    string: [null, Validators.required],
    alphanumeric: [null, Validators.required],
    dni: [null, Validators.required],
  });

  public handleClick(): void {
    console.log('form values: ', this.form.value);
  }
}
