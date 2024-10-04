import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonPrimaryComponent } from '../button-primary/button-primary.component';

@Component({
  selector: 'app-dialog-cheats',
  standalone: true,
  imports: [ButtonPrimaryComponent],
  templateUrl: './dialog-cheats.component.html',
  styleUrl: './dialog-cheats.component.css',
})
export class DialogCheatsComponent {
  formulario!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      cheat: ['sdasda', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    console.log(this.formulario.value);
  }
}
