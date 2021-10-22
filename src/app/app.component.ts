import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { trigger, style, transition, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.5s', style({ opacity: 1 }))
          ])
        ], {optional: true})

      ])
    ])
  ]
})

export class AppComponent {
  private _url : string = "https://reqres.in/api/users?";
  public users: User[] = [];
  public totalPages: number = 0;
  public items: number[] = [];
  public currentPage: number = 1;

  constructor(private http: HttpClient) {}

  getUsers(page_number: string):Observable<any> {
    return this.http.get<any>(this._url + page_number);
  }

  ngOnInit() {
    this.getUsers("page=1").subscribe(data => {
      this.totalPages = data.total_pages;
      this.items =  Array(this.totalPages).fill(1).map((x , i) => i + 1);
      this.users = data.data;
    }); 
  }

  pageSelected(page_number: number) {
    if (page_number != this.currentPage) {
      this.users = [];
      this.currentPage = page_number;
      this.getUsers("page=" + page_number).subscribe(data => {
        this.users = data.data;
      });
    }
  }


}
