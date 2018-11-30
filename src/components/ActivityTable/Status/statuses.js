import React from 'react';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import CheckIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import BookmarksIcon from '@material-ui/icons/BookmarkBorder';

export default {
  COMPLETED: {
    cssClass: 'activity-table-status__complete',
    Icon: <CheckIcon className='activity-table-status__icon' />,
    text: 'Completed'
  },
  PROCESSING: {
    cssClass: 'activity-table-status__processing',
    Icon: <AccessTimeIcon className='activity-table-status__icon' />,
    text: 'Processing'
  },
  ON_HOLD: {
    cssClass: 'activity-table-status__on-hold',
    Icon: <ErrorIcon className='activity-table-status__icon' />,
    text: 'On Hold'
  },
  OPEN: {
    cssClass: 'activity-table-status__open',
    Icon: <BookmarksIcon className='activity-table-status__icon' />,
    text: 'Open'
  }
};
