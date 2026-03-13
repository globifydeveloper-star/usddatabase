export interface School {
    unitid: string;
    name: string | null;
    city: string | null;
    state: string | null;
    zip: string | null;
    address: string | null;
    accreditor: string | null;
    school_url: string | null;
    degrees_awarded: number | null;
    has_pseo: boolean;
    ope8_id: string | null;
}