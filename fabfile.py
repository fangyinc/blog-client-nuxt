# -*- coding: UTF-8 -*-
# !/usr/bin/python
# install: pip install fabric3

from __future__ import with_statement
from fabric.api import local, settings, abort, run, cd, env, sudo
from fabric.contrib.console import confirm
import os
import asyncio

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
app_name = os.environ.get('ENV_APP_NAME')


def upload():
    file_name = '.nuxt'
    upload_script = 'scp -r ' + local_dir + file_name + ' ' + env.user + '@' + env.hosts[0] + ':' + server_dir
    local(upload_script)

async def build():
    local('npm run build')
    upload()

async def push_and_pull():
    local('git push')
    with cd(server_dir):
        run('git pull')
        run('cnpm install')

def pm2():
    with cd(server_dir):
        text = 'pm2 restart ' + app_name
        run(text)
        sudo('systemctl restart nginx')

def npm_install():
    with cd(server_dir):
        run('cnpm install')
def deploy():
    loop = asyncio.get_event_loop()
    tasks = [build(), push_and_pull()]
    loop.run_until_complete(asyncio.wait(tasks))
    loop.close()
    pm2()