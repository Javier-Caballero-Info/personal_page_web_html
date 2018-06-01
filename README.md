# Personal Page - Official Web Site

> Personal web CV to show everything about me. 
## Table of Contents

-   [Overview](https://github.com/Javier-Caballero-Info/personal_page_web_html/tree/master/README.md#overview)
-   [Clone](https://github.com/Javier-Caballero-Info/personal_page_web_html/tree/master/README.md#clone)
- [Requirements](https://github.com/Javier-Caballero-Info/personal_page_web_html/tree/master#requirements)
- [Installation](https://github.com/Javier-Caballero-Info/personal_page_web_html/tree/master#installation)
	- [Nodejs and Npm](https://github.com/Javier-Caballero-Info/personal_page_web_html/tree/master#nodejs-and-npm)
	- [Dependencies](https://github.com/Javier-Caballero-Info/personal_page_web_html/tree/master#dependencies)
- [Add/Remove packages](https://github.com/Javier-Caballero-Info/personal_page_web_html/tree/master#addremove-packages)
- [Environment](https://github.com/Javier-Caballero-Info/personal_page_web_html/tree/master#environment)
- [Developing](https://github.com/Javier-Caballero-Info/personal_page_web_html/tree/master#developing)
- [Test](https://github.com/Javier-Caballero-Info/personal_page_web_html/tree/master#test)
- [Build](https://github.com/Javier-Caballero-Info/personal_page_web_html/tree/master#build)
- [Running with Docker](https://github.com/Javier-Caballero-Info/personal_page_web_html/tree/master#running-with-docker)
	- [Building the image](https://github.com/Javier-Caballero-Info/personal_page_web_html/tree/master#building-the-image)
	- [Starting up a container](https://github.com/Javier-Caballero-Info/personal_page_web_html/tree/master#starting-up-a-container)
- [Contributing](https://github.com/Javier-Caballero-Info/personal_page_web_html/tree/master#contributing)
- [Author](https://github.com/Javier-Caballero-Info/personal_page_web_html/tree/master#author)
- [License](https://github.com/Javier-Caballero-Info/personal_page_web_html/tree/master#license)

## Overview

Simple HTML and JQuery application that get resources stored in Firebase database as JSONs files.
The idea is store all the assets in a cloud storage such as Amazon S3 o Firebase Storage.

## Clone

```bash
git clone https://github.com/Javier-Caballero-Info/personal_page_web_html.git
git remote rm origin
git remote add origin <your-git-path>
```

## Requirements

* **NodeJs:** 9.11.1 or above
* **Npm:** 5.6.0 or above
## Installation

1. ### NodeJs and Npm
Latest LTS Version: **9.11.1** (includes npm 5.6.0)

- Debian / Ubuntu
```bash
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
```

```bash
sudo apt install -y nodejs
```

```bash
sudo apt install -y build-essential
```

- MacOS

	- Bash
	```bash
	curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
	```
	- Brew
	```bash
	brew install node
	```
	- MacPorts
	```bash
	port install nodejs9
	```

- Windows

	- Chocolatey
	```bash
	cinst nodejs.install
	```
	- Scoop
	```bash
	scoop install nodejs
	```
	- MSI installer
	Download [here](http://nodejs.org/#download) the installer.

For more details, please visit [https://nodejs.org/en/download/package-manager](https://nodejs.org/en/download/package-manager/).


2. ### Dependencies

This will install all dependencies from package.json

```bash
 npm install
 ``` 
 
## Add/Remove packages

```bash
 npm add <PACKAGE_NAME>
 npm add --dev <PACKAGE_NAME>
 npm remove <PACKAGE_NAME>
```

## Developing

The command includes live reload on every change.

```
npm start
```

## Test

There is no test for the site.

## Build

```
npm run build
```

## Running with Docker

To run the server on a Docker container, please execute the following from the root directory, after build the project:

### Building the image
```bash
docker build -t personal_page .
```
### Starting up a container
```bash
docker run -p 80:80 -d personal_page
```
## Contributing

Contributions welcome! See the  [Contributing Guide](https://github.com/Javier-Caballero-Info/personal_page_web_html/blob/master/CONTRIBUTING.md).

## Author

Created and maintained by [Javier Hernán Caballero García](https://javiercaballero.info)).

## License

GNU General Public License v3.0

See  [LICENSE](https://github.com/Javier-Caballero-Info/personal_page_web_html/blob/master/LICENSE)