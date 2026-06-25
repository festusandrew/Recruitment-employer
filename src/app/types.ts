export interface Job {
  id: number;
  title: string;
  status: string;
  applicants: number;
  // add other fields as needed
}

export interface Applicant {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  // add other fields as needed
}

export interface Candidate extends Applicant {}
