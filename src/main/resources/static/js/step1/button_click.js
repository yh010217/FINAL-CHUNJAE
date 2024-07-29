let subject;

let set_subject = function (num) {
    console.log(num);
    subject = Number(num);
}

let level_cnt = ['0', '0', '0', '0', '0'];

let que_num = 30;

let set_que_num = function (num) {
    que_num = num;
    document.querySelector('.que-num').innerHTML = num;
}

let prev_low;
let prev_mid;
let prev_high;

let count_value_change = function () {

    let count_input = document.querySelector('.count-input');
    let count_input_value = Number(count_input.value);

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

            sum_count += low_count;
        }
        if (step_wrap_buttons[i].getAttribute('data-step') === 'stap3') {
            mid_count = mid_count + mod_count;
            mod_count = 0;
            mid_result = mid_count;

            document.getElementById('range-mid-count').innerHTML = mid_count + '';

            document.getElementById('level_mid').value = mid_count;
            document.getElementById('level_range_mid').classList.remove('not_contain_level');

            sum_count += mid_count;

        }
        if (step_wrap_buttons[i].getAttribute('data-step') === 'stap4') {
            high_count = high_count + mod_count;
            mod_count = 0;
            high_result = high_count;

            document.getElementById('range-high-count').innerHTML = high_count + '';
            document.getElementById('level_high').value = high_count;
            document.getElementById('level_range_high').classList.remove('not_contain_level');

            sum_count += high_count;
        }
    }

    document.getElementById('level_sum').innerHTML = sum_count +'';


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

document.getElementById('level_count_save').onclick = function () {


    let value_low = document.getElementById('level_low').value;
    let value_mid = document.getElementById('level_mid').value;
    let value_high = document.getElementById('level_high').value;

    let low_num = Number(value_low);
    let mid_num = Number(value_mid);
    let high_num = Number(value_high);

    if (low_num + mid_num + high_num !== que_num) {
        alert('문제 수를 맞춰주세요');
    } else {

        let step_wrap = document.querySelector('.step-wrap');

        let step_wrap_buttons = step_wrap.querySelectorAll('.active');
        let active_buttons_num = step_wrap_buttons.length;

        for (let i = 0; i < active_buttons_num; i++) {
            if (step_wrap_buttons[i].getAttribute('data-step') === 'stap2') {
                document.getElementById('range-low-count').innerHTML = value_low + '';
                level_cnt[1] = low_num + '';
            }else{
                level_cnt[1] = 0+'';
            }
            if (step_wrap_buttons[i].getAttribute('data-step') === 'stap3') {
                document.getElementById('range-mid-count').innerHTML = value_mid + '';
                level_cnt[2] = mid_num + '';
            }else{
                level_cnt[2] = 0+'';
            }
            if (step_wrap_buttons[i].getAttribute('data-step') === 'stap4') {
                document.getElementById('range-high-count').innerHTML = value_high + '';
                level_cnt[3] = high_num + '';
            }else{
                level_cnt[3] = 0+'';
            }
        }

        document.getElementById('level_sum').innerHTML = (low_num + mid_num + high_num) +'';


        document.querySelector('.dim').style = 'display : none;';
        document.querySelector('.range-type').style = 'display : none';

    }

}


let make_minorClassification = function () {

    let minorClassification = [];

    let large_li = document.querySelectorAll('.large-li');
    let unchecked_large_li = [];


    for (let i = 0; i < large_li.length; i++) {
        let large_checkbox = large_li[i].querySelector('.large-check');
        if (large_checkbox.checked) {
            let large_id = Number(large_checkbox.id.substring(5));
            let oneClassification = {
                subject: subject
                , large: large_id
            }
            minorClassification.push(oneClassification);
        } else {
            unchecked_large_li.push(large_li[i]);
        }
    }

    let unchecked_medium_div = [];
    for (let i = 0; i < unchecked_large_li.length; i++) {

        let large_id = Number(unchecked_large_li[i].querySelector('.large-check').id.substring(5));

        let medium_divs = unchecked_large_li[i].querySelectorAll('.medium-div');

        for (let j = 0; j < medium_divs.length; j++) {
            let medium_check = medium_divs[j].querySelector('.medium-check');

            if (medium_check.checked) {
                let medium_id = Number(medium_check.id.substring(6));
                let oneClassification = {
                    subject: subject
                    , large: large_id
                    , medium: medium_id
                }
                minorClassification.push(oneClassification);
            } else {
                let to_put_medium = {
                    large: large_id
                    , medium: Number(medium_check.id.substring(6))
                    , to_check_div: medium_divs[j]
                }
                unchecked_medium_div.push(to_put_medium);
            }
        }
    }


    let unchecked_small_divs = [];
    for (let i = 0; i < unchecked_medium_div.length; i++) {
        let large_id = unchecked_medium_div[i].large;
        let medium_id = unchecked_medium_div[i].medium;

        let to_check_small = unchecked_medium_div[i].to_check_div.nextSibling.nextSibling;

        let small_divs = to_check_small.querySelectorAll('.small-div');
        for (let j = 0; j < small_divs.length; j++) {
            let small_check = small_divs[j].querySelector('.small-check');
            let small_id = Number(small_check.id.substring(5));

            if (small_check.checked) {

                let oneClassification = {
                    subject: subject
                    , large: large_id
                    , medium: medium_id
                    , small: small_id
                }
                minorClassification.push(oneClassification);

            } else {

                let to_put_small = {
                    large: large_id
                    , medium: medium_id
                    , small: small_id
                    , to_check_div: small_divs[j]
                }
                unchecked_small_divs.push(to_put_small);
            }
        }

    }


    for (let i = 0; i < unchecked_small_divs.length; i++) {
        let large_id = unchecked_small_divs[i].large;
        let medium_id = unchecked_small_divs[i].medium;
        let small_id = unchecked_small_divs[i].small;

        let to_check = unchecked_small_divs[i].to_check_div.nextSibling.nextSibling;
        let topic_checks = to_check.querySelectorAll('.topic-check');
        for (let j = 0; j < topic_checks.length; j++) {
            if (topic_checks[j].checked) {
                let topic_id = Number(topic_checks[j].id.substring(5));

                let oneClassification = {
                    subject: subject
                    , large: large_id
                    , medium: medium_id
                    , small: small_id
                    , topic: topic_id
                }
                minorClassification.push(oneClassification);
            }
        }

    }
    return minorClassification;
}

let make_question_form = function () {
    let question_form = '';

    let question_forms = document.querySelectorAll('.question_form');
    let count = 0;
    for (let i = 0; i < question_forms.length; i++) {
        if (question_forms[i].classList.contains('active')) {
            if (count !== 0) question_form = question_form.concat(',');
            let form_id_str = question_forms[i].id.substring(5);
            question_form = question_form.concat(form_id_str);
            count++;
        }
    }
    return question_form;
}

let make_activityCategory = function () {
    let activityCategory = [];

    let activityList = document.getElementById('activityList');

    let evals = activityList.querySelectorAll('.btn-line');

    for (let i = 0; i < evals.length; i++) {
        if (evals[i].classList.contains('active')) {
            let evalNum = Number(evals[i].id.substring(4));
            activityCategory.push(evalNum);
        }
    }

    return activityCategory;
}

document.getElementById('go-step2').onclick = function () {

    let minorClassification = make_minorClassification();

    let questionForm = make_question_form();

    let activityCategoryList = make_activityCategory();

    canSendCheck(minorClassification, questionForm, activityCategoryList);


}

let canSendCheck = async function (minorClassification, questionForm, activityCategoryList) {

    let send_body = {
        minorClassification: minorClassification
        , levelCnt: level_cnt
        , questionForm: questionForm
        , activityCategoryList: activityCategoryList
    }

    await fetch('/step1/make_exam/' + subject, {
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(send_body)
    }).then(response => {
        console.log(response);
        if (!response.ok) {
            throw new Error('가능한지 체크과정중에 안됨');
        }
        return response.json();
    }).then(data => {


        if (data.enable === 'Y') {

            if (data.fit) {
                // 바로 저장 메서드
                saveQuestions(data);

            } else {
                /* 문항 조건 충족 안했을 때 팝업 */
                let range_type02 = document.querySelector('.range-type02');
                range_type02.style = 'display : block';
                let dim_div = document.querySelector('.dim');
                dim_div.style = 'display : block';



                let low = Number(data.fitCount[0]);
                let mid = Number(data.fitCount[1]);
                let high = Number(data.fitCount[2]);

                range_type02.querySelector('#type02-low').innerHTML = low
                range_type02.querySelector('#type02-mid').innerHTML = mid
                range_type02.querySelector('#type02-high').innerHTML = high
                let tot = low+mid+high
                range_type02.querySelector('#type02-tot').innerHTML = tot;

                document.querySelector('.type-02-accept').onclick = function (){
                    saveQuestions(data);
                }


            }
        } else {
            alert('저장할 수 없습니다.');
        }


    }).catch(error => {
        console.error(error);
    })

}

let removePrev = function (){

    document.querySelector('#type02-low').innerHTML = ''
    document.querySelector('#type02-mid').innerHTML = ''
    document.querySelector('#type02-high').innerHTML = ''
    document.querySelector('#type02-tot').innerHTML = '';

    document.querySelector('.type-02-accept').onclick = null;

}


let saveQuestions = function(data){

    fetch('/step1/save_questions',{
        method: 'post',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response =>{
        if(!response.ok){
            throw new Error('save questions 에러')
        }
        return response.json();
    }).then(item=>{
        if(item.success === 'Y'){
            location.href = "/step1/step2-go/"+data.paperId;
        }else{
            alert('저장에 실패했습니다');
        }
    }).catch(error => {
        console.log('enable 은 y 였는데, 안되네...');
    })

}

