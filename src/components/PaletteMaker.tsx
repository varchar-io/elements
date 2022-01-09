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

// This is a columns palette maker using two end colors and number of scales

import { FC, useEffect, useRef, useState } from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import { SwapHoriz } from '@mui/icons-material';
import { TooltipSlider } from './TooltipSlider';

import { ColorPicker } from './ColorPicker';
import { interpolate, PaletteInput } from './common';

type Props = {
  input?: PaletteInput;
  width?: number;
  onchange: (newValue: PaletteInput) => void;
};

export const PaletteMaker: FC<Props> = ({ input, width = 240, onchange }) => {
  const theme = useTheme();
  const [a, setA] = useState<string>(input?.begin || theme.palette.primary.main);
  const [b, setB] = useState<string>(input?.end || theme.palette.secondary.main);
  const [steps, setSteps] = useState<number>(input?.steps || 10);
  const [x, setX] = useState<string[]>([]);
  const band = useRef<number>(0);

  // generate the palette
  useEffect(() => {
    if (a && b && steps) {
      setX(interpolate(a, b, steps));
      band.current = width / steps;

      // fire an event to tell client
      onchange({ begin: a, end: b, steps });
    }
  }, [a, b, steps]);

  return (
    <Box width={width + 74}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TooltipSlider
          label={null}
          init={steps}
          max={20}
          onchange={setSteps} />
        <IconButton onClick={() => {
          setA(b);
          setB(a);
        }}>
          <SwapHoriz fontSize='large' color='secondary' />
        </IconButton>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '5px' }}>
          <ColorPicker color={a} onColor={setA} />
        </div>
        {x.map(c => <button key={c} style={{
          backgroundColor: c,
          width: `${band.current}px`,
          height: '20px',
          border: 0,
          borderLeft: '1px dotted white',
        }} />)}
        <div style={{ marginLeft: '5px' }}>
          <ColorPicker color={b} align='right' onColor={setB} />
        </div>
      </Box>
    </Box>
  );
};
