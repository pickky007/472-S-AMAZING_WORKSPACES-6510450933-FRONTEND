// src/components/activity/ActivityCard.tsx
import React from "react";
import styles from "./ActivityCard.module.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";

type ActivityCardProps = {
  color: string;
  title: string;
  description: string;
  status: string;
  assignee: string;
  date: string;
  onClick?: () => void; // เพิ่ม prop สำหรับคลิก
};

export function ActivityCard({
  color,
  title,
  description,
  status,
  assignee,
  date,
  onClick, // รับฟังก์ชันคลิก
}: ActivityCardProps) {
  return (
    <div className={styles.activityCard} onClick={onClick}>
      <div
        className={styles.sideBar}
        style={{ backgroundColor: color }}
      ></div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.statusInfo}>
          <span className={styles.statusItem}>{status}</span>
          <span className={styles.statusItem}>
            Assign to <span className={styles.assignee}>{assignee}</span>
          </span>
          <span className={styles.statusItem}>{date}</span>
        </div>
      </div>
      <button
        className={styles.moreButton}
        onClick={(e) => {
          e.stopPropagation(); // หยุดการแพร่กระจายของเหตุการณ์
          console.log("test"); // แสดงข้อความในคอนโซล
        }}
        aria-label="more options"
      >
        <MoreVertIcon className={styles.icon} />
      </button>
    </div>
  );
}
