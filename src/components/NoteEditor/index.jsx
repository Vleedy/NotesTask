import React, { Component } from 'react';
import NoteEditor, { createEditorStateWithText } from '@draft-js-plugins/editor';
import createHashtagPlugin from '@draft-js-plugins/hashtag';
import editorStyles from './editorStyles.module.scss';
import hashtagStyles from './hashtagStyles.module.scss';
import styles from '../NoteItem/NoteItem.module.scss';
const hashtagPlugin = createHashtagPlugin({ theme: hashtagStyles });
const plugins = [hashtagPlugin];

export default class CustomHashtagEditor extends Component {
  state = {
    editorState: createEditorStateWithText(this.props.value),
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
    this.props.setValue(() => this.editor.getEditorRef().editor.textContent);
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <>
        <div className={styles.wrapper}>
          <div className={editorStyles.editor} onClick={this.focus}>
            <NoteEditor
              editorState={this.state.editorState}
              onChange={this.onChange}
              plugins={plugins}
              ref={(element) => {
                this.editor = element;
              }}
            />
          </div>
        </div>
      </>
    );
  }
}
