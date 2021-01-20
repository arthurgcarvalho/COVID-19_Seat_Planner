from plot_results_group import plot_layout_result
import numpy as np
import pandas as pd
import sys
import os as os


def household_model(layout_file, group_file, d0):

    '''
    Heuristic that fills in a vehicle starting from the back.
    :param layout_file: str, coordinate file name of type .csv or .xlsx file with 2: Feature, X, Y.
    :param group_file: file name of  type.csv or .xlsx file with 2 collumns: GroupID and NumberPassengers
    :param d0: float or int, social distance (inches) between seats.
    :return: optimal objective function value,
             array of coordinates of selected seats,
             array of index of seats being selected in the parameter seat_loc.
             return the minimum distance between selected seats as well.
    '''

    # read coordinates file.
    try:
        if '.xlsx' in layout_file:
            coordinates = pd.read_excel(os.getcwd() + "\\python\\input\\" + layout_file)
        elif '.csv' in layout_file:
            coordinates = pd.read_csv(os.getcwd() + "\\python\\input\\" + layout_file)
        
        coordinates = coordinates.sort_values(by=['Y','X'], ascending=False) #fill in seats from left to right, back to front
        seat_loc    = np.array(coordinates)
    except:
        print("Error-PY1")


    # read groups file.
    try:
        if '.xlsx' in group_file:
            groups = pd.read_excel(os.getcwd() + "\\python\\input\\" + group_file)
        elif '.csv' in group_file:
            groups = pd.read_csv(os.getcwd() + "\\python\\input\\" + group_file)

        groups = groups.sort_values(by=['GroupId'], ascending=True) #sort groups by GroupID
        groups = np.array(groups)
    except:
        print("Error-PY2")


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


    current_seat = 0 # current seat to be assigned in the for loop
    seating_plan = [0]*len(seat_loc) # final seating plan; array initialized with zeros

    for group_index in range(len(groups)): #for each group
    
        group_seats = [] #seats occupied by the group
    
        for person in range(groups[group_index,1]): #for each person in the group
            for seat in range (current_seat, len(seat_loc)): # for each unchecked seat 
                if seating_plan[current_seat] == 0: #if seat is available
                    seating_plan[current_seat] = groups[group_index,0] #assign a group number to the seat
                    group_seats.append(current_seat) #add seat to the group of seats occupied by the group
                    current_seat = current_seat + 1 
                    break
                else: #if seat is unavailable because of social distance constraints       
                    current_seat = current_seat + 1 
        
        #for each unchecked seat, define the seat as unavailable if the distance between 
        #the seat and one of the seats occupied by the group is greater than the social distance threshold
        for i in range(current_seat, len(seat_loc)):
            for j in group_seats:
                if distance[j,i] < d0:
                    seating_plan[i] = -1

    # save the output file.
    coordinates["SeatingPlan"] = seating_plan

    if '.xlsx' in layout_file:
        coordinates.to_excel(os.getcwd() +"\\python\\output\\" + layout_file, index=False)
    elif '.csv' in layout_file:
        coordinates.to_csv(os.getcwd() +"\\python\\output\\" + layout_file, index=False)

    #how many seats are occupied
    print(str(sum(coordinates["SeatingPlan"] > -1)) + " occupied seats <br>")

if __name__ == "__main__":  

    household_model(sys.argv[1], sys.argv[2], int(sys.argv[3]))     
    plot_layout_result(os.getcwd() +"\\python\\output\\" + sys.argv[1])