# -*- coding: UTF-8 -*-
# !/usr/bin/python
# install: pip install fabric3

from __future__ import with_statement
from fabric.api import local, settings, abort, run, cd, env, sudo
from fabric.contrib.console import confirm
import os

if os.path.exists('.env'):
    print('Importing environment from .env...')
    for line in open('.env'):
        var = line.strip().split('=')
        if len(var) == 2:
            os.environ[var[0]] = var[1]

server_host = []
server_host.append(str(os.environ.get('ENVHOST')))
env.hosts = server_host
env.user = os.environ.get('ENVUSER')
env.sudo_user = os.environ.get('ENVSUDO_USER')
env.password = os.environ.get('ENVPASSWORD')

server_dir = os.environ.get('ENV_SERVER_DIR')
local_dir = os.environ.get('ENV_LOCAL_FILE')


def deploy():
    build()
    upload()
    with cd(server_dir):
        sudo('systemctl restart nginx')


def upload():
    file_name = 'dist'
    upload_script = 'scp -r ' + local_dir + file_name + ' ' + env.user + '@' + env.hosts[0] + ':' + server_dir
    local(upload_script)


def build():
    local('npm run build')
