import { Component } from '@angular/core';
import { ButtonPrimaryComponent } from '../../shared/button-primary/button-primary.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { DialogComponent } from '../../shared/dialog/dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogCheatsComponent } from '../../shared/dialog-cheats/dialog-cheats.component';
import { FooterComponent } from "../../shared/footer/footer.component";

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
    FooterComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {}

  currentFormIndex: number = 1;
  formulario!: FormGroup;
  formattedDate: string = '';
  formattedTime: string = '';
  currentFontSize = 30;

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

    this.formatDateTime(data);
  }

  openDialog() {
    console.log('teste');
    let dialogRef = this.dialog.open(DialogComponent, {
      width: 'auto',
    });
  }

  openDialogCheat() {
    console.log('teste');
    let dialogRef = this.dialog.open(DialogCheatsComponent, {
      width: 'auto',
    });
  }

  changeSize(event: Event, icon: HTMLElement) {
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
