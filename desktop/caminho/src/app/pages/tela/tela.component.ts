import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tela',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './tela.component.html',
  styleUrl: './tela.component.css'
})
export class TelaComponent implements OnInit, OnDestroy{
  telaId: string = '';

  ngOnInit(): void {
    const telasStr = localStorage.getItem("telas");
    if(telasStr) {
      const id = this.idAleatorio(telasStr.split(','));
      const novaLista = telasStr + ',' + id;
      localStorage.setItem("telas",novaLista);
    }
    else {
      const id = this.idAleatorio();
      localStorage.setItem("telas", id);
      this.telaId = id;
    }
  }

  ngOnDestroy(): void {
    console.log('o');
  }
/*
  ngOnDestroy(): void {
    const telasStr = localStorage.getItem("telas");
    const umaTela = telasStr?.replace(",","") == telasStr;
    umaTela ? localStorage.removeItem("telas") : () => {
      const telasArr = telasStr?.split(',');
      let novaLista = '';
      telasArr?.filter(el => {
        el != this.telaId ? novaLista + el + ',' : null;
        return 
      });// Elimina o id da lista
      novaLista = novaLista.slice(0, -1);// Remove a última vírgula
      localStorage.setItem("telas", novaLista);
    }
  }
*/
  idAleatorio(ids?: String[]) {
      let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let plat_id = letters.charAt(Math.floor(Math.random() * letters.length)) + (Math.random() + 1).toString(36).substr(2, 9);
  
      if(ids) {
          for(let id of ids) {
              if(id == plat_id) {
                  plat_id = this.idAleatorio(ids);
                  break;
              }
          }
      }
  
      return plat_id;
  }
}
