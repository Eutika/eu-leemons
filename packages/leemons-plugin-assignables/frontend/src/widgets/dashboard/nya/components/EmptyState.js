import EmptyStatePicture from '@assignables/assets/EmptyState.png';
import { Box, createStyles, ImageLoader, Text } from '@bubbles-ui/components';
import { useLayout } from '@layout/context';
import PropTypes from 'prop-types';
import React from 'react';

const useEmptyStateStyles = createStyles((theme) => ({
  root: {
    width: '100%',
    height: 328,
    borderRadius: theme.spacing[1],
    backgroundColor: theme.colors.uiBackground02,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.spacing[1],
  },
}));

function EmptyState({ label }) {
  const {
    theme: { usePicturesEmptyStates },
  } = useLayout();
  const { classes } = useEmptyStateStyles();

  return (
    <Box className={classes.root}>
      {usePicturesEmptyStates && (
        <ImageLoader src={window.getUrl(EmptyStatePicture)} width={142} height={149} />
      )}
      <Text color="primary">{label}</Text>
    </Box>
  );
}

EmptyState.propTypes = {
  label: PropTypes.string,
};

export default EmptyState;
