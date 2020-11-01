import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { Prato } from 'src/app/interfaces/prato.model';
import { PratoService } from 'src/app/services/prato/prato.service';
import { RestauranteService } from 'src/app/services/restaurante/restaurante.service';

@Component({
  selector: 'app-prato-add',
  templateUrl: './prato-add.component.html',
  styleUrls: ['./prato-add.component.css']
})
export class PratoAddComponent implements OnInit {

  public loading: boolean = false;

  public pratoForm: FormGroup;

  public listaRestaurantes: Array<PoSelectOption> = [];

  constructor(
    private pratoService: PratoService,
    private notificationService: PoNotificationService,
    private location: Location,
    private fb: FormBuilder,
    private restauranteService: RestauranteService
  ) { }

  ngOnInit(): void {
    this.pratoForm = this.fb.group({
      prato: ['', [Validators.required]],
      preco: ['', [Validators.required]],
      idRestaurante: ['', [Validators.required]]
    })
    this.findAllRestaurante();
  }

  public get controls() {
    return this.pratoForm.controls;
  }

  private findAllRestaurante() {
    this.restauranteService
      .findAllList()
      .subscribe((data) => {
        this.listaRestaurantes = data.map((item) => {
          return <PoSelectOption>{ label: item.nome, value: item.id };
        })
      },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.notificationService.error(`Error ao obter lista de Restaurantes!`);
        })
  }

  public createPrato(prato) {
    this.loading = true;
    let pratoEnvio: Prato = {
      prato: prato.prato,
      preco: prato.preco,
      idRestaurante: {
        id: prato.idRestaurante
      }
    }
    this.pratoService
      .createPrato(pratoEnvio)
      .subscribe((data) => {
        this.notificationService.success(`Prato ${pratoEnvio.prato} criado com sucesso!`);
        this.voltar();
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.notificationService.error(`Error ao criar restaurante ${pratoEnvio.prato}!`);
        })
  }

  public voltar() {
    this.location.back();
  }

}