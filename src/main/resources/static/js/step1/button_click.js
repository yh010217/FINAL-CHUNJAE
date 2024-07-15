
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

    let minorClassification = [];

    let large_li = document.querySelectorAll('.large-li');
    let unchecked_large_li = [];


    for(let i = 0 ; i < large_li.length ; i ++) {
        let large_checkbox = large_li[i].querySelector('.large-check');
        if(large_checkbox.checked){
            let large_id = Number(large_checkbox.id.substring(5));
            let oneClassification = {
                subject : subject
                ,large : large_id
            }
            console.log(oneClassification);
            minorClassification.push(oneClassification);
        }else{
            unchecked_large_li.push(large_li[i]);
        }
    }

    let unchecked_medium_div = [];
    for(let i = 0 ; i < unchecked_large_li.length ; i ++){

        let large_id = unchecked_large_li[i].querySelector('.large-check').id.substring(5);
        let medium_divs = unchecked_large_li[i].querySelectorAll('.medium-div');
        console.log('medium-divs 는? : ');
        console.log(medium_divs);
        for(let j = 0 ; j < medium_divs.length ; j++){
            console.log('medium-divs[j] :');
            console.log(medium_divs[j]);
            let medium_check = medium_divs[j].querySelector('.medium-check');
            console.log('medium_check:');
            console.log(medium_check);
            if(medium_check.checked){
                let medium_id = Number(medium_check.id.substring(6));
                let oneClassification = {
                    subject : subject
                    ,large : large_id
                    ,medium : medium_id
                }
                minorClassification.push(oneClassification);
            }else{
                unchecked_medium_div.push(medium_divs[j]);
            }
        }
    }

    console.log(minorClassification);

}






