import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cat-edit',
  templateUrl: './cat-edit.component.html',
  styleUrls: ['./cat-edit.component.css']
})
export class CatEditComponent implements OnInit {
  title: string;
  form: FormGroup;
  id?: number;
  public cat: Cat;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(),
      breed: new FormControl(),
      tailLength: new FormControl(),
      spotsCount: new FormControl(),
      hairColor: new FormControl(),
      eyesColor: new FormControl()
    });
    this.loadData();
  }

  loadData() {
    this.id = + this.activatedRoute.snapshot.paramMap.get('id');

    console.log("This.id " + this.id);

    if (this.id) {
      var url = this.baseUrl + "api/Cat/" + this.id;

      this.http.get<Cat>(url).subscribe(result => {
        this.cat = result;
        this.title = "Редактировать - " + this.cat.name;
        this.form.patchValue(this.cat);
      }, error => console.error(error));
    }
    else {
      this.title = "Создайте нового кота";
    }
  }
  onSubmit() {

    var cat = (this.id) ? this.cat : <Cat>{};

    cat.name = this.form.get("name").value;
    cat.hairColor = this.form.get("hairColor").value;
    cat.eyesColor = this.form.get("eyesColor").value;
    cat.breed = this.form.get("breed").value;
    cat.tailLength = +this.form.get("tailLength").value;
    cat.spotsCount = +this.form.get("spotsCount").value;

    if (this.id) {
      // Режим редактирования

      var url = this.baseUrl + "api/Cat/" + this.cat.id;
      this.http
        .put<Cat>(url, cat)
        .subscribe(result => {

          console.log("Cat has been updated.");

          // Возврат на главную страницу
          this.router.navigate(['']);
        }, error => console.error(error));
    }
    else {
      // Добавление нового элемента
      cat.id = 1;

      console.log(cat);

      var url = this.baseUrl + "api/Cat/";
      this.http
        .post<Cat>(url, cat)
        .subscribe(result => {

          console.log("Cat  has been created.");

          // Вовзрат на главную страницу
          this.router.navigate(['']);
        }, error => console.error(error));
    }
  }
}

interface Cat {
  id: number;
  name: string;
  dateOfBirth: Date;
  tailLength: number;
  spotsCount: number;
  hairColor: string;
  eyesColor: string;
  breed: string;
}



