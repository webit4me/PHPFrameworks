git clone git://github.com/phalcon/cphalcon.git
cd cphalcon/build
./install
cd ..
cd ..
rm -rf cphalcon
echo "extension=phalcon.so" > /etc/php.d/20-phalcon.ini
service httpd restart
