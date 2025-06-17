# 1. Base image
FROM node:18

# 2. Set working directory
WORKDIR /app

# 3. Copy package files & install deps
COPY package*.json ./
RUN npm install

# 4. Copy source code
COPY . .

# 5. Expose port 8888 (đúng với .env)
EXPOSE 8888

# 6. Run app
CMD ["npm", "start"]
