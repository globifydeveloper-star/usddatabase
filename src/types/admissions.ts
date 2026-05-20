export interface Admissions {
    unitid: string;
    test_requirements: number | null;
    admission_rate: number | null;
    school_min_range: number | null;
    school_max_range: number | null;
    sat_avg_overall: number | null;
    sat_mid_math: number | null;
    sat_mid_reading: number | null;
    sat_p25_reading: number | null;
    sat_p25_math: number | null;
    sat_p25_writing: number | null;
    sat_p75_reading: number | null;
    sat_p75_math: number | null;
    sat_p75_writing: number | null;
    sat_rw_min: number | null;
    sat_rw_max: number | null;
    sat_math_min: number | null;
    sat_math_max: number | null;   
}