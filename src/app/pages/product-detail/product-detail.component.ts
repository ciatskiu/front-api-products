import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Product from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product = new Product();
  form_cadastrar: FormGroup;
  isSubmitted: boolean = false;

  constructor(private productService: ProductsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute) {
      this.form_cadastrar = this.formBuilder.group({
        name: ["",[Validators.required]],
        price:  ["",[Validators.required, Validators.min]],
        quantity:  ["",[Validators.required]],
      });
    let id = (String(this.route.snapshot.paramMap.get('id')));
      this.productService.listarTodosProdutoPorId(id)
      .subscribe(resultado=>{
        this.product = resultado;
        this.form_cadastrar = this.formBuilder.group({
          name: [this.product.name,[Validators.required]],
          price:  [this.product.price,[Validators.required, Validators.min]],
          quantity:  [this.product.quantity,[Validators.required]],
        });

     })
   }

  ngOnInit(): void {

  }

  get errorControl(){
    return this.form_cadastrar?.controls;
  }

  submitForm() : boolean{
    this.isSubmitted = true;
    if(!this.form_cadastrar?.valid){
      return false;
    }else{
     this.editar();
      return true;
    }
  }

  editar(){
    this.productService.editarProduto(this.product.id,this.form_cadastrar.value)
    .subscribe(
      resultado => {
        console.log("Produto Editado");
        this.router.navigate(['product']);
      }
    );
  }


}
