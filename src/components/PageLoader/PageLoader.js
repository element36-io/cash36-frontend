import React, { useState, useEffect, useRef } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import './PageLoader.scss';

const PageLoader = () => {
  const _isMounted = useRef(false);
  const [loaderStatus, setLoaderStatus] = useState({
    active: true,
    visible: true
  });
  const { fetchingContacts, fetchingFilters, fetchingTokens } = useSelector(
    ({ contacts, tokens }) => ({
      fetchingContacts: contacts.fetching,
      fetchingTokens: tokens.fetchingTokens,
      fetchingFilters: tokens.fetchingFilters
    }),
    shallowEqual
  );

  useEffect(() => {
    if (
      _isMounted.current &&
      !fetchingContacts &&
      !fetchingFilters &&
      !fetchingTokens
    ) {
      setLoaderStatus({ ...loaderStatus, visible: false });
      setTimeout(() => {
        setLoaderStatus({ ...loaderStatus, active: false });
      }, 1000);
    }
  }, [fetchingContacts, fetchingFilters, fetchingTokens]);

  useEffect(() => {
    _isMounted.current = true;
  }, []);

  return loaderStatus.active ? (
    <div className={`page-loader ${loaderStatus.visible ? '--active' : ''}`}>
      <CircularProgress color="secondary" size={50} />
    </div>
  ) : null;
};

export default PageLoader;
