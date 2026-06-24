import {requiredRole } from '@/lib/core/session';
import React from 'react';

const UsersLayout = async ({ children }) => { 
     const res = await requiredRole("user");
     return children
};

export default UsersLayout;