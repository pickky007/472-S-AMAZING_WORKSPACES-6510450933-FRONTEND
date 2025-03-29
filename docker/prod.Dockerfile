# Dockerfile for Frontend

# Build Stage
FROM node:22-alpine AS builder
WORKDIR /app

# Install pnpm
COPY package.json  ./
COPY package-lock.json ./
RUN npm install --frozen-lockfile
COPY . . 
RUN npm run build

# Production Stage
FROM nginx:alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy necessary project files
COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]