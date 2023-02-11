<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![MIT License][license-shield]](https://opensource.org/licenses/MIT)
[![LinkedIn][linkedin-shield]](https://www.linkedin.com/in/andrea-di-blasi-888850b2/)


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h1 align="center">Ares</h1>
  <h3 align="center">Automatic Release Execution Scripts</h3>
________________________($$$$$$$$$)__________________________
_________________________($$$$$$$)___________________________
_______________________($$$$$$$$$$$)_________________________
__________________________($$$$$)____________________________
_____($)___________________($$$$$)___________________($)______
____($$)___________________($$$$$)___________________($$)_____
___($$)____________________($$$$$)____________________($$)____
__($$)_____________________($$$$$)_____________________($$)___
__($$$)____________________($$$$$)____________________($$$)___
___($$$$)__________________($$$$$)__________________($$$$)____
____($$$$$)________________($$$$$)________________($$$$$)_____
_____($$$$$)_______________($$$$$)_______________($$$$$)______
______($$$$$)____________($$$$$$$$$)____________($$$$$)_______
________($$$$$$$)______($$$$$$$$$$$$$)______($$$$$$$)_________
______($$$$$$$$$$$$$$$$$$$$$$$_$$$$$$$$$$$$$$$$$$$$$$$)______
____________($$$$$$$$$$$$$$$$___$$$$$$$$$$$$$$$$)____________
_______($$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$)______
_____________________($$$$$$$$$$$$$$$$$)_____________________
__________________________($$$$$$$)__________________________
________________________($$$$$$$$$$$)________________________
_______________________($$$_______$$$)_______________________
________________________($$$_____$$$)________________________
_____________________($____$$$_$$$____$)_____________________
______________________($$$$$$$^$$$$$$$)______________________
_________________________($$$$^$$$$)_________________________
__________________________($$$^$$$)__________________________
_______________________($__$$$^$$$__$)_______________________
________________________($$$$$^$$$$$)________________________
_________________________($$$$^$$$$)_________________________
____________________($____($$$^$$$)____$)____________________
____________________($$____$$$^$$$____$$)____________________
_____________________($$$$$$$$^$$$$$$$$)_____________________
________________________($$$$$^$$$$$)________________________
__________________________($$$^$$$)__________________________
_________________________($$$$^$$$$)_________________________
________________________($$$$$^$$$$$)________________________
_______________________($$$$$$^$$$$$$)_______________________
_______________________($$$$$$^$$$$$$)_______________________
_______________________($$$$$$^$$$$$$)_______________________
_______________________($$$$$$^$$$$$$)_______________________
_______________________($$$$$$^$$$$$$)_______________________
_______________________($$$$$$^$$$$$$)_______________________
_______________________($$$$$$^$$$$$$)_______________________
_______________________($$$$$$^$$$$$$)_______________________
________________________($$$$$^$$$$$)________________________
________________________($$$$$^$$$$$)________________________
________________________($$$$$^$$$$$)________________________
________________________($$$$$^$$$$$)________________________
________________________($$$$$^$$$$$)________________________
________________________($$$$$^$$$$$)________________________
________________________($$$$$^$$$$$)________________________
________________________($$$$$^$$$$$)________________________
________________________($$$$$^$$$$$)________________________
________________________($$$$$^$$$$$)________________________
_________________________($$$$^$$$$)_________________________
_________________________($$$$^$$$$)_________________________
_________________________($$$$^$$$$)_________________________
_________________________($$$$^$$$$)_________________________
_________________________($$$$^$$$$)_________________________
__________________________($$$^$$$)__________________________
__________________________($$$^$$$)__________________________
__________________________($$$^$$$)__________________________
___________________________($$^$$)___________________________
___________________________($$^$$)___________________________
___________________________($$^$$)___________________________
____________________________($^$)____________________________
____________________________($^$)____________________________
____________________________($$$)____________________________
_____________________________($)_____________________________

  <p align="center">
    <br />
    <a href="https://github.com/Adibla/ares"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Adibla/ares/issues">Report Bug</a>
    ·
    <a href="https://github.com/Adibla/ares/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ABOUT THE PROJECT -->
## About The Project

Ares lets you publish migration scripts to your MongoDB or MySQL instance.
<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Installation with npm

_Here is a step-by-step guide to installing this cli using NPM._

1. Install ares in your project folder with npm.
   ```sh
   npm i ares-x
   ```
2. To update your database connection information, edit the [config files](#usage) or [env variables](#usage). 

3. Create one or more migrations in the MIGRATIONS DIR folder using Ares or manually (default ares-data on your project root).
   ```sh
   ares --operation create --name test --dbms MYSQL 
   ```
4. Run with
   ```sh
   ares --operation up
   ```

### Installation with local clone

_Here is a step-by-step guide to installing this cli using local clone._

1. Using git, clone the project.
   ```sh
   git clone git@github.com:Adibla/ares.git
   ```
2. Navigate to the installation folder.
    ```sh
   cd ./ares
   ```
3. Install dependencies
   ```sh
   npm i
   ```
4. To update your database connection information, edit the [config files](#usage) or [env variables](#usage).

5. Run with
    ```sh
   npm run start -- --operation up
   ```



<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage
You can specify your database configuration using ENV variables, or you can use the USE CUSTOM CONFIG=true flag and update PROJECT/config/env. json.

WINDOWS
 ```sh
  set DB_HOST="localhost"
  set DB_PORT=27017
  set DB_USER="test"
  set DB_PASS="test"
  set DB_NAME="test"
  set AUTH_MECHANISM="test"
  set AUTH_SOURCE="test"
  set SERVICE_NAME="test" //for logging
   ```
UNIX
 ```sh
  export DB_HOST="localhost"
  export DB_PORT=27017
  export DB_USER="test"
  export DB_PASS="test"
  export DB_NAME="test"
  export AUTH_MECHANISM="test"
  export AUTH_SOURCE="test"
  export SERVICE_NAME="test" //for logging
   ```
This pattern must be followed if you use configuration files.

```
{
  "db": {
    "connection": {
      "host": "localhost",
      "port": 27017,
      "user": "admin",
      "password": "secret",
      "database": "test",
      "authMechanism": "DEFAULT",
      "authSource": "admin"
    },
    "migrationsStoreTable":{
      "tableName": "migrations-store",
      "tableId": "id"
    },
    "seeds": {
      "directory": "./priv/seeds"
    }
  },
  "app":{
    "migrationsDir": "./ares-data",
    "operationsLabels": {
      "statusExecuted": "EXECUTED",
      "statusRolledBack": "ROLLED_BACK",
      "statusPending": "PENDING",
      "rolledBackSuccess": "ROLLED_BACK_SUCCESS",
      "rolledBackFailed": "ROLLED_BACK_FAILED",
      "outcomeSuccess": "COMPLETE_SUCCESS",
      "outcomeFailed": "COMPLETE_FAILED",
      "outcomeMissing": "NONE"
    }
  },
  "log": {
    "name": "app",
    "base": {
      "env": "dev"
    },
    "enabled": true,
    "level": 20
  }
}
```

After running the app, Ares creates a new table in your database with generated migrations (included in your MIGRATIONS DIR), with the name specified by the MIGRATIONS STORE environment variable (migrations-store by default).

<span style="color: red">IMPORTANT</span> CURRENTLY, THE FIRST MIGRATION DETERMINES WHICH DBMS WILL BE USED (for a list of supported DBMS, see [Roadmap](#Roadmap).
```sh
ares --operation up
```
All migrations' up commands will be executed in the MIGRATIONS DIR folder, and their status will be saved in the database.
The folder currently contains some migration examples.

### ENVIRONMENT VARIABLES
Several environment variables can be used to configure the application (someone has default values).
 ```sh
   DB_HOST="localhost" #required
   DB_PORT=27017 #required
   DB_USER="admin" #required
   DB_PASS="secret" #required
   DB_NAME="test" #required
   USE_CUSTOM_CONFIG=false #It is used to include custom config files (instead of using env) located in ProjectDir/config/[env].json.
   AUTH_MECHANISM="DEFAULT"
   AUTH_SOURCE="admin"
   SERVICE_NAME="test"
   MIGRATIONS_STORE="migrations-store" #Migration support table used by Ares for migrations
   MIGRATIONS_STORE_ID="test" #The primary key of the migration table used by Ares for migrations
   MIGRATIONS_DIR="./ares-data" #Folder that includes migrations file
   STATUS_EXECUTED="COMPLETE_SUCCESS" #Status of migration if it is successful
   STATUS_ROLLED_BACK="STATUS_ROLLED_BACK" #Status of migration if it is rolledback
   STATUS_PENDING="STATUS_PENDING" #Status of migration if it is pending
   ROLLED_BACK_SUCCESS="ROLLED_BACK_SUCCESS" #Result of migration if it is rolled back with success
   ROLLED_BACK_FAILED="ROLLED_BACK_FAILED" #Result of migration if it is rolled back with errors
   OUTCOME_SUCCESS="OUTCOME_SUCCESS" #Result of migration if it is successful
   OUTCOME_FAILED="OUTCOME_FAILED"  #Result of migration if it is failed
   OUTCOME_MISSING="OUTCOME_MISSING" #Status of migration if no outcome is achieved
   ```

### COMMAND LINE OPTIONS

It runs all migrations' up commands from the MIGRATIONS DIR directory.
```sh
   ares --operation up
   ```
It runs all down commands contained in the MIGRATIONS DIR for all migrations, **YOU CAN ONLY USE DOWN COMMAND FOR ALREADY DONE MIGRATIONS IN OUTCOME "COMPLETE SUCCESS"**.
```sh
   ares --operation down
   ```

It only executes migrations' with the specified id (if they exist) with up commands from the MIGRATIONS DIR.
```sh
   ares --operation up --migration 001 002
   ```

It only executes migrations with the specified id (if any exist) with down commands from the MIGRATIONS DIR, **YOU CAN ONLY USE DOWN COMMAND FOR ALREADY DONE MIGRATIONS IN OUTCOME "COMPLETE SUCCESS"**
```sh
   ares --operation down --migration 001 002
   ```

It creates a new migration schema in MIGRATION DIR, and you must specify the —name (migration's name) and —dbms (mysql or mongodb) parameters, as well as any other optional parameters (author, description, tags)
```sh
   ares --operation create --name test --author andrea --dbms MYSQL
   ares --operation create --name test --author andrea --dbms MYSQL --description desc --tags tag1 tag2
   
   ```

### MIGRATION ENTITY SPECIFICATION
The title, id, and author of a migration file may be separated by "-," for example, "001-example-andrea.json," but the same attributes may also be included in the migration body. Currently, only json files are supported.
These attributes are contained in the migration entity and will be saved in Ares' configuration table.

- **id** (string) - The id of the migration, which could be specified in the filename or body
- **author** (string) - The author of the migration could be specified in the body or filename.
- **dbms** (string 'MYSQL'|'MONGODB') - The migration's database, which can only be specified in the body.
- **tag**(string) - The migration's tag, which can only be specified in the body.
- **description**(string) - The migration's description, which can only be specified in the body.
- **comment**(string) - The migration's comment, which can only be specified in the body.
- **title**(string) - The title of the migration, which can be specified in the filename or in the body.
- **labels**(string) - Migration labels, which can only be specified in the body.
- **up**(string|RunCommandOptions) - When the migration is complete, it can only be specified in the body; in the case of MongoDB, it's a [RunCommandOptions](https://www.mongodb.com/docs/manual/reference/command/).
- **down**(string|RunCommandOptions) - If the migration is complete, it can only be specified in the body; in the case of MongoDB, it's a [RunCommandOptions](https://www.mongodb.com/docs/manual/reference/command/).
- **ares_version**(string) - Ares version, extracted from the package.json
- **status**(string) - The status of the migration
- **outcome**(string) - The result of migration
- **filename**(string) - The filename of the migration
- **checksum**(string) - The checksum of the migration (automatically generated)
- **created_at**(date) - The migration's creation time (automatically generated)

### TEST
Jest can be used to run unit tests.
````sh
npm run test
````

<!-- _For more examples, please refer to the [Documentation](https://)_ -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] The first draft
- [x] Include a Changelog
- [x] Return to top links
- [ ] Messages tailored to specific use cases (already existing migration exc...)
- [ ] Enhance error management
- [ ] Multiple databases can be managed in a single transaction (think about that)
- [ ] There is no need to create multiple instances of MongoDB.
- [ ] Remove "any" and replace it with types for everything.
- [ ] Other dbms support
- [ ] Validation checksum
- [ ] YAML support
- [ ] Improve README and Documentation
- [ ] Support new Dbms
- [ ] Move all labels to config file
- [ ] Better input validation
- [ ] More unit test
- [ ] Generate package with npm
- [ ] Manage errors in flow
- [ ] WIP

See the [open issues](https://github.com/Adibla/ares/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Andrea Di Blasi - [@linkedin](https://www.linkedin.com/in/andrea-di-blasi-888850b2/) - andrea.diblasix@gmail.com

Project Link: [https://github.com/Adibla/ares](https://github.com/Adibla/ares)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
