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
import { SearchComponentComponent } from './search-component/search-component.component';
import { FormsModule } from '@angular/forms';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { ProfileViewerComponent } from './profile-viewer/profile-viewer.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { LogoutComponent } from './logout/logout.component';
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
  {path : 'logout', component: LogoutComponent},
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: ShowPostsComponent },
      { path: 'posts', component: PostsComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'mynetwork', component: MyNetworkComponent },
      { path: 'show-posts', component: ShowPostsComponent },
      {path : 'profile', component: ProfileViewerComponent},
      {path : 'update-profile', component: UpdateProfileComponent},
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
    ShowPostsComponent,
    SearchComponentComponent,
    MenuBarComponent,
    ProfileViewerComponent,
    UpdateProfileComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    FormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
