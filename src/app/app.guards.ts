import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject } from "@angular/core";
import { Route, UrlSegment, UrlTree, Router } from "@angular/router";
import { Observable, map, catchError, of } from "rxjs";
import { ApiResponse } from "./utils/api_response"
import { BACKEND_URL } from "./utils/global_constants"

export function isNotAuthenticated(
  route: Route,
  segment: UrlSegment[],
): Observable<Boolean | UrlTree> {
  const httpClient = inject(HttpClient);
  const router = inject(Router);

  return httpClient
    .get<ApiResponse<Object>>(BACKEND_URL + '/isAuthenticated', {
      withCredentials: true,
    })
    .pipe(
      map((response) => {
	console.log(response?.message);
        if (response?.message == 'true') {
          return router.parseUrl('/home/my-committees');
        } else {
	  return true;
	}
      }),
      catchError((error: HttpErrorResponse) => {
	return of(true);
      }),
    );
}
