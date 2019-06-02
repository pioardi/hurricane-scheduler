# hurricane-scheduler
[![Gitter chat](https://badges.gitter.im/gitterHQ/gitter.png)](https://gitter.im/hurricane-scheduler)
Task scheduler with high availability.


<h2>Contents</h2>
<a href="#overview">Overview</a><br>
<a href="#Features">Features</><br>
<a href="#REST API">REST API</a><br>
<a href="#config">Configuration</a><br>


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
Job timeout<br>
Alerting for job failures and/or success (TODO) <br>

<h2 id="REST API"> REST API </h2>

Schedule API run on port JOB_PORT , see configuration section for details. <br>
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
    <td>The number of retries that we want to do when a job fails. Default is 0</td>
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
HTTP VERB: POST <br>
Path : /schedules <br>
Input : Schedule

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
HTTP VERB: DELETE</strong> <br>
Path : /schedules/SCHEDULE_ID <br>


<strong>Get schedules</strong> <br>
HTTP VERB: GET <br>
Path : /schedules/SCHEDULE_ID<br>
Output: Schedule

<strong> Monitoring API run on MONITORING_PORT see configuration for details </strong>
<strong>Get status</strong> <br>
HTTP VERB: GET <br>
Path : /status<br>
Output: An array where each element represents a node into the cluster with assigned partitions , id and priority.


<h2 id="config"> CONFIGURATION </h2>
<table>
   <tr>
    <th>Name</th>
    <th>Default</th>
    <th>Description</th> 
  </tr>
  <tr>
    <td>PORT</td>
    <td>3000</td>
    <td>The leader will start to listen on this port</td>
  </tr>
  <tr>
    <td>TIME_TO_RECONNECT</td>
    <td>3000</td>
    <td>The time in ms to wait for a follower when he has to connect to a new leader in ms </td>
  </tr>
  <tr>
    <td>MAX_INACTIVE_TIME</td>
    <td>10000</td>
    <td>The time in ms to wait for an heart beath from a node before to remove it. </td>
  </tr>
   <tr>
    <td>HEARTH_BEAT_FREQUENCY</td>
    <td>1000</td>
    <td>The frequency in ms with which a hearth beat is performed by a follower </td>
  </tr>
   <tr>
    <td>HEARTH_BEAT_CHECK_FREQUENCY</td>
    <td>3000</td>
    <td>The frequency in ms with which an hearth check is performed by a leader</td>
  </tr>
  <tr>
    <td>LOG_LEVEL</td>
    <td>info</td>
    <td>Follow this https://www.npmjs.com/package/winston#logging-levels </td>
  </tr>   
  <tr>
    <td>NUM_PARTITIONS</td>
    <td>10</td>
    <td>Number of partitions to distribute across the cluster</td>
  </tr>
  <tr>
    <td>SEED_NODES</td>
    <td>No default</td>
    <td>hostnames and ports of leader node comma separated, Ex . hostname1:port,hostname2:port </td>
  </tr>      
  <tr>
    <td>MONITORING_PORT</td>
    <td>9000</td>
    <td>port to expose rest service for monitoring</td>
  </tr>
   <tr>
    <td>JOB_PORT</td>
    <td>3000</td>
    <td>port to expose rest service for schedules</td>
  </tr>
   <tr>
    <td>LOG_FILE_ENGINE</td>
    <td>Default to root folder and name engine.log</td>
    <td>File name used to log engine.</td>
  </tr>    
</table>

   
 
   
