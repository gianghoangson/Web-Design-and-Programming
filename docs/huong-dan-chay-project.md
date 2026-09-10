# Hướng dẫn chạy và xem bước đầu của project

## Bản hiện tại làm được gì?

Phase 0 dựng nền móng React/TypeScript/Vite, Express/TypeScript và kết nối PostgreSQL qua Prisma. Phase 1 đã thêm giao diện workspace chứng khoán Việt Nam responsive: top navigation, chỉ số mẫu, tóm tắt tài khoản, bảng thị trường, danh mục, trạng thái backend và chuyển đổi trình bày giữa tài khoản chính/giả lập. Phase 1.1 dùng chung một giao diện cho hai route ngôn ngữ: `/vi/overview` và `/en/overview`.

Toàn bộ số liệu hiện tại là demo và có nhãn `DỮ LIỆU MẪU`. Chưa có đăng nhập, API bảng giá, chart, lưu tài khoản 100 triệu, BUY/SELL hoặc giao dịch thật. Các chức năng này thuộc những phase tiếp theo.

VNINDEX, HNXINDEX và UPCOMINDEX là mức chỉ số theo điểm, ví dụ `1.827,12 điểm`; không phải giá trị VND. Giá cổ phiếu, giá trị giao dịch và số dư tài khoản vẫn dùng VND.

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

Mở `http://localhost:5173/vi/overview` cho tiếng Việt hoặc `http://localhost:5173/en/overview` cho tiếng Anh. Route gốc `http://localhost:5173/` tự chuyển sang tiếng Việt. Backend mặc định ở `http://localhost:3001`. Account selector hiện chỉ đổi cách trình bày NORMAL/SIMULATION ở frontend; nó chưa tải tài khoản từ database.

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

## Tài liệu và trạng thái

Tài liệu sản phẩm nằm trong `trading-platform-codex-specs/codex-specs/`. Phase 1.1 đã đạt gate với 25/25 test, build/preview và browser smoke cho cả hai ngôn ngữ ở 1440×900, 768×1024, 390×844.

Bước tiếp theo là Phase 1.2: chuyển frontend hiện tại từ React/TSX sang multi-page HTML/CSS/JavaScript, mỗi trang có `index.html`, `styles.css`, `app.js`. Phase 2 chỉ bắt đầu sau khi hai trang overview đạt parity và gate mới.
