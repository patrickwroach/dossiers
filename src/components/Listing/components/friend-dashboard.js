import {useState } from 'react';

import { addPreference } from '../../../firebase/firebaseActions';
const FriendDashboard = ({friend})=>{

   const [newPreference, setNewPreference] = useState({})
   const [selectedFriend, setSelectedFriend] = useState (friend);

     //TODO: make some input to state blanket helper function, maybe a custom hook?
    const inputCategoryToState = (targetCategory) => {
    let toAddToState = newPreference;
    toAddToState.category = targetCategory;
    setNewPreference(toAddToState);
    }
    const inputValueToState = (e) => {
        let toAddToState = newPreference;
        toAddToState.value = e.target.value;
        setNewPreference(toAddToState);
    }

    const getCategories =()=>{
        const categories = selectedFriend.responses;
        const getItems = (targetCategory) => (
            categories[targetCategory].items.map((item, i) => (
             <input key={`${targetCategory}-input-${i}`} className="listing_dashboard_input material" placeholder={item}/>
        )))
        const cleanUpNewPreferenceElements =()=>{
            const elementsToClean = document.querySelector('.listing_dashboard_new-preference');
            if(elementsToClean){
                elementsToClean.remove();
            }
        }
        const cleanUpNewPreferenceState=()=>{
            let cleanState =  newPreference;
            cleanState.value = ""
            cleanState.category = ""
            setNewPreference(cleanState);
        }
        const addPreferenceUpdateData =()=>{
            //updateFrontEnd
            //TODO : this is terribele need to refactor later
            const updatedFriend = selectedFriend;
            setSelectedFriend(updatedFriend)
            const targetCategory = document.getElementById(`${newPreference.category}-inputs`);
            let newField = document.createElement('input');
            newField.className = "listing_dashboard_input material" 
            newField.value =  newPreference.value;
            targetCategory.appendChild(newField)
            //update backend 
            addPreference(newPreference, selectedFriend);
            updatedFriend.responses[newPreference.category].items.push(newPreference.value);
          
        }
        const handleUpdateButton = async() => {  
         cleanUpNewPreferenceElements()
           let promise = new Promise((resolve, reject) => {
            //TODO this is not stable, need to refactor
            setTimeout(() => resolve("done!"), 1000)
            addPreferenceUpdateData();
          });
          let result = await promise; // wait until the promise resolves (*)   
          cleanUpNewPreferenceState(); // "done!"

        }
        const addField = (category) => {
            //ToDO there has to be a better way to creat these elements, maybe portals? 
            cleanUpNewPreferenceElements(); 
            inputCategoryToState(category);
            const targetCategory = document.getElementById(`${category}-inputs`);
            let newFieldWrapper = document.createElement('div');
            newFieldWrapper.className = "listing_dashboard_new-preference" 
            targetCategory.appendChild(newFieldWrapper)

            let newInput = document.createElement('input');
            newInput.className = "listing_dashboard_input material" 
            newInput.onchange = (e)=>{inputValueToState(e)}
           
            let updateButton = document.createElement('button');
            updateButton.className = "listing_dashboard__new-preference_update-button button material material-black" 
            updateButton.onclick = ()=>{handleUpdateButton()}
            updateButton.innerHTML = "save" 

            newFieldWrapper.appendChild(newInput)
            newFieldWrapper.appendChild(updateButton) 
        }
        return (Object.keys(categories).map((category, i) => (
            <div key={categories[category].displayName} className="listing_dashboard_category-wrapper">
             <h4>{categories[category].displayName}</h4>
             <div id={`${category}-inputs`} className="listing_dashboard_inputs-wrapper">
                 {getItems(category)}
             </div>
            <button className="button material material-black" onClick={()=>{addField(category)}}>+</button>
            </div>
        )))
    }   

    return(
    <>
        <h3>{selectedFriend.firstName} {selectedFriend.lastName}</h3>
        {selectedFriend.responses ? getCategories() : ""}
    </>
    )
}
export default FriendDashboard 