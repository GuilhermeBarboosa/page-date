import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonPrimaryComponent } from '../button-primary/button-primary.component';

@Component({
  selector: 'app-dialog-cheats',
  standalone: true,
  imports: [ButtonPrimaryComponent, ReactiveFormsModule],
  templateUrl: './dialog-cheats.component.html',
  styleUrl: './dialog-cheats.component.css',
})
export class DialogCheatsComponent {
  formulario!: FormGroup;
  cheat: string = '';
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      cheat: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    this.cheat = this.formulario.value.cheat;
  }
}
