import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { Restaurante } from 'src/app/interfaces/restaurante.model';
import { RestauranteService } from 'src/app/services/restaurante/restaurante.service';

@Component({
  selector: 'app-restaurante-edit',
  templateUrl: './restaurante-edit.component.html',
  styleUrls: ['./restaurante-edit.component.css']
})
export class RestauranteEditComponent implements OnInit {

  public loading: boolean = false;

  public restauranteForm: FormGroup;

  constructor(
    private restauranteService: RestauranteService,
    private notificationService: PoNotificationService,
    private location: Location,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        let id: number = parseInt(paramMap.get('id'), 10);
        this.findById(id);
      })
    this.restauranteForm = this.fb.group({
      id: ['', []],
      nome: ['', [Validators.required]]
    })
  }

  public get controls() {
    return this.restauranteForm.controls;
  }

  private findById(id: number) {
    this.loading = true;
    this.restauranteService
      .findById(id)
      .subscribe((data) => {
        let form = Object.assign({}, data);
        this.restauranteForm.setValue(form);
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.notificationService.error(`Restaurante com o id ${id} não encontrado!`);
          this.voltar();
        })
  }

  public alterRestaurante(restaurante: Restaurante) {
    this.loading = true;
    this.restauranteService
      .alterRestaurante(restaurante)
      .subscribe((data) => {
        this.notificationService.success(`Restaurante ${restaurante.nome} alterado com sucesso!`);
        this.voltar();
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.notificationService.error(`Error ao salvar restaurante ${restaurante.nome}!`);
        })
  }

  public voltar() {
    this.location.back();
  }

}