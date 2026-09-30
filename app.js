"use strict";

const MONITORING_KEEP = [
  "运单号", "邮编", "签出中心", "中心签出日期", "签入站点", "取件日期", "快递员取件时间",
  "快递员名称", "快递员操作状态", "运单最新状态", "签收时间", "妥投时效", "问题件类型",
  "任务编码", "快递员区域名称", "领取状态", "任务领取时间"
];

const DETAIL_KEEP = [
  "运单号", "客户单号", "派送方", "收件州/省", "收件城市", "收件区", "收件地邮编", "预报重量(kg)",
  "结算重量(kg)", "运单状态", "操作人", "产品类型", "预报体积",
  "预报体积重", "复核重量", "复核体积", "复核体积重", "快递员工作区域名称", "目的中心",
  "目的站点", "下单时间", "是否退件", "派送失败天数", "编辑时间", "首次中心签入时间", "最新操作时间"
];

const SAMPLE_MONITORING = [
  {"运单号":"DEMO0001","邮编":"12186","签出中心":"ALB01","中心签出日期":"27/09/2026","签入站点":"ALB-BEN","取件日期":"28/09/2026","快递员取件时间":"09/28/2026 07:03:58","快递员名称":"Driver_A","快递员操作状态":"签收","运单最新状态":"签收","签收时间":"09/28/2026 12:10:00","妥投时效":"09/28/2026 23:59:59","问题件类型":"","任务编码":"TASK-DEMO-01","快递员区域名称":"ALB01-015","领取状态":"是","任务领取时间":"09/28/2026 07:03:58"},
  {"运单号":"DEMO0002","邮编":"12084-9461","签出中心":"ALB01","中心签出日期":"27/09/2026","签入站点":"ALB-BEN","取件日期":"28/09/2026","快递员取件时间":"09/28/2026 07:08:21","快递员名称":"Driver_B","快递员操作状态":"签收","运单最新状态":"签收","签收时间":"09/28/2026 15:24:00","妥投时效":"09/28/2026 23:59:59","问题件类型":"","任务编码":"TASK-DEMO-02","快递员区域名称":"ALB01-015","领取状态":"是","任务领取时间":"09/28/2026 07:08:21"},
  {"运单号":"DEMO0003","邮编":"12159-3802","签出中心":"ALB01","中心签出日期":"27/09/2026","签入站点":"ALB-BEN","取件日期":"28/09/2026","快递员取件时间":"09/28/2026 07:03:58","快递员名称":"Driver_A","快递员操作状态":"派送异常","运单最新状态":"派送异常","签收时间":"","妥投时效":"09/28/2026 23:59:59","问题件类型":"收件人不在","任务编码":"TASK-DEMO-01","快递员区域名称":"ALB01-015","领取状态":"是","任务领取时间":"09/28/2026 07:03:58"},
  {"运单号":"DEMO0004","邮编":"12110","签出中心":"ALB01","中心签出日期":"27/09/2026","签入站点":"ALB-BEN","取件日期":"28/09/2026","快递员取件时间":"09/28/2026 07:15:10","快递员名称":"Driver_C","快递员操作状态":"已退回站点","运单最新状态":"退件","签收时间":"","妥投时效":"09/28/2026 23:59:59","问题件类型":"地址问题","任务编码":"TASK-DEMO-03","快递员区域名称":"ALB01-021","领取状态":"是","任务领取时间":"09/28/2026 07:15:10"},
  {"运单号":"DEMO0005","邮编":"12110","签出中心":"ALB01","中心签出日期":"28/09/2026","签入站点":"ALB-BEN","取件日期":"29/09/2026","快递员取件时间":"09/29/2026 07:02:00","快递员名称":"Driver_C","快递员操作状态":"签收","运单最新状态":"签收","签收时间":"09/29/2026 10:47:00","妥投时效":"09/29/2026 23:59:59","问题件类型":"","任务编码":"TASK-DEMO-04","快递员区域名称":"ALB01-021","领取状态":"是","任务领取时间":"09/29/2026 07:02:00"},
  {"运单号":"DEMO0006","邮编":"12203","签出中心":"ALB01","中心签出日期":"28/09/2026","签入站点":"ALB-BEN","取件日期":"29/09/2026","快递员取件时间":"09/29/2026 07:06:00","快递员名称":"Driver_B","快递员操作状态":"签收","运单最新状态":"签收","签收时间":"09/30/2026 00:20:00","妥投时效":"09/29/2026 23:59:59","问题件类型":"","任务编码":"TASK-DEMO-05","快递员区域名称":"ALB01-018","领取状态":"是","任务领取时间":"09/29/2026 07:06:00"}
];

const SAMPLE_DETAIL = [
  {"运单号":"DEMO0001","袋号":"B-DEMO-1","派送方":"ALB-BEN","收件州/省":"New York","收件城市":"Voorheesville","收件区":"Voorheesville","收件地邮编":"12186","预报重量(kg)":"1.31","结算重量(kg)":"1.31","运单状态":"签收","操作人":"Driver_A","产品类型":"ECO","箱号":"BOX-1","收件地详细地址":"*** New Salem South Road","预报体积":"3137","预报体积重":"0.4482","快递员工作区域名称":"ALB01-015","目的站点":"ALB01","是否退件":"否","派送失败天数":"0","编辑时间":"09/28/2026 12:10:01","最新操作时间":"09/28/2026 12:10:00"},
  {"运单号":"DEMO0002","袋号":"B-DEMO-1","派送方":"ALB-BEN","收件州/省":"New York","收件城市":"Guilderland","收件区":"Guilderland","收件地邮编":"12084-9461","预报重量(kg)":"0.50","结算重量(kg)":"0.50","运单状态":"签收","操作人":"Driver_B","产品类型":"ECO","箱号":"BOX-2","收件地详细地址":"*** Kennsington Ct","预报体积":"3325","预报体积重":"0.475","快递员工作区域名称":"ALB01-015","目的站点":"ALB01","是否退件":"否","派送失败天数":"0","编辑时间":"09/28/2026 15:24:01","最新操作时间":"09/28/2026 15:24:00"},
  {"运单号":"DEMO0003","袋号":"B-DEMO-1","派送方":"ALB-BEN","收件州/省":"New York","收件城市":"Slingerlands","收件区":"Slingerlands","收件地邮编":"12159-3802","预报重量(kg)":"9.06","结算重量(kg)":"9.06","运单状态":"派送异常","操作人":"Driver_A","产品类型":"ECO","箱号":"BOX-3","收件地详细地址":"*** Font Grove Rd","预报体积":"16405","预报体积重":"2.3435","快递员工作区域名称":"ALB01-015","目的站点":"ALB01","是否退件":"否","派送失败天数":"1","编辑时间":"09/28/2026 18:00:00","最新操作时间":"09/28/2026 18:00:00"},
  {"运单号":"DEMO0004","袋号":"B-DEMO-2","派送方":"ALB-BEN","收件州/省":"New York","收件城市":"Latham","收件区":"Latham","收件地邮编":"12110","预报重量(kg)":"3.20","结算重量(kg)":"3.20","运单状态":"退件","操作人":"Driver_C","产品类型":"ECO","箱号":"BOX-4","收件地详细地址":"*** Troy Schenectady Rd","预报体积":"5100","预报体积重":"0.73","快递员工作区域名称":"ALB01-021","目的站点":"ALB01","是否退件":"是","派送失败天数":"1","编辑时间":"09/28/2026 19:10:00","最新操作时间":"09/28/2026 19:10:00"},
  {"运单号":"DEMO0005","袋号":"B-DEMO-3","派送方":"ALB-BEN","收件州/省":"New York","收件城市":"Latham","收件区":"Latham","收件地邮编":"12110","预报重量(kg)":"2.10","结算重量(kg)":"2.10","运单状态":"签收","操作人":"Driver_C","产品类型":"ECO","箱号":"BOX-5","收件地详细地址":"*** Old Loudon Rd","预报体积":"4210","预报体积重":"0.60","快递员工作区域名称":"ALB01-021","目的站点":"ALB01","是否退件":"否","派送失败天数":"0","编辑时间":"09/29/2026 10:47:01","最新操作时间":"09/29/2026 10:47:00"},
  {"运单号":"DEMO0006","袋号":"B-DEMO-4","派送方":"ALB-BEN","收件州/省":"New York","收件城市":"Albany","收件区":"Albany","收件地邮编":"12203","预报重量(kg)":"1.70","结算重量(kg)":"1.70","运单状态":"签收","操作人":"Driver_B","产品类型":"ECO","箱号":"BOX-6","收件地详细地址":"*** Western Ave","预报体积":"2800","预报体积重":"0.40","快递员工作区域名称":"ALB01-018","目的站点":"ALB01","是否退件":"否","派送失败天数":"0","编辑时间":"09/30/2026 00:20:01","最新操作时间":"09/30/2026 00:20:00"}
];

const state = {
  monitoringRows: [],
  detailRows: [],
  mergedRows: [],
  drivers: [],
  routes: [],
  quality: {},
  map: null,
  markerLayer: null
};

const $ = id => document.getElementById(id);
const formatInt = value => new Intl.NumberFormat("zh-CN", {maximumFractionDigits: 0}).format(value || 0);
const formatWeight = value => `${new Intl.NumberFormat("zh-CN", {maximumFractionDigits: 1}).format(value || 0)} kg`;
const formatPct = (num, den) => den ? `${(num / den * 100).toFixed(1)}%` : "—";

function cleanHeader(value) {
  return String(value ?? "").replace(/\s+/g, "").replace("寄件州\\省", "寄件州/省").trim();
}

function cleanRows(rows) {
  return rows.map(row => Object.fromEntries(Object.entries(row).map(([key, value]) => [cleanHeader(key), value])));
}

function normalizeTracking(value) {
  return String(value ?? "").trim().toUpperCase().replace(/\s+/g, "");
}

function normalizeZip(value) {
  const match = String(value ?? "").match(/\b(\d{5})\b/);
  return match ? match[1] : "";
}

function asNumber(value) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const parsed = Number(String(value ?? "").replace(/,/g, "").trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

function excelSerialToDate(serial) {
  if (!window.XLSX || !XLSX.SSF || !Number.isFinite(serial)) return null;
  const part = XLSX.SSF.parse_date_code(serial);
  if (!part) return null;
  return new Date(part.y, part.m - 1, part.d, part.H, part.M, Math.floor(part.S));
}

function parseDate(value, order = "mdy") {
  if (!value && value !== 0) return null;
  if (value instanceof Date && !Number.isNaN(value.getTime())) return value;
  if (typeof value === "number") return excelSerialToDate(value);
  const text = String(value).trim();
  if (!text) return null;
  const match = text.match(/^(\d{1,4})[\/-](\d{1,2})[\/-](\d{1,4})(?:[ T](\d{1,2}):(\d{2})(?::(\d{2}))?)?$/);
  if (match) {
    let year, month, day;
    const a = Number(match[1]), b = Number(match[2]), c = Number(match[3]);
    if (match[1].length === 4) [year, month, day] = [a, b, c];
    else if (order === "dmy") [day, month, year] = [a, b, c];
    else [month, day, year] = [a, b, c];
    if (year < 100) year += 2000;
    const date = new Date(year, month - 1, day, Number(match[4] || 0), Number(match[5] || 0), Number(match[6] || 0));
    return Number.isNaN(date.getTime()) ? null : date;
  }
  const fallback = new Date(text);
  return Number.isNaN(fallback.getTime()) ? null : fallback;
}

function parseDueTime(value, referenceDate) {
  if (!value && value !== 0) return null;
  const text = String(value).trim();
  if (!text) return null;

  // GOFO monitoring exports may store the deadline as HHmm text/number,
  // for example 2400 = midnight at the end of the pickup date.
  const compactTime = text.replace(/[:：]/g, "");
  if (/^\d{3,4}$/.test(compactTime) && referenceDate) {
    const padded = compactTime.padStart(4, "0");
    const hour = Number(padded.slice(0, 2));
    const minute = Number(padded.slice(2));
    if (minute < 60 && (hour < 24 || (hour === 24 && minute === 0))) {
      const deadline = new Date(referenceDate);
      deadline.setHours(0, 0, 0, 0);
      if (hour === 24) deadline.setDate(deadline.getDate() + 1);
      else deadline.setHours(hour, minute, 0, 0);
      return deadline;
    }
  }

  return parseDate(value, "mdy");
}

function dateKey(date) {
  if (!date) return "未知日期";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function isDeliveredStatus(...values) {
  const text = values.filter(Boolean).join("|").toLowerCase();
  return /签收|妥投|delivered/.test(text);
}

function isReturnStatus(...values) {
  const text = values.filter(Boolean).join("|").toLowerCase();
  return /退回|退件|返站|returned/.test(text);
}

function isExceptionStatus(row) {
  const text = [row.problemType, row.courierStatus, row.latestStatus, row.detailStatus].filter(Boolean).join("|").toLowerCase();
  return Boolean(row.problemType) || /异常|失败|问题|丢失|退回|退件|failed|exception|lost/.test(text);
}

function pick(row, keys) {
  for (const key of keys) {
    if (row[key] !== undefined && row[key] !== null && String(row[key]).trim() !== "") return row[key];
  }
  return "";
}

async function readSpreadsheet(file) {
  if (!window.XLSX) throw new Error("Excel解析组件未加载，请检查网络后刷新页面。");
  const buffer = await file.arrayBuffer();
  const workbook = XLSX.read(buffer, {type: "array", cellDates: true});
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) throw new Error(`${file.name} 中未找到工作表。`);
  const sheet = workbook.Sheets[sheetName];
  repairSheetRange(sheet);
  return cleanRows(XLSX.utils.sheet_to_json(sheet, {defval: "", raw: true}));
}

function repairSheetRange(sheet) {
  if (!window.XLSX || !sheet) return "";
  let minRow = Infinity;
  let minColumn = Infinity;
  let maxRow = -1;
  let maxColumn = -1;

  // Some GOFO exports declare a range ending at row 2 even though thousands
  // of cell records exist in the worksheet XML. SheetJS keeps those cells,
  // so rebuild !ref from the actual cell addresses before sheet_to_json.
  Object.keys(sheet).forEach(address => {
    if (!/^[A-Z]+\d+$/.test(address)) return;
    const cell = XLSX.utils.decode_cell(address);
    minRow = Math.min(minRow, cell.r);
    minColumn = Math.min(minColumn, cell.c);
    maxRow = Math.max(maxRow, cell.r);
    maxColumn = Math.max(maxColumn, cell.c);
  });

  if (maxRow < 0 || maxColumn < 0) return sheet["!ref"] || "";
  const actualRange = XLSX.utils.encode_range({
    s: {r: minRow, c: minColumn},
    e: {r: maxRow, c: maxColumn}
  });
  sheet["!ref"] = actualRange;
  return actualRange;
}

function latestDetailRows(rows) {
  const map = new Map();
  let duplicateCount = 0;
  rows.forEach(row => {
    const key = normalizeTracking(row["运单号"]);
    if (!key) return;
    if (map.has(key)) duplicateCount += 1;
    const current = map.get(key);
    const candidateDate = parseDate(pick(row, ["最新操作时间", "编辑时间"]), "mdy");
    const currentDate = current ? parseDate(pick(current, ["最新操作时间", "编辑时间"]), "mdy") : null;
    if (!current || (candidateDate && (!currentDate || candidateDate > currentDate))) map.set(key, row);
  });
  return {map, duplicateCount};
}

function mergeData(monitoringRows, detailRows) {
  const {map: detailMap, duplicateCount} = latestDetailRows(detailRows);
  const monitoringHeaders = Object.keys(monitoringRows[0] || {});
  const detailHeaders = Object.keys(detailRows[0] || {});
  let matched = 0;
  let missingDriver = 0;
  let missingZip = 0;
  let missingArea = 0;
  let missingSignedTime = 0;
  let missingDueTime = 0;
  let contradictory = 0;

  const merged = monitoringRows.map(source => {
    const tracking = normalizeTracking(source["运单号"]);
    const detail = detailMap.get(tracking) || {};
    if (detailMap.has(tracking)) matched += 1;
    const delivered = isDeliveredStatus(source["运单最新状态"], source["快递员操作状态"], detail["运单状态"]);
    const returned = isReturnStatus(source["快递员操作状态"], source["运单最新状态"], detail["运单状态"], detail["是否退件"]);
    const explicitSignedAt = parseDate(source["签收时间"], "mdy");
    const inferredSignedAt = delivered ? parseDate(detail["最新操作时间"], "mdy") : null;
    const signedAt = explicitSignedAt || inferredSignedAt;
    const pickupDate = parseDate(source["取件日期"], "dmy");
    const pickupAt = parseDate(pick(source, ["快递员取件时间", "任务领取时间"]), "mdy") || pickupDate;
    const deadlineReference = pickupAt || parseDate(source["中心签出日期"], "dmy") || signedAt;
    const dueAt = parseDueTime(source["妥投时效"], deadlineReference);
    const driver = String(pick(source, ["快递员名称"]) || pick(detail, ["操作人"]) || "未识别司机").trim();
    const area = String(pick(source, ["快递员区域名称"]) || pick(detail, ["快递员工作区域名称"]) || "未识别区域").trim();
    const zip = normalizeZip(pick(source, ["邮编"]) || pick(detail, ["收件地邮编"]));
    const row = {
      tracking,
      customerOrder: String(detail["客户单号"] || "").trim(),
      matched: Boolean(detailMap.has(tracking)),
      driver,
      area,
      zip,
      city: String(detail["收件城市"] || "").trim(),
      state: String(detail["收件州/省"] || "").trim(),
      task: String(source["任务编码"] || "").trim(),
      station: String(pick(source, ["签入站点"]) || pick(detail, ["派送方", "目的站点"])).trim(),
      pickupAt,
      signedAt,
      dueAt,
      signedTimeInferred: !explicitSignedAt && Boolean(inferredSignedAt),
      delivered,
      returned,
      courierStatus: String(source["快递员操作状态"] || "").trim(),
      latestStatus: String(source["运单最新状态"] || "").trim(),
      detailStatus: String(detail["运单状态"] || "").trim(),
      problemType: String(source["问题件类型"] || "").trim(),
      weightKg: asNumber(pick(detail, ["结算重量(kg)", "预报重量(kg)", "复核重量"])),
      volumeWeightKg: asNumber(pick(detail, ["预报体积重", "复核体积重"])),
      onTimeEligible: Boolean(delivered && signedAt && dueAt),
      onTime: Boolean(delivered && signedAt && dueAt && signedAt <= dueAt),
      routeDate: pickupAt || parseDate(source["中心签出日期"], "dmy") || signedAt
    };
    row.exception = isExceptionStatus(row);
    if (driver === "未识别司机") missingDriver += 1;
    if (!zip) missingZip += 1;
    if (area === "未识别区域") missingArea += 1;
    if (delivered && !signedAt) missingSignedTime += 1;
    if (!dueAt) missingDueTime += 1;
    if (delivered && returned) contradictory += 1;
    return row;
  });

  return {
    // Only successfully joined packages enter KPI, driver and route analysis.
    // Unmatched monitoring rows remain visible through the quality counters.
    merged: merged.filter(row => row.matched),
    quality: {
      monitoringRows: monitoringRows.length,
      detailRows: detailRows.length,
      matched,
      unmatched: monitoringRows.length - matched,
      duplicateDetailRows: duplicateCount,
      missingDriver,
      missingZip,
      missingArea,
      missingSignedTime,
      missingDueTime,
      contradictory,
      monitoringColumns: monitoringHeaders.length,
      detailColumns: detailHeaders.length,
      ignoredMonitoringColumns: monitoringHeaders.filter(header => !MONITORING_KEEP.includes(header)).length,
      ignoredDetailColumns: detailHeaders.filter(header => !DETAIL_KEEP.includes(header)).length
    }
  };
}

function percentile(values, p) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = (sorted.length - 1) * p;
  const lower = Math.floor(index), upper = Math.ceil(index);
  if (lower === upper) return sorted[lower];
  return sorted[lower] + (sorted[upper] - sorted[lower]) * (index - lower);
}

function summarizeDrivers(rows) {
  const fleetEligible = rows.filter(row => row.onTimeEligible);
  const fleetOnTimeRate = fleetEligible.length ? fleetEligible.filter(row => row.onTime).length / fleetEligible.length : null;
  const fleetDeliveredRate = rows.length ? rows.filter(row => row.delivered).length / rows.length : 0;
  const groups = new Map();
  rows.forEach(row => {
    const key = `${row.driver}|||${row.area}`;
    if (!groups.has(key)) groups.set(key, {driver: row.driver, area: row.area, rows: [], days: new Map()});
    const group = groups.get(key);
    group.rows.push(row);
    const day = dateKey(row.routeDate);
    group.days.set(day, (group.days.get(day) || 0) + 1);
  });
  const priorStrength = 50;
  return [...groups.values()].map(group => {
    const delivered = group.rows.filter(row => row.delivered).length;
    const eligible = group.rows.filter(row => row.onTimeEligible);
    const onTime = eligible.filter(row => row.onTime).length;
    const exceptions = group.rows.filter(row => row.exception).length;
    const returns = group.rows.filter(row => row.returned).length;
    const baseline = fleetOnTimeRate ?? fleetDeliveredRate;
    const adjustedOnTime = (onTime + priorStrength * baseline) / (eligible.length + priorStrength);
    return {
      driver: group.driver,
      area: group.area,
      packages: group.rows.length,
      delivered,
      eligible: eligible.length,
      onTime,
      adjustedOnTime,
      exceptions,
      returns,
      days: group.days.size,
      p75Capacity: Math.round(percentile([...group.days.values()], .75)),
      totalWeight: group.rows.reduce((sum, row) => sum + row.weightKg, 0),
      zips: new Set(group.rows.map(row => row.zip).filter(Boolean)).size
    };
  }).sort((a, b) => b.adjustedOnTime - a.adjustedOnTime || b.days - a.days || b.packages - a.packages);
}

function summarizeRoutes(rows) {
  const groups = new Map();
  rows.forEach(row => {
    const key = `${row.area}|||${row.zip || "无ZIP"}`;
    if (!groups.has(key)) groups.set(key, {area: row.area, zip: row.zip || "", rows: [], drivers: new Set(), cities: new Map()});
    const group = groups.get(key);
    group.rows.push(row);
    group.drivers.add(row.driver);
    if (row.city) group.cities.set(row.city, (group.cities.get(row.city) || 0) + 1);
  });
  return [...groups.values()].map(group => {
    const delivered = group.rows.filter(row => row.delivered).length;
    const eligible = group.rows.filter(row => row.onTimeEligible);
    const onTime = eligible.filter(row => row.onTime).length;
    const topCity = [...group.cities.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] || "—";
    const deliveredRate = group.rows.length ? delivered / group.rows.length : 0;
    const onTimeRate = eligible.length ? onTime / eligible.length : null;
    let risk = "数据不足";
    if (eligible.length >= 10) risk = onTimeRate >= .99 ? "低" : onTimeRate >= .97 ? "中" : "高";
    else if (group.rows.length >= 10) risk = deliveredRate >= .99 ? "低" : deliveredRate >= .97 ? "中" : "高";
    return {
      area: group.area,
      zip: group.zip,
      city: topCity,
      packages: group.rows.length,
      drivers: group.drivers.size,
      delivered,
      eligible: eligible.length,
      onTime,
      totalWeight: group.rows.reduce((sum, row) => sum + row.weightKg, 0),
      risk
    };
  }).sort((a, b) => b.packages - a.packages);
}

function renderMetrics() {
  const rows = state.mergedRows;
  const delivered = rows.filter(row => row.delivered).length;
  const eligible = rows.filter(row => row.onTimeEligible);
  const onTime = eligible.filter(row => row.onTime).length;
  $("metricRows").textContent = formatInt(rows.length);
  $("metricRowsNote").textContent = `${formatInt(new Set(rows.map(row => row.tracking).filter(Boolean)).size)} 个唯一运单`;
  $("metricMatch").textContent = formatPct(state.quality.matched, rows.length);
  $("metricMatchNote").textContent = `${formatInt(state.quality.matched)} 条已连接`;
  $("metricDelivered").textContent = formatPct(delivered, rows.length);
  $("metricDeliveredNote").textContent = `${formatInt(delivered)} 条识别为签收`;
  $("metricOnTime").textContent = formatPct(onTime, eligible.length);
  $("metricOnTimeNote").textContent = eligible.length ? `${formatInt(eligible.length)} 条时间完整` : "缺少签收或妥投时效";
}

function qualityClass(value, goodWhenZero = true) {
  if (goodWhenZero && value === 0) return "good";
  return value > Math.max(10, state.mergedRows.length * .05) ? "bad" : value ? "warn" : "good";
}

function renderQuality() {
  const q = state.quality;
  const items = [
    ["配送监控记录", formatInt(q.monitoringRows), "good"],
    ["运单明细记录", formatInt(q.detailRows), "good"],
    ["未匹配运单", formatInt(q.unmatched), qualityClass(q.unmatched)],
    ["明细重复记录", formatInt(q.duplicateDetailRows), qualityClass(q.duplicateDetailRows)],
    ["缺少司机", formatInt(q.missingDriver), qualityClass(q.missingDriver)],
    ["缺少ZIP", formatInt(q.missingZip), qualityClass(q.missingZip)],
    ["缺少区域", formatInt(q.missingArea), qualityClass(q.missingArea)],
    ["签收但缺少时间", formatInt(q.missingSignedTime), qualityClass(q.missingSignedTime)],
    ["缺少妥投时效", formatInt(q.missingDueTime), qualityClass(q.missingDueTime)],
    ["退回与签收同时出现", formatInt(q.contradictory), qualityClass(q.contradictory)],
    ["被忽略的原始列", formatInt(q.ignoredMonitoringColumns + q.ignoredDetailColumns), "good"]
  ];
  $("qualityList").innerHTML = items.map(([label, value, cls]) => `<div class="quality-item"><span>${escapeHtml(label)}</span><strong class="${cls}">${escapeHtml(value)}</strong></div>`).join("");
}

function renderDriverTable() {
  $("driverTableBody").innerHTML = state.drivers.map(driver => `
    <tr>
      <td>${escapeHtml(driver.driver)}</td>
      <td>${escapeHtml(driver.area)}</td>
      <td>${formatInt(driver.packages)}</td>
      <td>${formatPct(driver.delivered, driver.packages)}</td>
      <td>${formatPct(driver.onTime, driver.eligible)}</td>
      <td>${(driver.adjustedOnTime * 100).toFixed(1)}%</td>
      <td>${formatPct(driver.exceptions, driver.packages)}</td>
      <td>${formatInt(driver.days)}</td>
      <td>${formatInt(driver.p75Capacity)}</td>
      <td>${formatWeight(driver.totalWeight)}</td>
    </tr>`).join("");
}

function riskClass(risk) {
  return risk === "高" ? "risk-high" : risk === "中" ? "risk-medium" : risk === "低" ? "risk-low" : "";
}

function renderRouteTable() {
  $("routeTableBody").innerHTML = state.routes.map(route => `
    <tr>
      <td>${escapeHtml(route.area)}</td>
      <td>${escapeHtml(route.zip || "—")}</td>
      <td>${escapeHtml(route.city)}</td>
      <td>${formatInt(route.packages)}</td>
      <td>${formatInt(route.drivers)}</td>
      <td>${formatPct(route.delivered, route.packages)}</td>
      <td>${formatPct(route.onTime, route.eligible)}</td>
      <td>${formatWeight(route.totalWeight)}</td>
      <td class="${riskClass(route.risk)}">${escapeHtml(route.risk)}</td>
    </tr>`).join("");
}

function renderAreaSelect() {
  const areas = [...new Set(state.mergedRows.map(row => row.area).filter(area => area && area !== "未识别区域"))].sort();
  $("areaSelect").innerHTML = areas.length ? areas.map(area => `<option value="${escapeHtml(area)}">${escapeHtml(area)}</option>`).join("") : `<option value="">无可用区域</option>`;
}

function recommendDrivers() {
  const area = $("areaSelect").value;
  const planned = Math.max(1, Number($("plannedPackages").value) || 1);
  const candidates = state.drivers.filter(driver => driver.area === area).map(driver => ({
    ...driver,
    capacityFit: driver.p75Capacity >= planned,
    capacityRatio: driver.p75Capacity ? planned / driver.p75Capacity : Infinity
  })).sort((a, b) => Number(b.capacityFit) - Number(a.capacityFit) || b.adjustedOnTime - a.adjustedOnTime || b.days - a.days || a.capacityRatio - b.capacityRatio);
  if (!candidates.length) {
    $("recommendation").className = "recommendation empty-state";
    $("recommendation").textContent = "该区域尚无历史司机数据。";
    return;
  }
  $("recommendation").className = "recommendation";
  $("recommendation").innerHTML = candidates.slice(0, 5).map((driver, index) => `
    <div class="recommend-card">
      <span class="rank">${index + 1}</span>
      <div class="recommend-main">
        <strong>${escapeHtml(driver.driver)}</strong>
        <small>调整后准时率 ${(driver.adjustedOnTime * 100).toFixed(1)}% · ${driver.days}天经验 · P75容量 ${driver.p75Capacity}件</small>
      </div>
      <span class="tag ${driver.capacityFit ? "good" : "warn"}">${driver.capacityFit ? "容量适配" : "可能超载"}</span>
    </div>`).join("");
}

function initializeMap() {
  if (state.map || !window.L) return;
  const capitalRegionBounds = L.latLngBounds([42.45, -74.35], [43.05, -73.35]);
  state.map = L.map("map", {
    zoomControl: true,
    scrollWheelZoom: false,
    keyboard: false,
    doubleClickZoom: false,
    minZoom: 8,
    maxBounds: capitalRegionBounds.pad(.15),
    maxBoundsViscosity: .85,
    worldCopyJump: false
  }).setView([42.72, -73.88], 9);
  const tileLayer = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    updateWhenIdle: true,
    keepBuffer: 4,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(state.map);
  tileLayer.on("tileerror", () => {
    $("mapStatus").textContent = "部分底图未加载；ZIP点仍可正常查看";
  });
  state.markerLayer = L.layerGroup().addTo(state.map);
}

function combineMapRoutes(routes) {
  const groups = new Map();
  routes.filter(route => /^\d{5}$/.test(route.zip)).forEach(route => {
    if (!groups.has(route.zip)) {
      groups.set(route.zip, {
        zip: route.zip,
        packages: 0,
        drivers: 0,
        delivered: 0,
        eligible: 0,
        onTime: 0,
        totalWeight: 0,
        areas: new Set(),
        cities: new Set()
      });
    }
    const group = groups.get(route.zip);
    group.packages += route.packages;
    group.drivers += route.drivers;
    group.delivered += route.delivered;
    group.eligible += route.eligible;
    group.onTime += route.onTime;
    group.totalWeight += route.totalWeight;
    if (route.area) group.areas.add(route.area);
    if (route.city && route.city !== "—") group.cities.add(route.city);
  });
  return [...groups.values()];
}

async function lookupZip(zip) {
  const cacheKey = `ben-route-zip-${zip}`;
  const cached = localStorage.getItem(cacheKey);
  if (cached) return JSON.parse(cached);
  const response = await fetch(`https://api.zippopotam.us/us/${encodeURIComponent(zip)}`);
  if (!response.ok) throw new Error(`ZIP ${zip} 未找到`);
  const data = await response.json();
  const place = data.places?.[0];
  if (!place) throw new Error(`ZIP ${zip} 无坐标`);
  const result = {lat: Number(place.latitude), lng: Number(place.longitude), place: place["place name"] || ""};
  localStorage.setItem(cacheKey, JSON.stringify(result));
  return result;
}

async function locateRoutes(event) {
  event?.preventDefault();
  initializeMap();
  if (!state.map || !state.markerLayer) return;
  state.markerLayer.clearLayers();
  const routes = combineMapRoutes(state.routes);
  if (!routes.length) {
    $("mapStatus").textContent = "没有可定位的5位ZIP";
    return;
  }
  $("locateBtn").disabled = true;
  const bounds = [];
  let located = 0;
  let outsideRegion = 0;
  const maxPackages = Math.max(...routes.map(route => route.packages), 1);
  for (let i = 0; i < routes.length; i += 1) {
    const route = routes[i];
    $("mapStatus").textContent = `正在定位 ${i + 1}/${routes.length}`;
    try {
      const point = await lookupZip(route.zip);
      if (point.lat < 42.45 || point.lat > 43.05 || point.lng < -74.35 || point.lng > -73.35) {
        outsideRegion += 1;
        continue;
      }
      const deliveredRate = route.packages ? route.delivered / route.packages : 0;
      const onTimeRate = route.eligible ? route.onTime / route.eligible : null;
      const effectiveRate = onTimeRate ?? deliveredRate;
      const color = effectiveRate >= .99 ? "#0d6b4f" : effectiveRate >= .97 ? "#b87018" : "#b33a31";
      const radius = 7 + Math.sqrt(route.packages / maxPackages) * 12;
      const cityLabel = [...route.cities].join("、") || point.place || "—";
      const areaLabel = [...route.areas].join("、") || "未识别区域";
      const marker = L.circleMarker([point.lat, point.lng], {
        radius,
        color,
        fillColor: color,
        fillOpacity: .48,
        weight: 2
      }).bindTooltip(`${escapeHtml(route.zip)} · ${formatInt(route.packages)}件`, {direction: "top"})
        .bindPopup(`<strong>${escapeHtml(areaLabel)} · ${escapeHtml(route.zip)}</strong><br>${escapeHtml(cityLabel)}<br>${formatInt(route.packages)} 件 · ${formatWeight(route.totalWeight)}<br>妥投率 ${formatPct(route.delivered, route.packages)}<br>准时率 ${formatPct(route.onTime, route.eligible)}`, {autoPan: false});
      marker.addTo(state.markerLayer);
      bounds.push([point.lat, point.lng]);
      located += 1;
    } catch (error) {
      console.warn(error.message);
    }
  }
  // Keep the current Albany view stable after markers load; users can pan manually.
  $("mapStatus").textContent = outsideRegion
    ? `已定位 ${located}/${routes.length} 个ZIP，忽略 ${outsideRegion} 个范围外ZIP`
    : `已定位 ${located}/${routes.length} 个ZIP`;
  $("locateBtn").disabled = false;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>'"]/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
}

function exportCsv() {
  if (!state.mergedRows.length || !window.XLSX) return;
  const output = state.mergedRows.map(row => ({
    "运单号": row.tracking,
    "客户单号": row.customerOrder,
    "司机": row.driver,
    "区域": row.area,
    "ZIP": row.zip,
    "城市": row.city,
    "任务编码": row.task,
    "已签收": row.delivered ? "是" : "否",
    "准时资格": row.onTimeEligible ? "是" : "否",
    "准时": row.onTimeEligible ? (row.onTime ? "是" : "否") : "未知",
    "异常": row.exception ? "是" : "否",
    "退回": row.returned ? "是" : "否",
    "重量kg": row.weightKg,
    "体积重kg": row.volumeWeightKg,
    "数据连接": row.matched ? "已匹配" : "未匹配"
  }));
  const sheet = XLSX.utils.json_to_sheet(output);
  const csv = XLSX.utils.sheet_to_csv(sheet);
  const blob = new Blob(["\ufeff", csv], {type: "text/csv;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `ben-route-cleaned-${new Date().toISOString().slice(0, 10)}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}

function runAnalysis(monitoringRows, detailRows) {
  if (!monitoringRows.length || !detailRows.length) throw new Error("两份报表都必须包含至少一行数据。");
  const monitoringHeaders = Object.keys(monitoringRows[0]);
  const detailHeaders = Object.keys(detailRows[0]);
  if (!monitoringHeaders.includes("运单号") || !detailHeaders.includes("运单号")) throw new Error("两份报表都必须包含“运单号”列。");
  const result = mergeData(monitoringRows, detailRows);
  // Raw rows can contain personal or commercially sensitive fields. Keep only
  // the normalized merged records required by the analysis after the join.
  state.monitoringRows = [];
  state.detailRows = [];
  state.mergedRows = result.merged;
  state.quality = result.quality;
  state.drivers = summarizeDrivers(result.merged);
  state.routes = summarizeRoutes(result.merged);
  renderMetrics();
  renderQuality();
  renderDriverTable();
  renderRouteTable();
  renderAreaSelect();
  $("results").classList.remove("hidden");
  initializeMap();
  setTimeout(() => state.map?.invalidateSize({pan: false, animate: false}), 0);
}

async function handleAnalyze() {
  const monitoringFile = $("monitoringFile").files[0];
  const detailFile = $("detailFile").files[0];
  if (!monitoringFile || !detailFile) return;
  setStatus("正在浏览器内读取文件…");
  $("analyzeBtn").disabled = true;
  try {
    const [monitoringRows, detailRows] = await Promise.all([readSpreadsheet(monitoringFile), readSpreadsheet(detailFile)]);
    runAnalysis(monitoringRows, detailRows);
    const q = state.quality;
    if (q.matched === 0) {
      setStatus(`已读取监控 ${formatInt(q.monitoringRows)} 条、明细 ${formatInt(q.detailRows)} 条，但没有共同运单号。请确认日期和车队范围一致。`, "error");
    } else if (q.monitoringRows <= 1 || q.detailRows <= 1) {
      setStatus(`仅检测到监控 ${formatInt(q.monitoringRows)} 条、明细 ${formatInt(q.detailRows)} 条；请确认导出时没有保留单号筛选。`, "warn");
    } else {
      setStatus(`分析完成：监控 ${formatInt(q.monitoringRows)} 条，成功连接 ${formatInt(q.matched)} 条`, "success");
    }
  } catch (error) {
    console.error(error);
    setStatus(error.message || "文件读取失败", "error");
  } finally {
    updateAnalyzeButton();
  }
}

function setStatus(message, type = "") {
  $("statusText").textContent = message;
  $("statusText").className = `status ${type}`.trim();
}

function updateAnalyzeButton() {
  $("analyzeBtn").disabled = !($("monitoringFile").files[0] && $("detailFile").files[0]);
  $("monitoringName").textContent = $("monitoringFile").files[0]?.name || "尚未选择文件";
  $("detailName").textContent = $("detailFile").files[0]?.name || "尚未选择文件";
}

function resetAll() {
  $("monitoringFile").value = "";
  $("detailFile").value = "";
  $("results").classList.add("hidden");
  $("recommendation").className = "recommendation empty-state";
  $("recommendation").textContent = "选择区域和计划件量后生成推荐。";
  state.monitoringRows = [];
  state.detailRows = [];
  state.mergedRows = [];
  state.drivers = [];
  state.routes = [];
  state.quality = {};
  state.markerLayer?.clearLayers();
  updateAnalyzeButton();
  setStatus("等待数据");
}

$("monitoringFile").addEventListener("change", updateAnalyzeButton);
$("detailFile").addEventListener("change", updateAnalyzeButton);
$("analyzeBtn").addEventListener("click", handleAnalyze);
$("sampleBtn").addEventListener("click", () => {
  runAnalysis(cleanRows(SAMPLE_MONITORING), cleanRows(SAMPLE_DETAIL));
  setStatus("已加载6条脱敏示例", "success");
});
$("resetBtn").addEventListener("click", resetAll);
$("recommendBtn").addEventListener("click", recommendDrivers);
$("locateBtn").addEventListener("click", locateRoutes);
$("exportBtn").addEventListener("click", exportCsv);

updateAnalyzeButton();

if (typeof module !== "undefined" && module.exports) {
  module.exports = {cleanRows, parseDate, parseDueTime, normalizeTracking, normalizeZip, repairSheetRange, mergeData, combineMapRoutes};
}
