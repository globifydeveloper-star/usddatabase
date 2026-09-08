import { MenuItemType } from '@/types/menu'

export const MENU_ITEMS: MenuItemType[] = [
  {
    key: 'navigation',
    label: 'Navigation',
    isTitle: true,
  },
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'ri:dashboard-3-line',
    url: '/dashboard',
  },
  // administration
  {
    key: "admin-section",
    label: "Administration",
    icon: "ri:settings-3-line",
    children: [
      {
        key: "roles",
        label: "Roles",
        url: "/administration/roles",
      },
      {
        key: "permissions",
        label: "Permissions",
        url: "/administration/permissions",
      },
      {
        key: "cms-users",
        label: "CMS Users",
        url: "/cms-users",
      },
    ],
  },
  {
    key: "security-section",
    label: "Security",
    icon: "ri:shield-keyhole-line",
    children: [
      {
        key: "login-history",
        label: "Login History",
        url: "/login-history",
      },
      {
        key: "cms-audit-logs",
        label: "Audit Logs",
        url: "/cms-audit-logs",
      },
    ],
  },
  {
    key: 'schools-section',
    label: 'Schools',
    icon: 'ri:building-line',
    children: [
      { key: 'schools', label: 'Schools', url: '/schools', parentKey: 'schools-section' },
      { key: 'school-descriptions', label: 'School Descriptions', url: '/school-descriptions', parentKey: 'schools-section' },
      { key: 'faculty-import', label: 'Faculty Import', url: '/faculty-import', parentKey: 'schools-section' },
    ],
  },
  {
    key: 'programs-section',
    label: 'Programs',
    icon: 'ri:book-open-line',
    children: [
      { key: 'programs', label: 'Programs', url: '/programs', parentKey: 'programs-section' },
      { key: 'program-debt', label: 'Program Debt', url: '/program-debt', parentKey: 'programs-section' },
      { key: 'program-descriptions', label: 'Program Descriptions', url: '/program-descriptions', parentKey: 'programs-section' },
      { key: 'cip-mapping', label: 'Cip Mapping', url: '/cip-mapping', parentKey: 'programs-section' },
      { key: 'program-distribution', label: 'Program Distribution', url: '/program_distribution', parentKey: 'programs-section' },
    ],
  },
  {
    key: "students-section",
    label: "Students",
    icon: 'ri:group-line',
    children: [
      { key: "students", label: "Students", url: "/students", parentKey: "students-section" },
      { key: "aid", label: "Aid for Students", url: "/aid", parentKey: "students-section" },
    ],
  },
  {
    key: 'admission-data-section',
    label: 'Admission Data',
    icon: 'ri:file-list-3-line',
    children: [
      { key: 'admissions', label: 'Admissions', url: '/admissions', parentKey: 'admission-data-section' },
      { key: 'admission-disclosure-categories', label: 'Admission Disclosure Categories', url: '/admission-disclosure-categories', parentKey: 'admission-data-section' },
      { key: 'admissions-sat-ui', label: 'Admissions SAT UI', url: '/admissions-sat-ui', parentKey: 'admission-data-section' },
      { key: 'staging-admissions-categories', label: 'Staging Admissions Categories', url: '/staging-admissions-categories', parentKey: 'admission-data-section' },
      { key: 'temp-sat', label: 'Temp Sat', url: '/temp-sat', parentKey: 'admission-data-section' },
    ],
  },
  {
    key: "completion",
    label:"Completion",
    icon: 'ri:graduation-cap-line',
    url:"/completion"
  },
  {
    key: "academics",
    label:"Academics",
    icon: 'ri:book-line',
    url:"/academics"
  },
  {
    key: "costs-section",
    label: "Costs",
    icon: 'ri:money-dollar-box-line',
    children: [
      { key: "costs", label: "Costs", url: "/costs", parentKey: "costs-section" },
      { key: "repayment", label: "Repayment", url: "/repayment", parentKey: "costs-section" },
      { key: "roi", label: "ROI", url: "/roi", parentKey: "costs-section" },
      { key: "costs-fetched", label: "Costs Fetched", url: "/costs-fetched", parentKey: "costs-section" },
    ],
  },
  {
    key: "debt-income-ratio",
    label: "Debt income ratio",
    icon: 'ri:bar-chart-line',
    url: "/debt-income-ratio",
  },
  {
    key: "net-price-section",
    label: "Net Price",
    icon: 'ri:pie-chart-line',
    children: [
      { key: "net-price-private-income", label: "Net price private colleges income", url: "/net-price-private-income", parentKey: "net-price-section" },
      { key: "net-price-public-income", label: "Net price public colleges income", url: "/net-price-public-income", parentKey: "net-price-section" },
    ],
  },
  {
    key: "earnings-against-courses-merged",
    label: "Earnings Against Courses Merged",
    icon: 'ri:line-chart-fill',
    url: "/earnings-against-courses-merged",
  },
  {
    key: 'athletics-section',
    label: 'Athletics',
    icon: 'ri:basketball-line',
    children: [
      { key: 'athletic-content-blocks', label: 'Athletic Content Blocks', url: '/athletic-content-blocks', parentKey: 'athletics-section' },
      { key: 'athletic-sports', label: 'Athletic Sports', url: '/athletic-sports', parentKey: 'athletics-section' },
      { key: 'athletic-summary', label: 'Athletic Summary', url: '/athletic-summary', parentKey: 'athletics-section' },
      { key: 'athletic-division-benchmarks', label: 'Athletic Division Benchmarks', url: '/athletic-division-benchmarks', parentKey: 'athletics-section' },
    ],
  },
  {
    key: 'pseo-section',
    label: 'PSEO',
    icon: 'ri:bar-chart-box-line',
    children: [
      { key: 'pseo-entities', label: 'Pseo Entities', url: '/pseo-entities', parentKey: 'pseo-section' },
      { key: 'pseo-institute-level', label: 'Pseo Institute Level', url: '/pseo-institute-level', parentKey: 'pseo-section' },
      { key: 'pseo-state-level', label: 'Pseo State Level', url: '/pseo-state-level', parentKey: 'pseo-section' },
    ],
  },
  {
    key: 'app-users-section',
    label: 'App Users',
    icon: 'ri:user-3-line',
    children: [
      { key: 'usdusers', label: 'Usdusers', url: '/usdusers', parentKey: 'app-users-section' },
      { key: 'user-saved-colleges', label: 'User Saved Colleges', url: '/user-saved-colleges', parentKey: 'app-users-section' },
      { key: 'user-saved-programs', label: 'User Saved Programs', url: '/user-saved-programs', parentKey: 'app-users-section' },
      { key: 'user-compare-history', label: 'User Compare History', url: '/user-compare-history', parentKey: 'app-users-section' },
      { key: 'usduser-deactivations', label: 'Usduser Deactivations', url: '/usduser-deactivations', parentKey: 'app-users-section' },
      { key: 'usdusers-preferred-states', label: 'Usdusers Preferred States', url: '/usdusers-preferred-states', parentKey: 'app-users-section' },
      { key: 'usdusers-preferred-programs', label: 'Usdusers Preferred Programs', url: '/usdusers-preferred-programs', parentKey: 'app-users-section' },
      { key: 'usd-apply-clicks', label: 'Apply Clicks', url: '/usd-apply-clicks', parentKey: 'app-users-section' },
    ],
  },
  {
    key: 'reports-section',
    label: 'Reports',
    icon: 'ri:file-chart-line',
    children: [
      { key: 'usdreports', label: 'Usdreports', url: '/usdreports', parentKey: 'reports-section' },
      { key: 'usdreport-colleges', label: 'Usdreport Colleges', url: '/usdreport-colleges', parentKey: 'reports-section' },
    ],
  },
  {
    key: 'content-section',
    label: 'Content',
    icon: 'ri:file-list-2-line',
    children: [
      { key: 'generated-missing-earnings', label: 'Generated Missing Earnings', url: '/generated-missing-earnings', parentKey: 'content-section' },
      { key: 'states', label: 'States', url: '/states', parentKey: 'content-section' },
    ],
  },
  {
    key: 'system-section',
    label: 'System',
    icon: 'ri:settings-4-line',
    children: [
      { key: 'authentication', label: 'Authentication', url: '/authentication', parentKey: 'system-section' },
    ],
  },

]

export const HORIZONTAL_MENU_ITEM: MenuItemType[] = [
  ...MENU_ITEMS,
]

