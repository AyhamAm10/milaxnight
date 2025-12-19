'use client';

import { Init } from './init';
import { State } from './state';
import { Utils } from './utils';
import { Ui } from './ui';

export function Factory() {
  return (
    <Init>
      <State>
        <Utils>
          <Ui />
        </Utils>
      </State>
    </Init>
  );
}

