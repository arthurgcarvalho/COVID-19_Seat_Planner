import React from "react"
import {Typography} from "antd" 
import sample_layout from '../Images/sample-layout.png'
import sample_data from '../Data/example_bus_layout.xlsx'

const { Title } = Typography;

const NoHousehold = () => (
    <>
    <center>
    <Title level={2}>No-Household Optimization</Title>
    </center>
    <Title level={4}>
    <p>The selected optimization type will find a seat to as many passengers as possible given the social distance constraint 
    and the vehicle's layout.</p>
    <p>As input, you must provide the desired social distance threshold (in inches) and the layout of the vehicle.</p>
    <p>Regarding the latter, you have to provide an excel file containing the (x,y) location of the center of each seat, where the top-right seat is (0,0).</p>
    <p> For example, this excel file <a href={sample_data}>(link)</a> encodes the layout displayed below </p> </Title>
    <center><img src={sample_layout}  alt="Bus layout" /></center>
    </>
);

export default NoHousehold;