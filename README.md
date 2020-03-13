* * *
# A quick guide to our review management system..🖐️

## Prerequisites :point_left:
Before you continue, ensure you have met the following requirements:
* You have installed the latest version of Angular, NodeJS and MongoDb .
* You can use Linux or Mac OS machine and Windows as well.

## How do I retrieve someone's data?⤵️ 
git init<br/>
git clone https://github.com/cybergroupdevs/review-portal.git # clone the repo<br/>
cd into the repo

## Commands to run after installation?
* run npm install/npm install -g @angular/cli to install the required packages
* for backend run nodemon/ node index.js
* for frontend run ng serve

## How to contribute❓
* Fork this repo, read [how to fork repo](https://help.github.com/en/github/getting-started-with-github/fork-a-repo).
* Create branch with your github username. Never use the master branch to create PR. read [how to create a branch](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-and-deleting-branches-within-your-repository).
* Create Pull-Request to master branch in this repository, read [how creating PR](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).
* Don't forget to give 🌟 in this repository.
* You should follow github [@cybergroupdevs](https://github.com/cybergroupdevs).
* We will check your PRs and will add invalid label and close the PRs that not follow the steps.
* Keep in mind, quality is always number one when creating PRs.


## Review-Management system
In the respective project we specifically worked on a review management system functionality of pre-built product of CyberGroup that is HRMS(Human Resource Management System). In the redefine version of a Review management system, both admin and employees gets a user friendly interface alongwith smooth features. The main idea of this project is to enhance the quality of review management and deliverence process for every employee. 

##### We have segregated the system for two main roles ADMIN(HR in our case) and User(It can be Employee/Reviewer/Qaer):

### ADMIN Role:
Admin has a right of performing all the CRUD operations alongwith assigning roles(Reviewer and Qaer)according to the designation and project of the user. When Admin login he/she will redirect to a home page showing the current review statistics of all employees of the organization. An admin can also see my profile, employee operations and logout option in the navbar. My profile shows the profile of a user who has logged in. Employee operations further split into three parts showing View all employees, Create/Add new employee and Create Review. View all employees option redirect to the list of all employees alongwith their name,designation,email id,anf CGI code. Create/add new employee gives the feature of adding new employee. Create review allow admin to create reviewer and qaer of the employee according to the designation and project. Lastly through logout option admin can logout from the system and redirect to the login page.

### User Role:
Reviewer after being logged in will redirect to his profile page. Reviewer will get an options like Reviews and Logout in the navbar. Reviews further split into self reviews, pending by reviewer, pending by qaer, and closed option. Self reviews allow employee to write their own reviews which after submitting redirect to a reviewer of a particular employee. Then reviewer gives his review for an employee. Once reviewer submit his review for the employee assigned to it, that review is then redirect to qaer for his acceptance. Lastly the review got closed after final approval by Reviewer. The system provide an efficient and easy deliverance of reviews for further evaluations on employee performance and promotions. 
* * *
