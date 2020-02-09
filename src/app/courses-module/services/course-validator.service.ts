import {Injectable} from '@angular/core';
import {FormControl, ValidationErrors} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CourseValidatorService {
  static validateDate(date: FormControl): ValidationErrors {
    if (!/^\d{4}.\d{1,2}.\d{1,2}$/.test(date.value)) {
      return {pattern: 'Date doesn\'t match \'yyyy.MM.dd\' pattern.'};
    } else {
      return new Date(date.value).toString() === 'Invalid Date'
        ? {pattern: 'Invalid Date field.'}
        : null;
    }
  }

  static validateDuration(duration: FormControl): ValidationErrors {
    return !/^\d+$/.test(duration.value)
      ? {pattern: 'Invalid Duration field.'}
      : null;
  }

  static validateAuthors(authors: FormControl): ValidationErrors {
    return authors.value.length < 1
      ? {length: 'At least 1 author is required for the filed.'}
      : null;
  }
}
