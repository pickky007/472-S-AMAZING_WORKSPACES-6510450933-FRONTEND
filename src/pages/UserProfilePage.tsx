import React from 'react';
import { useUser } from '../hooks/useUser';
import { UserCard } from '../components/user/UserCard';
import styles from './UserProfilePage.module.css'; // นำเข้า CSS Module



export function UserProfilePage() {
  const { user, loading, error , deleteUser } = useUser(1);
  
  

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.loadingSpinner}></div> {/* เปลี่ยนเป็น loadingSpinner */}
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        Error: {error.message}
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.error} style={{ backgroundColor: '#fefcbf', borderColor: '#facc15', color: '#92400e' }}>
        User not found
      </div>
    );
  }

  function handleEdit() {
    console.log('Edit user:', user);
  };

  async function handleDelete(){
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser();
      } catch (err) {
        console.error('Failed to delete user:', err);
      }
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>User Profile</h1>

      <UserCard 
        user={user} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
