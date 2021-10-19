import { useState } from 'react';
import './App.css';
import styles from './components/Feedback/Feedback.module.css';
import FeedbackOptions from './components/FeedbackOptions/FeedbackOptions';
import Section from './components/Section/Section';
import Statics from './components/Statistics/Statistics';
import Notification from './components/Notification/Notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = e => {
    const name = e.target.name;
    switch (name) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;
      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;
      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;
      default:
        return;
    }
  };
  const handlerTotal = () => {
    return good + neutral + bad;
  };
  const positiveFeedback = () => {
    const total = handlerTotal();
    return Math.round((good * 100) / total);
  };

  return (
    <div className={styles.wrapper}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>

      {positiveFeedback() ? (
        <Section title="Statistics">
          <Statics
            good={good}
            neutral={neutral}
            bad={bad}
            total={handlerTotal()}
            positiveFeedback={positiveFeedback()}
          />
        </Section>
      ) : (
        <Notification message="No feedback given" />
      )}
    </div>
  );
}
