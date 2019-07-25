import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Responsive from '../../../components/Responsive';
import TransferContact from '../TransferContact';
import ArrowBtn from '../ArrowBtn';
import './TransferContacts.scss';

function getItemsPerPage () {
  return window.innerWidth > 767 ? 5 : 3;
}

function getNumOfPages (list) {
  return Math.ceil(list.length / getItemsPerPage());
}

const TransferContacts = ({ contactsList, clickCallback }) => {
  const [listOffset, setListOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
  const [numOfPages, setNumOfPages] = useState(getNumOfPages(contactsList));

  useEffect(() => {
    window.addEventListener('resize', windowResizeCallback);

    return () => {
      window.removeEventListener('resize', windowResizeCallback);
    };
  }, []);

  const windowResizeCallback = () => {
    if (
      (window.innerWidth > 767 && itemsPerPage === 5) ||
      (window.innerWidth < 767 && itemsPerPage === 3)
    ) {
      goToPage(currentPage);
      return;
    }

    setCurrentPage(0);
    setItemsPerPage(getItemsPerPage());
    setNumOfPages(getNumOfPages(contactsList));
    goToPage(0);
  };

  const nextPage = () => {
    if (currentPage === numOfPages - 1) return;
    goToPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage === 0) return;
    goToPage(currentPage - 1);
  };

  const goToPage = page => {
    const pageItems = contactsList.slice(
      page * itemsPerPage,
      page * itemsPerPage + itemsPerPage
    ).length;

    let offset =
      -100 * (itemsPerPage % pageItems || pageItems === 1 ? page - 1 : page);

    if (itemsPerPage % pageItems || pageItems === 1) {
      offset -= (pageItems / itemsPerPage) * 100;
    }

    if (contactsList.length <= itemsPerPage) offset = 0;

    setListOffset(offset);
    setCurrentPage(page);
  };

  return (
    <div className="transfer__contacts-container">
      <h4>Contacts</h4>
      <div className="transfer__contacts__slider">
        <Responsive>
          {contactsList.length > itemsPerPage && (
            <Fragment>
              <ArrowBtn onClick={prevPage} />
              <ArrowBtn alt onClick={nextPage} />
            </Fragment>
          )}
        </Responsive>
        <div className="transfer__contacts__list-wrapper">
          <div
            className={`transfer__contacts-list ${
              contactsList.length < itemsPerPage
                ? 'transfer__contacts-list--center'
                : ''
            }`}
            style={{ transform: `translateX(${listOffset}%)` }}
          >
            {contactsList.map(c => (
              <TransferContact
                contact={c}
                clickCallback={clickCallback}
                alt
                key={c.id}
              />
            ))}
          </div>
        </div>
      </div>
      {contactsList.length > itemsPerPage && (
        <ul className="transfer__contacts-container__pager">
          {[...Array(numOfPages).keys()].map((item, i) => (
            <li
              className={currentPage === i ? 'active' : ''}
              onClick={() => {
                goToPage(i);
              }}
              key={i}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

TransferContacts.propTypes = {
  contactsList: PropTypes.array,
  clickCallback: PropTypes.func
};

export default TransferContacts;
