import TopicAccordion from "../components/TopicAccordian";
import { csData } from "../data/dsaData";


export default function Topics() {
    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", background: "#f5f7fa", minHeight: "100vh" }}>
            <h1 style={{ textAlign: "center", color: "#1677ff", marginBottom: "30px" }}>CS / DSA Dashboard</h1>

            {csData.map((topic) => (
                <TopicAccordion key={topic.topic} topic={topic} />
            ))}
        </div>
    );
}
