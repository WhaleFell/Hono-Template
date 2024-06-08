# Hono-Tamplate

Hono Offical Document: [hono.dev](https://hono.dev/)

Hono is a **lightweight**, **high-performance** nodeJS web framework.

This is a simple template that follows [hono best practices](https://hono.dev/guides/best-practices). It supports deployment on various platforms, `docker` `nodeJS` `cloudflare worker` `vercel` ... e.g.

## APP Structure

```shell

```

## Deploy

Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/whalefell/Hono-Tamplate)

Cloudflare:

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/whalefell/Hono-Tamplate)

Docker:

configure the docker mirror if u need:

```shell
sudo mkdir -p /etc/docker
sudo nano /etc/docker/daemon.json
{
    "registry-mirrors": [
        "https://dockerproxy.com",
        "https://docker.mirrors.ustc.edu.cn",
        "https://docker.nju.edu.cn"
    ]
}
sudo systemctl daemon-reload
sudo systemctl restart docker
```

build and setup:

```shell
docker build -t tile-map-proxy .
docker compose build
docker compose up -d
docker compose down --volumes --rmi all

# remove all unused resources
docker network prune
docker volume prune
```

## Compatibility

This project is ueing latest NodeJS LTS(Long Time support) version(v20.13.1). And it use the es6 module system(not CommonJS) and TypeScript. So make sure your `package.json` have type: `module` and `engines` >=20.0.0

## Develop

```shell
pnpm install

pnpm create hono my-app
pnpm add --save-dev --save-exact prettier
pnpm add -D typescript ts-node @types/node
pnpm add -g tsx
```

## References

tsx: [What is tsx?](https://dev.to/_staticvoid/how-to-run-typescript-natively-in-nodejs-with-tsx-3a0c)
