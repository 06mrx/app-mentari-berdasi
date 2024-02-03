import PageLayout from "@/components/PageLayout";
import dynamic from 'next/dynamic';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import useSWR from 'swr';
import { storageService } from "@/services/storage.service";
export default function Recap() {
    let token = 'Bearer ' + storageService.getToken();
    const fetcher = (url) => fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': token
        }
    }).then((res) => res.json())

    const { data } = useSWR(process.env.API + '/api/headmaster/recap/index', fetcher);
    var series = [{
        // data: data?.data?.chart?.data
        data: data?.data?.age?.data
    }];
    var options = {
        chart: {
            type: 'bar',
            height: 350,

        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            }
        },
        grid: {
            show: false,
            padding: {
                left: 0,
                right: 0,
            },
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '12px',
                    fontWeight: 500,
                },
                offsetX: 10,
            }
        },
        // colors: ['#fab23d'],
        colors: ['#ee4128'],
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: data?.data?.age?.label,
        },
        tooltip: {
            theme: 'dark',
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function () {
                        return 'Jumlah TPK'
                    }
                }
            }
        }
    };

    var series2 = [{
        // data: data?.data?.chart?.data
        data: data?.data?.gender?.data
    }];
    var options2 = {
        chart: {
            type: 'bar',
            height: 350,

        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            }
        },
        grid: {
            show: false,
            padding: {
                left: 0,
                right: 0,
            },
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '12px',
                    fontWeight: 500,
                },
                offsetX: 10,
            }
        },
        colors: ['#fab23d'],
        // colors: ['#ee4128'],
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: data?.data?.age?.label
        },
        tooltip: {
            theme: 'dark',
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function () {
                        return 'Jumlah TPK'
                    }
                }
            }
        }
    };

    var series3 = [{
        // data: data?.data?.chart?.data
        data: data?.data?.district?.data
    }];
    var options3 = {
        chart: {
            type: 'bar',
            height: 350,

        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            }
        },
        grid: {
            show: false,
            padding: {
                left: 0,
                right: 0,
            },
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: false,
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '12px',
                    fontWeight: 500,
                },
                offsetX: 10,
            }
        },
        colors: ['#02a6f2'],
        // colors: ['#ee4128'],
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: data?.data?.district?.label
        },
        tooltip: {
            theme: 'dark',
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function () {
                        return 'Jumlah TPK'
                    }
                }
            }
        }
    };

    return <>
        <PageLayout title={'Rekap Data TPK'} backUrl="/headmaster" hasBackUrl={true}>
            <div className=" max-w-7xl mx-auto bg-base-100 rounded-2xl shadow-xl p-3">
                <h1 className="font-bold text-lg md:text-2xl lg:text-2xl">
                    Data Berdasarkan Usia
                </h1>
                <div className="flex flex-col md:flex-row lg:flex-row gap-2 shadow-xl">
                    <div className="w-full">
                        <table className="table table-compact w-full">
                            <thead>
                                <tr>
                                    <th>
                                        Usia
                                    </th>
                                    <th>
                                        Jumlah TPK
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.data?.age?.label.map((row, index) => {
                                        return (
                                            <tr>
                                                <td>
                                                    {row}
                                                </td>
                                                <td>
                                                    {data?.data?.age?.data[index]}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full">
                        {
                            data?.data?.age ? <ReactApexChart options={options} series={series} type="bar" height={320} /> : null
                        }
                    </div>
                </div>
                <h1 className="font-bold text-lg md:text-2xl lg:text-2xl mt-10">
                    Data Berdasarkan Jenis Kelamin
                </h1>
                <div className="flex flex-col md:flex-row lg:flex-row gap-2 shadow-xl">
                    <div className="w-full">
                        <table className="table table-compact w-full">
                            <thead>
                                <tr>
                                    <th>
                                        Jenis Kelamin
                                    </th>
                                    <th>
                                        Jumlah TPK
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.data?.gender?.label.map((row, index) => {
                                        return (
                                            <tr>
                                                <td>
                                                    {row}
                                                </td>
                                                <td>
                                                    {data?.data?.gender?.data[index]}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full">
                        {
                            data?.data?.gender ? <ReactApexChart options={options2} series={series2} type="bar" height={200} /> : null
                        }
                    </div>
                </div>
                <h1 className="font-bold text-lg md:text-2xl lg:text-2xl mt-10">
                    Data Berdasarkan Kecamatan
                </h1>
                <div className="flex flex-col md:flex-row lg:flex-row gap-2 shadow-xl">
                    <div className="w-full">
                        <table className="table table-compact w-full">
                            <thead>
                                <tr>
                                    <th>
                                        Kecamatan
                                    </th>
                                    <th>
                                        Jumlah TPK
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data?.data?.district?.label.map((row, index) => {
                                        return (
                                            <tr>
                                                <td>
                                                    {row}
                                                </td>
                                                <td>
                                                    {data?.data?.district?.data[index]}
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="w-full">
                        {
                            data?.data?.district ? <ReactApexChart options={options3} series={series3} type="bar" height={300} /> : null
                        }
                    </div>
                </div>
            </div>
        </PageLayout>
    </>
}