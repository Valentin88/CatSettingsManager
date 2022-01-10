import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cat-settings',
  templateUrl: './cat-settings.component.html',
  styleUrls: ['./cat-settings.component.css']
})
export class CatSettingsComponent implements OnInit {
  public result: Result;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  ngOnInit() {
    this.http.get<Result>(this.baseUrl + 'api/Cat/1').subscribe(result => {
      this.result = result;
    }, error => console.error(error));
  }
}

interface Result {
  id: number;
  name: string;
  dateOfBirth: Date;
  tailLength: number;
  spotsCount: number;
  hairColor: string;
  eyesColor: string;
  breed: string;       
}



