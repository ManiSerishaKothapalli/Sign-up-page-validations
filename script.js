const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}


function isEmailValid(email){
   let isvalid = String(email.value)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if(isvalid){
      showSuccess(email)
    }
    else{
      showError(email, `${getFieldId(email)} is not valid`)
    }
}

function checkRequired(inputArr){
  inputArr.forEach(i => {
    if(i.value.trim() === ''){
      showError(i, `${getFieldId(i)} is required`)
    }
    else{
      showSuccess(i);
    }
  });
}

function getFieldId(input){
  return input.id.charAt(0).toUpperCase()+input.id.slice(1);
}

function checkLength(input,min,max){
  if(input.value.length < min){
    showError(input,`${getFieldId(input)} must be atleast ${min} characters`)
  }
  else if(input.value.length > max){
    showError(input,`${getFieldId(input)} must be less than ${max} characters`)
  }
  else{
    showSuccess(input);
  }
}


function checkPasswordsMatched(input1,input2){

if(input1.value != input2.value) {
  showError(input2, `Passwords do not match`);
}
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkRequired([username,email,password,confirmPassword]);
  checkLength(username,3,15);
  checkLength(password,6,25);
  isEmailValid(email);
  checkPasswordsMatched(password,confirmPassword)
});
