import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }



  getAll(id:any):Observable<any>{
    // return this.http.get("http://178.18.241.223:8080/getReclamationAdminForValidation/"+referenceTitrePerception); 
    return this.http.get('http://127.0.0.1:8000/api/home/'+id);
    // return this.http.get('http://127.0.0.1:8000/api/home');
  }
  getByNif(nif:string):Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/hom/'+nif);
  }
  getHomeReclamation(id:any):Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/hom/'+id);
  }
  getAlldata(){
    return this.http.get('http://127.0.0.1:8000/api/home');
  }
  getAllReclamationDetails(id:any):Observable<any>
  {
    return this.http.get('http://127.0.0.1:8000/api/ver/'+id);
  }
  getBooks():Observable<any>
  {
    return this.http.get('http://127.0.0.1:8000/api/books');
  }
  get_all_data_from_api():Observable<any>
  {
    return this.http.get('http://178.18.241.223:8080/ms_reclamation/api/getAllReclamation')
  }
}
