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
  // rechercheForm: FormGroup;
  // rechercheForm: FormBuilder;
  ngOnInit(): void {
    this.getAllBooks()
    this.getAlldata();
    this.get_all_data();
    // this.AfficherContribuable()


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
  //open modal

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



  afficherDetail(id:any)
  {
    const detail_by_id = this.list_reclamations.find((reclamation:any) => reclamation.id === id);

    if (detail_by_id){
      this.idReclamationSelectionnee = detail_by_id.id;
      this.raisonSocial = detail_by_id.raisonSocial;
      this.detailsReclamation = detail_by_id.detailsReclamation;
      console.log(this.idReclamationSelectionnee);
      console.log(this.raisonSocial)
      this.openModalD();
      this.hide()
    }
    
  }

  onCheckboxChange(checked: boolean) {
    const value = checked ? 1 : 0;

    console.log(value);
  }

  getAllBooks()
  {
    this.apiService.getBooks().subscribe((res:any)=>
    {
       this.book = res;

       console.log(res);
    });
  }

}
