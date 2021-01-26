import {useState } from 'react';

import { addPreference } from '../../../firebase/firebaseActions';
const FriendDashboard = ({friend})=>{

   const [newPreference, setNewPreference] = useState({})


     //TODO: make this a blanket helper function 
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
        const categories = friend.responses;
        const getItems = (targetCategory) => (
            categories[targetCategory].items.map((item, i) => (
             <input key={`${targetCategory}-input-${i}`} className="listing_dashboard_input material" placeholder={item}/>
        )))
        const cleanUpNewPreferenceElements =()=>{
            const elementsToClean = document.querySelector('.listing_dashboard_new-preference');
            if(elementsToClean){
                elementsToClean.remove();
                let cleanState =  newPreference;
                cleanState.value = ""
                cleanState.category = ""
                setNewPreference(cleanState);
            }
        }
        const addPreferenceUpdateData =()=>{
            //update backend
            addPreference(newPreference, friend);
            //updateFrontEnd 
            const updatedFriend = friend;
            updatedFriend.responses[newPreference.category].items.push(newPreference.value);
            cleanUpNewPreferenceElements();
        }
        const addField = (category) => {
            //there has to be a better wayt to do this, maybe portals? 
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
            updateButton.onclick = ()=>{addPreferenceUpdateData()}
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
        <h3>{friend.firstName} {friend.lastName}</h3>
        {friend.responses ? getCategories() : ""}
    </>
    )
}
export default FriendDashboard 