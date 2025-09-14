# Belajar Bahasa API

API backend untuk aplikasi pembelajaran bahasa yang memungkinkan pengguna untuk mengikuti quiz dan latihan dalam bahasa Indonesia dan Inggris.

## 🚀 Fitur

- ✅ Manajemen pengguna (registrasi, login, profil)
- ✅ Sistem quiz dan latihan multi-bahasa
- ✅ Tracking jawaban dan statistik pengguna
- ✅ Support multiple material pembelajaran (Color, Family, Number, dll)
- ✅ Multiple jenis soal (Choice, Drag & Drop, Fill, Guess, Listening)
- ✅ Database PostgreSQL dengan Prisma ORM
- ✅ Error handling yang komprehensif

## 🛠️ Teknologi

- **Runtime**: Node.js dengan TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: bcrypt untuk hashing password
- **CORS**: Untuk cross-origin requests
- **Package Manager**: Bun

## 📦 Instalasi

### Prasyarat

- Node.js (v18+ disarankan)
- PostgreSQL
- Bun (package manager)

### Langkah Instalasi

1. **Clone repository**

   ```bash
   git clone https://github.com/dwipayogi/belajar-bahasa-api.git
   cd belajar-bahasa-api
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Setup environment variables**

   Buat file `.env` di root directory:

   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/belajar_bahasa_db"
   PORT=3000
   ```

4. **Setup database**

   ```bash
   # Generate Prisma client
   bunx prisma generate

   # Run migrations
   bunx prisma migrate dev --name init
   ```

5. **Jalankan aplikasi**

   **Development mode:**

   ```bash
   bun run dev
   ```

   **Production mode:**

   ```bash
   bun run build
   bun run start
   ```

Server akan berjalan di `http://localhost:3000`

## 📊 Database Schema

### User Model

```prisma
model User {
  id           String    @id @default(uuid())
  username     String
  password     String?   // Optional untuk student accounts
  totalTrue    Int       @default(0)
  totalFalse   Int       @default(0)
  createdAt    DateTime  @default(now())
  lastActivity DateTime?

  questionAnswers QuestionAnswer[]
}
```

### QuestionAnswer Model

```prisma
model QuestionAnswer {
  id            String    @id @default(uuid())
  userId        String
  session       Int
  language      Language  // Indonesia | English
  questionTitle Title     // Quiz | Latihan
  questionType  Type      // Choice | Drag_n_Drop | Fill | Guess | Listening
  questionMat   Material  // Color | Family | Number | Ajakan | Perintah | Tanya | AktifPasif
  number        Int
  answer        Boolean
  createdAt     DateTime  @default(now())
}
```

## 🔗 API Endpoints

### Base URL

```
http://localhost:3000/api
```

### User Endpoints

| Method | Endpoint                    | Deskripsi                                            |
| ------ | --------------------------- | ---------------------------------------------------- |
| `GET`  | `/users`                    | Mendapatkan semua pengguna yang pernah menjawab soal |
| `GET`  | `/users/:id`                | Mendapatkan detail pengguna berdasarkan ID           |
| `GET`  | `/users/:id/answers`        | Mendapatkan semua jawaban pengguna                   |
| `GET`  | `/users/language/:language` | Mendapatkan pengguna berdasarkan bahasa              |
| `POST` | `/users`                    | Membuat pengguna baru                                |
| `POST` | `/users/login`              | Login pengguna                                       |
| `PUT`  | `/users/:id`                | Update statistik pengguna                            |

### Question Answer Endpoints

| Method | Endpoint            | Deskripsi                              |
| ------ | ------------------- | -------------------------------------- |
| `POST` | `/answer`           | Menyimpan jawaban soal                 |
| `GET`  | `/answer/:language` | Mendapatkan jawaban berdasarkan bahasa |

## 📝 Contoh Penggunaan API

### 1. Membuat Pengguna Baru

**Request:**

```http
POST /api/users
Content-Type: application/json

{
  "username": "student123",
  "password": "password123"  // Optional
}
```

**Response:**

```json
{
  "success": true,
  "message": "User created successfully",
  "data": {
    "id": "uuid-here",
    "username": "student123",
    "createdAt": "2024-01-01T12:00:00.000Z"
  }
}
```

### 2. Login Pengguna

**Request:**

```http
POST /api/users/login
Content-Type: application/json

{
  "username": "student123",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "uuid-here",
    "username": "student123",
    "createdAt": "2024-01-01T12:00:00.000Z"
  }
}
```

### 3. Menyimpan Jawaban Soal

**Request:**

```http
POST /api/answer
Content-Type: application/json

{
  "userId": "uuid-here",
  "session": 1,
  "language": "Indonesia",
  "title": "Quiz",
  "type": "Choice",
  "material": "Color",
  "number": 1,
  "answer": true
}
```

**Response:**

```json
{
  "success": true,
  "message": "Question answer created successfully",
  "data": {
    "id": "uuid-here",
    "userId": "uuid-here",
    "session": 1,
    "language": "Indonesia",
    "questionTitle": "Quiz",
    "questionType": "Choice",
    "questionMat": "Color",
    "number": 1,
    "answer": true,
    "createdAt": "2024-01-01T12:00:00.000Z"
  }
}
```

### 4. Mendapatkan Detail Pengguna

**Request:**

```http
GET /api/users/uuid-here
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "uuid-here",
    "username": "student123",
    "totalTrue": 15,
    "totalFalse": 5,
    "createdAt": "2024-01-01T12:00:00.000Z",
    "lastActivity": "2024-01-02T12:00:00.000Z"
  }
}
```

### 5. Update Statistik Pengguna

**Request:**

```http
PUT /api/users/uuid-here
Content-Type: application/json

{
  "totalTrue": 20,
  "totalFalse": 5,
  "lastActivity": "2024-01-02T15:30:00.000Z"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User updated successfully",
  "data": {
    "id": "uuid-here",
    "username": "student123",
    "createdAt": "2024-01-01T12:00:00.000Z"
  }
}
```

## 📋 Enum Values

### Language

- `Indonesia`
- `English`

### Title

- `Quiz`
- `Latihan`

### Type

- `Choice`
- `Drag_n_Drop`
- `Fill`
- `Guess`
- `Listening`

### Material

- `Color`
- `Family`
- `Number`
- `Ajakan`
- `Perintah`
- `Tanya`
- `AktifPasif`

## ⚠️ Error Handling

API mengembalikan response error dalam format standar:

```json
{
  "success": false,
  "error": "Error message here"
}
```

### Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error, invalid JSON, etc.)
- `401` - Unauthorized (invalid password)
- `404` - Not Found (user/resource not found)
- `413` - Request Entity Too Large
- `500` - Internal Server Error

## 🔧 Development

### Project Structure

```
belajarbahasa-API/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── src/
│   ├── controllers/           # Route handlers
│   │   ├── userController.ts
│   │   └── questionAnswerController.ts
│   ├── routes/               # Route definitions
│   │   ├── userRoutes.ts
│   │   └── questionAnswerRoutes.ts
│   └── client.ts             # Prisma client
├── index.ts                  # Main application file
├── package.json
├── tsconfig.json
└── README.md
```

### Menjalankan Migrasi Database

```bash
# Membuat migration baru
bunx prisma migrate dev --name "migration_name"

# Reset database (development only!)
bunx prisma migrate reset

# Melihat status migration
bunx prisma migrate status
```

### Prisma Studio

```bash
bunx prisma studio
```

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

Project Link: [https://github.com/dwipayogi/belajar-bahasa-api](https://github.com/dwipayogi/belajar-bahasa-api)
