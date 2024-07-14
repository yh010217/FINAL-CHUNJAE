
let subject;
let set_subject = function(num){
    console.log(num);
    subject = Number(num);
}

let count_change = function (num){
    let count_buttons = document.querySelectorAll('.count-area .btn-line');
    let prev_selected_button;
    let now_selected_button;
    for(let i = 0 ; i < count_buttons.length ; i++){
        if(count_buttons[i].classList.contains('active')){
            prev_selected_button = count_buttons[i];
        }
        console.log('찾는중....');
        console.log(count_buttons[i].textContent);
        console.log(typeof(count_buttons[i].textContent));

        if(count_buttons[i].textContent === num.toString()){
            console.log(i+' 번째에서 찾음');
            now_selected_button = count_buttons[i];
        }
    }
    prev_selected_button.classList.remove('active');
    now_selected_button.classList.add('active');

    document.querySelector('.count-input').value = num;

}

let change_level = function(){
    let level_sum = document.getElementById('level_sum');
    level_sum.replaceChildren();

    let value_low = document.getElementById('level_low').value;
    let value_mid = document.getElementById('level_mid').value;
    let value_high = document.getElementById('level_high').value;

    let number_low = Number(value_low);
    let number_mid = Number(value_mid);
    let number_high = Number(value_high);
    let number_sum = number_high + number_mid + number_low;

    let value_sum = document.createTextNode(number_sum.toString());
    level_sum.appendChild(value_sum);
}


document.getElementById('go-step2').onclick = function(){

    let minorClassification = {};

    let large_checks = document.querySelectorAll('.large-check');
    let large_unchecked = [];
    for(let i = 0 ; i < large_checks.length ; i ++){
        if(large_checks[i].checked){
            console.log(large_checks[i]);
            let large_id = Number(large_checks[i].id.substring(5));
            console.log(large_id);
            let oneClassification = {
                subject : subject
                ,large : large_id
            }
            console.log(oneClassification)
        }else{
            large_unchecked.push(large_checks[i]);
        }
    }

    let medium_checks = [];
    let medium_unchecked = [];
    for(let i = 0 ; i < large_unchecked.length ; i++){


    }



    let topic_checked_buttons = document.querySelectorAll('.topic-check');

    for(let i = 0 ; i < topic_checked_buttons.length ; i ++){
        if(topic_checked_buttons[i].checked){
            console.log(topic_checked_buttons[i].id);
        }
    }

}






