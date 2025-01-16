Event Booking System

1.Project Description
The Event Booking System is a backend service built with Node.js that allows users to create events, book events, and receive simulated email notifications through RabbitMQ when a booking is successfully created. The system uses MySQL for storing event and booking data, Redis for caching the booking counts, and RabbitMQ for simulating email notifications.


2.Key Features
Create events with a specified name and capacity.
Users can book events while ensuring no capacity is exceeded and no duplicate bookings are allowed.
Redis is used to cache the booking count for each event to optimize database queries.
When a booking is made, RabbitMQ sends a message that simulates an email notification process, which is consumed and logged by the application.


3.Prerequisites
Before setting up the application, ensure you have the following installed on your local machine(only working in your local machine im not hosting anything in cloud):

Node.js (version 14 or higher)
MySQL (to store event and booking data)
Redis (for caching booking counts)
RabbitMQ (for simulating email notifications)


4.Setting Up the Environment
* Install Dependencies
  git clone <repository_url>
  cd your app path
  npm install

5. Set Up MySQL
Install MySQL if it is not installed already. You can download it from official website.

After MySQL is installed, log in to the MySQL command line or MySQL Workbench:
mysql -u root -p
 *Create a new database for the project: use the command below for create databse 
 CREATE DATABASE event_booking_system;


 *Type this below command in your mysqlwork bench 
 CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    capacity INT NOT NULL
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    UNIQUE KEY unique_booking (user_id, event_id),
    FOREIGN KEY (event_id) REFERENCES events(id)
);

6.Set Up Redis
Install Redis by following the instructions for your operating system from the official Redis website.

Start the Redis server by this command:
redis-server

7.Set Up RabbitMQ
Install RabbitMQ by following the instructions for your OS from the official RabbitMQ website.

Once installed, start RabbitMQ using by using this command:
rabbitmq-server

You can also access RabbitMQ's management console by visiting:
http://localhost:15672/
The default credentials are:
Username: guest
Password: guest


8.Configure the Application
The application uses environment variables for configuration. Create a .env file in the root of the project directory with the following content:
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=event_booking_system

REDIS_HOST=localhost
REDIS_PORT=6379

RABBITMQ_URL=amqp://localhost
Ensure that you replace your_mysql_password with your actual MySQL password.

9.Running the Application
  1. Start the MySQL Database
  Ensure that your MySQL database is up and running.

  2. Start Redis
  Start the Redis server if it is not already running.
  redis-server

  4. Start RabbitMQ
  Ensure that the RabbitMQ server is running:
  rabbitmq-server

  5. Start the Application
  To run the Node.js application, execute the following command:
  npm start


10.Testing the Application in postman
1. Create an Event : http://localhost:3000/events/create
2. Get all events : http://localhost:3000/events/dispaly
3. Book an Event:  http://localhost:3000/bookings/book
4. Get Event Booking Count : http://localhost:3000/bookings/:eventId/count


Additional Notes
Redis Cache: When fetching the booking count for an event, Redis is used to cache the result and reduce load on the MySQL database. If the cache is not available, it queries the database and then caches the result.

RabbitMQ Email Simulation: When a booking is made, a message is sent to RabbitMQ, which is then consumed and logged as an "email notification" (simulating the email sending process).
