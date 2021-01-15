# Installation Steps

## Server (Node.js)
- Download and install Node.js from https://nodejs.org/en/download/
    - This code was tested under the version 14.15.1
    - When asked, check the checkbox to <i>"automatically install the necessary tools..."</i> 
    - The step above is crucial since it will install Python and other crucial tools
- Open a terminal, go inside the "Code" folder, and install the libraries required by the server by running the following: <i>npm install</i>
<br><br>

## Client (React)
- Open a terminal, go inside the "client" folder, and install the libraries required by the client by running the following: <i>npm install</i>
<br><br>


## Optimizer (Python)
- Open a terminal and install the following Python libraries using pip3
    - pip3 install numpy
    - pip3 install pandas
    - pip3 install matplotlib 
    - pip3 install xlrd
    - pip3 install openpyxl
<br><br>

## Optimizer (Gurobi)
- Download and install Gurobi Optimizer from https://www.gurobi.com/downloads/gurobi-software/
    - This code was tested under the version 9.1
- License: download and install the academic license by following the instructions at https://www.gurobi.com/academia/academic-program-and-licenses/
- To install gurobipy module, open a terminal, go to Gubrobi folder (for example c:/gurobi910/win64), and type: <i>python setup.py install</i>
<br><br>


# Deployment Steps

## Client 
- Open the file <i>App.js</i> and change the IP address of the server (Line 15) 
- Open a terminal, go inside the "client" folder, and run the following: <i>npm run build</i>
<br><br>

## Server
 - Open a terminal, go inside the "Code" folder, and run the following: <i>node server</i>
<br><br>




