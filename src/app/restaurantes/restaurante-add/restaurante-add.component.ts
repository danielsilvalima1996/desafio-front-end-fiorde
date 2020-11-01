import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoNotificationService } from '@po-ui/ng-components';
import { Restaurante } from 'src/app/interfaces/restaurante.model';
import { RestauranteService } from 'src/app/services/restaurante/restaurante.service';

@Component({
  selector: 'app-restaurante-add',
  templateUrl: './restaurante-add.component.html',
  styleUrls: ['./restaurante-add.component.css']
})
export class RestauranteAddComponent implements OnInit {

  public loading: boolean = false;

  public restauranteForm: FormGroup;

  constructor(
    private restauranteService: RestauranteService,
    private notificationService: PoNotificationService,
    private location: Location,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.restauranteForm = this.fb.group({
      nome: ['', [Validators.required]]
    })
  }

  public get controls() {
    return this.restauranteForm.controls;
  }

  public createRestaurante(restaurante: Restaurante) {
    this.loading = true;
    this.restauranteService
      .createRestaurante(restaurante)
      .subscribe((data) => {
        this.notificationService.success(`Restaurante ${restaurante.nome} criado com sucesso!`);
        this.voltar();
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.notificationService.error(`Error ao criar restaurante ${restaurante.nome}!`);
        })
  }

  public voltar() {
    this.location.back();
  }

}