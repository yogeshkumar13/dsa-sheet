import { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export default function TopicAccordion({ topic }) {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState({});

  const token = localStorage.getItem("token");

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
          if (p.topic === topic.topic && p.completed === true) {
            progressMap[String(p.problemId)] = true;
          }
        });

        // ✅ MERGE, not overwrite
        setChecked((prev) => ({
          ...prev,
          ...progressMap,
        }));
      } catch (err) {
        console.log("Progress load failed", err.response?.data || err.message);
      }
    };

    if (token) fetchProgress();
  }, [token, topic.topic]);

  // 🔹 SAVE progress (POST)
  const handleCheck = async (problemId, value) => {
    // ✅ instant UI update
    setChecked((prev) => ({
      ...prev,
      [problemId]: value,
    }));

    try {
      await axios.post(
        `${API}/api/progress`,
        {
          topic: topic.topic,
          problemId: String(problemId),
          problemName: topic.problems.find((p) => p.id === problemId).name,
          completed: value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.log("Progress save failed", err.response?.data || err.message);
    }
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={() => setOpen(!open)}>
        <span>{topic.topic}</span>
        <span>
          {topic.problems.filter((p) => checked[p.id]).length}/
          {topic.problems.length} Done
        </span>
      </div>

      {open && (
        <table>
          <tbody>
            {topic.problems.map((p) => (
              <tr key={p.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={checked[p.id] || false}
                    onChange={(e) =>
                      handleCheck(p.id, e.target.checked)
                    }
                  />
                </td>
                <td>{p.name}</td>
                <td>{checked[p.id] ? "Done" : "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
