'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { Card, CardBody } from 'react-bootstrap';
import ApexChartClient from '@/components/ApexChartClient';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function CollegeAndProgramChart() {
    const [series, setSeries] = useState<any[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        fetch('/api/collegeandprogramchart') //api
            .then((res) => res.json())
            .then((data) => {
                setCategories(data.map((i: any) => i.school_name));

                setSeries([
                    {
                        name: 'Bachelors',
                        data: data.map((i: any) => i.bachelors),
                    },
                    {
                        name: 'Associates',
                        data: data.map((i: any) => i.associates),
                    },
                    {
                        name: 'Undergraduate Cert',
                        data: data.map((i: any) => i.undergraduate),
                    },
                    {
                        name: 'Masters',
                        data: data.map((i: any) => i.masters),
                    },
                ]);
            });
    }, []);

    const options: ApexOptions = {
        chart: {
            type: 'bar',
            stacked: true,
            height: 420,
            toolbar: { show: false },
        },
        plotOptions: {
            bar: { horizontal: true },
        },
        xaxis: {
            categories,
        },
        legend: {
            position: 'top',
        },
        colors: ['#727cf5', '#0acf97', '#fa5c7c', '#ffbc00'],
        fill: { opacity: 1 },
    };

    return (
        <Card>
            <div className="card-header">
                <h4 className="header-title mb-1">College and Program Overall Comparison</h4>

                <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
                    Breakdown of degree types offered by the top 10 institutions.
                </p>
            </div>

            <CardBody>
                <ApexChartClient options={options} series={series} type="bar" height={350} />
            </CardBody>
        </Card>
    );
}
