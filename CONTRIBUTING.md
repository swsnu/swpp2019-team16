# Contribution Guideline

## Bootstrap Project

In order to contribute to our project, first you need to setup project on your own local machine. Follow this process to bootstrap our project. 

### Frontend

### Backend

## Development Workflow

After finishing bootstraping project, you can follow this workflow to add feature and send pull request to our project.

### Frontend

### Backend

## Sending a Pull Request

Before submitting a pull request, please make sure the following is done:

1. Fork the repository and create your branch from master
2. 

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


