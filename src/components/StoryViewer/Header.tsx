import styles from './Header.module.css';

interface HeaderProps {
  username: string;
  profilePicture: string;
  onClose: () => void;
}

export const Header = ({ username, profilePicture, onClose }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles.userInfo}>
        <img
          src={profilePicture}
          alt={`${username}'s profile`}
          className={styles.profilePicture}
        />
        <span className={styles.username}>{username}</span>
      </div>
      <button
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close stories"
      >
        ×
      </button>
    </header>
  );
};
