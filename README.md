# **Drop Catch Script**

### **Documentation**

Hello my dear Domainers.  
It's a DropCatching script / software that you can install on your pc / laptop and or on a VPS.

The script is available and working.  
This script can install and work in your pc / laptop and or in a VPS server with single code base.

I recommend using a VPS server for best performance.

You don't need a High spec VPS to run this script. A normal cheap **$5 VPS with 1GB RAM** is enough to run this script.

The script is mainly for Drop Catch service where you can catch **manually or automatically**.

**Every 1 minute,** the script will check your domain availability. when the domain is deleted from the registry database and available for register, it will automatically catch the domain through your API.

The check interval can be customised on your request.

I have added some domain tools with this script like Random English Word domain generator, random letter , random number, random alpha-numeric domains, bulk domains checker, AI domain generator, bulk whois checker etc.

- **Item Name** : Drop Catch Script
- **Created** : Feb 2025
- **Item Version** : v 1.0
- **Author** : Irfan Habib
- **Support Ticket** : neelhabib@gmail.com
- **Demo** : [https://dropcatch.rufy.xyz](https://dropcatch.rufy.xyz)

**Please visit [https://dropcatch.rufy.xyz](https://dropcatch.rufy.xyz)**

# Requirement:

1. **Node JS \> 18.x**
2. **NPM \> 9.x**

# Technology Used

1. **React JS** (Frontend Library for building user interface)
2. **Next JS** (React Framework for Server Side Render)
3. **Node** JS (Backend inbuilt with Next JS)
4. **HeroUI** (A UI framework for React / Nextjs)
5. **Tailwind CSS** (A CSS framework)
6. **MongoDB** (Database)

**For Shared Hosting users, your server must have NodeJS version 18.x installed. Otherwise the script will not work.**

# **Installation:**

# **Install Locally**

If you want to try the script before installing it on the online server, please follow the instruction

Before getting started, you need to install nodejs.  
To install nodejs, goto [node js](https://nodejs.org/en) site. And install an updated version. **18.xxx** is recommended.

If you are using the Windows operating system, use Windows PowerShell Terminal. If you are using linux, use your system terminal.

Move to your project folder and open the terminal here. And type..

    npm install

It will install all necessary packages that are required for the script.

Next, type this command below.

    npm start

> WPTD@1.0 start \> NODE_ENV=production node server.js \> Ready on http://localhost:3000

Now your script is ready to serve at url [**http://localhost:3000**](http://localhost:3000)

Now open your browser, copy and paste the above url, and press enter.

# **Install on VPS (CLI)**

### **Install NodeJS**

We will guide you here on how to install Node Js with NPM, Apache server, and PM2 process manager.  
To install the latest NodeJS version 18.x, type the commands below.

```sh
curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh
```

Then run the below command

```sh
sudo bash nodesource_setup.sh
```

```sh
sudo apt install nodejs
```

This will install NodeJS 18.x and NPM to your system. to verify the version, you can check by below command.

    node -v

Output

> v18.17.0

###

### **Install Apache server.**

To install the Apache2 package, follow the below command line in your terminal.

    sudo apt install apache2

Enable required Apache modules:

Next.js projects often use Node.js and require proxying to the Node.js application running on a different port. To enable the required Apache modules, run:

```
sudo a2enmod proxy
```

```
sudo a2enmod proxy_http
```

```
sudo a2enmod proxy_balancer
```

```
sudo a2enmod lbmethod_byrequests
```

Configure a new virtual host:
Create a new virtual host configuration file for your domain.

```
sudo nano /etc/apache2/sites-available/yoursite.com.conf
```

Replace **yoursite.com** with your own domain.  
Add the following content to the file. Replace **yoursite.com** and **www.yoursite.com** with your domain again.

```sh
<VirtualHost *:80>
    ServerName yoursite.com
    ServerAlias www.yoursite.com

    ProxyPreserveHost On
    ProxyPass / http://localhost:3000/
    ProxyPassReverse / http://localhost:3000/
</VirtualHost>
```

Enable the virtual host: Replace **yoursite.com** with your domain.

    sudo a2ensite yoursite.com

Restart Apache to apply the changes:

    sudo service apache2 restart

That's it.

### **Install PM2 process manager**

PM2 is a process manager, to install it, follow the below command line.

    sudo npm install pm2 -g

We will use this service when we install the script.

# **Install MongoDB**

If you want to use Mongodb Atlas Cloud Database, you can skip this process. You can choose either locally installed Mongodb Database or Cloud Database which is free.

Use this tutorial to install MongoDB 6.0 Community Edition on LTS (long-term support) releases of Ubuntu Linux using the apt package manager.

Type the command below on the terminal.

    sudo apt-get install gnupg curl

On your terminal, please copy and paste below code.

```sh
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg \
   --dearmor
```

Now copy and paste below code to the terminal. please use the code according to your operating system.

**Ubuntu 24.04**

    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu noble/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list

**Ubuntu 22.04**

    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list

**Ubuntu 20.04**

    echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list

Now update the repository.

    sudo apt-get update

Now Install Mongodb.

    sudo apt-get install -y mongodb-org

Now start the mongodb service on your server.

    sudo systemctl start mongod

Type this command to start mongodb on every start on your server.

    sudo systemctl enable mongod

Check whether the mongodb service is running or not.

    sudo systemctl status mongod

This shows a success message like below.

```sh
● mongod.service - MongoDB Database Server
     Loaded: loaded (/lib/systemd/system/mongod.service; disabled; vendor prese>
     Active: active (running) since Mon 2023-08-07 09:38:45 UTC; 6s ago
       Docs: https://docs.mongodb.org/manual
   Main PID: 11249 (mongod)
     Memory: 72.5M
        CPU: 662ms
     CGroup: /system.slice/mongod.service
             └─11249 /usr/bin/mongod --config /etc/mongod.conf
```

That's it. Mongodb is now installed on your system.

# **Install DropCatch Script**

### **Install DropCatch Script**

Finally we are ready to install the DropCatch Script to the server.  
First you need to upload the downloaded zip file to the server root directory. You can put the files to any directory.

Use your favourite ftp tool to upload the files.

Then open the ssh terminal and follow these steps.

Install the unzip package to unzip your zip files.

    sudo apt install unzip

Now move to the directory where you uploaded the DropCatch zip files. and run this command.

    unzip DropCatch.zip

This will unzip the zipped files and you can see a new folder named DropCatch  
Move to the DropCatch folder.

    cd DropCatch

Install the necessary packages by running this command.

    npm install

This will take a few minutes or seconds.  
Now come back to the PM2 process manager. This package require to run your script automatically if your server reboot.

    pm2 start npm --name "dropcatch" -- start

You will see a message like this.

```sh
[PM2] Spawning PM2 daemon with pm2_home=/root/.pm2
[PM2] PM2 Successfully daemonized
[PM2] Starting /usr/bin/npm in fork_mode (1 instance)
[PM2] Done.
┌────┬────────────────────┬──────────┬──────┬───────────┬──────────┬──────────┐
│ id │ name               │ mode     │ ↺    │ status    │ cpu      │ memory   │
├────┼────────────────────┼──────────┼──────┼───────────┼──────────┼──────────┤
│ 0  │ dropcatch          │ fork     │ 0    │ online    │ 0%       │ 34.1mb   │
└────┴────────────────────┴──────────┴──────┴───────────┴──────────┴──────────┘
```

Now enter the command below. It will restart the script automatically if your server reboot.

    pm2 startup
    pm2 save

That's it. Site is online now. You can visit your site.

---

Thank you for choosing our product. If you are facing any trouble, or need any assistance, please create a support ticket or mail us at [**neelhabib@gmail.com**](mailto:neelhabib@gmail.com) .
