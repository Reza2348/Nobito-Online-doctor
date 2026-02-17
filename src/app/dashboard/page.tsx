// DashboardPage.jsx
import React from "react";
import DashboardLayout from "./layout";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500">Users</h2>
          <p className="text-2xl font-bold">1,245</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-2xl font-bold">$12,430</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-gray-500">Orders</h2>
          <p className="text-2xl font-bold">324</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-gray-500 uppercase">
                Role
              </th>
              <th className="px-6 py-3 text-left text-gray-500 uppercase">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">john@example.com</td>
              <td className="px-6 py-4">Admin</td>
              <td className="px-6 py-4">Active</td>
            </tr>
            <tr>
              <td className="px-6 py-4">Jane Smith</td>
              <td className="px-6 py-4">jane@example.com</td>
              <td className="px-6 py-4">Editor</td>
              <td className="px-6 py-4">Inactive</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}
