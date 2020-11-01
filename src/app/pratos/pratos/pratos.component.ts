import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService, PoTableColumn } from '@po-ui/ng-components';
import { Prato } from 'src/app/interfaces/prato.model';
import { PratoService } from 'src/app/services/prato/prato.service';
import { RestauranteService } from 'src/app/services/restaurante/restaurante.service';

@Component({
  selector: 'app-pratos',
  templateUrl: './pratos.component.html',
  styleUrls: ['./pratos.component.css']
})
export class PratosComponent implements OnInit {

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
      { label: 'Restaurante', width: '30%', property: 'restaurante' },
      { label: 'Prato', width: '30%', property: 'prato' },
      { label: 'Preço', width: '30%', property: 'preco', type: 'number', format: '1.2-2' }
    ],
    items: []
  }

  public loading: boolean = false;

  constructor(
    private pratoService: PratoService,
    private notificationService: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  private excluirItem(item: Prato) {
    this.loading = true;
    this.pratoService
      .deletePratoById(item.id)
      .subscribe((data) => {
        this.notificationService.success(`Prato ${item.prato} excluído com sucesso!`);
        this.findAll();
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.notificationService.error(`Error ao excluir prato ${item.prato}!`);
        })
  }

  private editarItem(item: Prato) {
    this.loading = true;
    this.router.navigate(['edit', item.id], { relativeTo: this.route });
  }

  public findAll() {
    this.loading = true;
    this.pratoService
      .findAll()
      .subscribe((data) => {
        this.table.items = data.map((item) => {
          return {
            id: item.id,
            restaurante: item.idRestaurante.nome,
            prato: item.prato,
            preco: item.preco
          }
        });
        this.loading = false;
      },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.table.items = [];
          this.notificationService.error(`Error ao obter pratos!`);
        })
  }

  public adicionarPrato() {
    this.router.navigate(['add'], { relativeTo: this.route });
  }

}
