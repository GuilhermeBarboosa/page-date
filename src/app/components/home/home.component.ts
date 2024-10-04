import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
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
import { UtilsService } from '../../services/utils.service';
import { EmojiComponent } from '../../shared/emoji/emoji.component';

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
    EmojiComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private toast: NotifierService,
    private utils: UtilsService
  ) {}

  @ViewChild(EmojiComponent) emojiComponent!: EmojiComponent;

  currentFormIndex: number = 1;
  formulario!: FormGroup;
  formattedDate: string = '';
  formattedTime: string = '';
  currentFontSize = 30;
  showMessage: boolean = false;
  numeroTelefone = '';

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      local: ['', [Validators.required, Validators.minLength(3)]],
      data: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      argumento: [''],
      observacao: [''],
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
    const { local, data, hora, numero, argumento, observacao } =
      this.formulario.value;

    this.formatDateTime(data);

    if (this.formulario.invalid) {
      this.utils.showInvalidFields(this.formulario);
      return;
    }

    if (!this.numeroTelefone || this.numeroTelefone == '') {
      this.toast.showError(
        'Selecione um número de telefone para enviar a mensagem!'
      );
      return;
    }

    let messageWhatsapp = `Olá, meu amor! Gostaria de agendar no dia *${this.formattedDate}* às *${hora}* um encontro no local *${local}*.`;

    if (argumento) {
      messageWhatsapp += ` Com o seguinte argumento: *${argumento}*.`;
    }

    if (observacao) {
      messageWhatsapp += ` Observação: *${observacao}*.`;
    }

    const encodedMessage = encodeURIComponent(messageWhatsapp);

    const whatsappLink = `https://wa.me/${this.numeroTelefone}?text=${encodedMessage}`;

    window.open(whatsappLink);
  }

  openDialog() {
    this.toast.showInfo('Você descobriu um segredo!');
    this.emojiComponent.launchEmojis();

    this.dialog.open(DialogComponent, {
      width: 'auto',
    });
  }

  openDialogCheat() {
    this.toast.showInfo('Aqui possui vários segredos!');
    this.emojiComponent.launchEmojis();

    this.dialog.open(DialogCheatsComponent, {
      width: '300px',
    });
  }

  changeSize(icon: HTMLElement) {
    if (this.currentFontSize >= 60) {
      if (!this.showMessage) {
        this.toast.showInfo('Você descobriu um segredo!');
      }

      this.emojiComponent.launchEmojis();

      this.showMessage = true;
    }

    if (this.currentFontSize < 60) {
      icon.classList.add('pulse');
      setTimeout(() => {
        icon.classList.remove('pulse');
        this.currentFontSize += 1;
        icon.style.fontSize = `${this.currentFontSize}px`;
      }, 500);
    }
  }

  formatDateTime(datetime: string): void {
    const [date, time] = datetime.split('T');

    const [year, month, day] = date.split('-');
    this.formattedDate = `${day}/${month}/${year}`;
  }

  selectButton(div: any) {
    let buttons = document.querySelectorAll('.button-numbers');

    buttons.forEach((button: any) => {
      button.classList.remove('button-select');
      button.style.color = 'black';
    });

    div.classList.add('button-select');
    div.style.color = 'white';

    if (div.id == 'gui') {
      this.numeroTelefone = '5534984039344';
    } else if (div.id == 'le') {
      this.numeroTelefone = '5534999235184';
    }
  }
}
