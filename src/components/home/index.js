import { useState } from 'react';
import Modal from '../Modal';
const Home = () => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <>
            <h1>This is a heading</h1>
            <h2>This is a sub-heading</h2>
            <p> Here is some text in a paragraph</p>

            <input className="input " placeholder="An input"></input>
            <button className="button material material-black" onClick={()=>{setModalOpen(true)}}>I open a pointless but proud modal</button>
            {modalOpen ?
            <Modal open={modalOpen} toggle={()=>{setModalOpen(false)}}>

                <p> I am a modal babbbeeee</p>

            </Modal> : "" }
        </>
    )
}
export default Home;