# Belajar Bahasa API

Ringkasan singkat proyek API untuk menyimpan jawaban latihan bahasa.

## Ringkasan

API ini menyediakan endpoint untuk mengelola user dan menyimpan/men-query jawaban latihan (QuestionAnswer). Dibangun dengan Express + TypeScript dan Prisma (PostgreSQL).

## Setup

1. Pastikan Node.js dan PostgreSQL terinstall.
2. Clone repo dan masuk ke direktori proyek.
3. Install dependensi:

   npm install

4. Siapkan environment variable di file `.env` (contoh di bawah).
5. Generate Prisma client dan jalankan migrasi (jika ada):

   npx prisma generate
   npx prisma migrate dev --name init

6. Jalankan server:

   npm run dev

   # atau

   npm start

## Environment variables

- DATABASE_URL: connection string PostgreSQL
- PORT (opsional): port server (default: 3000)

## Base URL

Untuk development: http://localhost:3000
Semua endpoint diawali dengan /api

## Endpoints

- Users

  - GET /api/users

    - Deskripsi: Ambil semua user
    - Response: 200, { success: true, data: [User] }

  - GET /api/users/:id

    - Deskripsi: Ambil user berdasarkan id
    - Response 200: { success: true, data: User }
    - Response 404: { success: false, error: "User not found" }

  - POST /api/users

    - Deskripsi: Buat user baru (password opsional)
    - Body JSON:
      {
      "username": "string",
      "password": "string (opsional)"
      }
    - Response 201: { success: true, message: "User created successfully", data: { id, username, createdAt } }

  - POST /api/users/login
    - Deskripsi: Login user dengan username dan password
    - Body JSON:
      {
      "username": "string",
      "password": "string"
      }
    - Response 200: { success: true, message: "Login successful", data: { id, username, createdAt } }
    - Response 401: { error: "Invalid password" }
    - Response 404: { error: "User not found" }

- Question Answer

  - POST /api/answer

    - Deskripsi: Simpan jawaban pertanyaan
    - Body JSON:
      {
      "userId": number,
      "session": number,
      "language": "Indonesia" | "English",
      "title": "Quiz" | "Color" | "Family" | "Number",
      "type": "Choice" | "Drag n Drop" | "Fill" | "Guess" | "Listening",
      "number": number,
      "answer": true | false
      }
    - Response 201: { success: true, message: "Question answer created successfully", data: QuestionAnswer }

  - GET /api/answer

    - Deskripsi: Ambil semua jawaban
    - Response 200: { success: true, data: [QuestionAnswer] }

  - GET /api/answer/language/:language

    - Deskripsi: Ambil jawaban berdasarkan bahasa (Indonesia/English)

  - GET /api/answer/user/:userId

    - Deskripsi: Ambil jawaban berdasarkan user id

  - GET /api/answer/:id

    - Deskripsi: Ambil jawaban berdasarkan id

  - GET /api/answer/session/:session
    - Deskripsi: Ambil jawaban berdasarkan session

## Contoh curl

- Buat user:

curl -X POST http://localhost:3000/api/users \
 -H "Content-Type: application/json" \
 -d '{"username":"alice","password":"secret"}'

- Login:

curl -X POST http://localhost:3000/api/users/login \
 -H "Content-Type: application/json" \
 -d '{"username":"alice","password":"secret"}'

- Simpan jawaban:

curl -X POST http://localhost:3000/api/answer \
 -H "Content-Type: application/json" \
 -d '{"userId":1,"session":1,"language":"English","title":"Quiz","type":"Choice","number":1,"answer":true}'

## Model singkat (Prisma)

- User

  - id: Int
  - username: String
  - password: String? (tersimpan hashed bila disediakan)
  - totalTrue: Int
  - totalFalse: Int
  - createdAt: DateTime
  - lastActivity: DateTime?

- QuestionAnswer
  - id: Int
  - userId: Int
  - session: Int
  - language: enum (Indonesia, English)
  - questionTitle: enum (Quiz, Color, Family, Number)
  - questionType: enum (Choice, Drag n Drop, Fill, Guess, Listening)
  - number: Int
  - answer: Boolean
  - createdAt: DateTime

## Error handling

- Umumnya API mengembalikan status 4xx untuk kesalahan klien (bad request, not found, unauthorized) dan 500 untuk error server.
- Response format: { success: false, error: "message" } atau { error: "message" }

## Catatan

- Password di-hash menggunakan bcrypt saat disimpan bila diberikan.
- Pastikan field enum sesuai string yang didefinisikan pada Prisma schema saat melakukan request.
