// Copyright 2017-2021 @polkadot/app-accounts authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { AddressSmall, Menu, Popup, Tag } from '@polkadot/react-components';
import { DisplayedJudgement } from '@polkadot/react-components/types';
import { useRegistrars } from '@polkadot/react-hooks';
import { RegistrarIndex } from '@polkadot/types/interfaces/identity/types';

interface Props {
  judgementName: DisplayedJudgement;
  registrarsIndexes: RegistrarIndex[]
}

const getColor = (name: DisplayedJudgement): 'green' | 'red' => {
  return (name === 'Erroneous' || name === 'Low quality') ? 'red' : 'green';
};

function JudgementTag ({ judgementName, registrarsIndexes }: Props): React.ReactElement<Props> {
  const { registrars: allRegistrars } = useRegistrars();

  const findRegistrarByIndex = (index: number) => {
    return allRegistrars.find((registrar) => registrar.index === index);
  };

  const judgementColor = getColor(judgementName);
  const registrars = registrarsIndexes.map((index) => findRegistrarByIndex(index.toNumber()));

  return (
    <>
      <Popup
        closeOnScroll
        position='center'
        value={
          <Menu>
            {registrars.map((registrar) => registrar && (
              <AddressSmall
                key={registrar.address}
                value={registrar.address}
              />
            ))}
          </Menu>
        }
      >
        <Tag
          color={judgementColor}
          isTag={false}
          label={`${registrarsIndexes.length} ${judgementName}`}
          size='tiny'
        />
      </Popup>
    </>
  );
}

export default React.memo(JudgementTag);