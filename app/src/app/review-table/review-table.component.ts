import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review-table',
  templateUrl: './review-table.component.html',
  styleUrls: ['./review-table.component.scss']
})

export class ReviewTableComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.feedTable();
  }

  key: any;
  dummyJson: any;
  
  feedTable(){
    this.dummyJson = [
      {
      "FormName": "Consultant 1",
      "Cycle": "Annual 2020",
      "TargetDate": "9-03-2020",
      "Status": "Closed"
    },
    {
      "FormName": "Consultant 2",
      "Cycle": "Annual 2021",
      "TargetDate": "9-03-2021",
      "Status": "Closed"
    },
    {
      "FormName": "Associate 1",
      "Cycle": "Annual 2022",
      "TargetDate": "9-03-2022",
      "Status": "QAer Pending"
    },
    {
      "FormName": "Associate 2",
      "Cycle": "Annual 2023",
      "TargetDate": "9-03-2023",
      "Status": "Self Review"
    }
  ]
  
    this.key = Object.keys(this.dummyJson[0]);
    console.log(this.key);
  }
  
}
