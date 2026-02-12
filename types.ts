
export interface ComplianceItem {
  id: string;
  requirement: string;
  status: boolean;
  evidence: string;
  implementation?: string;
  category: ComplianceCategory;
}

export enum ComplianceCategory {
  DATA_RESIDENCY = "Data Residency",
  CROSS_BORDER = "Cross-Border Compliance",
  SECURITY = "Security Measures",
  CONSENT = "Consent Management",
  SUBJECT_RIGHTS = "Data Subject Rights",
  BREACH_RESPONSE = "Breach Response",
  VENDOR_MGMT = "Vendor Management",
  DPO = "DPO Appointment",
  DOCUMENTATION = "Documentation",
  STAFF_TRAINING = "Staff Training"
}

export interface SectionProgress {
  category: ComplianceCategory;
  completion: number;
}
