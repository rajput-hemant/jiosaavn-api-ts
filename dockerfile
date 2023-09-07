FROM oven/bun

WORKDIR /app

ENV ENABLE_RATE_LIMIT=true

# disable husky git hooks installation 
ARG HUSKY=0 

# copy package.json and lock file first to cache dependencies
COPY package.json .

RUN bun i

EXPOSE 80:3000

COPY . .

CMD ["bun", "run", "src/index.ts"]