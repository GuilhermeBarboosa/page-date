import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-emoji',
  standalone: true,
  imports: [],
  templateUrl: './emoji.component.html',
  styleUrl: './emoji.component.css',
})
export class EmojiComponent {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  launchEmojis() {
    const qtdEmoji = Math.random() * 80;
    for (let i = 0; i < qtdEmoji; i++) {
      this.createEmoji();
    }
  }

  createEmoji() {
    const emojiList = ['💘', '❤️', '💍', '💖', '🤍', '🔥'];
    const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];

    const emoji = this.renderer.createElement('span');
    const text = this.renderer.createText(randomEmoji);

    this.renderer.appendChild(emoji, text);
    this.renderer.appendChild(this.el.nativeElement, emoji);

    this.renderer.addClass(emoji, 'emoji');

    const randomXPosition = Math.random() * 100;
    this.renderer.setStyle(emoji, 'left', `${randomXPosition}vw`);

    const randomYPosition = Math.random() * -100;
    this.renderer.setStyle(emoji, 'bottom', `${randomYPosition}vh`);

    setTimeout(() => {
      this.renderer.removeChild(this.el.nativeElement, emoji);
    }, 4000);
  }
}
