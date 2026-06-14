import { useEffect, useState } from "react";
import {
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid,
} from "recharts";
import { apiGet } from "../lib/api.js";
import DashboardChrome from "../components/DashboardChrome.jsx";

const PIE_COLORS = ["#1768ad", "#83d9a1", "#f59e0b", "#e62626", "#8b5cf6", "#0ea5e9"];

export default function Analytics() {
  const [data, setData] = useState(null);
  useEffect(() => { apiGet("/analytics/progress").then(setData); }, []);

  return (
    <DashboardChrome activeTab="timeline">
      <section className="analytics-panel">
        <h2>إحصائيات إنجاز الطالب</h2>
        {!data ? (
          <p className="panel-loading">جارٍ التحميل...</p>
        ) : (
          <>
            <div className="analytics-grid-inner">
              <div className="mini-stat">
                <strong>{data.summary.completionRate}%</strong>
                <p>نسبة إنجاز المهام</p>
                <div className="progress-track"><div className="progress-fill" style={{ width: `${data.summary.completionRate}%` }} /></div>
              </div>
              <div className="mini-stat">
                <strong>{data.summary.pending}</strong>
                <p>مهام قيد المتابعة</p>
                <div className="progress-track"><div className="progress-fill" style={{ width: `${data.summary.total ? (data.summary.pending / data.summary.total) * 100 : 0}%` }} /></div>
              </div>
            </div>

            <div className="analytics-grid-inner" style={{ marginTop: 24 }}>
              <div>
                <h3 className="panel-title" style={{ fontSize: 16 }}>حالة المهام</h3>
                <div className="chart-box">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { name: "مكتملة", value: data.summary.completed },
                      { name: "قيد المتابعة", value: data.summary.pending },
                      { name: "متأخرة", value: data.summary.overdue },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#1768ad" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h3 className="panel-title" style={{ fontSize: 16 }}>توزيع المهام حسب المادة</h3>
                <div className="chart-box">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={data.byCourse} dataKey="count" nameKey="course" cx="50%" cy="50%" outerRadius={90} label={(e) => e.course}>
                        {data.byCourse.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 24 }}>
              <h3 className="panel-title" style={{ fontSize: 16 }}>اتجاه الإنتاجية (آخر 7 أيام)</h3>
              <div className="chart-box">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data.weeklyTrend}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="created" name="منشأة" stroke="#1768ad" strokeWidth={2} />
                    <Line type="monotone" dataKey="completed" name="مكتملة" stroke="#83d9a1" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
      </section>
    </DashboardChrome>
  );
}
