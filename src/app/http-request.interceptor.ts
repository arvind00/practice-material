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
