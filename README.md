Event Booking System<br>

1.Project Description :-<br>
This is  only server side code built with Node.js that allows users to create events, book events, and receive simulated email notifications through RabbitMQ when a booking is successfully created. The system uses MySQL for storing event and booking data, Redis for caching the booking counts, and RabbitMQ for simulating email notifications.<br>


2.Key Features :-<br>
Create events with a specified name and capacity.<br>
Users can book events while ensuring no capacity is exceeded and no duplicate bookings are allowed.<br>
Redis is used to cache the booking count for each event to optimize database queries.<br>
When a booking is made, RabbitMQ sends a message that simulates an email notification process, which is consumed and logged by the application.<br>


3.Prerequisites :-<br>
Before setting up the application, ensure you have the following installed on your local machine(only working in your local machine im not hosting anything in cloud):<br>

Node.js (version 14 or higher) ,<br>
MySQL (to store event and booking data) ,<br>
Redis (for caching booking counts) ,<br>
RabbitMQ (for simulating email notifications) ,<br>


4.Setting Up the Environment :-<br>
* Install Dependencies<br>
  git clone <repository_url><br>
  cd your app path<br>
  npm install

5. Set Up MySQL :-<br>
Install MySQL if it is not installed already. You can download it from official website.<br>

After MySQL is installed, log in to the MySQL command line or MySQL Workbench:<br>
mysql -u root -p<br>
 *Create a new database for the project: use the command below for create databse <br>
 CREATE DATABASE event_booking_system;<br>


 *Type this below command in your mysqlwork bench <br>
 CREATE TABLE events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    capacity INT NOT NULL
);<br>

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    UNIQUE KEY unique_booking (user_id, event_id),
    FOREIGN KEY (event_id) REFERENCES events(id)
);<br>

6.Set Up Redis :- <br>
Install Redis by following the instructions for your operating system from the official Redis website.<br>

Start the Redis server by this command:<br>
redis-server<br>

7.Set Up RabbitMQ :-<br>
Install RabbitMQ by following the instructions for your OS from the official RabbitMQ website.<br>

Once installed, start RabbitMQ using by using this command:<br>
rabbitmq-server

You can also access RabbitMQ's management console by visiting:<br>
http://localhost:15672/<br>
The default credentials are:<br>
Username: guest<br>
Password: guest<br>


8.Configure the Application :-<br>
The application uses environment variables for configuration. Create a .env file in the root of the project directory with the following content:<br>
MYSQL_HOST=localhost<br>
MYSQL_USER=root<br>
MYSQL_PASSWORD=your_mysql_password<br>
MYSQL_DATABASE=event_booking_system<br>

REDIS_HOST=localhost<br>
REDIS_PORT=6379<br>

RABBITMQ_URL=amqp://localhost<br>
Ensure that you replace your_mysql_password with your actual MySQL password.<br>

9.Running the Application :-<br>
  1. Start the MySQL Database :-<br>
  Ensure that your MySQL database is up and running.

  2. Start Redis :- <br>
  Start the Redis server if it is not already running.<br>
  redis-server

  4. Start RabbitMQ :-<br>
  Ensure that the RabbitMQ server is running:<br>
  rabbitmq-server

  5. Start the Application :-<br>
  To run the Node.js application, execute the following command:<br>
  npm start


10.Testing the Application in postman :-<br>
1. Create an Event : http://localhost:3000/events/create,<br>
2. Get all events : http://localhost:3000/events/dispaly,<br>
3. Book an Event:  http://localhost:3000/bookings/book,<br>
4. Get Event Booking Count : http://localhost:3000/bookings/:eventId/count<br>


Additional Notes :-<br>
Redis Cache: When fetching the booking count for an event, Redis is used to cache the result and reduce load on the MySQL database. If the cache is not available, it queries the database and then caches the result.<br>

RabbitMQ Email Simulation: When a booking is made, a message is sent to RabbitMQ, which is then consumed and logged as an "email notification" (simulating the email sending process).
