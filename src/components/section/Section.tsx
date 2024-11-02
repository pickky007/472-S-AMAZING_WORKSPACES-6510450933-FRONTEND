import { ActivityCard } from "../activity/ActivityCard";
import styles from "./Section.module.css";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";

interface ActivityProps {
  id?: string;
  title?: string;
  description?: string;
  status?: string;
  assignTo?: string;
  date?: {
    start: string;
    end: string;
  };
  variant?: "red" | "teal";
}

const activities = [
  {
    color: "#CC2E2E", // Red
    title: "Activity",
    description: "Description",
    status: "🔴 Status",
    assignee: "@P.Num",
    date: "Date Jan 1, 20:00 - Jan 1, 21:00",
  },
  {
    color: "#3A8C84", // Teal
    title: "Activity",
    description: "Description",
    status: "🔵 Status",
    assignee: "@P.Num",
    date: "Date Jan 1, 20:00 - Jan 1, 21:00",
  },
  {
    color: "#3A8C84", // Teal
    title: "Activity",
    description: "Description",
    status: "🔵 Status",
    assignee: "@P.Num",
    date: "Date Jan 1, 20:00 - Jan 1, 21:00",
  },
];

export function Section() {
  return (
    <div className={styles.section}>
      <div className={styles.header}>
        <div className={styles.buttonMore}>
          <IconButton aria-label="more options" color="primary" size="large">
            <AddIcon className={styles.icon}></AddIcon>
          </IconButton>
          <IconButton aria-label="more options" color="primary" size="large">
            <MoreVertIcon className={styles.icon}></MoreVertIcon>
          </IconButton>
        </div>
        <div className={styles.title}>A1</div>
      </div>
      <div className={styles.content}>
        <div>
          {activities.map((activity, index) => (
            <ActivityCard
              key={index}
              {...activity}
              onClick={() => {
                console.log("hello");
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
