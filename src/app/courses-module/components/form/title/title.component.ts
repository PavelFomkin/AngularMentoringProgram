import {Component, forwardRef, Input} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TitleComponent),
      multi: true,
    },
  ]
})
export class TitleComponent implements ControlValueAccessor {
  value: string;
  error: string = '';
  @Input() control: AbstractControl;
  onChange: (value) => void;
  onTouched: () => void;

  registerOnChange(fn: any): void {
    this.onChange = fn;

  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: string): void {
    this.value = value ? value : '';
  }

  change($event): void {
    this.onChange($event.target.value);
    this._checkErrors();
  }

  _checkErrors(): void {
    if (this.control.errors === null) {
      this.error = '';
    } else if (this.control.errors.required) {
      this.error = 'Title field is required.';
    } else if (this.control.errors.maxlength) {
      this.error = 'Actual title length (' + this.control.errors.maxlength.actualLength +
        ') is more than required ' + this.control.errors.maxlength.requiredLength + ' characters';
    }
  }
}
