![alt text](https://github.com/revaturelabs/trackforce/blob/dev/TrackForce/src/main/webapp/resources/logo.png)

# TrackForce App
## Project Discription and Objectives

### Description
TrackForce is a system that allows Revature management to track the lifecycle of an associate as they move through different stages such as training, selected, confirmed, and deployed. The mapped and unmapped metrics in this application allow for management to differentiate the number of associates that are mapped to a particular client from those whom are still available to be paired with a client. Within this applicattion management can also view statistics on the skill sets of associates, the number of associates sent to a particular client, and how many associates in a training batch are not mapped to a client. 
### Objectives
 - Allow for various types of users to log into the system
 - Show charts for the numbers of mapped vs. unmapped associates
 - Click on charts to view further information
 - Provide detailed information and charts for each batch and client
 - Allow user to view metrics for past and future data

## Current Status
A user can login and is authenticated as having a particular role. Charts display data on the number of associates that are mapped & unmapped and the number of assoicates in each stage of mapped or unmapped. The sections of these pie charts can be clicked to view further information in charts such as skill (curriculum) for unmapped associates and clients for mapped associates. There is also an assoicates table that utilizes filters in order to search for a particlular group of associates. The Client navigation link brings you to a page that permits the user to search for a particular client and view the statistics for that client. Finally, when a user clicks the Batch navigation link they are able to view the batches that are running within a particular date range. The user can also click a batch name to view further information about that batch and view a list of the associates in that batch. Additionally, when an associate name is clicked within the application, you are brought to a form that allows you to update the associates status and/or client name and these changes are reflected throughout the application.

### Current Features
 _dev1804 Release Features 

+ Updated Roles:
	Associate
	Trainer
	Staging Manager
	Delivery / Sales

+ Updated the Associate model 
+ Updated the Interview model
+ Associates can creates users and associates
+ Associate has a personal information splash page
+ Predictions additional functionally



ADDED ISSUES 

- Batch List does not load
- Sort by Verification Status does nothing
- Searching batches doesn't work
- Toggle create new interview form not creating new interview
- "My Interview" "save" button does not save
- Typed elements do not appear in DOM
- Associate can log in prior to approval
- Updating Associates from the AssociateList useing the Wrong Resources
- Interview is on NavBar for non Associates
- Updating Associate with Feedback/Questions does not work/persistence
- Setting 24Hour Notice Does not Work/Set
- Being able to login as an Associate without being approved.
- Assoicate Updates an Interview Angular1804 Jersery1804 Testing1804
- Get the Angular to Take Hibernate Entity Objects Angular1804 Hibernate1804 Jersery1804
- ReWork The Caching to use the Entities instead of the model Hibernate1804 Jersery1804
- Service: Add use case for bulk update (HTTP POST) Jersery1804


 ### Primary Users
	Associate, Trainer, Staging Manager,and Delivery / Sales
 ### Stakeholders
 Salesforce Team, Sales Team, Staging
