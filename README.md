# DJANGO - NEXT.JS BOILERPLATE

## Getting Started

1. Clone this repository:

   ```bash
   git clone git@github.com:cirobtorres/django-nextjs-boilerplate.git

   # or

   git clone git@github.com:cirobtorres/django-nextjs-boilerplate.git <repository_name>
   ```

2. Make sure to rename **.env.example** to **.env** and config your keys. Path to **dotenv**: backend\dotenv\

3. Navigate to docker-compose directory and do as follows:

   ```bash
   docker-compose up --build

   # or:

   docker-compose up -d --build # flag --detach
   ```

   #### Obs.: To stop containers, **ctrl + c** on terminal or, in case you have detached:

   ```bash
   docker-compose down
   ```

## Dockerizing:

### While docker containers are up and running, you may:

1. Make use of some django commands like that:

   ```bash
   docker-compose run <service> python manage.py makemigrations

   docker-compose run <service> python manage.py migrate

   docker-compose run <service> python manage.py shell

   docker-compose run <service> python manage.py createsuperuser

   docker-compose run <service> python manage.py startapp <app_name> .\backend\djangoapp\apps\<app_folder>
   ```

   #### Obs.: swap **<service>** for **backend** in case you haven't stablished a custom **container_name** for your backend container inside **docker-compose.yml**.

2. Access docker folders for any reason:

   ```bash
   docker exec -it <container_name> sh
   ```

   Obs.: if you don't know your container's name, type:

   ```bash
   docker-compose ps

   # or

   docker container ls # lists all running containers

   docker container ls -a # lists all containers you have
   ```

3. Clear unused objects without a confirmation prompt:

   ```bash
   docker system prune --all --force
   ```

   #### Obs.: Add --volumes in case you want to get rid of unused volumes as well.

   ```bash
   # Another trick:

   docker container rm $(docker container ls -aq)

   docker image rm $(docker image ls -aq)
   ```

## Installed Packages:

### Backend:

1. [Python Dotenv](https://github.com/theskumar/python-dotenv)
2. [Pillow](https://pillow.readthedocs.io/en/stable/installation.html)
3. [Faker](https://faker.readthedocs.io/en/master/index.html)
4. [Pytest](https://pytest-django.readthedocs.io/en/latest/)
5. [Coverage](https://coverage.readthedocs.io/en/6.5.0/)
6. [Selenium](https://selenium-python.readthedocs.io/installation.html#introduction)
7. [Django](https://www.djangoproject.com/download/)
8. [Django Cors Headers](https://pypi.org/project/django-cors-headers/)
9. [Django Rest Framework](https://www.django-rest-framework.org/#installation)
10. [Django Rest Framework Simple JWT](https://django-rest-framework-simplejwt.readthedocs.io/en/latest/)
11. [Psycopg2 Binary](https://www.psycopg.org/docs/install.html#quick-install)

### Frontend:

1. [NextJS](https://nextjs.org/docs/getting-started/installation#automatic-installation)
2. [Tailwindcss](https://tailwindcss.com/docs/installation)
3. [Tailwind Scrollbar](https://adoxography.github.io/tailwind-scrollbar/getting-started)
4. [Typescript](https://www.typescriptlang.org/download)
5. [Eslint](https://eslint.org/docs/latest/use/command-line-interface#miscellaneous)
6. [Prettier](https://prettier.io/docs/en/install)
7. [Framer Motion](https://www.framer.com/motion/introduction/##installation)
8. [React Icons](https://react-icons.github.io/react-icons/)
