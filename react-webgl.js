import Reconciler from 'react-reconciler';
import { View as View$1, Text as Text$1, Image as Image$1, RawText, Surface, TextureManager } from 'webgl-ui';
import { FontImplementation } from 'webgl-ui-system-font';
import { PureComponent, createElement } from 'react';
import { FrameBuffer } from 'webgl-lite';

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
const quad = {
  create: root => root.getSurface().createView(),
  dispatchers: (() => {
    const d = {};
    View$1.registerBindings(d);
    return d;
  })()
};
const text = {
  create: root => root.getSurface().createText(),
  dispatchers: (() => {
    const d = {};
    Text$1.registerBindings(d);
    return d;
  })()
};
const image = {
  create: root => root.getSurface().createImage(),
  dispatchers: (() => {
    const d = {};
    Image$1.registerBindings(d);
    return d;
  })()
};

var Elements = /*#__PURE__*/Object.freeze({
  __proto__: null,
  quad: quad,
  text: text,
  image: image
});

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

/**
 * Used to avoid recomputing styles if the `style={}` prop has not changed
 * When developers use StyleSheet.create to produce frozen objects, this will
 * lead to improved performance.
 */
function areStylePropsEqual(prev, next) {
  if (!prev && !next) {
    return true;
  }

  if (Array.isArray(prev)) {
    if (!Array.isArray(next)) {
      return false;
    }

    if (prev.length !== next.length) {
      return false;
    }

    for (let i = 0; i < prev.length; i++) {
      if (!areStylePropsEqual(prev[i], next[i])) {
        return false;
      }
    }

    return true;
  }

  if (Array.isArray(next)) {
    return false;
  }

  return prev === next;
}

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
function flattenStyle(styles) {
  if (!styles) {
    return styles;
  }

  if (Array.isArray(styles)) {
    const merged = {};

    for (let i = 0; i < styles.length; i++) {
      const flat = flattenStyle(styles[i]);

      if (!flat) {
        continue;
      }

      for (const prop in flat) {
        merged[prop] = flat[prop];
      }
    }

    return merged;
  }

  return styles;
}

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
const EVENTS = {
  onClick: 'click',
  onEnter: 'enter',
  onExit: 'exit',
  onInput: 'input'
};
function applyProps(view, oldProps, newProps, dispatchers) {
  for (const p in newProps) {
    if (p === 'children') {
      continue;
    }

    if (oldProps != null && oldProps[p] === newProps[p]) {
      continue;
    }

    if (p === 'style') {
      const oldStyles = oldProps ? oldProps.style : null;
      const styles = newProps[p];

      if (areStylePropsEqual(oldStyles, styles)) {
        continue;
      }

      const flattened = flattenStyle(styles);

      for (const s in flattened) {
        const setter = view[`__setStyle_${s}`];

        if (typeof setter === 'function') {
          setter.call(view, flattened[s]);
        }
      }

      continue;
    }

    if (p === 'transition') {
      const oldTransitions = oldProps ? oldProps.transition : null;
      const transitions = newProps[p];

      for (const old in oldTransitions) {
        if (!(old in transitions)) {
          view.setTransition(old, null);
        }
      }

      for (const name in transitions) {
        view.setTransition(name, transitions[name]);
      }

      continue;
    }

    if (p in EVENTS) {
      view.clearEventListeners(EVENTS[p]);
      view.addEventListener(EVENTS[p], newProps[p]);
      continue;
    }

    if (p in dispatchers) {
      dispatchers[p].call(view, newProps[p]);
      continue;
    }

    const setter = view[`__setStyle_${p}`];

    if (typeof setter === 'function') {
      setter.call(view, newProps[p]);
    } else {
      console.error('unknown prop', p);
    }
  }
}

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
const NO_CONTEXT = {};
const UPDATE_SIGNAL = {}; // Core properties

function getPublicInstance(instance) {
  return instance;
}
function getRootHostContext() {
  return NO_CONTEXT;
}
function getChildHostContext() {
  return NO_CONTEXT;
}
function prepareForCommit(containerInfo) {// no-op
}
function resetAfterCommit() {// no-op
}
function createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
  // create view from type
  const element = Elements[type];
  const view = element.create(rootContainerInstance);
  rootContainerInstance.getSurface().getRenderGroup().addNode(view.view.getNode());
  applyProps(view, null, props, element.dispatchers);
  return view;
}
function appendInitialChild(parentInstance, child) {
  const index = parentInstance.getChildCount();
  parentInstance.addChild(index, child);
}
function finalizeInitialChildren(parentInstance, type, props, rootContainerInstance, hostContext) {
  return false;
}
function prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, hostContext) {
  return UPDATE_SIGNAL;
}
function shouldSetTextContent(type, props) {
  return false;
}
function shouldDeprioritizeSubtree(type, props) {
  return false;
}
function createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle) {
  const raw = new RawText();
  raw.setText(text);
  return raw;
}
const scheduleTimeout = setTimeout;
const cancelTimeout = clearTimeout;
const noTimeout = -1;
const now = Date.now;
const isPrimaryRenderer = true;
const supportsMutation = true;
const supportsPersistence = false;
const supportsHydration = false; // Mutation

function appendChild(parentInstance, child) {
  const index = parentInstance.getChildCount();
  parentInstance.addChild(index, child);
}
function appendChildToContainer(parentInstance, child) {
  parentInstance.setRoot(child);
}
function commitTextUpdate(textInstance, oldText, newText) {
  if (oldText !== newText) {
    textInstance.setText(newText);
  }
}
function commitMount(instance, type, newProps) {// no-op
}
function commitUpdate(instance, updatePayload, type, oldProps, newProps) {
  applyProps(instance, oldProps, newProps, Elements[type].dispatchers);
}
function insertBefore(parentInstance, child, beforeChild) {
  const index = parentInstance.getIndexOf(beforeChild);

  if (index > -1) {
    parentInstance.addChild(index, child);
  }
}
function insertInContainerBefore(parentInstance, child, beforeChild) {
  throw new Error('not implemented');
}
function removeChild(parentInstance, child) {
  const index = parentInstance.getIndexOf(child);

  if (index > -1) {
    parentInstance.removeChild(index);
  }
}
function removeChildFromContainer(parentInstance, child) {
  throw new Error('not implemented');
}
function resetTextContent(instance) {
  // set instance text to ''
  instance.setText('');
}

var HostConfig = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getPublicInstance: getPublicInstance,
  getRootHostContext: getRootHostContext,
  getChildHostContext: getChildHostContext,
  prepareForCommit: prepareForCommit,
  resetAfterCommit: resetAfterCommit,
  createInstance: createInstance,
  appendInitialChild: appendInitialChild,
  finalizeInitialChildren: finalizeInitialChildren,
  prepareUpdate: prepareUpdate,
  shouldSetTextContent: shouldSetTextContent,
  shouldDeprioritizeSubtree: shouldDeprioritizeSubtree,
  createTextInstance: createTextInstance,
  scheduleTimeout: scheduleTimeout,
  cancelTimeout: cancelTimeout,
  noTimeout: noTimeout,
  now: now,
  isPrimaryRenderer: isPrimaryRenderer,
  supportsMutation: supportsMutation,
  supportsPersistence: supportsPersistence,
  supportsHydration: supportsHydration,
  appendChild: appendChild,
  appendChildToContainer: appendChildToContainer,
  commitTextUpdate: commitTextUpdate,
  commitMount: commitMount,
  commitUpdate: commitUpdate,
  insertBefore: insertBefore,
  insertInContainerBefore: insertInContainerBefore,
  removeChild: removeChild,
  removeChildFromContainer: removeChildFromContainer,
  resetTextContent: resetTextContent
});

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
class GLRoot {
  constructor(gl, text) {
    this._gl = gl;
    this._surface = new Surface(gl);
    this._textImplementation = text || new FontImplementation(gl);
    this._textureManager = new TextureManager(gl);

    this._surface.useTextImplementation(this._textImplementation);

    this._surface.useTextureManager(this._textureManager);
  }

  setRoot(child) {
    this._surface.setRootNode(child);
  }

  update() {
    this._surface.updateGeometry();

    {
      this._surface.clear();

      this._surface.draw();
    }
  }

  useTextureManager(tm) {
    this._textureManager = tm;

    this._surface.useTextureManager(tm);
  }

  getTextImplementation() {
    return this._textImplementation;
  }

  getTextureManager() {
    return this._textureManager;
  }

  getSurface() {
    return this._surface;
  }

  getGLContext() {
    return this._gl;
  }

  setCursor(x, y) {
    this._surface.setCursor(x, y);
  }

  clearCursor() {
    this._surface.clearCursor();
  }

  dispatchEvent(event, payload) {
    this._surface.dispatchEvent(event, payload);
  }

}

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class CanvasRoot extends GLRoot {
  constructor(options = {}) {
    const canvas = options.canvas || document.createElement('canvas');
    canvas.style.backgroundColor = 'transparent';
    const gl = canvas.getContext('webgl', {
      alpha: true,
      premultipliedAlpha: false
    });

    if (gl == null) {
      throw new Error('Unable to construct WebGL context');
    }

    super(gl, options.text);

    _defineProperty(this, "_onClick", () => {
      this.getSurface().dispatchEvent('click');
    });

    _defineProperty(this, "_onPressIn", () => {
      this.getSurface().dispatchEvent('input', {
        buttonClass: 'confirm',
        action: 'down'
      });
    });

    _defineProperty(this, "_onPressOut", () => {
      this.getSurface().dispatchEvent('input', {
        buttonClass: 'confirm',
        action: 'up'
      });
    });

    _defineProperty(this, "_onTouchStart", e => {
      this._setCursorFromTouch(e, true);

      this._onPressIn();

      e.preventDefault();
    });

    _defineProperty(this, "_onTouchMove", e => {
      this._setCursorFromTouch(e, false);
    });

    _defineProperty(this, "_onMouseMove", e => {
      this.getSurface().setCursor(e.offsetX, e.offsetY);
    });

    _defineProperty(this, "_onMouseLeave", () => {
      this.getSurface().clearCursor();
    });

    this._canvas = canvas;
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    const width = options.width || (options.canvas ? options.canvas.width : 300);
    const height = options.height || (options.canvas ? options.canvas.height : 300);
    this.resize(width, height);
    canvas.addEventListener('click', this._onClick);
    canvas.addEventListener('mousemove', this._onMouseMove);
    canvas.addEventListener('mouseleave', this._onMouseLeave);
    canvas.addEventListener('mousedown', this._onPressIn);
    canvas.addEventListener('mouseup', this._onPressOut);
    canvas.addEventListener('touchstart', this._onTouchStart);
    canvas.addEventListener('touchend', this._onPressOut);
    canvas.addEventListener('touchmove', this._onTouchMove);
  }

  resize(width, height) {
    const pixelRatio = window.devicePixelRatio || 1;
    this._canvas.width = width * pixelRatio;
    this._canvas.height = height * pixelRatio;
    this._canvas.style.width = width + 'px';
    this._canvas.style.height = height + 'px';
    this.getGLContext().viewport(0, 0, width * pixelRatio, height * pixelRatio);
    this.getSurface().setViewport(width, height);
  }

  getCanvas() {
    return this._canvas;
  }

  _setCursorFromTouch(e, forceHitDetection) {
    if (!e.touches) {
      return;
    }

    const touch = e.touches[0];

    if (!touch) {
      return;
    }

    let offsetTop = 0;
    let offsetLeft = 0;
    let offsetTarget = e.target;

    while (offsetTarget != null) {
      // $FlowFixMe
      offsetTop += offsetTarget.offsetTop; // $FlowFixMe

      offsetLeft += offsetTarget.offsetLeft; // $FlowFixMe

      offsetTarget = offsetTarget.offsetTarget;
    }

    this.getSurface().setCursor(touch.clientX - offsetLeft, touch.clientY - offsetTop, !!forceHitDetection);
  }

}

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
const Image = 'image';
const Text = 'text';
const Quad = 'quad';
const View = 'quad';

function _defineProperty$1(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Pressable extends PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty$1(this, "state", {
      hovered: false,
      pressed: false
    });

    _defineProperty$1(this, "_onInput", event => {
      if (event.buttonClass !== 'confirm') {
        return;
      }

      if (this.state.pressed) {
        if (event.action === 'up') {
          this.setState({
            pressed: false
          });

          if (this.props.onPress) {
            this.props.onPress(event);
          }

          if (this.props.onPressOut) {
            this.props.onPressOut(event);
          }
        }
      } else {
        if (event.action === 'down') {
          this.setState({
            pressed: true
          });

          if (this.props.onPressIn) {
            this.props.onPressIn(event);
          }
        }
      }
    });

    _defineProperty$1(this, "_onEnter", () => {
      this.setState({
        hovered: true
      });

      if (this.props.onHoverIn) {
        this.props.onHoverIn();
      }
    });

    _defineProperty$1(this, "_onExit", () => {
      if (this.state.pressed) {
        if (this.props.onPressOut) {
          this.props.onPressOut();
        }
      }

      this.setState({
        hovered: false,
        pressed: false
      });

      if (this.props.onHoverOut) {
        this.props.onHoverOut();
      }
    });
  }

  render() {
    const {
      children,
      style
    } = this.props;
    const currentState = {
      hovered: this.state.hovered,
      pressed: this.state.pressed
    };
    return createElement(View, {
      style: style,
      onEnter: this._onEnter,
      onExit: this._onExit,
      onInput: this._onInput
    }, typeof children === 'function' ? children(currentState) : children);
  }

}

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

/**
 * RenderTargetRoot draws a React WebGL scene to a GL FrameBuffer / Texture,
 * which can then be used in a larger WebGL scene.
 */
class RenderTargetRoot extends GLRoot {
  constructor(gl, options = {}) {
    super(gl, options.text);
    const width = options.width || 0;
    const height = options.height || 0;
    this._fb = new FrameBuffer(gl, width, height);
    this.getSurface().setViewport(width, height);
  }

  getFrameBuffer() {
    return this._fb;
  }

  update() {
    this._fb.drawToBuffer(() => {
      const textureNeedsUpdate = this.getSurface().isDirty();
      super.update();

      if (textureNeedsUpdate) {
        this._fb.getTexture().update();
      }
    });
  }

}

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
const absoluteFillObject = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
const StyleSheet = {
  create(styles) {
    const frozen = {};

    for (const name in styles) {
      frozen[name] = Object.freeze(styles[name]);
    }

    return frozen;
  },

  flatten: flattenStyle,
  absoluteFill: absoluteFillObject,
  absoluteFillObject,
  hairlineWidth: 1
};

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

class Video extends PureComponent {
  render() {
    const {
      source,
      style
    } = this.props;
    const uri = source ? `video://${source}` : '';
    return createElement(Image, {
      style: style,
      source: {
        uri
      }
    });
  }

}

/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
const Renderer = Reconciler(HostConfig);
function render(element, container, callback) {
  if (!container.__rootContainer) {
    container.__rootContainer = Renderer.createContainer(container, false);
  }

  return Renderer.updateContainer(element, container.__rootContainer, null, callback);
}
Renderer.injectIntoDevTools({
  findFiberByHostInstance: Renderer.findHostInstance,
  bundleType: self.__DEV__ ? 1 : 0,
  version: '16.8.6',
  rendererPackageName: 'react-webgl'
});

export { CanvasRoot, GLRoot, Image, Pressable, Quad, RenderTargetRoot, StyleSheet, Text, Video, View, render };
