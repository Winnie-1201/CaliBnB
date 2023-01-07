# Calibnb

Live site here: https://calibnb.onrender.com/

Calibnb is an application that lets property owners in California rent out their spaces for travelers looking for a place to stay in California, which is inspired by Airbnb. A registered user can post, edit, and remove their places on the application. Once a property is posted, other registered users can book the place through the application. Once the place is book for some specific dates, it will not be available for the dates booked. A registered user can not only leave a review to the place after their stay, but also share their experience about the place and the surrounding area. When other users view the spot, they will see the related experience arround the place.

## TechStack

### Languages

![html5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![css](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![js](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)

### Frameworks and Libraries

![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![socket](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white)

### Database:

![postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-100000?style=for-the-badge&logo=sql&logoColor=BA1212&labelColor=AD0000&color=A90000)
![AWS](https://img.shields.io/badge/Amazon_AWS-%23232f3e.svg?style=for-the-badge&logo=amazonaws&logoColor=ec912d)

### Hosting:

![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)


# Getting started

1. Clone this repository (only this branch)

2. Install dependencies

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable. Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


# Features

## Homepage

## Sign in

## Sign up

## Create a spot

## Edit a spot

## Book a place

## Write a review

## Edit a review

## Delete a review


## Developer

* Wanting Lu
  * https://github.com/Winnie-1201
  * https://www.linkedin.com/in/wantinglu/

