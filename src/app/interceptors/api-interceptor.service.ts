import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, finalize, map} from 'rxjs/operators';
import {NgProgress} from 'ngx-progressbar';
import {ToastrService} from 'ngx-toastr';
import {environment} from "../../environments/environment";
import {throwError} from "rxjs/internal/observable/throwError";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    public ngProgress: NgProgress,
    private toastr: ToastrService
  ) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.ngProgress.start();
    console.log('Start');
    req = req.clone({
      url:environment.apiBaseUrl + req.url,
      setHeaders: {
        ['Content-Type']: `application/json`
      }
    });
    return next.handle(req).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          console.log(event.body);
        }
        return event;
      }),
      catchError(error => {
        console.log(error);
        this.toastr.error(error.statusText, 'Error');
        return throwError(error);
      }),
      finalize(() => {
        this.ngProgress.done();
        console.log('Stop');
      })
    );
  }
}
