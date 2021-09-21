# DBs as a Service

## Description

This project provides a wrapper over the following REST endpoint

https://api.aiven.io/v1/clouds

and provides a number of features such as:

- computing the distance from the user's geolocation to cloud providers (client-side)
- result processing (filtering/sorting) (client-side)
- a backend that caches results based on a period of time
- testing (to be implemented)
- automation (to be implemented)

## Further Development

Since this is a toy project, there are considerable bodies of work that need to be done in order to turn it into a commmercial product. This section aims
to give an aerial view of bottlenecks that occur when scaling up

### Load Balancing

- used to offload requests to a set of servers (e.g. using nginx, "DNS" load balancing (resolve URL to a set of different hosts), etc.)

### Caching

- used in the context of dbs to reduce times of R/W operations
- in memory caches (redis, memcache, Cassandra) store results of R ops thus avoiding disk reads on the db's side

### CDNs

- used to store static assets (imgs, scripts, styles)
- advantages include geo location (close(r) to user base)

### Distributed File System

- used to store files (e.g. (user) images; e.g. Amazon S3)

## Setup

The frontend interacts with a locally deployed backend running on port 8000

## Backend Setup

Python 3.6 required

### Setup Environment

```
cd aiven-th/backend
python3 -m venv <aiven-th-venv>
aiven-th-venv\Scripts\activate.bat # Win
source aiven-th-env/bin/activate   # Linux/MacOS
(venv) pip install -r requirements.txt
```

### Setup DB

continued

```
(venv) python manage.py makemigrations
(venv) python manage.py migrate
(venv) python manage.py runserver
```

### Run (all) Tests

```
(venv) python manage.py test
```

# Frontend Setup

Requires node and/or yarn

npm 6.14.8 and yarn 1.22.10 were used in this project

Install dependencies:

```
yarn install
```

## Frontend Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
