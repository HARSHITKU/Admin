import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { CharityService } from '../charity/charity.service';
import { InnovationService } from '../innovation/innovation.service';
import { RedeemService } from '../redeem/redeem.service';
import { UsersService } from '../users/users.service';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users: any[] | undefined;
  updatedUsers: any[] | undefined;
  redeems: any[] | undefined;
  updatedRedeems: any[] | undefined;
  innovations: any[] | undefined;
  updatedInnovations: any[] | undefined;
  charities: any[] | undefined;
  updatedCharities: any[] | undefined;
  columnDefsUser: any;
  columnDefsInnovation: any;
  gridOptions: GridOptions;
  totalUser: any;
  totalCharity: any;
  totalInnovation: any;
  totalRedeems: any;
  columnDefsCharity: any;
  columnDefsOrder: any;
  constructor(
    private dashboardService: DashboardService,
    private usersService: UsersService,
    private charityService: CharityService,
    private redeemService: RedeemService,
    private innovationService: InnovationService,
    ) { 
    this.columnDefsUser = [
      {
        headerName: 'Img',
        field: 'profileImage',
        maxWidth: 100,
        cellRenderer :function(param: any){
          return `<img src="${param.value}" alt="Default.img" width="20">`
        }
      },
      {
        headerName: 'Name',
        field: 'name',
        maxWidth: 200,
        tooltipField: 'name',
      },
      {
        headerName: 'Email Id',
        field: 'email',
        maxWidth: 200,
        tooltipField: 'email',
      },
      {
        headerName: 'Phone',
        field: 'phone',
        maxWidth: 130,
        tooltipField: 'phone',
      },
      {
        headerName: 'Date of Birth',
        field: 'displayDOB',
        maxWidth: 120,
        tooltipField: 'displayDOB',
      },
      {
        headerName: 'Address',
        field: 'address',
        maxWidth: 200,
        tooltipField: 'address',
      },
      {
        headerName: 'City',
        field: 'city',
        maxWidth: 120,
        tooltipField: 'city',
      },
      {
        headerName: 'State',
        field: 'state',
        maxWidth: 120,
        tooltipField: 'state',
      },
      {
        headerName: 'Country',
        field: 'country',
        maxWidth: 100,
        tooltipField: 'country',
      }
    ];
    this.gridOptions = <GridOptions>{
      headerHeight: window.innerWidth <= 1024 ? 88 : 30,
    };

    this.columnDefsCharity = [
      {
        headerName: 'Name',
        field: 'name',
        maxWidth: 150,
        tooltipField: 'name',
      },
      {
        headerName: 'Description',
        field: 'description',
        maxWidth: 150,
        minWidth: 150,
        tooltipField: 'description',
      },
      {
        headerName: 'Earned',
        field: 'earnedChips',
        maxWidth: 150,
        tooltipField: 'earnedChips',
      },
      {
        headerName: 'Status',
        field: 'status',
        maxWidth: 150,
        tooltipField: 'status',
      },
      {
        headerName: 'Verified?',
        field: 'isVerified',
        maxWidth: 150,
        tooltipField: 'isVerified',
      },
    ];

    this.columnDefsInnovation = [
      {
        headerName: 'Name',
        field: 'name',
        maxWidth: 200,
        tooltipField: 'name',
      },
      {
        headerName: 'Description',
        field: 'description',
        maxWidth: 200,
        minWidth: 200,
        tooltipField: 'description',
      },
      {
        headerName: 'Earned',
        field: 'earnedChips',
        maxWidth: 130,
        tooltipField: 'earnedChips',
      },
      {
        headerName: 'Kid Name',
        field: 'kidName',
        maxWidth: 200,
        tooltipField: 'kidName',
      },
      {
        headerName: 'Kid Age',
        field: 'age',
        maxWidth: 130,
        tooltipField: 'age',
      },
      {
        headerName: 'Verified?',
        field: 'isVerified',
        maxWidth: 120,
        tooltipField: 'isVerified',
        cellRenderer: function (e: any) {
          if(e.value === 'true'){
            return 'Yes'
          }else {
            return 'No'
          }
        }
      }
    ];

    this.columnDefsOrder = [
      {
        headerName: 'Product Image',
        field: 'productImage',
        maxWidth: 130,
        cellRenderer: function (param: any) {
          return `<img src="${param.value}" alt="Default.img" width="20">`;
        },
      },
      {
        headerName: 'Product Name',
        field: 'productName',
        minWidth: 150,
        tooltipField: 'productName',
      },
      {
        headerName: 'Product Description',
        field: 'productDescription',
        minWidth: 150,
        tooltipField: 'productDescription',
      },
      {
        headerName: 'Product Category',
        field: 'productCategory',
        minWidth: 150,
        tooltipField: 'productCategory',
      },
      {
        headerName: 'Chips',
        field: 'amount',
        width: 80,
        tooltipField: 'amount',
      },
      {
        headerName: 'Quantity',
        field: 'quantity',
        width: 100,
        tooltipField: 'quantity',
      },
      {
        headerName: 'Status',
        field: 'status',
        width: 100,
        tooltipField: 'status',
      },
      {
        headerName: 'Order Date',
        field: 'time',
        minWidth: 20,
        tooltipField: 'time',
      },
      {
        headerName: 'Customer Name',
        field: 'userName',
        minWidth: 120,
        tooltipField: 'userName',
      },
      {
        headerName: 'Customer Email',
        field: 'userEmail',
        minWidth: 150,
        tooltipField: 'userEmail',
      },
      {
        headerName: 'Customer Contact No.',
        field: 'contact',
        minWidth: 150,
        tooltipField: 'contact',
      },
      {
        headerName: 'Customer Address',
        field: 'fullAddress',
        minWidth: 150,
        tooltipField: 'fullAddress',
      },
      {
        headerName: '',
        field: 'view',
        cellRenderer: function () {
          return ' <i class="fa fa-eye" aria-hidden="true"></i>';
        },
        maxWidth: 50,
      },
      {
        headerName: '',
        field: 'edit',
        cellRenderer: function () {
          return ' <i class="fa fa-edit" aria-hidden="true"></i>';
        },
        maxWidth: 50,
      },
      {
        headerName: '',
        field: 'delete',
        cellRenderer: function () {
          return '<i class="fa fa-trash" aria-hidden="true"></i>';
        },
        maxWidth: 50,
      },
    ];

   }

   


  ngOnInit(): void {
    this.getCharities();
    this.getRedeems()
    this.getCharitys()
    this.getInnovations()

    this.usersService.getUserListData().subscribe(item => {
      this.totalUser = item.data.length;
    });
    this.charityService.getCharityListData().subscribe(item => {
      this.totalCharity = item.data.length;
    });
    this.redeemService.getAllRedeem().subscribe(item => {
      this.totalRedeems = item.data.length;
    })
    this.innovationService.getInnovationListData().subscribe(item => {
      this.totalInnovation = item.data.length;
    })
  }

  getCharities() {
    this.dashboardService.getRecentUsers().subscribe((response) => {
      if (response) {
        this.users = response.data;
        this.updatedUsers = this.users?.map((user) => {
          return {
            name: `${user.firstName} ${user.lastName}`,
            firstName: user.firstName,
            lastName: user.lastName,
            email: `${user.email}`,
            phone: `${user.phone}`,
            displayDOB: `${new Date(user.dateOfBirth).getDate()}-${new Date(
              user.dateOfBirth
            ).getMonth()}-${new Date(user.dateOfBirth).getFullYear()}`,
            dateOfBirth: `${user.dateOfBirth}`,
            address: `${user.addresses[0]?.landmark} ${user.addresses[0]?.address}`,
            landmark: user.addresses[0]?.landmark,
            pinCode: user.addresses[0]?.pinCode,
            city: `${user.addresses[0]?.city}`,
            state: `${user.addresses[0]?.state}`,
            country: `${user.addresses[0]?.country}`,
            id: `${user._id}`,
            profileImage : `${user.profileImage}`
            };
        });
      }
    });
  }

  getRedeems() {
    this.dashboardService.getRecentRedeems().subscribe((redeems) => {
      if(redeems) {
        this.redeems = redeems.data;
        this.updatedRedeems = this.redeems?.map((redeem) => {
          return {

          }
        })
      }
    })
  }

  getCharitys() {
    this.charityService.getCharityListData().subscribe((response) => {
      if (response) {
        this.charities = response.data;
        this.updatedCharities = this.charities?.map((charity) => {
          return {
            name: `${charity.name}`,
            earnedChips: `${charity.earnedChips}`,
            isVerified: `${charity.isVerified}`,
            userId: `${charity.userId}`,
            coverImage: `${charity.coverImage}`,
            description: `${charity.description}`,
            status: `${charity.status}`,
          };
        });
      }
    });
  }

  getInnovations() {
    this.innovationService.getInnovationListData().subscribe((response) => {
      if (response) {
        this.innovations = response.data;
        this.updatedInnovations = this.innovations?.map((innovation) => {
          return {
            name: `${innovation.name}`,
            earnedChips: `${innovation.earnedChips}`,
            isVerified: `${innovation.isVerified}`,
            kidName: `${innovation.kidName}`,
            age: `${innovation.age}`,
            userId: `${innovation.userId}`,
            coverImage: `${innovation.coverImage}`,
            description: `${innovation.description}`,
          };
        });
      }
    });
  }

}

  


