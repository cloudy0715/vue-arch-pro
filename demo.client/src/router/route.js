export const routers = [
  {
    name: "Dashboard",
    icon: "house-fill",
    path: "/",
  },
  {
    name: "Architecture",
    icon: "grid1x2-fill",
    children: [
      { name: "AWS", path: "/aws" },
      { name: "Azure", path: "/notes" },
      { name: "GCP", path: "/notes" },
    ],
  },
  {
    name: "Billing",
    icon: "bar-chart-fill",
    children: [
      { name: "Billing Management", path: "/notes" },
      { name: "Monthly Billing Report", path: "/notes" },
      { name: "Daily Billing Report", path: "/notes" },
    ],
  },
  {
    name: "Automation",
    icon: "layers-half",
    children: [
      { name: "Automation Settings", path: "/notes" },
      { name: "Billing Alert", path: "/notes" },
      { name: "Start EC2 Instances", path: "/notes" },
      { name: "Stop EC2 Instances", path: "/notes" },
      { name: "Create EBS Snapshots", path: "/notes" },
      { name: "Create AMI images", path: "/notes" },
      { name: "Create RDS Snapshots", path: "/notes" },
    ],
  },
];
