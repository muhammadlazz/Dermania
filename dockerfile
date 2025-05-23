# Gunakan Node.js image dari Docker Hub
FROM node:16

# Set direktori kerja di container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json ke container
COPY package*.json ./

# Install dependensi aplikasi
RUN npm install

# Salin seluruh kode ke dalam container
COPY . .

# Bangun aplikasi jika menggunakan TypeScript (opsional)
RUN npm run build

# Expose port yang digunakan aplikasi (misalnya 3000)
EXPOSE 3000

# Jalankan aplikasi menggunakan npm
CMD ["npm", "run", "dev"]
