import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Popup } from 'semantic-ui-react';
import Swal from 'sweetalert2';

// Define the timeConverter function
const timeConverter = milliseconds => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
  return { minutes, seconds: seconds < 10 ? '0' + seconds : seconds };
};

const Countdown = ({ timeOver, setTimeTaken }) => {
  const totalTime = 180000; // 3 minutes in milliseconds
  const [timerTime, setTimerTime] = useState(totalTime);
  const { minutes: displayMinutes, seconds: displaySeconds } = timeConverter(timerTime);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTime = timerTime - 1000;

      if (newTime >= 0) {
        setTimerTime(newTime);
      } else {
        clearInterval(timer);

        Swal.fire({
          icon: 'info',
          title: `Oops! Time's up.`,
          text: 'See how you did!',
          confirmButtonText: 'Check Results',
          timer: 5000,
          willClose: () => timeOver(totalTime - timerTime),
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
      setTimeTaken(totalTime - timerTime + 1000);
    };

    // eslint-disable-next-line
  }, [timerTime]);

  return (
    <Button.Group size="massive" floated="right">
      <Popup
        content="Minutes"
        trigger={<Button active style={{ backgroundColor: '#3498db', color: '#fff' }}>{displayMinutes}</Button>}
        position="bottom left"
      />
      <Popup
        content="Seconds"
        trigger={<Button active style={{ backgroundColor: '#e74c3c', color: '#fff' }}>{displaySeconds}</Button>}
        position="bottom left"
      />
    </Button.Group>
  );
};

Countdown.propTypes = {
  timeOver: PropTypes.func.isRequired,
  setTimeTaken: PropTypes.func.isRequired,
};

export default Countdown;
