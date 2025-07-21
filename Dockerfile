# Многоэтапная сборка для оптимизации размера образа
FROM node:20-alpine AS base

# Устанавливаем yarn
RUN corepack enable

# Устанавливаем зависимости только для production
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile --production && yarn cache clean

# Этап сборки
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Собираем приложение
RUN yarn build

# Продакшн этап
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Создаем пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем собранное приложение
COPY --from=builder /app/public ./public

# Устанавливаем права на .next директорию
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Копируем собранное приложение
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Устанавливаем curl для health check
RUN apk add --no-cache curl

# Переключаемся на пользователя nextjs
USER nextjs

# Открываем порт
EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Запускаем приложение
CMD ["node", "server.js"] 