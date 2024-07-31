let subject;

let set_subject = function (num) {
    console.log(num);
    subject = Number(num);
}

let allCheckButton = document.getElementById('chk01_00');
allCheckButton.onclick = function(){

    console.log('onclick은 됨');
    console.log(allCheckButton.checked);

    let setCheck = allCheckButton.checked;

    let checks = document.querySelectorAll('.que-allCheck');
    for(let i = 0 ; i < checks.length ; i++){
        checks[i].checked = setCheck;
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

document.getElementById('go-step0').onclick = function () {

    location.href='/step0/'+subject
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

