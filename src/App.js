import logo from './logo.svg';
import './App.css';
import React from "react";
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CustomSave = () => (
  <button>save</button>
);



function saveText() {
  
  console.log(this.quill.container.textContent);
}



const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);


const Font = Quill.import("formats/font");
Font.whitelist = [
  "arial",
  "comic-sans",
  "courier-new",
  "georgia",
  "helvetica",
  "lucida"
];
Quill.register(Font, true);


export const modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      undo: saveText,
      
    }
  },
  history: {
    delay: 500,
    maxStack: 100,
    userOnly: true
  }
};

export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block"
];

      

export const QuillToolbar = () => (

  
      
  <div id="toolbar">
    <div className="App">
    <img src={logo} className="App-logo" alt="logo" />
        <div className="text">
        <h1><code>TextEditor</code></h1>
        </div>
        <div className="footer">
        <h1><code>Christian Aronsson</code></h1>
        <code>Kmom01/Frontend</code>
        </div>
      </div>

    <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
    </span>
    <span className="ql-formats">
      <select className="ql-align" />
      <select className="ql-color" />
      <select className="ql-background" />
    </span>
    <span className="ql-formats">
      <button className="ql-image" />
      <button className="ql-video" />
    </span>
    <span className="ql-formats">
      <button className="ql-undo">
        <CustomSave />
      </button>
      
    </span>
    
  </div>
);

export const Editor = () => {
  const [state, setState] = React.useState({ value: null });
  const handleChange = value => {
    setState({ value });
  };
  return (
    
    <div className="text-editor">
      <QuillToolbar />
      <ReactQuill
        theme="snow"
        value={state.value}
        onChange={handleChange}
        
        modules={modules}
        formats={formats}
      />
    </div>
    
  );
  
};

export default Editor;
