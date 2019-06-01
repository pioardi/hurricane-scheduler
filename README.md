# hurricane-scheduler
Task scheduler with high availability.

<h2 id="overview"> Overview </h2>
Hurricane scheduler is a distributed and fault-tolerant built on top of https://github.com/pioardi/ring-election . <br>
It is able to schedule jobs that will execute your custom code writenn in node.js . <br>

<h2 id="Features"> Features </h2>
Simple to install and to configure <br>
Web UI (TODO) <br>
REST API to create schedules <br>
Limit your schedules based timezone and on hours,minutes,years,day of the week,month of the year, etc.. <br>
REST API monitoring API <br>
REST API to create timers and be notified when time is up (TODO) <br>
LDAP integrated (TODO) <br>
Multiple data storage ( Cassandra, MongoDB , SQL databases , in-memory for development)  TODO <br>
Fully scalable , distributed and fault-tolerant, no zookeeper or other systems are needed ( based on leader/follower algorithm implemented in https://github.com/pioardi/ring-election ) <br>
Job stats ( failure/success , duration time , failure rate ) TODO <br>
Configurable retries for each job <br>
Job timeout (TODO) <br>
Alerting for job failures and/or success (TODO) <br>

<h2 id="REST API"> REST API </h2>

<strong>Schedule</strong>
<table>
   <tr>
    <th>Field name</th>
    <th>Field Type</th>
    <th>Mandatory</th>
    <th>Constraints</th>
    <th>Description</th> 
  </tr>
  <tr>
    <td>title</td>
    <td>String</td>
    <td>N</td>
    <td>No constraints</td> 
    <td>The title of the job</td>
  </tr>
  <tr>
    <td>timezone</td>
    <td>String</td>
    <td>Y</td>
    <td>A valid timezone , see all available timezones</td> 
    <td>The timezone to refer to run job in the correct time , ex. I want to run a job at 8AM in Naples, is different from 8AM in Chicago</td>
  </tr>
  <tr>
    <td>scriptId</td>
    <td>String</td>
    <td>Y</td>
    <td>A valid scriptId previously created</td> 
    <td>The admin will create scripts to be executed when the job will run , each of this script will have an id to be used into the REST API</td>
  </tr>
  <tr>
    <td>retries</td>
    <td>Number</td>
    <td>N</td>
    <td>N</td> 
    <td>The number of retries that we want to do when a job fails.</td>
  </tr> 
  <tr>
    <td>timeout</td>
    <td>Number</td>
    <td>N</td>
    <td>N</td> 
    <td>The maximum time in seconds that we want to keep the job running , default is 60 seconds.</td>
  </tr> 
  
  <tr>
    <td>hours</td>
    <td>Array of Strings</td>
    <td>N</td>
    <td>Each value must be from 0 to 23</td> 
    <td>The hours in which we want our job to run, if not specified the job will run at all hours</td>
  </tr>
  <tr>
    <td>minutes</td>
    <td>Array of Strings</td>
    <td>N</td>
    <td>Each value must be from 0 to 59</td> 
    <td>The minutes in which we want our job to run, if not specified the job will run at all minutes</td>
  </tr>
  <tr>
    <td>weekDays</td>
    <td>Array of Strings</td>
    <td>N</td>
    <td>Each value must be from 0 to 6</td>
    <td>The days of the week in which we want our job to run, if not specified the job will run all days of the week</td>
  </tr>
  <tr>
    <td>daysOfTheMonth</td>
    <td>Array of Strings</td>
    <td>N</td>
    <td>Each value must be from 0 to 30</td>
    <td>The days of the month in which we want our job to run, if not specified the job will run all days of the months</td>
  </tr>
  <tr>
    <td>monthsOfTheYear</td>
    <td>Array of Strings</td>
    <td>N</td>
    <td>Each value must be from 0 to 11</td>
    <td>The months of the year in which we want our job to run, if not specified the job will run all months of the years</td>
  </tr>
  <tr>
    <td>years</td>
    <td>Array of Strings</td>
    <td>N</td>
    <td>No constraints</td>
    <td>The years in which we want our job to run, if not specified the job will run all years</td>
  </tr>
</table>


<strong>Create schedules</strong> <br>
<strong>HTTP VERB: POST</strong> <br>
<strong>Path : /schedules</strong> <br>
<strong>Input : Schedule</strong>

<strong>Output</strong>
<table>
   <tr>
    <th>Field name</th>
    <th>Field Type</th>
    <th>Description</th> 
  </tr>
  <tr>
    <td>id</td>
    <td>String</td>
    <td>The id of the created schedule</td>
  </tr>
</table>


<strong>Delete schedules</strong> <br>
<strong>HTTP VERB: DELETE</strong> <br>
<strong>Path : /schedules/SCHEDULE_ID</strong> <br>


<strong>Get schedules</strong> <br>
<strong>HTTP VERB: GET</strong> <br>
<strong>Path : /schedules/SCHEDULE_ID</strong> <br>
<strong>Output: Schedule</strong>



