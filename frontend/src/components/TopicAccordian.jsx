import { useEffect, useState } from "react";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;

export default function TopicAccordion({ topic }) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState({});

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // 🔹 LOAD saved progress (GET)
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await axios.get(`${API}/api/progress`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const progressMap = {};
        res.data.forEach((p) => {
          if (p.topic === topic.topic) {
            progressMap[p.problemId] = p.completed;
          }
        });
        setChecked(progressMap);
      } catch (err) {
        console.log("Progress load failed", err.response?.data || err.message);
      }
    };

    fetchProgress();
  }, [token, topic.topic]);

  // 🔹 SAVE progress (POST)
  const handleCheck = async (problemId, value) => {
    setChecked((prev) => ({ ...prev, [problemId]: value }));

    try {
      await axios.post(
        `${API}/api/progress`,
        {
          topic: topic.topic,
          problemId,
          problemName: topic.problems.find((p) => p.id === problemId).name,
          completed: value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (err) {
      console.log("Progress save failed", err.response?.data || err.message);
    }
    console.log(problemId);
  };

  const doneCount = Object.values(checked).filter(Boolean).length;

  return (
    <div
      className="accordion"
      style={{
        marginBottom: "20px",
        borderRadius: "10px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
      }}
    >
      <div
        className="accordion-header"
        onClick={() => setOpen(!open)}
        style={{
          cursor: "pointer",
          padding: "10px 20px",
          background: "#bba1df",
          color: "black",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: "10px 10px 0 0",
        }}
      >
        <span>{topic.topic}</span>
        <span>
          {topic.problems.filter((p) => checked[p.id]).length}/
          {topic.problems.length} Done
        </span>
      </div>

      {open && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ background: "#f0f4f8" }}>
            <tr>
              <th></th>
              <th>Name</th>
              <th>LeetCode</th>
              <th>YouTube</th>
              <th>Article</th>
              <th>Level</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {topic.problems.map((p) => (
              <tr
                key={p.id}
                style={{ textAlign: "center", borderBottom: "1px solid #ddd" }}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={checked[p.id] || false}
                    onChange={(e) => handleCheck(p.id, e.target.checked)}
                  />
                </td>
                <td>{p.name}</td>
                <td>
                  <a href={p.leetcode} target="_blank" rel="noreferrer">
                    Practise
                  </a>
                </td>
                <td>
                  <a href={p.youtube} target="_blank" rel="noreferrer">
                    Watch
                  </a>
                </td>
                <td>
                  <a href={p.article} target="_blank" rel="noreferrer">
                    Read
                  </a>
                </td>
                <td
                  style={{
                    color:
                      p.level === "Easy"
                        ? "green"
                        : p.level === "Medium"
                          ? "orange"
                          : "red",
                  }}
                >
                  {p.level}
                </td>
                <td>{checked[p.id] ? "Done" : "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
