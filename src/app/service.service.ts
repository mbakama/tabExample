import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }



  getAll(id:string):Observable<any>{
    // return this.http.get("http://178.18.241.223:8080/getReclamationAdminForValidation/"+referenceTitrePerception); 
    return this.http.get('http://127.0.0.1:8000/api/home/'+id);
  }
  getByNif(nif:string):Observable<any>{
    return this.http.get('http://127.0.0.1:8000/api/hom/'+nif);
  }
}
