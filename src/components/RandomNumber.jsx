import data from '../data.json'



    // let randomNum = Math.floor.random()*((data.length)-1)
    // console.log(randomNum);
    // return (
    //     randomNum

    // )

    function randomNumber(){
        const num = Math.floor.random*(data.length-1)
        console.log(num);
        return num
    }
    // export default randomNumber