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
      }
    );
  }

}
