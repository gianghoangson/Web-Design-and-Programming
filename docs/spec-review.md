# Rà soát spec — 2026-09-09

## Kết luận

Giữ nguyên stack, 12 bảng domain, phạm vi P0 và nguyên tắc backend quyết định tài chính. Bộ spec đầy đủ về sản phẩm nhưng có một số chi tiết cần chốt để các agent không triển khai khác nhau. Các quyết định dưới đây là hướng dẫn implementation bổ sung; không phải xác nhận quy chế sàn hiện hành.

## Các điểm đã làm rõ

1. **Thứ tự đọc khác thứ tự build.** Card 01 đã yêu cầu auth/trading trong khi DB/API ở card sau. `00-START-HERE.md` được sửa để đọc card theo thứ tự nhưng build theo phase của card 07. Phase 0 không được tuyên bố hoàn tất card 01 hay P0.
2. **Money DTO.** Chọn decimal string cho tiền/giá/giá trị tài chính ở REST và Socket.IO; quantity là số nguyên an toàn; tỷ lệ hiển thị có thể là number. Request `price` chuẩn là string VND, ví dụ `"128500"`; ví dụ numeric trong card cũ chỉ minh họa đơn vị. Backend validate bằng Zod và tính bằng Decimal. Frontend chỉ đổi sang number ở ranh giới thư viện chart/hiển thị, không quyết định cash/P&L.
3. **Reservation invariant.** P0 settlement tức thì: `availableCash + reservedCash = cashBalance`; `availableQuantity + reservedQuantity = quantity`. Nếu persist cả ba cột phải có CHECK và update cùng transaction. BUY reserve theo limit × quantity + phí dự kiến; fill giải phóng toàn reserve, chỉ debit giá khớp + phí. Không trừ reserve lần nữa khỏi equity.
4. **Quote freshness.** `receivedAt` đánh giá vận chuyển; provider timestamp đánh giá tuổi dữ liệu và thứ tự. REST trả lại quote cũ không được làm quote fresh chỉ vì vừa nhận. DTO cần provider mode, timestamp, receivedAt và trạng thái freshness. Thiếu timestamp đáng tin cậy phải có policy fail-closed rõ ràng trước khi bật trading; mock dùng clock kiểm soát trong test.
5. **Session/auction.** P0 chỉ nhận/khớp LO trong phiên liên tục được backend xác nhận. Không dùng bid/ask matcher để giả lập đấu giá ATO/ATC. Revalidate session, security, freshness và tài nguyên ngay trước pending fill. Cancel vẫn được release reservation khi feed mất/đóng cửa. Trước real-provider release phải đối chiếu rule config với tài liệu chính thức/provider; các baseline hiện có chưa được audit bên ngoài.
6. **Idempotency và race.** UNIQUE(account_id, idempotency_key), so sánh payload chuẩn hóa; khác payload cùng key trả 409 `IDEMPOTENCY_CONFLICT`. Cùng payload trả order hiện có. Cùng thứ tự lock account → order → position cho submit/fill/cancel/reset; emit socket sau commit. Reset và matcher dùng cùng account lock.
7. **Reset và retry.** Để giữ 12 bảng, giữ orders/fills/ledger cho audit và idempotency; reset đánh dấu ranh giới kỳ bằng `accounts.reset_at`, xóa positions/snapshots của Simulation, cancel pending và ghi reset ledger. History/performance mặc định lọc kỳ hiện tại. Retry key của kỳ cũ không tạo lại trade sau reset. UI phải nói rõ lịch sử kỳ hiện tại được làm mới, audit vẫn được giữ.
8. **Account/watchlist bootstrap.** Registration tạo đúng một NORMAL, một SIMULATION và watchlist mặc định trong transaction; UNIQUE(user_id, account_type). Simulation convenience create trả account hiện có. Không cần thêm endpoint tạo watchlist chỉ để hoàn tất flow P0.
9. **Pending subscriptions.** Backend giữ ref-count cho symbols có pending orders ngay cả khi không browser nào mở; restart phục hồi từ DB. Sắp thứ tự thị trường theo volume/change yêu cầu snapshot tổng hợp có freshness; không thể suy ra toàn thị trường chỉ từ 50 mã đang mở.
10. **NORMAL stub.** Sau auth, ownership và request shape validation, NORMAL trả `BROKER_NOT_CONNECTED` ổn định, không phụ thuộc quote/cash hoặc tạo fill. Các bước market/resource validation của TradingService dành cho executor khả dụng.

## Giới hạn lần triển khai đầu

Chỉ Phase 0: scaffold, PostgreSQL/Prisma connectivity, health/readiness, scripts và smoke tests. Các quyết định trading bên trên được đưa vào hướng dẫn phase tương ứng; chưa phải code đã triển khai hay đã kiểm thử. Chưa sửa giá trị quy chế sàn hoặc thêm real provider.
