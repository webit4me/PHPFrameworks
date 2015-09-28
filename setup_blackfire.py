#!/usr/bin/python

import os, sys

BLACK, RED, GREEN, YELLOW, BLUE, MAGENTA, CYAN, WHITE = range(8)

path_installation = os.path.dirname(os.path.realpath(__file__))
path_vagrant = path_installation + '/vagrant'
path_config = path_vagrant + '/puphpet/config.yaml'


def say(text, colour=CYAN):
    print "\x1b[1;%dm" % (30 + colour) + text + "\x1b[0m"


def ask(text, colour=MAGENTA):
    return raw_input("\x1b[1;%dm" % (30 + colour) + text + "\x1b[0m")


intro = """
This script is going to setup the BlackFire profiler in your VirtualBox.
In order to do this we are going to need your BlackFire's server and client ID and Token
These information are retrievable from your profile [https://blackfire.io/account/credentials]
If you don't have a BlackFire account yet, its free just give it a try ;)
"""
say(intro)

shall_we_start = ask("Are we ready to start [Yes/no]?") or 'Yes'

if (shall_we_start != 'Yes'):
    quit("Quite the process")

# client_id = ask("What's your BlackFire's client ID? ")
# client_token = ask("What's your BlackFire's Client Token? ")
server_id = ask("What's your BlackFire's Server ID? ")
server_token = ask("What's your BlackFire's Server Token? ")


cmd_replace_install = """sed -i -e "
/blackfire/ {
N
/.*install:.*/ {
s/install:.*/install: '1'/
}
}" %s""" % (path_config)

cmd_replace_server_id = """sed -i -e "
/blackfire/ {
N
N
N
/.*server_id:.*/ {
s/server_id:.*/server_id: '%s'/
}
}" %s""" % (server_id, path_config)


cmd_replace_server_token = """sed -i -e "
/blackfire/ {
N
N
N
N
/.*server_token:.*/ {
s/server_token:.*/server_token: '%s'/
}
}" %s""" % (server_token, path_config)

os.system(cmd_replace_install)
os.system(cmd_replace_server_id)
os.system(cmd_replace_server_token)

os.chdir(path_vagrant)

os.system('vagrant provision')
os.system('vagrant ssh -c "blackfire config"')
os.system('vagrant ssh -c "sudo /etc/init.d/blackfire-agent restart"')
os.system('vagrant reload')

