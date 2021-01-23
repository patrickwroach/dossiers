const FriendDashboard = ({friend})=>{
    console.log(friend)
    return(
    <>
        <h3>{friend.firstName} {friend.lastName}</h3>
        <label>Favorite foods</label> 
        <div class="listing_input-wrapper">
         <input className=" listing_input material" type="multi-line" placeholder="..."></input>
        </div>
    </>
    )
}
export default FriendDashboard 