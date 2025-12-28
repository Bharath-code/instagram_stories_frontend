import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  totalStories: number;
  currentIndex: number;
  currentProgress: number;
  completedIndices: Set<number>;
}

export const ProgressBar = ({ totalStories, currentIndex, currentProgress, completedIndices }: ProgressBarProps) => {
  return (
    <div className={styles.progressBars}>
      {Array.from({ length: totalStories }).map((_, index) => (
        <div
          key={index}
          className={`${styles.progressSegment} ${
            index === currentIndex ? styles.active : ''
          } ${
            completedIndices.has(index) || index < currentIndex ? styles.completed : ''
          }`}
        >
          <div
            className={styles.progressFill}
            style={{
              width: index === currentIndex ? `${currentProgress}%` : '0%',
            }}
          />
        </div>
      ))}
    </div>
  );
};
