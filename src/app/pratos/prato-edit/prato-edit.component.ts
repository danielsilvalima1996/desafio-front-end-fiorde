import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PoNotificationService, PoSelectOption } from '@po-ui/ng-components';
import { Prato } from 'src/app/interfaces/prato.model';
import { PratoService } from 'src/app/services/prato/prato.service';
import { RestauranteService } from 'src/app/services/restaurante/restaurante.service';

@Component({
  selector: 'app-prato-edit',
  templateUrl: './prato-edit.component.html',
  styleUrls: ['./prato-edit.component.css']
})
export class PratoEditComponent implements OnInit {

  public loading: boolean = false;

  public pratoForm: FormGroup;

  public listaRestaurantes: Array<PoSelectOption> = [];

  constructor(
    private restauranteService: RestauranteService,
    private pratoService: PratoService,
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
      this.pratoForm = this.fb.group({
        id: ['', []],
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

  private findById(id: number) {
    this.loading = true;
    this.pratoService
      .findById(id)
      .subscribe((data) => {
        let form = {
          id: data.id,
          prato: data.prato,
          preco: data.preco,
          idRestaurante: data.idRestaurante.id
        }
        this.pratoForm.setValue(Object.assign({}, form));
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.notificationService.error(`Prato com o id ${id} não encontrado!`);
          this.voltar();
        })
  }

  public alterPrato(prato) {
    this.loading = true;
    let pratoEnvio: Prato = {
      id: prato.id,
      prato: prato.prato,
      preco: prato.preco,
      idRestaurante: {
        id: prato.idRestaurante
      }
    }
    this.pratoService
      .alterPrato(pratoEnvio)
      .subscribe((data) => {
        this.notificationService.success(`Prato ${prato.prato} alterado com sucesso!`);
        this.voltar();
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.notificationService.error(`Error ao salvar prato ${pratoEnvio.prato}!`);
        })
  }

  public voltar() {
    this.location.back();
  }

}