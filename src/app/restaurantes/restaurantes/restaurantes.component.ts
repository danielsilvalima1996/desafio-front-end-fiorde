import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService, PoTableColumn } from '@po-ui/ng-components';
import { Restaurante } from 'src/app/interfaces/restaurante.model';
import { RestauranteService } from 'src/app/services/restaurante/restaurante.service';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css']
})
export class RestaurantesComponent implements OnInit {

  public table = {
    columns: <Array<PoTableColumn>>[
      {
        label: ' ', width: '5%', type: 'icon', icons: [
          { icon: 'po-icon po-icon-close', tooltip: 'Excluir', color: 'color-07', action: this.excluirItem.bind(this) },
        ]
      },
      {
        label: ' ', width: '5%', type: 'icon', icons: [
          { icon: 'po-icon po-icon-edit', tooltip: 'Editar', color: 'color-11', action: this.editarItem.bind(this) }
        ]
      },
      { label: 'Restaurantes', width: '90%', property: 'nome' }
    ],
    items: []
  }

  public loading: boolean = false;

  public restauranteForm: FormGroup;

  constructor(
    private restauranteService: RestauranteService,
    private notificationService: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.findByNome('');
    this.restauranteForm = this.fb.group({
      nome: ['', []]
    })
  }

  public get controls() {
    return this.restauranteForm.controls;
  }

  private excluirItem(item: Restaurante) {
    this.loading = true;
    this.restauranteService
      .deleteRestauranteById(item.id)
      .subscribe((data) => {
        this.notificationService.success(`Restaurante ${item.nome} excluído com sucesso!`);
        this.findByNome('');
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.notificationService.error(`Error ao excluir restaurante ${item.nome}`);
        })
  }

  private editarItem(item: Restaurante) {
    this.loading = true;
    this.router.navigate(['edit', item.id], { relativeTo: this.route });
  }

  public findByNome(nome?: string) {
    this.loading = true;
    this.restauranteService
      .findAll(nome)
      .subscribe((data) => {
        this.table.items = data;
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.table.items = [];
          this.notificationService.error(`Resultado não encontrado!`);
        })
  }

  public adicionarRestaurante() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

}
