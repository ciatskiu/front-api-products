import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Product from 'src/app/models/product';
import User from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public products : Product[] = [];
  user : User = new User();
  token : string;
  form_cadastrar: FormGroup;
  isSubmitted: boolean = false;

  constructor(private productService: ProductsService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
      this.user = this.authService.getUsuario();
      this.token = this.authService.getToken();
      console.log(this.user);
      console.log(this.token);
      this.form_cadastrar = this.formBuilder.group({
        name: ["",[Validators.required]],
        price:  ["",[Validators.required, Validators.min]],
        quantity:  ["",[Validators.required]],
      });
    }

  ngOnInit(): void {
    this.listarTodosProdutos();
  }


  listarTodosProdutos() {
    this.productService.listarTodosProdutos().subscribe(resultado=>{
       this.products = resultado;
    })
  }

  cadastrar(){
    this.productService.adicionarProduto(this.form_cadastrar.value)
    .subscribe(
      resultado => {
        console.log("Produto Salvo" + resultado)
        window.location.reload();
      }
    );
  }

  editar(product: Product){
    this.router.navigate(['product-detal', product.id]);
  }

  excluir(product: Product){
    this.productService.excluirProduto(product.id).subscribe(
      resultado => {
        console.log(resultado);
        window.location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }

  get errorControl(){
    return this.form_cadastrar?.controls;
  }

  submitForm() : boolean{
    this.isSubmitted = true;
    if(!this.form_cadastrar.valid){
      return false;
    }else{
      this.cadastrar();
      return true;
    }
  }


}
