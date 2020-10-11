# Build Relational Database from CSV File w/ Python and Heroku

## Table of Contents
* [Dependencies](#dependencies)
* [Create Environment in Terminal](#create-environment-in-terminal)
* [Set Environment Variables](#set-environment-variables)
* [Unset Environment Variables (in case of issue)](#unset-environment-variables-(in-case-of-issue))
* [Schema](#schema)
* [Generate Mock Data](#generate-mock-data)
* [Run (Create Database and Populate Tables)](#run-(create-database-and-populate-tables))

## Dependencies
* [Anaconda](https://www.anaconda.com/products/individual)
* [Psycopg2](https://www.psycopg.org/install/)

## Create Environment in Terminal
* create the environment from the supplied ```environment.yml``` file
```console
conda env create -f environment.yml
```
* activate the environment
```console
conda activate recess_db
```
* verify new environment installed correctly
```console
conda env list
```
or
```console
conda info --envs
```

**The following variables will need to be set in the environment:**
```console
host
user
password
database
PGHOST
```

The variables ```host```, ```user```, ```password```, ```database``` can be found under [View Credentials...](https://data.heroku.com/datastores/016518f2-8a2b-4645-96e9-3ce4ef69f60d#administration)

Set ```PGHOST=/var/run/postgrsql```


### Set Environment Variables

* check existing variable list
```console
conda env config vars list
```

* set an environment variable
```console
conda env config vars set new_var=value
```

* **NOTE:** Once an environment variable is set, the environment must be reactivated.
```console
conda activate recess_db
```

* check if environment variable has been set
```console
echo new_var
```

### Unset Environment Variables (in case of issue)
```console
conda env config vars unset var_name -n recess_db
```

## Schema
Schema is set in ```db_schema.py```

## Generate Mock Data
```console
python3 gen_mock_data.py
```

## Run (Create Database and Populate Tables)
```console
python3 main.py
```
