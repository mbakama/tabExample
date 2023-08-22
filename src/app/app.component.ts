import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tabExample';
  isChecked:boolean | undefined;
  resultatsRecherches: any[] = [];
  rechercheForm: FormGroup;
  // rechercheForm: FormBuilder;
  constructor(private apiService: ServiceService, private bl:FormBuilder) {this.rechercheForm = this.bl.group({
      referenceTitrePerception: ''
    });} 

    // rechercher() {
    //   const referenceTitrePerception = this.rechercheForm.value.referenceTitrePerception;
  
    //   // Effectuer les opérations de recherche
    //   const resultatRecherche = {
    //     motifivationRecours: "Taxation hors norme",
    //     referenceTitrePerception,
    //     dateDecision: "",
    //     montantConteste: 230,
    //     devise: "USD",
    //     avecSurcis: 1
    //   };
  
    //   const index = this.resultatsRecherches.findIndex(item => item.referenceTitrePerception === referenceTitrePerception);
  
    //   if (index !== -1) {
    //     // Mettre à jour les données correspondantes si la référence existe déjà
    //     this.resultatsRecherches[index] = resultatRecherche;
    //   } else {
    //     // Ajouter une nouvelle entrée si la référence n'existe pas encore
    //     this.resultatsRecherches.push(resultatRecherche);
    //   }
    // }
  
 
   get num ()
   {
    return this.rechercheForm.get('referenceTitrePerception')?.value; 
   }

    rechercheNumDeclara() {

      let referenceTitrePerception: number = this.num;
  
      // Effectuer l'appel HTTP à l'API
      this.apiService.getAll(referenceTitrePerception)
        .subscribe(resultat => {
          const resultatRecherche = {
            motifivationRecours: resultat.data.motifivationRecours,
            referenceTitrePerception,
            dateDecision: resultat.dateDecision,
            montantConteste: resultat.montantConteste,
            devise: resultat.devise,
            avecSurcis: resultat.avecSurcis
          };
  
          const index = this.resultatsRecherches.findIndex(item => item.referenceTitrePerception === referenceTitrePerception);
  
          if (index !== -1) {
            // Mettre à jour les données correspondantes si la référence existe déjà
            this.resultatsRecherches[index] = resultatRecherche;
          } else {
            // Ajouter une nouvelle entrée si la référence n'existe pas encore
            this.resultatsRecherches.push(resultatRecherche);
          }
        });
    } 

  ngOnInit(): void {
    
  }

  onCheckboxChange(check:boolean){

  }
}



  
