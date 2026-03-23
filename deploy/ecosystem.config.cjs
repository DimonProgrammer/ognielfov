// PM2 конфигурация для decap-server
// Запуск: pm2 start deploy/ecosystem.config.cjs
module.exports = {
  apps: [
    {
      name: "decap-server",
      script: "npx",
      args: "decap-server",
      cwd: "/var/www/elfprint",
      watch: false,
      autorestart: true,
      max_restarts: 10,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
