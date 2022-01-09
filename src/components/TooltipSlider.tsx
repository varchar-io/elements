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

import { FC, useState } from 'react';
import { Slider, InputLabel } from '@mui/material';

type Props = {
  label: string;
  init: number;
  max: number;
  onchange: (value: number) => void;
};
export const TooltipSlider: FC<Props> = ({ label, init, max, onchange }: Props) => {
  const [value, setValue] = useState<number>(init);
  const onValueChange = (event: any, newValue: number | number[]) => {
    const nv = newValue as number;
    setValue(nv);
    onchange(nv);
  };

  return (
    <>
      {label && <InputLabel htmlFor="topn">{label}</InputLabel>}
      <Slider
        valueLabelDisplay="auto"
        size="small"
        color="primary"
        min={1}
        max={max || 100}
        value={value || 12}
        onChange={onValueChange} />
    </>
  );
};
