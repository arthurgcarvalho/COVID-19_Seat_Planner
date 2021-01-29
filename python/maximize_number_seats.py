from gurobipy import *
from plot_results import plot_layout_result
import numpy as np
import pandas as pd
import sys
import os as os

def fixed_seats_model(data_file, d0):
    '''
    Create and solve IP model for selecting seats among a given set of fixed seats in a bus.
    Goal: maximize number of selected seats under specified distance and prevention constraints
    :param data_file: str, coordinate file name of .csv or .xlsx file with 2: Feature, X, Y.
    :param d0: float or int, social distance (inches) between seats.
    :return: optimal objective function value,
             array of coordinates of selected seats,
             array of index of seats being selected in the parameter seat_loc.
             return the minimum distance between selected seats as well.
    '''
    # read coordinates file.
    try:
        if '.xlsx' in data_file:
            coordinates = pd.read_excel(os.getcwd() + "\\python\\input\\" + data_file)
        elif '.csv' in data_file:
            coordinates = pd.read_csv(os.getcwd() + "\\python\\input\\" + data_file)
        seat_loc = np.array(coordinates)
    except:
        print("Error-PY1")
    
    # indexes of all seats
    seat_set = [i for i in range(len(seat_loc))]
           
    pair_set = []  # define a set of seat index pair (s1, s2) for all s1 != s2.
    for s1 in range(len(seat_set) - 1):
        for s2 in range(s1 + 1, len(seat_set)):
            pair_set.append((seat_set[s1], seat_set[s2]))
   
    distance = {}  # compute distance between each pair of seats (s1, s2) for all s1 != s2.
    for pair in pair_set:
        x = np.abs(seat_loc[pair[0]][0] - seat_loc[pair[1]][0])
        y = np.abs(seat_loc[pair[0]][1] - seat_loc[pair[1]][1])
        distance[pair] = np.sqrt(x * x + y * y)
    
    # create model
    model = Model('fixed_seat_layout')

    # set Gurobi parameters
    model.setParam('OutputFlag', False)

    # add variables: general variables for all types
    x = model.addVars(seat_set, vtype = GRB.BINARY)

    # social distancing limit constraint:
    for pair in pair_set:
        if distance[pair] < d0:
            model.addConstr(x[pair[0]] + x[pair[1]] <= 1)
  
    # set objective function: maximize number of students
    model.setObjective(quicksum(x[s] for s in seat_set), GRB.MAXIMIZE)

    # optimize the model
    model.optimize()

    ## print and return the result
    status_code = {1:'LOADED', 2:'OPTIMAL', 3:'INFEASIBLE', 4:'INF_OR_UNBD', 5:'UNBOUNDED'}
    status = model.status
    print('The optimization status is {}'.format(status_code[status]) + "<br>")
    if status == 2:
       
        # Retrieve objective value
        print('Optimal objective value: {}'.format(model.objVal) + " occupied seats <br>")
      
        # Retrieve variable value and record selected seats' index and coordinates.
        seat_loc_selected = []
        seat_selected = []
        for s in seat_set:
            if x[s].x > 0:
                seat_loc_selected.append(seat_loc[s])
                seat_selected.append(s)
                coordinates = coordinates.append(pd.DataFrame([['selected_seat', seat_loc[s][0], seat_loc[s][1]]],
                                                              columns=['Feature', 'X', 'Y']))

        # save the output file.
        if '.xlsx' in data_file:
            coordinates.to_excel(os.getcwd() +"\\python\\output\\" + data_file, index=False)
        elif '.csv' in data_file:
            coordinates.to_csv(os.getcwd() +"\\python\\output\\" + data_file, index=False)

        #print and return the minimum distance between selected seats as well.
        selected_distance = []  # record distance between each pair of selected seats.
        for i in range(len(seat_selected) - 1):
            for j in range(i + 1, len(seat_selected)):
                selected_distance.append(distance[seat_selected[i], seat_selected[j]])

        if  len(seat_selected) >= 2: 
            print('Shortest distance between passengers: {}'.format(np.min(selected_distance)) + " inches")
        
             

if __name__ == "__main__":

    fixed_seats_model(sys.argv[1], float(sys.argv[2]))     
    plot_layout_result(os.getcwd() +"\\python\\output\\" + sys.argv[1])
    