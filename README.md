# Belajar Bahasa API

Ringkasan singkat proyek API untuk menyimpan jawaban latihan bahasa.

## Ringkasan

API ini menyediakan endpoint untuk mengelola user dan menyimpan/men-query jawaban latihan (QuestionAnswer). Dibangun dengan Express + TypeScript dan Prisma (PostgreSQL).

## Setup

1. Pastikan Node.js dan PostgreSQL terinstall.
2. Clone repo dan masuk ke direktori proyek.
3. Install dependensi:

   ```bash
   npm install
   ```

4. Siapkan environment variable di file `.env` (contoh di bawah).
5. Generate Prisma client dan jalankan migrasi (jika ada):

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

6. Jalankan server:

   ```bash
   npm run dev
   ```

## Environment variables

- `DATABASE_URL`: connection string PostgreSQL
- `PORT` (opsional): port server (default: 3000)

Contoh file `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/belajarbahasa"
PORT=3000
```

## Base URL

Untuk development: `http://localhost:3000`  
Semua endpoint diawali dengan `/api`

## Endpoints

### Users

- **GET /api/users**

  - Deskripsi: Ambil semua user
  - Response 200:
    ```json
    {
      "success": true,
      "data": [
        {
          "id": "uuid-string",
          "username": "string",
          "totalTrue": 0,
          "totalFalse": 0,
          "createdAt": "datetime",
          "lastActivity": "datetime|null"
        }
      ]
    }
    ```

- **GET /api/users/:id**

  - Deskripsi: Ambil user berdasarkan id (UUID)
  - Response 200:
    ```json
    {
      "success": true,
      "data": {
        "id": "uuid-string",
        "username": "string",
        "totalTrue": 0,
        "totalFalse": 0,
        "createdAt": "datetime",
        "lastActivity": "datetime|null"
      }
    }
    ```
  - Response 404:
    ```json
    { "success": false, "error": "User not found" }
    ```

- **POST /api/users**

  - Deskripsi: Buat user baru (password opsional)
  - Body JSON:
    ```json
    {
      "username": "string",
      "password": "string (opsional)"
    }
    ```
  - Response 201:
    ```json
    {
      "success": true,
      "message": "User created successfully",
      "data": {
        "id": "uuid-string",
        "username": "string",
        "createdAt": "datetime"
      }
    }
    ```
  - Response 400:
    ```json
    { "error": "Username is required" }
    ```

- **POST /api/users/login**
  - Deskripsi: Login user dengan username dan password
  - Body JSON:
    ```json
    {
      "username": "string",
      "password": "string"
    }
    ```
  - Response 200:
    ```json
    {
      "success": true,
      "message": "Login successful",
      "data": {
        "id": "uuid-string",
        "username": "string",
        "createdAt": "datetime"
      }
    }
    ```
  - Response 400:
    ```json
    { "error": "Username and password are required" }
    ```
  - Response 401:
    ```json
    { "error": "Invalid password" }
    ```
  - Response 404:
    ```json
    { "error": "User not found" }
    ```

### Question Answer

- **POST /api/answer**

  - Deskripsi: Simpan jawaban pertanyaan
  - Body JSON:
    ```json
    {
      "userId": "uuid-string",
      "session": 1,
      "language": "Indonesia | English",
      "title": "Quiz | Color | Family | Number",
      "type": "Choice | Drag_n_Drop | Fill | Guess | Listening",
      "number": 1,
      "answer": true
    }
    ```
  - Response 201:
    ```json
    {
      "success": true,
      "message": "Question answer created successfully",
      "data": {
        "id": "uuid-string",
        "userId": "uuid-string",
        "session": 1,
        "language": "English",
        "questionTitle": "Quiz",
        "questionType": "Choice",
        "number": 1,
        "answer": true,
        "createdAt": "datetime"
      }
    }
    ```

- **GET /api/answer**

  - Deskripsi: Ambil semua jawaban
  - Response 200:
    ```json
    { "success": true, "data": [QuestionAnswer] }
    ```
  - Response 404:
    ```json
    { "success": false, "error": "No question answers found" }
    ```

- **GET /api/answer/language/:language**

  - Deskripsi: Ambil jawaban berdasarkan bahasa (Indonesia/English)
  - Response 200:
    ```json
    { "success": true, "data": [QuestionAnswer] }
    ```
  - Response 404:
    ```json
    {
      "success": false,
      "error": "No question answers found for language: {language}"
    }
    ```

- **GET /api/answer/user/:userId**

  - Deskripsi: Ambil jawaban berdasarkan user id (UUID)
  - Response 200:
    ```json
    { "success": true, "data": [QuestionAnswer] }
    ```
  - Response 404:
    ```json
    { "success": false, "error": "No question answers found for this user" }
    ```

- **GET /api/answer/:id**

  - Deskripsi: Ambil jawaban berdasarkan id (UUID)
  - Response 200:
    ```json
    { "success": true, "data": QuestionAnswer }
    ```
  - Response 404:
    ```json
    { "success": false, "error": "Question answer not found" }
    ```

- **GET /api/answer/session/:session**
  - Deskripsi: Ambil jawaban berdasarkan session
  - Response 200:
    ```json
    { "success": true, "data": [QuestionAnswer] }
    ```
  - Response 404:
    ```json
    { "success": false, "error": "No question answers found for this session" }
    ```

## Contoh curl

### Buat user:

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"secret"}'
```

### Login:

```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"username":"alice","password":"secret"}'
```

### Simpan jawaban:

```bash
curl -X POST http://localhost:3000/api/answer \
  -H "Content-Type: application/json" \
  -d '{"userId":"uuid-dari-user","session":1,"language":"English","title":"Quiz","type":"Choice","number":1,"answer":true}'
```

### Ambil semua user:

```bash
curl -X GET http://localhost:3000/api/users
```

### Ambil jawaban berdasarkan bahasa:

```bash
curl -X GET http://localhost:3000/api/answer/language/English
```

## Model singkat (Prisma)

### User

- `id`: String (UUID)
- `username`: String
- `password`: String? (tersimpan hashed bila disediakan)
- `totalTrue`: Int (default: 0)
- `totalFalse`: Int (default: 0)
- `createdAt`: DateTime
- `lastActivity`: DateTime?

### QuestionAnswer

- `id`: String (UUID)
- `userId`: String (UUID, foreign key ke User)
- `session`: Int
- `language`: enum (Indonesia, English)
- `questionTitle`: enum (Quiz, Color, Family, Number)
- `questionType`: enum (Choice, Drag_n_Drop, Fill, Guess, Listening)
- `number`: Int
- `answer`: Boolean
- `createdAt`: DateTime

### Enum Values

- **Language**: `Indonesia`, `English`
- **Title**: `Quiz`, `Color`, `Family`, `Number`
- **Type**: `Choice`, `Drag_n_Drop`, `Fill`, `Guess`, `Listening`

> **Catatan**: Untuk type "Drag n Drop" gunakan `Drag_n_Drop` dalam request body.

## Error handling

- API mengembalikan status 4xx untuk kesalahan klien (bad request, not found, unauthorized) dan 500 untuk error server.
- Response format untuk error:
  ```json
  { "success": false, "error": "message" }
  ```
  atau
  ```json
  { "error": "message" }
  ```

### Status Codes Umum

- `200`: OK - Request berhasil
- `201`: Created - Resource berhasil dibuat
- `400`: Bad Request - Request tidak valid
- `401`: Unauthorized - Autentikasi gagal
- `404`: Not Found - Resource tidak ditemukan
- `413`: Payload Too Large - Request body terlalu besar
- `500`: Internal Server Error - Error server

## Catatan Pengembangan

- Password di-hash menggunakan bcrypt saat disimpan bila diberikan.
- ID menggunakan UUID string, bukan integer.
- Pastikan field enum sesuai string yang didefinisikan pada Prisma schema saat melakukan request.
- Server mendukung CORS untuk cross-origin requests.
- Request body memiliki limit 10MB.
- Untuk type "Drag n Drop", gunakan `Drag_n_Drop` (dengan underscore).

## Tech Stack

- **Runtime**: Node.js dengan ts-node-dev untuk development
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Security**: bcrypt untuk hashing password
- **CORS**: Enabled untuk cross-origin requests
