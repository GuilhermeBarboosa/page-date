import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import { provideToastr } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'page-date';
}
