/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 7/6/2021
 */

import React from 'react'

const AuthContext = React.createContext();

const AuthProvider = AuthContext.Provider;
const AuthConsumer = AuthContext.Consumer;

export {AuthProvider, AuthConsumer};

