/*
 * Copyright (c) 2021. All Rights Reserved
 *  Created by Jay Suthar on 8/6/2021
 */

import React from 'react'

const AuthContext = React.createContext(null);

const AuthProvider = AuthContext.Provider;
const AuthConsumer = AuthContext.Consumer;

export {AuthProvider, AuthConsumer};

