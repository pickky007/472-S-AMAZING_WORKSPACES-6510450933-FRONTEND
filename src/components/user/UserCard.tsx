import { User } from '../../models/User';
import { Button } from '../common/Button';
import styles from './UserCard.module.css'; // นำเข้า CSS Module

interface UserCardProps {
  user: User;
  onEdit?: () => void; // Optional edit function
  onDelete?: () => void; // Optional delete function
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <div className={styles.card}> {/* ใช้ className จาก CSS Module */}
      <div className={styles.card__header}>
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.fullName}
            className={styles.card__avatar} // ใช้ className จาก CSS Module
          />
        ) : (
          <div className={styles.card__initials}> {/* ใช้ className จาก CSS Module */}
            {user.initials}
          </div>
        )}
        <div>
          <h3 className={styles.card__name}>{user.fullName}</h3> {/* ใช้ className จาก CSS Module */}
          <p className={styles.card__email}>{user.email}</p> {/* ใช้ className จาก CSS Module */}
        </div>
      </div>
      <div className={styles.card__actions}> {/* ใช้ className จาก CSS Module */}
        {onEdit && (
          <Button label="Edit Profile" onClick={onEdit} />
        )}
        {onDelete && (
          <Button variant="secondary" label="Delete User" onClick={onDelete} />
        )}
      </div>
    </div>
  );
}
