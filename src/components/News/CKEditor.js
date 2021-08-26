import React, {useState} from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import axios from 'axios'







const CKEditorCopm = ({setContent}) => {
  const [addData, setAddData] = useState('')
  const [name, setName] = useState('')
  const [alt, setAlt] = useState('')
  const [PageName, setPageName] = useState('')
  const [mediaId, setMediaId] = useState(null)

  class UploadAdapter {
	constructor(mediaData) {
		this.mediaData = mediaData;
		this.upload();
	}
  
	// Starts the upload process.
	upload() {
		return new Promise((resolve, reject) => {
			axios
				.post(`https://charity-backend-july.herokuapp.com/medias`, this.mediaData, {
					onUploadProgress: e => {
						console.log(
							// show upload process
							Math.round((e.loaded / e.total) * 100) + " %"
						);
					}
				})
				.then(response => {
                    setMediaId(response.data.response.mediaId)
					resolve({default:response.data.response.url});
				})
				.catch(error => {
					reject("Server Error");
					console.log("Server Error : ", error);
				});
		});
	}
}

  function CustomUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = loader => {
  
      const mediaData = new FormData();
      loader.file.then(pic => mediaData.set("image", pic));
      mediaData.set("title", name || "");
      mediaData.set("alt", alt || "");
      return new UploadAdapter(mediaData);
    };
  }

  const config = {
    extraPlugins: [CustomUploadAdapterPlugin],
    toolbar: {
      items: [
        'heading',
'|',
'fontSize',
'fontFamily',
'|',
'bold',
'underline',
'italic',
'strikethrough',
'subscript',
'superscript',
'link',
'|',
'alignment',
'|',
'numberedList',
'bulletedList',
'todoList',
'|',
'indent',
'outdent',
'|',
'link',
'blockQuote',
'imageUpload',
'insertTable',
'mediaEmbed',
'|',
'undo',
'redo',
'placeholder',
      ]
    },
    
  }


  return (
    <div className="addnews-ckeditor">
    <CKEditor
          config={config}
		  editor={ClassicEditor}
		  data={addData}
          onReady={ editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log( 'Editor is ready to use!', editor );
                    } }
          onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        // console.log( { event, data } );
                        setContent(data)
                        setAddData(data)
                    } }
          onBlur={ ( event, editor ) => {
                        // console.log( 'Blur.', event, editor );
                    } }
          onFocus={ ( event, editor ) => {
                        // console.log( 'Focus.', event, editor );
                    } }
                />
    </div>
  );
}

export default CKEditorCopm;