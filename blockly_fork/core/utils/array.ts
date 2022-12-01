/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/** @namespace Blockly.utils.array */
import * as goog from '../../closure/goog/goog.js';
goog.declareModuleId('Blockly.utils.array');


/**
 * Removes the first occurrence of a particular value from an array.
 *
 * @param arr Array from which to remove value.
 * @param value Value to remove.
 * @returns True if an element was removed.
 * @alias Blockly.array.removeElem
 * @internal
 */
export function removeElem<T>(arr: Array<T>, value: T): boolean {
  const i = arr.indexOf(value);
  if (i === -1) {
    return false;
  }
  arr.splice(i, 1);
  return true;
}
