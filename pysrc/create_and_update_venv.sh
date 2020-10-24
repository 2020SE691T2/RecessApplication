#!/bin/sh

venv_name="db_venv"

# check if virtual environment already exists
if [ ! -d ${venv_name} ]; then
    # check version of python
    python_version="$(python -V 3>&1)"
    if [ "$(echo $python_version | sed 's/.* \([0-9]\).\([0-9]\).*/\1\2/')" -lt "30" ]; then
        echo "This script requires python 3.0 or greater"
        exit 1
    fi
    
    # create the virtual environment
    echo "Creating virtual environment ${venv_name}"
    pip install virtualenv
    virtualenv -p /usr/bin/python3 ${venv_name}
else
    echo "${venv_name} already exists - update only"
fi

# activate the virtual environment
echo "Activating ${venv_name}"
activate() { . $PWD/${venv_name}/bin/activate; }
activate

python -m pip install --upgrade pip

# get /update requirements
pip install -r requirements.txt

# set vars
host_env_var=$(awk -F "=" '/^host=/ {print $2}' envvars.txt)
user_env_var=$(awk -F "=" '/^user=/ {print $2}' envvars.txt)
password_env_var=$(awk -F "=" '/^password=/ {print $2}' envvars.txt)
database_env_var=$(awk -F "=" '/^database=/ {print $2}' envvars.txt)
PGHOST_env_var=$(awk -F "=" '/^PGHOST=/ {print $2}' envvars.txt)

export host_env_var
export user_env_var
export password_env_var
export database_env_var
export PGHOST_env_var

database_url="postgres://${user_env_var}:${password_env_var}@${host_env_var}/${database_env_var}"
export database_url