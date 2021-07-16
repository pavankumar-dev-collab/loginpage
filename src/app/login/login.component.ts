import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Match } from '../match.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  hide:boolean=false;
  user:boolean=true;
  email:boolean=false;

  constructor(private formBuilder: FormBuilder,private router: Router) { 
   
  }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      userName: [''],
      mobile: ['', [Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email: ['', [Validators.email]],
      password: ['', [Validators.required]],
   
  });
  }


  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
       let stored =JSON.parse(localStorage.getItem("user"));
       let found= stored.filter((x)=>x.userName==this.registerForm.value.userName || x.email==this.registerForm.value.email || x.mobile==this.registerForm.value.mobile)
       console.log("foo",found)
   
      if(found.length!=0){
        if(found[0].password==this.registerForm.value.password){
      
        this.router.navigate(['/home'],{
          state: { name:found}
        });
        localStorage.setItem("userfound",JSON.stringify(found))
      }
      else{
        alert("Invalid Credntials")
      }
    }
    else{
      alert("User Not Found")
    }
  }

  onLog(){
    this.user=true;
    this.hide=false;
    this.email=false;
  }

  hideField(s){

  if(s=="otp"){
  this.hide=true;
  this.email=false;
  this.user=false;
  }
  else{
    this.email=true;
    this.hide=false;
    this.user=false;
  }
  }

  routeLogin(){
    this.router.navigate(['/register'] );
  }


  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }
}
