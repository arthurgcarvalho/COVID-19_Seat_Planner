import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os as os


def plot_layout_result(data_file):
    '''
    Plot classroom layout with seat selection under possible preventions.
    :param data_file: str, coordinate file name of .csv or .xlsx file with 3 columns: Feature, X, Y.
    :param firstrow_y: float, y-coordinate of firstrow.
    :return:
    '''
    ## read coordinates file.
    if '.xlsx' in data_file:
        coordinates = pd.read_excel(data_file)
        filename = data_file[:-5]
    elif '.csv' in data_file:
        coordinates = pd.read_csv(data_file)
        filename = data_file[:-4]
    seat_loc_all      = np.array(coordinates.loc[coordinates['Feature'] != 'selected_seat', ['X', 'Y']])
    seat_loc_selected = np.array(coordinates.loc[coordinates['Feature'] == 'selected_seat', ['X', 'Y']])

    ## create matplotlib figure.
    fig, axs = plt.subplots()
    axs.set_aspect('equal')
    fig.set_figheight(15)
    fig.set_figwidth(15)
    axs.invert_yaxis()
    axs.invert_xaxis()

    plt.tick_params(
        axis='both',  # changes apply to the x-axis
        which='both',  # both major and minor ticks are affected
        bottom=False,  # ticks along the bottom edge are off
        left=False,  # ticks along the left edge are off
        labelbottom=False,  # labels along the bottom edge are off
        labelleft=False)  # labels along the left edge are off

    legend_objects = []
    legend_labels = []

    ## plot seats and selected seats.
    s0, = axs.plot(seat_loc_all[:, 0], seat_loc_all[:, 1], "s", markersize=15, fillstyle='none', color='black')
    s1, = axs.plot(seat_loc_selected[:, 0], seat_loc_selected[:, 1], "s", markersize=15, fillstyle='full')
    legend_objects.append(s1)
    legend_labels.append('Selected seats')
    legend_objects.append(s0)
    legend_labels.append('Unselected seats')

    ## add legend.
    plt.legend(legend_objects, legend_labels, loc='lower center', ncol=len(legend_objects), bbox_to_anchor=(0.5, -0.1))

    ## save output file.
    plt.savefig(filename + ".pdf", dpi=300)


if __name__ == "__main__":
    data_file = os.getcwd() + "\\python\\output\\file-1598762301994.xlsx" 
    plot_layout_result(data_file)
    
    
    
    
    
    
    