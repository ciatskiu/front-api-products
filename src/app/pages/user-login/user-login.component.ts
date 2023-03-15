import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import User from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  form_login: FormGroup;
  isSubmitted: boolean = false;
  hide = true;

  constructor(private userService: UserService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
      this.form_login = this.formBuilder.group({
        email: ["",[Validators.required, Validators.email]],
        password:  ["",[Validators.required]]
      });
    }

  ngOnInit(): void {
  }

  get errorControl(){
    return this.form_login?.controls;
  }

  submitForm() : boolean{
    this.isSubmitted = true;
    if(!this.form_login?.valid){
      console.log('inválido');
      return false;
    }else{
     this.logar();
      return true;
    }
  }

  logar(){
    this.form_login.value['email'];
    let user = new User();
    user.email =  this.form_login.value['email'];
    user.password = this.form_login.value['password'];
    this.userService.criarSessao(user)
    .subscribe(
      resultado => {
        this.authService.mockUsuarioLogin(resultado);
        this.router.navigate(['products']);
      },
      error => {
        console.log(error);
      }
    );

  }

  goToRegister(){
    this.router.navigate(['register']);
  }

}
