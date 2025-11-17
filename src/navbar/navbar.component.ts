import { Component, ChangeDetectionStrategy, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent implements OnInit {
  isDarkMode = signal(false);

  ngOnInit(): void {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.isDarkMode.set(true);
      document.documentElement.classList.add('dark');
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const newColorScheme = e.matches ? "dark" : "light";
        if (newColorScheme === 'dark') {
            this.isDarkMode.set(true);
            document.documentElement.classList.add('dark');
        } else {
            this.isDarkMode.set(false);
            document.documentElement.classList.remove('dark');
        }
    });
  }

  toggleTheme(): void {
    this.isDarkMode.update(value => !value);
    document.documentElement.classList.toggle('dark');
  }
}
