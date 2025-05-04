import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { VideoAulasComponent } from './components/video-aulas/video-aulas.component';
import { LivrosComponent } from './components/livros/livros.component';
import { NoticiasComponent } from './components/noticias/noticias.component';
import { NoticiaDetailComponent } from './components/noticia-detail/noticia-detail.component';
import { MulheresNaCienciaComponent } from './components/mulheres-na-ciencia/mulheres-na-ciencia.component';

export const routes: Routes = [
    {path:'', redirectTo:'/home', pathMatch:'full'},
    {path: 'home', component:HomeComponent},
    {path: 'header', component:HeaderComponent},
    {path: 'footer', component:FooterComponent},
    {path: 'sobre', component:SobreComponent},
    {path: 'video-aulas', component:VideoAulasComponent},
    {path: 'livros', component:LivrosComponent},
    {path: 'contacto', component:ContactoComponent},
    {path: 'mulheres-na-ciencia', component:MulheresNaCienciaComponent},
    {path: 'noticias', component:NoticiasComponent},
    {path: 'noticias/:id', component:NoticiaDetailComponent}
    
];
