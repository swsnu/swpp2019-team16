import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Checkbox from '../../common/Checkbox';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    marginBottom: '25px',
  },
  content: {

  }
});

FromSection.propTypes = {
  fromList: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedFrom: PropTypes.string,
  onClickFrom: PropTypes.func.isRequired,
};

function FromSection({ fromList, selectedFrom, onClickFrom }) {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <Typography variant={"h2"}>
          Where are you going to
        </Typography>
        <Typography variant={"h2"}>
          take taxi?
        </Typography>
      </div>
      <div className={styles.content}>
        {
          fromList &&
          fromList.map(from => (
            <Checkbox
              key={from}
              name={'from'}
              value={from}
              onClick={
                () => selectedFrom === from
                  ? onClickFrom(null)
                  : onClickFrom(from)
              }
              checked={selectedFrom === from}
            />
          ))
        }
      </div>
    </div>
  );
}

export default FromSection;