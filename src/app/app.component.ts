import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from './service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  // form: FormGroup;

  activeTab: number = 1; // Onglet actif (1 ou 2)
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

  tableData1: any[] = [];
  tableData2: any[] = [];
  private resultatRecherche: any;
  id: any;
  valeur_de_monant: number = 0
  data: any;
  datas: any;
  typeReclamation: any;
  tab1Data: any;
  tab2Data: any;
  isLoading: any;
  // isSearching:any;
  raisonSocial: any;
  observation: any;
  donnees: any[] = [];
  selectedItem: any;
  comboboxData: any[] = [];
  dataArray: any[] = [];
  selectedValue: any;
  modalSize: string = 'large';
  valeur: string = "partiel";
  valeurSelectionner: string = '';

  montantMoins: number = 0;
  montant: any;
  aprescalcul: number = 0;
  item: any;
  i: any;
  decision: any;
  currentDate: any = Date();
  date_traitment: any;
  book: any;
  valeur_Valide: any;
  isSearching: boolean = false;
  loader: boolean = false;
  list_reclamations: any;
  idReclamationSelectionnee: number | null = null;
  all_data_from_api: any;
  detailsReclamation: any;
  local_informations_liste: any;
  selectedOption: any;
  // value: string | null = null;
  valuev: number[] = [];
  creation_tableau: any;
  nouveau_formulaire: FormGroup[] = [];
  ligneSelectionneeId: any;
  lignesAvecValeursRadios: any;
  referenceCourrier: any;
  checked: boolean | null | undefined;
  number: number = 0;
  adresse: any;
  decisions: number[] = [];
  detailReclamation: any;
  detailsReclamation1: any[] = []; // Votre tableau detailsReclamation
  formArray: FormGroup[] = []; // Tableau de formGroup pour chaque ligne
  value_2: number[] = []; //
  nouveau_tableau: any;
  value: number[] = [];
  valeursCheckbox: any[] = [];
  valueState: string = '';
  montantContesteRecuperer: any;
  montant_conteste_montant_du: number=0;
  all_reclamation_data: any;
  v: any;
  informations: any;
  detials_reclamation: any;
  private _nif_: any;
  nif_: any;
  reste_a_payer: any;
  mon_nouveau_montant: number = 0;
  data_: any;
  montant_: any;
  montant_du: any;
  montant_non_constesté: any;
  // montantContesteInput: any;
  // rechercheForm: FormGroup;
  // rechercheForm: FormBuilder;
  ngOnInit(): void {
    this.getAlldata();
    this.get_all_data();
    this.get_all_detail();
    // this. subscribeToMontantChanges()
    // this.AfficherContribuable()

    this.rechercheForm.get('selectedValue')?.setValue('partiel');
    this.selectionValue(this.valeur)

    // this.rechercheForm.get('montant')?.valueChanges.subscribe((data: any) => {
    //   console.log(data)
    //   this.valeur_de_monant = data

    //   this.selectionValue(this.valeur)
    // });





    
    // this.rechercheForm.get('montantConteste')?.valueChanges.subscribe((valeur:any)=>{
    //   this.montantContesteRecuperer = valeur
     
    // })
    

  }
  constructor(private apiService: ServiceService, private serve: NgxSpinnerService, private builder: FormBuilder
  ) { }

 //for modal
 @ViewChild('myModal') myModal!: ElementRef;
 @ViewChild('myModalv') myModalv!: ElementRef;
 @ViewChild('myModalDecision') myModalDecision!: ElementRef;
 @ViewChild('validation') validation!: ElementRef;
 @ViewChild('monModal') monModal!: ElementRef;
 @ViewChild('detail') detail!: ElementRef;


  rechercheForm = this.builder.group({
    typeReclamation: [1],
    observation: ['', Validators.required],
    referenceCourrier: ['', Validators.required],
    no_document: this.builder.control('', Validators.required),
    adresse: this.builder.control(null, Validators.required),
    nif: this.builder.control(null, Validators.required),
    // montantConteste: ['', Validators.required],
    archive: '',
    typedocument: this.builder.control(null, Validators.required),
    referenceTitrePerception: '',
    detailsReclamation: this.builder.array([]),
    selectedValue: ['partiel'],
    montant: this.builder.control(null, Validators.required),
    montantConteste: ['', [Validators.required, this.validateMontantConteste]],
    radioValue: [],
    // etat: [0]
  });
  get details() {
    return this.reclamationForm.get('detailsReclamation') as FormArray
  }
  addDetails() {
    this.details.push(this.builder.control(''));
  }
  get _nif() {
    return this.rechercheForm.get('nif')?.value;
  }
  changeTab(status: number) {
    this.activeTab = status;
    console.log(this.activeTab)
  }

  openDetail(size:string) {
    const modalElement = this.detail.nativeElement;
    $(modalElement).modal('show');

    this.modalSize = size;
  }
  monModal1(size: string) {

    const modalElement = this.monModal.nativeElement;
    // $(this.monModal.nativeElement).modal({ backdrop: 'static', keyboard: false });
    $(this.monModal.nativeElement).appendTo('body');
    // $(this.monModal.nativeElement).modal('handleUpdate'); 
    $(modalElement).modal('show');
    this.modalSize = size;

    const ligneSelectionnee = this.detailsReclamation.find((item: { id: any; }) => item.id === this.ligneSelectionneeId);

    if (ligneSelectionnee) {
      const valeurRadioControl = this.rechercheForm.get('valeurRadio');
      if (valeurRadioControl) {
        ligneSelectionnee.radioValue = valeurRadioControl.value;
        this.lignesAvecValeursRadios.push(ligneSelectionnee);
      }


      this.lignesAvecValeursRadios.push(ligneSelectionnee);
    }
  }

  hideModalValidation() {
    const modalElement = this.monModal.nativeElement;
    $(modalElement).modal('hide');
    this.rechercheForm.reset();
  }
  openModalD() {
    const modalElement = this.myModalv.nativeElement;
    $(modalElement).modal('show');
  }
  openModal() {
    const modalElement = this.myModal.nativeElement;
    $(modalElement).modal('show');
  }
  openModalValidation(size: string) {
    const modalElement = this.validation.nativeElement;
    $(modalElement).modal('show');
    this.modalSize = size;
  }
  openModalDecision(size: string) {
    const modalElement = this.myModalDecision.nativeElement;
    $(modalElement).modal('show');
    this.modalSize = size;
  }
  hideModalDecison() {
    const modalElement = this.myModalDecision.nativeElement;
    $(modalElement).modal('hide');
  }
  hide() {
    const modalElement = this.validation.nativeElement;
    $(modalElement).modal('hide');
  }
  hideModal() {
    const modalElement = this.myModal.nativeElement;
    $(modalElement).modal('hide');
  }


  AfficherContribuable() {
    let reference: string;
    this.serve.show();
    this.isLoading = true;

    // this.loader = true;


    if (typeof this._nif == 'string') {
      reference = this._nif;
      this.apiService.getHomeReclamation(reference).subscribe((resultat: any) => {
        // this.serve.hide();
        setTimeout(() => {
          console.log(resultat.data);

          this.nomAssujetti = resultat.data.raisonSocial;
          this.typepersonne = resultat.data.typeReclamation;
          this.nif = resultat.data.nif;
          this.adresseAssujetti = resultat.data.adresse
          this.datas = resultat.data
          
          this.dataArray = [this.datas]

          if (Array.isArray(this.dataArray)) {
            this.donnees = this.dataArray;
            console.log(this.donnees)

            this.comboboxData = this.donnees.map(item => ({ id: item.id, typeReclamation: item.typeReclamation }));
          } else {
            console.error('Les données retournées ne sont pas un tableau.');
          }
          // this.serve.hide();
          this.isLoading = false;
        }, 5000);


      })

      // this.rechercheNumDeclara()

    }
  }
 
  // @ViewChild('montantContesteInput', { static: true }) montantContesteInput!: ElementRef<HTMLInputElement>;
  //open modal

 

  traitement() {
    this.montant_du
    this.montantConteste
    this.reste_a_payer
    this.decision = this.rechercheForm.controls.selectedValue.value
    console.log(this.montantDu)
    console.log(this.montant_non_constesté)
    console.log(this.reste_a_payer)
    console.log(this.decision)
  }


  selectionValue(value: any) {
    
      if (value == 'partiel') {
        this.decision = value
        this.valeur_de_monant // Remplacez cette valeur par la logique appropriée pour déterminer la valeur de this.valeur_de_monant
        console.log(this.valeur_de_monant)
      } else if (value=='total'){
        this.decision = value
        console.log('total')
        this.valeur_de_monant; // Définissez une valeur par défaut si nécessaire
      } else
      {
        this.decision = value;
      }
     
  }

  // subscribeToMontantChanges() {
  //   this.rechercheForm.get('montant')?.valueChanges.subscribe((data: any) => {
  //     console.log(data);
  //     this.data_ = data;
  //     this.selectionValue(this.valeur).then(() => {
  //       this.selectElementDecision(this.item.id);
       
  //     });
  //   });
  // }
  // selectionValue(value: any) {

    
  //   this.valeur = value
  //   console.log(this.valeur)

  //   if (this.valeur == 'partiel') {

  //     this.traitement();
  //     console.log(this.valeur)

  //     console.log(this.valeur_de_monant)
     
  //     if (this.aprescalcul >= 0) {
  //       this.valeur_Valide = this.aprescalcul
  //     } else {
  //       this.valeur_Valide = 0;
  //     }
  //   } else if (this.valeur == 'total') {

  //     this.valeurSelectionner = this.valeur
  //     console.log(this.valeurSelectionner)
  //     this.montantMoins = 40;

  //     this.aprescalcul = this.montantMoins - this.valeur_de_monant
  //     console.log(this.valeur_de_monant)
  //   } else {
  //     console.log('rejet')
  //     this.valeurSelectionner = this.valeur

  //     this.montantMoins = 40;

  //     this.aprescalcul = this.montantMoins
  //   }
   
  // }

  // Méthode pour sélectionner un élément
  selectElement(element: any) {
    this.apiService.getHomeReclamation(element).subscribe((res: any) => {
      console.log(res);
      this.typeReclamation = res.data.typeReclamation;
      this.raisonSocial = res.data.raisonSocial;;
      this.observation = res.data.observation;
      console.log(this.raisonSocial);
    })
    this.openModal();
  }

  // Méthode pour sélectionner un élément
  selectElementDecision(element: any) {
   
    const montantControl = this.rechercheForm.get('montant') as FormControl;
    const valeur_data = this.detials_reclamation.find((i: any) => i.id === element);
  
    this.montantDu = valeur_data.montantDu;
    this.montantConteste = valeur_data.montantConteste;
    this.montantNonConteste = valeur_data.montantNonConteste
    // Ouvrir le modal pour afficher les valeurs
    this.openModalDecision('large');
  
    montantControl.valueChanges.subscribe((value: any) => {
      console.log(value); // Affiche la valeur numérique tapée dans l'input montant
     
      this.montant_ = value;
    });
  
    montantControl.valueChanges.pipe(debounceTime(0)).subscribe(() => {
      // Effectuer le calcul ici en utilisant les deux valeurs
      if(this.montant_>=this.montantConteste)
      {
        this.reste_a_payer = "montant superieur";
        
      } else{
      this.reste_a_payer = this.montantConteste - this.montant_;
      this.montant_du = this.montantDu;
      this.montant_non_constesté = this.montantNonConteste
      console.log(this.reste_a_payer );}
    });
    this.traitement()
  }
  selectElementValidation(element: any) {
    this.apiService.getAllReclamationDetails(element).subscribe((res: any) => {
      console.log(res);
    });
  }
  SaveData() {
    const details: any[] = [];

    for (const element of this.resultatsRecherches) {
      const item = {
        montantConteste: this.rechercheForm.controls.montantConteste.value,
        motifivationRecours: element.motifivationRecours,
        referenceTitrePerception: element.referenceTitrePerception,
        montantNonConteste: element.montantNonConteste,
        intituleActeGenerateur: element.intituleActeGenerateur,
        typeDocument: element.typeDocument,

        motivationReclamation: element.motivationReclamation,
        montantDu: element.montantDu,
        devise: element.devise,
        avecSurcis: 1,
        id: element.id
        // Ajoutez d'autres propriétés à extraire de chaque élément selon vos besoins
      };
      details.push(item);
    }


    let stDs = details;
    const request = {
      observation: this.rechercheForm.controls.observation.value,
      referenceCourrier: this.rechercheForm.controls.referenceCourrier.value,
      // typeReclamation: this.recch.controls.typeReclamation.value,
      typeReclamation: this.reclamationForm.controls.typeReclamation.value,
      raisonSociale: this.nomAssujetti,
      adresse: this.adresseAssujetti,
      nif: this.nif,
      // archive: "",
      detailsReclamation: stDs,
    };

    console.log(request);
  }

  afficher_data(id:any)
  {
      const value_data_ = this.informations.find((reclamation: any) => reclamation.nif === id);

      if(value_data_){
       console.log(value_data_);
        this.nif_ = value_data_.nif
        console.log(this.nif_);
        this.detials_reclamation = value_data_.detailsReclamation
        
        console.log(this.detials_reclamation)
      }

      this.openDetail('large');
      
  }

  removeDetailEdit(referenceTitrePerception: string) {
    const index = this.resultatsRecherches.findIndex(
      (item) => item.referenceTitrePerception === referenceTitrePerception
    );

    if (index !== -1) {

      this.resultatsRecherches.splice(index, 1);

    }
  }

  get num() {
    return this.rechercheForm.get('referenceTitrePerception')?.value;
  }
 
  get_all_detail():void{
    this.apiService.get_all_declarations().subscribe(data =>{ 
      console.log(data);
      this.all_reclamation_data = data

      console.log(this.all_reclamation_data)
    })
  }



  updateValue(event: any) {
    this.v = event.target.value;
    console.log(this.v);

    // this.montantContesteInput.nativeElement.focus();
    this.rechercheNumDeclara()
}
  rechercheNumDeclara() {
   
    let referenceTitrePerception: string;
   

    if (typeof this.num == 'string') {
      referenceTitrePerception = this.num;


      this.apiService.getAll(referenceTitrePerception).subscribe((resultat: any) => {
        if (resultat.status === 201) {

          if (this.datas && this.datas.id == resultat.data.fk_Reclamation) {
            this.resultatRecherche = {
              id: resultat.data.id,
              motifivationRecours: resultat.data.motifivationRecours,
              referenceTitrePerception,
              montantNonConteste: resultat.data.montantNonConteste,
              montantConteste: resultat.data.montantConteste,
              devise: resultat.data.devise,
              montantDu: resultat.data.montantDu,
              typedocument: resultat.data.typeDocument,
              intituleActeGenerateur: resultat.data.intituleActeGenerateur,
              avecSurcis: resultat.data.avecSurcis,
              montant_conteste_montant_du : resultat.data.montantDu-this.v
            };
          //  this.montant_conteste_montant_du = resultat.data.montantDu - this.v
              
            // console.log(this.montant_conteste_montant_du)
            // console.log(this.montantContesteRecuperer)

            const index = this.resultatsRecherches.findIndex(
              (item) => item.referenceTitrePerception === referenceTitrePerception
            );

            if (index !== -1) {
              this.resultatsRecherches[index] = this.resultatRecherche;
            } else {

              this.resultatsRecherches.push(this.resultatRecherche);

            }
          }
          else {
            console.error('il y a une erreur');
          }

          // this.data = resultat
          console.log(resultat);
        } else {
          console.error('erreur')
        }
      });
    }
  }
  validateMontantConteste(control: FormControl) {
    const value = control.value;
    const hasThreeDigits = /^\d{3,}$/.test(value); // Vérifie si la valeur contient au moins 3 chiffres

    return hasThreeDigits ? null : { invalidMontantConteste: true };
  }
  getAlldata(): void {

    this.apiService.getAlldata().subscribe((resultat: any) => {
      this.raisonSocial = resultat.data.raisonSocial;
      this.data = resultat.data;
      this.local_informations_liste = resultat.data
      this.informations = resultat.data
      // this.list_reclamations = resultat.data
      console.log(this.informations)
    });

  }
  get_all_data(): void {
    this.apiService.get_all_data_from_api().subscribe((response: any) => {
      this.list_reclamations = response.data;


      console.log(this.list_reclamations);
    })
  }

  afficher_ligne_detail(id: any) {
    const ligne_pour_detail = this.detailsReclamation.find((detail: any) => detail.id === id);

    if (ligne_pour_detail) {
      this.montantDu = ligne_pour_detail.montantDu

      const detailsReclamation = {
        id: ligne_pour_detail.id,
        motifivationRecours: ligne_pour_detail.motifivationRecours,
        referenceTitrePerception: ligne_pour_detail.referenceTitrePerception,
        montantNonConteste: ligne_pour_detail.montantNonConteste,
        montantConteste: ligne_pour_detail.montantConteste,
        motivationReclamation:
          ligne_pour_detail.motivationReclamation,
        etatValidation: ligne_pour_detail.etatValidation,
        devise: ligne_pour_detail.devise,
        montantDu: ligne_pour_detail.montantDu,
        typeDocument: ligne_pour_detail.typeDocument,
        intituleActeGenerateur:
          ligne_pour_detail.intituleActeGenerateur,
        avecSurcis: ligne_pour_detail.avecSurcis,
        fk_AgentCreat: ligne_pour_detail.fk_AgentCreat,
        fkActeGenerateur: ligne_pour_detail.fkActeGenerateur,
      };
      // console.log(detailsReclamation)

      const index = this.resultatsRecherches.findIndex(
        (item) =>
          item.id ===
          detailsReclamation.id
      );

      if (index !== -1) {
        this.resultatsRecherches[index] = detailsReclamation;
        this.detailReclamation.push(detailsReclamation)

        // console.log(this.detailReclamation)

        // this.nouveau_formulaire = this.detailsReclamation.map(
        //   (item:any) => {
        //     return this.builder.group({

        //       etatValidation: [item.etatValidation],

        //     });
        //   }
        // );
      }
      this.monModal1('large');
    }
  }

  afficher_detail(id: any) {
    const detail_by_id_ = this.local_informations_liste.find((reclamation: any) => reclamation.nif === id);

    if (detail_by_id_) {
      this.idReclamationSelectionnee = detail_by_id_.id;
      this.raisonSocial = detail_by_id_.raisonSocial;
      this.nif = detail_by_id_.nif;
      this.adresse = detail_by_id_.adresse;
      this.detailsReclamation = detail_by_id_.detailsReclamation;

      console.log(this.detailsReclamation)

      this.resultatsRecherches.push(this.detailsReclamation);

      // Création des formGroup pour chaque élément de detailsReclamation
    this.detailsReclamation.forEach((item:any) => {
      const formGroup = this.builder.group({
        etat: new FormControl(item.etat) // Ajoutez d'autres contrôles si nécessaire
      });
      this.nouveau_formulaire.push(formGroup); // Ajoute le formGroup au tableau nouveau_formulaire
    });
     
      this.openModalD();
      this.hide()
    }
  }
  afficherDetail(id: any) {
    const detail_by_id = this.list_reclamations.find((reclamation: any) => reclamation.id === id);

    if (detail_by_id) {
      this.idReclamationSelectionnee = detail_by_id.id;
      this.raisonSocial = detail_by_id.raisonSocial;
      this.detailsReclamation = detail_by_id.detailsReclamation;
      console.log(this.idReclamationSelectionnee);
      console.log(this.raisonSocial)



    }

  }

  onCheckboxChange(checked: boolean) {
    const value = checked ? 1 : 0;

    console.log(value);
  }


  accessRowValues() {
    const montantContestes = [];
    for (const formGroup of this.nouveau_formulaire) {
      const formControl = formGroup.get("etat");
      const value = formControl?.value ? 1 : 0;

      montantContestes.push(value);
    }

    this.value = montantContestes;
    console.log(this.value);
  }


  save() {

    const details: any[] = [];
    this.accessRowValues()
    for (let i = 0; i < this.detailsReclamation.length; i++) {
      const element = this.detailsReclamation[i];
      const v = this.value[i]


      const item = {
        montantConteste: element.montantConteste,
        motifivationRecours: element.motifivationRecours,
        referenceTitrePerception: element.referenceTitrePerception,
        montantNonConteste: element.montantNonConteste,
        // montantConteste : element.montantConteste,
        intituleActeGenerateur: element.intituleActeGenerateur,
        typeDocument: element.typeDocument,
        etatValidation: v,
        motivationReclamation: element.motivationReclamation,
        montantDu: element.montantDu,
        devise: element.devise,
        avecSurcis: 1,
        id: element.id
        // Ajoutez d'autres propriétés à extraire de chaque élément selon vos besoins
      };
      details.push(item);
    }

    const valeurV = this.value;
    const hasOne = valeurV.includes(1) ? 1 : 0;

  console.log(hasOne); 
    

const valeur = this.value
  
    console.log(valeur)
    this.valueState = "";

if (valeur.some((element:any) => element === "1")) {
  this.valueState = "1";
  console.log(this.valueState)
} else if (valeur.every((element:any) => element === "0,0")) {
  this.valueState = "0";
  console.log(this.valueState)
}

    let stDs = details;
    const request = {
      observation: this.rechercheForm.controls.observation.value,

      raisonSociale: this.raisonSocial,
      adresse: this.adresse,
      nif: this.nif,
      valueState : this.valueState,
      // archive: "",
      detailsReclamation: stDs,
    };

    console.log(request);
  }
  onCheckboxChanged(index: number) {
    const formGroup = this.nouveau_formulaire[index];
    const formControl = formGroup.get("etat");
    const value = formControl?.value;
  
    console.log("Valeur de la case à cocher pour la ligne " + index + ": " + value);
    // Faites ce que vous devez faire avec la valeur récupérée...
  }

}
