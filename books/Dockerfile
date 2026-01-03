# --- Giai đoạn 1: Build React ---
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Giai đoạn 2: Chạy bằng Nginx ---
FROM nginx:alpine
# Copy file đã build từ giai đoạn 1 sang Nginx
COPY --from=build /app/dist /usr/share/nginx/html
# Copy file cấu hình nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]