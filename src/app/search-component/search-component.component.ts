import { Component } from '@angular/core';
import { debounceTime, forkJoin, Subject } from 'rxjs';
import { AngularToSpringServiceService } from '../angular-to-spring-service.service';
import { error } from 'console';

@Component({
  selector: 'app-search-component',
  standalone: false,
  templateUrl: './search-component.component.html',
  styleUrl: './search-component.component.css'
})
export class SearchComponentComponent {

  searchTerm: string = '';

  private searchSubject: Subject<string> = new Subject<string>();

   usersByName: any[] = [];
    usersBySkills: any[] = [];
    posts: any[] = [];

  constructor(private service : AngularToSpringServiceService) {

    this.searchSubject.pipe(debounceTime(300)).subscribe((term) => {
      this.performSearch(term);
    }
    );

   }

   performSearch(term: string) {
    
    forkJoin({
      usersByName : this.service.searchByName(term),
      posts : this.service.searchByPosts(term),
      usersBySkills : this.service.searchBySkill(term)
    }).subscribe((res) => {
      this.usersByName = res.usersByName;
      this.posts = res.posts;
      this.usersBySkills = res.usersBySkills;
      console.log("------------------Results-----------------");
      console.log("Results: ", res);
    },
    error => {
      console.log("Error in search: ", error);
    });
  }



  onSearch(){
    if(this.searchTerm.length <1) {
      this.usersByName = [];
      this.posts = [];
      this.usersBySkills = [];
      return;
    }
    this.searchSubject.next(this.searchTerm);
  }
}
