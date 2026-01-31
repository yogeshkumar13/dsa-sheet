import { useEffect, useState } from "react";
import axios from "axios";

export default function Reports({ userId }) {

    const [data, setData] = useState({
        solved: { easy: 0, medium: 0, hard: 0 },
        total: { easy: 0, medium: 0, hard: 0 },
        percent: { easy: 0, medium: 0, hard: 0 }
    });

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/report/" + userId)
            .then(res => setData(res.data))
            .catch(err => console.error(err));
    }, [userId]);

    return (
        <div className="page">
            <h2>Report</h2>

            <p>
                Easy: {data.solved.easy}/{data.total.easy}
                ({data.percent.easy}%)
            </p>

            <p>
                Medium: {data.solved.medium}/{data.total.medium}
                ({data.percent.medium}%)
            </p>

            <p>
                Hard: {data.solved.hard}/{data.total.hard}
                ({data.percent.hard}%)
            </p>

            <footer>© 2024 Dashboard. All Rights Reserved.</footer>
        </div>
    );
}
