import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";
import { BACKEND_URL } from "../utils/global_constants";
import { ApiResponse } from "../utils/api_response";

@Injectable({ providedIn: 'root' })
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  loggedIn$ = this.loggedIn.asObservable();

  constructor(private httpClient: HttpClient, private router: Router) {
    this.checkAuthOnLoad();
  }

  checkAuthOnLoad() {
    this.httpClient
      .get<ApiResponse<Object>>(`${BACKEND_URL}/isAuthenticated`, {
        withCredentials: true,
      })
      .subscribe({
        next: (isAuth) => {
          this.loggedIn.next(true);
        },
	error: (error) => {
	  this.loggedIn.next(false);
	}
      });
  }

  subscription!: Subscription;

  login(formattedCredentials: string) {
    const formattedEncodedCredentials = btoa(formattedCredentials);

    const headers = new HttpHeaders({
      Authorization: `Basic ${formattedEncodedCredentials}`,
    });

    this.subscription = this.httpClient
      .get<ApiResponse<Object>>(BACKEND_URL + '/api/login', {
        headers: headers,
        withCredentials: true,
      })
      .subscribe({
        next: (response) => {
          console.log(response.message);
          this.router.navigateByUrl('/home/my-committees');
	  this.loggedIn.next(true);
        },
        error: (error) => {
          console.log(error.error.message);
          this.router.navigateByUrl('/login');
        },
      });
  }

  // logout() {
  //   return this.http
  //     .post(
  //       `${BACKEND_URL}/logout`,
  //       {},
  //       {
  //         withCredentials: true,
  //       },
  //     )
  //     .pipe(tap(() => this.loggedIn.next(false)));
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
