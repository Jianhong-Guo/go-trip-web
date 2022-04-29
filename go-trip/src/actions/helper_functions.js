const log=console.log

export const handleInputChange = (p,event) => {
    // event.preventDefault()
    const value = event.target.value 
    const name = event.target.name 
    console.assert(name !== "image")
    p.setState({ 
        [name]: value 
    })
};

export const filterList = (list,keyword,searchedKeys) => {
    log("filterList")
    const lower_keyword=keyword.toLowerCase()
    log("original list")
    log(list)
    log("keyword")
    log(keyword)
    const filterCondition=(item)=>{
        for(let i=0;i<searchedKeys.length;i++){
            const value=item[searchedKeys[i]]
            if(value.toLowerCase().includes(lower_keyword)){
                return true
            }
        }
        return false
    }
    const newList=list.filter(item => filterCondition(item))
    log("new list")
    log(newList)
    return newList
};

export const findById = (list,id) => {
    for(let i=0;i<list.length;i++){
        if(list[i]._id===id){
            return list[i]
        }
    }
    return null
}

// export const addComment = (p) => {
//     const currentUser=p.currentUser
//     const current_comment=p.state.current_comment
//     if(current_comment===""){
//         return;
//     }
//     const all_comments=p.all_comments;
//     if(all_comments.length===0 || all_comments[all_comments.length-1].user.username !== currentUser.username){
//         all_comments.push({user: currentUser,comments: [current_comment],});
//     }
//     else{
//         all_comments[all_comments.length-1].comments.push(current_comment)
//     }
//     p.forceUpdate()
// };
