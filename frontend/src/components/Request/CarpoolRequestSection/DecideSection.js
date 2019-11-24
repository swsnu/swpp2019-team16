import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Button from '../../common/Button';

const useStyles = makeStyles({
  root: {},
});

DecideSection.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function DecideSection({ onClick }) {
  const styles = useStyles();
  return (
    <div className={styles.root}>
      <Button
        id="request-submit-button"
        variant="contained"
        color="primary"
        onClick={onClick}
        children="Carpool Request"
      />
    </div>
  );
}

export default DecideSection;