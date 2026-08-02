import React, { useState } from "react";
import { Link } from "react-router-dom";

interface RowProps {
  data: Record<string, string>;
}

// Data row component matching your pattern for the team roster
const TeamRow = ({ data }: RowProps) => {
  return (
    <div className="grid grid-cols-5 gap-12 border-b border-orange-200 py-2">
      <p className="text-sm">{data.name}</p>
      <p className="text-sm">{data.role}</p>
      <p className="text-sm">{data.attendance}</p>
      <div className="bg-green-200 rounded-2xl px-2 max-w-fit -ml-2 max-h-6 min-w-16">
        <p className="text-sm">{data.status}</p>
      </div>
      <p className="text-sm">{data.clockin}</p>
    </div>
  );
};

export default function ManagerView() {
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
              <Link to={"/admin"}>adm</Link>
            </button>
            <button className="bg-white px-8 rounded-2xl hover:bg-slate-100">
              <Link to={"/"}>emp</Link>
            </button>
          </div>
        )}
      </div>
      {/* Top Header Grid */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2">
        <div className="card h-35">
          <h1 className="text-2xl font-bold">Team Overview</h1>
          <p className="text-sm">Engineering Department Hub</p>
        </div>
        <div className="card h-35">
          <p className="text-[10px]">Team Attendance Today</p>
          <h1 className="text-2xl">8 / 10 Present</h1>
          <div className="flex flex-row gap-4">
            <button className="bg-blue-950 rounded-lg px-8 text-white">
              Export Roster
            </button>
          </div>
        </div>
      </div>

      {/* Manager Stat Cards Grid */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 mt-2">
        <div className="card">
          <h1 className="text-sm">DIRECT REPORTS</h1>
          <p className="text-2xl font-bold">10 employees</p>
          <p className="text-sm">Engineering Dept</p>
        </div>
        <div className="card">
          <h1 className="text-sm">PENDING APPROVALS</h1>
          <p className="text-2xl font-bold">2 requests</p>
          <p className="text-sm">Requires action</p>
        </div>
        <div className="card">
          <h1 className="text-sm">ON LEAVE TODAY</h1>
          <p className="text-2xl font-bold">1 employee</p>
          <p className="text-sm">Annual Leave</p>
        </div>
        <div className="card">
          <h1 className="text-sm">CLOCKED IN LATE</h1>
          <p className="text-2xl font-bold">1 employee</p>
          <p className="text-sm">Today</p>
        </div>
      </div>

      {/* Pending Leave Requests Approval Section */}
      <div className="mt-8">
        <h3 className="text-sm font-bold border-b border-orange-200 pb-2">
          Pending Leave Requests
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 mt-2">
          <div className="card">
            <h1 className="text-sm font-bold">Sarah Jenkins</h1>
            <p className="text-sm">Frontend Dev · 3 Days (Annual Leave)</p>
            <p className="text-[12px] text-slate-500 my-1">
              Reason: Family trip
            </p>
            <div className="flex flex-row gap-2 mt-2">
              <button className="bg-blue-950 text-white text-xs py-1 px-4 rounded-lg">
                Approve
              </button>
              <button className="bg-slate-200 text-blue-950 text-xs py-1 px-4 rounded-lg">
                Reject
              </button>
            </div>
          </div>

          <div className="card">
            <h1 className="text-sm font-bold">John Doe</h1>
            <p className="text-sm">Backend Dev · 1 Day (Sick Leave)</p>
            <p className="text-[12px] text-slate-500 my-1">
              Reason: Medical appointment
            </p>
            <div className="flex flex-row gap-2 mt-2">
              <button className="bg-blue-950 text-white text-xs py-1 px-4 rounded-lg">
                Approve
              </button>
              <button className="bg-slate-200 text-blue-950 text-xs py-1 px-4 rounded-lg">
                Reject
              </button>
            </div>
          </div>

          <div className="card">
            <h1 className="text-sm font-bold">John Doe</h1>
            <p className="text-sm">Backend Dev · 1 Day (Sick Leave)</p>
            <p className="text-[12px] text-slate-500 my-1">
              Reason: Medical appointment
            </p>
            <div className="flex flex-row gap-2 mt-2">
              <button className="bg-blue-950 text-white text-xs py-1 px-4 rounded-lg">
                Approve
              </button>
              <button className="bg-slate-200 text-blue-950 text-xs py-1 px-4 rounded-lg">
                Reject
              </button>
            </div>
          </div>
          <div className="card">
            <h1 className="text-sm font-bold">John Doe</h1>
            <p className="text-sm">Backend Dev · 1 Day (Sick Leave)</p>
            <p className="text-[12px] text-slate-500 my-1">
              Reason: Medical appointment
            </p>
            <div className="flex flex-row gap-2 mt-2">
              <button className="bg-blue-950 text-white text-xs py-1 px-4 rounded-lg">
                Approve
              </button>
              <button className="bg-slate-200 text-blue-950 text-xs py-1 px-4 rounded-lg">
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-row gap-8 mt-8 mb-2 border-b border-orange-200">
        <h4 className="text-sm font-bold pb-2">Team Roster</h4>
      </div>

      {/* Table Header */}
      <div className="grid grid-rows-1 grid-cols-5 gap-10 border-b border-orange-200 py-2">
        <h4 className="text-sm">Employee Name</h4>
        <h4 className="text-sm">Role</h4>
        <h4 className="text-sm font-normal">Monthly Attendance</h4>
        <h4 className="text-sm">Status Today</h4>
        <h4 className="text-sm">Clock-in Time</h4>
      </div>

      {/* Table Body */}
      <div className="flex flex-col">
        <TeamRow
          data={{
            name: "Sarah Jenkins",
            role: "Frontend Dev",
            attendance: "96%",
            status: "present",
            clockin: "08:58 AM",
          }}
        />
        <TeamRow
          data={{
            name: "John Doe",
            role: "Backend Dev",
            attendance: "92%",
            status: "present",
            clockin: "09:05 AM",
          }}
        />
        <TeamRow
          data={{
            name: "Alex Smith",
            role: "QA Engineer",
            attendance: "88%",
            status: "on leave",
            clockin: "--:--",
          }}
        />
        <TeamRow
          data={{
            name: "Alex Smith",
            role: "QA Engineer",
            attendance: "88%",
            status: "on leave",
            clockin: "--:--",
          }}
        />
        <TeamRow
          data={{
            name: "Alex Smith",
            role: "QA Engineer",
            attendance: "88%",
            status: "on leave",
            clockin: "--:--",
          }}
        />
        <TeamRow
          data={{
            name: "Alex Smith",
            role: "QA Engineer",
            attendance: "88%",
            status: "on leave",
            clockin: "--:--",
          }}
        />
      </div>
    </div>
  );
}
