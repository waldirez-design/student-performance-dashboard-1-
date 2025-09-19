export interface User {
  id: string
  name: string
  email: string
  role: "teacher" | "parent" | "admin"
  schoolId: string
  photo?: string
}

export interface Student {
  id: string
  name: string
  email: string
  parentId: string
  schoolId: string
  grade: string
  class: string
  enrollmentDate: string
  photo?: string
  specialNeeds?: SpecialNeed[]
  medicalInfo?: string
  emergencyContact?: {
    name: string
    phone: string
    relationship: string
  }
}

export interface SpecialNeed {
  id: string
  type: "autism" | "wheelchair" | "visual_impairment" | "hearing_impairment" | "learning_disability" | "adhd" | "other"
  description: string
  accommodations: string[]
  severity: "mild" | "moderate" | "severe"
  supportRequired: string[]
}

export interface Subject {
  id: string
  name: string
  teacherId: string
  schoolId: string
  grade: string
}

export interface Grade {
  id: string
  studentId: string
  subjectId: string
  value: number
  maxValue: number
  type: "exam" | "assignment" | "participation"
  date: string
  description: string
}

export interface School {
  id: string
  name: string
  code: string
  address: string
  phone: string
  email: string
}

export interface TransferRequest {
  id: string
  studentId: string
  fromSchoolId: string
  toSchoolId: string
  status: "pending" | "approved" | "rejected"
  requestDate: string
  approvalDate?: string
  transferData: {
    grades: Grade[]
    attendance: number
    disciplinaryRecords: string[]
    medicalInfo?: string
  }
}
