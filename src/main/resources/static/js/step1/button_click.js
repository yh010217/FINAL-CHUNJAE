


document.getElementById('go-step2').onclick = function(){

    console.log('go-step2 button click');
    let topic_checked_buttons = document.querySelectorAll('.topic-check');

    for(let i = 0 ; i < topic_checked_buttons.length ; i ++){
        if(topic_checked_buttons[i].checked){
            console.log(topic_checked_buttons[i].id);
        }
    }

}






