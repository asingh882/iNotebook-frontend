import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem';

const Notes = (props) => {
  const context = useContext(noteContext);
  const  {notes, getNotes, editNote} = context;
  const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: "", visibility: ""});
  let navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token')) {
      getNotes();
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);
  
  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag, visibility: currentNote.visibility});
    
  }

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag, note.visibility);
    refClose.current.click();
    props.showAlert("Updated Successfully", "success");
}

const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
}
  

    return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"  aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Edit Note</h5>
              <button type="button" ref={refClose} className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" name="edescription" id="edescription" value={note.edescription} onChange={onChange} minLength={6} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" name="etag" id="etag" value={note.etag} onChange={onChange}/>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 6} onClick={handleClick} className="btn btn-outline-success">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
          <h2>Your Notes</h2>
          <div className="container">
          {notes.length === 0 && 'No notes to display'}
          </div>
          {notes.map((note) => {
            return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note}/>
          })}
      </div>
    </>
  )
}

export default Notes
