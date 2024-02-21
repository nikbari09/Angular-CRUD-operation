import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { Route, Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

 paraty:boolean=false;

  constructor(private _empService:EmployeeService, private router:Router,private _dialogRef:MatDialogRef<LoginComponent>){

  }
  ngOnInit(): void{

  }

  registerForm=new FormGroup({
    firstname: new FormControl("",[Validators.required]),
    lastname: new FormControl("",[Validators.required]),
    email: new FormControl("",[Validators.required]),
    password: new FormControl("",[Validators.required])
  });

  public registerSubmitted(){
    console.log(this.registerForm);
  }
  get firstname(): FormControl{
    return this.registerForm.get("firstname") as FormControl;
  }

  get lastname(): FormControl{
    return this.registerForm.get("lastname") as FormControl;
  }
  get email(): FormControl{
    return this.registerForm.get("email") as FormControl;
  }

  get password(): FormControl{
    return this.registerForm.get("password") as FormControl;
  }

  // Email=this.registerForm.get('email');
  res:any;
  getsingleemp(Email:any){
   
    this._empService.getEmployee().subscribe({
      next:(res)=>{
        console.log(res);
        this.res = res;
        this.Check(Email,this.res);
        // alert('Invalid User...');
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
    
  }

  Check(Email:any,res:any){
    for(var val of res){
      this.paraty=false;
      if(Email.value === val.email){
        console.log(val.email);
        this.paraty=true;
        this._empService.getsingleemp(val.id).subscribe({
          next:(res1)=>{
            console.log(res1);
            // alert('Valid user.');
            // this.paraty=true;
            // this.ValidCheck();
            this.router.navigate(["/dashboard"]);

          },
          error:(err1)=>{
            console.log(err1);
            
          }
        });
        break;
      }
    }
    if(this.paraty === false)
    {
      alert("Invalid User...");
    }
    else{
      alert("Valid User...");
      this._dialogRef.close();
    }
   
  }

  // ValidCheck(){
  //   if(this.paraty === false)
  //   {
  //     alert("Invalid User...");
  //   }
  //   else{
  //     alert("Valid User...");
  //   }
  // }

  // ngOnDestroy(){
  //   console.log(this.paraty)
  // }

}
