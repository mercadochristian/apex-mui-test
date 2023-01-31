import * as React from 'react';
import ReactApexChart from 'react-apexcharts'
import { APEX_DATA } from './ApexData';

const APEX_OPTIONS = {
    series:[{
        data: APEX_DATA
    }],
    options: {
        chart: {
          id: 'chart2',
          type: 'line',
          height: 230,
          toolbar: {
            autoSelected: 'pan',
            show: false
          }
        },
        colors: ['#546E7A'],
        stroke: {
          width: 3
        },
        dataLabels: {
          enabled: false
        },
        fill: {
          opacity: 1,
        },
        markers: {
          size: 0
        },
        xaxis: {
          type: 'datetime'
        },
        annotations: {
            yaxis: [
                {
                  y: 400,
                  y2: 500,
                  borderColor: '#000',
                  fillColor: '#FEB019',
                  label: {
                    text: 'This is a test'
                  }
                }
              ],
              points: [
                {
                  x: new Date("08/04/2022").getTime(),
                  y: 405.10,
                  marker: {
                    size: 6,
                    fillColor: "#fff",
                    strokeColor: "#2698FF",
                    radius: 2
                  },
                  label: {
                    borderColor: "#FF4560",
                    offsetY: 0,
                    style: {
                      color: "#fff",
                      background: "#FF4560"
                    },
          
                    text: "This is a test 2"
                  }
                }
              ],
              xaxis: [
                {
                  // in a datetime series, the x value should be a timestamp, just like it is generated below
                  x: new Date("12/25/2022").getTime(),
                  strokeDashArray: 0,
                  borderColor: "#775DD0",
                  label: {
                    borderColor: "#775DD0",
                    style: {
                      color: "#fff",
                      background: "#775DD0"
                    },
                    text: "This is a test 3"
                  }
                },
              ],
          },
    },
    
    seriesLine:[{
        data: APEX_DATA
    }],
    optionsLine: {
        chart: {
          id: 'chart1',
          height: 130,
          type: 'area',
          brush:{
            target: 'chart2',
            enabled: true
          },
          selection: {
            enabled: true,
            xaxis: {
              min: new Date('08/01/2022').getTime(),
              max: new Date('08/30/2022').getTime()
            }
          },
        },
        colors: ['#008FFB'],
        fill: {
          type: 'gradient',
          gradient: {
            opacityFrom: 0.91,
            opacityTo: 0.1,
          }
        },
        xaxis: {
          type: 'datetime',
          tooltip: {
            enabled: false
          }
        },
        yaxis: {
          tickAmount: 2
        }
      },
}

const ApexChart = () => {
    return(
        <div id="wrapper">
            <div id="chart-line2">
                <ReactApexChart options={APEX_OPTIONS.options} series={APEX_OPTIONS.series} type="line" height={230} />
            </div>
            <div id="chart-line">
                <ReactApexChart options={APEX_OPTIONS.optionsLine} series={APEX_OPTIONS.seriesLine} type="area" height={130} />
            </div>
        </div>
    )
}

export default ApexChart