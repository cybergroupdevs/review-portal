import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ServicesService } from './../services.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';


@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.scss']
})
export class CreateReviewComponent implements OnInit {

  emp$: Observable<any[]>;
  private searchTerms = new Subject<string>();

  constructor(private _service: ServicesService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  @ViewChild('email', {static: false}) email: ElementRef;
  @ViewChild('cgiCode', {static: false}) cgiCode: ElementRef;
  @ViewChild('firstName', {static: false}) firstName: ElementRef;
  @ViewChild('lastName', {static: false}) lastName: ElementRef;
  @ViewChild('reviewer', {static: false}) reviewer: ElementRef;
  @ViewChild('qaer', {static: false}) qaer: ElementRef;
  @ViewChild('cycle', {static: false}) cycle: ElementRef;
  @ViewChild('targetDate', {static: false}) targetDate: ElementRef;

  res:any;
  userArray: any;

  sendReq(cgiCodeValue){
    return this._service.getByCgiCodeReviewValues(cgiCodeValue);
  }

  ngOnInit() {
    const input = document.querySelector('input');
    const cgiCode = document.getElementById('cgiCodeField');
    input.addEventListener('input', this.cgiValue.bind(this));   
    
    this.emp$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this._service.searchEmp(term)
    ));
  }

  cgiValue(e) {
    console.log(e.target.value);
    let cgiCodeValue = e.target.value;

    this.sendReq(cgiCodeValue).subscribe( res => {
      this.userArray =res[0]
      this.setEmployeeData()
      console.log(res);
      if (res.status===200){
        console.log(res);
      }
      else{
        console.log("error occured");
        
      }
    });
  
  }
  // getValues(res){
  //  let employeeValues = res;
  //  let firstName = employeeValues[0].firstName;
  //  let lastName = employeeValues[0].lastName;
  //  let email =employeeValues[0].email
  // }

  // showValues(){
  //   const input = document.querySelector('input');
  //   const firstName = document.getElementById('firstNameField');
  //   const lastName = document.getElementById('lastNameField');
  //   const email = document.getElementById('emailField');
  //   firstName.value =
  // }
  setEmployeeData(){
    console.log("set employee data")
    console.log(this.userArray.firstName)
    this.firstName.nativeElement.value = this.userArray.firstName;
    this.lastName.nativeElement.value = this.userArray.lastName;
    this.email.nativeElement.value = this.userArray.email;
    }

  createReview(){
    let reviewObject = {
      firstName: this.firstName.nativeElement.value,
      lastName: this.lastName.nativeElement.value,
      email: this.email.nativeElement.value,
      cgiCode: this.cgiCode.nativeElement.value,
      reviewer: this.reviewer.nativeElement.value,
      qaer: this.qaer.nativeElement.value,
      cycle: this.cycle.nativeElement.value,
      targetDate: this.targetDate.nativeElement.value,
    }
 
    this._service.createReview(reviewObject).subscribe(res => this.res = res);
    console.log(this.res);
    if (this.res.status==200){

    }
    else{
      console.log("error occured");
      
    }

  }

}
