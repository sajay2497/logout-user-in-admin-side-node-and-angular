import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { catchError } from 'rxjs/operators';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log("intercepted request ... ");
        if (localStorage.getItem('userid') != null) {
            const headers = new HttpHeaders().set("Authorization", localStorage.getItem('userid') || '{}')
            const AuthRequest = req.clone({ headers: headers });
            return next.handle(AuthRequest);
        } else {
            return next.handle(req);
        }
    }
}
