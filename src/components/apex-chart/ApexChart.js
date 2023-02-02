import { Box, Button, Modal, TextField } from '@mui/material';
import * as React from 'react';
import ReactApexChart from 'react-apexcharts'
import { APEX_DATA } from './ApexData';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ApexChart = () => {
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
          },
          events: {
            click: (event, chartContext, config) => {
              handleOpen()
              setXAxis(APEX_DATA[config.dataPointIndex].x)
            },
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

    const [open, setOpen] = React.useState(false)
    const [xAxis, setXAxis] = React.useState(null)
    const [annotation, setAnnotation] = React.useState('')
    const [apexOptions, setApexOptions] = React.useState(APEX_OPTIONS)

    const handleOpen = () => {
      setOpen(true);
    };

    const submitAnnotation = () => {
      const newAnnotation = {
        x: new Date(xAxis).getTime(),
        strokeDashArray: 0,
        borderColor: "#775DD0",
        label: {
          borderColor: "#775DD0",
          style: {
            color: "#fff",
            background: "#775DD0"
          },
          text: annotation
        }
      }

      const newArray = apexOptions.options.annotations.xaxis.slice(); // Create a copy
      newArray.push(newAnnotation);

      setApexOptions({
        ...apexOptions,
        options: {
          ...apexOptions.options,
          annotations: {
            ...apexOptions.options.annotations,
            xaxis: newArray
          }
        }
      })
      handleClose()
    }
    React.useEffect(() => {
      console.log(apexOptions)
    }, [apexOptions])

    const handleClose = () => {
      setOpen(false);
      setAnnotation('')
      setXAxis(null)
    };

    const newAnnotation = (e) => {
      setAnnotation(e.target.value)
    }

    return(
        <div id="wrapper">
            <div id="chart-line2">
                <ReactApexChart 
                options={apexOptions.options} 
                series={apexOptions.series} type="line" height={230} />
            </div>
            <div id="chart-line">
                <ReactApexChart 
                options={apexOptions.optionsLine} 
                series={apexOptions.seriesLine} type="area" height={130} />
            </div>
            <Modal
              open={open}
              onClose={handleClose}
            >
              <Box sx={{ ...style, width: 400 }}>
                <h2 id="parent-modal-title">What annotation would you like to add?</h2>
                <TextField id="standard-basic" label="Annotation" variant="standard"
                  onChange={e => newAnnotation(e)} />
                <Button disabled={!annotation} variant="contained" onClick={() => submitAnnotation()}>Add Annotation</Button>
              </Box>
            </Modal>
        </div>
    )
}

export default ApexChart