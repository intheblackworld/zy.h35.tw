
function SendScore() {
    var checkinput = 0
    let hasName = false
    let hasPhone = false
    let hasChecked = false
    const recaptcha = $("#g-recaptcha-response").val()
    let hasRecaptcha = !!recaptcha

    if (document.getElementById("name").value == "") {
        document.getElementById('name').style.borderColor = "red"
        document.getElementById('name').style.borderWidth = "1px"
    } else {
        document.getElementById('name').style.borderColor = ""
        document.getElementById('name').style.borderWidth = ""
        hasName = true
        checkinput++
    }
    if (document.getElementById("email").value == "") {
        //   document.getElementById('email').style.borderColor = "red";
        //   document.getElementById('email').style.borderWidth = "1px";
    } else {
        document.getElementById('email').style.borderColor = ""
        document.getElementById('email').style.borderWidth = ""
        checkinput++
    }
    if (!document.getElementById("phone").value.match(/^09[0-9]{8}$/)) {
        document.getElementById('phone').style.borderColor = "red"
        document.getElementById('phone').style.borderWidth = "1px"
    } else {
        document.getElementById('phone').style.borderColor = ""
        document.getElementById('phone').style.borderWidth = ""
        checkinput++
        hasPhone = true
    }
    if (document.querySelector('.messageCheckbox').checked) {
        checkinput++
        hasChecked = true
    }
    if (hasChecked && hasPhone && hasName && hasRecaptcha) {
        document.getElementById("msgerror").innerHTML = ""

        window.dotq = window.dotq || []

        window.dotq.push(

            {

                'projectId': '10000',

                'properties': {

                    'pixelId': '10101258',

                    'qstrings': {

                        'et': 'custom',

                        'ea': 'lead10101258'

                    }

                }
            })
        $("#myform").submit()
    } else {
        document.getElementById("msgerror").innerHTML = "請填寫『完整聯絡資料』與勾選『個資告知事項聲明 』並驗證"
    }
}

document.getElementById("utm_source").value = getParameter('utm_source') + getParameter('source')
document.getElementById("utm_medium").value = getParameter('utm_medium') + getParameter('medium')
document.getElementById("utm_content").value = getParameter('utm_content') + getParameter('content')
document.getElementById("utm_campaign").value = getParameter('utm_campaign') + getParameter('campaign')
function getParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search)
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
}


// var sendbtn_b = 0;
// document.getElementById("sendbtn").style.display = "none";
// function infoyn(){
//   if(sendbtn_b){
//       document.getElementById("sendbtn").style.display = "none";
//       sendbtn_b = 0;
//   }else{
//       document.getElementById("sendbtn").style.display = "block";
//       sendbtn_b = 1;
//   }
// }