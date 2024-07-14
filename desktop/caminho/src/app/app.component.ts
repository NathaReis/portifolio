import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  ngOnInit() {
    // Bloqueio do refresh das telas
    /*
    window.addEventListener('beforeunload', function (e) {
      e.preventDefault();
      e.returnValue = ''; // Alguns navegadores exigem que seja definido um valor para `e.returnValue`
    });
    */
    document.addEventListener('keydown', function (e) {
      // Bloqueia F5 e Ctrl+R
      if ((e.key === 'F5' || (e.key === 'r' && e.ctrlKey))) {
          e.preventDefault();
      }
    });  
  }
}
