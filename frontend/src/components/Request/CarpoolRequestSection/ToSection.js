import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Checkbox from '../../common/Checkbox';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {},
});

ToSection.propsTypes = {
  toList: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedTo: PropTypes.string,
  onClickTo: PropTypes.func.isRequired,
};

function ToSection({ toList, selectedTo, onClickTo }) {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <h2>To</h2>
      {toList &&
      toList.map(to => (
        <Checkbox
          key={to}
          name={'to'}
          value={to}
          onClick={
            () => selectedTo === to
              ? onClickTo(null)
              : onClickTo(to)
          }
          checked={selectedTo === to}
        />
      ))}
    </div>
  );
}

export default ToSection;