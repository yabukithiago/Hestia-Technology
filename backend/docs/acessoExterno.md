# Configuração de acesso externo

# Instalação nGinx

Num servidor Ubuntu, instale o nGinx com o comando:

```bash
sudo apt-get update
sudo apt-get install nginx
```

# Configuração do nGinx

## Remover a configuração padrão

```bash
sudo rm /etc/nginx/sites-enabled/default
```

## Criar um novo arquivo de configuração

```bash
sudo nano /etc/nginx/sites-available/your_domain
```

```nginx
server {
    listen 80;
    server_name your_domain;

    location / {
        proxy_pass http://localhost:8000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Criar um link simbólico

```bash
sudo ln -s /etc/nginx/sites-available/your_domain /etc/nginx/sites-enabled/
```

## Ativar SSL

```bash
sudo certbot --nginx -d your_domain
```
