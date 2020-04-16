# Leave_Application
This is a leave application done in ionic and Angular using Firebase as database.

To fix the Unexpected value 'CustomService' imported by the module 'AppModule' please add a #NgModule annotations

Don't include full module,just add only service 'CustomService' to providers and add import {CustomService} from '...customservicelocation'
to component.
