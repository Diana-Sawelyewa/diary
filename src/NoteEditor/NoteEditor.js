import { useEffect, useState } from "react";
import { convertToRaw, convertFromRaw, EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";
import './NoteEditor.scss';
import PropTypes from 'prop-types';
import { BlockPicker } from 'react-color';

import { Component } from "react";



const NoteEditor = ({day, notes, setNotes}) => {

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [isFocused, setIsFocused] = useState(false);

  const old = () => {
      let contentState = false;
      notes.forEach(item => {
      if (day===item.day) {
      contentState = true
      }})
      return contentState
    }

  let oldNote = old();
  

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };


  const loadContent = () => {
    let contentState = false;
    notes.forEach(item => {
      if (day===item.day) {
      contentState = convertFromRaw(item.note);
      setEditorState(EditorState.createWithContent(contentState))
      }
      })
      if (!contentState) {
        setEditorState(EditorState.createEmpty())
      }
  };


  useEffect(()=> {
    loadContent()
  }, [day, notes])



  const addNote = () => {
    let y = false;
    let x = convertToRaw(editorState.getCurrentContent())
    notes.forEach((item,i)=> {//старая заметка удаляется, если нет текста
      if (item.day === day) {
        y = true
        item.note = x  
        if (x.blocks[0].text === "") {
          const newArr = notes.filter(item => item.day !== day);
          setNotes(newArr);
        }
      }})
      if (!y) {
        if (x.blocks[0].text !== "") {
        setNotes([...notes, {note: x, day: day}])
        }
      }    
  }

  const deleteNote = () => {
    console.log('delete')
  }

  return (
    <div>
      <Editor
      toolbarOnFocus
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        toolbar={{
          options: ['inline', 'fontSize', 'fontFamily', 'colorPicker', 'emoji',  'list', 'textAlign', 'history' ],
          inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough']
          },
          list: {
            options: ['unordered', 'ordered']
          },
          fontSize: {
            options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60]
          }
        }}
      />
      {/* <button style={{display: oldNote ? 'block' : 'none'}} onClick={deleteNote}>Удалить заметку</button> */}
      <button /* style={{display: (convertToRaw(editorState.getCurrentContent()).blocks[0].text !== "" && isFocused) ? 'block' : 'none'}} */ onClick={addNote}>Сохранить</button>
    </div>
  );
};


export default NoteEditor;





