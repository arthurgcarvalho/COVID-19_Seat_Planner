setwd(dirname(rstudioapi::getActiveDocumentContext()$path)) # automatically set working dir

# check if the pacman package is installed (and install it if needed)
if(require(pacman) == FALSE) install.packages('pacman')
pacman::p_load(tidyverse, magrittr) # load the required libraries

# bus Sizes according to Table 1 in our paper
busSize = c(84, 78, 72, 66, 52, 34)

set.seed(2021) # to ensure that the data is reproducible


# Using a double for loop to generate the required data
for (s in 1:length(busSize)) {
  for (r in seq(0,9)) { # 10 replicates for each bus Size
    
    # generating the data randomly 
    #(the probabilties that we chose for the groups are shown below and were selected to provide realistic variety)
    df = data.frame(GroupId = 1:busSize[s], # first variable -> counter for max possible groups 
                    NumberPassengers = sample(c(1, 2, 3, 4), size = busSize[s], prob = c(0.40, 0.40, 0.15, 0.05), replace = T)) # second var
    
    df$cumulativeSum = cumsum(df$NumberPassengers) # adding a third variable for filtering
    
    df %<>% filter(cumulativeSum <= busSize[s]) # bus cannot have passengers greater than capacity
    
    df %<>% select(-c(cumulativeSum)) # removing the cumulativeSum col since it was only used to filter data
    
    # saving the output as a csv (first number is rated bus capacity and second is replication number)
    write.csv(df, 
              file = paste0('bus_', busSize[s], 'p_capacity_rep', r, '.csv'),
              row.names = F)
  }
}


# Plane sizes corresponding to:
# A320 - Delta (https://www.seatguru.com/airlines/Delta_Airlines/Delta_Airlines_Airbus_A320_B_new.php), 
# A320 - JATM (https://www.ncbi.nlm.nih.gov/pmc/articles/PMC7486076/), and 
# Boeing 737-700 (https://www.ana.co.jp/en/us/travel-information/seat-map/b737-700/)
planeType = c('A320 - Delta', 'A320 - JATM', 'Boeing737')
planeSize = c(160, 120, 120) # please update the capacities according to your layout
set.seed(2021) # to ensure that the data is reproducible


# Using a double for loop to generate the required data
for (s in 1:length(planeSize)) {
  for (r in seq(0,9)) { # 10 replicates for each plane Size
    
    # generating the data randomly 
    df = data.frame(GroupId = 1:planeSize[s], # first variable -> counter for max possible groups 
                    NumberPassengers = sample(c(1, 2, 3, 4, 5, 6), 
                                              size = planeSize[s],
                                              prob = c(0.30, 0.25, 0.20, 0.15, 0.05, 0.05),
                                              replace = T)) # second var
    
    df$cumulativeSum = cumsum(df$NumberPassengers) # adding a third variable for filtering
    
    df %<>% filter(cumulativeSum <= planeSize[s]) # bus cannot have passengers greater than capacity
    
    df %<>% select(-c(cumulativeSum)) # removing the cumulativeSum col since it was only used to filter data
    
    # saving the output as a csv (first number is rated bus capacity and second is replication number)
    write.csv(df, 
              file = paste0('plane_', planeType[s], 'p_capacity_rep', r, '.csv'),
              row.names = F)
  }
}