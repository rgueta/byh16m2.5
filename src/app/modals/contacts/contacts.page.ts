import { Component, OnInit } from '@angular/core';
import { ModalController,AlertController, isPlatform, 
  ToastController, LoadingController} from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
// import { Contact } from "@capacitor-community/contacts";
import { Contact } from "../../phone-contact";
import { Plugins } from "@capacitor/core";

const { Contacts } = Plugins;


// const retrieveListOfContacts = async () => {
//   const projection = {
//     // Specify which fields should be retrieved.
//     name: true,
//     phones: true,
//     postalAddresses: true,
//   };

//   const result = await Contacts.getContacts({
//     projection,
//   });
// };

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {
  myToast : any;
  // contacts = [];
  contacts: Observable<Contact[]>;
  contact = {};
  constructor(private modalController : ModalController,
              private loadingController : LoadingController,
              private toast: ToastController,) {
   }

  async ngOnInit() {

    // Contacts.getPermissions().then(perm => {
    //   console.log('Permissions -->', perm)
    // });
    this.loadContacts();
    this.basicLoader();
    // const projection = {
    //   name : true,
    // };

    // console.log('projection name --> ', projection)

    // Contacts.getContacts().then(result =>{
    //   console.log('contacts result -->',result)
    // })
  }

  // async getPermissions(): Promise<void>{
  //   console.log('getting permissions')
  //   Contacts.getPermissions();
  // }


  async loadContacts(){
    if(isPlatform('android')){
      try{
        await Contacts.getPermissions().then(response => {
          if (!response.granted){
            console.log('No permission granted...!');
            // await loading.dismiss(); 
            return
          }
        });

        // const permission = await Contacts.getPermissions();
        // console.log('isPlatform android after  Contacts.getPermissions ------ !');
        // if(!permission.granted){
        //   console.log('No permission granted...!');
        //   // await loading.dismiss(); 
        //   return
        // }

        Contacts.getContacts().then(async result => {
          const phoneContacts: [Contact] = await result.contacts;
          this.contacts = await of(phoneContacts);
        })

        }catch(e){
          console.log('Error to get permissions --> ', e);
      }
    }
  }

  async loadContacts_(){
    // const loading = await this.loadingController.create({
    //   cssClass:'loader-css-class',
    //   backdropDismiss:true
    // });
    // await loading.present();
    
    if(isPlatform('android')){
      try{
        
        const res = await Contacts.getPermissions();
        console.log('getPermissions -->', res)
        await Contacts.getPermissions().then(async (result) => {
          console.log('Si entre ..')
          if (!result.granted){
            this.toastEvent('No permission granted...!');
            return
          }else{
            console.log('Si hay permisos en contactos')
          }
        });
            
        Contacts.getContacts().then(async result => {
          console.log('Contacts result --> ',result);
          // this.contacts = result.Contacts
          // const phoneContacts: [Contact] = await result.contacts;
          // this.contacts = await of(phoneContacts);
          // await loading.dismiss();
        })

        }catch(e){
          this.toastEvent('Error to get permissions --> ' + e);
      }
    }
  }

  basicLoader() {
    this.loadingController.create({
        message: 'Please wait...',
        duration: 3000,
        translucent: true
    }).then((res) => {
        res.present();
    });
}

  async onClickContact(Contact){
    this.contact = Contact;
    this.closeModal();
  }

  closeModal(){
    this.modalController.dismiss(this.contact);
  }

  // -------   toast control alerts    ---------------------
  toastEvent(msg){
    this.myToast = this.toast.create({
      message:msg,
      duration:2000
    }).then((toastData) =>{
      console.log(toastData);
      toastData.present();
    });
  }

}
