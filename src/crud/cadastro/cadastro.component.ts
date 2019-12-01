import { Component, OnInit } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { ViaCepService } from '../../service/viacep.service';
import { TransportadoraService } from '../../service/transportadora.service';

import { Endereco } from 'src/model/endereco';
import { Transportadora} from 'src/model/Transportadora';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})

export class CadastroComponent implements OnInit {

  cepMascara = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  telefoneMascara = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  celularMascara = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cnpjMascara = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  transportadora: Transportadora = new Transportadora();
  buscaEndereco: Endereco = new Endereco();

  ngOnInit() {}

  constructor(
    private toastr: ToastrService,
    private viaCepService: ViaCepService,
    private transportadoraService: TransportadoraService
  ) { }

  pesquisaCep(cep: string) {
    this.formataCep();

    if (this.validaCep(this.transportadora.cep)) {
      this.viaCepService.getEndereco(this.transportadora.cep)
        .subscribe(
          endereco => {
            if (endereco.erro === true) {
              this.buscaEndereco = undefined;
              this.toastr.warning('Cep não encontrado', 'Erro');
            } else {
              this.buscaEndereco = endereco;
              this.transportadora.rua = this.buscaEndereco.logradouro;
              this.transportadora.uf = this.buscaEndereco.uf;
              this.transportadora.cidade = this.buscaEndereco.localidade;
              this.transportadora.bairro = this.buscaEndereco.bairro;
            }
          },
          error => {
            this.toastr.error('Error: ${error.message}.', 'Erro');
            this.buscaEndereco = undefined;
          }
        );
    } else {
      this.toastr.error('Insira um cep válido.', 'Erro');
      this.buscaEndereco = undefined;
    }
  }

  validaCep(cep: string): boolean {
    if (cep.length === 8) {
      return true;
    }
    return false;
  }

  salvarTransportadora() {
    this.formataCep();
    this.formataNumeros();
    if (this.validaCampos()) {
      console.log(this.transportadora);
      this.transportadoraService.inserirTransportadora(this.transportadora)
      .subscribe(
        data => {
          if (data.id === null) {
            console.log(data.id);
            this.toastr.warning('Transportadora não cadastrada. Tente novamente.', 'Erro');
          } else {
            console.log('sucesso');
            this.toastr.success('Transportadora cadastrada.', 'Sucesso');
            this.transportadora = new Transportadora();
            this.buscaEndereco = new Endereco();
          }
        },
        error => {
          this.toastr.error(error.error.errorMessage, 'Erro');
        }
      );
    }
  }

  formataNumeros() {
    this.transportadora.telefone = this.transportadora.telefone.replace('-', '');
    this.transportadora.telefone = this.transportadora.telefone.replace('(', '');
    this.transportadora.telefone = this.transportadora.telefone.replace(')', '');
    this.transportadora.celular = this.transportadora.celular.replace('-', '');
    this.transportadora.celular = this.transportadora.celular.replace('(', '');
    this.transportadora.celular = this.transportadora.celular.replace(')', '');
    this.transportadora.whatsapp = this.transportadora.whatsapp.replace('-', '');
    this.transportadora.whatsapp = this.transportadora.whatsapp.replace('(', '');
    this.transportadora.whatsapp = this.transportadora.whatsapp.replace(')', '');
    this.transportadora.empresa = this.transportadora.empresa.replace('/', '');
    this.transportadora.empresa = this.transportadora.empresa.replace('-', '');
    this.transportadora.empresa = this.transportadora.empresa.replace('.', '');
  }

  formataCep() {
    this.transportadora.cep = this.transportadora.cep.replace('-', '');
  }

  validaCampos(): boolean {
    let isDone = false;
    if (this.transportadora.empresa.length < 4) {
      isDone = false;
      this.toastr.error('O nome da empresa não pode ter menos que 4 caracteres.', 'Erro');
    } else {
      isDone = true;
    }

    const element = document.getElementById('snAceitouTermos') as HTMLInputElement;
    if (element.checked) {
      this.transportadora.snAceitouTermos = 'S';
      isDone = true;
    } else {
      isDone = false;
      this.toastr.error('É necessário aceitar os termos, para salvar.', 'Erro');
    }

    return isDone;
  }
}
