import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import DefaultButton from '../Buttons/DefaultButton';
import Copy from '@material-ui/icons/FileCopy';

import './CopyToClipboard.scss';

const CopyToClipboard = React.memo(({ text }) => {
  const textToCopy = useRef();
  const copy = () => {
    textToCopy.current.select();
    textToCopy.current.setSelectionRange(0, 99999);
    document.execCommand('copy');
  };

  return (
    <div className="copy-to-clipboard" data-testid="copy-to-clipboard">
      <DefaultButton onClick={copy}>
        <Copy />
      </DefaultButton>
      <textarea value={text} ref={textToCopy}>
        test
      </textarea>
    </div>
  );
});

CopyToClipboard.propTypes = {
  text: PropTypes.string
};

export default CopyToClipboard;
