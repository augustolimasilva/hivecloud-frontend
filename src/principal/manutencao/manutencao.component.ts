import { Component, OnInit, OnDestroy } from '@angular/core';
import { TransportadoraService } from '../../service/transportadora.service';

import { Transportadora } from '../../model/transportadora';

@Component({
  selector: 'app-manutencao',
  templateUrl: './manutencao.component.html',
  styleUrls: ['./manutencao.component.css']
})
export class ManutencaoComponent implements OnInit {

  transportadoras: Transportadora[];
  transportadorasOriginal: Transportadora[];

  telefoneMascara = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(
    private transportadoraService: TransportadoraService
  ) {}

  ngOnInit() {
    this.carregaTransportadora();
  }

  carregaTransportadora() {
    this.transportadoraService.listarTransportadoras().subscribe(
      data => {
        this.transportadoras = data;
        this.transportadorasOriginal = data;
      }
    );
  }

  onSearch(value) {
    if (value && value.length >= 1) {
      this.transportadoras = this.transportadoras.filter(t => {
        return t.nome.toUpperCase().includes(value.toUpperCase());
      });
    } else {
      this.transportadoras = this.transportadorasOriginal;
    }
  }
}
