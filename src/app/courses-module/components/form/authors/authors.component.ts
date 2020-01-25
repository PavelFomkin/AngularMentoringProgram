import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, NG_VALUE_ACCESSOR} from '@angular/forms';
import {Author} from '../../../models/author';
import {EMPTY, Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, tap} from 'rxjs/operators';
import {CourseService} from '../../../services/course.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorsComponent),
      multi: true,
    },
  ]
})
export class AuthorsComponent implements OnInit {
  availableAuthors$: Observable<Author[]>;
  authorSearchSubject$ = new Subject<string>();
  @Input() authors: FormArray;
  form: FormGroup;

  constructor(private courseService: CourseService,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      authorSearchData: [''],
    });
  }

  ngOnInit(): void {
    this.authorSearchSubject$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(searchData => {
        if (searchData.length > 0) {
          this.availableAuthors$ = this.courseService.getAuthors(searchData);
        } else {
          this.availableAuthors$ = EMPTY;
        }
      })
    ).subscribe();
  }

  addAuthor(author: Author) {
    const fullName = author.name.split(' ');
    this.authors.push(
      this.formBuilder.group({
        id: [author.id],
        name: [fullName[0]],
        lastName: [fullName[1]],
      })
    );
    this.resetAvailableAuthors();
  }

  removeAuthor(index: number) {
    this.authors.removeAt(index);
  }

  getAvailableAuthors($event): void {
    this.authorSearchSubject$.next($event.value);
  }

  resetAvailableAuthors() {
    setTimeout(() => {
      this.availableAuthors$ = EMPTY;
    }, 300);
  }
}
