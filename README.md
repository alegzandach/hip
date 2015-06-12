# bronchial
Bronchial Stent Designer/Viewer

## Prerequisites

 - python
 - virtualenv
 - pip
 - node

## Installation
1.	`git pull git@github.com:CustomOrthopaedics/bronchial.git`

2.	`cd bronchial/`

3.	`virtualenv env`

4. 
	#### On *nix:
	
	`source env/bin/activate`
	
	#### On Windows:
	
	`env/Scripts/activate.bat`

5.	`pip install -r requirements`

6.	`npm install`

## Usage

1.	`npm start`
	
2.	Navigate to http://localhost:8000


## Test
	#### Unit tests:
	
	`npm test`
	
	#### End-to-End tests:
	
	1.	`npm start`

	2.	In a separate terminal: `npm run protractor`
