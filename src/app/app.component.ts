import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from './service.service';
import { NgxSpinnerService } from 'ngx-spinner';

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
  isLoading:any;
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
  detailsReclamation1: any[] =[]; // Votre tableau detailsReclamation
  formArray: FormGroup[] = []; // Tableau de formGroup pour chaque ligne
  value_2: number[] = []; //
  nouveau_tableau: any;
  // rechercheForm: FormGroup;
  // rechercheForm: FormBuilder;
  ngOnInit(): void {
    this.getAlldata();
    this.get_all_data();
    // this.AfficherContribuable()

    this.formArray = this.detailsReclamation1.map((item) => {
      return this.builder.group({
        etatValidation: [item.etatValidation], // Ajoutez d'autres contrôles si nécessaire
      });
    });
    // this.rechercheForm.get('selectedValue')?.valueChanges.subscribe((s) => {
    //   this.selectionValue(s);
    // })

    this.rechercheForm.get('selectedValue')?.setValue('partiel');
    
     this.rechercheForm.get('montant')?.valueChanges.subscribe((data: any) => {
        console.log(data)
        this.valeur_de_monant = data

        this.selectionValue(this.valeur)
      });
      
      
  }
  constructor(private apiService: ServiceService, private serve : NgxSpinnerService, private builder: FormBuilder
  ) { }

 
  rechercheForm = this.builder.group({
    typeReclamation: [1],
    observation: ['', Validators.required],
    referenceCourrier: ['', Validators.required],
    no_document: this.builder.control('', Validators.required),
    adresse: this.builder.control(null, Validators.required),
    nif: this.builder.control(null, Validators.required),
    montantConteste: ['', Validators.required],
    archive: '',
    typedocument: this.builder.control(null, Validators.required),
    referenceTitrePerception: '',
    detailsReclamation: this.builder.array([]),
    selectedValue: ['partiel'],
    montant: this.builder.control(null, Validators.required),
    radioValue: [],
    etatValidation : [false]
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
  //for modal
  @ViewChild('myModal') myModal!: ElementRef;
  @ViewChild('myModalv') myModalv!: ElementRef;
  @ViewChild('myModalDecision') myModalDecision!: ElementRef;
  @ViewChild('validation') validation!:ElementRef;
  @ViewChild('monModal') monModal!: ElementRef;
  //open modal

  monModal1(size:string)
  {
    
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

  hideModalValidation()
  {
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
  openModalValidation(size:string)
  {
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
  hide()
  {
    const modalElement = this.validation.nativeElement;
    $(modalElement).modal('hide');
  }
  hideModal() {
    const modalElement = this.myModal.nativeElement;
    $(modalElement).modal('hide');
  }
  sauver()
  {
    this.observation = this.rechercheForm.get('observation')?.value

    if (this.rechercheForm.validator) 
    {
      console.log('ajouter')
    } else{
      console.log('exacte')
    }
  }




  traitement()
  {
   this.decision = this.valeur;
   this.date_traitment = this.currentDate
   console.log(this.aprescalcul);
   console.log(this.decision)
   console.log(this.date_traitment)
  }
  selectionValue(value: any) {

    this.traitement();
    this.valeur = value
    console.log(this.valeur)

    if (this.valeur == 'partiel') {
     
      this.valeurSelectionner = this.valeur
      console.log(this.valeurSelectionner)
      this.montantMoins = 40;

      this.aprescalcul = this.montantMoins-this.valeur_de_monant
      if(this.aprescalcul >= 0){
          this.valeur_Valide = this.aprescalcul
      } else{
          this.valeur_Valide = 0;
      }
    } else if (this.valeur == 'total') {
      
      this.valeurSelectionner = this.valeur
      console.log(this.valeurSelectionner)
      this.montantMoins = 40;

      this.aprescalcul = this.montantMoins-this.valeur_de_monant
      console.log(this.valeur_de_monant)
    } else {
      console.log('rejet')
      this.valeurSelectionner = this.valeur

      this.montantMoins = 40;

      this.aprescalcul = this.montantMoins
    }
  }

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
    this.apiService.getAllReclamationDetails(element).subscribe((res: any) => {
      console.log(res);

      //  const donnee = [res.data];
      //  console.log(donnee)
      this.montantDu = res.montantDu

      console.log(this.montantDu)
      this.rechercheNumDeclara();
    })
    this.openModalDecision('large');
  }
  selectElementValidation(element:any)
  {
    this.apiService.getAllReclamationDetails(element).subscribe((res:any) => {
      console.log(res);
    });
    this.openModalValidation('large');
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

  rechercheNumDeclara() {
    let referenceTitrePerception: string;

    if (typeof this.num == 'string') {
      referenceTitrePerception = this.num;


      // if(this.donnees && this.donnees.nif == )
      // Effectuer l'appel HTTP à l'API
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
            };

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

  getAlldata(): void {

    this.apiService.getAlldata().subscribe((resultat: any) => {
      this.raisonSocial = resultat.data.raisonSocial;
      this.data = resultat.data;
      this.local_informations_liste = resultat.data
      // this.list_reclamations = resultat.data
      console.log(this.data)
    });

  }
  get_all_data():void{
    this.apiService.get_all_data_from_api().subscribe((response:any)=>
    {
        this.list_reclamations = response.data;
        

        console.log(this.list_reclamations);
    })
  }

  afficher_ligne_detail(id:any)
  {
    const ligne_pour_detail = this.detailsReclamation.find((detail:any)=>detail.id === id);

    if(ligne_pour_detail)
    {
      this.montantDu = ligne_pour_detail.montantDu
      
      const detailsReclamation = {
        id: ligne_pour_detail.id,
        motifivationRecours: ligne_pour_detail.motifivationRecours,
        referenceTitrePerception: ligne_pour_detail.referenceTitrePerception,
        montantNonConteste: ligne_pour_detail.montantNonConteste,
        montantConteste: ligne_pour_detail.montantConteste,
        motivationReclamation:
          ligne_pour_detail.motivationReclamation,
          etatValidation:ligne_pour_detail.etatValidation,
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

  afficher_detail(id:any){
    const detail_by_id_ = this.local_informations_liste.find((reclamation:any) => reclamation.nif === id);

    if (detail_by_id_){
      this.idReclamationSelectionnee = detail_by_id_.id;
      this.raisonSocial = detail_by_id_.raisonSocial;
      this.nif = detail_by_id_.nif;
      this.adresse = detail_by_id_.adresse;
      this.detailsReclamation = detail_by_id_.detailsReclamation;

      console.log(this.detailsReclamation)

      
      
      
      
     
      this.nouveau_formulaire = this.detailsReclamation.map((item: any) => {
        // const etatValidationValue = item.etatValidation !== null ? item.etatValidation : false;
        return this.builder.group({
          etat: [item.etat],
        });
      });
      
      // console.log(detail_by_id_)
      this.openModalD();
      this.hide()
    }
  }
  afficherDetail(id:any)
  {
    const detail_by_id = this.list_reclamations.find((reclamation:any) => reclamation.id === id);

    if (detail_by_id){
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

  recuperer_valeur_radio(event :any)
  {

    const valeur = event.target.value ==="option1" ? 1 : 0
     this.selectedOption = event.target.value ==="option1" ? 1 : 0 
    
      console.log(valeur);
   
  }

  accessRowValues() {
    const validation: number[] = []; // Array to store montantConteste values
    

    // const recu = this.rechercheForm.get('etatValidation')

    // const formGroup = this.nouveau_formulaire[i];

    // Faites quelque chose avec la valeur de la case à cocher de la ligne spécifique
    // console.log(`Ligne ${i + 1} - Checkbox : ${isChecked}`);

    for (const formGroup of this.nouveau_formulaire) {
    const etatValidation = formGroup.get('etatValidation');

      const formControl = formGroup.get("etatValidation");
       const isChecked = etatValidation?.value ? 1 : 0;

      // const value = formControl?.value ? 1 : 0;

      

      validation.push(isChecked); // Store the montantConteste value in the array

    }

     this.value_2 = validation; // Assign the array of montantConteste values to this.value
     console.log(this.value_2)
  }

  
  save(){

    const details: any[] = [];
this.accessRowValues()
    for (let i = 0; i < this.detailsReclamation.length; i++) {
      const element = this.detailsReclamation[i];
     const v = this.value_2[i]
      
      
      const item = {
        montantConteste: element.montantConteste,
        motifivationRecours: element.motifivationRecours,
        referenceTitrePerception: element.referenceTitrePerception,
        montantNonConteste: element.montantNonConteste,
        // montantConteste : element.montantConteste,
        intituleActeGenerateur: element.intituleActeGenerateur,
        typeDocument: element.typeDocument,
        etatValidation :v,
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
      observation: this.observation,
      
      raisonSociale: this.raisonSocial,
      adresse: this.adresse,
      nif: this.nif,
      // archive: "",
      detailsReclamation: stDs,
    };

    console.log(request);
  }
  onCheckboxChanged() {
    // for ( const valeur2 of this.rechercheForm ){

    // }
    this.checked = this.rechercheForm.get('etatValidation')?.value;

     this.number = this.checked ? 1 : 0;

     console.log(this.number);
  }
  // onCheckboxChanged(index: number) {
  //   const formGroup = this.formArray[index];
  //   const etatValidation = formGroup.get('etatValidation');
  //   const isChecked = etatValidation?.value;

    
  //   const number = isChecked ? 1 : 0;
  //   console.log(`Ligne ${index + 1} - Checkbox : ${number}`);
  // }
  
  
}
