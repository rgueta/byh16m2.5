import { Component, OnInit } from '@angular/core';
import { ModalController,AlertController, isPlatform, 
  ToastController, LoadingController} from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
// import { Contact } from "@capacitor-community/contacts";
import { Contact } from "../../phone-contact";
import { Plugins } from "@capacitor/core";

const { Contacts } = Plugins;

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
    this.loadContacts();
    this.basicLoader();
  }

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
        
        Contacts.getContacts().then(async result => {
          const phoneContacts: [Contact] = await result.contacts;
          this.contacts = await of(phoneContacts);
        })

        }catch(e){
          console.log('Error to get permissions --> ', e);
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
