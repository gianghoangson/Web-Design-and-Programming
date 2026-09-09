# CODEX.md — GLOBAL PROJECT RULES

## 1. Authority

File này là contract toàn project. Mọi implementation phải tuân thủ. Nếu một card chi tiết mâu thuẫn với file này, **file này thắng** trừ khi human owner sửa trực tiếp quyết định.

### Làm rõ implementation ngày 2026-09-09

Theo yêu cầu rà soát/sửa spec trước khi build, áp dụng các quyết định trong `../../docs/spec-review.md` cho những điểm trước đây chưa chốt hoặc có ví dụ mâu thuẫn: decimal-string DTO, reservation invariants, freshness, giới hạn continuous-session P0, idempotency/locking, reset giữ audit, account/watchlist bootstrap và NORMAL stub. Các quyết định này làm rõ phần tương ứng bên dưới và ở các card; không đổi stack/phạm vi P0. Thứ tự implementation theo phase của card 07, không theo thứ tự đọc card.

## 2. Product boundary

Xây một **Vietnamese Stock Trading Platform** theo hướng FireAnt-inspired, tập trung:

- theo dõi thị trường chứng khoán Việt Nam;
- watchlist/search/chart;
- quản lý danh mục;
- paper/simulation trading;
- kiến trúc sẵn sàng cho broker integration trong tương lai.

P0 chỉ phục vụ:

- `HOSE`/`HSX`, `HNX`, `UPCOM`;
- cổ phiếu và chỉ số thị trường liên quan;
- không crypto, forex, commodity, derivatives, bonds hay chứng quyền nâng cao.

## 3. Locked stack

### Frontend

- React
- TypeScript
- Vite
- React Router
- TanStack Query cho server state
- Zustand cho lightweight client state
- Axios
- Socket.IO Client
- TradingView Lightweight Charts
- Tailwind CSS + CSS variables/design tokens
- Vitest + React Testing Library
- Playwright cho critical E2E

### Backend

- Node.js
- Express
- TypeScript
- Zod validation
- PostgreSQL
- Prisma
- Socket.IO Server
- Supertest/Vitest

### Runtime/dev

- một repo;
- core folders bắt buộc: `frontend/`, `backend/`;
- có thể thêm `docs/`, `docker/`, root config nếu cần;
- Docker Compose cho local Postgres/app orchestration hợp lý.

## 4. Architecture không được tự đổi

Không introduce vào P0:

- Next.js;
- NestJS;
- GraphQL;
- microservices;
- Kafka;
- CQRS;
- event sourcing;
- Kubernetes;
- Redis.

P0 quote cache dùng in-memory process cache. Redis chỉ cân nhắc P1 khi chạy multi-instance/shared cache thực sự cần thiết.

## 5. Account model và isolation

Account types:

```ts
type AccountType = 'NORMAL' | 'SIMULATION';
```

Mỗi user có ngữ cảnh Main/NORMAL và Simulation. Nguyên tắc bắt buộc:

- **Market data dùng chung**.
- `cash`, `reserved_cash`, `positions`, `orders`, `fills`, `cash_ledger`, performance/snapshots phải tách theo `account_id`.
- Không dùng chung portfolio/order state giữa NORMAL và SIMULATION.
- Simulation khởi tạo `100_000_000 VND`.
- Reset Simulation tuyệt đối không đụng NORMAL account.

## 6. Main account P0 không trade tiền thật

P0 có UI broker-ready nhưng chưa tích hợp live brokerage.

- `NORMAL` có thể xem market/portfolio shell và order panel.
- Khi submit order ở NORMAL P0: backend không gọi external broker; trả business error `BROKER_NOT_CONNECTED` hoặc UI disable với cùng semantic.
- Phải tồn tại abstraction `OrderExecutor`/`BrokerExecutor` để tương lai cắm broker mà không rewrite frontend endpoint.
- Không fake “đã gửi lệnh thật”.

## 7. Trading architecture bắt buộc

Luồng chuẩn:

```text
OrderController
    -> TradingService
        -> validate ownership/account/security/session/market rules/quote freshness/resources
        -> choose executor by account.type
            -> SimulationExecutor
            -> BrokerExecutor (stub in P0)
```

Các abstraction cốt lõi:

- `MarketDataProvider`
- `MarketRuleEngine`
- `TradingService`
- `OrderExecutor`
- `SimulationExecutor`
- `BrokerExecutor`
- `FeeEngine` (P0 có thể zero fee/tax nhưng interface sẵn)

Không bypass `TradingService` bằng cách để controller gọi trực tiếp Prisma execution logic.

## 8. Backend là source of truth

Frontend chỉ gửi **intent**, ví dụ:

```json
{
  "securityId": "uuid-fpt",
  "side": "BUY",
  "orderType": "LO",
  "quantity": 100,
  "price": 128500
}
```

Frontend không được quyết định:

- execution price;
- cash sau trade;
- position sau trade;
- P/L source of truth;
- fill/order status thực;
- market freshness;
- quyền sở hữu account.

Backend phải lấy/verify latest quote ở thời điểm xử lý order.

## 9. Money/price representation

- PostgreSQL/Prisma dùng `NUMERIC/Decimal` cho tiền và giá trị tài chính cần chính xác.
- Không dùng floating-point JS để cộng trừ tiền làm source of truth.
- Internal price = **VND/share đầy đủ**.
  - đúng: `128500`
  - không lưu nội bộ như `128.5`.
- UI có thể format thành convention quen thuộc nhưng request/backend vẫn full VND.
- Dùng helper chung để format; không rải logic format mỗi component.

## 10. Vietnam market rules

- Rule phải config-driven theo exchange/session.
- P0 order UI + simulation executor chỉ `LO`.
- Domain có thể khai báo `ATO | ATC | MTL | MOK | MAK | PLO` để future-proof, nhưng không cho execution P0.
- P0 round lot = bội số 100 shares.
- Không odd-lot P0.
- Không short selling.
- Không margin.
- Không T+2 settlement engine P0; settlement tức thì.
- Tick size baseline cần test và đi qua `MarketRuleEngine`.
- Price range validation dùng `reference/ceiling/floor` từ provider làm authority khi có.
- Security `SUSPENDED/RESTRICTED/DELISTED` không được tùy tiện trade.

## 11. Simulation execution rules P0

- BUY marketable LO: eligible khi `ask1 <= limit`; fill tại ask tốt hiện tại.
- SELL marketable LO: eligible khi `bid1 >= limit`; fill tại bid tốt hiện tại.
- Nếu chưa marketable: order `PENDING`, reserve cash/shares.
- Khi quote update thỏa điều kiện: backend matcher xử lý fill.
- P0 hỗ trợ cancel pending order và release reservation.
- P0 không cần queue-position accuracy, level-2 matching hay partial fill thật.
- Nếu provider chỉ có `last`, không được âm thầm coi `last` = bid/ask; chỉ fallback nếu execution model được explicit config và UI/docs nói rõ.

## 12. Stale market data

Mỗi quote cache cần ít nhất:

- provider timestamp;
- `receivedAt` ở backend;
- freshness evaluation.

Development defaults:

```env
QUOTE_STALE_WARNING_MS=10000
ORDER_QUOTE_MAX_AGE_MS=15000
```

- UI đổi trạng thái LIVE → stale/reconnecting phù hợp.
- `SimulationExecutor` phải reject order quá stale với `STALE_MARKET_DATA`.
- Nếu market data unavailable: `MARKET_DATA_UNAVAILABLE`.
- Không fake LIVE khi provider đang mock hoặc feed đã stale.

## 13. Market data boundary

Mọi market access đi qua:

```ts
interface MarketDataProvider { ... }
```

- frontend không gọi SSI/DNSE/vendor trực tiếp;
- business service không import vendor SDK;
- vendor payload được normalize thành internal DTO;
- `MockMarketProvider` luôn tồn tại cho dev/test;
- real provider adapter mục tiêu P0: SSI FastConnect Data nếu credential/permission cho phép;
- provider khác là adapter tương lai.

## 14. REST + WebSocket rule

Pattern chính thức:

1. REST lấy snapshot ban đầu.
2. Socket subscribe symbols/indices cần thiết.
3. Socket chỉ patch thay đổi realtime.
4. Reconnect → authenticate → rejoin account room → resubscribe → REST refresh latest snapshot.

Không tạo một WebSocket connection cho mỗi row/symbol.
Không subscribe toàn bộ HOSE/HNX/UPCOM cho mọi browser.

Phải xử lý:

- duplicate subscriptions;
- duplicate quote events;
- out-of-order timestamps;
- reconnect/backoff;
- resubscription;
- stale connection/heartbeat.

## 15. Persistence + transaction safety

Các thao tác tài chính phải atomic trong một DB transaction:

- create/update order;
- create fill;
- update cash/reservations;
- update position/reservations;
- write ledger;
- reset simulation.

Concurrency:

- lock account/cash row khi cần;
- lock position row khi SELL/modify reservation cần;
- không để hai concurrent BUY cùng overspend cùng số cash;
- không để hai concurrent SELL cùng oversell position.

Idempotency:

- `POST /accounts/:accountId/orders` bắt buộc hỗ trợ `Idempotency-Key`.
- cùng user/account/key/request semantic không tạo order thứ hai.

## 16. Ownership/security

Mọi private account resource phải check server-side:

```text
currentUser owns accountId ? continue : 403 ACCOUNT_ACCESS_DENIED
```

Không tin `accountId` do frontend gửi. Test IDOR bắt buộc.

Không log:

- password;
- access token;
- market provider secret;
- broker secret.

Rate-limit login/search/order phù hợp. Whitelist sort fields, không nối raw query string vào SQL.

## 17. Frontend state rules

- TanStack Query: auth-derived server data, market snapshots, portfolio, orders, fills, watchlists, performance.
- Zustand: session/UI state nhẹ như `activeAccountId`, account mode, socket status.
- Không copy portfolio vào cả Query cache lẫn Zustand rồi tự sync hai nguồn.
- Không tạo mega `AppContext` chứa toàn app.
- Quote stream cập nhật targeted cache/store; tránh rerender toàn market table mỗi tick.

## 18. UI identity

- FireAnt-inspired về information density/layout, không clone.
- Dark, professional, data-rich but readable.
- TradingView-inspired chart interaction.
- Top navigation, không permanent admin sidebar.
- Vietnamese-first labels.
- Table-first.
- Numeric values dùng tabular numerals.
- Simulation dùng badge/label rõ nhưng không đổi toàn visual language.

Semantic color tokens bắt buộc:

```css
--bg-primary
--bg-surface
--bg-surface-secondary
--text-primary
--text-secondary
--border
--accent
--price-ceiling
--price-up
--price-reference
--price-down
--price-floor
```

Không rải hardcoded `green/red` theo component. Tạo helper duy nhất `getStockPriceState()`/equivalent.

## 19. P0 route set

Ít nhất:

```text
/login
/register
/overview
/market
/market/watchlist
/trading/:symbol
/portfolio
/history
/simulation
/simulation/trading/:symbol
/simulation/portfolio
/simulation/history
/settings
```

## 20. Testing policy

Test bắt buộc trước khi claim complete:

### Trading unit/integration

- tick-size valid/invalid;
- price floor/ceiling;
- lot-size 100;
- BUY enough/insufficient cash;
- SELL enough/insufficient shares;
- weighted average cost;
- partial sell keeps average cost;
- unrealized/realized P&L;
- market closed/session invalid;
- stale quote;
- market unavailable;
- pending LO eligibility;
- cancel releases reservations;
- idempotent duplicate submit;
- concurrent BUY;
- concurrent SELL;
- transaction rollback on mid-flow error;
- reset isolation;
- NORMAL returns broker-not-connected.

### Security/API

- 401 unauthenticated;
- 403 cross-user account access/IDOR;
- 422 business validation;
- 503 provider unavailable;
- pagination/max page size;
- sort whitelist.

### Realtime

- connect/auth;
- batch subscribe/unsubscribe;
- ref-count/dedup symbols;
- duplicate quote ignored;
- out-of-order quote ignored;
- reconnect + resubscribe;
- REST refresh after reconnect;
- order/fill/portfolio events.

### E2E

Critical Playwright path phải có ít nhất một happy-flow simulation trade + portfolio/history update + reset.

## 21. P0 exclusions

Không tự thêm:

- news/community/social;
- AI recommendations;
- fundamentals/financial statements;
- deep order book;
- advanced technical indicators;
- ATO/ATC/MTL/MOK/MAK/PLO execution;
- partial-fill matching engine;
- odd lots;
- short/margin;
- full T+2;
- real broker execution;
- multiple simulation accounts;
- corporate-action engine;
- complex fee/tax regulations;
- foreign-room analytics.

## 22. Completion rule

Không báo “xong” chỉ vì UI render. P0 chỉ complete khi frontend, backend, DB, market data abstraction, realtime, simulation rules và tests hoạt động cùng nhau trên critical journey.
