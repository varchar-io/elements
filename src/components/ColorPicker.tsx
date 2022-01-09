/*
 * Copyright 2017-present columns.ai
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This is a columns color picker built on top of react-colorful.

import { FC, useState } from 'react';
import { Button, ClickAwayListener, Paper } from '@mui/material';
import { HexColorPicker, HexColorInput } from 'react-colorful';
import { Palettes } from './common';

const PICKER_WIDTH = 240;
const BUTTON_WIDTH = 30;
const PICKER_HEIGHT = 160;
const PADDING = 12;

type Props = {
  color: string;
  onColor: (color: string) => void;
  align?: 'left' | 'right';
};
export const ColorPicker: FC<Props> = ({ color = '#639', onColor, align = 'left' }) => {
  const [isOpen, toggle] = useState(false);

  const inputWidth = PICKER_WIDTH - BUTTON_WIDTH * Palettes.length;

  return (
    <ClickAwayListener onClickAway={() => toggle(false)}>
      <div>
        <div
          style={{ backgroundColor: color, width: '32px', height: '32px', borderRadius: '4px', cursor: 'pointer' }}
          onClick={() => toggle(!isOpen)}
        />

        {isOpen &&
          <Paper elevation={1} sx={{
            width: `${PICKER_WIDTH}px`,
            position: 'absolute',
            zIndex: 1000,
            transform: `translate(${align === 'left' ? 0 : -(PICKER_WIDTH - PADDING)}px,${PADDING}px )`,
          }}>
            <HexColorPicker
              draggable={false}
              color={color}
              onChange={onColor}
              style={{ width: `${PICKER_WIDTH}px`, height: `${PICKER_HEIGHT}px` }} />
            <div style={{ marginTop: '5px', display: 'flex' }}>
              {
                Palettes.map(c => {
                  return (<Button
                    key={c}
                    variant='text'
                    onClick={() => onColor(c)}
                    sx={{
                      marginX: '2px',
                      paddingX: `${PADDING}px`,
                      bgcolor: c,
                      borderRadius: '4px',
                      height: '32px',
                      minWidth: 0,
                    }} />);
                })
              }
              <HexColorInput
                prefixed
                color={color}
                onChange={onColor}
                style={{ width: `${inputWidth}px`, border: 0, height: '32px', textAlign: 'right', fontSize: 'large' }} />
            </div>
          </Paper >
        }
      </div>
    </ClickAwayListener>);
};
