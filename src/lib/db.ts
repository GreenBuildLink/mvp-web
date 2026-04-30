import { supabase } from './supabase';
import type { ProjectSubmission, CompanySubmission, WorkerSubmission, ConsultationSubmission } from './types';

type ProjectInsert = Omit<ProjectSubmission, 'id' | 'created_at'>;
type CompanyInsert = Omit<CompanySubmission, 'id' | 'created_at'>;
type WorkerInsert = Omit<WorkerSubmission, 'id' | 'created_at'>;
type ConsultationInsert = Omit<ConsultationSubmission, 'id' | 'created_at'>;

export async function insertProjectSubmission(data: ProjectInsert) {
    const { data: result, error } = await supabase
        .from('project_submissions')
        .insert(data)
        .select()
        .single();

    if (error) throw error;
    return result;
}

export async function insertCompanySubmission(data: CompanyInsert) {
    const { data: result, error } = await supabase
        .from('company_submissions')
        .insert(data)
        .select()
        .single();

    if (error) throw error;
    return result;
}

export async function insertWorkerSubmission(data: WorkerInsert) {
    const { data: result, error } = await supabase
        .from('worker_submissions')
        .insert(data)
        .select()
        .single();

    if (error) throw error;
    return result;
}

export async function insertConsultationSubmission(data: ConsultationInsert) {
    const { data: result, error } = await supabase
        .from('consultation_submissions')
        .insert(data)
        .select()
        .single();

    if (error) throw error;
    return result;
}