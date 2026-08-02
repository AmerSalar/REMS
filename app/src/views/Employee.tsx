import { useState } from "react";
import { Link } from "react-router-dom";

interface RowProps {
  data: Record<string, string>;
}

const DataRow = ({ data }: RowProps) => {
  return (
    <div className="grid grid-cols-5 gap-12 border-b border-orange-200 py-2">
      <p className="text-sm">{data.date}</p>
      <p className="text-sm">{data.clockin}</p>
      <p className="text-sm">{data.clockout}</p>
      <p className="text-sm">{data.hours}</p>
      <div className="bg-green-200 rounded-2xl px-2 max-w-fit -ml-2 max-h-6 min-w-16">
        <p className="text-sm">{data.status}</p>
      </div>
    </div>
  );
};

const ApplyForLeave = () => {
  return (
    <div className="card max-w-2xl mt-4">
      {/* Title & Description */}
      <h2 className="text-xl font-bold">Apply for leave</h2>
      <p className="text-sm text-slate-500 mb-6">
        Submit a request for your manager to review.
      </p>

      <form className="flex flex-col gap-4">
        {/* Leave Type Dropdown */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold">Leave type</label>
          <select className="border border-orange-200 rounded-xl px-4 py-2.5 text-sm bg-white outline-none w-full">
            <option value="annual">Annual</option>
            <option value="sick">Sick</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>

        {/* Start Date & End Date Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">Start date</label>
            <input
              type="date"
              className="border border-orange-200 rounded-xl px-4 py-2 text-sm bg-white outline-none w-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-bold">End date</label>
            <input
              type="date"
              className="border border-orange-200 rounded-xl px-4 py-2 text-sm bg-white outline-none w-full"
            />
          </div>
        </div>

        {/* Reason Textarea */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-bold">Reason</label>
          <textarea
            rows={4}
            placeholder="Briefly describe the reason for your leave"
            className="border border-orange-200 rounded-xl p-4 text-sm bg-white outline-none w-full resize-y"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="mt-2">
          <button
            type="submit"
            className="bg-blue-950 text-white text-sm font-bold px-6 py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Submit request
          </button>
        </div>
      </form>
    </div>
  );
};

export default function EmployeeView() {
  const [activeTab, setActiveTab] = useState("attendance");
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
              <Link to={"/admin"}>adm</Link>
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2">
        <div className="card h-35">
          <h1 className="text-2xl font-bold">Welcome back Ameer</h1>
          <p className="text-sm">Software engineer - engineering department</p>
        </div>
        <div className="card h-35">
          <p className="text-[10px]">Time elapsed today</p>
          <h1 className="text-2xl">6h 30m</h1>
          <div className="flex flex-row gap-4">
            <button className="bg-blue-950 rounded-lg px-8 text-white">
              Clock-in
            </button>
            <button className="bg-slate-200 rounded-lg px-8 text-blue-950">
              Clock-out
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 mt-2">
        <div className="card">
          <h1 className="text-sm">HOURS WORKED THIS MONTH</h1>
          <p className="text-2xl font-bold">128 hours</p>
          <p className="text-sm">Target: 148 hours</p>
        </div>
        <div className="card">
          <h1 className="text-sm">REMAINING ANNUAL LEAVE</h1>
          <p className="text-2xl font-bold">10 days</p>
          <p className="text-sm">of 12 days/year</p>
        </div>
        <div className="card">
          <h1 className="text-sm">REMAINING SICK LEAVE</h1>
          <p className="text-2xl font-bold">6 days</p>
          <p className="text-sm">of 8 days/year</p>
        </div>
        <div className="card">
          <h1 className="text-sm">PENDING LEAVE REQUESTS</h1>
          <p className="text-2xl font-bold">1 request</p>
          <p className="text-sm">Awaiting manager approval</p>
        </div>
      </div>

      <div className="flex flex-row gap-8 mt-8 border-b border-orange-200">
        <button
          className={`text-sm pb-2 ${activeTab == "attendance" ? "border-b" : ""}`}
          onClick={() => setActiveTab("attendance")}
        >
          My attendance history
        </button>
        <button
          className={`text-sm pb-2 ${activeTab == "leave" ? "border-b" : ""}`}
          onClick={() => setActiveTab("leave")}
        >
          Apply for leave
        </button>
      </div>

      {activeTab === "attendance" && (
        <>
          <div className="grid grid-rows-1 grid-cols-5 gap-10  border-b border-orange-200 py-2">
            <h4 className="text-sm">Date</h4>
            <h4 className="text-sm">Clock-in</h4>
            <h4 className="text-sm">Clock-out</h4>
            <h4 className="text-sm">Total hours</h4>
            <h4 className="text-sm">Status</h4>
          </div>
          <div className="flex flex-col">
            <DataRow
              data={{
                date: "2022",
                clockin: "09:00 AM",
                clockout: "05:00 PM",
                hours: "8",
                status: "present",
              }}
            />
            <DataRow
              data={{
                date: "2022",
                clockin: "09:00 AM",
                clockout: "05:00 PM",
                hours: "8",
                status: "present",
              }}
            />
            <DataRow
              data={{
                date: "2022",
                clockin: "09:00 AM",
                clockout: "05:00 PM",
                hours: "8",
                status: "present",
              }}
            />
          </div>
        </>
      )}
      {activeTab === "leave" && (
        <>
          <ApplyForLeave />
        </>
      )}
    </div>
  );
}
