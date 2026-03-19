'use client';

import ApexChartClient from '@/components/ApexChartClient';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import { Card, CardBody } from 'react-bootstrap';

const RepaymentOverallChart = () => {
    const [series, setSeries] = useState<any[]>([]);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        fetch('/api/repaymentchart')
            .then((res) => res.json())

            .then((data) => {
                const clean = data.filter(
                    (d: any) => d.yr1_overall !== null && d.yr3_overall !== null
                );

                const unitids = clean.map((d: any) => String(d.unitid));

                const yr1 = clean.map((d: any) => Number(d.yr1_overall));
                const yr3 = clean.map((d: any) => Number(d.yr3_overall));

                setCategories(unitids);

                setSeries([
                    { name: '1 Year Overall', data: yr1 },
                    { name: '3 Year Overall', data: yr3 },
                ]);
            });
    }, []);

    const options: ApexOptions = {
        chart: {
            type: 'bar',
            height: 350,
            toolbar: { show: false },
        },

        plotOptions: {
            bar: {
                columnWidth: '45%',
                borderRadius: 5,
            },
        },

        dataLabels: { enabled: false },

        xaxis: {
            categories,
            title: {
                text: 'Institution UNITID',
            },
        },

        yaxis: {
            title: {
                text: 'Repayment Overall Rate',
            },
        },

        legend: {
            position: 'top',
        },

        colors: ['#5b8def', '#00c853'],
    };

    return (
        <Card>
            <div className="card-header">
                <h4 className="header-title mb-1">Repayment Overall Comparison</h4>

                <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
                    Comparison of student repayment performance between Year-1 and Year-3 across
                    institutions.
                </p>
            </div>

            <CardBody>
                <ApexChartClient options={options} series={series} type="bar" height={350} />
            </CardBody>
        </Card>
    );
};

export default RepaymentOverallChart;
