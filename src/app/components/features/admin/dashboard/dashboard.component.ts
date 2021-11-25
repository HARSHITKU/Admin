import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { CharityService } from '../charity/charity.service';
import { InnovationService } from '../innovation/innovation.service';
import { OrdersService } from '../orders/orders.service';
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
  totalOrders: any;
  columnDefsCharity: any;
  columnDefsOrder: any;
  constructor(
    private dashboardService: DashboardService,
    private usersService: UsersService,
    private charityService: CharityService,
    private innovationService: InnovationService,
    private ordersService: OrdersService
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
        maxWidth: 160,
        minWidth: 160,
        tooltipField: 'description',
      },
      {
        headerName: 'Earned',
        field: 'earnedChips',
        maxWidth: 100,
        tooltipField: 'earnedChips',
      },
      {
        headerName: 'Status',
        field: 'status',
        maxWidth: 100,
        tooltipField: 'status',
      },
      {
        headerName: 'Verified?',
        field: 'isVerified',
        maxWidth: 100,
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
        maxWidth: 100,
        tooltipField: 'earnedChips',
      },
      {
        headerName: 'Kid Name',
        field: 'kidName',
        maxWidth: 200,
        tooltipField: 'kidName',
      },
      {
        headerName: 'Age',
        field: 'age',
        maxWidth: 80,
        tooltipField: 'age',
      },
      {
        headerName: 'Verified?',
        field: 'isVerified',
        maxWidth: 100,
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
   }

   


  ngOnInit(): void {
    this.getCharities();
    this.getCharitys()
    this.getInnovations()

    this.usersService.getUserListData().subscribe(item => {
      this.totalUser = item.data.length;
    });
    this.charityService.getCharityListData().subscribe(item => {
      this.totalCharity = item.data.length;
    });
    this.ordersService.getAllOrders().subscribe(item => {
      this.totalOrders = item.data.length;
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
            ).getMonth() + 1}-${new Date(user.dateOfBirth).getFullYear()}`,
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

  


