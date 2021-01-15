
        

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
        coordinates.to_excel(os.getcwd() +"\\python\\output\\" + data_file, index=False)

        #print and return the minimum distance between selected seats as well.
        selected_distance = []  # record distance between each pair of selected seats.
        for i in range(len(seat_selected) - 1):
            for j in range(i + 1, len(seat_selected)):
                selected_distance.append(distance[seat_selected[i], seat_selected[j]])

        if  len(seat_selected) >= 2: 
            print('Shortest distance between passengers: {}'.format(np.min(selected_distance)) + " inches")
        
             

    