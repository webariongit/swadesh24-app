import { ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  CopyInputText:string = "https://swadesh24.com";
  constructor(
    // private clipboard: Clipboard
    private router:Router
  ) { }

  ngOnInit() {

  }

  copyString(){
    // this.clipboard.copy(this.CopyInputText)
  }

  gotoPage(page:any){
    this.router.navigate([page])
  }

}
