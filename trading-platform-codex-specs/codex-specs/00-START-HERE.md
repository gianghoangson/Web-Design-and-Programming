# 00 — START HERE

## Mục đích của bộ spec

Thư mục này là bộ instruction để Codex triển khai **Vietnamese Stock Trading Platform / Paper Trading Platform** theo đúng các quyết định đã chốt trong Google Doc nguồn. Đây không phải bản dump nội dung thô: mỗi file đã được chuyển thành task/spec có scope, dependency, contract, test và acceptance criteria để có thể đưa thẳng vào repo.

## Thứ tự đọc bắt buộc

1. Đọc **`CODEX.md` trước tiên**. Đây là global contract và có độ ưu tiên cao nhất trong bộ spec.
2. Sau đó xử lý **một file một lần**, đúng thứ tự:
   1. `01-the-1.md`
   2. `02-ui-ux-section-1.md`
   3. `03-the-3.md`
   4. `04-the-4.md`
   5. `05-the-5.md`
   6. `06-the-6.md`
   7. `07-the-7.md`
   8. `08-the-8.md`
3. Sau mỗi card: chạy test/lint/typecheck liên quan, sửa lỗi trước khi chuyển card tiếp theo.
4. Không tự mở rộng scope sang P1/P2 chỉ vì thấy kiến trúc có chỗ để mở rộng.

## Mapping 8 tab nguồn → 8 file

| # | Google Doc tab | File |
|---|---|---|
| 1 | Thẻ 1 | `01-the-1.md` |
| 2 | UI/UX Section 1 | `02-ui-ux-section-1.md` |
| 3 | Thẻ 3 | `03-the-3.md` |
| 4 | Thẻ 4 | `04-the-4.md` |
| 5 | Thẻ 5 | `05-the-5.md` |
| 6 | Thẻ 6 | `06-the-6.md` |
| 7 | Thẻ 7 | `07-the-7.md` |
| 8 | Thẻ 8 | `08-the-8.md` |

> Lưu ý: `08-the-8.md` cố ý chứa **hai tài liệu cùng nằm trong Thẻ 8**: `DOCUMENT 06 — MVP TECHNICAL SPECIFICATION` và `DOCUMENT 07 — MARKET DATA INTEGRATION SPECIFICATION`. Không tách thành card thứ 9.

## Quy tắc xử lý xung đột giữa các card

Các tài liệu được soạn theo quá trình refine dần. Nếu chi tiết cũ và mới mâu thuẫn, ưu tiên theo thứ tự:

1. `CODEX.md` — quyết định khóa toàn project.
2. Card có tài liệu/chốt kỹ thuật mới hơn, đặc biệt `08-the-8.md`.
3. Business logic trong `06-the-6.md` đối với luật giao dịch.
4. API contract trong `05-the-5.md` đối với REST/WebSocket.
5. Database contract trong `04-the-4.md` đối với persistent state.
6. UI details trong `02-...` và `03-...` đối với giao diện/interaction.

Các reconciliation đã chốt:

- P0 Simulation **có LO pending + cancel**; không có partial-fill engine thực tế.
- Domain có thể định nghĩa nhiều order type nhưng **P0 UI/executor chỉ cho LO**.
- P0 settlement là **immediate settlement**, không làm T+2 thật.
- Reference/ceiling/floor lấy từ market provider khi có; không tự suy diễn làm source of truth.
- Mock provider được dùng để dev/test khi chưa có credential nhưng UI **không được gắn nhãn LIVE như dữ liệu thật**.
- NORMAL account trong P0 **không gửi lệnh tiền thật**; `BrokerExecutor` chỉ là interface/stub trả `BROKER_NOT_CONNECTED`.

## Working protocol cho Codex

Trước khi sửa code ở mỗi card:

- đọc `CODEX.md` và card hiện tại;
- inspect repo hiện có, giữ conventions đang dùng nếu không xung đột spec;
- liệt kê ngắn files/modules sẽ chạm vào;
- không rewrite phần đã chạy chỉ để “đẹp hơn”;
- ưu tiên thay đổi nhỏ, testable và reversible.

Sau khi hoàn tất mỗi card, báo cáo:

- files đã tạo/sửa;
- migration/API/UI behavior mới;
- test đã chạy và kết quả;
- phần nào của acceptance criteria đã pass;
- blocker/credential ngoài repo nếu có.

## Definition of done cấp toàn dự án

Flow P0 phải chạy end-to-end:

`register/login → overview → market HOSE/HNX/UPCOM → search FPT → quote/chart realtime → watchlist → Simulation 100M → BUY/SELL LO → pending/fill/cancel → portfolio/P&L → history → reset Simulation`.

Trong toàn flow đó:

- Main và Simulation không lẫn dữ liệu tài chính;
- backend là source of truth;
- không trade trên stale quote;
- không double order do duplicate request;
- không overspend/oversell khi concurrent request;
- không claim mock/stale data là LIVE;
- không có real-money order trong P0.
