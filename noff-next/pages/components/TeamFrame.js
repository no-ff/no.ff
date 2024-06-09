import '@/styles/TeamFrame.css'

const TeamFrame = () => {
    return (
        <div className={styles.frame}>
          <div className={styles.header}>Champ Select Frame</div>
          <div className={styles.circleContainer}>
            <div className={styles.circle}></div>
            <div className={styles.leftRows}>
              <div className={styles.row}></div>
              <div className={styles.row}></div>
              <div className={styles.row}></div>
              <div className={styles.row}></div>
              <div className={styles.row}></div>
            </div>
            <div className={styles.rightRows}>
              <div className={styles.row}></div>
              <div className={styles.row}></div>
              <div className={styles.row}></div>
              <div className={styles.row}></div>
              <div className={styles.row}></div>
            </div>
          </div>
        </div>
    );
};


export default TeamFrame;