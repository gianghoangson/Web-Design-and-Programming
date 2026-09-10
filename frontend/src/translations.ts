export type Locale = 'vi' | 'en';

export type Copy = {
  primaryNav: string;
  mobileNavigation: string;
  wordmark: string;
  nav: string[];
  mobileNav: string[];
  demo: string;
  search: string;
  accountMode: string;
  simulation: string;
  normal: string;
  profile: string;
  language: string;
  english: string;
  vietnamese: string;
  indexRegion: string;
  simulatedMarket: string;
  point: string;
  points: string;
  indexChange: string;
  breadth: string;
  advances: string;
  unchanged: string;
  declines: string;
  heading: string;
  subtitle: string;
  modeOverview: string;
  systemStatus: string;
  backend: string;
  provider: string;
  account: string;
  checkingBackend: string;
  backendReady: string;
  backendOffline: string;
  syncing: string;
  readyForUi: string;
  mockProvider: string;
  retry: string;
  accountSimulation: string;
  accountNormal: string;
  noRealMoney: string;
  brokerDisconnected: string;
  summary: string;
  totalAssets: string;
  buyingPower: string;
  marketValue: string;
  unrealizedPnl: string;
  simulatedOpeningBalance: string;
  separateAccount: string;
  sampleSessionValue: string;
  sampleFinancialResult: string;
  market: string;
  marketCaption: string;
  symbol: string;
  exchange: string;
  price: string;
  change: string;
  percent: string;
  volume: string;
  value: string;
  up: string;
  down: string;
  reference: string;
  ceiling: string;
  floor: string;
  accountPanel: string;
  details: string;
  portfolio: string;
  recentHoldings: string;
  performance: string;
  report: string;
  noPerformance: string;
  reportWillAppear: string;
  noHoldings: string;
  updatesHere: string;
  unavailable: string;
  futureNavigation: string;
};

const vi: Copy = {
  primaryNav: 'Điều hướng chính',
  mobileNavigation: 'Điều hướng di động',
  wordmark: 'Sàn Việt',
  nav: ['Tổng quan', 'Thị trường', 'Giao dịch', 'Danh mục', 'Lịch sử', 'Giả lập'],
  mobileNav: ['Tổng quan', 'Thị trường', 'Giao dịch', 'Danh mục', 'Giả lập'],
  demo: 'DỮ LIỆU MẪU · KHÔNG PHẢI THỊ TRƯỜNG TRỰC TIẾP',
  search: 'Tìm kiếm mã chứng khoán...',
  accountMode: 'Chọn chế độ tài khoản',
  simulation: 'Giả lập',
  normal: 'Tài khoản chính',
  profile: 'Hồ sơ và đăng xuất chưa khả dụng trong bản DEMO',
  language: 'Ngôn ngữ',
  english: 'English',
  vietnamese: 'Tiếng Việt',
  indexRegion: 'Chỉ số thị trường mẫu',
  simulatedMarket: 'Thị trường mô phỏng',
  point: 'điểm',
  points: 'điểm',
  indexChange: 'Thay đổi chỉ số',
  breadth: 'Độ rộng',
  advances: 'tăng',
  unchanged: 'đứng giá',
  declines: 'giảm',
  heading: 'Tổng quan thị trường',
  subtitle: 'Theo dõi chỉ số, cổ phiếu và tài khoản mẫu trong một màn hình.',
  modeOverview: 'Tổng quan',
  systemStatus: 'Trạng thái hệ thống',
  backend: 'Backend',
  provider: 'Nguồn dữ liệu',
  account: 'Tài khoản',
  checkingBackend: 'Đang kiểm tra backend…',
  backendReady: 'Backend đang hoạt động',
  backendOffline: 'Mất kết nối backend',
  syncing: 'Đang đồng bộ trạng thái',
  readyForUi: 'Sẵn sàng phục vụ giao diện',
  mockProvider: 'Mock provider · dữ liệu mẫu',
  retry: 'Thử lại',
  accountSimulation: 'Tài khoản giả lập',
  accountNormal: 'Tài khoản chính',
  noRealMoney: 'Không sử dụng tiền thật',
  brokerDisconnected: 'Chưa kết nối công ty chứng khoán',
  summary: 'Tóm tắt tài khoản',
  totalAssets: 'Tổng tài sản',
  buyingPower: 'Sức mua',
  marketValue: 'Giá trị chứng khoán',
  unrealizedPnl: 'Lãi/Lỗ tạm tính',
  simulatedOpeningBalance: 'Số dư mô phỏng ban đầu',
  separateAccount: 'Tách biệt với tài khoản chính',
  sampleSessionValue: 'Giá trị mẫu theo phiên gần nhất',
  sampleFinancialResult: 'Không phải kết quả tài chính thực',
  market: 'Thị trường',
  marketCaption: 'Các mã cổ phiếu mẫu',
  symbol: 'Mã',
  exchange: 'Sàn',
  price: 'Giá',
  change: 'Thay đổi',
  percent: '%',
  volume: 'Khối lượng',
  value: 'Giá trị',
  up: 'Tăng',
  down: 'Giảm',
  reference: 'Tham chiếu',
  ceiling: 'Trần',
  floor: 'Sàn',
  accountPanel: 'Tài khoản',
  details: 'Chi tiết',
  portfolio: 'Danh mục',
  recentHoldings: 'Nắm giữ gần đây',
  performance: 'Hiệu suất',
  report: 'Xem báo cáo',
  noPerformance: 'Chưa có dữ liệu hiệu suất cho kỳ này',
  reportWillAppear: 'Sẽ xuất hiện khi có dữ liệu đủ cho báo cáo.',
  noHoldings: 'Chưa có dữ liệu danh mục',
  updatesHere: 'Các cập nhật sẽ được hiển thị tại đây.',
  unavailable: 'Tạm khóa',
  futureNavigation: 'Điều hướng sẽ khả dụng ở giai đoạn sau',
};

const en: Copy = {
  ...vi,
  primaryNav: 'Primary navigation',
  mobileNavigation: 'Mobile navigation',
  nav: ['Overview', 'Market', 'Trading', 'Portfolio', 'History', 'Simulation'],
  mobileNav: ['Overview', 'Market', 'Trading', 'Portfolio', 'Simulation'],
  demo: 'SAMPLE DATA · NOT LIVE MARKET DATA',
  search: 'Search symbols...',
  accountMode: 'Choose account mode',
  simulation: 'Simulation',
  normal: 'Main account',
  profile: 'Profile and sign out are unavailable in this DEMO',
  language: 'Language',
  english: 'English',
  vietnamese: 'Vietnamese',
  indexRegion: 'Sample market indices',
  simulatedMarket: 'Simulated market',
  point: 'points',
  points: 'points',
  indexChange: 'Index change',
  breadth: 'Breadth',
  advances: 'advancing',
  unchanged: 'unchanged',
  declines: 'declining',
  heading: 'Market overview',
  subtitle: 'Scan sample indices, stocks, and account information in one place.',
  modeOverview: 'Overview',
  systemStatus: 'System status',
  provider: 'Data source',
  account: 'Account',
  backendReady: 'Backend is available',
  backendOffline: 'Backend is disconnected',
  checkingBackend: 'Checking backend…',
  syncing: 'Syncing status',
  readyForUi: 'Ready for the interface',
  mockProvider: 'Mock provider · sample data',
  retry: 'Retry',
  accountSimulation: 'Simulation account',
  accountNormal: 'Main account',
  noRealMoney: 'No real money is used',
  brokerDisconnected: 'No brokerage connection',
  summary: 'Account summary',
  totalAssets: 'Total assets',
  buyingPower: 'Buying power',
  marketValue: 'Market value',
  unrealizedPnl: 'Unrealized P/L',
  simulatedOpeningBalance: 'Initial simulated balance',
  separateAccount: 'Separate from the main account',
  sampleSessionValue: 'Sample value from the latest session',
  sampleFinancialResult: 'Not a real financial result',
  market: 'Market',
  marketCaption: 'Sample stock symbols',
  symbol: 'Symbol',
  exchange: 'Exchange',
  price: 'Price',
  change: 'Change',
  volume: 'Volume',
  value: 'Value',
  up: 'Up',
  down: 'Down',
  reference: 'Reference',
  ceiling: 'Ceiling',
  floor: 'Floor',
  accountPanel: 'Account',
  details: 'Details',
  portfolio: 'Portfolio',
  recentHoldings: 'Recent holdings',
  performance: 'Performance',
  report: 'View report',
  noPerformance: 'No performance data for this period',
  reportWillAppear: 'It will appear when enough data is available.',
  noHoldings: 'No portfolio data yet',
  updatesHere: 'Updates will appear here.',
  unavailable: 'Unavailable',
  futureNavigation: 'Navigation will be available in a later phase',
};

export const translations: Record<Locale, Copy> = { vi, en };
