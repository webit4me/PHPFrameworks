if [ ! -f /etc/php.d/zz-blackfire.ini ]; then
    sudo yum install pygpgme -y
    wget -O - "http://packages.blackfire.io/fedora/blackfire.repo" | sudo tee /etc/yum.repos.d/blackfire.repo
    sudo yum install blackfire-agent -y
    sudo blackfire-agent -register
    service httpd restart
    sudo /etc/init.d/blackfire-agent restart
    sudo yum install blackfire-agent
    blackfire config
    sudo yum install blackfire-php
fi
