import { Component, OnInit, ViewChild, Inject , LOCALE_ID,QueryList, ViewChildren } from '@angular/core';
import {NgCalendarModule} from 'ionic2-calendar'; // remeber to add the NgCalendarModule in the calendar.module.ts or else you will get an error.
import {CalendarComponent} from 'ionic2-calendar/calendar';
import { format } from 'url';
import { formatDate } from '@angular/common';
import { AlertController } from '@ionic/angular';





@Component({
  selector: 'app-calender',
  templateUrl: './calender.page.html',
  styleUrls: ['./calender.page.scss'],
})
export class CalenderPage implements OnInit {
  [x: string]: any;
  collapseCard = false;

event = {

  title: '',
  desc: '',
  startTime: '',
  endtime: '',
  allDay: false
};

minDate = new Date().toISOString();



  eventSource = [];

  calendar = {

    mode:'month',
    currentDate:new Date()
  }

  viewTitle = '';

  @ViewChildren ('myCal') calender :QueryList<CalendarComponent>;

  constructor(private alertCtrl: AlertController,@Inject(LOCALE_ID)private locale:string) { }

  ngOnInit() {

    this.resetEvent();
  }


  resetEvent(){

    this.event = {
      title: '',
      desc :  '',
      startTime: new Date().toISOString(),
      endtime: new Date().toISOString(),
      allDay:false
    };
  }
  
  addEvent(){
    let eventCopy = {
      title: this.event.title,
      startTime: new Date(this.event.startTime),
      endTime: new Date(this.event.endtime),
      allDay : this.event.allDay,
      desc: this.event.desc

  }
  if (eventCopy.allDay){

    let start = eventCopy.startTime;
    let end =  eventCopy.endTime;
  
    eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(),start.getUTCMonth(),start.getUTCDate()));
    eventCopy.endTime = new Date (end.getUTCFullYear(), end.getUTCMonth(),end.getUTCDate()+ 1);
  }
this.eventSource.push(eventCopy);
this.myCal.loadEvents();
this.resetEvent();
  }

  changeMode(mode){
this.calendar.mode = mode;

  }

  back () {
    var swiper =  document.querySelector('.swiper-container') ['swiper'];
    swiper.sliderPrev();

  }

  next(){
var swiper = document.querySelector('.swiper-container')['swiper'];
swiper.slideNext();

  }
today(){

  this.calendar.currentDate = new Date();
}
 async onEventSelected(event){
    let start = formatDate(event.startTime,'medium',this.locale);
    let end =  formatDate(event.endtime,'medium',this.locale);


    const alert =  await this.alertCtrl.create({

      header: event.title,
      subHeader: event.desc,
      message: 'From:' + start+ '<br><br>To:' + end,
      buttons: ['OK']
    })
    alert.present();

  }


  onViewTitleChanged(title){
   title.viewTitle = title;

  }

  onTimeSelected(ev){
  let selected = new Date (ev.selectedTime);
  this.event.startTime = selected.toISOString();
  selected.setHours(selected.getHours()+ 1);
  this.event.endtime = (selected.toISOString());

  }
  items = [ 
    {
      name: 'Dashboard ',
      page: '/dashboard',
      open :'',
      icon:'home'
    },

    {
    name : 'Leave Management',

   children : [
        {
          name: ' Leave',
          page: '/leave',
          icon: 'information-circle-outline'

        },

     {
       
         name: 'Apply for leave',
         page : '/applyfor-leave',
         icon: 'add-circle-outline'

     },

     {
      name: 'Leave Status',
      page: '/leave-stats',
      icon: 'stats'


     },

     { 
       name: 'Calendar',
       page: '/calender',
       icon: 'calendar'


     }

     

   ]

    }

  ];

 information: any [];
  loadChildren: any;




  

}
