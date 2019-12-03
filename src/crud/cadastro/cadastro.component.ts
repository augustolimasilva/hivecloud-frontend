import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ViaCepService } from '../../service/viacep.service';
import { TransportadoraService } from '../../service/transportadora.service';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';

import { Endereco } from 'src/model/endereco';
import { Transportadora} from 'src/model/Transportadora';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  providers: [MessageService]
})

export class CadastroComponent implements OnInit, OnDestroy {

  cepMascara = [/[0-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  telefoneMascara = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  celularMascara = ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  cnpjMascara = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/];

  sub;
  id;
  msgs: Message[] = [];

  transportadora: Transportadora = new Transportadora();
  buscaEndereco: Endereco = new Endereco();

  ngOnInit() {
    this.sub = this.activatedRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      if (this.id) {
        this.transportadoraService.pesquisarPorId(this.id).subscribe(
          data => {
            this.transportadora = data;
          }
        );
      }
   });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  constructor(
    private toastr: ToastrService,
    private viaCepService: ViaCepService,
    private transportadoraService: TransportadoraService,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private router: Router,
    private messageService: MessageService
  ) { }

  pesquisaCep(cep: string) {
    this.formataCep();

    if (this.validaCep(this.transportadora.cep)) {
      this.viaCepService.getEndereco(this.transportadora.cep)
        .subscribe(
          endereco => {
            if (endereco.erro === true) {
              this.buscaEndereco = undefined;
              alert('Cep não encontrado.');
            } else {
              this.buscaEndereco = endereco;
              this.transportadora.rua = this.buscaEndereco.logradouro;
              this.transportadora.uf = this.buscaEndereco.uf;
              this.transportadora.cidade = this.buscaEndereco.localidade;
              this.transportadora.bairro = this.buscaEndereco.bairro;
            }
          },
          error => {
            alert(error.message);
            this.buscaEndereco = undefined;
          }
        );
    } else {
      alert('Insira um cep válido.');
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
            alert('Transportadora não cadastrada. Tente novamente.');
          } else {
            alert('Transportadora cadastrada.');
            this.transportadora = new Transportadora();
            this.buscaEndereco = new Endereco();
          }
        },
        error => {
          alert(error.error.errorMessage);
        }
      );
    }
  }

  formataNumeros() {
    this.transportadora.telefone = this.transportadora.telefone.replace(/[^\d]+/g, '');
    this.transportadora.celular = this.transportadora.celular.replace(/[^\d]+/g, '');
    this.transportadora.whatsapp = this.transportadora.whatsapp.replace(/[^\d]+/g, '');
    this.transportadora.empresa = this.transportadora.empresa.replace(/[^\d]+/g, '');
  }

  formataCep() {
    this.transportadora.cep = this.transportadora.cep.replace('-', '');
  }

  validaCampos(): boolean {
    let isDone = false;
    if (this.transportadora.empresa.length < 4) {
      isDone = false;
      alert('O nome da empresa não pode ter menos que 4 caracteres.');
    } else {
      isDone = true;
    }

    if (this.transportadora.id == null) {
      const element = document.getElementById('snAceitouTermos') as HTMLInputElement;
      if (element.checked) {
        this.transportadora.snAceitouTermos = 'S';
        isDone = true;
      } else {
        isDone = false;
        alert('É necessário aceitar os termos, para salvar.');
      }
    }

    return isDone;
  }

  atualizarTransportadora(id: number) {
    this.formataCep();
    this.formataNumeros();
    if (this.validaCampos()) {
      this.transportadoraService.alterarTransportadora(this.transportadora, id)
      .subscribe(
        data => {
          if (data.id != null) {
            alert('Transportadora alterada.');
          }
        },
        error => {
          this.messageService.add({ severity: 'success', summary: 'Service Message', detail: 'Via MessageService' });
          alert(error.error.errorMessage);
        }
      );
    }
  }

  confirm1() {
    this.confirmationService.confirm({
        message: 'Deseja realmente excluir o Fornecedor?',
        header: 'Confirmação',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.excluirTransportadora();
        }
    });
  }

  excluirTransportadora() {
    this.transportadoraService.excluirPorId(this.transportadora.id)
    .subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/', '/']);
      }, error => {
        console.log(error);
        alert(error.error.errorMessage);
      }
    );
  }
}

