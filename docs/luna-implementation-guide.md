# Hướng dẫn triển khai cho Luna

## Vai trò và vòng làm việc

- Astra: đọc spec, sửa tài liệu yêu cầu, chia task, điều phối và tổng hợp bằng chứng. Không tự viết/debug code ứng dụng.
- Luna: model `gpt-5.6-luna`, reasoning `medium`; triển khai trực tiếp trong workspace được giao, kiểm tra sơ bộ.
- Terra: model `gpt-5.6-terra`, reasoning `medium`; review diff, tái hiện bug, sửa nguyên nhân và bổ sung regression test cần thiết.
- Luna: chạy lại kiểm thử độc lập sau sửa của Terra; báo kết quả thực tế. Chỉ sang phase sau khi gate đạt hoặc báo rõ blocker.

Mỗi lượt chỉ giao một phase có đầu ra cụ thể. Reuse cùng agent khi công việc nối tiếp; không mở nhiều agent đọc lại cả repo. Không tự commit/push/deploy hoặc bắt đầu phase sau khi đang ở checkpoint xem bản đầu.

## Tài liệu và ưu tiên

Đọc `AGENTS.md`, `trading-platform-codex-specs/codex-specs/CODEX.md`, `docs/spec-review.md`, rồi phần phase hiện tại ở card 07 và card liên quan. User instruction ưu tiên cao nhất. Các clarification mới trong `docs/spec-review.md` giải quyết những chỗ chưa chốt ở ví dụ card cũ; không thay stack hoặc phạm vi sản phẩm.

Dùng Ponytail full: dependency khi cần, native/stdlib trước, không thư mục rỗng/interface dự phòng. Những abstraction bắt buộc trong CODEX vẫn phải có khi đến phase của chúng. Không giảm validation, isolation, Decimal, transaction hoặc accessibility để tiết kiệm code.

Superdesign: Phase 0 chuẩn bị sáu file `.superdesign/init/` theo INIT.md dựa trên code thực tế cuối phase. Chưa cần canvas generation vì chưa xây UI sản phẩm. Phase 1 dùng một hướng thiết kế theo card 02, tránh nhiều variants để tiết kiệm credit. Chỉ tạo draft sau CLI preflight/auth thành công; nếu chưa login, báo blocker canvas, vẫn hoàn tất phần backend/tooling độc lập. Không bịa link/draft hoặc tuyên bố đã dùng canvas khi mới có local context.

## Phase 0 — task đang được giao

**Mục tiêu:** clone/install → chạy React + Express → health và PostgreSQL readiness → typecheck/lint/test/build đều có lệnh rõ ràng.

**Write scope:** root package/lock/config/env example/gitignore, `frontend/`, `backend/`, `docker-compose.yml`, `README.md`, `.superdesign/init/`, `docs/phase-0-implementation.md`. Không sửa `AGENTS.md`, bài HTML/CSS gốc, thư mục `skills/` hoặc các spec/guide do Astra phụ trách. Giữ mọi thay đổi sẵn có của user.

**Các bước:**

1. Kiểm tra git status, Node/npm, Docker/Postgres, port trước khi dùng. Pin Node LTS được toolchain hỗ trợ, ghi engines và version file. Node hiện tại là 18.19.1; có thể dùng runtime riêng của task nếu toolchain cần Node mới, không thay Node global. Xác minh package engines qua registry/docs chính thức; lockfile tái lập được.
2. Một npm workspace với `frontend/`, `backend/`; React + TypeScript + Vite và Express + TypeScript. Chỉ cài dependencies dùng ở Phase 0. Những Query/Zustand/chart/socket/auth/domain services đến phase cần mới thêm.
3. Frontend là trang kiểm tra nền móng tiếng Việt, ghi rõ chưa có dữ liệu thị trường/giao dịch; gọi health qua `/api` proxy. Có loading/success/error và retry có accessible label. Chưa tạo dashboard giả hoặc biểu mẫu order hoạt động.
4. Backend tách app factory khỏi server listen để Supertest không mở listener khi import. Zod validate config; port hợp lệ; response envelope theo card 05. `GET /api/v1/health` là liveness không phụ thuộc DB; `GET /api/v1/ready` query PostgreSQL qua Prisma, 503 khi DB chưa sẵn sàng, không leak URL/credentials. Có shutdown cleanup.
5. Prisma client + schema tối thiểu cho connectivity, chưa dựng 12 bảng trước Phase 3. Docker Compose chỉ cần PostgreSQL với healthcheck và named volume; credentials lấy từ local env, có `.env.example` và gitignore. Readiness là phép kiểm tra DB thật, không dùng mock để tuyên bố DB chạy.
6. Root scripts: `dev`, `build`, `typecheck`, `lint`, `format:check`, `test`; DB scripts có tên rõ cho generate/readiness nếu cần. Một lệnh dev chạy cả hai app và dọn child process khi dừng. Đường dẫn có khoảng trắng phải hoạt động.
7. Vitest + Supertest kiểm tra health/readiness cả thành công/thất bại qua dependency injection; RTL kiểm tra frontend status/error/retry thực chất. Viết test cho hành vi có ý nghĩa; không chỉ assert file tồn tại. Build smoke phải chạy artifact backend và frontend được phục vụ.
8. README tiếng Việt: prerequisites, install, env, DB start, dev URL, các checks, stop an toàn, phạm vi chưa có. Không đưa secrets vào client `VITE_*`. Cập nhật sáu Superdesign init artifacts dựa trên code vừa viết.
9. Chạy checks; báo file paths, commands/exit results, runtime lựa chọn, DB/build smoke thực tế, limitation. Đừng sửa spec để che gate chưa đạt. Nếu Docker thiếu, kiểm tra Postgres local/standalone có sẵn; không tự cài system services hoặc thay DB bằng SQLite.

**Gate:** lint + format + typecheck + tests + build pass; frontend/backend boot; readiness query DB thật thành công; khi DB unavailable trả 503. Nếu không có DB runtime phải ghi Phase 0 chưa đạt connectivity gate, giữ test unit riêng với bằng chứng integration.

## Roadmap sau checkpoint

| Phase | Đầu ra | Nguồn | Gate chính |
|---|---|---|---|
| 1 | Tokens, shell, common states, một design direction | 02 | top nav, tiếng Việt, responsive, accessibility |
| 2 | Screens với normalized mock DTO | 03, 05, 08 | navigation; MOCK rõ; chưa bật submit thật |
| 3 | 12 bảng, migrations, auth, accounts/watchlist bootstrap | 04, 05 | DB integration, Decimal, 401/403, isolation |
| 4 | Mock provider/cache và market REST | 05, 08 | search/quote/indices/candles, pagination/sort |
| 5 | Socket.IO subscription/reconnect | 05, 08 | dedup, ordering, freshness, REST recovery |
| 6 | Watchlist và portfolio | 01, 04, 05 | ownership, derived valuations, không tick DB |
| 7 | MarketRuleEngine bằng TDD | 06 | lot/tick/band/session/stale matrix |
| 8 | TradingService/executors, pending/cancel | 04, 06 | concurrency, idempotency, rollback, reset race |
| 9 | Order UI nối API | 03, 05, 06 | confirm, key retry, server errors, NORMAL stub |
| 10–11 | Performance, Simulation/reset | 01, 04, 06 | snapshots không mỗi tick, reset isolation/audit |
| 12–16 | Responsive, degradation, security, performance | 07, CODEX | Playwright journey và mọi release blocker |
| 17 | Packaging/CI/operability | 07, 08 | production build/migrate smoke; deploy cần scope riêng |

Security/validation được thực hiện từ phase liên quan, không trì hoãn tới Phase 15. Real SSI adapter chỉ bắt đầu khi credential và quyền sử dụng có sẵn; mock luôn tồn tại.

## Brief Terra review

Đọc guide, implementation report, diff và code trực tiếp. Giới hạn Phase 0. Ưu tiên lỗi install/run, env leak, readiness giả, process cleanup, cấu hình lệch, tests không kiểm đúng hành vi. Reproduce trước khi sửa; bổ sung regression nhỏ khi có bug. Không rewrite vì sở thích. Báo severity + path + nguyên nhân + fix + commands đã chạy. Giữ phần Astra/user sở hữu.

## Brief Luna retest

Đọc Terra report, chạy lại root checks và smoke cả success/error, xác minh README dùng được từ setup hiện tại. Dùng DB thật nếu có; unit-mocked readiness không thay integration. Ghi `docs/phase-0-verification.md` với PASS/FAIL/BLOCKED riêng cho từng gate và đường dẫn screenshot nếu đã thực sự chụp. Trả kết quả để Astra tổng hợp; dừng ở checkpoint Phase 0.
