# 📦 RequestTrack Backend

Бэкенд RequestTrack построен на **TypeScript**, **Node.js**, **Express**, **PostgreSQL** и **Drizzle ORM**.  
Разработка и запуск осуществляется в окружении **Docker**.

---

## 🚀 Быстрый старт

1. Склонируй репозиторий:
   ```bash
   ````git clone https://github.com/mukhammat/RequestTrack.git
   ```cd RequestTrack

2. Запусти проект:
   ```bash
   ```docker compose up --build

## ⌨️ Ручной старт

1. Склонируй репозиторий:
   ```bash
   ```git clone https://github.com/mukhammat/RequestTrack.git
   ```cd RequestTrack

2. Создай .env
    ```
    DATABASE_URL="postgresql://postgres:nohamylove@localhost:5432/backend_test_db? schema=public"
    PORT=5000
    NODE_ENV=development
    ```
    Если в production установит для `NODE_ENV=production`

3. Сгенерируйте и мигрируйте бд
```
    npm run generate
    npm run migrate
```

4. Запустите проект
```npm run dev```

    Если в production соберите проект:
```npm run build```

    затем запустите
```npm start```