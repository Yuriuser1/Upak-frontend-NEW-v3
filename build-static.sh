
#!/bin/bash
set -e

echo "Starting static build process for Netlify..."

# Резервное копирование файлов
echo "Creating backups..."
if [ -f "next.config.js" ]; then
    cp next.config.js next.config.original.js
fi

# Используем статическую конфигурацию
echo "Using static export configuration..."
cp next.config.static.js next.config.js

# Временно перемещаем API routes и динамические роуты в корень проекта
echo "Moving API routes and dynamic routes outside app directory..."
if [ -d "app/api" ]; then
    mv app/api api_backup
fi

if [ -d "app/dashboard/orders/[id]" ]; then
    mv "app/dashboard/orders/[id]" "dynamic_route_backup"
fi

# Создаем заглушку для динамического роута
mkdir -p "app/dashboard/orders/details"
cat > "app/dashboard/orders/details/page.tsx" << 'EOF'
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function OrderDetailsPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) return <div>Loading...</div>
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <p>This is a static version. Dynamic order details will be available when the full application is deployed.</p>
      <button 
        onClick={() => router.back()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go Back
      </button>
    </div>
  )
}
EOF

# Проверяем наличие DATABASE_URL и создаем mock клиент
if [ -n "$DATABASE_URL" ]; then
    echo "DATABASE_URL found. Generating Prisma client..."
    npx prisma generate
else
    echo "No DATABASE_URL found. Creating mock Prisma client..."
    
    mkdir -p node_modules/.prisma/client
    
    cat > node_modules/.prisma/client/index.js << 'EOF'
// Mock Prisma client for static build
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

echo "Cleaning up..."

# Удаляем заглушку
rm -rf "app/dashboard/orders/details"

# Восстанавливаем API routes
if [ -d "api_backup" ]; then
    mv api_backup app/api
fi

# Восстанавливаем динамические роуты  
if [ -d "dynamic_route_backup" ]; then
    mv dynamic_route_backup "app/dashboard/orders/[id]"
fi

# Восстанавливаем оригинальную конфигурацию
if [ -f "next.config.original.js" ]; then
    mv next.config.original.js next.config.js
fi

echo "Static build completed successfully!"
echo "Static files are in the 'out' directory"
