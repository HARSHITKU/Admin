import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';
import { SponsorsService } from './sponsors.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';


@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit {

  sponsors: any;
  baseURL: string = '';
  file: any;

  isLoading: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private sponsorService: SponsorsService,
    private CommonService: CommonService,
    private _snackBar: MatSnackBar,
    ) {}

  ngOnInit(): void {
    this.baseURL = this.CommonService.base_URL;
    this.sponsorService.getSponsors().subscribe((res => {
      this.sponsors = res.data;
    }))
  }

  sponsorForm = new FormGroup({
    name: new FormControl(''),
    sponsorImage: new FormControl(''),
  });


  addSponsor(sponsorDetails: any) {
    this.isLoading = true;
    console.log(sponsorDetails)
    this.sponsorService.createSponsors(sponsorDetails).subscribe((response) => {
      if (response) {
        this.isLoading = false;
        this.openSnackBar('Sponsor Created Successfully');
      }
    },err => {
      this.isLoading = false;
      this.openSnackBar(err.error.message);
    });
  }

  readFile(fileEvent: any) {
    this.file =  fileEvent.target.files[0].name;
    console.log(this.file)
 }

  deleteSponsor(e:any){
    this.sponsorService.deleteSponsor(e).subscribe(response =>{
      if(response){
        this.openSnackBar('Successfully deleted!');
      }
    })
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 3000
    });
  }

}
