/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 8/6/2021
 */
import React from "react";

const DataContext = React.createContext(null);
const DataProvider = DataContext.Provider;
const DataConsumer = DataContext.Consumer;
export {DataProvider, DataConsumer};
