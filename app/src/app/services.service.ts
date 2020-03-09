import { AddUserComponent } from './add-user/add-user.component';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from '@angular/common/http';
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
//   signinUser(UserName,Password): Observable<any>{
//     return this.http.get('http://api.###.com/api/###/signin?
//         username='+UserName+'&password='+Password);
// }


  showAllEmployees(): Observable<any>{
    return this.http.get("http://localhost:3001/employee/employeeList", {headers: this.header_token, observe: 'response'}).pipe(
      tap(_ => this.log("showing details")),
      catchError(this.handleError<any>('error in details')
    ));
  }

  employeeData(id: string): Observable<any>{
    //const id: any = this.jsonDecoder(localStorage.getItem("JwtHrms")).data._id;
    return this.http.get(`http://localhost:3001/employees/${id}`, {headers: this.header_token, observe: 'response'}).pipe(
      tap(_ => this.log("showing details")),
      catchError(this.handleError<any>('error in details')
    ));
  }

  checkUser(object): Observable<any>{
    return this.http.post("http://localhost:3001/login", object, {observe: 'response', responseType: 'json'}).pipe(
      tap(_ => this.log("showing details")),
      catchError(this.handleError<any>('checkUser ?'))
      );
  }
  
  createUser(obj): Observable<any>{
    return this.http.post("http://localhost:3001/employee/signup", obj, {headers: this.header_token, observe: 'response'}).pipe(
      tap(_ => this.log("added user")),
      catchError(this.handleError<any>('Some Error Occurred'))
    );
  }
  // sendMail(userObj):Observable<any>{
  //   return this.http.post("http://localhost:3001/sendMail",userObj).pipe(
  //     tap(_=>this.log("mail sent")),
  //     catchError(this.handleError<any>('Some error ocured'))
  //   );
  // }
  sendEmail(obj): Observable<any> {
    return this.http.post<any>('http://localhost:3001/sendFormData', obj)
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

  updateData(object: any, id:string): Observable<any>{
    return this.http.patch("http://localhost:3001/employee/update/"+id ,object, {observe: 'response', headers: this.header_token}).pipe(
      tap(_ => this.log("updating details")),
      catchError(this.handleError<any>('error in details')
    ));
  }

  // Getting data for table
  reviewData(id: string, searchBy: string, flag:string): Observable<any>{
      return this.http.get("http://localhost:3001/review/?"+searchBy+"="+id+"&flag="+flag, {headers: this.header_token, observe: 'response'}).pipe(
      tap(_ => this.log("showing review details")),
      catchError(this.handleError<any>('error in details')
    ));
    }
  

  // Gets review data from id.
  reviewDataById(id: string, route: string): Observable<any>{
    return this.http.get("http://localhost:3001/review/"+id+"?route="+route, {headers: this.header_token, observe: 'response'}).pipe(
      tap(_ => this.log("reviewer details")),
      catchError(this.handleError<any>('error in details')
    ));
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error.status); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(error as T);
      };
    }

    updateSelfReview(id: string, reviewObj:any){
      return this.http.patch("http://localhost:3001/review/"+id, reviewObj, {observe: 'response', headers: this.header_token}).pipe(
        tap(_ => this.log("added review")),
        catchError(this.handleError<any>('Some Error Occurred'))
      );
    }

    createReview(object): Observable<any>{
      return this.http.post("http://localhost:3001/review/", object, {headers: this.header_token, observe: 'response'}).pipe(
        tap(_ => this.log("added review")),
        catchError(this.handleError<any>('Some Error Occurred'))
      );
    }

    getByCgiCode(cgiCode): Observable<any>{
      return this.http.get("http://localhost:3001/employeeData/"+ cgiCode, {headers: this.header_token, observe: 'response'}).pipe(
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
  