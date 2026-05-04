import { Component, inject } from "@angular/core";
import { ZardCardComponent } from "@/shared/components/card";
import { MODAL_DATA } from "@/shared/components/modal/modal.tokens";
import { GetItemDto } from "../../dto/itens.dto";
import { CommonModule } from "@angular/common";
import { ModalService } from "@/shared/components/modal";
import { ExcluirItensComponent } from "../excluir-item/excluir-item.component";
import { EditarItemComponent } from "../editar-item/editar-item.component";
import { ZardButtonComponent } from "@/shared/components/button";
import { MatIconModule } from "@angular/material/icon";

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

  FecharDetalhe(){
    this.modalService.close();
  }
}
