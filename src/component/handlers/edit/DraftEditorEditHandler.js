/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails oncall+draft_js
 * @flow strict-local
 * @format
 * @oncall draft_js
 */

'use strict';

import type DraftEditor from 'DraftEditor.react';

const UserAgent = require('UserAgent');

const onBeforeInput = require('editOnBeforeInput');
const onBlur = require('editOnBlur');
const onCompositionStart = require('editOnCompositionStart');
const onCopy = require('editOnCopy');
const onCut = require('editOnCut');
const onDragOver = require('editOnDragOver');
const onDragStart = require('editOnDragStart');
const onFocus = require('editOnFocus');
const onInput = require('editOnInput');
const onKeyDown = require('editOnKeyDown');
const onPaste = require('editOnPaste');
const onSelect = require('editOnSelect');

const isChrome = UserAgent.isBrowser('Chrome');
const isFirefox = UserAgent.isBrowser('Firefox');

const selectionHandler: (e: DraftEditor) => void =
  isChrome || isFirefox ? onSelect : (e: DraftEditor) => {};

const DraftEditorEditHandler = {
  onBeforeInput,
  onBlur,
  onCompositionStart,
  onCopy,
  onCut,
  onDragOver,
  onDragStart,
  onFocus,
  onInput,
  onKeyDown,
  onPaste,
  onSelect,
  // In certain cases, contenteditable on chrome does not fire the onSelect
  // event, causing problems with cursor positioning. Therefore, the selection
  // state update handler is added to more events to ensure that the selection
  // state is always synced with the actual cursor positions.
  onMouseUp: selectionHandler,
  onKeyUp: selectionHandler,
};

module.exports = DraftEditorEditHandler;
