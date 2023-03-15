import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import User from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  form_cadastrar: FormGroup;
  isSubmitted: boolean = false;
  hide = true;

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router) {
      this.form_cadastrar = this.formBuilder.group({
        name:  ["",[Validators.required]],
        email: ["",[Validators.required, Validators.email]],
        password:  ["",[Validators.required]]
      });
    }

  ngOnInit(): void {
  }



  get errorControl(){
    return this.form_cadastrar?.controls;
  }



  submitForm() : boolean{
    this.isSubmitted = true;
    if(!this.form_cadastrar?.valid){
      console.log('inválido');
      return false;
    }else{
     this.cadastrar();
      return true;
    }
  }

  cadastrar(){
    let user = new User();
    user.name =  this.form_cadastrar.value['name'];
    user.email =  this.form_cadastrar.value['email'];
    user.password = this.form_cadastrar.value['password'];
    this.userService.criarUsuario(user)
    .subscribe(
      resultado => {
        let userAuth = resultado;
        console.log(userAuth);
        this.router.navigate(['login']);
      },
      error => {
        console.log(error);
      }
    );

  }
}
