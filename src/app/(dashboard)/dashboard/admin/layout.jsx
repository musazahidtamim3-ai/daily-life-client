import { requiredRole } from '@/lib/core/session';
import React from 'react';

const AdminLayout = async({ children }) => {
     const res = await requiredRole("admin");
     return children;
};

export default AdminLayout;