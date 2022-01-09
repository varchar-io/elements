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

export const Palettes = [
  '#FA4E83', '#17BF6D', '#C243EE', '#7756FA', '#F2DE2A',
];

export type PaletteInput = {
  begin: string;
  end: string;
  steps: number;
};

const hex2rgb = (hex) => {
  var result = null;
  if (hex.length === 7) {
    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  } else if (hex.length === 4) {
    result = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex);
  }

  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  } : null;
};
const hex = (v) => v.toString(16).padStart(2, 0).toUpperCase();
const rgb2hex = (rgb) => `#${hex(rgb.r)}${hex(rgb.g)}${hex(rgb.b)}`;
const apply = (c1, c2, factor = 0.5) => {
  return {
    r: Math.round(c1.r + factor * (c2.r - c1.r)),
    g: Math.round(c1.g + factor * (c2.g - c1.g)),
    b: Math.round(c1.b + factor * (c2.b - c1.b)),
  };
};
// generate a pallete between two colors, c1 and c2 are hex values
export const interpolate = (c1: string, c2: string, steps: number) => {
  const rgb1 = hex2rgb(c1);
  const rgb2 = hex2rgb(c2);
  if (!rgb1 || !rgb2) {
    return [];
  }

  const stepFactor = 1 / (steps - 1);
  const result = [];
  for (let i = 0; i < steps; i++) {
    result.push(apply(rgb1, rgb2, stepFactor * i));
  }

  return result.map(c => rgb2hex(c));
};
