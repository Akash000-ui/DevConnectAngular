import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule , Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PostsComponent } from './posts/posts.component';
import { HomeComponent } from './home/home.component';
import { MyNetworkComponent } from './my-network/my-network.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ShowPostsComponent } from './show-posts/show-posts.component';

// const routes: Routes = [
//   { path: '', redirectTo: 'register', pathMatch: 'full' },
//   { path: 'register', component: RegisterComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'posts', component: PostsComponent },
//   { path: 'home', component: HomeComponent },
//   { path: 'mynetwork', component: MyNetworkComponent },
//   { path: 'notifications', component: NotificationsComponent },
//   { path: 'home/posts', component: PostsComponent },
//   { path: 'home/mynetwork', component: MyNetworkComponent },
//   { path: 'home/notifications', component: NotificationsComponent },
// ];


const routes: Routes = [
  { path: '', redirectTo: 'register', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: ShowPostsComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'mynetwork', component: MyNetworkComponent },
      { path: 'show-posts', component: ShowPostsComponent }
    ]
  }
];


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    PostsComponent,
    HomeComponent,
    MyNetworkComponent,
    NotificationsComponent,
    ShowPostsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
