import { CategoryDetail } from 'src/app/shared/category-detail.model';
import { HttpClient } from '@angular/common/http';
import { ItemDetail } from './item-detail.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


/*const All_ARTICLES: ItemDetail[] = [
  {ItemID: 1, ItemName: 'Angular 2' , ItemDescription: 'Angular'},
  {ItemID: 2, ItemName: 'Angular 6 ', ItemDescription: 'Angular'},
  {ItemID: 3, ItemName: 'Spring MVC ', ItemDescription: 'Spring'},
  {ItemID: 4, ItemName: 'Spring Boot ', ItemDescription: 'Spring'},
  {ItemID: 5, ItemName: 'FreeMarker', ItemDescription: 'FreeMarker'},
  {ItemID: 6, ItemName: 'Thymeleaf', ItemDescription: 'Thymeleaf'},
  {ItemID: 7, ItemName: 'Java 8', ItemDescription: 'Java'},
  {ItemID: 8, ItemName: 'Java 9', ItemDescription: 'Java'},
  {ItemID: 9, ItemName: 'Java 9', ItemDescription: 'Java'},
  {ItemID: 10, ItemName: 'Java 9', ItemDescription: 'Java'},
  {ItemID: 11, ItemName: 'Java 9', ItemDescription: 'Java'},
  {ItemID: 12, ItemName: 'Java 9', ItemDescription: 'Java'},
  {ItemID: 13, ItemName: 'Java 9', ItemDescription: 'Java'},
  {ItemID: 14, ItemName: 'Java 9', ItemDescription: 'Java'},
  {ItemID: 15, ItemName: 'Java 9', ItemDescription: 'Java'},
  {ItemID: 16, ItemName: 'Java 9', ItemDescription: 'Java'},
  {ItemID: 17, ItemName: 'Java 9', ItemDescription: 'Java'},
  {ItemID: 18, ItemName: 'Java 9', ItemDescription: 'Java'}
];*/

@Injectable({
  providedIn: 'root'
})
export class ItemDetailService {
  formData: ItemDetail;
  readonly rootURL = 'http://localhost:61263/api';
  list: ItemDetail[];
  categoriesList: CategoryDetail[];

  constructor(private http: HttpClient) { }

  AllItems(): Observable<ItemDetail[]> {  
    return this.http.get<ItemDetail[]>(this.rootURL + 'api/Items')  
  }


  getItemById(id){
    return this.http.get(this.rootURL+'/Items/'+id).toPromise();
  }

  getItemByCategory(name : string){
    return this.http.get(this.rootURL+'/Items/category/'+name).toPromise().then(res => this.list = res as ItemDetail[]);
  }

  getItemList(): Promise<ItemDetail[]>{
    return this.http.get<ItemDetail[]>(this.rootURL+'/Items').toPromise();
   }

  postItemDetail(){
    return this.http.post(this.rootURL+ '/Items', this.formData)
  }

  putItemDetail(){
    return this.http.put(this.rootURL + '/Items/' + this.formData.ItemID,this.formData)
  }

  deleteItemDetail(id){
    return this.http.delete(this.rootURL + '/Items/' + id)
  }

 

  refreshCategories(){
    this.http.get(this.rootURL + '/Categories').toPromise().then(res => this.categoriesList = res as CategoryDetail[]);
  }

  getItemByName(name: string){
    this.http.get(this.rootURL+'Items/details/'+name).toPromise().then(res => this.list = res as ItemDetail[])
  }

  /*getAllArticles() {
    return All_ARTICLES;
  }*/

  refreshList(){
    this.http.get(this.rootURL + '/Items').toPromise().then(res => this.list = res as ItemDetail[])
  }



}
