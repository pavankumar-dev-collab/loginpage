import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Match } from '../match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
   fetched:any;

  constructor(private formBuilder: FormBuilder,private router: Router) {
    
   }

  ngOnInit() {

    this.fetched=JSON.parse(localStorage.getItem("user"))

    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,30}')]],
      confirmPassword: ['', Validators.required],
      address: ['', [Validators.required,Validators.maxLength(30)]],
     
     
  }, {
      validator: Match('password', 'confirmPassword')
  });
  }


  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      let stored=[];
      if (this.registerForm.invalid) {
          return;
      } 
      if(localStorage.getItem("user")){
       let prev=JSON.parse(localStorage.getItem("user"));
       prev.map((y)=>{
        stored.push(y)
       })
      }
     
      stored.push(this.registerForm.value)

      alert("Registerd successfully Please Login");
      localStorage.setItem("user", JSON.stringify(stored));
      this.router.navigate(['/login']);
  }

  onReset() {
      this.submitted = false;
      this.registerForm.reset();
  }

  routeLogin(){
    this.router.navigate(['/login']);
  }

}
