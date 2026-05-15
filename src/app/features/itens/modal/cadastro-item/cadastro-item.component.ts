import { ZardButtonComponent } from '@/shared/components/button';
import { ZardCardComponent } from '@/shared/components/card';
import { ZardFormFieldComponent, ZardFormLabelComponent, ZardFormControlComponent } from '@/shared/components/form';
import { ZardInputDirective } from '@/shared/components/input';
import { ModalService } from '@/shared/components/modal';
import { ZardSelectImports } from '@/shared/components/select';
import {
    Component,
    inject,
    ElementRef,
    OnInit,
    HostListener,
    ViewChild
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ItensService } from '../../itens.service';
import { toast } from 'ngx-sonner';
import { AuthService } from '@/core/auth/auth.service';
import { CreateItemDto } from '../../dto/itens.dto';
import { CategoriaService } from '@/features/categorias/categoria.service';
import { CategoriaModelData } from '@/features/categorias/model/categoria-model';

@Component({
    selector: 'app-cadastro-itens',
    standalone: true,
    imports: [
        ZardButtonComponent,
        ZardCardComponent,
        ZardFormFieldComponent,
        ZardInputDirective,
        ReactiveFormsModule,
        ZardSelectImports,
        ZardFormLabelComponent,
        ZardFormControlComponent
    ],
    templateUrl: './cadastro-item.html',
})
export class CadastroItensComponent implements OnInit {
    private readonly itensService = inject(ItensService);
    private readonly modalService = inject(ModalService);
    private readonly authService = inject(AuthService);
    private readonly categoriasService = inject(CategoriaService);

    private readonly fb = inject(FormBuilder);
    private readonly el = inject(ElementRef);

    @ViewChild('categoryContainer')
    categoryContainer!: ElementRef;

    dataUser: any;
    categories: CategoriaModelData[] = [];
    filteredCategories: CategoriaModelData[] = [];
    showCategories = false;

    itemForm = this.fb.group({
        barcode: [null],
        name: ['', Validators.required],
        branding: [''],
        description: ['', [Validators.required, Validators.maxLength(200)]],
        observations: [''],
        buyPrice: [0],
        unitMeasureEnum: ['', Validators.required],
        unitMeasureQtd: [0, [Validators.required, Validators.min(1)]],
        minQuantity: [0, [Validators.required, Validators.min(1)]],
        category: ['', Validators.required],
        typeItem: ['', Validators.required],
        perecivel: [false, Validators.required],
        catmat: [''],
    });

    ngOnInit() {
        const token = this.authService.getToken();
        if (token) {
            this.dataUser = this.authService.decodeToken();
            console.log(this.dataUser);
        }
        this.getCategory();
    }

    onClose() {
        this.modalService.close();
    }

    onSubmit() {
        if (this.itemForm.invalid) {
            this.itemForm.markAllAsTouched();
            setTimeout(() => {
                this.scrollToFirstInvalidControl();
            });
            toast.error('Por favor, preencha todos os campos obrigatórios.', this.itemForm.getError('name')?.message);
            return;
        }

        const payload: CreateItemDto = {
            ...this.itemForm.getRawValue(),
        };

        this.itensService.criarItem(payload).subscribe({
            next: () => {
                toast.success('Item cadastrado com sucesso!');
                this.modalService.close();
            },
            error: (error) => {
                toast.error('Erro ao cadastrar item!', error.error.message);
            },
        });
    }

    private scrollToFirstInvalidControl() {
        const firstInvalidControl: HTMLElement =
            this.el.nativeElement.querySelector('.ng-invalid:not(form)');

        if (firstInvalidControl) {
            firstInvalidControl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (
                firstInvalidControl.tagName === 'INPUT' ||
                firstInvalidControl.tagName === 'SELECT' ||
                firstInvalidControl.tagName === 'TEXTAREA'
            ) {
                firstInvalidControl.focus();
            }
        }
    }

    getCategory() {
        const data = {
            size: 999999,
            organogramId: this.dataUser.organogramId,
        }
        this.categoriasService.findAllCategorias(data).subscribe({
            next: (response: any) => {
                this.categories = response.data.content;
                console.log(this.categories);
            },
            error: (error) => {
                toast.error('Erro ao buscar categorias!', error.error.message);
            },
        });
    }

    onSearchCategory(event: Event) {
        const value = (event.target as HTMLInputElement).value.toLowerCase();

        if (!value) {
            this.filteredCategories = [...this.categories];
            this.showCategories = true;
            return;
        }

        this.filteredCategories = this.categories.filter(category =>
            category.name.toLowerCase().includes(value)
        );
        this.showCategories = true;
    }

    onFocusCategory() {
        this.filteredCategories = [...this.categories];
        this.showCategories = true;
    }

    @HostListener('document:mousedown', ['$event'])
    handleClickOutside(event: MouseEvent) {
        if (!this.categoryContainer) return;
        const clickedInside = this.categoryContainer.nativeElement.contains(event.target);
        if (!clickedInside) {
            this.showCategories = false;
        }
    }

    selectCategory(category: CategoriaModelData) {
        this.itemForm.patchValue({
            category: category.name
        });

        this.showCategories = false;
    }


}
