module.exports = {
    apps: [{

        script: './node_modules/nuxt-start/bin/nuxt-start.js',
        instances: 'max', //負載平衡模式下的 cpu 數量
        exec_mode: "cluster", //cpu 負載平衡模式
        max_memory_restart: '1G', //緩存了多少記憶體重新整理

        env_prod: {
            "name": 'chiaki_nuxt_prod',
            "PORT": 3001, //指定伺服器上的 port
            "NODE_ENV": "prod"
        },
        env_sit: {
            "name": 'chiaki_nuxt_sit',
            "PORT": 3002, //指定伺服器上的 port
            "NODE_ENV": "sit"
        }

    }],
    deploy: {
        "prod": {
            "user": "chiakilalala", //linux 登入帳號 帳號@ip
            "host": ["35.201.148.166"], //你的伺服器 ip
            "ref": "origin/master", //分支
            "repo": "git@gitlab.com:chiaki205102/nuxt_demo.git", //ssh 的 git
            "path": "/home/chiakilalala/nuxt_demo", //伺服器上的路徑
            "post-deploy": "npm install && npm run build && pm2 reload ecosystem.config.js --env prod", //佈署指令
            "env": {
                "NODE_ENV": "prod"
            }
        }
    }




};