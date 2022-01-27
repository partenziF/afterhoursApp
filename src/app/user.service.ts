import { Injectable } from '@angular/core';
import { User } from './user';
import { HttpClient, HttpRequest, HttpEvent, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Profile } from './profile';
import { LoginRequest } from './LoginRequest';
import { LoginResponse } from './LoginResponse';
import { environment } from '../environments/environment';
import { AuthorizationRequest } from './AuthorizationRequest';

const options = { responseType: 'json' as const, };


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private actionUsers = 'users';
  

  //private baseURL = 'http://127.0.0.1:8080'; // URL to web api  


  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.      
      return of(result as T);
    };
  }

  getUsersResponse(pageSize: number, pageIndex: number): Observable<HttpResponse<User[]>> {
    type Paginator = {
      pageSize: number;
      pageIndex: number;
    };

    const paginator: any = {
      pageSize: pageSize,
      pageIndex: pageIndex

    }

    const queryParamsString = new HttpParams({ fromObject: paginator }).toString();
    return this.http.get<User[]>(`${environment.baseURL.Users}/${this.actionUsers}?${queryParamsString}`, { observe: 'response' });
  }

  getUsers(pageSize: number, pageIndex: number): Observable<User[]> {

    type Paginator = {
      pageSize: number;
      pageIndex: number;
    };

    const paginator: any = {
      pageSize: pageSize,
      pageIndex: pageIndex

    }

    const queryParamsString = new HttpParams({ fromObject: paginator }).toString();

    return this.http.get<User[]>(`${environment.baseURL.Users}/${this.actionUsers}?${queryParamsString}`)
      .pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      )

  }

  getUser(id: string): Observable<User> {

    return this.http.get<User>(`${environment.baseURL.Users}/${this.actionUsers}/${id}`).pipe(
      catchError(this.handleError<User>('getUser', undefined))
    );

  }


  delete(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.baseURL.Users}/${this.actionUsers}/${id}`).pipe(
      catchError(this.handleError<User>('update', undefined))
    );

  }

  update(ID: string, user: User): Observable<any> {

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(user);

    return this.http.put<any>(`${environment.baseURL.Users}/${this.actionUsers}/${ID}`, body, { 'headers': headers, observe: 'response' }).pipe(
      catchError(this.handleError<User>('update', undefined)
      )
    );

  }

  create(user: User): Observable<any> {

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(user);

    return this.http.post<any>(`${environment.baseURL.Users}/${this.actionUsers}`, body, { 'headers': headers }).pipe(
      map(x => {
        return x;
      }),

      //catchError(this.handleError<User>('update', undefined))
    );

  }

  getProfile(id: string): Observable<Profile> {

    return this.http.get<Profile>(`${environment.baseURL.Users}/${this.actionUsers}/${id}/profile`)
      .pipe(
        catchError(this.handleError<Profile>('getUser', undefined))
      );

  }

  uploadProfile(id: string, file: File): Observable<HttpEvent<any>> {

    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${environment.baseURL.Users}/${this.actionUsers}/${id}/profile`, formData, { reportProgress: true });

    return this.http.request(req);

  }



  login(request: LoginRequest) {

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(request);

    return this.http.post<LoginResponse>(`${environment.baseURL.Login}/`, body, { 'headers': headers }).pipe(
      catchError(this.handleError<LoginResponse>('login', undefined))
    );
  }

  userInfo(request: AuthorizationRequest): Observable<User> {

    const req: any = {
      AuthToken: request.AuthToken
    }

    const queryParamsString = new HttpParams({ fromObject: req }).toString();

    return this.http.get<User>(`${environment.baseURL.UserInfo}/?${queryParamsString}`)
      .pipe(
        catchError(this.handleError<User>('getUser', undefined))
      );
  }

  getUserProfile(request: AuthorizationRequest): Observable<Profile> {

    const req: any = {
      AuthToken: request.AuthToken
    }

    const queryParamsString = new HttpParams({ fromObject: req }).toString();

    return this.http.get<Profile>(`${environment.baseURL.GetProfile}/?${queryParamsString}`)
      .pipe(
        map(x => {
          return x;
        }),

        //catchError(this.handleError<Profile>('getUser', undefined))
      );

  }


  registerUser(request: AuthorizationRequest, user: User): Observable<any> {

    const req: any = {
      AuthToken: request.AuthToken
    }

    const queryParamsString = new HttpParams({ fromObject: req }).toString();

    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(user);

    return this.http.post<User>(`${environment.baseURL.RegisterUser}/?${queryParamsString}`, body, { 'headers': headers }).pipe(
      catchError(this.handleError<User>('update', undefined)
      )
    );

  }

  uploadProfileUser(request: AuthorizationRequest, file: File): Observable<HttpEvent<any>> {

    const reqAuth: any = {
      AuthToken: request.AuthToken
    }

    const queryParamsString = new HttpParams({ fromObject: reqAuth }).toString();


    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${environment.baseURL.UploadProfile}/?${queryParamsString}`, formData, { reportProgress: true });

    return this.http.request(req);

  }

}
