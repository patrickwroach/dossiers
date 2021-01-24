const FriendDashboard = ({friend})=>{
   

    const getCategories =()=>{
        const categories = friend.responses;
        const getItems = (targetCategory) => (
            categories[targetCategory].items.map((item, i) => (
             <input className="listing_input material" placeholder={item}></input>
        )))
        return (Object.keys(categories).map((category, i) => (
            <>
             <h4>{categories[category].displayName}</h4>
             <div class="listing_dashboard_inputs-wrapper">
                 {getItems(category)}
             </div>
            </>
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