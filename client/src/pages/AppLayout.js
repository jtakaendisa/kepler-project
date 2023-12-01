import { Frame, withSounds, withStyles } from 'arwes';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import useLaunches from '../hooks/useLaunches';
import usePlanets from '../hooks/usePlanets';

import Centered from '../components/Centered';
import Footer from '../components/Footer';
import Header from '../components/Header';

import History from './History';
import Launch from './Launch';
import Upcoming from './Upcoming';

const styles = () => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    margin: 'auto',
  },
  centered: {
    flex: 1,
    paddingTop: '20px',
    paddingBottom: '10px',
  },
});

const AppLayout = (props) => {
  const { sounds, classes } = props;

  const [frameVisible, setFrameVisible] = useState(true);
  const animateFrame = () => {
    setFrameVisible(false);
    setTimeout(() => {
      setFrameVisible(true);
    }, 600);
  };

  const onSuccessSound = () => sounds.success && sounds.success.play();
  const onAbortSound = () => sounds.abort && sounds.abort.play();
  const onFailureSound = () => sounds.warning && sounds.warning.play();

  const { launches, isPendingLaunch, submitLaunch, abortLaunch } = useLaunches(
    onSuccessSound,
    onAbortSound,
    onFailureSound
  );

  const planets = usePlanets();

  return (
    <div className={classes.content}>
      <Header onNav={animateFrame} />
      <Centered className={classes.centered}>
        <Frame
          animate
          show={frameVisible}
          corners={4}
          style={{ visibility: frameVisible ? 'visible' : 'hidden' }}
        >
          {(anim) => (
            <div style={{ padding: '20px' }}>
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <Launch
                      entered={anim.entered}
                      planets={planets}
                      submitLaunch={submitLaunch}
                      isPendingLaunch={isPendingLaunch}
                    />
                  }
                />

                <Route
                  exact
                  path="/launch"
                  element={
                    <Launch
                      entered={anim.entered}
                      planets={planets}
                      submitLaunch={submitLaunch}
                      isPendingLaunch={isPendingLaunch}
                    />
                  }
                />

                <Route
                  exact
                  path="/upcoming"
                  element={
                    <Upcoming
                      entered={anim.entered}
                      launches={launches}
                      abortLaunch={abortLaunch}
                    />
                  }
                />

                <Route
                  exact
                  path="/history"
                  element={<History entered={anim.entered} launches={launches} />}
                />
              </Routes>
            </div>
          )}
        </Frame>
      </Centered>
      <Footer />
    </div>
  );
};

export default withSounds()(withStyles(styles)(AppLayout));
