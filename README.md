# sBoard Skia Test

TypeScript-приложение: рендер сцены **PixiJS** и её отображение через **Skia (CanvasKit WASM)** на двух канвасах.

**Демо:** [https://losbojos.github.io/sboard_skia_test/](https://losbojos.github.io/sboard_skia_test/)

## Описание

Pixi хранит сцену (`PIXI.Container` с фигурами и спрайтами). Skia-канвас — зеркало той же сцены: конвертер обходит дерево Pixi и рисует векторную графику и растровые спрайты с учётом `worldTransform`.

## Возможности

| Функция | Статус |
|---------|--------|
| Pixi → Skia конвертер (`Graphics`, `Sprite`, трансформации) | ✅ |
| Два канваса, синхронизация при старте и добавлении фигур | ✅ |
| Демо-сцена и генерация случайных фигур | ✅ |
| `pointerdown` / `pointerup` на Pixi-канвасе | ✅ |
| `pointerdown` / `pointerup` на Skia-канвасе (hit-test через Pixi) | ✅ |
| Выделение красной рамкой (независимо на каждом канвасе) | ✅ |
| Экспорт в векторный PDF | ⏳ заглушка |

### Поддерживаемые объекты Pixi

- **Graphics** — прямоугольники, эллипсы, многоугольники, линии; заливка и обводка
- **Sprite** — PNG и растровые текстуры (в т.ч. `Text` как растр в Pixi v7)

### Ограничения

- Текст рисуется в Skia как **растровый** спрайт, не векторный шрифт
- Hit-test на Skia-канвасе использует сцену Pixi (отдельного дерева объектов в Skia нет)
- PDF-экспорт пока не реализован (`PdfExporterStub`)

## Технологии

| Компонент | Версия |
|-----------|--------|
| TypeScript | ~6.0 |
| Vite | ^8 |
| PixiJS | `7.2.4-legacy`, `forceCanvas: true` |
| Skia | `canvaskit-wasm` ^0.41 |

## Структура проекта

```
src/
├── app/           # Сборка приложения
├── config/        # Конфигурация канваса, Pixi, UI
├── core/          # Утилиты (цвета, размер канваса, рамка выделения)
├── pixi/          # Сцена, фигуры, pointer-события Pixi
├── skia/          # CanvasKit, конвертер Pixi → Skia, pointer Skia
├── pdf/           # Интерфейс экспорта PDF (заглушка)
└── ui/            # Привязка кнопок
```

## Локальный запуск

Требуется Node.js 20+.

```bash
npm install
npm run dev
```

Откройте адрес из консоли (обычно `http://localhost:5173`).

### Сборка

```bash
npm run build
npm run preview   # просмотр production-сборки локально (base: /)
```

## Деплой на GitHub Pages

Сайт: `https://losbojos.github.io/sboard_skia_test/`

`vite.config.ts` задаёт `base: '/sboard_skia_test/'` при `GITHUB_PAGES=true` (см. [workflow](.github/workflows/deploy.yml)).

При push в `main` срабатывает [GitHub Actions](.github/workflows/deploy.yml): сборка и публикация `dist/`.

**Первоначальная настройка (один раз):**

1. **Settings** → **Pages**
2. **Build and deployment** → Source: **GitHub Actions**
3. Push в `main` — дождаться зелёного workflow в **Actions**

Проверка сборки под Pages локально:

```bash
# PowerShell
$env:GITHUB_PAGES='true'; npm run build; npm run preview

# bash
GITHUB_PAGES=true npm run build && npm run preview
```

## Скрипты npm

| Команда | Описание |
|---------|----------|
| `npm run dev` | Режим разработки |
| `npm run build` | TypeScript + production-сборка |
| `npm run preview` | Локальный просмотр `dist/` |

## Лицензия

Тестовое задание.
