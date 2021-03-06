import { Component, OnInit } from '@angular/core';
import { RequestService } from '../../services/request-service/request.service';
import { DataSyncService } from '../../services/datasync-service/data-sync.service';
import { ChartsModule, Color } from 'ng2-charts';
import { UserService } from '../../services/user-service/user.service';
import { AssociateService } from '../../services/associate-service/associate.service';
import { ClientService } from '../../services/client-service/client.service';
import { BatchService } from '../../services/batch-service/batch.service';


import { Router } from '@angular/router';
import { ThemeConstants } from '../../constants/theme.constants';
import { ChartOptions } from '../../models/ng2-charts-options.model';
import '../../constants/selected-status.constants';
import { SelectedStatusConstants } from '../../constants/selected-status.constants';
import { Associate } from '../../models/associate.model';

/**
 * What is this for???
 */
const MONTHS_3 = 788923800;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  private associates: Associate[];
  private associate: Associate;


  //Message from the back-end
  dbMessage: string;
  myStatus: string;
  username: string;
  labels = [];
  data = [];
  amountType: any;

  //Variables for chart settings
  undeployedLabels = SelectedStatusConstants.UNDEPLOYED_LABELS;
  mappedLabels = SelectedStatusConstants.MAPPED_LABELS;
  unmappedLabels = SelectedStatusConstants.UNMAPPED_LABELS;
  deployedLabels = SelectedStatusConstants.DEPLOYED_LABELS;

  mappedColors: Array<Color> = ThemeConstants.MAPPED_COLORS;
  clientColors: Array<Color> = ThemeConstants.CLIENT_COLORS;
  skillColors: Array<Color> = ThemeConstants.SKILL_COLORS;

  deployedChartType = "pie";
  undeployedChartType = "pie";
  mappedChartType = "pie";
  unmappedChartType = "pie";

  // private options = ChartOptions.createOptionsLegend('right');

  unmappedOptions = ChartOptions.createOptionsTitle('Unmapped', 24, '#121212', 'right');
  mappedOptions = ChartOptions.createOptionsTitle('Mapped', 24, '#121212', 'right');
  deployedOptions = ChartOptions.createOptionsTitle('Mapped vs. Unmapped (Deployed)', 24, '#121212', 'right');
  undeployedOptions = ChartOptions.createOptionsTitle('Mapped vs. Unmapped (Not Deployed)', 24, '#121212', 'right');
  //end of chart settings

  // populate with dummy data to enable chart labels by default
  private undeployedData: number[] = [0, 0];
  private deployedData: number[] = [0, 0];
  private mappedData: number[] = [0, 0, 0, 0];
  private unmappedData: number[] = [0, 0, 0, 0];


  /**
    *@param {RequestService} rs
    * Service for handling requests to the back-end
    *
    *@param {DataSyncService} ds
    * Experimental service with BehaviorSubject
    * BehaviorSubject allows for real-time update of charts
    * Not fully implemented, so it is un-used
    *
    *@param {Router} router
    * Allows for re-direction to other components
    */
  constructor(
    private rs: RequestService,
    // private ds: DataSyncService,
    private router: Router
  ) { }

  ngOnInit() {
    this.load();
  }

  load() {
    // this.associateService.getAllAssociates().subscribe(response => {
      // this.associates = response;
      this.associates = <Associate[]> JSON.parse(localStorage.getItem('currentAssociates'));
      let trainingMapped = 0;
      let trainingUnmapped = 0;
      let reservedMapped = 0;
      let openUnmapped = 0;
      let selectedMapped = 0;
      let selectedUnmapped = 0;
      let confirmedMapped = 0;
      let confirmedUnmapped = 0;
      let deployedMapped = 0;
      let deployedUnmapped = 0;
      for (let i = 0; i < this.associates.length; i++) {
        // iterate over associates and aggregate totals
        const associate = this.associates[i];
        if (associate.marketingStatus !== null) {
          // if (associate.marketingStatus !== null || (associate.marketingStatus.id < 6 && associate.client === null)) {
            const status = associate.marketingStatus.id;
          switch (status) {
            case 1: trainingMapped++; break;
            case 2: reservedMapped++; break;
            case 3: selectedMapped++; break;
            case 4: confirmedMapped++; break;
            case 5: deployedMapped++; break;
            case 6: trainingUnmapped++; break;
            case 7: openUnmapped++; break;
            case 8: selectedUnmapped++; break;
            case 9: confirmedUnmapped++; break;
            case 10: deployedUnmapped++; break;
          }
        }
      }


      /**
       * @member {Array} UndeployedData
       * @description UndeployedData is an array used to populate the
       * dataset of the Undeployed chart. The dataset contains two numbers:
       * the mapped number is the sum of all mapped associates, the unmapped number
       * is the sum of all unmapped associates.
       */
      const undeployedArr: number[] = [trainingMapped
        + reservedMapped + selectedMapped + confirmedMapped,
      trainingUnmapped + openUnmapped + selectedUnmapped + confirmedUnmapped];

      this.undeployedData = undeployedArr;
      localStorage.setItem('undeployedData', JSON.stringify(this.undeployedData))

      /**
       * @member {Array} MappedData
       * @description MappedData is an array that stores the
       * data for the dataset of the Mapped chart.
       * The dataset contains four numbers: <br>
       * training mapped <br>
       * reserved mapped <br>
       * selected mapped <br>
       * confirmed mapped<br>
       */
      const mappedArr: number[] = [trainingMapped, reservedMapped, selectedMapped, confirmedMapped];

      this.mappedData = mappedArr;
      localStorage.setItem('mappedData', JSON.stringify(this.mappedData))

      /**
       * @member {Array} UnmappedData
       * @description UnmappedData is an array that stores the
       * data for the dataset of the Unmapped chart.
       * The dataset contains four numbers: <br>
       * training unmapped <br>
       * open unmapped <br>
       * selected unmapped <br>
       * confirmed unmapped<br>
       */
      const unmappedArr: number[] = [trainingUnmapped, openUnmapped, selectedUnmapped, confirmedUnmapped];

      this.unmappedData = unmappedArr;
      localStorage.setItem('unmappedData', JSON.stringify(this.unmappedData))

      /**
       * @member {Array} DeployedData
       * @description DeployedData is an array used to populate the
       * dataset of the Deployed chart. The dataset contains two numbers:
       * the mapped number is the sum of all mapped associates, the unmapped number
       * is the sum of all unmapped associates. Both numbers contain only deployed associates.
       */
      const deployedArr = [deployedMapped, deployedUnmapped];

      this.deployedData = deployedArr;
      localStorage.setItem('deployedData', JSON.stringify(this.deployedData))
    // });
  }

  /**
   * @function MappedOnClick
   * @description When the "Mapped" chart is clicked
   * the global variable selectedStatus is
   * set to the label of the slice
   * clicked.
   */
  mappedOnClick(evt: any) {
    if (evt.active[0] !== undefined) {
      //navigate to client-mapped component
      this.router.navigate([`client-mapped/${evt.active[0]._index}`]);
    }
  };

  /**
   * @function UnmappedOnClick
   * @description When the "Unmapped" chart is clicked
   * the global variable selectedStatus is
   * set to the label of the slice
   * clicked.
   */
  unmappedOnClick(evt: any) {
    if (evt.active[0] !== undefined) {
      //navigate to skillset component
      this.router.navigate([`skillset/${evt.active[0]._index}`]);
    }
  }

  deployedOnClick(evt: any) {
    if (evt.active[0] !== undefined) {
      //navigate to skillset component
      this.router.navigate([`deployed/${evt.active[0]._index}`]);
    }
  }

  undeployedOnClick(evt: any) {
    if (evt.active[0] !== undefined) {
      //navigate to skillset component
      this.router.navigate([`undeployed/${evt.active[0]._index}`]);
    }
  }


  public getUndeployedData(): number[] {
    return this.undeployedData;
  }

  public getDeployedData(): number[] {
    return this.deployedData;
  }

  public getMappedData(): number[] {
    return this.mappedData;
  }

  public getUnmappedData(): number[] {
    return this.unmappedData;
  }

  /////////////////////////////////////////////////////////////
  // THESE FUNCTIONS ARE BEING CALLED SOMEWHERE
  // THEY SHOULD NOT BE CALLED BECUASE THERE IS NO RESOURCE SERVER SIDE
  // FOR THE SERVICES TO ACCESS (NO END POINTS)
  // But we do need to keep them for eventual SalesForce integration
  //
  // /**
  //  * @function populateDB
  //  * @description Populates the database with information from
  //  *              data script
  //  */
  // populateDB() {
  //   this.rs.populateDB().subscribe(response => {
  //     this.load();
  //   }, err => {
  //   });
  // }
  //
  // /**
  //  * @function deleteDB
  //  * @description Truncates all the tables in the database
  //  */
  // deleteDB() {
  //   this.rs.deleteDB().subscribe(response => {
  //     this.load();
  //   }, err => {
  //   })
  // }
  //
  // /**
  //  * @function populateDBSF
  //  * @description SF Populates the database with information
  //  *              from data script
  //  * For Salesforce data integration
  //  */
  // populateDBSF() {
  //   this.rs.populateDBSF().subscribe(response => {
  //     this.load();
  //   }, err => {
  //   });
  // }
  ////////////////////////////////////////////////////////////////

}
