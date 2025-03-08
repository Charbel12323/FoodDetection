FROM node:22


WORKDIR /app

# Copy dependency definitions
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy all backend source code
COPY . .

# Expose the backend port (adjust if necessary)
EXPOSE 3000

CMD ["node", "server.js"]
