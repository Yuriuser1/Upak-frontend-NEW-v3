
#!/bin/bash
set -e

echo "Starting Netlify build process..."

# Резервное копирование оригинальной конфигурации
if [ -f "next.config.js" ]; then
    echo "Backing up original next.config.js..."
    cp next.config.js next.config.original.js
fi

# Используем специальную конфигурацию для Netlify
echo "Using Netlify-optimized next.config.js..."
cp next.config.netlify.js next.config.js

# Временно удаляем API routes чтобы они не включались в статический экспорт
echo "Temporarily removing API routes for static export..."
if [ -d "app/api" ]; then
    mv app/api app/api.backup
    echo "API routes temporarily removed"
fi

# Проверяем наличие DATABASE_URL
if [ -n "$DATABASE_URL" ]; then
    echo "DATABASE_URL found. Generating Prisma client..."
    npx prisma generate
else
    echo "No DATABASE_URL found. Skipping Prisma client generation."
    echo "Creating mock Prisma client..."
    
    # Создаем директорию для mock клиента
    mkdir -p node_modules/.prisma/client
    
    # Создаем простой mock файл
    cat > node_modules/.prisma/client/index.js << 'EOF'
// Mock Prisma client for build without database
class PrismaClient {
  constructor() {
    this.user = {
      findMany: () => Promise.resolve([]),
      findFirst: () => Promise.resolve(null),
      create: () => Promise.resolve({}),
      update: () => Promise.resolve({}),
      delete: () => Promise.resolve({}),
    };
    this.order = {
      findMany: () => Promise.resolve([]),
      findFirst: () => Promise.resolve(null),
      create: () => Promise.resolve({}),
      update: () => Promise.resolve({}),
      delete: () => Promise.resolve({}),
    };
    this.contactForm = {
      create: () => Promise.resolve({}),
    };
  }

  $connect() {
    return Promise.resolve();
  }

  $disconnect() {
    return Promise.resolve();
  }
}

module.exports = { PrismaClient };
EOF

    # Создаем TypeScript определения
    cat > node_modules/.prisma/client/index.d.ts << 'EOF'
export class PrismaClient {
  constructor();
  user: any;
  order: any;
  contactForm: any;
  $connect(): Promise<void>;
  $disconnect(): Promise<void>;
}
EOF

fi

echo "Building Next.js application for static export..."
npx next build

# Восстанавливаем API routes после сборки
if [ -d "app/api.backup" ]; then
    mv app/api.backup app/api
    echo "API routes restored"
fi

# Восстанавливаем оригинальную конфигурацию
if [ -f "next.config.original.js" ]; then
    echo "Restoring original next.config.js..."
    mv next.config.original.js next.config.js
fi

echo "Build completed successfully!"
