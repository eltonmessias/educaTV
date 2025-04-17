import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SobreComponent } from './components/sobre/sobre.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { VideoAulasComponent } from './components/video-aulas/video-aulas.component';
import { LivrosComponent } from './components/livros/livros.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogDetailComponent } from './components/blog-detail/blog-detail.component';

export const routes: Routes = [
    {path:'', redirectTo:'/home', pathMatch:'full'},
    {path: 'home', component:HomeComponent},
    {path: 'header', component:HeaderComponent},
    {path: 'footer', component:FooterComponent},
    {path: 'sobre', component:SobreComponent},
    {path: 'video-aulas', component:VideoAulasComponent},
    {path: 'livros', component:LivrosComponent},
    {path: 'contacto', component:ContactoComponent},
    {path: 'blog', component:BlogComponent},
    {path: 'blog/:id', component:BlogDetailComponent}
    
];
