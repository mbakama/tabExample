import { responseTransform } from 'src/app/core/util/function-util';
import { data } from 'jquery';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

import { ReclamationService } from '../services/reclamation.service';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { element } from 'protractor';


@Component({
  selector: 'app-gestion-administratif',
  templateUrl: './gestion-administratif.component.html',
  styleUrls: ['./gestion-administratif.component.scss']
})
export class GestionAdministratifComponent implements OnInit, OnDestroy {

  // tabs: string[] = ['Traitement administratif', 'Traitement juridictionnel', 'Informations de taxation et de payement'];
  // activeTaxIndex: number = 0;
  detailsDeclations!: FormArray;
  // data:any;
  avecSurcisValue: number;
  

  reclamations: [] = [];
  // tableau: [];
  contraintes: [] = [];
  // reclamations : [] = [];
  breadCrumb: Array<{}>;
  addModal: any;
  editModalEdit: any;
  cont: any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  currentDate: any = new Date();
  uName = JSON.parse(localStorage.getItem('currentUser')).id;

  
  submitted = false;
  datesaisie: any;
  datesaisies: any;
  nifContribuabl: any;
  datesaisiedit: any;
  loading: boolean = false;
  textLoading: any;
  trouver: boolean = false;
  // les valeurs à afficher
  nomAssujetti: any;
  typepersonne: any;
  nif: any;
  adresseAssujetti: any;
  raisonSocial: any;
  montantConteste: any;
  referenceTitrePerception: any;
  motivationReclamation: any;
  motifivationRecours: any;
  // montantConteste:any;
  montantNonConteste: any;
  typedocument: any;
  montantDu: any
  avecSurcis: any;
  devise: any;
  agentCreate: any;
  fkActeGenerateur: any;
  intituleActeGenerateur: any
  referenceCourrier: any;
  documentDetails: FormArray;
  rowlengthEdit: number;
  observation: any;
  typeReclamation: any;
  private resultatRecherche: any;
  fkcontruable: any;
  // fkRepertoire: any;
  searchResults: any[] = [];
  snackBar: any;
  archive: string;
  datas: any;
  detailReclamation: any;
  avecSurcisValueOne: number;
  traitementAdm: any[] = [];
  traitementJuri: any[]=[];
  resultatsRecherches: any[] = [];
  valueState: any;
  titrePerceptionList: any;
  con: any;
  numeroReclamation: any;
  etat: any;
  type: any;
trait: any;
  valeur: any;
  valeur_de_monant: any;
  valeurSelectionner: any;
  montantMoins: number;
  aprescalcul: number;
  id: any;
  informations_reclamations_validee: any;
  nif_: any;
  details: any;
  valeur_Valide: number;
  mo: any;
  montant_: any;
  list_reclamations: any;
  detailReclamation_: any;
  nouveau_formulaire: FormGroup[] = [];
  list_details_reclamations: any;
  adresseAssujetti_: any;
  nif__: any;
  typeReclamation_: any;
  valueState_: any;
  fkcontribuable_: any;
  referenceCourrier_: any;
  raisonSocial_: any;
  agentCreate_: any;
  idReclamationSelectionnee: any;
  reste_a_payer: any;
  montant_non_constesté: any;
  montant_du: any;
  decision: any;
  montant_non_conteste_pay: any;
  observation_: any;
  montantDecision: any;
  decisionRaclamation: any;
  typeDocument: any;
  fk_Reclamation_: any;
  fk_AgentTraitement: any;
  value: any[];
  decisions: any;
  formControl: any;
  selectedElement: any;
  idDetailReclamation: any;
  montant: any;
  montdu: any;
  list_data: any;
  montantConteste1: any;
  valeur1: any;
  selectedItem: any;
  montantdecisionnel: any;

  // selectedOption: string;



  constructor(private modalService: NgbModal, private reclamationService: ReclamationService, private datepipe: DatePipe,
    private builder: FormBuilder) { }

  ngOnInit() {
    this.breadCrumb = [{ label: 'Contentieux' }, { label: 'Gestion administrative', active: true }];
    this.dtOptions = {
      paging: true,
      lengthChange: true,
      searching: true,
      ordering: true,
      info: true,
      autoWidth: false,
      language: {
        decimal: "",
        emptyTable: "Il y a encore aucune données",
        info: "Affichage _START_ à _END_ de _TOTAL_ entrées",
        infoEmpty: "Affichage 0 à 0 de 0 entrées",
        infoFiltered: "(filtré de _MAX_total entrées)",
        infoPostFix: "",
        thousands: ",",
        lengthMenu: "Afficher _MENU_ entrées",
        loadingRecords: "Chargement...",
        processing: "En traitement...",
        search: "Recherche",
        zeroRecords: "Aucun enregistrements correspondants trouvés",
        paginate: {
          first: "Première",
          last: "Dernière",
          next: "Suivante",
          previous: "Précédente"
        },
      }

    };

    this.getAlldata();
    this.reclamationForm.get('selectedValue')?.setValue('partiel');
    
    this.reclamationForm.get('montant')?.valueChanges.subscribe((data: any) => {
       console.log(data)
       this.valeur_de_monant = data

       this.selectionValue(this.valeur)
     });

  }

  onChargeTypeReclamation(value: any) {
    console.log(value);
  }
  onChargeTypeDocument(value: any) {
    console.log(value);
  }
  msg: string;
  getAlldata(): void {

    this.loading = true;
    this.textLoading = "Chargement des données...";
    this.reclamationService.getAllReclamationAdmin().subscribe((data: any) => {

      // console.log(data);
      if (data == 0) {
        this.msg = "Pas de données"
      } else {
        this.msg = "";
        this.reclamations = data.data;
        
        console.log(this.reclamations)

        this.informations_reclamations_validee = data.data
        this.list_reclamations = data.data
        this.list_data = data.data
        console.log(this.informations_reclamations_validee)
        this.dtTrigger.next();

        
      }

      this.loading = false;
      this.textLoading = "";


    }, error => { });


  } 

  reclamationForm = this.builder.group({
    // observation: this.builder.control('', Validators.required),
    montant:['',Validators.required],
    typeReclamation: [1],
    observation: ['', Validators.required],
    referenceCourrier: ['', Validators.required],
    no_document: this.builder.control('', Validators.required),
    adresse: this.builder.control(null, Validators.required),
     fkRepertoire: this.builder.control(null, Validators.required),
    // referenceCourrier: this.builder.control(null, Validators.required),
    nif: this.builder.control(null, Validators.required),
    montantConteste: ['', Validators.required],
    archive: '',
    motifivationRecours:'',
    typedocument: this.builder.control(null, Validators.required),
    referenceTitrePerception: '', 
    avecSurcis : '',
    detailsReclamation: this.builder.array([]),
    radioValue:[],
    reste:'',
    montantdecisionnel:'',
    montantDecision:'',
    reste_a_payer:'',
    etat:[0],
    selectedValue: this.builder.control(null, Validators.required)
  });
  
  SaveDataB() {
    this.submitted = true;

    const details: any = [];

    for (const element of this.resultatsRecherches) {
      const montantContesteControl = this.reclamationForm.get('montantConteste');
      const montantContesteValue = montantContesteControl.value;
      const item = {
        montantConteste: montantContesteValue,
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
        avecSurcis: this.avecSurcisValue,
        // Ajoutez d'autres propriétés à extraire de chaque élément selon vos besoins
      };
      details.push(item);
    }
  
    let stDs = details;
    const request = {
      observation: this.reclamationForm.controls.observation.value,
      referenceCourrier: this.reclamationForm.controls.referenceCourrier.value,
      typeReclamation: this.reclamationForm.controls.typeReclamation.value,
      raisonSociale: this.nomAssujetti,
      adresse: this.adresseAssujetti,
      agentCreate: this.uName,
      nif: this.nif,
      fkcontribuable: this.fkcontruable,
      archive: "",
      detailsReclamation: stDs,
    };

    // console.log(request);


    console.log(request);

    this.reclamationService.addReclamation(request).subscribe((data: any) => {

      (data) ? console.log('oaky') : console.log('error');

    });
  } 
  onCheckboxChanged(checked: boolean) {
    this.avecSurcisValue = checked ? 1 : 0;

    console.log(this.avecSurcisValue);
  }
  onCheckboxChangedOne(checked: boolean) {
    this.avecSurcisValueOne = checked ? 1 : 0;
    console.log(this.avecSurcisValueOne);
  }

 
  /**
    * Open modal
    * @param content modal content
    */
  openModal(content: any) {
    this.addModal = this.modalService.open(content, { size: 'xl' });
  }


 
  registreReclaration(detail, id_reclamation) {

    this.cont = detail;
    console.log(id_reclamation)

    this.reclamationService.getReclamationById(id_reclamation).subscribe((result: any) => {
        // this.datas = result.data
         this.nomAssujetti = result.data.raisonSocial;
          // this.typepersonne = result.data.type_pm;
          // this.nif = result.content.nif;
          this.adresseAssujetti = result.data.adresse;
          this.referenceCourrier = result.data.referenceCourrier;
          this.fkcontruable = result.data.id;
          this.nif = result.data.nif;
          this.etat = result.data.etat;
          this.numeroReclamation = result.data.numeroReclamation;
          this.typeReclamation = result.data.typeReclamation;
          this.detailReclamation = result.data.detailsReclamation;

        // this.traitementAdm = result.data.filter(item => item.typeReclamation===1)

         console.log(this.detailReclamation);
          // this.traitementJuri = result.data.filter(item => item.typeReclamation===0)
          this.validerTraitement();
          // console.log(this.detailReclamation);
     
    });
    this.addModal = this.modalService.open(detail, { size: 'xl' });
  }

  // 
  traitementDecisionAdministrative(trait, id)
  {

      this.reclamationService.getAllReclamationAdmin()


    this.addModal = this.modalService.open(trait, { size: 'xl' });
  } 

  visualation_all__data_traitement(valide: any, id: any)
  {
    this.cont = valide; 
    const montantControl = this.reclamationForm.get('montant') as FormControl;
    const valeur_data = this.detailReclamation_.find((i: any) => i.id === id);
    this.idDetailReclamation = valeur_data.id
    this.montantDu = valeur_data.montantDu;

    this.montantConteste = valeur_data.montantConteste;
    this.montantNonConteste = valeur_data.montantNonConteste 
    this.motifivationRecours = valeur_data.motifivationRecours 
    this.referenceTitrePerception = valeur_data.referenceTitrePerception 
    this.montantDecision = valeur_data.montantDecision,
    this.decisionRaclamation= valeur_data.decisionRaclamation 
    this.typeDocument = valeur_data.typeDocument
    this.fk_Reclamation_ = valeur_data.fk_Reclamation 
    this.motivationReclamation =  valeur_data.motivationReclamation, 
    this.fk_AgentTraitement = valeur_data.fk_AgentTraitement,
    this.devise = valeur_data.devise 
    this.selectedItem = valeur_data

    this.montantdecisionnel = this.selectedItem.montantDecision;
    // Ouvrir le modal pour afficher les valeurs
    this.addModal = this.modalService.open(valide, { size: "lg" });
    console.log( this.idDetailReclamation)

    montantControl.valueChanges.subscribe((value: any) => {
      console.log(value); // Affiche la valeur numérique tapée dans l'input montant
     
      this.montant_ = value;
    });
    this.montant_non_conteste_pay = (this.montantNonConteste * 10) / 100;
    montantControl.valueChanges.pipe(debounceTime(0)).subscribe(() => {
      // Effectuer le calcul ici en utilisant les deux valeurs
      if(this.montant_>=this.montantConteste)
      {
        this.reste_a_payer = "montant superieur";
        
      } else{
      this.reste_a_payer = this.montantConteste - this.montant_;
      this.montant_du = this.montantDu;
      this.montant_non_constesté = this.montantNonConteste
      // this.montant_non_conteste_pay = (this.montantConteste*10)/100
      console.log(this.reste_a_payer );}
    });
   
    
  } 
  
  selectionValue(value: any) {

    // this.traitement();
    this.valeur = value
    console.log(this.valeur)

    if (value == 'partiel') {

      this.valeurSelectionner = this.valeur
      console.log(this.valeurSelectionner)
      this.montantMoins = 40;

      this.aprescalcul = this.montantMoins - this.valeur_de_monant
      if (this.aprescalcul >= 0) {
        this.valeur_Valide = this.aprescalcul
      } else {
        this.valeur_Valide = 0;
      }
    } else if (value == 'total') {

      this.valeurSelectionner = this.valeur
      console.log(this.valeurSelectionner)
      this.montantMoins = 40;

      this.aprescalcul = this.montantMoins - this.valeur_de_monant
      console.log(this.valeur_de_monant)
    } else {
      console.log('rejet')
      this.valeurSelectionner = this.valeur

      this.montantMoins = 40;

      this.aprescalcul = this.montantMoins
    }
  }

  selectedOption: number =null;

  // traitement() {
  //   this.montant_du
  //   this.montantConteste
  //   this.reste_a_payer
  //   this.decision = this.reclamationForm.controls.selectedValue.value
  //   this.montant_non_conteste_pay
  //   console.log(this.montantDu)
  //   console.log(this.montant_non_constesté)
  //   console.log('10% du montant non conteste',this.montant_non_conteste_pay)
  //   console.log(this.reste_a_payer)
  //   console.log(this.decision)

  //   this.hideModal()

 
  // }

  // traitement()
  // {
  //   this.formControl = this.reclamationForm.get('reste').value
  //     this.decision = this.reclamationForm.get('selectedValue').value
      
  //     console.log(this.formControl)
  //     console.log(this.decision)

  //     this.hideModal()
  //     this.accessRowValuesValidation()
  // }

  accessRowValuesValidation() {
 
    const rest_a_payer = [];
    const decision1 = [];
    for (const formGroup of this.nouveau_formulaire) {
      const formControl = formGroup.get('reste')
      const decision = formGroup.get('selectedValue')
      

      rest_a_payer.push(formControl);
      decision1.push(decision)
    }

    this.value = rest_a_payer;
    this.decisions = decision1
    console.log(this.value);
    console.log(decision1)
    this.hideModal()
    this.ngOnDestroy()
  }
  // save()
  // {  
  //   const idDetailReclamation = this.detailReclamation_.id;

  //   // Rechercher l'élément correspondant à l'ID sélectionné
  //   const elementSelectionne = this.detailReclamation_.find(
  //     (item) => item.idDetailReclamation === idDetailReclamation
  //   );

  //   if (elementSelectionne) {
  //     // Récupérer toutes les informations liées à l'ID
  //     const montantConteste = this.montantConteste-this.reclamationForm.value.reste;
  //     const montantDu = elementSelectionne.montantDu;
  //     // Autres propriétés de l'élément...

  //     // Effectuer les étapes nécessaires avec les informations récupérées
  //     console.log("Montant contesté:", montantConteste);
  //     console.log("Montant dû:", montantDu);
  //     // ...

  //     // Réinitialiser les valeurs et fermer le modal
  //     this.montantConteste = "";
  //     this.montant.push(montantConteste)
  //     this.montdu.push(montantDu)
     
  //   }
  // }
  
  validerTraitement()
  {
    this.submitted = true; 
    const details: any = [];
  
    this.accessRowValuesValidation();
    for (let i = 0; i < this.detailReclamation_.length; i++) {
      const element = this.detailReclamation_[i];
      const v = this.value[i];
      // const decision = this.decisions[i];

      const value = {
        montantDu : element.montantDu, 
        decisionRaclamation: '' , 
        montantConteste: v,
        motifivationRecours: element.motifivationRecours,
        referenceTitrePerception: element.referenceTitrePerception, 
        montantNonConteste: element.montantNonConteste, 
        typeDocument: element.typeDocument,
        
        motivationReclamation: element.motivationReclamation,
        // montantDu: this.montantDu, 
        devise: element.devise, 
       
        etatValidation: 1,
        fkCompteBancaire: 2,
        fkBanque: "1",
      }
    //   };
     details.push(value);
    //   console.log(details);
    };
    // idReclamationSelectionnee 
     let stDs = details;
    const request = {
      observation: this.observation,
      referenceCourrier: this.referenceCourrier_,
      typeReclaration:this.typeReclamation_,
      // typeReclamation: this.reclamationForm.controls.typeReclamation.value,
      raisonSociale: this.raisonSocial_,
      adresse: this.adresseAssujetti_,
      agentCreate: this.uName,
      nif: this.nif__,
      fkcontribuable: this.fkcontribuable_,
      valueState:this.valueState_,
      detailsReclamation: stDs,
    };
    
    // console.log(request);
    console.log(request);

    // this.reclamationService.validationReclamation(request).subscribe((data: any) => {

    //   (data) ? console.log('oaky') : console.log('error');

    // });

    
  }
  onSelected()
  {
    console.log(this.selectedOption);
  }

  hideModal() {
    this.addModal.close();
  }

  hideModalEdit() {

    this.editModalEdit.close();
  }

  afficher_les_details_pour_valider(valid: any, details: any) {
    // this.afficher_valider = valid
    const detail_by_id_for_validate = this.list_reclamations.find(
      (reclamation: any) => reclamation.id === details
    );

    if (detail_by_id_for_validate) {
      this.idReclamationSelectionnee = detail_by_id_for_validate.id;
      this.observation_ = detail_by_id_for_validate.observation;
      this.agentCreate_ = detail_by_id_for_validate.fk_AgentCreat,
      this.raisonSocial_ = detail_by_id_for_validate.raisonSocial;
      this.referenceCourrier_ = detail_by_id_for_validate.referenceCourrier;
      this.fkcontribuable_ = detail_by_id_for_validate.id;
      this.valueState_ = detail_by_id_for_validate.etat;
      this.typeReclamation_ = detail_by_id_for_validate.typeReclaration;
      this.nif__ = detail_by_id_for_validate.nif;
      this.adresseAssujetti_ = detail_by_id_for_validate.adresse;
      this.detailReclamation_ = detail_by_id_for_validate.detailsReclamation;
      this.list_details_reclamations =
        detail_by_id_for_validate.detailsReclamation;
        this.list_data = detail_by_id_for_validate.detailsReclamation
      // console.log(this.idReclamationSelectionnee);
      // console.log(this.raisonSocial);
      console.log(this.detailReclamation_);

      this.detailReclamation_.forEach((item: any) => {
        const formGroup = this.builder.group({
         
          montantConteste:new FormControl(item.montantConteste),
          montantDu: new FormControl(item.montantDu),
        });
        
        this.nouveau_formulaire.push(formGroup); 
      });
     
      this.dtTrigger.next();
      console.log(detail_by_id_for_validate);
    }
    // afficherValidation
    // this.ngOnDestroy();
     this.modalService.open(valid, { size: "xl" });

  }
  ngOnDestroy(): void {
    var datatable = $('#datatableexample').DataTable();
    datatable.destroy();
  }




  validation_decision_administrative(valide:any, id_contribuable:any){
    this.cont = valide;

    const detail_by_id_for_validate = this.list_data.find(
      (reclamation: any) => reclamation.id === id_contribuable
    );
    // const donnee_de_validation = this.list_data.find((element:any)=>element.id === id_contribuable);
    if (detail_by_id_for_validate) {
      this.idReclamationSelectionnee = detail_by_id_for_validate.id;
      this.agentCreate_ = detail_by_id_for_validate.fk_AgentCreat,
      this.raisonSocial_ = detail_by_id_for_validate.raisonSocial;
      this.referenceCourrier_ = detail_by_id_for_validate.referenceCourrier;
      this.fkcontribuable_ = detail_by_id_for_validate.id;
      this.valueState_ = detail_by_id_for_validate.etat;
      this.typeReclamation_ = detail_by_id_for_validate.typeReclaration;
      this.nif__ = detail_by_id_for_validate.nif;
      this.adresseAssujetti_ = detail_by_id_for_validate.adresse;
      this.detailReclamation_ = detail_by_id_for_validate.detailsReclamation;
      this.list_details_reclamations = detail_by_id_for_validate.detailsReclamation;
      // console.log(this.idReclamationSelectionnee);
      console.log(this.raisonSocial_);
      console.log(this.detailReclamation_);

      this.detailReclamation_.forEach((item: any) => {
        const formGroup = this.builder.group({
          etat: new FormControl(item.etat), // Ajoutez d'autres contrôles si nécessaire
        });
        this.nouveau_formulaire.push(formGroup); // Ajoute le formGroup au tableau nouveau_formulaire
      });
     
      // this.dtTrigger.next();
      console.log(detail_by_id_for_validate);
    }
    console.log(this.list_details_reclamations)
   
    this.addModal = this.modalService.open(valide,{ size:'xl'});
}
onCheckboxChangedv(index: number) {
  const formGroup = this.nouveau_formulaire[index];
  const formControl = formGroup.get("etat");
  const value = formControl?.value;

  console.log(
    "Valeur de la case à cocher pour la ligne " + index + ": " + value
  );
  // Faites ce que vous devez faire avec la valeur récupérée...
} 

accessRowValuesValidationv() {
  const etatValidation = [];
  for (const formGroup of this.nouveau_formulaire) {
    const formControl = formGroup.get("etat");
    const value = formControl?.value ? 1 : 0;

    etatValidation.push(value);
  }
   
  this.value = etatValidation;
  console.log(this.value);
}
valider_reclamation(): void {
  const details: any[] = [];
  this.accessRowValuesValidationv();
  for (let i = 0; i < this.detailReclamation_.length; i++) {
    const element = this.detailReclamation_[i];
    const v = this.value[i];

    const item = {

      idDetailReclamation: element.fk_Reclamation, 
      fkBanque: 1, 
      fkCompteBancaire: 2,
      montantConteste: element.montantConteste,
      motifivationRecours: element.motifivationRecours,
      referenceTitre: element.referenceTitrePerception,
      montantNonConteste: element.montantNonConteste,
      // montantConteste : element.montantConteste,
      intituleActeGenerateur: element.intituleActeGenerateur,
      typedocument: element.typeDocument,
      etatValidation: v,
      motivationReclamation: element.motivationReclamation,
      montantDu: element.montantDu,
      devise: element.devise,
      // avecSurcis: 1,
      // id: element.id,
      // Ajoutez d'autres propriétés à extraire de chaque élément selon vos besoins
    };
    details.push(item);
  }

  let stDs = details;

   const valeur = this.value
   const stateValue = valeur.includes(1) ? 1 : 0 ; 
  
  const request = {
    observation: this.reclamationForm.controls.observation.value,

    raisonSociale: this.raisonSocial_,
    idReclamation: this.idReclamationSelectionnee,
    nif: this.nif__, 
    referenceCourrier: this.referenceCourrier_, 
    adresse: this.adresseAssujetti_,
    fkcontribuable: this.fkcontribuable_, 
    agentMaj: this.uName,
    valueState: stateValue, 
    titrePerceptionList: stDs,
  };

  console.log(request);
  // this.reclamationService.validation_reclamation(request).subscribe((data:any)=>{

  //   if(data.code === 404)
  //   {
  //     Swal.fire({
  //       position: "center",
  //       icon: "warning",
  //       title: "Echec de l'enregistrement",
  //       showConfirmButton: false,
  //       timer: 3000,
  //     });
  //   } else {
  //     // Autre type de message, enregistrement réussi
  //     Swal.fire({
  //       position: "center",
  //       icon: "success",
  //       title: "Enregistrement effectué avec succès",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });
  //     this.ngOnDestroy();

  //     this.reclamationForm.reset({});
  //       this.submitted = false;
  //       this.hideModal();
  //       this.getAlldata();
  //   }

  // });
}


validerModal() {

  console.log(this.montantDecision)
  this.detailReclamation_
  
this.hideModal()

}

saveAll() {
  const details = [] 
  const jsonData = JSON.stringify(this.selectedItem);
  console.log('JSON:', jsonData);

  const toutesLesValeurs = this.detailReclamation_.map(item => {
    // return {
    //   id: item.id,
    //   valeur1: item.montantDu,
     
    // };
    return {

      idDetailReclamation: item.fk_Reclamation, 
      fkBanque: 1, 
      fkCompteBancaire: 2,
      montantConteste: item.montantConteste,
      montantDecision: item.montantDecision,
      motifivationRecours: item.motifivationRecours,
      referenceTitre: item.referenceTitrePerception,
      montantNonConteste: item.montantNonConteste,
      // montantConteste : element.montantConteste,
      intituleActeGenerateur: item.intituleActeGenerateur,
      typedocument: item.typeDocument,
      etatValidation: item.etatValidation,
      motivationReclamation: item.motivationReclamation,
      montantDu: item.montantDu,
      devise: item.devise,
      // avecSurcis: 1,
      // id: element.id,
      // Ajoutez d'autres propriétés à extraire de chaque élément selon vos besoins
    };

  });

  // details.push(toutesLesValeurs);
  // console.log(details)

  let stDs = toutesLesValeurs;

  // const valeur = this.value
  // const stateValue = valeur.includes(1) ? 1 : 0 ; 
 
 const request = {
   observation: this.reclamationForm.controls.observation.value,

   raisonSociale: this.raisonSocial_,
   idReclamation: this.idReclamationSelectionnee,
   nif: this.nif__, 
   referenceCourrier: this.referenceCourrier_, 
   adresse: this.adresseAssujetti_,
   fkcontribuable: this.fkcontribuable_, 
   agentMaj: this.uName,
   valueState: 1, 
   titrePerceptionList: stDs,
 };

 console.log(request);
  
}
}
