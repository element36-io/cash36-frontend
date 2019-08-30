import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import AttestButton from '../../components/UserProfile/AttestButton';

describe('user is Tier_0', () => {
  const currentLevel = 'Tier_0';

  test("doesn't render the component", () => {
    const { queryByText } = render(
      <AttestButton
        clickCallback={jest.fn()}
        user={{
          currentLevel
        }}
      />
    );

    expect(queryByText(/get uport attest/)).toBeNull();
  });
});

describe('user is Tier_1', () => {
  const currentLevel = 'Tier_1';

  test('renders the component', () => {
    const { queryByText } = render(
      <AttestButton
        clickCallback={jest.fn()}
        user={{
          currentLevel: currentLevel,
          verified: undefined
        }}
      />
    );

    expect(queryByText(/get uport attest/i)).toBeVisible();
  });

  test("doesn't render the component if user is already Tier_1 attested", () => {
    const { queryByText } = render(
      <AttestButton
        clickCallback={jest.fn()}
        user={{
          currentLevel: currentLevel,
          verified: [
            {
              claim: {
                element36Tier1: true
              }
            }
          ]
        }}
      />
    );

    expect(queryByText(/get uport attest/i)).toBeNull();
  });

  test('calls clickCallback on button click', () => {
    const clickCallback = jest.fn();

    const { getByText } = render(
      <AttestButton
        clickCallback={clickCallback}
        user={{
          currentLevel: currentLevel,
          verified: undefined
        }}
      />
    );

    fireEvent.click(getByText(/get uport attest/i));

    expect(clickCallback).toHaveBeenCalledTimes(1);
  });

  test('shows a loader when attesting is true', () => {
    const { getByTestId } = render(
      <AttestButton
        clickCallback={jest.fn()}
        attesting
        user={{
          currentLevel: currentLevel,
          verified: undefined
        }}
      />
    );

    expect(getByTestId('attest-button__loader')).toBeVisible();
  });
});

describe('user is Tier_2', () => {
  const currentLevel = 'Tier_2';

  test('renders the component', () => {
    const { queryByText } = render(
      <AttestButton
        clickCallback={jest.fn()}
        user={{
          currentLevel: currentLevel,
          verified: undefined
        }}
      />
    );

    expect(queryByText(/get uport attest/i)).toBeVisible();
  });

  test("doesn't render the component if user is already Tier_2 attested", () => {
    const { queryByText } = render(
      <AttestButton
        clickCallback={jest.fn()}
        user={{
          currentLevel: currentLevel,
          verified: [
            {
              claim: {
                element36Tier1: true,
                element36Tier2: true
              }
            }
          ]
        }}
      />
    );

    expect(queryByText(/get uport attest/i)).toBeNull();
  });

  test('calls clickCallback on button click', () => {
    const clickCallback = jest.fn();

    const { getByText } = render(
      <AttestButton
        clickCallback={clickCallback}
        user={{
          currentLevel: currentLevel,
          verified: undefined
        }}
      />
    );

    fireEvent.click(getByText(/get uport attest/i));

    expect(clickCallback).toHaveBeenCalledTimes(1);
  });

  test('shows a loader when attesting is true', () => {
    const { getByTestId } = render(
      <AttestButton
        clickCallback={jest.fn()}
        attesting
        user={{
          currentLevel: currentLevel,
          verified: undefined
        }}
      />
    );

    expect(getByTestId('attest-button__loader')).toBeVisible();
  });
});
