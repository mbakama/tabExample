import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from './service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'tabExample';
  isChecked: boolean | undefined;
  avecSurcis!: boolean;
  resultatsRecherches: any[] = [];
  nomAssujetti: any;
  typepersonne: any;
  adresseAssujetti: any;
  nif: any;
  reclamationForm: any;
  referenceTitrePerception: any;
  motivationReclamation: any;
  motifivationRecours: any;
  montantConteste: any;
  montantNonConteste: any;
  typedocument: any;
  montantDu: any;
  avecSurcisValue: any;
  devise: any;
  montantsContestesModifies: { referenceTitrePerception: string, montantConteste: number }[] = [];
  fkActeGenerateur: any;
  intituleActeGenerateur: any;
  private resultatRecherche: any;
  // rechercheForm: FormGroup;
  // rechercheForm: FormBuilder;
  ngOnInit(): void {}
  constructor(
    private apiService: ServiceService,
    private builder: FormBuilder
  ) {}

  rechercheForm = this.builder.group({
    // observation: this.builder.control('', Validators.required),
    typeReclamation: [1],
    observation: ['', Validators.required],
    referenceCourrier: ['', Validators.required],
    no_document: this.builder.control('', Validators.required),
    adresse: this.builder.control(null, Validators.required),
    // referenceCourrier: this.builder.control(null, Validators.required),
    nif: this.builder.control(null, Validators.required),
    montantConteste: ['', Validators.required],
    archive: '',
    typedocument: this.builder.control(null, Validators.required),
    referenceTitrePerception: '',
    detailsReclamation: this.builder.array([
      // this.builder.group({
      //   referenceTitrePerception: this.builder.control('', Validators.required),
      //   motivationReclamation: this.builder.control('', Validators.required),
      //   motifivationRecours: this.builder.control('', Validators.required),
      //   montantConteste: this.builder.control(''),
      //   montantNonConteste: this.builder.control(''),
      //   typedocument: this.builder.control(''),
      //   montantDu: this.builder.control(''),
      //   avecSurcis: this.builder.control(''),
      //   agentCreate: this.builder.control(''),
      //   devise: this.builder.control(''),
      //   fkActeGenerateur: this.builder.control(''),
      //   intituleActeGenerateur: this.builder.control(''),
      // })
    ]),
  });

  get _nif() {
    return this.rechercheForm.get('nif')?.value;
  }

  AfficherContribuable() {
    let reference: string;

    if (typeof this._nif == 'string') {
      reference = this._nif;

      this.apiService.getByNif(reference).subscribe((res: any) => {
        (this.nomAssujetti = res.data.raisonSocial),
          (this.nif = res.data.nif),
          (this.typepersonne = res.data.typeReclamation),
          (this.adresseAssujetti = res.data.adresse);
        console.log(res);
      });
    }
  }

  SaveData() {
    const details: any[] = []; 
      // this.montantsContestesModifies = [];
    
      // for (const element of this.resultatsRecherches) {
      //   const montantContesteControl = this.rechercheForm.get('detailsReclamation.' + element.referenceTitrePerception + '.montantConteste');
    
      //   if (montantContesteControl && montantContesteControl.dirty && montantContesteControl.valid) {
      //     const montantContesteValue = montantContesteControl.value;
      //     this.montantsContestesModifies.push({
      //       referenceTitrePerception: element.referenceTitrePerception,
      //       montantConteste: montantContesteValue
            
            
      //     });
      //     console.log(montantContesteControl);
      //   }
      // } 
    
      // Utilisez le tableau montantsContestesModifies selon vos besoins, par exemple, envoyez-le à une API ou effectuez d'autres opérations.
    















    for (const element of this.resultatsRecherches) {
      const item = {
        montantConteste: this.rechercheForm.controls.montantConteste.value,
        motifivationRecours: element.motifivationRecours, 
        referenceTitrePerception: element.referenceTitrePerception, 
        montantNonConteste: element.montantNonConteste, 
        intituleActeGenerateur:element.intituleActeGenerateur , 
        typeDocument: element.typeDocument,
        // fk_Reclamation: 26,
        // id: 35,
        motivationReclamation: element.motivationReclamation,
        montantDu: element.montantDu, 
        devise: element.devise, 
        avecSurcis: 1,
        // Ajoutez d'autres propriétés à extraire de chaque élément selon vos besoins
      };
      details.push(item);
    }
   

    let stDs = details;
    const request = {
      observation: this.rechercheForm.controls.observation.value,
      referenceCourrier: this.rechercheForm.controls.referenceCourrier.value,
      // typeReclamation: this.recch.controls.typeReclamation.value,
      raisonSociale: this.nomAssujetti,
      adresse: this.adresseAssujetti,
      nif: this.nif,
      // archive: "",
      detailsReclamation: stDs,
    };

    console.log(request);
  }

  removeDetailEdit(referenceTitrePerception: string) {
    const index = this.resultatsRecherches.findIndex(
      (item) => item.referenceTitrePerception === referenceTitrePerception
    );

    if (index !== -1) {
      // Swal.fire({
      //   title: 'Etes-vous sûr?',
      //   text: 'de supprimer cette ligne?',
      //   icon: 'warning',
      //   showCancelButton: true,
      //   confirmButtonColor: '#34c38f',
      //   cancelButtonColor: '#f46a6a',
      //   cancelButtonText: 'Annuler',
      //   confirmButtonText: 'Oui'
      // }).then(result => {
      //   if (result.value) {

      this.resultatsRecherches.splice(index, 1);
      //   }
      // });
    }
  }

  get num() {
    return this.rechercheForm.get('referenceTitrePerception')?.value;
  }

  rechercheNumDeclara() {
    let referenceTitrePerception: string;

    if (typeof this.num == 'string') {
      referenceTitrePerception = this.num;

      // Effectuer l'appel HTTP à l'API
      this.apiService.getAll(referenceTitrePerception).subscribe((resultat) => {
        this.resultatRecherche = {
          motifivationRecours: resultat.data.motifivationRecours,
          referenceTitrePerception,
          montantNonConteste: resultat.data.montantNonConteste,
          montantConteste: resultat.data.montantConteste,
          devise: resultat.data.devise,
          montantDu:resultat.data.montantDu,
          typedocument:resultat.data.typeDocument,
          intituleActeGenerateur : resultat.data.intituleActeGenerateur,
          avecSurcis: resultat.data.avecSurcis,
        };

        const index = this.resultatsRecherches.findIndex(
          (item) => item.referenceTitrePerception === referenceTitrePerception
        );

        if (index !== -1) {
          this.resultatsRecherches[index] = this.resultatRecherche;
        } else {
          
          this.resultatsRecherches.push(this.resultatRecherche);
        }
        console.log(resultat);
      });
    }
  }

  

  onCheckboxChange(checked: boolean) {
    const value = checked ? 1 : 0;

    console.log(value);
  }
}
