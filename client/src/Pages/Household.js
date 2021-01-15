import React from "react"
import {Typography, Table} from "antd" 
import sample_layout from '../Images/sample-layout.png'
import sample_data from '../Data/example_bus_layout.xlsx'
import sample_data_groups from '../Data/example_groups.xlsx'


const { Title } = Typography;

const dataSource = [
    {key: '1', GroupId: '1', NumberPassengers: '3'},
    {key: '2', GroupId: '2', NumberPassengers: '4'},
    {key: '3', GroupId: '3', NumberPassengers: '1'},
    {key: '4', GroupId: '4', NumberPassengers: '2'},
    {key: '5', GroupId: '5', NumberPassengers: '7'},
    {key: '6', GroupId: '6', NumberPassengers: '1'}
];

const columns = [
    {title: 'GroupId', dataIndex: 'GroupId', key: 'GroupId', align: 'center'},
    {title: 'NumberPassengers', dataIndex: 'NumberPassengers', key: 'NumberPassengers', align: 'center'}
];
  


const Household = () => (
    <>
    <center>
    <Title level={2}>Household Optimization</Title>
    </center>
    <Title level={4}>
    <p>The selected optimization type will fill in the available seats starting from the back of the vehicle.
       Group members (e.g., family) are exempt from the social distance constraint.</p>
    <p>As input, you must provide the desired social distance threshold (in inches), the layout of the vehicle, and information about groups.</p>
    <p>Regarding the vehicle's layout, you have to provide an excel file containing the (x,y) location of the center of each seat, where the top-right seat is (0,0).</p>
    <p> For example, this excel file <a href={sample_data}>(link)</a> encodes the layout displayed below </p> 
    </Title>
    <center><img src={sample_layout}  alt="Bus layout" /></center>
    <Title level={4}>
    <p>To define groups of passengers who can travel together, you must provide an excel file containing two collumns: <i>GroupId</i> and <i>NumberPassengers</i>.</p>
    <p><i>GroupId</i> defines the "pick up" order. <i>NumberPassengers</i> defines how many passenger are part of a group and, hence, can travel close to one another.</p>
    <p>For example, this excel file <a href={sample_data_groups}>(link)</a> encodes the configuration displayed below</p> 
    </Title>
    <center><Table  pagination={false} dataSource={dataSource} columns={columns} /></center>
    </>
);

export default Household;