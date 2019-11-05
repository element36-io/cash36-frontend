import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Copy from '@material-ui/icons/FileCopy';

import DefaultButton from '../Buttons/DefaultButton';

import './CopyToClipboard.scss';

const CopyToClipboard = React.memo(({ text, showAsText = false }) => {
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
          {text}
        </span>
      ) : (
        <DefaultButton onClick={copy}>
          <Copy />
        </DefaultButton>
      )}
      <textarea value={text} ref={textToCopy} onChange={() => {}} />
    </div>
  );
});

CopyToClipboard.propTypes = {
  text: PropTypes.string,
  showAsText: PropTypes.bool
};

export default CopyToClipboard;
