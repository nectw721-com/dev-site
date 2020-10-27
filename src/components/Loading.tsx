import React from 'react';

import styles from './Loading.module.scss';

const Loading: React.FC = () => (
  <div
    className={styles.image}
  >
    <div
      className={styles['dot-container']}
    >
      <div
        className={styles.dot}
      >
      </div>
      <div
        className={styles.dot}
      >
      </div>
      <div
        className={styles.dot}
      >
      </div>
    </div>
    <div
      className={styles['dot-container']}
    >
      <div
        className={styles.dot}
      >
      </div>
      <div
        className={styles.dot}
      >
      </div>
      <div
        className={styles.dot}
      >
      </div>
    </div>
    <div
      className={styles['dot-container']}
    >
      <div
        className={styles.dot}
      >
      </div>
      <div
        className={styles.dot}
      >
      </div>
      <div
        className={styles.dot}
      >
      </div>
    </div>
  </div>
);

export default Loading;