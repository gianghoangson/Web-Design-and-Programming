# Hướng dẫn chạy và xem bước đầu của project

## Bản hiện tại làm được gì?

Phase 0 dựng nền móng React/TypeScript/Vite, Express/TypeScript và kết nối PostgreSQL qua Prisma. Trang tiếng Việt kiểm tra trạng thái backend, hiển thị lỗi và cho thử lại.

Chưa có đăng nhập, bảng giá, chart, tài khoản 100 triệu, BUY/SELL hoặc giao dịch thật. Các chức năng này thuộc những phase tiếp theo.

## Mở đúng thư mục và runtime

```bash
cd '/home/thanh-dat/Documents/Web architecture project/Web-Design-and-Programming'
```

Dùng phiên bản Node trong `.nvmrc`. Nếu đã cài nvm:

```bash
nvm install
nvm use
node --version
```

Máy đang có Node 18; cần runtime Node phù hợp trước khi chạy các lệnh npm bên dưới. Xem README để dùng runtime riêng của task nếu chưa có nvm.

Không có nvm thì bọc từng lệnh npm bằng runtime riêng, ví dụ:

```bash
npx --yes -p node@22.13.0 -c 'npm ci'
npx --yes -p node@22.13.0 -c 'npm run dev'
```

Cách này không thay Node global; có thể cần tải runtime ở lần đầu.

## Cài và khởi động

Chỉ tạo `.env` từ mẫu nếu chưa có file cấu hình riêng:

```bash
test -f .env || cp .env.example .env
```

Trong `.env`, đặt `POSTGRES_PASSWORD` và cập nhật phần mật khẩu tương ứng của `DATABASE_URL` cho khớp. Sau đó:

```bash
npm ci
npm run db:generate
docker compose up -d postgres
npm run dev
```

Docker Compose cần được cài và daemon đang chạy. Có thể dùng PostgreSQL tự quản lý nếu `DATABASE_URL` trỏ đúng DB đó. `.env` chứa cấu hình local, không đưa lên Git.

Mở `http://localhost:5173` để xem trang đầu. Backend mặc định ở `http://localhost:3001`.

## Kiểm tra nhanh

Trong terminal thứ hai:

```bash
curl -i http://localhost:3001/api/v1/health
curl -i http://localhost:3001/api/v1/ready
npm run db:readiness
```

`health` trả 200 khi backend hoạt động. `ready` chỉ trả 200 khi query PostgreSQL thành công; 503 nghĩa DB chưa sẵn sàng. Trang báo backend hoạt động không tự chứng minh DB đã kết nối.

Chạy kiểm tra code:

```bash
npm run lint
npm run format:check
npm run typecheck
npm test
npm run build
```

`build` tạo bản biên dịch, không tự triển khai website lên Internet.

## Dừng và xử lý lỗi

- Dừng ứng dụng bằng `Ctrl+C` tại terminal chạy `npm run dev`.
- Dừng PostgreSQL bằng `docker compose down`; volume vẫn giữ dữ liệu.
- Nếu báo sai Node engine, kiểm tra `node --version` và `.nvmrc`.
- Nếu cổng đã dùng, dừng đúng tiến trình của project hoặc đổi cấu hình theo README; không kill tiến trình không rõ nguồn.
- Nếu readiness 503, kiểm tra DB đang chạy, credentials, port và `DATABASE_URL`.

## Cách tiếp tục làm việc với agent

Astra lập kế hoạch/giao việc → Luna medium triển khai → Terra medium review/debug → Luna kiểm thử lại. Mỗi phase có gate và báo cáo; không đánh dấu toàn bộ P0 hoàn tất chỉ vì trang chạy.

Tài liệu cần đọc:

- [Hướng dẫn giao việc cho Luna](luna-implementation-guide.md).
- [Những điểm spec đã làm rõ](spec-review.md).
- [Báo cáo triển khai Phase 0](phase-0-implementation.md).
- [Review và các lỗi Terra đã sửa](phase-0-review.md).

Bước kế tiếp sau khi Phase 0 đạt gate là Phase 1: dùng Superdesign xây một hướng giao diện dark, top navigation, nhãn tiếng Việt và bảng dữ liệu theo card 02. Ponytail giúp chỉ thêm component/dependency khi phase thực sự cần. Superdesign đã đăng nhập; Phase 0 chỉ chuẩn bị context local, chưa tạo canvas/draft.
