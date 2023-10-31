import { ComplaintType } from "../enums";

export interface CreateComplaint{
    description: string;
    transfusionCenterId?: string;
    staffId?: string;
}

export interface CreateComplaintAnswer{
    answer: string;
    complaintId: string;
}