import { useState } from "react";
import { Link } from "react-router-dom";

interface RowProps {
  data: Record<string, string>;
}

interface AuditLogItem {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target?: string;
  category: string;
}

const auditLogsData: AuditLogItem[] = [
  {
    id: "1",
    timestamp: "Jul 29, 2026 · 09:14 AM",
    actor: "Miguel Ortega",
    action: "deactivated employee",
    target: "Ravi Patel (EMP-1012)",
    category: "Employee Directory",
  },
  {
    id: "2",
    timestamp: "Jul 29, 2026 · 08:47 AM",
    actor: "Priya Nandan",
    action: "approved leave request from",
    target: "Jonas Berg",
    category: "Leave Management",
  },
  {
    id: "3",
    timestamp: "Jul 28, 2026 · 05:32 PM",
    actor: "Wei Zhang",
    action: "updated department head for",
    target: "Finance",
    category: "Department Management",
  },
  {
    id: "4",
    timestamp: "Jul 28, 2026 · 02:10 PM",
    actor: "System",
    action: "auto-flagged 3 late clock-ins across Engineering",
    category: "Attendance",
  },
  {
    id: "5",
    timestamp: "Jul 27, 2026 · 11:58 AM",
    actor: "Miguel Ortega",
    action: "added new employee",
    target: "Grace Kim (EMP-1015)",
    category: "Employee Directory",
  },
  {
    id: "6",
    timestamp: "Jul 27, 2026 · 09:02 AM",
    actor: "Nadia Hussain",
    action: "rejected leave request from",
    target: "Sam Whitfield",
    category: "Leave Management",
  },
];

const AuditLogs = () => {
  return (
    <div className="card w-full p-6">
      <div className="flex flex-col">
        {auditLogsData.map((log, index) => (
          <div
            key={log.id}
            className={`flex flex-row items-start gap-4 py-4 ${
              index !== auditLogsData.length - 1
                ? "border-b border-orange-200/50"
                : ""
            }`}
          >
            {/* Timestamp Column */}
            <p className="text-xs text-slate-400 whitespace-nowrap min-w-36 pt-0.5">
              {log.timestamp}
            </p>

            {/* Bullet Point */}
            <span className="text-slate-900 text-xs pt-0.5">•</span>

            {/* Content Column */}
            <div className="flex flex-col">
              <p className="text-sm text-slate-700">
                <span className="font-bold text-slate-900">{log.actor}</span>{" "}
                {log.action}{" "}
                {log.target && (
                  <span className="font-bold text-slate-900">{log.target}</span>
                )}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">{log.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
// Data row component matching your pattern for the system employee directory
const AdminEmployeeRow = ({ data }: RowProps) => {
  return (
    <div className="grid grid-cols-5 gap-12 border-b border-orange-200 py-2">
      <p className="text-sm">{data.empId}</p>
      <p className="text-sm">{data.name}</p>
      <p className="text-sm">{data.department}</p>
      <p className="text-sm">{data.role}</p>
      <div className="bg-green-200 rounded-2xl px-2 max-w-fit -ml-2 max-h-6 min-w-16">
        <p className="text-sm">{data.status}</p>
      </div>
    </div>
  );
};

export default function AdminView() {
  const [activeTab, setActiveTab] = useState("employees");
  const [menu, setMenu] = useState(false);
  return (
    <div className="md:p-6 md:px-30">
      {/* This is just for navigation between views */}
      <div
        className="flex justify-center items-center fixed left-0 top-0 rounded-full bg-white border border-orange-200 p-4 m-2 hover:bg-orange-100"
        onClick={() => {
          setMenu((p) => !p);
        }}
      >
        {menu == true && (
          <div className="flex flex-col gap-1">
            <button className="bg-white px-8 rounded-2xl hover:bg-slate-100">
              <Link to={"/manager"}>mng</Link>
            </button>
            <button className="bg-white px-8 rounded-2xl hover:bg-slate-100">
              <Link to={"/"}>emp</Link>
            </button>
          </div>
        )}
      </div>

      {/* Top Header Grid */}
      <div className="flex flex-col border-b border-orange-200 pb-2">
        <h1 className="text-2xl font-bold">Admin Console</h1>
        <p className="text-sm">Company-wide Management System</p>
      </div>

      {/* Admin KPI Stat Cards Grid */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 mt-2">
        <div className="card">
          <h1 className="text-sm">TOTAL HEADCOUNT</h1>
          <p className="text-2xl font-bold">128 employees</p>
          <p className="text-sm">Across all locations</p>
        </div>
        <div className="card">
          <h1 className="text-sm">DEPARTMENTS</h1>
          <p className="text-2xl font-bold">7 active</p>
          <p className="text-sm">Engineering, HR, Finance...</p>
        </div>
        <div className="card">
          <h1 className="text-sm">ABSENTEEISM RATE</h1>
          <p className="text-2xl font-bold">2.4%</p>
          <p className="text-sm">Target: under 3.0%</p>
        </div>
        <div className="card">
          <h1 className="text-sm">GLOBAL REQUESTS</h1>
          <p className="text-2xl font-bold">5 pending</p>
          <p className="text-sm">Awaiting HR review</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-row gap-8 mt-8 border-b border-orange-200">
        <button
          className={`text-sm pb-2 font-bold ${activeTab == "employees" ? "border-b" : ""}`}
          onClick={() => setActiveTab("employees")}
        >
          Employee Directory
        </button>
        <button
          className={`text-sm pb-2 font-bold ${activeTab == "management" ? "border-b" : ""}`}
          onClick={() => setActiveTab("management")}
        >
          Department Management
        </button>
        <button
          className={`text-sm pb-2 font-bold ${activeTab == "logs" ? "border-b" : ""}`}
          onClick={() => setActiveTab("logs")}
        >
          System Audit Logs
        </button>
      </div>

      {activeTab == "employees" && (
        <>
          <div className="flex flex-row justify-between items-center gap-4 my-4">
            <div className="flex flex-row gap-4 items-center flex-1">
              {/* Search Input */}
              <input
                type="text"
                placeholder="Search employee name..."
                className="border border-orange-200 rounded-lg px-3 py-1.5 text-sm bg-white outline-none w-64"
              />

              {/* Department Filter Dropdown */}
              <select className="border border-orange-200 rounded-lg px-3 py-1.5 text-sm bg-white outline-none">
                <option value="">All Departments</option>
                <option value="engineering">Engineering</option>
                <option value="hr">Human Resources</option>
                <option value="finance">Finance</option>
              </select>
            </div>

            {/* Right Most Add Employee Button */}
            <Link
              className="bg-blue-950 rounded-lg px-6 py-1.5 text-white text-sm font-medium whitespace-nowrap"
              to={"/admin/new"}
            >
              + Add New Employee
            </Link>
          </div>

          {/* Table Header */}
          <div className="grid grid-rows-1 grid-cols-5 gap-10 border-b border-orange-200 py-2">
            <h4 className="text-sm">Employee Code</h4>
            <h4 className="text-sm">Full Name</h4>
            <h4 className="text-sm">Department</h4>
            <h4 className="text-sm">Access Role</h4>
            <h4 className="text-sm">Status</h4>
          </div>

          {/* Table Body */}
          <div className="flex flex-col">
            <AdminEmployeeRow
              data={{
                empId: "EMP-1001",
                name: "Ameer Smith",
                department: "Engineering",
                role: "Employee",
                status: "active",
              }}
            />
            <AdminEmployeeRow
              data={{
                empId: "EMP-1002",
                name: "Sarah Jenkins",
                department: "Engineering",
                role: "Manager",
                status: "active",
              }}
            />
            <AdminEmployeeRow
              data={{
                empId: "EMP-1003",
                name: "John Connor",
                department: "Human Resources",
                role: "Admin",
                status: "active",
              }}
            />
            <AdminEmployeeRow
              data={{
                empId: "EMP-1001",
                name: "Ameer Smith",
                department: "Engineering",
                role: "Employee",
                status: "active",
              }}
            />
            <AdminEmployeeRow
              data={{
                empId: "EMP-1002",
                name: "Sarah Jenkins",
                department: "Engineering",
                role: "Manager",
                status: "active",
              }}
            />
            <AdminEmployeeRow
              data={{
                empId: "EMP-1003",
                name: "John Connor",
                department: "Human Resources",
                role: "Admin",
                status: "active",
              }}
            />
          </div>
        </>
      )}

      {activeTab == "management" && (
        <>
          {/* Department Quick Summary Grid */}
          <div className="mt-8">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 mt-2">
              <div className="card">
                <h1 className="text-sm font-bold">Engineering</h1>
                <p className="text-2xl font-bold">24 staff</p>
                <p className="text-[12px] text-slate-500 my-1">
                  Head: Alex Vance
                </p>
                <button className="bg-slate-200 text-blue-950 text-xs py-1 px-4 rounded-lg mt-2 max-w-fit">
                  Manage Dept
                </button>
              </div>

              <div className="card">
                <h1 className="text-sm font-bold">Human Resources</h1>
                <p className="text-2xl font-bold">8 staff</p>
                <p className="text-[12px] text-slate-500 my-1">
                  Head: Sarah Connor
                </p>
                <button className="bg-slate-200 text-blue-950 text-xs py-1 px-4 rounded-lg mt-2 max-w-fit">
                  Manage Dept
                </button>
              </div>
              <div className="card">
                <h1 className="text-sm font-bold">Engineering</h1>
                <p className="text-2xl font-bold">24 staff</p>
                <p className="text-[12px] text-slate-500 my-1">
                  Head: Alex Vance
                </p>
                <button className="bg-slate-200 text-blue-950 text-xs py-1 px-4 rounded-lg mt-2 max-w-fit">
                  Manage Dept
                </button>
              </div>

              <div className="card">
                <h1 className="text-sm font-bold">Human Resources</h1>
                <p className="text-2xl font-bold">8 staff</p>
                <p className="text-[12px] text-slate-500 my-1">
                  Head: Sarah Connor
                </p>
                <button className="bg-slate-200 text-blue-950 text-xs py-1 px-4 rounded-lg mt-2 max-w-fit">
                  Manage Dept
                </button>
              </div>
              <div className="card">
                <h1 className="text-sm font-bold">Engineering</h1>
                <p className="text-2xl font-bold">24 staff</p>
                <p className="text-[12px] text-slate-500 my-1">
                  Head: Alex Vance
                </p>
                <button className="bg-slate-200 text-blue-950 text-xs py-1 px-4 rounded-lg mt-2 max-w-fit">
                  Manage Dept
                </button>
              </div>

              <div className="card">
                <h1 className="text-sm font-bold">Human Resources</h1>
                <p className="text-2xl font-bold">8 staff</p>
                <p className="text-[12px] text-slate-500 my-1">
                  Head: Sarah Connor
                </p>
                <button className="bg-slate-200 text-blue-950 text-xs py-1 px-4 rounded-lg mt-2 max-w-fit">
                  Manage Dept
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {activeTab == "logs" && (
        <div className="mt-8">
          <AuditLogs />
        </div>
      )}
    </div>
  );
}
