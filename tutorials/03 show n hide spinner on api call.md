## Learning Objective
- [x] create http interceptor to intercept http request and show and hide spinner accordingly
- [x] create spinner component that subscribes an observable that emits spinner state

## Step 1 - create a service class to retrive and set the spinner state

```sh
ng g s services/data
```
- update its content as
```ts
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
```
- we will subscribe to this spinner state observable in spinner component later.
- And we will update the spinner state from http interceptor later.

## Step 2 - Create Interceptor
```sh
ng g interceptor http-request
```
- udpate its content as
```ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DataService } from './services/data.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private dataService: DataService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let _ignoreSpinner = request.params.get('ignoreSpinner') != undefined && Boolean(request.params.get('ignoreSpinner'))
    if (!_ignoreSpinner) this.dataService.setSpinnerState(true);
    return next.handle(request).pipe(finalize(() => this.dataService.setSpinnerState(false)));
  }
}
```
- Here we are setting the spinner state to true if user hasn't pass the ignoreSpinner param in the req
- And when the api call is over, the spinner state is set to false.
- Udpate the providers array of app module to use this interceptor
```ts
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true }
  ],
```

## Step 3 - create spinner component
- Here we wrap mat-spinner use flexbox to center it
- `ng g c spinner --module shared`
- Update the template as 
```html
<div class="app-spinner" [ngStyle]="{display: show?'flex': 'none'}">
    <mat-spinner diameter="50"></mat-spinner>
</div>
```
- udpate the styling as
```scss
.app-spinner {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 90000;
}
```
- update the component class template as
```ts
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  show: boolean = false;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getSpinnerState().subscribe((state)=>{
      setTimeout(()=>this.show = state, 1);
    })
  }

}

```
- make sure the material module has the import `import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';`
- and MaterialModule is imported in SharedModule
