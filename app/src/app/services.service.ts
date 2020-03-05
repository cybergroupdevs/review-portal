import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';
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
    console.log(token);
  };

  showAllEmployees(): Observable<any>{
    return this.http.get("http://localhost:3001/employee/employeeList", {headers: this.header_token}).pipe(
      tap(_ => this.log("showing details")),
      catchError(this.handleError<any>('error in details')
    ));
  }

  employeeData(): Observable<any>{
    const id: any = this.jsonDecoder(localStorage.getItem("JwtHrms")).data._id;
    return this.http.get(`http://localhost:3001/employees/${id}`).pipe(
      tap(_ => this.log("showing details")),
      catchError(this.handleError<any>('error in details')
    ));
  }

  checkUser(object): Observable<any>{
    return this.http.post("http://localhost:3001/login", object, {responseType: 'json'}).pipe(
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



  isAuthenticated(){
    if(localStorage.getItem("JwtHrms") != null && this.isValid){
      return true;
    }
  }

  isValid(){
    if(this.jsonDecoder(localStorage.getItem("JwtHrms")).exp <= Date.now()){
      return false;
    }
    else{
      return true;
    }
  }


  updateData(object): Observable<any>{
    return this.http.patch(`http://localhost:3001/employee/update/${this.jsonDecoder(localStorage.getItem("JwtHrms")).data._id}`,object).pipe(
      tap(_ => this.log("updating details")),
      catchError(this.handleError<any>('error in details')
    ));
  }

  reviewData(id: string, searchBy: string, flag): Observable<any>{
    return this.http.get("http://localhost:3001/review/?"+searchBy+"="+id+"&flag="+flag).pipe(
      tap(_ => this.log("showing review details")),
      catchError(this.handleError<any>('error in details')
    ));
  }

  updateReviewData(userObj): Observable<any>{
    return this.http.patch("http://localhost:3001/reviews/update/5e5b85cdb4f6bcd838db5e06",userObj).pipe(
      tap(_ => this.log("updated review details")),
      catchError(this.handleError<any>('error in updating details')
    ));
  }

  // empData(): Observable<any>{
  //   return this.http.get("http://localhost:3001/employees/5e579020a961b2f91f6be7f4").pipe(
  //     tap(_ => this.log("received employee details")),
  //     catchError(this.handleError<any>('error in details')
  //   ));
  // }

  reviewerData(): Observable<any>{
    const id: any = this.jsonDecoder(localStorage.getItem("JwtHrms")).data._id;
    return this.http.get(`http://localhost:3001/review/${id}`).pipe(
      tap(_ => this.log("reviewer details")),
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

    getReviewById(id:String, searchBy:string, flag): Observable<any> {
      console.log("in service section");
      return this.http.get("http://localhost:3001/review/?" + searchBy+"="+ id + "&flag=" + flag).pipe(
        catchError(this.handleError<any>('error in review details')));
    }

    updateSelfReview(id,reviwObj): Observable<any>{
      return this.http.patch("http://localhost:3001/reviews/update/" + id ,reviwObj).pipe(
        tap(_ => this.log("updated review details")),
        catchError(this.handleError<any>('error in updating details')
      ));
    }

    createReview(object): Observable<any>{
      return this.http.post("http://localhost:3001/createReview", object).pipe(
        tap(_ => this.log("added review")),
        catchError(this.handleError<any>('Some Error Occurred'))
      );
    }

    getByCgiCodeReviewValues(cgiCode): Observable<any>{
      return this.http.get("http://localhost:3001/review/values/" + cgiCode).pipe(
      tap(_ => this.log("got cgi code for review values")),
      catchError(this.handleError<any>('error in details'))
      );
    }
    

    searchEmp(term: string): Observable<any> {
      if (!term.trim()) {
        return of([]);
      }
      return this.http.get(`http://localhost:3001/emp?firstName=${term}`, {headers: this.header_token}).pipe(
        tap(_ => this.log("getting emp by name")),
        catchError(this.handleError<any>('error in loading'))
      );
    }

  }
  