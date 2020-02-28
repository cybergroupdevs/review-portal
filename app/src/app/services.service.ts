import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { __param } from 'tslib';
import { HttpClientModule} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }
 
  private log(message: string) {
    console.log(message);
  }

  header_token: HttpHeaders = new HttpHeaders().set("token", localStorage.getItem("JwtHrms"));

  jsonDecoder = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  };

  showAllEmployees(): Observable<any>{
    return this.http.get("http://localhost:3001/employee/employeeList", {headers: this.header_token}).pipe(
      tap(_ => this.log("showing details")),
      catchError(this.handleError<any>('error in details')
    ));
  }

  employeeData(): Observable<any>{
    return this.http.get("http://localhost:3001/employees/"+this.jsonDecoder(localStorage.getItem("JwtHrms")).data._id).pipe(
      tap(_ => this.log("showing details")),
      catchError(this.handleError<any>('error in details')
    ));
  }

  checkUser(object): Observable<any>{
    return this.http.post("http://localhost:3001/login", object, {responseType: 'text'}).pipe(
      tap(_ => this.log("showing details")),
      catchError(this.handleError<any>('checkUser ?'))
      );
  }
  createUser(obj): Observable<any>{
    return this.http.post("http://localhost:3001/employee/signup", obj).pipe(
      tap(_ => this.log("added user")),
      catchError(this.handleError<any>('Some Error Occurred'))
    );
  }


  updateData(object): Observable<any>{
    return this.http.patch("http://localhost:3001/employee/update",object+this.jsonDecoder(localStorage.getItem("JwtHrms")).data._id).pipe(
      tap(_ => this.log("updating details")),
      catchError(this.handleError<any>('error in details')
    ));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
      };
    }
  }
  

