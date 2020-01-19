import React, { useRef, useState, memo } from 'react';
import PropTypes from 'prop-types';
import Copy from '@material-ui/icons/FileCopy';
import TruncateString from 'react-truncate-string';

import SecondaryButton from '../Buttons/SecondaryButton';

import './CopyToClipboard.scss';

const CopyToClipboard = ({ text, showAsText = false }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const textToCopy = useRef();
  const copy = () => {
    textToCopy.current.select();
    textToCopy.current.setSelectionRange(0, 99999);
    document.execCommand('copy');

    setShowTooltip(true);

    setTimeout(() => {
      setShowTooltip(false);
    }, 1000);
  };

  return (
    <div className="copy-to-clipboard" data-testid="copy-to-clipboard">
      {showAsText ? (
        <span
          className={showTooltip ? 'copy-to-clipboard__tooltip' : null}
          // className="copy-to-clipboard__tooltip"
          onClick={copy}
        >
          <TruncateString text={text} />
        </span>
      ) : (
        <SecondaryButton onClick={copy}>
          <Copy />
        </SecondaryButton>
      )}
      <textarea value={text} ref={textToCopy} onChange={() => {}} />
    </div>
  );
};

CopyToClipboard.propTypes = {
  text: PropTypes.string,
  showAsText: PropTypes.bool
};

export default memo(CopyToClipboard);
