'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { Card, CardBody } from 'react-bootstrap';
import ApexChartClient from '@/components/ApexChartClient';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function ProgramOverallChart() {
    const [series, setSeries] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);

    useEffect(() => {
        fetch('/api/programchart')
            .then((res) => res.json())
            .then((data) => {
                const s = data.map((i: any) => Number(i.total));
                const l = data.map((i: any) => i.credential_title);

                console.log('SERIES =', s);
                console.log('LABELS =', l);

                setSeries(s);
                setLabels(l);
            });
    }, []);

    const options: ApexOptions = {
        chart: {
            type: 'polarArea',
            height: 380,
        },
        labels,
        legend: {
            position: 'bottom',
        },
        stroke: {
            colors: ['#fff'],
        },
        fill: {
            opacity: 0.85,
        },
        tooltip: {
            y: {
                formatter: function (val, opts) {
                    const total = opts.globals.seriesTotals.reduce(
                        (a: number, b: number) => a + b,
                        0
                    );
                    return `${val} (${((val / total) * 100).toFixed(1)}%)`;
                },
            },
        },
    };

    return (
        <Card>
            <div className="card-header">
                <h4 className="header-title mb-1">Program Overall Count Comparison</h4>

                <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
                    Overall distribution of credentials across all available programs.
                </p>
            </div>

            <CardBody>
                {series.length > 0 && (
                    <Chart options={options} series={series} type="polarArea" height={380} />
                )}
            </CardBody>
        </Card>
    );
}
