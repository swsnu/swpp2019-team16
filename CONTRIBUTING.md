# Contribution Guideline

## Bootstrap Project

In order to contribute to our project, first you need to setup project on your own local machine. Follow this process to bootstrap our project. 

### Frontend

```sh
git clone https://github.com/swsnu/swpp2019-team16.git
cd ./swpp2019-team16/frontend
yarn install
```

### Backend

```sh
# if you already clone project, skip this step
git clone https://github.com/swsnu/swpp2019-team16.git

cd ./swpp2019-team16/backend

# install your virtual environment
virtualenv -m python3 venv

# activate!
source ./venv/bin/activate

# install dev requirements
pip3 install -r requirements/development.txt
```



## Development Workflow

After finishing bootstraping project, you can follow this workflow to add feature and send pull request to our project.

#### Before you start coding

* Please create issue about what you are going to develop

* Or if there're issues already, you can add 'assignee' as your github id on the issue page.

### Frontend

* Run your development server with `yarn start` command
* And start coding!
* After you have done your task, you should check whether following things are successfully finish:
  *  `yarn test`: Run all tests we wrote
  *  `yarn build`: Run build, this checks whether source successfully interpreted.
  *  `prettier --write \"src/**/*.js\"`: Run prettier, this helps to unify format of the code.
* If you forget about these things, don't worry ['husky'](https://github.com/typicode/husky) will do it for you before push to repository.

### Backend

* Run your local server with `python3 app/manage.py runserver` command (Assumed that you are on `/backend`)

* And start coding!

* After you have done your task, you should check whether following things are successfully finish:

  * `python3 app/manage.py test --settings=app.settings.development`: Run all test we wrote.
  * `flake8`: Run linter. When you find warning, please fix it before you send pull request

  

## Sending a Pull Request

Before submitting a pull request, please make sure the following is done:

1. Fork the repository and clone the forked repository on your own machine

```sh
git clone https://github.com/<username>/swpp2019-team16.git
```

2. Add `upstream` remote to your git. `upstream` is source repository.

```sh
git remote add upstream https://github.com/swsnu/swpp2019-team16.git
```

3. Create your branch from master

```sh
git checkout -b <branch>
```

4. Develop your feature. 
5. Add commit with the message. And message should follow [these rules](#commit-message-guidelines)

```sh
git commit -m "feat: add awesome feature"
```

6. Push to `origin`. `origin` is your forked repository.

```sh
git push origin <branch>
```

6. Create pull request from `origin` to `upstream`

 

### Commit Message Guidelines

We have very precise rules over how our git commit messages can be formatted. This leads to more readable messages that are easy to follow when looking through the project history. But also, we use the git commit messages to generate the change log. We follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary).

#### Commit Message Format

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

Samples:
```
docs: correct spelling of CHANGELOG 
```

```
fix: minor typos in code

see the issue for details on the typos fixed

fixes issue #12
```

##### Type

* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **chore**: Extra works
* **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **revert**: Revert some updates
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **test**: Adding missing tests or correcting existing tests


