import { CategoryDetail } from 'src/app/shared/category-detail.model';
import { HttpClient } from '@angular/common/http';
import { ItemDetail } from './item-detail.model';
import { Injectable } from '@angular/core';


const All_ARTICLES: ItemDetail[] = [
  {ItemID: 1, ItemName: 'Angular 2 Tutorial', ItemDescription: 'Angular'},
  {ItemID: 2, ItemName: 'Angular 6 Tutorial', ItemDescription: 'Angular'},
  {ItemID: 3, ItemName: 'Spring MVC tutorial', ItemDescription: 'Spring'},
  {ItemID: 4, ItemName: 'Spring Boot tutorial', ItemDescription: 'Spring'},
  {ItemID: 5, ItemName: 'FreeMarker Tutorial', ItemDescription: 'FreeMarker'},
  {ItemID: 6, ItemName: 'Thymeleaf Tutorial', ItemDescription: 'Thymeleaf'},
  {ItemID: 7, ItemName: 'Java 8 Tutorial', ItemDescription: 'Java'},
  {ItemID: 8, ItemName: 'Java 9 Tutorial', ItemDescription: 'Java'},
  {ItemID: 9, ItemName: 'Java 9 Tutorial', ItemDescription: 'Java'},
  {ItemID: 10, ItemName: 'Java 9 Tutorial', ItemDescription: 'Java'},
  {ItemID: 11, ItemName: 'Java 9 Tutorial', ItemDescription: 'Java'},
  {ItemID: 12, ItemName: 'Java 9 Tutorial', ItemDescription: 'Java'},
  {ItemID: 13, ItemName: 'Java 9 Tutorial', ItemDescription: 'Java'},
  {ItemID: 14, ItemName: 'Java 9 Tutorial', ItemDescription: 'Java'}
];

@Injectable({
  providedIn: 'root'
})
export class ItemDetailService {
  formData: ItemDetail;
  readonly rootURL = 'http://localhost:61263/api';
  list: ItemDetail[];
  categoriesList: CategoryDetail[];

  constructor(
    private http: HttpClient
  ) { }

  getItemById(id){
    return this.http.get(this.rootURL+'/Items/'+id).toPromise();
  }

  getItemByCategory(name : string){
    return this.http.get(this.rootURL+'/Items/category/'+name).toPromise().then(res => this.list = res as ItemDetail[]);
  }

  getItemList(){
    return this.http.get(this.rootURL+'/Items').toPromise();
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

  refreshList(){
    this.http.get(this.rootURL + '/Items').toPromise().then(res => this.list = res as ItemDetail[])
  }

  refreshCategories(){
    this.http.get(this.rootURL + '/Categories').toPromise().then(res => this.categoriesList = res as CategoryDetail[]);
  }

  getItemByName(name: string){
    this.http.get(this.rootURL+'Items/details/'+name).toPromise().then(res => this.list = res as ItemDetail[])
  }

  getAllArticles() {
    return All_ARTICLES;
}



}
