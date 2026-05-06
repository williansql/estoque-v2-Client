import { ZardButtonComponent } from "@/shared/components/button";
import { ZardCardComponent } from "@/shared/components/card";
import { ModalService } from "@/shared/components/modal";
import { MODAL_DATA } from "@/shared/components/modal/modal.tokens";
import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { GetItemDto } from "../../dto/itens.dto";
import { EditarItemComponent } from "../editar-item/editar-item.component";
import { ExcluirItensComponent } from "../excluir-item/excluir-item.component";


@Component({
  selector: 'app-detalhes-itens',
  templateUrl: './detalhes-item.html',
  standalone: true,
  imports: [ZardCardComponent, CommonModule, ZardButtonComponent, MatIconModule],
})
export class DetalhesItensComponent {
  public readonly itens = inject<GetItemDto>(MODAL_DATA);
  private readonly modalService = inject(ModalService);

  constructor() {
    console.log('Detalhes do item:', this.itens);
  }

  editarItem(item: GetItemDto) {
    this.modalService.open(EditarItemComponent, {
      width: 'min(95vw, 550px)',
      disableClose: true,
      data: item,
    });
  }

  excluirItem(item: GetItemDto) {
    this.modalService
      .open(ExcluirItensComponent, {
        width: 'min(95vw, 550px)',
        disableClose: true,
        data: item,
      })
      .subscribe(() => console.log('Item excluído: ', item));
  }

  FecharDetalhe() {
    this.modalService.close();
  }
}
