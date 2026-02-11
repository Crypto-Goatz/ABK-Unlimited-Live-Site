export interface CRMContact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  locationId: string;
  source: string;
  tags: string[];
  dateAdded: string;
  dateUpdated: string;
  [key: string]: unknown;
}

export interface CRMContactsResponse {
  contacts: CRMContact[];
  meta: {
    total: number;
    currentPage: number;
    nextPage: number | null;
    previousPage: number | null;
  };
}

export interface CRMPipeline {
  id: string;
  name: string;
  stages: CRMPipelineStage[];
  locationId: string;
}

export interface CRMPipelineStage {
  id: string;
  name: string;
  position: number;
}

export interface CRMOpportunity {
  id: string;
  name: string;
  monetaryValue: number;
  pipelineId: string;
  pipelineStageId: string;
  status: string;
  contactId: string;
  contact?: { name: string; email: string };
  dateAdded: string;
}

export interface CRMWorkflow {
  id: string;
  name: string;
  status: string;
  locationId: string;
}

export interface CRMSocialPost {
  id: string;
  status: string;
  postContent: string;
  socialMediaType: string[];
  scheduledAt?: string;
  createdAt: string;
}

export interface CRMSocialPostInput {
  locationId: string;
  post: string;
  platforms: string[];
  scheduledAt?: string;
}
