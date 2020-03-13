import { ServicesService } from './../services.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  @ViewChild('email', {static: false}) email: ElementRef;
  @ViewChild('password', {static: false}) password: ElementRef;

  constructor(
    private _service: ServicesService,
    private _router: Router
  ) { }

  ngOnInit() {
    let jwt = localStorage.getItem("JwtHrms");
    if(jwt != null){
      let designation = this._service.jsonDecoder(jwt).data.designation;
      if(designation == "ADMIN"){
        this._router.navigate(['/admin']);
      }
      else{
        this._router.navigate(['/user']);
      }
    }
  }
  
  checkUser(){
    let user = {
      "email": this.email.nativeElement.value,
      "password": this.password.nativeElement.value
    };
     if(this.email.nativeElement.value=='' || this.password.nativeElement.value=='')
     {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('form-horizontal');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          }, false);
        });
      }
    else{
      this._service.checkUser(user).subscribe(res => {
        if(res.status == 200){
          this.onLogin(res.body.token);
        }
        else if(res.status == 401){
          alert("Unauthorized");
        }
      });    
    }
  }

  onLogin(token){
    if(token != null){
      localStorage.setItem("JwtHrms", token);
      let decodedToken = this._service.jsonDecoder(token);
      let designation = decodedToken.data.designation;
      if(designation == "ADMIN"){
        this._router.navigate(['/admin']);
      }
      else{
        this._router.navigate(['/user']);
      }
    }
    else{
      alert("Token does not exist");
    }
  }
}