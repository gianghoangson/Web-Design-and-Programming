# Vietnamese Trading Platform — Phase 0

Nền móng React + Express cho nền tảng chứng khoán Việt Nam. Phase 0 chỉ kiểm tra kết nối ứng dụng và PostgreSQL; chưa có dữ liệu thị trường, tài khoản hay giao dịch.

## Yêu cầu

- Node `22.13.0` (dùng `.nvmrc`; Node 18 của máy chủ không đáp ứng engine)
- npm `9+`
- Docker Compose nếu cần readiness PostgreSQL thật

## Cài đặt

```bash
cp .env.example .env
npm ci
npm run db:generate
```

Đổi `POSTGRES_PASSWORD` và phần mật khẩu tương ứng trong `DATABASE_URL` trong `.env` trước khi dùng. File này bị Git bỏ qua; Docker Compose chỉ đọc credentials từ đó.

Khởi động PostgreSQL local:

```bash
docker compose up -d postgres
```

Chạy cả backend và frontend:

```bash
npm run dev
```

Frontend ở `http://localhost:5173`; backend ở `http://localhost:3001`. Health là `GET /api/v1/health`; readiness là `GET /api/v1/ready` và chỉ thành công khi query PostgreSQL thật chạy được.

## Kiểm tra

```bash
npm run lint
npm run format:check
npm run typecheck
npm test
npm run build
npm run db:readiness
```

Với máy chỉ có Node 18, chạy qua runtime task-local đã pin:

```bash
npx --yes -p node@22.13.0 -c 'npm test'
```

Dừng app bằng `Ctrl+C`; script root sẽ gửi SIGTERM cho cả hai process con. Dừng DB bằng `docker compose down` (giữ volume) hoặc `docker compose down -v` nếu muốn xóa dữ liệu local.

## Giới hạn Phase 0

Schema Prisma chỉ có model probe để kiểm tra connectivity. Không có auth, market data, portfolio, order, trading, broker hay dashboard giả. Xem [docs/phase-0-implementation.md](docs/phase-0-implementation.md) để biết gate và blocker runtime hiện tại.
