# Condor CRM — Frontend

Zamonaviy va chiroyli dizaynga ega CRM tizimi frontend qismi.

## 🚀 Texnologiyalar

| Qatlam | Texnologiya |
|--------|-------------|
| Til | TypeScript (strict) |
| UI kutubxona | React 19 |
| Bundler | Vite 6 |
| Stillar | Tailwind CSS v4 + CSS o'zgaruvchilar |
| Routing | react-router-dom v7 |
| Global state | Zustand v5 |
| Formalar | react-hook-form + zod |
| Grafiklar | Recharts |
| Ikonkalar | lucide-react |
| Animatsiya | framer-motion |
| Mavzu | next-themes (light/dark) |
| Toast | sonner |
| Sana | date-fns, react-day-picker |

## 📁 Loyiha tuzilmasi

```
Front/
├── index.html              # Inter shrift, Telegram Web App SDK
├── vite.config.ts          # alias, /api proxy
├── src/
│   ├── main.tsx            # createRoot + globals.css
│   ├── App.tsx             # ThemeProvider + Routes
│   ├── styles/globals.css  # 🎨 Dizayn tizimi (barcha tokenlar)
│   ├── pages/              # Sahifa komponentlari
│   ├── components/
│   │   ├── ui/             # Bazaviy UI komponentlar (16 ta)
│   │   ├── layout/         # Layout komponentlar
│   │   └── ...             # Bo'lim komponentlari
│   ├── store/              # Zustand store'lar
│   ├── lib/                # API client'lar, util'lar
│   ├── hooks/              # Custom React hook'lar
│   └── types/              # TypeScript tiplari
└── public/                 # Statik fayllar
```

## 🛠️ O'rnatish va ishga tushirish

```bash
# Bog'liqliklarni o'rnatish
npm install

# Development serverini ishga tushirish
npm run dev

# Production build
npm run build

# Build ni preview qilish
npm run preview

# Linter
npm run lint
```

Server: http://localhost:5173

## 🎨 Dizayn tizimi

Loyiha **o'z dizayn tizimidan** foydalanadi (hech qanday tashqi UI kit yo'q).

### Design token'lar

Barcha token'lar `src/styles/globals.css` da `--naf-*` prefiksi bilan:
- **Sirtlar:** `--naf-page-bg`, `--naf-raised-bg`, `--naf-chrome-bg`
- **Matn:** `--naf-body-fg`, `--naf-body-fg-muted`
- **Brend:** `--naf-accent` (orange #f97316)
- **Status:** `--naf-status-{pending,confirmed,rejected}-*`
- **Badge:** `--naf-badge-{neutral,info,success,warning,danger,accent}-*`

### Mavzular

Light va Dark rejimlar avtomatik moslashadi. Sidebar yoki Drawer orqali o'zgartirish mumkin.

## 📦 UI Komponentlar

### Bazaviy komponentlar (`src/components/ui/`)

- `Button` — variant: primary, default, ghost, outline, danger
- `Card` — CardHeader, CardTitle, CardContent, CardFooter
- `Input`, `Label`, `Select` — forma elementlari
- `Badge` — status yorliqlari
- `Avatar` — fallback bilan
- `Table` — TanStack Table bilan
- `Modal`, `Drawer` — dialog oynalar
- `DateRangePicker`, `MonthPicker` — sana tanlash
- `StatCard` — KPI kartochka
- `Skeleton` — yuklanish animatsiyasi
- `EmptyState` — bo'sh holat
- `ProductSearchCombobox` — mahsulot qidiruv

## 📱 Asosiy sahifalar

| Sahifa | Route | Tavsif |
|--------|-------|--------|
| Login | `/login` | Kirish sahifasi |
| Dashboard | `/dashboard` | KPI, grafiklar, statistika |
| Qoldiqlar | `/inventory` | Ombor mahsulotlari jadvali |
| Sotuvlar | `/sales` | Sotuv operatsiyalari |
| Analitika | `/analytics` | Biznes tahlillar va grafiklar |

## 📱 Mobil va Telegram

- Responsive dizayn (mobile-first)
- Telegram Web App SDK integratsiyasi
- Mobil bottom navigation
- Drawer navigatsiya

## 🚀 Keyingi qadamlar

1. API client'larni backend bilan ulash
2. Mahsulot qo'shish/tahrirlash formalari
3. Sotuv yaratish flow
4. Hisobotlar export (PDF/Excel)
5. Real-time bildirishnomalar

---

**NLP-Core-Team** © 2024
