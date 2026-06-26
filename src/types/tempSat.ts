export interface TempSat {
  unitid: number|null;
  sat_avg_overall: number|null;
  sat_mid_math: number|null;
  sat_mid_reading: number|null;
  sat_p25_reading: number|null;
  sat_p25_math: number|null;
  sat_p25_writing: number|null;
  sat_p75_reading: number|null;
  sat_p75_math: number|null;
  sat_p75_writing: number|null;
  // joined display fields
  school_name?: string | null;
}
