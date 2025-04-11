1. add subdomain e.g. admin.example.com
2. add nginx config

```
server {
  listen 80;
  server_name admin.example.com;

  root /var/www/tg-stars-admin/dist;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  # Optional: handle static files with longer caching
  location ~* \.(?:ico|css|js|gif|jpe?g|png|woff2?|eot|ttf|otf|svg|webp)$ {
    try_files $uri =404;
    expires 6M;
    access_log off;
    add_header Cache-Control "public";
  }

  # Optional: gzip
  gzip on;
  gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

3. go to /var/www and git clone git@github.com:Seed-Media-Projects/tg-stars-admin.git
4. cd /var/www/tg-stars-admin
5. pnpm i
6. add .env
```
VITE_SERVER_URL=https://api.swiftstars.vip
```
7. pnpm build