import React, {Component} from "react"
import {Menu, Layout, Button, InputNumber, Upload, message, Select, Typography} from "antd" 
import {UploadOutlined} from '@ant-design/icons';
import {saveAs} from 'file-saver';
import "./App.css"
import loading     from './Images/loading.gif'
import NoHousehold from './Pages/NoHousehold.js';
import Household   from './Pages/Household.js';



const { Title } = Typography;   
const { Header, Content, Sider, Footer } = Layout;
const { Option } = Select;
const server_address = 'http://seatplanner.fsb.miamioh.edu'

class App extends Component {

    state = {
        social_distance: 72,
        layout_filename: "",
        group_filename:  "",
        response_optimization :"",
        first_page: "initial",
        optimization_type:"",
        layout_button_disabled: true,
        groups_button_disabled: true,
        generate_button_disabled: true
    };
  
    componentDidMount() {
        document.title = 'Seating Planner';
    }

    // Function called to upload a file to the server
    UploadFile = (arg) => {     
     
        const props = {
            name: "file",
            accept:".csv,.xlsx",
            multiple: false,
            action: server_address+'/upload',
            onChange(info) {
                const { status } = info.file;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {      
                    message.success(`${info.file.name} file uploaded successfully.`);
                    arg.this.setState({[arg.type+"_filename"]:info.file.response.filename}); //filename of either layout_filename or group_filename
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };
        return (
            <Upload {...props}><Button disabled={arg.disabled}><UploadOutlined /> Click to upload a {[arg.type]} file</Button> </Upload>
        )
    }

    // Function that indirectly calls the Python script to optimize a layout
    Optimize = async e => {
        e.preventDefault();

        if(this.state.layout_filename === "") {
            message.error('Please upload a layout file first', 5);
        }
        else if (this.state.group_filename ==="" && this.state.optimization_type ==="Household") {
            message.error('Please upload a group file first', 5);
        }
        else {
            //change main screen to loading gif
            this.setState({first_page: "loading"})
            
            // call optimize procedure
            const response = await fetch(server_address+'/optimize', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ post: this.state }),
            });
            
            const body = await response.text();
            
            if (body === "Error-PY1") {
                message.error('Error when reading the uploaded layout file', 5);
            }
            else if (body === "Error-PY2") {
                message.error('Error when reading the uploaded group file', 5);
            }
            else { // asks for the generated pdf

                this.setState({response_optimization: body})
                var res = await fetch(server_address+"/output",  { 
                    method: "POST",
                    headers: { "Content-Type": "application/json"},
                    body:JSON.stringify({ post: this.state }),
                })       
                
                // download requested pdf
                const blob = await res.blob();
                saveAs(blob, "layout.pdf")
            }

            // change the main screen to outcome screen
            this.setState({first_page: "outcome",
                        optimization_type: "",
                        layout_button_disabled: true,
                        groups_button_disabled: true,
                        generate_button_disabled: true})
                        
        }
    }

    // Function that defines the content of the main panel
    DefineContent() {
        var content;

        if (this.state.first_page === "initial") {
            content = <Title level={2}><center>Please, select an <i>Optimization Type</i></center></Title>
        }
        else if (this.state.first_page === "no_household") {
            content = <NoHousehold />
        }
        else if (this.state.first_page === "household") {
            content = <Household />
        }
        else if (this.state.first_page === "loading") { 
            content = <><center><img src={loading} alt="Loading" /></center></>
        }
        else if (this.state.first_page === "outcome") { 
            content = this.state.response_optimization.split('<br>').map ((item, i) => <p key={i}>{item}</p>);
            content =  <Title level={2}><center>{content}</center> </Title>;
        }
      return(content)
    }


    // Function that process changes when an optimization type is selected
    OptimizationType = (value) => {
        if (value === "no_household") {
            this.setState({first_page:"no_household",
                           optimization_type:"No Household",        
                           layout_button_disabled: false,
                           groups_button_disabled: true,
                           generate_button_disabled: false})
        }
        else if (value === "household") {
            this.setState({first_page:"household",
                           optimization_type:"Household",        
                           layout_button_disabled: false,
                           groups_button_disabled: false,
                           generate_button_disabled: false})
        }

    }

    // Render the website
    render() {
        
        const content = this.DefineContent();
      
        return (
            <Layout>
                <Header className="header"> Seating Planner </Header>
                <Content style={{ padding: '0 50px' }}>
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        <Sider className="site-layout-background" width={380}>
                            <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%' }} >
                                <Menu.Item key="1"> Optimization type:  
                                    <Select value={this.state.optimization_type} style={{ width: 200 }} onChange ={this.OptimizationType}>
                                        <Option value="no_household">No Household</Option>
                                        <Option value="household">Household</Option>
                                    </Select>
                                </Menu.Item>
                                <Menu.Item key="2"> Desired social distance in inches: 
                                    <InputNumber min={0} max={1000} defaultValue={72} onChange={(e) =>this.setState({social_distance:e})} />
                                </Menu.Item>
                                <Menu.Item key="3"><this.UploadFile type={"layout"} this = {this} disabled = {this.state.layout_button_disabled}/></Menu.Item>
                                <Menu.Item key="4"><this.UploadFile type={"group"}  this = {this} disabled = {this.state.groups_button_disabled}/></Menu.Item>
                                <Menu.Item key="5"><Button type="primary" disabled = {this.state.generate_button_disabled} onClick={this.Optimize}>Generate seating plan</Button></Menu.Item>
                            </Menu>                
                        </Sider>
                        <Content>{content}</Content>
                    </Layout>
                </Content>
                <Footer><center><p>Developed by <a href="http://www.users.miamioh.edu/carvalag/">Dr. Arthur Carvalho</a> (arthur.carvalho@miamioh.edu) under the CC0 V1.0 Universal License</p> 
                               <p>Source code available at  <a href="https://github.com/arthurgcarvalho/COVID-19_Seat_Planner">https://github.com/arthurgcarvalho/COVID-19_Seat_Planner</a></p>
                        </center>
                </Footer>
            </Layout>
        )
    }
}

export default App
