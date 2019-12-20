import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {distinctUntilChanged} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public loader: Subject<boolean> = new Subject();

  constructor() {
    this.loader.pipe(
      distinctUntilChanged()
    );
  }

  getSubscription(): Observable<boolean> {
    return this.loader.asObservable();
  }

  turnLoaderOn(): void {
    this.loader.next(true);
  }

  turnLoaderOff(): void {
    this.loader.next(false);
  }
}
