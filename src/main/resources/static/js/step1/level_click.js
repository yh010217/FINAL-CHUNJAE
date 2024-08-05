
let que_num = 30;

let level_cnt = ['0', '0', '0', '0', '0'];


let set_que_num = function (num) {
    que_num = num;
    document.querySelector('.que-num').innerHTML = num;
}


let count_value_change = function () {

    let count_input = document.querySelector('.count-input');
    let count_input_value = Number(count_input.value);

    if(count_input_value > 30){
        alert('30 이하로 설정해 주세요');
        count_input_value = 30;
        count_input.value = 30;
    }

    set_que_num(count_input_value);

    let count_buttons = document.querySelectorAll('.count-area .btn-line');
    let prev_selected_button;
    let now_selected_button;
    for (let i = 0; i < count_buttons.length; i++) {
        if (count_buttons[i].classList.contains('active')) {
            prev_selected_button = count_buttons[i];
        }
        if (count_buttons[i].textContent === count_input_value.toString()) {
            now_selected_button = count_buttons[i];
        }
    }
    prev_selected_button.classList.remove('active');
    now_selected_button.classList.add('active');

    document.querySelector('.count-input').value = que_num;

    change_que_count();

}


let change_que_count = function () {

    let step_wrap = document.querySelector('.step-wrap');

    let step_wrap_buttons = step_wrap.querySelectorAll('.active');
    let active_buttons_num = step_wrap_buttons.length;

    let non_active_buttons = [...(step_wrap.querySelectorAll('button'))].filter(item => !item.classList.contains('active'));
    //.filter(item => !item.classList.contains('active'))
    let non_active_num = non_active_buttons.length;

    let que_range_pop_divs = document.querySelectorAll('.change_level_div');
    for (let i = 0; i < que_range_pop_divs.length; i++) {
        if (!que_range_pop_divs[i].classList.contains('not_contain_level')) {
            que_range_pop_divs[i].classList.add('not_contain_level');
        }
    }

    let low_result= 0;
    let mid_result= 0;
    let high_result = 0;

    let low_count = Math.floor(que_num / active_buttons_num);
    let mid_count = Math.floor(que_num / active_buttons_num);
    let high_count = Math.floor(que_num / active_buttons_num);

    let mod_count = que_num % active_buttons_num;

    let sum_count = 0;

    for (let i = 0; i < non_active_num; i++) {
        if (non_active_buttons[i].getAttribute('data-step') === 'stap2') {
            low_count = 0;
            document.getElementById('range-low-count').innerHTML = 0 + '';

            document.getElementById('level_low').value = 0;

        }
        if (non_active_buttons[i].getAttribute('data-step') === 'stap3') {
            mid_count = 0;

            document.getElementById('range-mid-count').innerHTML = 0 + '';

            document.getElementById('level_mid').value = 0;

        }
        if (non_active_buttons[i].getAttribute('data-step') === 'stap4') {
            high_count = 0;

            document.getElementById('range-high-count').innerHTML = 0 + '';

            document.getElementById('level_high').value = 0;
        }


    }

    for (let i = 0; i < active_buttons_num; i++) {
        if (step_wrap_buttons[i].getAttribute('data-step') === 'stap2') {
            low_count = low_count + mod_count;
            mod_count = 0;
            low_result = low_count;
            document.getElementById('range-low-count').innerHTML = low_count + '';

            document.getElementById('level_low').value = low_count;
            document.getElementById('level_range_low').classList.remove('not_contain_level');

            level_cnt[1] = low_result+'';
            sum_count += low_count;
        }
        if (step_wrap_buttons[i].getAttribute('data-step') === 'stap3') {
            mid_count = mid_count + mod_count;
            mod_count = 0;
            mid_result = mid_count;

            document.getElementById('range-mid-count').innerHTML = mid_count + '';

            document.getElementById('level_mid').value = mid_count;
            document.getElementById('level_range_mid').classList.remove('not_contain_level');

            level_cnt[2] = mid_result+'';
            sum_count += mid_count;

        }
        if (step_wrap_buttons[i].getAttribute('data-step') === 'stap4') {
            high_count = high_count + mod_count;
            mod_count = 0;
            high_result = high_count;

            document.getElementById('range-high-count').innerHTML = high_count + '';
            document.getElementById('level_high').value = high_count;
            document.getElementById('level_range_high').classList.remove('not_contain_level');

            level_cnt[3] = high_result+'';
            sum_count += high_count;
        }
    }

    document.getElementById('level_sum').innerHTML = sum_count +'';


}

let count_change = function (num) {

    set_que_num(num);


    let count_buttons = document.querySelectorAll('.count-area .btn-line');
    let prev_selected_button;
    let now_selected_button;
    for (let i = 0; i < count_buttons.length; i++) {
        if (count_buttons[i].classList.contains('active')) {
            prev_selected_button = count_buttons[i];
        }
        if (count_buttons[i].textContent === num.toString()) {
            now_selected_button = count_buttons[i];
        }
    }
    prev_selected_button.classList.remove('active');
    now_selected_button.classList.add('active');

    document.querySelector('.count-input').value = que_num;


    change_que_count();
}


let change_level = function () {

    let level_sum = document.getElementById('level_sum');
    level_sum.replaceChildren();

    let value_low = document.getElementById('level_low').value;
    let value_mid = document.getElementById('level_mid').value;
    let value_high = document.getElementById('level_high').value;

    let number_low = Number(value_low);
    let number_mid = Number(value_mid);
    let number_high = Number(value_high);
    let number_sum = number_high + number_mid + number_low;

    level_cnt[1] = value_low;
    level_cnt[2] = value_mid;
    level_cnt[3] = value_high;


    let value_sum = document.createTextNode(number_sum.toString());
    level_sum.appendChild(value_sum);


}
document.getElementById('level_count_reset').onclick = function () {
    document.getElementById('level_low').value = document.getElementById('range-low-count').textContent;
    document.getElementById('level_mid').value = document.getElementById('range-mid-count').textContent;
    document.getElementById('level_high').value = document.getElementById('range-high-count').textContent;
    level_cnt[1] = document.getElementById('range-low-count').textContent;
    level_cnt[2] = document.getElementById('range-mid-count').textContent;
    level_cnt[3] = document.getElementById('range-high-count').textContent;


    document.getElementById('level_sum').innerHTML = (Number(level_cnt[1])+Number(level_cnt[2])+Number(level_cnt[3])) +'';


}
document.getElementById('level_count_save').onclick = function () {

    let value_low = document.getElementById('level_low').value;
    let value_mid = document.getElementById('level_mid').value;
    let value_high = document.getElementById('level_high').value;

    let low_num = Number(value_low);
    let mid_num = Number(value_mid);
    let high_num = Number(value_high);

    if (low_num + mid_num + high_num !== que_num) {
        alert('문제 수를 맞춰주세요');
        document.getElementById('level_low').value = document.getElementById('range-low-count').textContent;
        document.getElementById('level_mid').value = document.getElementById('range-mid-count').textContent;
        document.getElementById('level_high').value = document.getElementById('range-high-count').textContent;
        level_cnt[1] = document.getElementById('range-low-count').textContent;
        level_cnt[2] = document.getElementById('range-mid-count').textContent;
        level_cnt[3] = document.getElementById('range-high-count').textContent;

        document.getElementById('level_sum').innerHTML = (Number(level_cnt[1])+Number(level_cnt[2])+Number(level_cnt[3])) +'';

    } else {

        let step_wrap = document.querySelector('.step-wrap');

        let step_wrap_buttons = step_wrap.querySelectorAll('.active');
        let active_buttons_num = step_wrap_buttons.length;

        for (let i = 0; i < active_buttons_num; i++) {
            if (step_wrap_buttons[i].getAttribute('data-step') === 'stap2') {
                document.getElementById('range-low-count').innerHTML = value_low + '';
                level_cnt[1] = low_num + '';
            }

            if (step_wrap_buttons[i].getAttribute('data-step') === 'stap3') {
                document.getElementById('range-mid-count').innerHTML = value_mid + '';
                level_cnt[2] = mid_num + '';
            }
            if (step_wrap_buttons[i].getAttribute('data-step') === 'stap4') {
                document.getElementById('range-high-count').innerHTML = value_high + '';
                level_cnt[3] = high_num + '';
            }
        }

        document.getElementById('level_low').value = document.getElementById('range-low-count').textContent;
        document.getElementById('level_mid').value = document.getElementById('range-mid-count').textContent;
        document.getElementById('level_high').value = document.getElementById('range-high-count').textContent;
        level_cnt[1] = document.getElementById('range-low-count').textContent;
        level_cnt[2] = document.getElementById('range-mid-count').textContent;
        level_cnt[3] = document.getElementById('range-high-count').textContent;


        document.getElementById('level_sum').innerHTML = (Number(level_cnt[1])+Number(level_cnt[2])+Number(level_cnt[3])) +'';



        document.getElementById('level_sum').innerHTML = (low_num + mid_num + high_num) +'';


        document.querySelector('.dim').style = 'display : none;';
        document.querySelector('.range-type').style = 'display : none';

    }

}

