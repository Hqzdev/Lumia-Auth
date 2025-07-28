-- Добавляем колонку для отслеживания времени последнего входа
ALTER TABLE "User" ADD COLUMN "lastLoginAt" timestamp;

-- Создаем индекс для быстрого поиска по времени входа
CREATE INDEX IF NOT EXISTS "User_lastLoginAt_idx" ON "User" ("lastLoginAt"); 