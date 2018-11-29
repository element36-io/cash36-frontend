import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Responsive from '../../../components/Responsive';
import TransferContact from '../TransferContact';
import ArrowBtn from '../ArrowBtn';
import './TransferContacts.scss';

class TransferContacts extends Component {
  constructor (props) {
    super(props);

    this.state = {
      listOffset: 0,
      currentPage: 0,
      itemsPerPage: this.getItemsPerPage(),
      numOfPages: this.getNumOfPages()
    };
  }

  componentDidMount () {
    window.addEventListener('resize', this.windowResizeCallback);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.windowResizeCallback);
  }

  windowResizeCallback = () => {
    const { itemsPerPage, currentPage } = this.state;
    if ((window.innerWidth > 767 && itemsPerPage === 5) || (window.innerWidth < 767 && itemsPerPage === 3)) {
      this.goToPage(currentPage);
      return;
    }
    this.setState({
      currentPage: 0,
      itemsPerPage: this.getItemsPerPage(),
      numOfPages: this.getNumOfPages()
    }, () => {
      this.goToPage(0);
    });
  };

  getItemsPerPage = () => {
    return window.innerWidth > 767 ? 5 : 3;
  };

  getNumOfPages = () => {
    return Math.ceil(this.props.contactsList.length / this.getItemsPerPage());
  };

  nextPage = () => {
    let { numOfPages, currentPage } = this.state;
    if (currentPage === numOfPages - 1) return;
    currentPage++;
    this.goToPage(currentPage);
  };

  prevPage = () => {
    let { currentPage } = this.state;
    if (currentPage === 0) return;
    currentPage--;
    this.goToPage(currentPage);
  };

  goToPage = currentPage => {
    let { itemsPerPage } = this.state;
    const { contactsList } = this.props;

    const pageItems = contactsList.slice(currentPage * itemsPerPage, currentPage * itemsPerPage + itemsPerPage).length;
    let listOffset = -100 * (itemsPerPage % pageItems || pageItems === 1 ? currentPage - 1 : currentPage);

    if (itemsPerPage % pageItems || pageItems === 1) {
      listOffset -= (pageItems / itemsPerPage) * 100;
    }

    this.setState({ listOffset, currentPage });
  };

  render () {
    const { contactsList, clickCallback } = this.props;
    const { listOffset, numOfPages, currentPage, itemsPerPage } = this.state;

    return (
      <div className='transfer__contacts-container'>
        <h4>Contacts</h4>
        <div className='transfer__contacts__slider'>
          <Responsive>
            {contactsList.length > itemsPerPage && (
              <Fragment>
                <ArrowBtn onClick={this.prevPage} />
                <ArrowBtn alt onClick={this.nextPage} />
              </Fragment>
            )}
          </Responsive>
          <div className='transfer__contacts__list-wrapper'>
            <div className={`transfer__contacts-list ${contactsList.length < itemsPerPage ? 'transfer__contacts-list--center' : ''}`}
              style={{ 'transform': `translateX(${listOffset}%)` }}>
              {contactsList.map(c => (
                <TransferContact contact={c} clickCallback={clickCallback} alt key={c.id} />
              ))}
            </div>
          </div>
        </div>
        {contactsList.length > itemsPerPage && (
          <ul className='transfer__contacts-container__pager'>
            {[...Array(numOfPages).keys()].map((item, i) =>
              <li className={currentPage === i ? 'active' : ''} onClick={() => {
                this.goToPage(i);
              }} key={i} />
            )}
          </ul>
        )}
      </div>
    );
  }
}

TransferContacts.propTypes = {
  contactsList: PropTypes.array,
  clickCallback: PropTypes.func
};

export default TransferContacts;
