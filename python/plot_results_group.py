import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os as os
import matplotlib.patches as mpatch


def plot_layout_result(data_file):
    
    ## read coordinates file.
    if '.xlsx' in data_file:
        coordinates = pd.read_excel(data_file)
        filename = data_file[:-5]
    elif '.csv' in data_file:
        coordinates = pd.read_csv(data_file)
        filename = data_file[:-4]
    
    seats = np.array(coordinates)

    ## create matplotlib figure.
    fig, axs = plt.subplots()
    axs.set_aspect('equal')
    axs.set_xlim((-5, max(seats[:,0]) + 5))
    axs.set_ylim((-5, max(seats[:,1]) + 5))
    axs.invert_yaxis()
    axs.invert_xaxis()
    axs.spines['top'].set_visible(False)
    axs.spines['right'].set_visible(False)
    axs.spines['bottom'].set_visible(False)
    axs.spines['left'].set_visible(False)

    plt.tick_params(
        axis='both',  # changes apply to the x-axis
        which='both',  # both major and minor ticks are affected
        bottom=False,  # ticks along the bottom edge are off
        left=False,  # ticks along the left edge are off
        labelbottom=False,  # labels along the bottom edge are off
        labelleft=False # labels along the left edge are off
    )
  
    for seat_index in range(len(seats)):    
        #rectangle = mpatch.Rectangle((seats[seat_index,0],seats[seat_index,1]), 5, 20, fill = False) #create squares centered at seat positions, length 5
        #axs.add_artist(rectangle, )
        #rx, ry = rectangle.get_xy()
        #x = rx + rectangle.get_width()/2.0
        #cy = ry + rectangle.get_height()/2.0
        if int(seats[seat_index,2]) != -1:
            axs.annotate(int(seats[seat_index,2]),  (seats[seat_index,0], seats[seat_index,1]), color='b', weight='bold', fontsize=10, ha='center', va='center')
        else:
            axs.annotate('X', (seats[seat_index,0], seats[seat_index,1]), color='red', weight='bold', fontsize=10, ha='center', va='center')
    
    
    plt.savefig(filename + ".pdf", dpi=300)

if __name__ == "__main__":
    data_file = os.getcwd() + "\\python\\output\\file-1611255960626.xlsx" 
    plot_layout_result(data_file)    
    