#! /bin/bash

# Desinstalar el Xblock, antes de reinstalar

sudo -H -u edxapp bash << EOF
source /edx/app/edxapp/edxapp_env
/edx/bin/pip.edxapp uninstall labprog-xblock -y

/edx/bin/pip.edxapp install /home/ubuntu/xblocks/xblock-labprog

EOF
