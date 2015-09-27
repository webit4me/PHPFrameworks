#!/usr/bin/python

import os, sys

if '-v' in sys.argv:
    VERBOSE = 1
else:
    VERBOSE = 0

if '-d' in sys.argv:
    DRY_RUN = 1
else:
    DRY_RUN = 0

BLACK, RED, GREEN, YELLOW, BLUE, MAGENTA, CYAN, WHITE = range(8)

VM_IP = '192.168.56.101'

path_installation = os.path.dirname(os.path.realpath(__file__))
path_workspace = path_installation + '/workspace'
path_vagrant = path_installation + '/vagrant'


def inform(text, colour=CYAN):
    print "\x1b[1;%dm" % (30 + colour) + text + "\x1b[0m"


def confirm(text, colour=CYAN):
    return raw_input("\x1b[1;%dm" % (30 + colour) + text + "\x1b[0m")


def runCommand(cmd):
    if VERBOSE == 1:
        inform(cmd, BLUE)

    if DRY_RUN == 0:
        os.system(cmd)


def updateHosts():
    if 'linux' or 'darwin' in sys.platform:
        path_etc = '/etc/'
    else:
        path_etc = 'c:\windows\system32\drivers\etc\\'

    path_tmp_hosts = 'hosts.tmp'
    path_hosts = path_etc + 'hosts'
    path_hosts_bu = path_etc + 'hosts.bu'

    line_signature = '## PHPFrameworks'

    loopbacks = [
        "%s local.php.frameworks",
        "%s phpframeworks.dev  www.phpframeworks.dev",
        "%s cakephp.dev        www.cakephp.dev",
        "%s kohana.dev         www.kohana.dev",
        "%s laravel.dev        www.laravel.dev",
        "%s phalconphp.dev     www.phalconphp.dev",
        "%s symfony.dev        www.symfony.dev",
        "%s zend.dev           www.zend.dev"
    ];

    f = open(path_hosts, 'r')
    lines = f.readlines()
    f.close()

    f = open(path_tmp_hosts, 'w')
    for line in lines:
        if line_signature not in line:
            f.write(line)
    f.close()

    f = open(path_tmp_hosts, 'a')
    for loopback in loopbacks:
        f.write('\n')
        line_to_write = loopback.ljust(50) % (VM_IP + '\t') + line_signature
        f.write(line_to_write)
    f.write('\n')
    f.close()

    f = open(path_tmp_hosts, 'r')
    inform(100 * '_')
    inform(f.read(), WHITE);
    inform(100 * '_')

    doUpdate = confirm('Can I update your hosts file to what printed above [yes]?') or 'yes'
    if doUpdate == 'yes':
        inform('Copying a backup of your current hosts files into ' + path_hosts_bu)
        runCommand('sudo cp %s %s' % (path_hosts, path_hosts_bu))
        runCommand('sudo cp %s %s' % (path_tmp_hosts, path_hosts))
        runCommand('rm ' + path_tmp_hosts)


inform('This script will setup the PHPframeworks\' Virtual machin and will require sudo accesss to:')
inform('\t 1. Mount NFS shared folder during initial vagrant up in the beginning')
inform('\t 2. Mount NFS shared folder during vagrant reload end of the process')
inform('\t 3. To update you hosts files with required loopbacks')

shall_we = confirm('Shall we continue [yes/no]?', MAGENTA) or 'No'

if shall_we != 'yes':
    quit('Exiting the setup process')

inform('Move to the vagrant directory')
os.chdir(path_vagrant)

inform('Boot up  the VM')
runCommand('vagrant up')

os.chdir(path_workspace + '/cakephp/config')
if not os.path.exists('app.php'):
    inform('Setting up CakePHP')
    inform('CakePHP configuration')
    runCommand('cp app.default.php app.php')
    runCommand('sed -i -e "s/__SALT__/PHP_FRAMEWORKS/g" app.php')
    runCommand('sed -i -e "s/\'database\' => \'my_app\'/\'database\' => \'dbcakephp\'/g" app.php')
    runCommand('sed -i -e "s/\'username\' => \'my_app\'/\'username\' => \'dbuser\'/g" app.php')
    runCommand('sed -i -e "s/\'password\' => \'secret\'/\'password\' => \'123\'/g" app.php')

    inform('CakePHP update composer')
    os.chdir(path_vagrant)
    runCommand("vagrant ssh -c 'cd /workspace/cakephp && composer update'")
    os.chdir(path_workspace + '/cakephp')

os.chdir(path_workspace + '/laravel')
if not os.path.exists('.env'):
    inform('Setting up Laravel')
    inform('Copy .env file')
    runCommand('cp -n .env.example .env')
    inform('Laravel updae composer withouth runing scripts')
    os.chdir(path_vagrant)
    runCommand("vagrant ssh -c 'cd /workspace/laravel && composer update --no-scripts && php artisan key:generate'")

os.chdir(path_workspace + '/symfony')
if not os.path.isabs('vendor'):
    inform('Setting Symfony')
    inform('Symfony updae composer')
    os.chdir(path_vagrant)
    runCommand("vagrant ssh -c 'cd /workspace/symfony && composer update'")

os.chdir(path_workspace + '/zend')
if not os.path.isabs('vendor'):
    inform('Setting up Zend')
    inform('Zend updae composer')
    os.chdir(path_vagrant)
    runCommand("vagrant ssh -c 'cd /workspace/Zend && composer update'")

inform('Reaload the VM to kick of the phalconPHP')
runCommand('vagrant reload')

updateHosts()

runCommand('curl -sSf http://local.php.frameworks > /dev/null')

inform('All done! head to http://local.php.frameworks to check status of all of your fresh PHP frameworks', MAGENTA)
