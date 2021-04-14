import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { Contact } from '../../model/contacts.model';  
import { ContactService } from '../../service/contact.service';
// import { Contact, ContactService } from '../../../career-module' 
@Component({
  selector: 'app-contact-show',
  templateUrl: './contact-show.component.html',
  styleUrls: ['./contact-show.component.scss']
})
export class ContactShowComponent implements OnInit {

  constructor(private service:ContactService, private route:ActivatedRoute, private router:Router) {}

  displayForm:boolean=false;
  personDetails:Contact;
  personDetailsStatus:boolean;

  delete(id:string){
    
    let x:any = this.service.deletePersonDetails(id);     
    this.personDetails = x[0];
    this.personDetailsStatus = x[1];
    if(!this.personDetailsStatus){
      this.router.navigateByUrl('/home')
    }else{
      this.router.navigate(['/home',this.personDetails.id]);
    }
  }

  edit(){
    this.router.navigate(['home/edit',this.personDetails.id]);
  }

  addressArray:string[];
  lastAddress:string;
  wrongId:string = "false";

  ngOnInit(): void {

    var id:string;
    id = this.route.snapshot.paramMap.get("id");
    if(id!=null){
      this.updateContact(id);
    } 
    this.router.events.subscribe((val) =>{
      if(val instanceof NavigationEnd){
        id = this.route.snapshot.paramMap.get("id");
        this.updateContact(id);
      } 
    })
  }

  updateContact(id:string){
      let x:any =  this.service.getPersonDetials(id);
      this.personDetails = x[0];
      this.personDetailsStatus = x[1];
      if(this.personDetails!=undefined){
        this.addressArray = this.personDetails.address.split(',');
        this.lastAddress = this.addressArray[this.addressArray.length-1];  
      }
  }
}

