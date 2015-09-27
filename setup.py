#!/usr/bin/python

import os, sys

vm_ip = '192.168.56.101'
path_installation = os.path.dirname(os.path.realpath(__file__))
path_workspace = path_installation + '/workspace'
path_vagrant = path_installation + '/vagrant'


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
        line_to_write = loopback.ljust(50) % (vm_ip + '\t') + line_signature
        f.write(line_to_write)
    f.write('\n')
    f.close()

    f = open(path_tmp_hosts, 'r')
    print 100 * '_'
    print f.read();
    print 100 * '_'

    doUpdate = raw_input('Can I update your hosts file to what printed above [yes]?') or 'yes'
    if doUpdate == 'yes':
        print 'Copying a backup of your current hosts files into ' + path_hosts_bu;
        os.system('sudo cp %s %s' % (path_hosts, path_hosts_bu))
        os.system('sudo cp %s %s' % (path_tmp_hosts, path_hosts))


print 'Move to the vagrant directory'
os.chdir(path_vagrant)

print 'Boot up  VM'
os.system('vagrant up')

os.chdir(path_workspace + '/cakephp/config')
if not os.path.exists('app.php'):
    print 'Initializing CakePHP'
    print 'CakePHP configuration'
    os.system('cp app.default.php app.php')
    os.system('sed -i -e "s/__SALT__/PHP_FRAMEWORKS/g" app.php')
    os.system('sed -i -e "s/\'database\' => \'my_app\'/\'database\' => \'dbcakephp\'/g" app.php')
    os.system('sed -i -e "s/\'username\' => \'my_app\'/\'username\' => \'dbuser\'/g" app.php')
    os.system('sed -i -e "s/\'password\' => \'secret\'/\'password\' => \'123\'/g" app.php')

    print 'CakePHP update composer'
    os.chdir(path_vagrant)
    os.system("vagrant ssh -c 'cd /workspace/cakephp && composer update'")
    os.chdir(path_workspace + '/cakephp')

os.chdir(path_workspace + '/laravel')
if not os.path.exists('.env'):
    print 'Initializing Laravel'
    print 'Copy .env'
    os.system('cp -n .env.example .env')
    print 'Laravel updae composer withouth runing scripts'
    os.chdir(path_vagrant)
    os.system("vagrant ssh -c 'cd /workspace/laravel && composer update --no-scripts && php artisan key:generate'")

os.chdir(path_workspace + '/symfony')
if not os.path.isabs('vendor'):
    print 'Initializing Symfony'
    print 'Symfony updae composer'
    os.chdir(path_vagrant)
    os.system("vagrant ssh -c 'cd /workspace/symfony && composer update'")

os.chdir(path_workspace + '/zend')
if not os.path.isabs('vendor'):
    print 'Initializing Zend'
    print 'Zend updae composer'
    os.chdir(path_vagrant)
    os.system("vagrant ssh -c 'cd /workspace/Zend && composer update'")

print 'Reaload the VM to kick of the phalconPHP'
os.system('vagrant reload')

updateHosts()