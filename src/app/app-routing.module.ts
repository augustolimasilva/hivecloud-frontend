import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent} from '../crud/cadastro/cadastro.component';
import { ManutencaoComponent} from '../principal/manutencao/manutencao.component';

const routes: Routes = [
  {path : 'cadastro', component : CadastroComponent},
  {path: '', component : ManutencaoComponent},
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
