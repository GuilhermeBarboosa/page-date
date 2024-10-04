import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { ButtonPrimaryComponent } from '../../shared/button-primary/button-primary.component';
import { DialogCheatsComponent } from '../../shared/dialog-cheats/dialog-cheats.component';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { NotifierService } from '../../services/notifier.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonPrimaryComponent,
    CommonModule,
    HeaderComponent,
    ReactiveFormsModule,
    MatDialogModule,
    DialogComponent,
    DialogCheatsComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toast: NotifierService
  ) {}

  currentFormIndex: number = 1;
  formulario!: FormGroup;
  formattedDate: string = '';
  formattedTime: string = '';
  currentFontSize = 30;
  showMessage: boolean = false;

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      local: ['sdasda', [Validators.required, Validators.minLength(3)]],
      data: ['', [Validators.required]],
      argumento: ['dasd', [Validators.required]],
      observacao: ['sadsada', [Validators.required]],
    });
  }

  nextForm(formNumber: number): void {
    this.currentFormIndex = formNumber + 1;
  }

  returnForm(formNumber: number) {
    this.currentFormIndex = formNumber - 1;
  }

  isCurrentForm(formNumber: number): boolean {
    return this.currentFormIndex === formNumber;
  }

  submitForm() {
    const { local, data, argumento, observacao } = this.formulario.value;

    // Formatar a data e a hora
    this.formatDateTime(data);

    // Mensagem formatada
    let messageWhatsapp = `Olá, gostaria de agendar no dia ${this.formattedDate} às ${this.formattedTime} um encontro no local ${local}.`;

    if (argumento) {
      messageWhatsapp += ` Com o seguinte argumento: ${argumento}.`;
    }

    if (observacao) {
      messageWhatsapp += ` Observação: ${observacao}.`;
    }

    // Codificar a mensagem para ser compatível com URL
    const encodedMessage = encodeURIComponent(messageWhatsapp);

    // Número de WhatsApp (com código do país +55 para Brasil)
    const whatsappNumber = '5534984039344';

    // Criar o link do WhatsApp com a mensagem
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Redirecionar para o link (abrir WhatsApp)
    window.open(whatsappLink, '_blank');
  }

  openDialog() {
    this.toast.showInfo('Você descobriu um segredo!');
    let dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
    });
  }

  openDialogCheat() {
    this.toast.showInfo('Aqui possui vários segredos!');
    let dialogRef = this.dialog.open(DialogCheatsComponent, {
      width: 'auto',
    });
  }

  changeSize(event: Event, icon: HTMLElement) {
    if (this.currentFontSize == 100) {
      this.toast.showInfo('Você descobriu um segredo!');
      this.showMessage = true;
    }

    if (this.currentFontSize < 100) {
      icon.classList.add('pulse');
      setTimeout(() => {
        icon.classList.remove('pulse');
        this.currentFontSize += 2;
        icon.style.fontSize = `${this.currentFontSize}px`;
      }, 500);
    }
  }

  formatDateTime(datetime: string): void {
    const [date, time] = datetime.split('T');

    const [year, month, day] = date.split('-');
    this.formattedDate = `${day}/${month}/${year}`;

    this.formattedTime = time;

    console.log('Data formatada:', this.formattedDate);
    console.log('Hora formatada:', this.formattedTime);
  }
}
