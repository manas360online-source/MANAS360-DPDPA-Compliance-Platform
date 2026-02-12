
import { ComplianceItem, ComplianceCategory } from './types';

export const INITIAL_COMPLIANCE_DATA: ComplianceItem[] = [
  // 1.1 Infrastructure Location Checklist
  { id: "1.1.1", requirement: "Primary servers located in India", status: true, evidence: "AWS Mumbai (ap-south-1) confirmation", category: ComplianceCategory.DATA_RESIDENCY },
  { id: "1.1.2", requirement: "Database servers in India", status: true, evidence: "RDS/Lightsail DB region certificate", category: ComplianceCategory.DATA_RESIDENCY },
  { id: "1.1.3", requirement: "Backup storage in India", status: true, evidence: "S3 bucket region configuration", category: ComplianceCategory.DATA_RESIDENCY },
  { id: "1.1.4", requirement: "CDN edge locations documented", status: true, evidence: "CloudFront India PoP list", category: ComplianceCategory.DATA_RESIDENCY },
  { id: "1.1.5", requirement: "No automatic replication outside India", status: true, evidence: "AWS replication policy screenshot", category: ComplianceCategory.DATA_RESIDENCY },
  { id: "1.1.6", requirement: "Disaster recovery site in India", status: true, evidence: "DR region = ap-south-2 (Hyderabad)", category: ComplianceCategory.DATA_RESIDENCY },

  // 3.3 Cross-Border Transfer Checklist
  { id: "3.3.1", requirement: "Explicit consent obtained before transfer", status: false, evidence: "Consent UI screenshot + database flag", category: ComplianceCategory.CROSS_BORDER },
  { id: "3.3.2", requirement: "Consent is specific (not bundled)", status: true, evidence: "Separate consent for each service", category: ComplianceCategory.CROSS_BORDER },
  { id: "3.3.3", requirement: "User can withdraw consent", status: true, evidence: "Settings page with toggle", category: ComplianceCategory.CROSS_BORDER },
  { id: "3.3.4", requirement: "Data minimization applied", status: true, evidence: "Only necessary data sent (anonymized)", category: ComplianceCategory.CROSS_BORDER },
  { id: "3.3.5", requirement: "Recipient country adequacy assessed", status: false, evidence: "US/Singapore adequacy documentation", category: ComplianceCategory.CROSS_BORDER },

  // 4.1 Encryption
  { id: "4.1.1", requirement: "Data at rest encryption", status: true, evidence: "AWS RDS/S3 encryption enabled", category: ComplianceCategory.SECURITY, implementation: "AES-256" },
  { id: "4.1.2", requirement: "Data in transit encryption", status: true, evidence: "HTTPS enforced, HSTS enabled", category: ComplianceCategory.SECURITY, implementation: "TLS 1.3" },
  { id: "4.1.3", requirement: "Database field-level encryption", status: false, evidence: "Health data columns encrypted", category: ComplianceCategory.SECURITY, implementation: "AES-256" },

  // 6.1 Subject Rights
  { id: "6.1.1", requirement: "Right to Access", status: false, evidence: "Self-service data export in app", category: ComplianceCategory.SUBJECT_RIGHTS },
  { id: "6.1.2", requirement: "Right to Correction", status: true, evidence: "Edit profile in app + support request", category: ComplianceCategory.SUBJECT_RIGHTS },
  { id: "6.1.3", requirement: "Right to Erasure", status: false, evidence: "Account deletion in settings", category: ComplianceCategory.SUBJECT_RIGHTS },

  // 10.1 DPO
  { id: "10.1.1", requirement: "DPO Appointed", status: false, evidence: "Official appointment letter", category: ComplianceCategory.DPO },
];

export const DATA_CATEGORIES = [
  { name: "Mental Health Data", risk: "HIGHEST", why: "Considered 'Sensitive Personal Data' under DPDPA" },
  { name: "Health Records", risk: "HIGHEST", why: "Medical prescriptions, therapy notes, assessments" },
  { name: "Biometric/Voice", risk: "HIGH", why: "If using voice IVR or mood detection" },
  { name: "Financial Data", risk: "HIGH", why: "Payment information for subscriptions" },
  { name: "Identity Data", risk: "MEDIUM", why: "Name, phone, email, location" },
];
