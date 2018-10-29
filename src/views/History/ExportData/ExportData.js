import React from 'react';
import DefaultButton from '../../../components/Buttons/DefaultButton';
import ExportIcon from '../../../assets/History/export-icon.svg';

import './ExportData.scss';

const ExportData = () => (
  <div className='history__export-data'>
    <DefaultButton
      onClick={() => { console.log('Export button clicked'); }}
    >
      <img src={ExportIcon} />
      <span>Export Data</span>
    </DefaultButton>
  </div>
);

export default ExportData;
