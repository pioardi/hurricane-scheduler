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
Job timeout <br>
Alerting for job failures and/or success <br>

