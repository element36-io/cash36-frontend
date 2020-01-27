import React, { useRef, useState, memo } from 'react';
import PropTypes from 'prop-types';
import Copy from '@material-ui/icons/FileCopy';
import { truncateBlockchainAddress } from '../../helpers/string.helpers';

import './CopyToClipboard.scss';

const CopyToClipboard = ({ text, showAsText = false, truncated = false }) => {
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
          onClick={copy}
        >
          {truncated ? truncateBlockchainAddress(text) : text}
        </span>
      ) : (
        <span
          className={showTooltip ? 'copy-to-clipboard__tooltip' : null}
          onClick={copy}
        >
          <button>
            <Copy />
          </button>
        </span>
      )}
      <textarea value={text} ref={textToCopy} onChange={() => {}} />
    </div>
  );
};

CopyToClipboard.propTypes = {
  text: PropTypes.string,
  showAsText: PropTypes.bool,
  truncated: PropTypes.bool
};

export default memo(CopyToClipboard);
