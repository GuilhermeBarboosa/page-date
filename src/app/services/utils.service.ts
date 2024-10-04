import { Injectable } from '@angular/core';
import { NotifierService } from './notifier.service';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private toast: NotifierService) {}

  formatarData(data: any) {
    const date = new Date(data);

    // Configura o fuso horário para o de Brasília
    const options = { timeZone: 'America/Sao_Paulo' };
    const dateBrasilia = new Date(date.toLocaleString('en-US', options));
    const day = dateBrasilia.getDate().toString().padStart(2, '0');
    const dayNext = dateBrasilia.getDate() + 1;
    const month = (dateBrasilia.getMonth() + 1).toString().padStart(2, '0');
    const year = dateBrasilia.getFullYear();
    const formatted = `${day}/${month}/${year}`;

    return formatted;
  }
  formatarDataToSQL(data: any) {
    data = data.split('/').reverse().join('/');
    data = new Date(data);
    return data;
  }

  formatarDataEdital(data: any) {
    data = data.split('T')[0].split('-').reverse().join('/');
    return data;
  }

  formatterString(string: string) {
    string = string.toLowerCase();
    string = string.replace(/(^\w{1})|(\s+\w{1})/g, (letra) =>
      letra.toUpperCase()
    );

    return string;
  }

  formatDateToISO(date: Date): string {
    const d = new Date(date);
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
  }
  
  private generateRandomWord(): string {
    const randomWordLength = 10;
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomWord = '';
    for (let i = 0; i < randomWordLength; i++) {
      randomWord += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return randomWord;
  }

  generateColors() {
    var o = Math.round,
      r = Math.random,
      s = 255;

    var blue = o(r() * s);
    var green = o(r() * 5);
    var red = o(r() * 5);

    return 'rgba(' + red + ',' + green + ',' + blue + ',' + 0.75 + ')';
  }

  generateColorsRandom() {
    var r = Math.floor(Math.random() * 256); // Valor de vermelho entre 0 e 255
    var g = Math.floor(Math.random() * 256); // Valor de verde entre 0 e 255
    var b = Math.floor(Math.random() * 256); // Valor de azul entre 0 e 255

    return 'rgba(' + r + ',' + g + ',' + b + ',' + 0.75 + ')';
  }

  showInvalidFields(form: any) {
    const invalidFields = [];
    const validFields = [];
    const controls = form.controls;
    for (const name in controls) {
      if (
        controls[name].invalid ||
        // controls[name].touched ||
        controls[name].errors?.['required']
      ) {
        invalidFields.push(name);
      } else {
        validFields.push(name);
      }
    }
    if (invalidFields.length > 0) {
      this.toast.showError(
        invalidFields.length > 1 ? 'Campos inválidos' : 'Campo inválido'
      );
      console.log('Campos inválidos: ' + invalidFields.join(', '));
      this.highlightInvalidFields(invalidFields, validFields);
    } else {
      console.log('Todos os campos estão válidos');
    }
  }

  private highlightInvalidFields(
    invalidFields: string[],
    validFields: string[]
  ) {
    invalidFields.forEach((field) => {
      const inputElement = document.querySelector(
        `[formControlName="${field}"]`
      );
      const errorElement = document.getElementById(`${field}-message-error`);

      if (inputElement) {
        inputElement.classList.add('invalid-field');
      }

      if (errorElement) {
        errorElement.style.display = 'block';
      }
    });

    validFields.forEach((field) => {
      const inputElement = document.querySelector(
        `[formControlName="${field}"]`
      );
      const errorElement = document.getElementById(`${field}-message-error`);

      if (inputElement) {
        inputElement.classList.remove('invalid-field');
      }

      if (errorElement) {
        errorElement.style.display = 'none';
      }
    });
  }

  ocultarCpf(cpf: string): string {
    if (!cpf || cpf.length !== 14) {
      throw new Error('CPF inválido. O formato correto é XXX.XXX.XXX-XX');
    }

    const cpfMascarado = `${cpf.substring(0, 3)}.***.***-${cpf.substring(12)}`;

    return cpfMascarado;
  }
}
