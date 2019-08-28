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

  const hideLoader = () => {
    if (
      _isMounted.current &&
      loaderStatus.active &&
      !fetchingContacts &&
      !fetchingFilters &&
      !fetchingTokens
    ) {
      setLoaderStatus({ ...loaderStatus, visible: false });
      setTimeout(() => {
        setLoaderStatus({ ...loaderStatus, active: false });
      }, 1000);
    }
  };

  useEffect(() => {
    hideLoader();
  }, [fetchingContacts, fetchingFilters, fetchingTokens]);

  useEffect(() => {
    _isMounted.current = true;

    setTimeout(() => {
      hideLoader();
    }, 3000);

    return () => (_isMounted.current = false);
  }, []);

  return loaderStatus.active ? (
    <div
      data-testid="page-loader"
      className={`page-loader ${loaderStatus.visible ? '--active' : ''}`}
    >
      <CircularProgress color="secondary" size={50} />
    </div>
  ) : null;
};

export default PageLoader;
