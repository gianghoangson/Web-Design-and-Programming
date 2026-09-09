# CARD 02 — UI/UX FOUNDATION SPECIFICATION

## Mục tiêu

Dựng foundation UI/UX theo direction **Vietnamese Stock Market Workspace**: FireAnt-inspired về layout/information hierarchy và TradingView-inspired về chart interaction, nhưng không clone branding/layout chi tiết.

## Product visual direction

Các từ khóa bắt buộc:

- Vietnamese-first;
- dark workspace;
- professional/trustworthy;
- data-rich but readable;
- table-first;
- desktop-first;
- dense vừa phải, gần FireAnt hơn Robinhood/Bloomberg;
- không có cảm giác crypto exchange;
- broker-ready;
- Simulation là parallel mode, không phải visual system khác.

## Scope thị trường ở UI

Chỉ render navigation/filter/content P0 cho:

- HOSE/HSX;
- HNX;
- UPCOM;
- Vietnamese listed stocks;
- VNINDEX/HNXINDEX/UPCOMINDEX;
- watchlist.

Không thêm tab crypto/forex/commodities/derivatives/bonds chỉ để “đủ feature”.

## Terminology tiếng Việt

Nhãn chính ưu tiên:

| Internal | UI |
|---|---|
| Dashboard | Tổng quan |
| Market | Thị trường |
| Trading | Giao dịch |
| Portfolio | Danh mục |
| Holdings | Danh mục nắm giữ |
| Transactions | Lịch sử giao dịch |
| Orders | Lệnh |
| Buying Power | Sức mua |
| Market Value | Giá trị chứng khoán |
| Total Assets | Tổng tài sản |
| Avg Cost | Giá vốn |
| Current Price | Giá hiện tại |
| Unrealized P/L | Lãi/Lỗ tạm tính |
| Filled | Đã khớp |
| Pending | Chờ khớp |
| Cancelled | Đã hủy |
| Simulation | Giả lập |
| Virtual Cash | Sức mua giả lập |

English có thể dùng trong code/type names, không thay nhãn UI chính.

## App shell

### Desktop

Ưu tiên top navigation; không permanent sidebar.

```text
┌───────────────────────────────────────────────────────────────────────┐
│ LOGO | Tổng quan | Thị trường | Giao dịch | Danh mục | Lịch sử | GL │
│                       Search | Account Mode | Notifications | Profile │
├───────────────────────────────────────────────────────────────────────┤
│ VNINDEX | HNXINDEX | UPCOMINDEX | Market status / context tabs       │
├───────────────────────────────────────────────────────────────────────┤
│                             MAIN CONTENT                              │
└───────────────────────────────────────────────────────────────────────┘
```

Trading screen có thể có contextual watchlist panel; đó không phải global sidebar.

### Global actions bắt buộc

- global stock search;
- account mode selector;
- market status;
- profile/logout;
- index strip luôn cho context thị trường.

## Navigation

Primary:

`Tổng quan | Thị trường | Giao dịch | Danh mục | Lịch sử | Giả lập`

Context tabs:

- Market: `Cổ phiếu | Watchlist | Chỉ số | Ngành`;
- Portfolio: `Tổng quan | Nắm giữ | Hiệu suất | Phân bổ`;
- History: order/fill/status filters;
- Simulation: `Tổng quan | Giao dịch | Danh mục giả lập | Lịch sử`.

## Search UX

Placeholder: `Tìm kiếm mã chứng khoán...`

Search by:

- symbol: FPT, VCB, HPG;
- company name.

Suggestion row chứa tối thiểu symbol, company name, exchange. Keyboard navigation sẽ hoàn thiện ở card 03.

Click result route tới `/trading/:symbol` hoặc equivalent Simulation path nếu action bắt nguồn trong Simulation context.

## Market ticker/index strip

Luôn hiển thị:

- VNINDEX;
- HNXINDEX;
- UPCOMINDEX;
- market status.

Ví dụ format:

```text
VNINDEX 1,284.42  +8.21 (+0.64%)
HNXINDEX 241.82   +0.35 (+0.14%)
UPCOM 94.22       -0.05 (-0.05%)
```

Giá trị chỉ là format example; dữ liệu phải từ backend/provider.

## Visual language

- background rất tối;
- panel xám đậm/xanh đen đậm;
- text primary gần trắng;
- secondary muted;
- border mảnh thay shadow nặng;
- ít gradient;
- accent cyan/blue;
- chart có đủ contrast nhưng không lấn át toàn page.

### Design tokens bắt buộc

Tạo semantic variables:

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

Color semantics Việt Nam:

- ceiling → purple;
- up → green;
- reference → yellow;
- down → red;
- floor → cyan.

Không hardcode màu price trong từng component. Tạo helper duy nhất từ quote/reference/ceil/floor → `CEILING | UP | REFERENCE | DOWN | FLOOR`.

## Typography

- sans-serif hỗ trợ tiếng Việt tốt (Inter/Roboto/equivalent);
- financial values dùng `font-variant-numeric: tabular-nums`;
- hierarchy rõ: page heading, section heading, table header, primary value, secondary value, meta.

Realtime quote thay đổi không được làm layout nhảy do chữ số khác độ rộng.

## Density

- Market table: medium density;
- holdings: medium;
- order/history: medium-to-compact;
- trading bottom panel: compact hơn dashboard.

Table là primitive chính, không biến mọi dataset thành card grid trên desktop.

## Currency/number formatting

Phải có centralized formatter:

- `128,500 ₫`;
- `12,850,000 ₫`;
- compact `12.85 triệu`, `1.2 tỷ`;
- volume `6,268,500 CP`;
- trading value theo nghìn/triệu/tỷ phù hợp.

Không thay đổi internal full-VND representation.

## Common primitives

Tạo/reuse component layer cho:

- Button;
- IconButton;
- Tabs;
- Badge;
- Input/Search;
- Select;
- Table primitives;
- Modal/ConfirmationModal;
- Drawer;
- BottomSheet;
- Toast;
- Skeleton;
- EmptyState;
- ErrorState;
- ConnectionStatus;
- AccountModeBadge.

## Common UI states

Mọi page/component lớn cần:

- normal;
- loading;
- empty;
- error;
- disconnected/reconnecting;
- disabled.

Loading ưu tiên skeleton có stable dimensions thay vì full-page spinner.
Error component-scoped; một card lỗi không giết cả page nếu phần còn lại hoạt động được.

## Simulation UX

Dấu hiệu nhận biết tối thiểu:

- badge `⚡ Giả lập`;
- `Tài khoản giả lập`;
- `Sức mua giả lập`;
- notice order panel rằng không dùng tiền thật.

Không đổi toàn theme sang màu khác. Không để người dùng nhầm history/holdings của simulation với Main.

## Broker-ready UX

Main order panel cần chỗ cho:

- broker status;
- connect-broker CTA future;
- account selector;
- order fields.

P0 hiện `Chưa kết nối công ty chứng khoán`/equivalent; không fake connection.

## Responsive philosophy

Desktop target ưu tiên:

- 1920×1080;
- 1440×900;
- 1366×768.

Tablet:

- giữ top-nav theo khả năng;
- giảm density;
- stack một số blocks;
- ẩn panel phụ.

Mobile:

- simplified workspace;
- không nhét full desktop grid;
- market table chuyển compact cards/list hợp lý;
- order form thành bottom sheet;
- hide secondary columns first.

## Accessibility

- keyboard-focus rõ;
- modal focus trap + Escape;
- icon buttons có accessible labels;
- price state không chỉ dựa vào màu: hỗ trợ sign/label khi cần;
- contrast đủ trên dark background.

## Files/modules dự kiến

Frontend, map theo repo hiện tại:

```text
src/styles/tokens.css
src/styles/globals.css
src/components/common/*
src/components/layout/*
src/components/market/MarketTickerStrip.*
src/components/market/PriceValue.*
src/lib/formatters/*
src/lib/priceState/*
```

Không bắt buộc tên tuyệt đối nếu repo có convention tốt hơn, nhưng responsibility phải tách tương đương.

## Tests

- price state helper đủ 5 states;
- number/currency formatter;
- simulation badge rendered by mode;
- common state components;
- keyboard/focus của modal/search primitives;
- responsive smoke test cho app shell.

## Acceptance checklist

- [ ] App nhìn như Vietnamese stock workspace, không phải admin/crypto dashboard.
- [ ] Top nav + index strip tồn tại.
- [ ] Không permanent sidebar.
- [ ] Semantic price colors qua tokens/helper duy nhất.
- [ ] Vietnamese terminology nhất quán.
- [ ] Tables là primary desktop representation.
- [ ] Simulation rõ nhưng cùng design language.
- [ ] Desktop/tablet/mobile có layout hợp lý.
- [ ] Loading/empty/error/disconnected đầy đủ.

## Không được làm

- Không copy exact FireAnt assets/branding/layout.
- Không hardcode sample market values như live data.
- Không thêm flashy neon/crypto visual.
- Không biến mobile thành desktop shrink nhỏ.

## Handoff

Card 03 sẽ áp foundation này vào wireframe/behavior chi tiết cho từng screen.
