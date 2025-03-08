FROM node:22

WORKDIR /app

# Copy package files
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Install @expo/ngrok globally to avoid the prompt
RUN npm install -g @expo/ngrok

# Copy the rest of your code
COPY . .

# Expose the port used by Expo (default 8081)
EXPOSE 8081

# Start Expo in tunnel mode without interactive prompts
CMD ["npx", "expo", "start", "--tunnel"]
