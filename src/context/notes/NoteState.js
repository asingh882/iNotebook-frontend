//import { useState } from "react";
import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {

    // For understanding

    // const s1 = {
    //     "name": "Amrit",
    //     "class": "5b",
    // }

    // const [state, setState] = useState(s1);
    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             "name": "Harry",
    //             "class": "10b",
    //         })
    //     }, 1000)
    // }
    const host = "http://localhost:5000";
    const notesInitial = [];
      const [notes, setNotes] = useState(notesInitial);



      // Get all notes
      const getNotes = async () => {
        // Todo API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
        });

        // Logic client
        const json = await response.json();
        setNotes(json);
      }

      // Add a note
      const addNote = async (title, description, tag, visibility) => {
        // Todo API call
        const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
          body: JSON.stringify({title, description, tag, visibility}),
        });

        // Logic client
        getNotes();
      }

      // Delete a note
      const deleteNote = async (id) => {
        // Todo: API Call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
        });
        getNotes();
      }

      // Edit a note
      const editNote = async (id, title, description, tag, visibility) => {
        // API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: 'PUT', 
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token'),
          },
          body: JSON.stringify({title, description, tag, visibility})
        });

        // Logic to edit client
        getNotes();
      }


    return (
        <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}



export default NoteState;