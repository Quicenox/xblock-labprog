#!/bin/bash

# Actualizar assets como usuario edxap
sudo -H -u edxapp bash << EOF
source /edx/app/edxapp/edxapp_env
cd /edx/app/edxapp/edx-platform
paver update_assets cms --settings=aws
paver update_assets lms --settings=aws
EOF
# Reiniciar las instancias de edx
#
sudo /edx/bin/supervisorctl restart lms
sudo /edx/bin/supervisorctl restart cms
# sudo /edx/bin/supervisorctl restart edxapp_worker:
