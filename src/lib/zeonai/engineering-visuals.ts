/**
 * Verified diagram / panel copy from zeonai-website-preview.vercel.app
 * (engineering section). Do not invent product behaviour beyond this.
 */

export const pipelineStages = [
  { id: "data", label: "Data\nSourcing" },
  { id: "doc", label: "Document\nProcessing" },
  { id: "rules", label: "Business\nRules" },
  { id: "output", label: "Business\nOutput" },
] as const;

export const pipelineOutputs = [
  "dashboard",
  "report",
  "export file",
  "ERP system",
] as const;

export const spreadsheetConfig = {
  title: "spreadsheet",
  meta: [
    { key: "sheet", value: "Finance" },
    { key: "header_row", value: "0" },
  ],
  columns: [
    { label: "Inv No", type: "alphabetic", hint: "Invoice number" },
    { label: "Date", type: "date", hint: "Invoice date" },
    { label: "Total", type: "numeric", hint: "Amount" },
  ],
} as const;

export const pdfConfig = {
  title: "pdf",
  meta: [
    { key: "key_phrases", value: "Invoice No., PO No." },
    { key: "category", value: "Invoice" },
  ],
  extraction: ["whole document", "page by page", "fixed layout, variable pages"],
  mergeAdjacent: true,
} as const;

export const rulesVisual = {
  promptLabel: "plain-language prompt",
  prompt: '"Calculate GST at 18% on the invoice total"',
  draftLabel: "drafted rule",
  draftBadge: "draft: review before saving",
  code: `rule_set:  Invoice checks
type:      Calculation
output:    gst_amount

gst_amount = invoice_total * 0.18`,
  types: ["Calculation", "Validation", "Transformation", "Assignment"] as const,
} as const;

export const accessTiers = [
  {
    tier: "General",
    see: "Role members",
    act: "Role with permission",
  },
  {
    tier: "Protected",
    see: "Named roles only",
    act: "Named roles only",
  },
  {
    tier: "Restricted",
    see: "Current owner",
    act: "Current owner only",
  },
] as const;

export const accessOverride =
  "administrator override: an explicit permission, not available on restricted cases";

export const delegationStatuses = [
  "open",
  "submitted",
  "sent back",
  "resubmitted",
  "completed",
] as const;

export const delegationNote = "case.close() is blocked while any task is open";

export const auditEntries = [
  { time: "09:14:02", event: "case.created", actor: "creator" },
  { time: "09:20:41", event: "case.forwarded", actor: "creator" },
  { time: "10:02:09", event: "task.delegated", actor: "holder" },
  { time: "10:18:33", event: "task.completed", actor: "assignee" },
  { time: "11:01:07", event: "case.closed", actor: "holder" },
] as const;
