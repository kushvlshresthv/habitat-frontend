import { HttpRequest, HttpHandlerFn, HttpEventType, HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError, tap, throwError } from "rxjs";
import { AuthService } from "./service/auth.service";


export function checkResponseStatus(request:HttpRequest<unknown>, next: HttpHandlerFn) {
  const authService = inject(AuthService);
	return next(request).pipe(
	  catchError((error:HttpErrorResponse)=> {
	    if(error.status === 401) {
	      console.log("Redirecting..");
	      authService.removeAuthentication();
	    }
	    return throwError(()=> error);
	  })
	);
}
