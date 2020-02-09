import {Component, forwardRef, Input} from '@angular/core';
import {AbstractControl, ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationComponent),
      multi: true,
    },
  ]
})
export class DurationComponent implements ControlValueAccessor {
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

  change($event) {
    this.onChange($event.target.value);
    this._checkErrors();
  }

  _checkErrors(): void {
    if (this.control.errors === null) {
      this.error = '';
    } else if (this.control.errors.required) {
      this.error = 'Duration field is required.';
    } else if (this.control.errors.pattern) {
      this.error = this.control.errors.pattern;
    }
  }
}