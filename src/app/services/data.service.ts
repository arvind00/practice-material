import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  spinnerState = new Subject<boolean>()

  constructor() { }

  getSpinnerState(): Observable<boolean> {
    return this.spinnerState.asObservable();
  }

  setSpinnerState(state: boolean) {
    this.spinnerState.next(state);
  }
}
