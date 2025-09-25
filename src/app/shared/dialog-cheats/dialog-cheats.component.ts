import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonPrimaryComponent } from '../button-primary/button-primary.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface Quote {
  quote: string;
  author: string;
}

@Component({
  selector: 'app-dialog-cheats',
  standalone: true,
  imports: [
    ButtonPrimaryComponent,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './dialog-cheats.component.html',
  styleUrl: './dialog-cheats.component.css',
})
export class DialogCheatsComponent {
  formulario!: FormGroup;
  cheat: string = '';
  phrase: string = 'Eu te amo muito';
  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      cheat: ['', [Validators.required, Validators.minLength(3)]],
    });

    const hoje = new Date();
    const diaDoMes = hoje.getDate(); 
    if (diaDoMes == 12) {
      this.cheat = 'nosso dia';
    }
  }

  onSubmit() {
    this.cheat = this.formulario.value.cheat.toLowerCase();
    this.cheat = this.cheat.replace(/\s{2,}/g, ' ').trim();

    if (this.cheat == 'frase') {
      this.gerarFrase();
    }
  }

  gerarFrase() {
    this.http.get<Quote[]>('assets/quotes.json').subscribe({
      next: (quotes) => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const selected = quotes[randomIndex];
        this.phrase = selected.quote;
      },
      error: (err) => {
        console.error('Erro ao carregar frases:', err);
        this.phrase = 'Não foi possível carregar a frase.';
      },
    });
  }

  currentIndex = 0;
  images = [
    {
      img: './../../../assets/nossas-fotos/1.jpeg',
      description: 'Eu',
    },
    {
      img: './../../../assets/nossas-fotos/2.jpeg',
      description: 'Te',
    },
    {
      img: './../../../assets/nossas-fotos/3.jpeg',
      description: 'Amo',
    },
    {
      img: './../../../assets/nossas-fotos/4.jpeg',
      description: 'Muito',
    },
  ];

  goToNext() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  goToPrevious() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1;
    }
  }
}
